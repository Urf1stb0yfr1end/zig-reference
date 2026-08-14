#!/usr/bin/env python3
"""Acquire, identify, and golden-run Batch 32B's exact dynamic RV64 BusyBox."""
from __future__ import annotations
import argparse, hashlib, pathlib, shutil, struct, subprocess, sys, tarfile, tempfile, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE_URL = "https://dl-cdn.alpinelinux.org/alpine/v3.22/main/riscv64"
PACKAGES = {
    "busybox-1.37.0-r20.apk": "467e8f01c30ff318e20e51c10dd93d1e170d39ceca95e89c8360984ef77ef0a2",
    "musl-1.2.5-r12.apk": "6814d9cbaad929d14181ef4fbd1d65c7749df43746269b9bdb75551ba32a79db",
}
BUSYBOX_SHA256 = "bb2ea620f7f6563676aa80a27e10d701738849988ae9944fcfe606d07b1e25a1"
INTERP_SHA256 = "03e29a0e547203adb2c5b3f0b67da5d7cd42801027f7981fc476f175b59a29cf"
INTERP = "/lib/ld-musl-riscv64.so.1"

def digest(path: pathlib.Path) -> str: return hashlib.sha256(path.read_bytes()).hexdigest()
def require_hash(path: pathlib.Path, expected: str) -> None:
    actual = digest(path)
    if actual != expected: raise RuntimeError(f"hash mismatch: {path}: expected {expected}, got {actual}")
def extract(apk: pathlib.Path, root: pathlib.Path) -> None:
    with tarfile.open(apk, "r:gz") as archive: archive.extractall(root, filter="data")
def elf_truth(path: pathlib.Path) -> tuple[int, str, list[str], bool]:
    data = path.read_bytes()
    if data[:6] != b"\x7fELF\x02\x01" or struct.unpack_from("<H", data, 18)[0] != 243: raise RuntimeError(f"not RV64 ELF64: {path}")
    elf_type = struct.unpack_from("<H", data, 16)[0]; phoff = struct.unpack_from("<Q", data, 32)[0]; phentsize, phnum = struct.unpack_from("<HH", data, 54)
    interp = ""; loads=[]; dynamic=False
    for i in range(phnum):
        row=struct.unpack_from("<IIQQQQQQ", data, phoff+i*phentsize)
        if row[0] == 1: loads.append(f"0x{row[3]:x}:0x{row[5]:x}:0x{row[6]:x}:0x{row[1]:x}")
        elif row[0] == 2: dynamic=True
        elif row[0] == 3: interp=data[row[2]:row[2]+row[5]-1].decode()
    return elf_type, interp, loads, dynamic

def main() -> int:
    parser=argparse.ArgumentParser(); parser.add_argument("--artifact-only", action="store_true"); parser.add_argument("--output-dir", type=pathlib.Path); args=parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="zigref-batch32b-") as raw:
        work=pathlib.Path(raw); sysroot=work/"sysroot"
        for name, expected in PACKAGES.items():
            apk=work/name; urllib.request.urlretrieve(f"{BASE_URL}/{name}", apk); require_hash(apk, expected); extract(apk, sysroot)
        busybox=sysroot/"bin/busybox"; interpreter=sysroot/"lib/ld-musl-riscv64.so.1"; require_hash(busybox, BUSYBOX_SHA256); require_hash(interpreter, INTERP_SHA256)
        kind, interp, loads, dynamic=elf_truth(busybox); ikind, iinterp, iloads, _=elf_truth(interpreter)
        if kind != 3 or ikind != 3 or interp != INTERP or iinterp or not dynamic: raise RuntimeError("dynamic BusyBox/interpreter ELF relationship mismatch")
        print("package_identity=Alpine v3.22 busybox 1.37.0-r20 riscv64"); print(f"busybox_apk_sha256={PACKAGES['busybox-1.37.0-r20.apk']}"); print(f"dynamic_busybox_sha256={digest(busybox)}"); print(f"real_musl_interpreter_sha256={digest(interpreter)}"); print(f"pt_interp={interp}"); print(f"busybox_pt_load={','.join(loads)}"); print(f"interpreter_pt_load={','.join(iloads)}"); print("dt_needed=libc.musl-riscv64.so.1")
        if args.output_dir:
            args.output_dir.mkdir(parents=True, exist_ok=True); shutil.copyfile(busybox,args.output_dir/"busybox"); shutil.copyfile(interpreter,args.output_dir/"ld-musl-riscv64.so.1"); print(f"artifact_output_dir={args.output_dir.resolve()}")
        if args.artifact_only: print("PASS: Batch 32B exact dynamic BusyBox and interpreter verified"); return 0
        qemu=shutil.which("qemu-riscv64")
        if not qemu: print("UNAVAILABLE: qemu-riscv64 golden Linux-user oracle", file=sys.stderr); return 2
        for name, argv, expected in (("true",["true"],b""),("echo",["echo","batch32b"],b"batch32b\n"),("shell",["sh","-c","echo batch32b"],b"batch32b\n")):
            result=subprocess.run([qemu,"-L",str(sysroot),str(busybox),*argv],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            if result.returncode != 0 or result.stdout != expected or result.stderr: raise RuntimeError(f"golden {name} mismatch: status={result.returncode} stdout={result.stdout!r} stderr={result.stderr!r}")
            print(f"PASS: golden Linux-user dynamic BusyBox {name}; status=0 stdout_hex={result.stdout.hex()}")
        return 0
if __name__ == "__main__":
    try: raise SystemExit(main())
    except Exception as exc: print(f"FAIL: {exc}",file=sys.stderr); raise SystemExit(getattr(exc,"returncode",1))
