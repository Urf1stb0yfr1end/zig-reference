#!/usr/bin/env python3
"""Prove ELF-derived supervisor-only Sv39 permission domains on two machines."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-sv39-permissions.py"
TIMEOUT_SECONDS = 15
PAGE_SIZE = 4096
BEGIN = b"ZIGREF_SV39_PERMISSIONS_BEGIN"
END = b"ZIGREF_SV39_PERMISSIONS_END"
RETURNED = b"ZIGREF_SV39_PERMISSIONS_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

morphic = load("permissions_morphic", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("permissions_trap", "tools/verify-freestanding-riscv64-supervisor-trap.py")
timer = load("permissions_timer", "tools/verify-freestanding-riscv64-supervisor-timer.py")
ticks = load("permissions_ticks", "tools/verify-freestanding-riscv64-supervisor-ticks.py")
scheduler = load("permissions_scheduler", "tools/verify-freestanding-riscv64-scheduler-time.py")
physical = load("permissions_physical", "tools/verify-freestanding-riscv64-physical-memory.py")
active = load("permissions_active", "tools/verify-freestanding-riscv64-active-sv39.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return int(value, 16)


def pages(begin, end):
    return list(range(begin, end, PAGE_SIZE))


def parse(raw, elf_domains=None, elf_pool=None):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one permission frame and return marker")
    active_return = raw.find(active.RETURNED)
    begin_at, end_at, returned_at = raw.find(BEGIN), raw.find(END), raw.find(RETURNED)
    morphic_at = raw.find(b"ZIGREF_MORPHIC_BEGIN")
    if not (0 <= active_return < begin_at < end_at < returned_at < morphic_at):
        raise RuntimeError("permission hardening must follow Batch 17 and precede Morphic")
    record = raw.split(BEGIN, 1)[1].split(END, 1)[0]
    headers, rows = {}, []
    for line in record.strip().decode("ascii").splitlines():
        fields = {}
        for item in line.split(","):
            key, sep, value = item.partition("=")
            if not sep or not key or key in fields:
                raise RuntimeError("permission evidence contains malformed or duplicate fields")
            fields[key] = value
        if "leaf_va" in fields:
            if set(fields) != {"leaf_va", "pa", "pte", "level"}:
                raise RuntimeError("leaf row field set is incomplete or unexpected")
            rows.append(fields)
        elif len(fields) != 1:
            raise RuntimeError("unexpected compound permission header")
        else:
            key, value = next(iter(fields.items()))
            if key in headers:
                raise RuntimeError("duplicate permission header")
            headers[key] = value
    required = {"page_size", "satp_before", "satp_after", "root_physical", "root_ppn",
                "text_begin", "text_end", "rodata_begin", "rodata_end",
                "writable_begin", "writable_end", "alias", "alias_physical",
                "leaf_count", "mutation_count", "sfence_vma", "code_probe",
                "rodata_read", "stack_probe", "global_probe", "alias_wrote",
                "alias_read", "identity_read", "post_hardening_morphic", "complete"}
    if set(headers) != required:
        raise RuntimeError("permission evidence field set is incomplete or unexpected")
    if fixed(headers["page_size"], "page_size") != PAGE_SIZE:
        raise RuntimeError("permission proof page size is not 4 KiB")
    domains = tuple(fixed(headers[name], name) for name in
                    ("text_begin", "text_end", "rodata_begin", "rodata_end", "writable_begin", "writable_end"))
    tb, te, rb, re_, wb, we = domains
    if any(value % PAGE_SIZE for value in domains) or not (tb < te == rb < re_ == wb < we):
        raise RuntimeError("ELF permission domains are unaligned, empty, gapped, or overlapping")
    if elf_domains and domains != elf_domains:
        raise RuntimeError("runtime permission domains disagree with ELF symbols")
    before, after = fixed(headers["satp_before"], "satp_before"), fixed(headers["satp_after"], "satp_after")
    root = fixed(headers["root_physical"], "root_physical")
    if before != after or before >> 60 != 8 or (before & ((1 << 44) - 1)) != root // PAGE_SIZE:
        raise RuntimeError("Sv39 mode or owned root changed during permission hardening")
    if fixed(headers["root_ppn"], "root_ppn") != root // PAGE_SIZE:
        raise RuntimeError("root PPN contradicts raw satp")
    alias, target = fixed(headers["alias"], "alias"), fixed(headers["alias_physical"], "alias_physical")
    if alias == target or alias % PAGE_SIZE or target % PAGE_SIZE or tb <= alias < we:
        raise RuntimeError("alias is aligned neither as a distinct non-identity mapping nor outside the image")
    old = active.parse(raw, elf_pool, (tb, we))
    if old["root"] != root or old["satp"] != before or old["alias"] != alias or old["target"] != target:
        raise RuntimeError("Batch 18 root, satp, or alias contradicts Batch 17")
    if elf_pool:
        pool_begin, pool_end = elf_pool
        if not pool_begin <= target < pool_end or target in old["pages"]:
            raise RuntimeError("alias target is outside the owned pool or collides with page-table ownership")
    expected = pages(tb, te) + pages(rb, re_) + pages(wb, we) + [alias]
    if fixed(headers["leaf_count"], "leaf_count") != len(expected) or len(rows) != len(expected):
        raise RuntimeError("leaf count does not cover the exact bounded address space")
    if fixed(headers["mutation_count"], "mutation_count") != len(expected):
        raise RuntimeError("declared mutation count is incomplete")
    seen, wx_count, user_count = {}, 0, 0
    for row in rows:
        va, pa, raw_pte, level = (fixed(row[k], k) for k in ("leaf_va", "pa", "pte", "level"))
        if va in seen:
            raise RuntimeError("duplicate virtual leaf")
        seen[va] = (pa, raw_pte, level)
        if level != 0:
            raise RuntimeError("non-4-KiB leaf in bounded permission proof")
        if raw_pte >> 54:
            raise RuntimeError("leaf PTE uses reserved bits")
        valid, read, write, execute = (bool(raw_pte & bit) for bit in (1, 2, 4, 8))
        user, accessed, dirty = (bool(raw_pte & bit) for bit in (16, 64, 128))
        if not valid or not (read or execute) or (write and not read):
            raise RuntimeError("invalid leaf PTE encoding")
        encoded_pa = ((raw_pte >> 10) & ((1 << 44) - 1)) << 12
        if encoded_pa != pa:
            raise RuntimeError("PTE PPN does not encode the reported physical target")
        if user: user_count += 1
        if write and execute: wx_count += 1
        if tb <= va < te:
            if pa != va or not (read and execute and accessed) or write or user or dirty:
                raise RuntimeError("text leaf is not supervisor RX with A=1 D=0")
        elif rb <= va < re_:
            if pa != va or not (read and accessed) or write or execute or user or dirty:
                raise RuntimeError("rodata leaf is not supervisor R/NX with A=1 D=0")
        elif wb <= va < we:
            if pa != va or not (read and write and accessed and dirty) or execute or user:
                raise RuntimeError("writable leaf is not supervisor RW/NX with A=D=1")
        elif va == alias:
            if pa != target or not (read and write and accessed and dirty) or execute or user:
                raise RuntimeError("alias leaf is not supervisor RW/NX with A=D=1")
        else:
            raise RuntimeError("unexpected extra leaf")
    if set(seen) != set(expected):
        raise RuntimeError("installed leaves contain a missing or unexpected virtual page")
    if user_count or wx_count:
        raise RuntimeError("installed address space contains U or W+X leaves")
    if headers["sfence_vma"] != "global-executed":
        raise RuntimeError("post-mutation SFENCE.VMA evidence is missing")
    if headers["code_probe"] != "PASS" or fixed(headers["rodata_read"], "rodata_read") != 0x18392026:
        raise RuntimeError("post-hardening text/rodata probes contradict")
    stack = fixed(headers["stack_probe"], "stack_probe")
    if stack != 0x185139 or fixed(headers["global_probe"], "global_probe") != stack:
        raise RuntimeError("post-hardening stack/global probes contradict")
    sentinel = fixed(headers["alias_wrote"], "alias_wrote")
    if fixed(headers["alias_read"], "alias_read") != sentinel or fixed(headers["identity_read"], "identity_read") != sentinel:
        raise RuntimeError("post-hardening alias/identity probes contradict")
    if headers["post_hardening_morphic"] != "next" or headers["complete"] != "PASS":
        raise RuntimeError("post-hardening completion/Morphic ordering evidence is missing")
    return {"domains": domains, "root": root, "satp": after, "leaves": len(rows),
            "alias": alias, "target": target, "wx": wx_count, "user": user_count}


def leaf_raw(pa, flags):
    return ((pa >> 12) << 10) | flags


def sample():
    raw = active.sample()
    tb, te, rb, re_, wb, we = 0x80200000, 0x80202000, 0x80202000, 0x80203000, 0x80203000, 0x80228000
    root, alias, target = 0x80220000, 0x80400000, 0x80227000
    satp = (8 << 60) | (root // PAGE_SIZE)
    lines = [BEGIN, f"\npage_size={PAGE_SIZE:016x}\nsatp_before={satp:016x}\nsatp_after={satp:016x}\nroot_physical={root:016x}\nroot_ppn={root//PAGE_SIZE:016x}\ntext_begin={tb:016x}\ntext_end={te:016x}\nrodata_begin={rb:016x}\nrodata_end={re_:016x}\nwritable_begin={wb:016x}\nwritable_end={we:016x}\nalias={alias:016x}\nalias_physical={target:016x}\nleaf_count={len(pages(tb, te) + pages(rb, re_) + pages(wb, we) + [alias]):016x}".encode()]
    for va in pages(tb, te): lines.append(f"\nleaf_va={va:016x},pa={va:016x},pte={leaf_raw(va,0x4b):016x},level={0:016x}".encode())
    for va in pages(rb, re_): lines.append(f"\nleaf_va={va:016x},pa={va:016x},pte={leaf_raw(va,0x43):016x},level={0:016x}".encode())
    for va in pages(wb, we): lines.append(f"\nleaf_va={va:016x},pa={va:016x},pte={leaf_raw(va,0xc7):016x},level={0:016x}".encode())
    lines.append(f"\nleaf_va={alias:016x},pa={target:016x},pte={leaf_raw(target,0xc7):016x},level={0:016x}".encode())
    lines.append(f"\nmutation_count={len(pages(tb, te) + pages(rb, re_) + pages(wb, we) + [alias]):016x}\nsfence_vma=global-executed\ncode_probe=PASS\nrodata_read=0000000018392026\nstack_probe=0000000000185139\nglobal_probe=0000000000185139\nalias_wrote=18a11a55c0de0039\nalias_read=18a11a55c0de0039\nidentity_read=18a11a55c0de0039\npost_hardening_morphic=next\ncomplete=PASS\n".encode())
    lines += [END, b"\n", RETURNED, b"\n"]
    return raw.replace(b"ZIGREF_MORPHIC_BEGIN", b"".join(lines) + b"ZIGREF_MORPHIC_BEGIN")


def self_test():
    valid = sample()
    domains = (0x80200000, 0x80202000, 0x80202000, 0x80203000, 0x80203000, 0x80228000)
    parse(valid, domains, (0x80220000, 0x80228000))
    replacements = [
        (BEGIN, b""), (RETURNED, b""),
        (b"satp_after=8000000000080220", b"satp_after=0000000000080220"),
        (b"root_physical=0000000080220000", b"root_physical=0000000080221000"),
        (b"text_end=0000000080202000", b"text_end=0000000080202800"),
        (b"rodata_begin=0000000080202000", b"rodata_begin=0000000080203000"),
        (b"leaf_count=0000000000000029", b"leaf_count=0000000000000028"),
        (b"leaf_va=0000000080200000", b"leaf_va=0000000080201000"),
        (b"level=0000000000000000", b"level=0000000000000001"),
        (b"pa=0000000080200000", b"pa=0000000080201000"),
        (b"pte=000000002008004b", b"pte=000000002008004f"),
        (b"pte=0000000020080843", b"pte=000000002008084b"),
        (b"pte=0000000020080cc7", b"pte=0000000020080ccf"),
        (b"pte=0000000020089cc7", b"pte=0000000020089cd7"),
        (b"sfence_vma=global-executed", b"sfence_vma=missing"),
        (b"code_probe=PASS", b"code_probe=FAIL"),
        (b"alias_read=18a11a55c0de0039", b"alias_read=18a11a55c0de0038"),
        (b"ZIGREF_SV39_ACTIVE_RETURNED", b""),
    ]
    for old, new in replacements:
        bad = valid.replace(old, new, 1)
        try:
            parse(bad)
        except (RuntimeError, ValueError):
            pass
        else:
            raise AssertionError(f"contradictory permission evidence was accepted: {old!r}")
    try: parse(valid + BEGIN)
    except RuntimeError: pass
    else: raise AssertionError("duplicate permission frame was accepted")
    print("PASS: permission framing, raw PTE decoding, exact ELF domains, supervisor-only W^X, live-mutation/fence ordering, probes, preservation, and rejection paths")
    return 0


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "ELF-derived supervisor-only Sv39 permission domains execute on two real RISC-V machines",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_18.md"]
    if failure: args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]: return self_test()
    if sys.argv[1:]: print(f"usage: {COMMAND} [--self-test]", file=sys.stderr); return 2
    qemu, readelf = shutil.which("qemu-system-riscv64"), shutil.which("readelf")
    if not qemu or not readelf:
        missing = "qemu-system-riscv64" if not qemu else "readelf"
        handoff("FAIL", f"required command is missing: {missing}"); return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-sv39-permissions-") as prefix:
            print("phase: build and inspect ELF permission domains", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC":
                raise RuntimeError("artifact is not a RISC-V executable")
            names = ("__text_domain_begin", "__text_domain_end", "__rodata_domain_begin", "__rodata_domain_end", "__writable_domain_begin", "__writable_domain_end")
            domains = tuple(trap.symbol_value(symbols, name) for name in names)
            pool = (trap.symbol_value(symbols, "__physical_page_pool_begin"), trap.symbol_value(symbols, "__physical_page_pool_end"))
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real hardened-Sv39 machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, TIMEOUT_SECONDS) for _ in range(2)]
            records = [parse(value, domains, pool) for value in raw]
            wb, we = trap.symbol_value(symbols, "ticksWaitBegin"), trap.symbol_value(symbols, "ticksWaitEnd")
            one_b, one_e = trap.symbol_value(symbols, "timerWaitBegin"), trap.symbol_value(symbols, "timerWaitEnd")
            bp = trap.symbol_value(symbols, "trapProbeBreakpoint")
            for value in raw:
                physical.parse(value, *pool); scheduler.parse_scheduler_time(value)
                ticks.parse_ticks(value, wb, we); timer.parse_timer(value, one_b, one_e)
                if int(trap.parse_trap(value)["sepc"], 16) != bp:
                    raise RuntimeError("Batch 12 breakpoint proof regressed")
            payloads = [morphic.extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]):
                raise RuntimeError("canonical Morphic bytes drifted")
            print(f"result: PASS: text=[0x{domains[0]:x},0x{domains[1]:x}) RX; rodata=[0x{domains[2]:x},0x{domains[3]:x}) R/NX", flush=True)
            print(f"result: PASS: writable=[0x{domains[4]:x},0x{domains[5]:x}) RW/NX; leaves={records[0]['leaves']} U=0 W+X=0 runs=2", flush=True)
            print(f"result: PASS: same Sv39 root=0x{records[0]['root']:x}; global SFENCE.VMA; Batch 12-17 and {len(payloads[0])}-byte Morphic preserved", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError, ValueError) as error:
        print(f"sv39-permissions-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")

if __name__ == "__main__": raise SystemExit(main())
