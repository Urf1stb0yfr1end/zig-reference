#!/usr/bin/env python3
"""Causally verify exact external bytes are transported into the machine ELF."""
from __future__ import annotations

import argparse
import hashlib
import pathlib
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
EXPECTED = "ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d"


def run(argv: list[str]) -> bytes:
    return subprocess.run(argv, cwd=ROOT, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=300).stdout


def require_transport(machine: pathlib.Path, artifact: bytes) -> None:
    if hashlib.sha256(artifact).hexdigest() != EXPECTED:
        raise RuntimeError("external artifact identity mismatch")
    image = machine.read_bytes()
    if image.count(artifact) != 1:
        raise RuntimeError("machine ELF must contain exactly one exact artifact byte sequence")


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
        run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", f"-Dexternal-rv64-artifact={artifact_path}", "--prefix", str(root / "install")])
        machine = root / "install/bin/morphic-freestanding-riscv64"
        require_transport(machine, artifact)
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
            print(f"external_artifact_sha256={EXPECTED}")
            print(f"external_artifact_bytes={len(artifact)}")
            print("PASS: exact pinned external artifact occurs once in the freestanding machine ELF")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
