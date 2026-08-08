#!/usr/bin/env python3
"""Execute and byte-compare the canonical Morphic scenario on native and riscv64."""

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-riscv64-morphic-runtime.py"


def run_bytes(command: list[str]) -> bytes:
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE).stdout


def handoff(status: str, failure: str | None = None) -> int:
    command = [
        sys.executable,
        "tools/developer-minimus.py",
        "--command",
        COMMAND,
        "--status",
        status,
        "--summary",
        "native hosted/fake and real riscv64 QEMU executions compared byte-for-byte",
        "--location",
        "recipe=recipes/run-hosted-morphic-runtime/recipe.json",
        "--location",
        "report=docs/reports/AGENTIC_SNOWBALL_BATCH_10.md",
    ]
    if failure:
        command += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(command, cwd=ROOT)


def main() -> int:
    qemu = shutil.which("qemu-riscv64")
    readelf = shutil.which("readelf")
    if not qemu or not readelf:
        missing = "qemu-riscv64" if not qemu else "readelf"
        print(f"execution-lab: FAIL: required command is missing: {missing}", file=sys.stderr)
        handoff("FAIL", f"required command is missing: {missing}")
        return 1

    try:
        with tempfile.TemporaryDirectory(prefix="zigref-riscv64-") as prefix:
            print("phase: cross-compile riscv64-linux-musl Morphic executable", flush=True)
            subprocess.run(
                ["zig", "build", "install-riscv64-morphic-runtime", "-Dtarget=riscv64-linux-musl", "--prefix", prefix],
                cwd=ROOT,
                check=True,
            )
            executable = Path(prefix) / "bin" / "run-hosted-morphic-runtime"
            header = subprocess.run([readelf, "-h", executable], check=True, text=True, stdout=subprocess.PIPE).stdout
            if "Machine:                           RISC-V" not in header:
                raise RuntimeError(f"readelf did not identify {executable} as RISC-V")

            print("phase: execute native hosted and fake scenarios twice", flush=True)
            hosted = [run_bytes(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run_bytes(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            print(f"phase: execute {executable.name} twice with {qemu}", flush=True)
            riscv64 = [run_bytes([qemu, str(executable)]) for _ in range(2)]

            comparisons = [hosted[0] == hosted[1], fake[0] == fake[1], hosted[0] == fake[0], riscv64[0] == riscv64[1], hosted[0] == riscv64[0]]
            if not all(comparisons):
                raise RuntimeError("canonical output byte comparison failed")
            print(f"result: PASS: hosted={len(hosted[0])} fake={len(fake[0])} riscv64={len(riscv64[0])} bytes", flush=True)
            print("result: PASS: hosted-repeat fake-repeat hosted-fake riscv64-repeat native-riscv64", flush=True)
    except (OSError, subprocess.CalledProcessError, RuntimeError) as error:
        print(f"execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1

    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
