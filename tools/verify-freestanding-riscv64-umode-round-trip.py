#!/usr/bin/env python3
"""Prove one bounded Sv39 S-to-U-to-S round trip on two real machines."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-umode-round-trip.py"
TIMEOUT = 15
PAGE = 4096
BEGIN = b"ZIGREF_UMODE_BEGIN"
END = b"ZIGREF_UMODE_END"
RETURNED = b"ZIGREF_UMODE_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


perm = load("umode_permissions", "tools/verify-freestanding-riscv64-sv39-permissions.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed hexadecimal evidence")
    return int(value, 16)


def expected_pages(domains):
    tb, te, rb, re_, wb, we = domains
    return set(range(tb, te, PAGE)) | set(range(rb, re_, PAGE)) | set(range(wb, we, PAGE))


def require_policy(va, pa, pte, expected_pa, flags, description):
    if pa != expected_pa or pte & 0xff != flags:
        raise RuntimeError(f"{description} leaf has wrong PA or V/R/W/X/U/A/D policy")


def parse(raw, domains=None, pool=None, elf_template=None, supervisor_entry=None):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("requires exactly one U-mode frame and return marker")
    if not (raw.find(perm.RETURNED) < raw.find(BEGIN) < raw.find(END) <
            raw.find(RETURNED) < raw.find(b"ZIGREF_MORPHIC_BEGIN")):
        raise RuntimeError("Batch 19 ordering contradicts Batch 18 or Morphic")

    prior = perm.parse(raw, domains, pool)
    domains = prior["domains"]
    active = perm.active.parse(raw, pool, (domains[0], domains[-1]))
    body = raw.split(BEGIN, 1)[1].split(END, 1)[0].strip().decode("ascii")
    headers, rows = {}, []
    for line in body.splitlines():
        fields = {}
        for item in line.split(","):
            key, separator, value = item.partition("=")
            if not separator or not key or key in fields:
                raise RuntimeError("malformed or duplicate U-mode evidence field")
            fields[key] = value
        if "leaf_va" in fields:
            rows.append(fields)
        elif len(fields) == 1:
            key, value = next(iter(fields.items()))
            if key in headers:
                raise RuntimeError("duplicate U-mode header")
            headers[key] = value
        else:
            raise RuntimeError("malformed U-mode evidence")

    required = {
        "page_size", "satp_before", "satp_after", "root_physical",
        "page_table_count_before", "page_table_count_after", "stvec_before",
        "user_stvec", "stvec_after", "sscratch_after", "trap_stack_begin",
        "trap_stack_end", "trap_frame", "user_code_va", "user_code_pa",
        "user_stack_va", "user_stack_pa", "user_stack_top", "template_begin",
        "template_end", "template_ecall", "expected_ecall", "sfence_vma",
        "fence_i", "prepared_spp", "prepared_sie", "prepared_spie",
        "prepared_sum", "scause", "interrupt", "sepc", "sstatus",
        "trapped_spp", "user_sp", "user_a0", "user_t0", "user_t1",
        "stack_sentinel", "supervisor_resume", "check_cause", "check_sepc",
        "check_frame", "leaf_count", "complete",
    }
    if set(headers) != required:
        raise RuntimeError(f"U-mode header set incomplete or unexpected: {sorted(set(headers) ^ required)}")
    if fixed(headers["page_size"], "page_size") != PAGE:
        raise RuntimeError("final proof does not use 4 KiB pages")
    if headers["sfence_vma"] != "global-executed" or headers["fence_i"] != "local-hart-executed":
        raise RuntimeError("required SFENCE.VMA/FENCE.I boundary missing")
    if fixed(headers["satp_before"], "satp_before") != fixed(headers["satp_after"], "satp_after"):
        raise RuntimeError("satp drift")
    if fixed(headers["root_physical"], "root") != prior["root"]:
        raise RuntimeError("root drift")
    if headers["page_table_count_before"] != headers["page_table_count_after"]:
        raise RuntimeError("alias L0 subtree was not reused")
    table_count = fixed(headers["page_table_count_after"], "page_table_count_after")
    if table_count != len(active["pages"]):
        raise RuntimeError("final page-table count contradicts preserved page-table evidence")

    historical_stvec = fixed(headers["stvec_before"], "stvec_before")
    if supervisor_entry is not None and historical_stvec != supervisor_entry:
        raise RuntimeError("historical stvec disagrees with supervisorTrapEntry ELF symbol")
    if fixed(headers["stvec_after"], "stvec_after") != historical_stvec:
        raise RuntimeError("observed stvec was not restored")
    if fixed(headers["sscratch_after"], "sscratch_after") != 0:
        raise RuntimeError("observed sscratch was not neutralized")
    if any(headers[key] != "0" for key in ("prepared_spp", "prepared_sie", "prepared_spie", "prepared_sum")):
        raise RuntimeError("unsafe SRET status policy")

    trap_begin, trap_end, trap_frame = (fixed(headers[key], key) for key in
                                        ("trap_stack_begin", "trap_stack_end", "trap_frame"))
    if not trap_begin <= trap_frame or trap_frame + 288 > trap_end:
        raise RuntimeError("trap frame outside trusted supervisor trap stack")

    code_va, code_pa, stack_va, stack_pa, stack_top = (fixed(headers[key], key) for key in
        ("user_code_va", "user_code_pa", "user_stack_va", "user_stack_pa", "user_stack_top"))
    if (code_va, stack_va, stack_top) != (0x80401000, 0x80402000, 0x80403000):
        raise RuntimeError("bounded user layout changed")
    if code_pa == stack_pa:
        raise RuntimeError("user code and stack frames collide")

    runtime_template = tuple(fixed(headers[key], key) for key in
                             ("template_begin", "template_ecall", "template_end"))
    if elf_template is None:
        elf_template = runtime_template
    if runtime_template != elf_template:
        raise RuntimeError("runtime template symbols disagree with ELF truth")
    template_begin, template_ecall, template_end = elf_template
    if not template_begin < template_ecall < template_end:
        raise RuntimeError("ELF template symbol ordering is invalid")
    trusted_ecall = code_va + template_ecall - template_begin
    if fixed(headers["expected_ecall"], "expected_ecall") != trusted_ecall or fixed(headers["sepc"], "sepc") != trusted_ecall:
        raise RuntimeError("trapped sepc contradicts ELF-derived copied-template ECALL VA")

    if (fixed(headers["scause"], "scause") != 8 or headers["interrupt"] != "0" or
            headers["trapped_spp"] != "0" or fixed(headers["sstatus"], "sstatus") & 0x100):
        raise RuntimeError("trap was not a synchronous U-mode ECALL")
    sentinels = tuple(fixed(headers[key], key) for key in
                      ("user_a0", "user_t0", "user_t1", "stack_sentinel"))
    if fixed(headers["user_sp"], "user_sp") != stack_top - 16 or sentinels != (0x519, 0x139, 0x139, 0x139):
        raise RuntimeError("user register/stack probe contradiction")
    if headers["supervisor_resume"] != "PASS" or headers["complete"] != "PASS":
        raise RuntimeError("supervisor continuation missing")

    expected = expected_pages(domains) | {prior["alias"], code_va, stack_va}
    if len(rows) != fixed(headers["leaf_count"], "leaf_count"):
        raise RuntimeError("final leaf count contradiction")
    seen, users, wx = {}, 0, 0
    tb, te, rb, re_, wb, we = domains
    for row in rows:
        if set(row) != {"leaf_va", "pa", "pte", "level"}:
            raise RuntimeError("raw leaf row malformed")
        va, pa, pte, level = (fixed(row[key], key) for key in ("leaf_va", "pa", "pte", "level"))
        if va in seen:
            raise RuntimeError("duplicate final virtual leaf")
        if level != 0:
            raise RuntimeError("final leaf is not level 0 / 4 KiB")
        if pte >> 54 or ((pte >> 10) & ((1 << 44) - 1)) << 12 != pa:
            raise RuntimeError("raw PTE reserved bits or PPN/PA contradiction")
        if not pte & 1 or (pte & 4 and not pte & 2):
            raise RuntimeError("invalid final leaf encoding")
        user, write, execute = bool(pte & 16), bool(pte & 4), bool(pte & 8)
        users += int(user)
        wx += int(write and execute)
        if tb <= va < te:
            require_policy(va, pa, pte, va, 0x4b, "kernel text")
        elif rb <= va < re_:
            require_policy(va, pa, pte, va, 0x43, "kernel rodata")
        elif wb <= va < we:
            require_policy(va, pa, pte, va, 0xc7, "kernel writable")
        elif va == prior["alias"]:
            require_policy(va, pa, pte, prior["target"], 0xc7, "translated alias")
        elif va == code_va:
            require_policy(va, pa, pte, code_pa, 0x5b, "user code")
        elif va == stack_va:
            require_policy(va, pa, pte, stack_pa, 0xd7, "user stack")
        else:
            raise RuntimeError("unexpected final virtual leaf")
        seen[va] = (pa, pte)
    if set(seen) != expected:
        raise RuntimeError("final leaf set has a missing or unexpected leaf")
    if users != 2 or wx != 0:
        raise RuntimeError("final leaf set does not have exactly U=2 and W+X=0")

    trap_leaf = trap_frame & ~(PAGE - 1)
    if trap_leaf not in seen or seen[trap_leaf][1] & 0xff != 0xc7:
        raise RuntimeError("trusted trap frame is not on a supervisor RW/NX leaf")
    if pool is not None:
        pool_begin, pool_end = pool
        if not (pool_begin <= code_pa < pool_end and pool_begin <= stack_pa < pool_end):
            raise RuntimeError("user frames are outside the allocator-owned eight-page pool")
    forbidden = {prior["root"], prior["target"], *active["pages"]}
    if code_pa in forbidden or stack_pa in forbidden:
        raise RuntimeError("user frame collides with root, alias, or a page-table frame")
    return {"root": prior["root"], "leaves": len(rows), "code": code_va, "stack": stack_va}


def elf_truth(artifact):
    readelf = shutil.which("readelf")
    if not readelf:
        raise RuntimeError("required command is missing: readelf")
    symbols = run([readelf, "-Ws", str(artifact)]).decode()
    value = perm.trap.symbol_value
    domains = tuple(value(symbols, name) for name in (
        "__text_domain_begin", "__text_domain_end", "__rodata_domain_begin",
        "__rodata_domain_end", "__writable_domain_begin", "__writable_domain_end"))
    pool = (value(symbols, "__physical_page_pool_begin"), value(symbols, "__physical_page_pool_end"))
    template = tuple(value(symbols, name) for name in
                     ("userProbeTemplateBegin", "userProbeTemplateEcall", "userProbeTemplateEnd"))
    return domains, pool, template, value(symbols, "supervisorTrapEntry")


def replace_frame(raw, old, new):
    prefix, rest = raw.split(BEGIN, 1)
    frame, suffix = rest.split(END, 1)
    if old not in frame:
        raise AssertionError(f"self-test mutation source absent: {old!r}")
    return prefix + BEGIN + frame.replace(old, new, 1) + END + suffix


def self_test():
    with tempfile.TemporaryDirectory(prefix="zigref-umode-self-test-") as prefix:
        subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
        artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
        domains, pool, template, supervisor_entry = elf_truth(artifact)
        qemu = shutil.which("qemu-system-riscv64")
        if not qemu:
            raise RuntimeError("qemu-system-riscv64 required for rejection self-test fixture")
        command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
        raw = run(command, TIMEOUT)
        parse(raw, domains, pool, template, supervisor_entry)
        body = raw.split(BEGIN, 1)[1].split(END, 1)[0]
        lines = body.splitlines(keepends=True)
        leaf_lines = [line for line in lines if line.startswith(b"leaf_va=")]
        text_line = next(line for line in leaf_lines if f"leaf_va={domains[0]:016x}".encode() in line)
        rodata_line = next(line for line in leaf_lines if f"leaf_va={domains[2]:016x}".encode() in line)
        writable_line = next(line for line in leaf_lines if f"leaf_va={domains[4]:016x}".encode() in line)
        alias_line = next(line for line in leaf_lines if b"leaf_va=0000000080400000" in line)
        code_line = next(line for line in leaf_lines if b"leaf_va=0000000080401000" in line)
        extra_line = code_line.replace(b"leaf_va=0000000080401000", b"leaf_va=0000000080403000")
        leaf_count = len(leaf_lines)
        table_pa = perm.active.parse(raw, pool, (domains[0], domains[-1]))["pages"][0]
        code_pa = int(re.search(rb"pa=([0-9a-f]{16})", code_line).group(1), 16)
        collision = code_line.replace(f"pa={code_pa:016x}".encode(), f"pa={table_pa:016x}".encode()).replace(
            f"pte={((code_pa >> 12) << 10 | 0x5b):016x}".encode(), f"pte={((table_pa >> 12) << 10 | 0x5b):016x}".encode())
        mutations = [
            raw.replace(BEGIN, b"", 1),
            replace_frame(replace_frame(raw, text_line, b""),
                          f"leaf_count={leaf_count:016x}".encode(),
                          f"leaf_count={leaf_count - 1:016x}".encode()),
            replace_frame(replace_frame(raw, code_line, code_line + extra_line),
                          f"leaf_count={leaf_count:016x}".encode(),
                          f"leaf_count={leaf_count + 1:016x}".encode()),
            replace_frame(raw, text_line, text_line.replace(b"4b,", b"4f,")),
            replace_frame(raw, rodata_line, rodata_line.replace(b"43,", b"4b,")),
            replace_frame(raw, writable_line, writable_line.replace(b"c7,", b"cf,")),
            replace_frame(raw, alias_line, alias_line.replace(b"c7,", b"c3,")),
            replace_frame(raw, alias_line, alias_line.replace(b"c7,", b"d7,")),
            replace_frame(raw, code_line, collision),
            replace_frame(raw, f"template_begin={template[0]:016x}".encode(), f"template_begin={template[0] + 2:016x}".encode()),
            replace_frame(raw, f"stvec_after={supervisor_entry:016x}".encode(), b"stvec_after=0000000000000000"),
            replace_frame(raw, b"sscratch_after=0000000000000000", b"sscratch_after=0000000000000001"),
        ]
        for bad in mutations:
            try:
                parse(bad, domains, pool, template, supervisor_entry)
            except RuntimeError:
                pass
            else:
                raise AssertionError("contradictory U-mode evidence was accepted")
    print("PASS: exact final leaves, ELF-derived ECALL, frame ownership, CSR restoration, and rejection paths")
    return 0


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "bounded SRET U-mode ECALL round trip executes on two real RISC-V machines",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_19.md"]
    if failure:
        args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]:
        return self_test()
    if sys.argv[1:]:
        print(f"usage: {COMMAND} [--self-test]", file=sys.stderr)
        return 2
    qemu = shutil.which("qemu-system-riscv64")
    if not qemu:
        handoff("FAIL", "required command is missing: qemu-system-riscv64")
        return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-umode-") as prefix:
            print("phase: build ELF and inspect independent symbols", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            domains, pool, template, supervisor_entry = elf_truth(artifact)
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print("phase: execute and reject-check two bounded real U-mode machines", flush=True)
            raw = [run(command, TIMEOUT) for _ in range(2)]
            records = [parse(value, domains, pool, template, supervisor_entry) for value in raw]
            payloads = [perm.morphic.extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]) or len(payloads[0]) != 765:
                raise RuntimeError("canonical 765-byte Morphic equality drifted")
            print(f"result: PASS: runs=2 leaves={records[0]['leaves']} exact-final-set U=2 W+X=0 root=0x{records[0]['root']:x}", flush=True)
            print("result: PASS: ELF-derived sepc; owned frames; observed stvec/sscratch restoration", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError, ValueError) as error:
        print(f"umode-round-trip-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
