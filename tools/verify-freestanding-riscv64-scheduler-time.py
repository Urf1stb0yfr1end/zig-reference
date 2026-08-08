#!/usr/bin/env python3
"""Prove real rdtime observations drive the scheduler only after sret."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-scheduler-time.py"
TIMEOUT_SECONDS = 15
COUNT = 4
BEGIN = b"ZIGREF_SCHEDULER_TIME_BEGIN"
END = b"ZIGREF_SCHEDULER_TIME_END"
RETURNED = b"ZIGREF_SCHEDULER_TIME_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

morphic = load("scheduler_morphic", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("scheduler_trap", "tools/verify-freestanding-riscv64-supervisor-trap.py")
timer = load("scheduler_timer", "tools/verify-freestanding-riscv64-supervisor-timer.py")
ticks = load("scheduler_ticks", "tools/verify-freestanding-riscv64-supervisor-ticks.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return int(value, 16)


def parse_scheduler_time(raw):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one scheduler-time frame and completion marker")
    if raw.find(b"ZIGREF_TICKS_RETURNED") > raw.find(BEGIN) or raw.find(b"ZIGREF_TICKS_RETURNED") < 0:
        raise RuntimeError("scheduler decisions were not framed after the repeated-tick sret returns")
    record = raw.split(BEGIN, 1)[1].split(END, 1)[0]
    headers, observations = {}, []
    for line in record.strip().decode("ascii").splitlines():
        if line.startswith("observation="):
            fields = {}
            for item in line.split(","):
                key, sep, value = item.partition("=")
                if not sep or not key or key in fields:
                    raise RuntimeError("observation contains malformed or duplicate fields")
                fields[key] = value
            observations.append(fields)
        else:
            key, sep, value = line.partition("=")
            if not sep or not key or key in headers:
                raise RuntimeError("scheduler-time header contains malformed or duplicate fields")
            headers[key] = value
    required = {"observations", "mapping", "returns_before_decisions", "thresholds",
                "selected", "remaining", "complete"}
    obs_required = {"observation", "machine", "scheduler", "ready_count", "decision_phase"}
    if set(headers) != required or any(set(item) != obs_required for item in observations):
        raise RuntimeError("scheduler-time evidence field set is incomplete or unexpected")
    if headers["observations"] != "4" or len(observations) != COUNT:
        raise RuntimeError("machine observation count is not the compiled bound")
    if headers["mapping"] != "identity-rdtime-u64":
        raise RuntimeError("machine-to-scheduler mapping is not the declared identity mapping")
    if headers["returns_before_decisions"] != "4":
        raise RuntimeError("scheduler decisions precede one or more corresponding sret returns")
    if headers["complete"] != "PASS" or fixed(headers["remaining"], "remaining") != 0:
        raise RuntimeError("scheduler scenario did not complete")
    thresholds = [fixed(value, "threshold") for value in headers["thresholds"].split(",")]
    if len(thresholds) != 4:
        raise RuntimeError("wrong readiness threshold count")
    parsed = []
    for index, item in enumerate(observations):
        values = {key: fixed(item[key], key) for key in ("observation", "machine", "scheduler", "ready_count")}
        if values["observation"] != index or item["decision_phase"] != "after-sret":
            raise RuntimeError("scheduler decision sequence or execution phase is invalid")
        if values["machine"] != values["scheduler"]:
            raise RuntimeError("scheduler did not consume the real machine observation through identity mapping")
        parsed.append(values)
    for previous, current in zip(parsed, parsed[1:]):
        if current["machine"] <= previous["machine"] or current["scheduler"] < previous["scheduler"]:
            raise RuntimeError("machine or scheduler-visible time is not monotonic")
    if thresholds != [parsed[0]["machine"], parsed[1]["machine"], parsed[1]["machine"], parsed[3]["machine"]]:
        raise RuntimeError("declared readiness thresholds do not match the bounded scenario")
    if [item["ready_count"] for item in parsed] != [1, 2, 0, 1]:
        raise RuntimeError("readiness transitions occurred before or after their thresholds")
    selected = []
    for value in headers["selected"].split(","):
        task, sep, observation = value.partition("@")
        if not sep:
            raise RuntimeError("selected task record is malformed")
        selected.append((fixed(task, "task"), fixed(observation, "selected observation")))
    if selected != [(1, 0), (2, 1), (3, 1), (4, 3)]:
        raise RuntimeError("stable deterministic ready ordering changed")
    return {"observations": parsed, "selected": selected}


def sample():
    raw = ticks.sample()
    machine = [1010, 101020, 201030, 301040]
    frame = [BEGIN + b"\nobservations=4\nmapping=identity-rdtime-u64\nreturns_before_decisions=4\n",
             ("thresholds=" + ",".join(f"{v:016x}" for v in [machine[0], machine[1], machine[1], machine[3]]) + "\n").encode()]
    for i, value in enumerate(machine):
        frame.append(f"observation={i:016x},machine={value:016x},scheduler={value:016x},ready_count={[1,2,0,1][i]:016x},decision_phase=after-sret\n".encode())
    frame.append(b"selected=0000000000000001@0000000000000000,0000000000000002@0000000000000001,0000000000000003@0000000000000001,0000000000000004@0000000000000003\nremaining=0000000000000000\ncomplete=PASS\n" + END + b"\n" + RETURNED + b"\n")
    return raw.replace(b"ZIGREF_MORPHIC_BEGIN", b"".join(frame) + b"ZIGREF_MORPHIC_BEGIN")


def self_test():
    valid = sample()
    assert len(parse_scheduler_time(valid)["observations"]) == COUNT
    ticks.parse_ticks(valid)
    invalid = [
        valid.replace(BEGIN, b"", 1), valid + BEGIN,
        valid.replace(b"observations=4", b"observations=3"),
        valid.replace(b"mapping=identity-rdtime-u64", b"mapping=fabricated"),
        valid.replace(b"returns_before_decisions=4", b"returns_before_decisions=3"),
        valid.replace(b"scheduler=00000000000003f2", b"scheduler=00000000000003f3"),
        valid.replace(b"machine=0000000000018a9c", b"machine=00000000000003f2"),
        valid.replace(b"ready_count=0000000000000001", b"ready_count=0000000000000002", 1),
        valid.replace(b"0000000000000002@0000000000000001,0000000000000003", b"0000000000000003@0000000000000001,0000000000000002"),
        valid.replace(b"decision_phase=after-sret", b"decision_phase=interrupt", 1),
        valid.replace(b"complete=PASS", b"complete=FAIL"), valid.replace(RETURNED, b""),
        valid.replace(b"observations=4", b"observations=4\nobservations=4"),
    ]
    for value in invalid:
        try:
            parse_scheduler_time(value)
        except RuntimeError:
            pass
        else:
            raise AssertionError("contradictory scheduler-time evidence was accepted")
    print("PASS: scheduler-time framing, real-time mapping, monotonicity, readiness, stable ordering, after-sret phase, and rejection paths")
    return 0


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "real rdtime drives bounded deterministic scheduling after sret",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_15.md"]
    if failure: args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]: return self_test()
    qemu, readelf = shutil.which("qemu-system-riscv64"), shutil.which("readelf")
    if not qemu or not readelf:
        handoff("FAIL", f"required command is missing: {'qemu-system-riscv64' if not qemu else 'readelf'}")
        return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-scheduler-time-") as prefix:
            print("phase: build and inspect scheduler-time freestanding payload", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC": raise RuntimeError("artifact is not RISC-V EXEC")
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            wb, we = trap.symbol_value(symbols, "ticksWaitBegin"), trap.symbol_value(symbols, "ticksWaitEnd")
            tb, te = trap.symbol_value(symbols, "timerWaitBegin"), trap.symbol_value(symbols, "timerWaitEnd")
            bp = trap.symbol_value(symbols, "trapProbeBreakpoint")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real scheduler-time machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, TIMEOUT_SECONDS) for _ in range(2)]
            schedules = [parse_scheduler_time(value) for value in raw]
            tick_records = [ticks.parse_ticks(value, wb, we) for value in raw]
            timers = [timer.parse_timer(value, tb, te) for value in raw]
            traps = [trap.parse_trap(value) for value in raw]
            payloads = [morphic.extract(value) for value in raw]
            if any(int(item["sepc"], 16) != bp for item in traps) or any(item["count"] != "1" for item in timers): raise RuntimeError("Batch 12/13 proof regressed")
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]): raise RuntimeError("canonical Morphic bytes drifted")
            sequences = [[item["machine"] for item in result["observations"]] for result in schedules]
            print(f"result: PASS: runs=2 observations-per-run=4 real-rdtime-sequences={sequences}", flush=True)
            print("result: PASS: readiness=[1,2,0,1] selected=[1@0,2@1,3@1,4@3] identity mapping after four sret returns", flush=True)
            print(f"result: PASS: Batch 12/13/14 preserved; native/fake/two machines matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError) as error:
        print(f"scheduler-time-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error)); return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")

if __name__ == "__main__": raise SystemExit(main())
