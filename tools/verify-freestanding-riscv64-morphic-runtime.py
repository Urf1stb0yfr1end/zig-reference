#!/usr/bin/env python3
"""Build, inspect, execute, and byte-verify freestanding riscv64 Morphic."""

import shutil
import binascii
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-morphic-runtime.py"
TIMEOUT_SECONDS = 15
BEGIN = b"ZIGREF_MORPHIC_BEGIN"
END = b"ZIGREF_MORPHIC_END"


def field(text: str, name: str) -> str | None:
    for line in text.splitlines():
        key, separator, value = line.partition(":")
        if separator and key.strip() == name:
            return value.strip()
    return None


def extract(raw: bytes) -> bytes:
    if raw.count(BEGIN) != 1 or raw.count(END) != 1:
        raise RuntimeError("raw machine output must contain exactly one BEGIN and one END marker")
    before, payload_and_end = raw.split(BEGIN)
    payload, after = payload_and_end.split(END)
    if not before or after.strip():
        raise RuntimeError("machine output framing is incomplete or has bytes after completion")
    try:
        return binascii.unhexlify(b"".join(payload.split()))
    except (binascii.Error, ValueError) as error:
        raise RuntimeError("framed machine payload is not canonical hexadecimal transport") from error


def handoff(status: str, failure: str | None = None) -> int:
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND,
            "--status", status, "--summary", "native and two freestanding system-QEMU Morphic payloads compared byte-for-byte",
            "--location", "recipe=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_11.md"]
    if failure:
        args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def run(command: list[str], *, timeout: int | None = None) -> bytes:
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def self_test() -> int:
    assert field(" Machine:\t RISC-V\n", "Machine") == "RISC-V"
    assert extract(b"firmware\n" + BEGIN + b"7061796c6f61640a\n" + END) == b"payload\n"
    for invalid in (BEGIN + END, b"firmware\n" + BEGIN + b"partial", b"firmware\n" + BEGIN + END + b"extra"):
        try:
            extract(invalid)
        except RuntimeError:
            pass
        else:
            raise AssertionError("invalid framing was accepted")
    try:
        run([sys.executable, "-c", "import time; time.sleep(1)"], timeout=0.01)
    except subprocess.TimeoutExpired:
        pass
    else:
        raise AssertionError("timeout regression did not fail closed")
    print("PASS: field parsing, framing rejection, and timeout failure path")
    return 0


def main() -> int:
    if sys.argv[1:] == ["--self-test"]:
        return self_test()
    qemu = shutil.which("qemu-system-riscv64")
    readelf = shutil.which("readelf")
    if not qemu or not readelf:
        missing = "qemu-system-riscv64" if not qemu else "readelf"
        handoff("FAIL", f"required command is missing: {missing}")
        return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-freestanding-riscv64-") as prefix:
            print("phase: build riscv64-freestanding-none Morphic payload", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin" / "morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if field(header, "Machine") != "RISC-V" or field(header, "Type") != "EXEC (Executable file)":
                raise RuntimeError("artifact is not a RISC-V executable ELF")
            if field(header, "Entry point address") != "0x80200000":
                raise RuntimeError("artifact entry is not the documented OpenSBI payload address")
            program_headers = run([readelf, "-l", str(artifact)]).decode()
            if "INTERP" in program_headers:
                raise RuntimeError("freestanding artifact unexpectedly has a dynamic interpreter")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            qemu_command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute system machine twice with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(qemu_command, timeout=TIMEOUT_SECONDS) for _ in range(2)]
            payload = [extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payload[0] == payload[1]):
                raise RuntimeError("canonical payload byte comparison failed")
            print(f"result: PASS: native={len(native[0])} freestanding={len(payload[0])} raw={len(raw[0])},{len(raw[1])} bytes", flush=True)
            print("result: PASS: riscv64-freestanding-none ELF, no INTERP, OpenSBI S-mode, repeatable exact payload", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError) as error:
        print(f"freestanding-execution-lab: FAIL: {error}", file=sys.stderr)
        handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")


if __name__ == "__main__":
    raise SystemExit(main())
