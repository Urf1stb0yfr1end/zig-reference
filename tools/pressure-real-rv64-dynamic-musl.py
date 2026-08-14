#!/usr/bin/env python3
"""Acquire, build, and identify Batch 32A's exact dynamic RV64 musl pair."""
from __future__ import annotations

import argparse
import hashlib
import pathlib
import shutil
import struct
import subprocess
import sys
import tarfile
import tempfile
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
MUSL_VERSION = "1.2.5-r12"
BASE_URL = "https://dl-cdn.alpinelinux.org/alpine/v3.22/main/riscv64"
PACKAGES = {
    f"musl-{MUSL_VERSION}.apk": "6814d9cbaad929d14181ef4fbd1d65c7749df43746269b9bdb75551ba32a79db",
    f"musl-dev-{MUSL_VERSION}.apk": "cd16b9d772e93fe5b8a2b87b5182b5be786be7b86be5bf63af65f3537762fd20",
}
MAIN_SHA256 = "20342716ce40c554de9d4e24e62ec0ec6294b5ab63aeb38af74eb32f6264a248"
INTERP_SHA256 = "03e29a0e547203adb2c5b3f0b67da5d7cd42801027f7981fc476f175b59a29cf"
INTERP = "/lib/ld-musl-riscv64.so.1"


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def require_hash(path: pathlib.Path, expected: str) -> None:
    actual = digest(path)
    if actual != expected:
        raise RuntimeError(f"hash mismatch: {path}: expected {expected}, got {actual}")


def run(argv: list[str], *, stdout: bool = False) -> str:
    result = subprocess.run(
        argv, cwd=ROOT, check=True, text=True,
        stdout=subprocess.PIPE if stdout else None,
    )
    return result.stdout if stdout else ""


def extract(apk: pathlib.Path, root: pathlib.Path) -> None:
    with tarfile.open(apk, "r:gz") as archive:
        archive.extractall(root, filter="data")


def elf_truth(path: pathlib.Path) -> tuple[int, str, list[str]]:
    data = path.read_bytes()
    if data[:6] != b"\x7fELF\x02\x01":
        raise RuntimeError(f"not ELF64 little-endian: {path}")
    elf_type, machine = struct.unpack_from("<HH", data, 16)
    phoff = struct.unpack_from("<Q", data, 32)[0]
    phentsize, phnum = struct.unpack_from("<HH", data, 54)
    if machine != 243 or phentsize != 56:
        raise RuntimeError(f"not RV64 ELF: {path}")
    interp = ""
    loads = []
    for index in range(phnum):
        row = struct.unpack_from("<IIQQQQQQ", data, phoff + index * phentsize)
        if row[0] == 3:
            raw = data[row[2] : row[2] + row[5]]
            if not raw.endswith(b"\0"):
                raise RuntimeError("PT_INTERP lacks terminator")
            interp = raw[:-1].decode()
        if row[0] == 1:
            loads.append(f"0x{row[3]:x}:0x{row[5]:x}:0x{row[6]:x}:0x{row[1]:x}")
    return elf_type, interp, loads


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artifact-only", action="store_true")
    parser.add_argument("--output-dir", type=pathlib.Path)
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="zigref-batch32a-") as raw:
        work = pathlib.Path(raw)
        sysroot = work / "sysroot"
        for name, expected in PACKAGES.items():
            apk = work / name
            urllib.request.urlretrieve(f"{BASE_URL}/{name}", apk)
            require_hash(apk, expected)
            extract(apk, sysroot)
        source = ROOT / "tools/fixtures/batch32a-dynamic-musl.c"
        obj = work / "main.o"
        main_elf = work / "batch32a-dynamic-musl"
        run(["zig", "cc", "-target", "riscv64-linux-musl", "-nostdinc", "-isystem", str(sysroot / "usr/include"), "-c", str(source), "-o", str(obj)])
        run(["zig", "ld.lld", "-dynamic-linker", INTERP, "-o", str(main_elf), str(sysroot / "usr/lib/crt1.o"), str(sysroot / "usr/lib/crti.o"), str(obj), str(sysroot / "lib/ld-musl-riscv64.so.1"), str(sysroot / "usr/lib/crtn.o")])
        interpreter = sysroot / "lib/ld-musl-riscv64.so.1"
        require_hash(main_elf, MAIN_SHA256)
        require_hash(interpreter, INTERP_SHA256)
        elf_type, interp, loads = elf_truth(main_elf)
        interp_type, _, interp_loads = elf_truth(interpreter)
        if elf_type != 2 or interp_type != 3 or interp != INTERP:
            raise RuntimeError("dynamic main/interpreter ELF relationship mismatch")
        print(f"dynamic_main_sha256={digest(main_elf)}")
        print(f"real_musl_interpreter_sha256={digest(interpreter)}")
        print(f"pt_interp={interp}")
        print(f"main_pt_load={','.join(loads)}")
        print(f"interpreter_pt_load={','.join(interp_loads)}")
        print("dt_needed=libc.musl-riscv64.so.1")
        if args.output_dir:
            args.output_dir.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(main_elf, args.output_dir / main_elf.name)
            shutil.copyfile(interpreter, args.output_dir / "ld-musl-riscv64.so.1")
            print(f"artifact_output_dir={args.output_dir.resolve()}")
        if args.artifact_only:
            print("PASS: Batch 32A exact dynamic main and real musl interpreter verified")
            return 0
        qemu = shutil.which("qemu-riscv64")
        if not qemu:
            print("UNAVAILABLE: qemu-riscv64 golden Linux-user oracle", file=sys.stderr)
            return 2
        output = run([qemu, "-L", str(sysroot), str(main_elf)], stdout=True)
        if output != "batch32a-dynamic-musl\n":
            raise RuntimeError(f"golden output mismatch: {output!r}")
        print("PASS: golden Linux-user dynamic musl output and status 0")
        return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(getattr(exc, "returncode", 1))
