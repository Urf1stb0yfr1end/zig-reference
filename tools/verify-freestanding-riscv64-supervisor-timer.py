#!/usr/bin/env python3
"""Prove one bounded asynchronous S-mode timer interrupt and Morphic equality."""

import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-supervisor-timer.py"
TIMEOUT_SECONDS = 15
BEGIN = b"ZIGREF_TIMER_BEGIN"
END = b"ZIGREF_TIMER_END"
RETURNED = b"ZIGREF_TIMER_RETURNED"


def load(name: str, path: str):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


morphic = load("freestanding_morphic", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("supervisor_trap", "tools/verify-freestanding-riscv64-supervisor-trap.py")


def run(command: list[str], *, timeout: int | None = None) -> bytes:
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def parse_timer(raw: bytes, wait_begin: int | None = None, wait_end: int | None = None) -> dict[str, str]:
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one complete timer record and return marker")
    _, rest = raw.split(BEGIN, 1)
    record, after = rest.split(END, 1)
    if RETURNED not in after or b"ZIGREF_MORPHIC_BEGIN" not in after:
        raise RuntimeError("timer return and post-interrupt Morphic execution are not both evidenced")
    fields: dict[str, str] = {}
    for line in record.strip().decode("ascii").splitlines():
        key, separator, value = line.partition("=")
        if not separator or not key or key in fields:
            raise RuntimeError("timer record contains a malformed or duplicate field")
        fields[key] = value
    required = {"count", "cause", "interrupt", "sepc", "sepc_policy", "policy",
                "policy_complete", "registers", "stack", "sstatus"}
    if set(fields) != required:
        raise RuntimeError("timer record field set is incomplete or unexpected")
    if fields["count"] != "1" or fields["interrupt"] != "1" or fields["cause"] != "0000000000000005":
        raise RuntimeError("expected exactly one asynchronous supervisor timer interrupt")
    if fields["sepc_policy"] != "unchanged":
        raise RuntimeError("timer handler applied an invalid synchronous-exception sepc policy")
    if fields["policy"] != "mask-stie-and-set-timer-max" or fields["policy_complete"] != "PASS":
        raise RuntimeError("one-shot acknowledgement/disable policy did not complete")
    if fields["registers"] != "PASS" or fields["stack"] != "PASS":
        raise RuntimeError("declared timer context preservation failed")
    for name in ("sepc", "sstatus"):
        if not re.fullmatch(r"[0-9a-f]{16}", fields[name]):
            raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    if (wait_begin is None) != (wait_end is None):
        raise RuntimeError("timer wait ELF relationship is incomplete")
    if wait_begin is not None:
        pc = int(fields["sepc"], 16)
        if wait_begin >= wait_end or not wait_begin <= pc < wait_end:
            raise RuntimeError("observed timer sepc is outside the compiled wait window")
    return fields


def handoff(status: str, failure: str | None = None) -> int:
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND,
            "--status", status, "--summary",
            "one real bounded asynchronous S-mode timer interrupt and post-interrupt Morphic equality",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_13.md"]
    if failure:
        args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def self_test() -> int:
    valid = (b"firmware\nZIGREF_TRAP_BEGIN\ncount=1\ncause=0000000000000003\ninterrupt=0\n"
             b"sepc=0000000080200100\nresume_delta=4\nstval=0000000000000000\n"
             b"sstatus=8000000200006000\nregisters=PASS\nstack=PASS\nZIGREF_TRAP_END\n"
             b"ZIGREF_TRAP_RETURNED\n" + BEGIN + b"\ncount=1\ncause=0000000000000005\n"
             b"interrupt=1\nsepc=0000000080200204\nsepc_policy=unchanged\n"
             b"policy=mask-stie-and-set-timer-max\npolicy_complete=PASS\nregisters=PASS\n"
             b"stack=PASS\nsstatus=8000000200006020\n" + END + b"\n" + RETURNED +
             b"\nZIGREF_MORPHIC_BEGIN\n00\nZIGREF_MORPHIC_END\n")
    assert parse_timer(valid, 0x80200200, 0x80200210)["cause"].endswith("5")
    trap.parse_trap(valid)
    invalid = [valid.replace(b"interrupt=1", b"interrupt=0"),
               valid.replace(b"cause=0000000000000005", b"cause=0000000000000003"),
               valid.replace(RETURNED, b""), valid + BEGIN,
               valid.replace(b"count=1\ncause=0000000000000005", b"count=2\ncause=0000000000000005"),
               valid.replace(b"policy_complete=PASS", b"policy_complete=FAIL"),
               valid.replace(b"sepc=0000000080200204", b"sepc=garbage")]
    for value in invalid:
        try:
            parse_timer(value, 0x80200200, 0x80200210)
        except RuntimeError:
            pass
        else:
            raise AssertionError("invalid timer evidence was accepted")
    for bounds in ((None, 0x80200210), (0x80200210, 0x80200200), (0x80200300, 0x80200310)):
        try:
            parse_timer(valid, *bounds)
        except RuntimeError:
            pass
        else:
            raise AssertionError("contradictory ELF timer relationship was accepted")
    print("PASS: timer framing, async cause, one-shot policy, ELF wait bounds, preservation, return, and rejection paths")
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
        with tempfile.TemporaryDirectory(prefix="zigref-supervisor-timer-") as prefix:
            print("phase: build and inspect riscv64-freestanding-none supervisor timer payload", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC":
                raise RuntimeError("artifact is not a RISC-V executable ELF")
            if morphic.field(header, "Entry point address") != "0x80200000" or "INTERP" in run([readelf, "-l", str(artifact)]).decode():
                raise RuntimeError("artifact does not satisfy the static firmware payload identity")
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            wait_begin = trap.symbol_value(symbols, "timerWaitBegin")
            wait_end = trap.symbol_value(symbols, "timerWaitEnd")
            breakpoint_pc = trap.symbol_value(symbols, "trapProbeBreakpoint")
            resume_pc = trap.symbol_value(symbols, "trapProbeResume")
            if resume_pc - breakpoint_pc != 4 or wait_begin >= wait_end:
                raise RuntimeError("compiled synchronous/timer ELF relationships are invalid")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real asynchronous timer machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, timeout=TIMEOUT_SECONDS) for _ in range(2)]
            timers = [parse_timer(value, wait_begin, wait_end) for value in raw]
            traps = [trap.parse_trap(value) for value in raw]
            payloads = [morphic.extract(value) for value in raw]
            if any(int(item["sepc"], 16) != breakpoint_pc for item in traps):
                raise RuntimeError("Batch 12 compiled breakpoint relationship regressed")
            stable_timer = [{key: value for key, value in item.items() if key not in {"sepc", "sstatus"}} for item in timers]
            if stable_timer[0] != stable_timer[1]:
                raise RuntimeError("deterministic timer evidence differs across machine runs")
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]):
                raise RuntimeError("post-interrupt canonical Morphic payload comparison failed")
            print(f"result: PASS: interrupt=1 cause=5 deliveries=1 policy={timers[0]['policy']} sret-returned=PASS", flush=True)
            print(f"result: PASS: timer sepc values remained in compiled [0x{wait_begin:016x},0x{wait_end:016x}) window", flush=True)
            print(f"result: PASS: Batch 12 breakpoint preserved; native/fake/two timer machines matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError) as error:
        print(f"supervisor-timer-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
