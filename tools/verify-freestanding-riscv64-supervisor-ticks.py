#!/usr/bin/env python3
"""Prove four bounded monotonic re-armed S-mode timer ticks and Morphic equality."""

import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-supervisor-ticks.py"
TIMEOUT_SECONDS = 15
EXPECTED_TICKS = 4
INTERVAL = 100_000
BEGIN = b"ZIGREF_TICKS_BEGIN"
END = b"ZIGREF_TICKS_END"
RETURNED = b"ZIGREF_TICKS_RETURNED"
MAX_U64 = (1 << 64) - 1


def load(name: str, path: str):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


morphic = load("freestanding_morphic_ticks", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("supervisor_trap_ticks", "tools/verify-freestanding-riscv64-supervisor-trap.py")
timer = load("supervisor_timer_ticks", "tools/verify-freestanding-riscv64-supervisor-timer.py")


def run(command: list[str], *, timeout: int | None = None) -> bytes:
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed_hex(value: str, name: str) -> int:
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return int(value, 16)


def parse_ticks(raw: bytes, wait_begin: int | None = None,
                wait_end: int | None = None) -> dict[str, object]:
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one complete ticks frame and return marker")
    _, rest = raw.split(BEGIN, 1)
    record, after = rest.split(END, 1)
    if RETURNED not in after or b"ZIGREF_MORPHIC_BEGIN" not in after:
        raise RuntimeError("ticks return and post-ticks Morphic execution are not both evidenced")
    headers: dict[str, str] = {}
    ticks: list[dict[str, str]] = []
    for line in record.strip().decode("ascii").splitlines():
        if line.startswith("tick="):
            fields: dict[str, str] = {}
            for item in line.split(","):
                key, separator, value = item.partition("=")
                if not separator or not key or key in fields:
                    raise RuntimeError("tick record contains a malformed or duplicate field")
                fields[key] = value
            ticks.append(fields)
        else:
            key, separator, value = line.partition("=")
            if not separator or not key or key in headers:
                raise RuntimeError("ticks header contains a malformed or duplicate field")
            headers[key] = value
    required_headers = {"expected", "count", "returns", "policy", "interval",
                        "registers", "stack", "final_neutralized"}
    required_tick = {"tick", "cause", "interrupt", "sepc", "time", "deadline",
                     "next_deadline", "rearmed", "sstatus"}
    if set(headers) != required_headers or any(set(item) != required_tick for item in ticks):
        raise RuntimeError("ticks evidence field set is incomplete or unexpected")
    if headers["expected"] != str(EXPECTED_TICKS) or headers["count"] != str(EXPECTED_TICKS):
        raise RuntimeError("compiled expected count and delivered tick count do not match")
    if headers["returns"] != str(EXPECTED_TICKS):
        raise RuntimeError("every delivered tick did not return through sret")
    if len(ticks) != EXPECTED_TICKS:
        raise RuntimeError("timer record count does not reconcile with the claimed tick count")
    if headers["policy"] != "observed-time-plus-bounded-interval":
        raise RuntimeError("unexpected repeated-tick deadline policy")
    if fixed_hex(headers["interval"], "interval") != INTERVAL:
        raise RuntimeError("compiled bounded tick interval changed")
    if headers["registers"] != "PASS" or headers["stack"] != "PASS":
        raise RuntimeError("declared repeated-tick context preservation failed")
    if headers["final_neutralized"] != "PASS":
        raise RuntimeError("final timer neutralization did not complete")
    if (wait_begin is None) != (wait_end is None):
        raise RuntimeError("ticks wait ELF relationship is incomplete")

    parsed: list[dict[str, int]] = []
    for index, item in enumerate(ticks):
        values = {name: fixed_hex(item[name], name) for name in
                  ("tick", "cause", "sepc", "time", "deadline", "next_deadline", "sstatus")}
        if values["tick"] != index:
            raise RuntimeError("tick sequence is duplicate, skipped, or out of order")
        if item["interrupt"] != "1" or values["cause"] != 5:
            raise RuntimeError("every tick must be an asynchronous supervisor timer interrupt")
        if wait_begin is not None and (wait_begin >= wait_end or not wait_begin <= values["sepc"] < wait_end):
            raise RuntimeError("observed tick sepc is outside the compiled wait window")
        if values["time"] < values["deadline"]:
            raise RuntimeError("timer delivery was observed before its programmed deadline")
        if index < EXPECTED_TICKS - 1:
            if item["rearmed"] != "1" or values["next_deadline"] != (values["time"] + INTERVAL) & MAX_U64:
                raise RuntimeError("non-final tick lacks the exact explicit re-arm relationship")
        elif item["rearmed"] != "0" or values["next_deadline"] != MAX_U64:
            raise RuntimeError("final tick was not explicitly neutralized")
        parsed.append(values)
    for previous, current in zip(parsed, parsed[1:]):
        if current["time"] <= previous["time"]:
            raise RuntimeError("observed timer time is not strictly monotonic")
        if current["deadline"] != previous["next_deadline"] or current["deadline"] <= previous["deadline"]:
            raise RuntimeError("programmed deadlines are not chained and strictly monotonic")
    return {"headers": headers, "ticks": parsed}


def handoff(status: str, failure: str | None = None) -> int:
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND,
            "--status", status, "--summary",
            "four real bounded monotonic re-armed S-mode timer ticks and post-ticks Morphic equality",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_14.md"]
    if failure:
        args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def sample() -> bytes:
    lines = [b"firmware\nZIGREF_TRAP_BEGIN\ncount=1\ncause=0000000000000003\ninterrupt=0\n"
             b"sepc=0000000080200100\nresume_delta=4\nstval=0000000000000000\n"
             b"sstatus=8000000200006000\nregisters=PASS\nstack=PASS\nZIGREF_TRAP_END\n"
             b"ZIGREF_TRAP_RETURNED\nZIGREF_TIMER_BEGIN\ncount=1\ncause=0000000000000005\n"
             b"interrupt=1\nsepc=0000000080200204\nsepc_policy=unchanged\n"
             b"policy=mask-stie-and-set-timer-max\npolicy_complete=PASS\nregisters=PASS\n"
             b"stack=PASS\nsstatus=8000000200006020\nZIGREF_TIMER_END\nZIGREF_TIMER_RETURNED\n",
             BEGIN + b"\nexpected=4\ncount=4\nreturns=4\npolicy=observed-time-plus-bounded-interval\n"
             b"interval=00000000000186a0\nregisters=PASS\nstack=PASS\nfinal_neutralized=PASS\n"]
    deadline = 1000
    for index in range(EXPECTED_TICKS):
        now = deadline + 10
        next_deadline = now + INTERVAL if index < EXPECTED_TICKS - 1 else MAX_U64
        lines.append((f"tick={index:016x},cause={5:016x},interrupt=1,sepc={0x80200304:016x},"
                      f"time={now:016x},deadline={deadline:016x},next_deadline={next_deadline:016x},"
                      f"rearmed={1 if index < EXPECTED_TICKS - 1 else 0},sstatus={0x8000000200006020:016x}\n").encode())
        deadline = next_deadline
    lines.append(END + b"\n" + RETURNED + b"\nZIGREF_MORPHIC_BEGIN\n00\nZIGREF_MORPHIC_END\n")
    return b"".join(lines)


def self_test() -> int:
    valid = sample()
    assert len(parse_ticks(valid, 0x80200300, 0x80200310)["ticks"]) == EXPECTED_TICKS
    timer.parse_timer(valid, 0x80200200, 0x80200210)
    trap.parse_trap(valid)
    invalid = [
        valid.replace(b"count=4\nreturns=4", b"count=3\nreturns=4"),
        valid.replace(b"returns=4", b"returns=3"), valid + BEGIN,
        valid.replace(b"tick=0000000000000001", b"tick=0000000000000000"),
        valid.replace(b"interrupt=1,sepc", b"interrupt=0,sepc", 1),
        valid.replace(b"tick=0000000000000000,cause=0000000000000005", b"tick=0000000000000000,cause=0000000000000004"),
        valid.replace(b"time=00000000000003f2,deadline=00000000000003e8", b"time=00000000000003e0,deadline=00000000000003e8"),
        valid.replace(b"rearmed=1", b"rearmed=0", 1),
        valid.replace(b"final_neutralized=PASS", b"final_neutralized=FAIL"),
        valid.replace(RETURNED, b""),
    ]
    # Independently manufacture a non-monotonic second observation.
    second_time = f"time={1010 + INTERVAL + 10:016x}".encode()
    invalid.append(valid.replace(second_time, b"time=00000000000003f2"))
    for value in invalid:
        try:
            parse_ticks(value, 0x80200300, 0x80200310)
        except RuntimeError:
            pass
        else:
            raise AssertionError("invalid repeated-tick evidence was accepted")
    for bounds in ((None, 0x80200310), (0x80200310, 0x80200300), (0x80200400, 0x80200410)):
        try:
            parse_ticks(valid, *bounds)
        except RuntimeError:
            pass
        else:
            raise AssertionError("contradictory ELF ticks relationship was accepted")
    print("PASS: ticks framing, exact count, monotonic time, chained re-arm, final neutralization, ELF bounds, sret returns, and rejection paths")
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
        with tempfile.TemporaryDirectory(prefix="zigref-supervisor-ticks-") as prefix:
            print("phase: build and inspect riscv64-freestanding-none repeated-ticks payload", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC":
                raise RuntimeError("artifact is not a RISC-V executable ELF")
            if morphic.field(header, "Entry point address") != "0x80200000" or "INTERP" in run([readelf, "-l", str(artifact)]).decode():
                raise RuntimeError("artifact does not satisfy the static firmware payload identity")
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            wait_begin = trap.symbol_value(symbols, "ticksWaitBegin")
            wait_end = trap.symbol_value(symbols, "ticksWaitEnd")
            timer_begin = trap.symbol_value(symbols, "timerWaitBegin")
            timer_end = trap.symbol_value(symbols, "timerWaitEnd")
            breakpoint_pc = trap.symbol_value(symbols, "trapProbeBreakpoint")
            resume_pc = trap.symbol_value(symbols, "trapProbeResume")
            if resume_pc - breakpoint_pc != 4 or wait_begin >= wait_end:
                raise RuntimeError("compiled breakpoint/ticks ELF relationships are invalid")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real four-tick machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, timeout=TIMEOUT_SECONDS) for _ in range(2)]
            sequences = [parse_ticks(value, wait_begin, wait_end) for value in raw]
            timers = [timer.parse_timer(value, timer_begin, timer_end) for value in raw]
            traps = [trap.parse_trap(value) for value in raw]
            payloads = [morphic.extract(value) for value in raw]
            if any(int(item["sepc"], 16) != breakpoint_pc for item in traps):
                raise RuntimeError("Batch 12 compiled breakpoint relationship regressed")
            if any(item["count"] != "1" for item in timers):
                raise RuntimeError("Batch 13 one-shot proof regressed")
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]):
                raise RuntimeError("post-ticks canonical Morphic payload comparison failed")
            observed = [[item["time"] for item in sequence["ticks"]] for sequence in sequences]
            print(f"result: PASS: runs=2 ticks-per-run={EXPECTED_TICKS} interrupt=1 cause=5 returns={EXPECTED_TICKS}", flush=True)
            print(f"result: PASS: strictly-monotonic observed-time sequences={observed}", flush=True)
            print("result: PASS: each non-final deadline=observed-time+100000; final=mask-STIE-and-set-timer-max; no extra delivery", flush=True)
            print(f"result: PASS: Batch 12/13 preserved; native/fake/two tick machines matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError) as error:
        print(f"supervisor-ticks-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
