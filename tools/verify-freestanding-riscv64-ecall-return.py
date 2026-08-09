#!/usr/bin/env python3
"""Prove the bounded Batch 20 U-mode ECALL service/return boundary."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-ecall-return.py"
TIMEOUT = 15
PAGE = 4096
BEGIN = b"ZIGREF_ECALL_RETURN_BEGIN"
END = b"ZIGREF_ECALL_RETURN_END"
RETURNED = b"ZIGREF_ECALL_RETURN_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


prior = load("batch19", "tools/verify-freestanding-riscv64-umode-round-trip.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed hexadecimal evidence")
    return int(value, 16)


def elf_truth(artifact):
    domains, pool, _, supervisor = prior.elf_truth(artifact)
    output = run(["readelf", "-sW", str(artifact)]).decode()
    wanted = ("userServiceProbeTemplateBegin", "userServiceProbeServiceEcall",
              "userServiceProbeAfterService", "userServiceProbeTerminalEcall",
              "userServiceProbeTemplateEnd", "userServiceTrapEntry",
              "userServiceSupervisorResume")
    found = {}
    for line in output.splitlines():
        parts = line.split()
        if len(parts) >= 8 and parts[-1] in wanted:
            found[parts[-1]] = int(parts[1], 16)
    if set(found) != set(wanted):
        raise RuntimeError("Batch 20 ELF symbols missing")
    return domains, pool, found, supervisor


def parse_fields(raw, begin, end):
    body = raw.split(begin, 1)[1].split(end, 1)[0].strip().decode("ascii")
    headers, rows = {}, []
    for line in body.splitlines():
        fields = {}
        for item in line.split(","):
            key, separator, value = item.partition("=")
            if not separator or not key or key in fields:
                raise RuntimeError("malformed or duplicate Batch 20 evidence field")
            fields[key] = value
        if "leaf_va" in fields:
            rows.append(fields)
        elif len(fields) == 1:
            key, value = next(iter(fields.items()))
            if key in headers:
                raise RuntimeError("duplicate Batch 20 header")
            headers[key] = value
        else:
            raise RuntimeError("malformed Batch 20 evidence")
    return headers, rows


def prior_leaf_truth(raw):
    headers, rows = parse_fields(raw, prior.BEGIN, prior.END)
    leaves = {fixed(row["leaf_va"], "Batch 19 leaf_va"):
              (fixed(row["pa"], "Batch 19 pa"), fixed(row["pte"], "Batch 19 pte"),
               fixed(row["level"], "Batch 19 level")) for row in rows}
    return (fixed(headers["user_code_pa"], "Batch 19 user_code_pa"),
            fixed(headers["user_stack_pa"], "Batch 19 user_stack_pa"), leaves)


def require_policy(pa, pte, expected_pa, flags, description):
    if pa != expected_pa or pte & 0xff != flags:
        raise RuntimeError(f"{description} leaf has wrong PA or V/R/W/X/U/A/D policy")


def parse(raw, truth=None):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("requires exactly one Batch 20 frame and return marker")
    if not (raw.find(prior.RETURNED) < raw.find(BEGIN) < raw.find(END) <
            raw.find(RETURNED) < raw.find(b"ZIGREF_MORPHIC_BEGIN")):
        raise RuntimeError("Batch 20 ordering contradicts Batch 19 or Morphic")

    if truth is None:
        domains = pool = symbols = supervisor = None
        old = prior.parse(raw)
    else:
        domains, pool, symbols, supervisor = truth
        # Batch 19 remains the strict authority for the complete prior frame.
        old = prior.parse(raw, domains, pool, None, supervisor)
    old_code_pa, old_stack_pa, old_leaves = prior_leaf_truth(raw)
    headers, rows = parse_fields(raw, BEGIN, END)
    required = {
        "page_size", "satp_before", "satp_after", "root_physical",
        "page_table_count_before", "page_table_count_after",
        "physical_allocated_before", "physical_allocated_after", "user_code_va",
        "user_code_pa", "user_stack_va", "user_stack_pa", "user_stack_top",
        "template_begin", "service_ecall", "after_service", "terminal_ecall",
        "template_end", "template_size", "translation_change", "sfence_vma",
        "fence_i", "stvec_before", "trap_stvec", "trap_stack_begin",
        "trap_stack_end", "first_trap_frame", "second_trap_frame",
        "first_scause", "first_interrupt", "first_sepc", "first_sstatus",
        "first_user_sp", "first_a0", "first_a1", "service_result",
        "prepared_sepc", "prepared_sstatus", "return_to_user_count",
        "second_scause", "second_interrupt", "second_sepc", "second_sstatus",
        "second_user_sp", "user_observed_result", "post_return_sentinel",
        "terminal_marker", "terminal_to_supervisor_count", "trap_count",
        "terminal_return_sepc", "terminal_return_sstatus", "supervisor_resume",
        "stvec_after", "sscratch_after", "final_u_leaves",
        "final_wx_leaves", "final_leaf_count", "complete",
    }
    if set(headers) != required:
        raise RuntimeError(f"Batch 20 header set incomplete or unexpected: {sorted(set(headers) ^ required)}")
    numeric = {key: fixed(value, key) for key, value in headers.items()
               if re.fullmatch(r"[0-9a-f]{16}", value)}
    if numeric["page_size"] != PAGE:
        raise RuntimeError("Batch 20 does not use 4 KiB pages")
    if headers["translation_change"] != "none" or headers["sfence_vma"] != "not-required-no-pte-change":
        raise RuntimeError("false PTE/SFENCE.VMA policy")
    if headers["fence_i"] != "local-hart-executed":
        raise RuntimeError("FENCE.I evidence missing")
    if numeric["satp_before"] != numeric["satp_after"] or numeric["root_physical"] != old["root"]:
        raise RuntimeError("satp/root drift")
    if numeric["page_table_count_before"] != numeric["page_table_count_after"]:
        raise RuntimeError("page-table count grew during Batch 20")
    if numeric["physical_allocated_before"] != numeric["physical_allocated_after"]:
        raise RuntimeError("physical allocation count grew during Batch 20")

    code_va, stack_va, stack_top = (numeric[key] for key in
                                    ("user_code_va", "user_stack_va", "user_stack_top"))
    code_pa, stack_pa = numeric["user_code_pa"], numeric["user_stack_pa"]
    if (code_va, stack_va, stack_top) != (0x80401000, 0x80402000, 0x80403000):
        raise RuntimeError("bounded user layout changed")
    if (code_pa, stack_pa) != (old_code_pa, old_stack_pa):
        raise RuntimeError("Batch 19 user code/stack PA drift")

    runtime_symbols = [numeric[key] for key in
                       ("template_begin", "service_ecall", "after_service",
                        "terminal_ecall", "template_end")]
    if symbols is not None:
        elf_symbols = [symbols[key] for key in
                       ("userServiceProbeTemplateBegin", "userServiceProbeServiceEcall",
                        "userServiceProbeAfterService", "userServiceProbeTerminalEcall",
                        "userServiceProbeTemplateEnd")]
        if runtime_symbols != elf_symbols:
            raise RuntimeError("runtime Batch 20 symbols disagree with ELF truth")
        if numeric["stvec_before"] != supervisor or numeric["trap_stvec"] != symbols["userServiceTrapEntry"]:
            raise RuntimeError("runtime trap vectors disagree with ELF truth")
    if not all(left < right for left, right in zip(runtime_symbols, runtime_symbols[1:])):
        raise RuntimeError("Batch 20 template symbol order invalid")
    if numeric["template_size"] != runtime_symbols[-1] - runtime_symbols[0]:
        raise RuntimeError("copied template size contradiction")
    expected = [code_va + value - runtime_symbols[0] for value in runtime_symbols[1:4]]
    if [numeric["first_sepc"], numeric["prepared_sepc"], numeric["second_sepc"]] != expected:
        raise RuntimeError("ELF-derived service/resume/terminal PC contradiction")

    for prefix in ("first", "second"):
        if numeric[f"{prefix}_scause"] != 8 or headers[f"{prefix}_interrupt"] != "0":
            raise RuntimeError(f"{prefix} trap is not synchronous cause-8 ECALL")
        if numeric[f"{prefix}_sstatus"] & 0x100:
            raise RuntimeError(f"{prefix} trapped SPP is not U-mode")
    prepared = numeric["prepared_sstatus"]
    if prepared & (0x100 | 0x2 | 0x20 | 0x40000):
        raise RuntimeError("prepared sstatus has unsafe SPP/SIE/SPIE/SUM policy")
    terminal_status = numeric["terminal_return_sstatus"]
    if symbols is not None and numeric["terminal_return_sepc"] != symbols["userServiceSupervisorResume"]:
        raise RuntimeError("terminal supervisor continuation disagrees with ELF truth")
    if not terminal_status & 0x100 or terminal_status & (0x2 | 0x20 | 0x40000):
        raise RuntimeError("terminal SRET status does not establish safe S-mode continuation")

    trap_begin, trap_end = numeric["trap_stack_begin"], numeric["trap_stack_end"]
    frames_seen = [numeric["first_trap_frame"], numeric["second_trap_frame"]]
    if any(not (trap_begin <= frame and frame + 288 <= trap_end) for frame in frames_seen):
        raise RuntimeError("trap frame outside trusted supervisor trap stack")
    if frames_seen[0] != frames_seen[1]:
        raise RuntimeError("fixed trap stack was not rearmed")
    expected_sp = stack_top - 32
    if numeric["first_user_sp"] != expected_sp or numeric["second_user_sp"] != expected_sp:
        raise RuntimeError("saved user sp outside exact bounded reservation")
    if (numeric["first_a0"], numeric["first_a1"], numeric["service_result"]) != (0x20, 0x19, 0x39):
        raise RuntimeError("fixed service input/result contradiction")
    if (numeric["user_observed_result"], numeric["post_return_sentinel"],
            numeric["terminal_marker"]) != (0x39, 0x2020, 0x20ee):
        raise RuntimeError("post-return user evidence contradiction")
    for key in ("return_to_user_count", "terminal_to_supervisor_count"):
        if numeric[key] != 1:
            raise RuntimeError(f"{key} is not exactly one")
    if numeric["trap_count"] != 2:
        raise RuntimeError("Batch 20 U-origin trap count is not exactly two")
    if headers["supervisor_resume"] != "PASS" or headers["complete"] != "PASS":
        raise RuntimeError("supervisor continuation or completion missing")
    if numeric["stvec_after"] != numeric["stvec_before"] or numeric["sscratch_after"] != 0:
        raise RuntimeError("actual stvec/sscratch restoration contradiction")

    if len(rows) != numeric["final_leaf_count"]:
        raise RuntimeError("final leaf count contradicts raw rows")
    if domains is None:
        # Prior strict parsing already establishes domains; derive them from its raw rows.
        perm_headers, _ = parse_fields(raw, prior.perm.BEGIN, prior.perm.END)
        domains = tuple(fixed(perm_headers[key], key) for key in
                        ("text_begin", "text_end", "rodata_begin", "rodata_end",
                         "writable_begin", "writable_end"))
    tb, te, rb, re_, wb, we = domains
    expected_vas = set(range(tb, te, PAGE)) | set(range(rb, re_, PAGE)) | set(range(wb, we, PAGE))
    expected_vas |= {0x80400000, code_va, stack_va}
    seen, users, wx = {}, 0, 0
    for row in rows:
        if set(row) != {"leaf_va", "pa", "pte", "level"}:
            raise RuntimeError("raw final leaf row malformed")
        va, pa, pte, level = (fixed(row[key], key) for key in ("leaf_va", "pa", "pte", "level"))
        if va in seen or level != 0 or pte >> 54 or ((pte >> 10) & ((1 << 44) - 1)) << 12 != pa:
            raise RuntimeError("duplicate, non-4K, or malformed final leaf")
        users += int(bool(pte & 0x10)); wx += int(pte & 0xc == 0xc)
        if tb <= va < te: require_policy(pa, pte, va, 0x4b, "kernel text")
        elif rb <= va < re_: require_policy(pa, pte, va, 0x43, "kernel rodata")
        elif wb <= va < we: require_policy(pa, pte, va, 0xc7, "kernel writable")
        elif va == 0x80400000: require_policy(pa, pte, old_leaves[va][0], 0xc7, "alias")
        elif va == code_va: require_policy(pa, pte, old_code_pa, 0x5b, "user code")
        elif va == stack_va: require_policy(pa, pte, old_stack_pa, 0xd7, "user stack")
        else: raise RuntimeError("unexpected final virtual leaf")
        seen[va] = (pa, pte)
    if set(seen) != expected_vas:
        raise RuntimeError("final leaf set has an added, missing, or changed VA")
    if {va: (pa, pte, 0) for va, (pa, pte) in seen.items()} != old_leaves:
        raise RuntimeError("post-Batch-20 leaf set differs from strict Batch 19 truth")
    if users != 2 or wx != 0 or numeric["final_u_leaves"] != users or numeric["final_wx_leaves"] != wx:
        raise RuntimeError("raw final leaves contradict U=2/W+X=0 evidence")
    trap_leaf = frames_seen[0] & ~(PAGE - 1)
    if trap_leaf not in seen or seen[trap_leaf][1] & 0xff != 0xc7:
        raise RuntimeError("trap stack leaf is not supervisor RW/NX")
    return {"root": old["root"], "leaves": len(rows), "frame": frames_seen[0], "headers": headers}


def replace_frame(raw, old, new):
    prefix, rest = raw.split(BEGIN, 1); frame, suffix = rest.split(END, 1)
    if old not in frame: raise AssertionError(f"mutation source absent: {old!r}")
    return prefix + BEGIN + frame.replace(old, new, 1) + END + suffix


def reject(raw, truth, old, new):
    bad = replace_frame(raw, old, new) if old in raw.split(BEGIN, 1)[1].split(END, 1)[0] else raw.replace(old, new, 1)
    try: parse(bad, truth)
    except RuntimeError: return
    raise AssertionError(f"contradictory evidence accepted: {old!r}")


def reject_raw(raw, truth):
    try: parse(raw, truth)
    except RuntimeError: return
    raise AssertionError("contradictory frame ordering accepted")


def self_test():
    with tempfile.TemporaryDirectory(prefix="zigref-ecall-return-self-test-") as prefix:
        subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
        artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
        truth = elf_truth(artifact); qemu = shutil.which("qemu-system-riscv64")
        if not qemu: raise RuntimeError("qemu-system-riscv64 required for rejection fixture")
        raw = run([qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)], TIMEOUT)
        record = parse(raw, truth); h = record["headers"]
        reject_raw(raw.replace(prior.RETURNED, b"", 1).replace(BEGIN, BEGIN + b"\n" + prior.RETURNED, 1), truth)
        reject_raw(raw.replace(RETURNED, b"", 1).replace(b"ZIGREF_MORPHIC_BEGIN", b"ZIGREF_MORPHIC_BEGIN\n" + RETURNED, 1), truth)
        mutations = [
            (BEGIN, b""), (END, b""), (RETURNED, b""),
            (b"trap_count=0000000000000002", b"trap_count=0000000000000001"),
            (b"trap_count=0000000000000002", b"trap_count=0000000000000003"),
            (b"first_interrupt=0", b"first_interrupt=1"), (b"second_interrupt=0", b"second_interrupt=1"),
            (b"first_scause=0000000000000008", b"first_scause=0000000000000009"),
            (b"second_scause=0000000000000008", b"second_scause=0000000000000009"),
            (f"first_sstatus={int(h['first_sstatus'],16):016x}".encode(), f"first_sstatus={int(h['first_sstatus'],16)|0x100:016x}".encode()),
            (f"second_sstatus={int(h['second_sstatus'],16):016x}".encode(), f"second_sstatus={int(h['second_sstatus'],16)|0x100:016x}".encode()),
            (f"first_sepc={int(h['first_sepc'],16):016x}".encode(), b"first_sepc=0000000080401000"),
            (f"second_sepc={int(h['second_sepc'],16):016x}".encode(), b"second_sepc=0000000080401000"),
            (f"prepared_sepc={int(h['prepared_sepc'],16):016x}".encode(), b"prepared_sepc=0000000080401000"),
            (f"first_user_sp={int(h['first_user_sp'],16):016x}".encode(), b"first_user_sp=0000000080403000"),
            (f"second_user_sp={int(h['second_user_sp'],16):016x}".encode(), b"second_user_sp=0000000080403000"),
            (f"first_trap_frame={int(h['first_trap_frame'],16):016x}".encode(), b"first_trap_frame=0000000080402000"),
            (f"second_trap_frame={int(h['second_trap_frame'],16):016x}".encode(), b"second_trap_frame=0000000080402000"),
            (b"first_a0=0000000000000020", b"first_a0=0000000000000021"),
            (b"first_a1=0000000000000019", b"first_a1=0000000000000018"),
            (b"service_result=0000000000000039", b"service_result=0000000000000038"),
            (f"prepared_sstatus={int(h['prepared_sstatus'],16):016x}".encode(), f"prepared_sstatus={int(h['prepared_sstatus'],16)|0x40122:016x}".encode()),
            (b"user_observed_result=0000000000000039", b"user_observed_result=0000000000000038"),
            (b"post_return_sentinel=0000000000002020", b"post_return_sentinel=0000000000002021"),
            (b"terminal_marker=00000000000020ee", b"terminal_marker=00000000000020ef"),
            (b"return_to_user_count=0000000000000001", b"return_to_user_count=0000000000000002"),
            (b"terminal_to_supervisor_count=0000000000000001", b"terminal_to_supervisor_count=0000000000000002"),
            (f"terminal_return_sepc={int(h['terminal_return_sepc'],16):016x}".encode(), b"terminal_return_sepc=0000000080200000"),
            (f"terminal_return_sstatus={int(h['terminal_return_sstatus'],16):016x}".encode(), f"terminal_return_sstatus={int(h['terminal_return_sstatus'],16)&~0x100:016x}".encode()),
            (f"stvec_after={int(h['stvec_after'],16):016x}".encode(), b"stvec_after=0000000000000000"),
            (b"sscratch_after=0000000000000000", b"sscratch_after=0000000000000001"),
            (f"satp_after={int(h['satp_after'],16):016x}".encode(), b"satp_after=0000000000000000"),
            (f"root_physical={int(h['root_physical'],16):016x}".encode(), b"root_physical=0000000000000000"),
            (f"page_table_count_after={int(h['page_table_count_after'],16):016x}".encode(), f"page_table_count_after={int(h['page_table_count_after'],16)+1:016x}".encode()),
            (f"physical_allocated_after={int(h['physical_allocated_after'],16):016x}".encode(), f"physical_allocated_after={int(h['physical_allocated_after'],16)+1:016x}".encode()),
            (f"user_code_pa={int(h['user_code_pa'],16):016x}".encode(), b"user_code_pa=0000000080000000"),
            (f"user_stack_pa={int(h['user_stack_pa'],16):016x}".encode(), b"user_stack_pa=0000000080000000"),
            (b"fence_i=local-hart-executed", b"fence_i=missing"),
            (b"sfence_vma=not-required-no-pte-change", b"sfence_vma=global-executed"),
        ]
        for old, new in mutations: reject(raw, truth, old, new)
        _, rows = parse_fields(raw, BEGIN, END); first = ("leaf_va=" + rows[0]["leaf_va"] + ",pa=" + rows[0]["pa"] + ",pte=" + rows[0]["pte"] + ",level=" + rows[0]["level"]).encode()
        reject(raw, truth, first, b"")
        reject(raw, truth, first, first.replace(b"pte=", b"pte=000000000000000f,"))
        code = next(("leaf_va=" + r["leaf_va"] + ",pa=" + r["pa"] + ",pte=" + r["pte"] + ",level=" + r["level"]).encode() for r in rows if r["leaf_va"] == "0000000080401000")
        trap_page = int(h["first_trap_frame"], 16) & ~(PAGE - 1)
        trap_row = next(("leaf_va=" + r["leaf_va"] + ",pa=" + r["pa"] + ",pte=" + r["pte"] + ",level=" + r["level"]).encode() for r in rows if int(r["leaf_va"], 16) == trap_page)
        reject(raw, truth, code, code + code.replace(b"80401000", b"80403000", 1))
        reject(raw, truth, code, code.replace(b"5b,level", b"5f,level"))
        reject(raw, truth, trap_row, trap_row.replace(b"c7,level", b"d7,level"))
        reject(raw, truth, trap_row, trap_row.replace(b"c7,level", b"cf,level"))
    print("PASS: Batch 20 framing, trap, status, frame, allocation, mapping, CSR, fence, and leaf rejection paths")


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "bounded U-mode ECALL service returns once to U-mode then terminates through a second ECALL",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_20.md"]
    if failure: args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]: self_test(); return 0
    if sys.argv[1:]: print(f"usage: {COMMAND} [--self-test]", file=sys.stderr); return 2
    qemu = shutil.which("qemu-system-riscv64")
    if not qemu: return handoff("FAIL", "required command is missing: qemu-system-riscv64") or 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-ecall-return-") as prefix:
            print("phase: build ELF and inspect Batch 20 symbols", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"; truth = elf_truth(artifact)
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print("phase: execute and reject-check two bounded real ECALL-return machines", flush=True)
            raw = [run(command, TIMEOUT) for _ in range(2)]; records = [parse(value, truth) for value in raw]
            payloads = [prior.perm.morphic.extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]) or len(payloads[0]) != 765:
                raise RuntimeError("canonical 765-byte Morphic equality drifted")
            print(f"result: PASS: runs=2 traps=2 leaves={records[0]['leaves']} frame=0x{records[0]['frame']:x} U=2 W+X=0 Morphic=765", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError, ValueError) as error:
        print(f"ecall-return-lab: FAIL: {error}", file=sys.stderr); handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__": raise SystemExit(main())
