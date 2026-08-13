#!/usr/bin/env python3
"""Causally verify exact external bytes are transported into the machine ELF."""
from __future__ import annotations

import argparse
import hashlib
import pathlib
import subprocess
import tempfile
import shutil
import struct

ROOT = pathlib.Path(__file__).resolve().parents[1]
EXPECTED = "ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d"
COMMAND = "python3 tools/verify-freestanding-riscv64-external-artifact-transport.py"


def run(argv: list[str]) -> bytes:
    return subprocess.run(argv, cwd=ROOT, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=300).stdout


def require_transport(machine: pathlib.Path, artifact: bytes) -> None:
    if hashlib.sha256(artifact).hexdigest() != EXPECTED:
        raise RuntimeError("external artifact identity mismatch")
    image = machine.read_bytes()
    if image.count(artifact) != 1:
        raise RuntimeError("machine ELF must contain exactly one exact artifact byte sequence")


def load_geometry(artifact: bytes) -> list[tuple[int, int, int]]:
    phoff = struct.unpack_from("<Q", artifact, 32)[0]
    phentsize, phnum = struct.unpack_from("<HH", artifact, 54)
    rows = []
    for index in range(phnum):
        row = struct.unpack_from("<IIQQQQQQ", artifact, phoff + index * phentsize)
        if row[0] == 1:
            rows.append((row[3], row[5], row[6]))
    if rows != [(0x1000000, 0x1AF, 0x1AF), (0x10011B0, 0x66A, 0x66A), (0x100281C, 8, 0x224)]:
        raise RuntimeError("unexpected pinned musl PT_LOAD geometry")
    return rows


def require_machine_result(raw: bytes) -> bytes:
    if raw.count(b"batch27-static-musl\r\n") != 1 and raw.count(b"batch27-static-musl\n") != 1:
        raise RuntimeError("exact static musl stdout missing")
    marker = b"ZIGREF_BATCH29_RESULT syscalls=0000000000000003 status=0000000000000000 output_hex=626174636832372d7374617469632d6d75736c0a pages=0000000000000003 wx=0000000000000000"
    if raw.count(marker) != 1:
        raise RuntimeError("Batch 29 causal result mismatch")
    if b"ZIGREF_BATCH26_END" not in raw:
        raise RuntimeError("inherited Batch 26 proof did not complete")
    return marker


def handoff(self_test: bool) -> None:
    subprocess.run([
        "python3", "tools/developer-minimus.py", "--command", COMMAND + (" --self-test" if self_test else ""),
        "--status", "PASS", "--summary", "exact-musl hash=ff9761d8 pages=3 status=0 W+X=0 " + ("runs=1 mutation=1-rejected" if self_test else "runs=2 deterministic-result"),
        "--location", "kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
        "--location", "verifier=tools/verify-freestanding-riscv64-external-artifact-transport.py",
        "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_29.md",
    ], cwd=ROOT, check=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="zigref-batch29-") as raw:
        root = pathlib.Path(raw)
        artifacts = root / "artifacts"
        run(["python3", "tools/pressure-real-rv64-userspace.py", "--artifact-only", "--output-dir", str(artifacts)])
        artifact_path = artifacts / "batch27-static-musl"
        artifact = artifact_path.read_bytes()
        load_geometry(artifact)
        run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", f"-Dexternal-rv64-artifact={artifact_path}", "--prefix", str(root / "install")])
        machine = root / "install/bin/morphic-freestanding-riscv64"
        require_transport(machine, artifact)
        qemu = shutil.which("qemu-system-riscv64")
        if not qemu:
            raise RuntimeError("qemu-system-riscv64 required")
        first = run([qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(machine)])
        first_result = require_machine_result(first)
        if args.self_test:
            damaged = bytearray(artifact)
            damaged[-1] ^= 1
            try:
                require_transport(machine, damaged)
            except RuntimeError:
                pass
            else:
                raise AssertionError("mutated artifact identity accepted")
            print("PASS: exact-artifact transport and identity mutation rejection")
        else:
            second = run([qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(machine)])
            second_result = require_machine_result(second)
            if first_result != second_result:
                raise RuntimeError("two-machine Batch 29 evidence drift")
            print(f"external_artifact_sha256={EXPECTED}")
            print(f"external_artifact_bytes={len(artifact)}")
            print("PASS: exact static musl runs=2 output=batch27-static-musl status=0 pages=3 W+X=0")
        handoff(args.self_test)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
