#!/usr/bin/env python3
"""Acquire and baseline Batch 27's first real RV64 musl/BusyBox targets."""
from __future__ import annotations
import argparse, hashlib, pathlib, shutil, subprocess, sys, tarfile, tempfile, urllib.request

BUSYBOX_URL = "https://dl-cdn.alpinelinux.org/alpine/v3.22/main/riscv64/busybox-static-1.37.0-r20.apk"
BUSYBOX_APK_SHA256 = "29072f0a72ff8f2ff19a8be703cf0e68d4722ea4dc0acf4830acc932f98cf31c"
BUSYBOX_ELF_SHA256 = "62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704"
DIAGNOSTIC_SHA256 = "ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d"
ROOT = pathlib.Path(__file__).resolve().parents[1]

def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def run(command: list[str], *, output: bool = False) -> str:
    result = subprocess.run(command, check=True, text=True, stdout=subprocess.PIPE if output else None)
    return result.stdout if output else ""

def require_hash(path: pathlib.Path, expected: str) -> None:
    actual = digest(path)
    if actual != expected:
        raise RuntimeError(f"hash mismatch: {path}: expected {expected}, got {actual}")

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artifact-only", action="store_true", help="acquire, identify, and hash artifacts without executing the golden baseline")
    parser.add_argument("--output-dir", type=pathlib.Path, help="copy the verified executable bytes here for an explicit downstream machine build")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="zigref-batch27-") as raw:
        work = pathlib.Path(raw)
        diagnostic = work / "static-musl-diagnostic"
        run(["zig", "cc", "-target", "riscv64-linux-musl", "-static", "-Os", "-s", str(ROOT / "tools/fixtures/batch27-static-musl-diagnostic.c"), "-o", str(diagnostic)])
        require_hash(diagnostic, DIAGNOSTIC_SHA256)
        apk = work / "busybox-static.apk"
        urllib.request.urlretrieve(BUSYBOX_URL, apk)
        require_hash(apk, BUSYBOX_APK_SHA256)
        with tarfile.open(apk, "r:gz") as archive:
            member = archive.getmember("bin/busybox.static")
            archive.extract(member, work, filter="data")
        busybox = work / "bin/busybox.static"
        require_hash(busybox, BUSYBOX_ELF_SHA256)
        if args.output_dir:
            args.output_dir.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(diagnostic, args.output_dir / "batch27-static-musl")
            shutil.copyfile(busybox, args.output_dir / "busybox.static")
            require_hash(args.output_dir / "batch27-static-musl", DIAGNOSTIC_SHA256)
            require_hash(args.output_dir / "busybox.static", BUSYBOX_ELF_SHA256)
            print(f"artifact_output_dir={args.output_dir.resolve()}")
        print(f"static_musl_diagnostic_sha256={digest(diagnostic)}")
        print(f"static_busybox_sha256={digest(busybox)}")
        print("static_busybox_identity=Alpine v3.22 busybox-static 1.37.0-r20 riscv64")
        if args.artifact_only:
            print("PASS: Batch 27 artifacts acquired and fail-closed hashes verified")
            return 0
        qemu = shutil.which("qemu-riscv64")
        if not qemu:
            raise RuntimeError("qemu-riscv64 required for external golden baseline")
        diagnostic_output = run([qemu, str(diagnostic)], output=True)
        shell_output = run([qemu, str(busybox), "sh", "-c", "echo batch27"], output=True)
        if diagnostic_output != "batch27-static-musl\n" or shell_output != "batch27\n":
            raise RuntimeError("external userspace output mismatch")
        print("PASS: golden Linux-user baseline static musl diagnostic -> static BusyBox shell")
        print("PARTIAL: Morphic execution not claimed; current executor materializes only one page from the first PT_LOAD")
        print("current_frontier=neutral multi-page, multi-PT_LOAD image materialization (no published ZIGREF diagnostic yet)")
        return 0

if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(getattr(exc, "returncode", 1))
