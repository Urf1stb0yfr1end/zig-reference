#!/usr/bin/env python3
"""Execute and verify the exact Batch 32A real-musl PT_INTERP machine."""
from __future__ import annotations

import hashlib
import pathlib
import re
import shutil
import struct
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
MAIN_SHA256 = "20342716ce40c554de9d4e24e62ec0ec6294b5ab63aeb38af74eb32f6264a248"
INTERP_SHA256 = "03e29a0e547203adb2c5b3f0b67da5d7cd42801027f7981fc476f175b59a29cf"
EXPECTED_HEX = b"batch32a-dynamic-musl\n".hex()
INTERP_BIAS = 0x40000000


def run(argv: list[str], timeout: int = 300) -> bytes:
    return subprocess.run(argv, cwd=ROOT, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout).stdout


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def elf(path: pathlib.Path) -> dict[str, object]:
    data = path.read_bytes()
    if data[:6] != b"\x7fELF\x02\x01" or struct.unpack_from("<H", data, 18)[0] != 243:
        raise RuntimeError(f"not RV64 ELF64: {path}")
    entry, phoff = struct.unpack_from("<QQ", data, 24)
    phentsize, phnum = struct.unpack_from("<HH", data, 54)
    loads = []
    interp = ""
    for index in range(phnum):
        row = struct.unpack_from("<IIQQQQQQ", data, phoff + index * phentsize)
        if row[0] == 1:
            loads.append((row[3], row[3] + row[6], row[1]))
        elif row[0] == 3:
            interp = data[row[2] : row[2] + row[5] - 1].decode()
    return {"entry": entry, "loads": loads, "interp": interp, "bytes": data}


def executable(info: dict[str, object], pc: int, bias: int = 0) -> bool:
    return any(start + bias <= pc < end + bias and flags & 1 for start, end, flags in info["loads"])


def contains(info: dict[str, object], address: int, length: int) -> bool:
    return any(start <= address and address + length <= end for start, end, _ in info["loads"])


def verify(raw: bytes, main: pathlib.Path, interpreter: pathlib.Path) -> None:
    if digest(main) != MAIN_SHA256 or digest(interpreter) != INTERP_SHA256:
        raise RuntimeError("artifact hash mismatch")
    main_info, interp_info = elf(main), elf(interpreter)
    if main_info["interp"] != "/lib/ld-musl-riscv64.so.1" or interp_info["interp"]:
        raise RuntimeError("PT_INTERP relationship mismatch")
    text = raw.decode(errors="replace")
    prepare = text.index("ZIGREF_BATCH29_PHASE prepare")
    commit = text.index("ZIGREF_BATCH29_PHASE commit", prepare)
    execute = text.index("ZIGREF_BATCH29_PHASE execute", commit)
    result_match = re.search(r"ZIGREF_BATCH29_RESULT ([^\r\n]+)", text[execute:])
    if not result_match:
        raise RuntimeError("missing Batch 32A result")
    fields = dict(piece.split("=", 1) for piece in result_match.group(1).split())
    expected = {
        "status": "0000000000000000",
        "output_hex": EXPECTED_HEX,
        "wx": "0000000000000000",
        "interpreter_pages": "0000000000000099",
        "main_entry": f"{main_info['entry']:016x}",
        "interpreter_entry": f"{interp_info['entry'] + INTERP_BIAS:016x}",
    }
    if any(fields.get(key) != value for key, value in expected.items()):
        raise RuntimeError(f"result mismatch: {fields}")
    events = []
    for match in re.finditer(r"ZIGREF_BATCH29_SYSCALL ([^\r\n]+)", text[execute:]):
        events.append({key: int(value, 16) for key, value in (piece.split("=", 1) for piece in match.group(1).split())})
    if len(events) != 8:
        raise RuntimeError("unexpected syscall count")
    if not executable(interp_info, events[0]["pc"], INTERP_BIAS):
        raise RuntimeError("first U-mode syscall is not in the real interpreter")
    writes = [event for event in events if event["nr"] == 64]
    if len(writes) != 1 or writes[0]["arg2"] != len(bytes.fromhex(EXPECTED_HEX)) or not contains(main_info, writes[0]["arg1"], writes[0]["arg2"]):
        raise RuntimeError("exact output does not originate in the dynamic main image")
    if not all(executable(interp_info, event["pc"], INTERP_BIAS) for event in events[:6]):
        raise RuntimeError("loader-startup syscall did not execute in the interpreter")
    if not prepare < commit < execute or b"ZIGREF_BATCH32A_PREPARE interpreter-tables pages=0000000000000099" not in raw:
        raise RuntimeError("PREPARE/COMMIT evidence mismatch")


def main() -> int:
    if sys.argv[1:]:
        print("usage: python3 tools/verify-freestanding-riscv64-dynamic-musl.py", file=sys.stderr)
        return 2
    qemu = shutil.which("qemu-system-riscv64")
    if not qemu:
        raise RuntimeError("qemu-system-riscv64 required")
    with tempfile.TemporaryDirectory(prefix="zigref-batch32a-proof-") as raw_dir:
        root = pathlib.Path(raw_dir)
        artifacts, prefix = root / "artifacts", root / "machine"
        run(["python3", "tools/pressure-real-rv64-dynamic-musl.py", "--artifact-only", "--output-dir", str(artifacts)])
        main_elf, interpreter = artifacts / "batch32a-dynamic-musl", artifacts / "ld-musl-riscv64.so.1"
        run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", f"-Dexternal-rv64-artifact={main_elf}", f"-Dexternal-rv64-interpreter={interpreter}", "--prefix", str(prefix)])
        output = run([qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(prefix / "bin/morphic-freestanding-riscv64")])
        verify(output, main_elf, interpreter)
    print("PASS: Batch 32A exact main -> real musl U-mode loader startup -> dynamic main output; status=0 W+X=0 PREPARE/COMMIT")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(getattr(exc, "returncode", 1))
