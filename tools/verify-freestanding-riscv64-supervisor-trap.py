#!/usr/bin/env python3
"""Prove one resumable S-mode EBREAK trap and preserved Morphic semantics."""

import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-supervisor-trap.py"
TIMEOUT_SECONDS = 15
TRAP_BEGIN = b"ZIGREF_TRAP_BEGIN"
TRAP_END = b"ZIGREF_TRAP_END"
RETURNED = b"ZIGREF_TRAP_RETURNED"

spec = importlib.util.spec_from_file_location("freestanding_morphic", ROOT / "tools/verify-freestanding-riscv64-morphic-runtime.py")
assert spec and spec.loader
morphic_verifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(morphic_verifier)


def run(command: list[str], *, timeout: int | None = None) -> bytes:
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def symbol_value(table: str, name: str) -> int:
    matches: list[int] = []
    for line in table.splitlines():
        parts = line.split()
        if len(parts) >= 8 and parts[-1] == name and re.fullmatch(r"[0-9A-Fa-f]+", parts[1]):
            matches.append(int(parts[1], 16))
    if len(matches) != 1:
        raise RuntimeError(f"ELF symbol {name} must appear exactly once")
    return matches[0]


def parse_trap(raw: bytes) -> dict[str, str]:
    if raw.count(TRAP_BEGIN) != 1 or raw.count(TRAP_END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one complete trap record and return marker")
    _, rest = raw.split(TRAP_BEGIN, 1)
    record, after = rest.split(TRAP_END, 1)
    if RETURNED not in after or b"ZIGREF_MORPHIC_BEGIN" not in after:
        raise RuntimeError("trap return and post-trap Morphic execution are not both evidenced")
    fields: dict[str, str] = {}
    for line in record.strip().decode("ascii").splitlines():
        key, separator, value = line.partition("=")
        if not separator or not key or key in fields:
            raise RuntimeError("trap record contains a malformed or duplicate field")
        fields[key] = value
    required = {"count", "cause", "interrupt", "sepc", "resume_delta", "stval", "sstatus", "registers", "stack"}
    if set(fields) != required:
        raise RuntimeError("trap record field set is incomplete or unexpected")
    if fields["count"] != "1" or fields["cause"] != "0000000000000003" or fields["interrupt"] != "0":
        raise RuntimeError("expected exactly one synchronous breakpoint exception")
    if fields["resume_delta"] != "4" or fields["registers"] != "PASS" or fields["stack"] != "PASS":
        raise RuntimeError("resume relationship or declared preservation probe failed")
    for name in ("sepc", "stval", "sstatus"):
        if not re.fullmatch(r"[0-9a-f]{16}", fields[name]):
            raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return fields


def handoff(status: str, failure: str | None = None) -> int:
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND,
            "--status", status, "--summary",
            "one real resumable S-mode breakpoint trap and post-trap Morphic equality",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_12.md"]
    if failure:
        args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def self_test() -> int:
    valid = (b"firmware\n" + TRAP_BEGIN + b"\ncount=1\ncause=0000000000000003\ninterrupt=0\n"
             b"sepc=0000000080201234\nresume_delta=4\nstval=0000000000000000\n"
             b"sstatus=8000000200006000\nregisters=PASS\nstack=PASS\n" + TRAP_END + b"\n" +
             RETURNED + b"\nZIGREF_MORPHIC_BEGIN\n00\nZIGREF_MORPHIC_END\n")
    assert parse_trap(valid)["cause"].endswith("3")
    symbols = """\n    21: 0000000080201234     0 NOTYPE  GLOBAL DEFAULT    1 trapProbeBreakpoint\n    22: 0000000080201238     0 NOTYPE  GLOBAL DEFAULT    1 trapProbeResume\n"""
    assert symbol_value(symbols, "trapProbeBreakpoint") == 0x80201234
    assert symbol_value(symbols, "trapProbeResume") - symbol_value(symbols, "trapProbeBreakpoint") == 4
    for invalid in (valid.replace(b"count=1", b"count=2"), valid.replace(b"interrupt=0", b"interrupt=1"),
                    valid.replace(RETURNED, b""), valid + TRAP_BEGIN, valid.replace(b"registers=PASS", b"registers=FAIL")):
        try:
            parse_trap(invalid)
        except RuntimeError:
            pass
        else:
            raise AssertionError("invalid trap evidence was accepted")
    for bad_symbols in (symbols.replace("trapProbeResume", "other"), symbols + symbols.splitlines()[1] + "\n"):
        try:
            symbol_value(bad_symbols, "trapProbeBreakpoint") if "other" not in bad_symbols else symbol_value(bad_symbols, "trapProbeResume")
        except RuntimeError:
            pass
        else:
            raise AssertionError("invalid ELF symbol evidence was accepted")
    print("PASS: trap framing, cause, interrupt, ELF-anchored resume, preservation, return, and ambiguity rejection")
    return 0


def main() -> int:
    if sys.argv[1:] == ["--self-test"]:
        return self_test()
    qemu, readelf = shutil.which("qemu-system-riscv64"), shutil.which("readelf")
    if not qemu or not readelf:
        missing = "qemu-system-riscv64" if not qemu else "readelf"
        handoff("FAIL", f"required command is missing: {missing}")
        return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-supervisor-trap-") as prefix:
            print("phase: build and inspect riscv64-freestanding-none supervisor trap payload", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if morphic_verifier.field(header, "Machine") != "RISC-V" or morphic_verifier.elf_type(header) != "EXEC":
                raise RuntimeError("artifact is not a RISC-V executable ELF")
            if morphic_verifier.field(header, "Entry point address") != "0x80200000" or "INTERP" in run([readelf, "-l", str(artifact)]).decode():
                raise RuntimeError("artifact does not satisfy the static firmware payload identity")
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            breakpoint_pc = symbol_value(symbols, "trapProbeBreakpoint")
            resume_pc = symbol_value(symbols, "trapProbeResume")
            if resume_pc - breakpoint_pc != 4:
                raise RuntimeError("compiled breakpoint/resume symbols do not establish the expected 32-bit instruction boundary")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute real system machine twice with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, timeout=TIMEOUT_SECONDS) for _ in range(2)]
            traps = [parse_trap(value) for value in raw]
            payloads = [morphic_verifier.extract(value) for value in raw]
            if traps[0] != traps[1]:
                raise RuntimeError("trap evidence is not deterministic across machine runs")
            if int(traps[0]["sepc"], 16) != breakpoint_pc:
                raise RuntimeError("observed sepc does not equal the compiled EBREAK address")
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]):
                raise RuntimeError("post-trap canonical Morphic payload comparison failed")
            print(f"result: PASS: cause=3 interrupt=0 sepc={traps[0]['sepc']} resume=0x{resume_pc:016x} delta=4 registers=PASS stack=PASS", flush=True)
            print(f"result: PASS: trap returned and native/fake/two system-QEMU payloads matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError) as error:
        print(f"supervisor-trap-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
