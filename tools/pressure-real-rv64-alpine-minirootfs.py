#!/usr/bin/env python3
"""Acquire and prove the exact Batch 32C Alpine RV64 minirootfs shell."""
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

NAME = "alpine-minirootfs-3.22.0-riscv64.tar.gz"
URL = f"https://dl-cdn.alpinelinux.org/alpine/v3.22/releases/riscv64/{NAME}"
ROOTFS_SHA256 = "ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b"
BUSYBOX_SHA256 = "4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e"
INTERPRETER_SHA256 = "f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1"


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def require_hash(path: pathlib.Path, expected: str) -> None:
    actual = digest(path)
    if actual != expected:
        raise RuntimeError(f"hash mismatch: {path}: expected {expected}, got {actual}")


def safe_extract(archive_path: pathlib.Path, root: pathlib.Path) -> tuple[int, int]:
    """Extract outside Morphic, rejecting archive names that escape the root."""
    count = data_bytes = 0
    with tarfile.open(archive_path, "r:gz") as archive:
        for member in archive.getmembers():
            path = pathlib.PurePosixPath(member.name)
            if path.is_absolute() or ".." in path.parts:
                raise RuntimeError(f"unsafe archive member: {member.name}")
            if member.isdev() or member.isfifo():
                raise RuntimeError(f"unsupported special archive member: {member.name}")
            if member.islnk():
                target = pathlib.PurePosixPath(member.linkname)
                if target.is_absolute() or ".." in target.parts:
                    raise RuntimeError(f"unsafe archive hardlink: {member.name}->{member.linkname}")
            count += 1
            if member.isfile():
                data_bytes += member.size
        # Member names and hardlinks were checked above. Absolute symlink targets
        # are intentionally retained as guest-root paths (for example /bin/sh).
        archive.extractall(root, filter="fully_trusted")
    return count, data_bytes


def resolve_rootfs(root: pathlib.Path, guest_path: str, limit: int = 16) -> tuple[pathlib.Path, list[str]]:
    """Resolve an absolute guest path without allowing symlinks outside root."""
    pending = list(pathlib.PurePosixPath(guest_path).parts[1:])
    resolved: list[str] = []
    links: list[str] = []
    for _ in range(limit + 1):
        if not pending:
            return root.joinpath(*resolved), links
        component = pending.pop(0)
        if component in ("", "."):
            continue
        if component == "..":
            if not resolved:
                raise RuntimeError(f"path escapes rootfs: {guest_path}")
            resolved.pop()
            continue
        candidate = root.joinpath(*resolved, component)
        if candidate.is_symlink():
            target = pathlib.PurePosixPath(candidate.readlink().as_posix())
            links.append(f"/{'/'.join(resolved + [component])}->{target}")
            target_parts = list(target.parts[1:] if target.is_absolute() else target.parts)
            if target.is_absolute():
                resolved = []
            pending = target_parts + pending
            continue
        if not candidate.exists():
            raise RuntimeError(f"rootfs object not found: /{'/'.join(resolved + [component])}")
        resolved.append(component)
    raise RuntimeError(f"symlink limit exceeded while resolving {guest_path}")


def verify_elf(path: pathlib.Path, interpreter: str | None) -> None:
    data = path.read_bytes()
    if data[:6] != b"\x7fELF\x02\x01" or struct.unpack_from("<H", data, 18)[0] != 243:
        raise RuntimeError(f"not RV64 ELF64: {path}")
    phoff = struct.unpack_from("<Q", data, 32)[0]
    phentsize, phnum = struct.unpack_from("<HH", data, 54)
    actual = None
    for index in range(phnum):
        row = struct.unpack_from("<IIQQQQQQ", data, phoff + index * phentsize)
        if row[0] == 3:
            actual = data[row[2] : row[2] + row[5] - 1].decode()
    if actual != interpreter:
        raise RuntimeError(f"PT_INTERP mismatch: expected {interpreter!r}, got {actual!r}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artifact-only", action="store_true")
    parser.add_argument("--output-dir", type=pathlib.Path)
    parser.add_argument("--archive", type=pathlib.Path, help="use an already downloaded archive")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="zigref-batch32c-") as raw:
        work = pathlib.Path(raw)
        archive = args.archive or work / NAME
        if not args.archive:
            urllib.request.urlretrieve(URL, archive)
        require_hash(archive, ROOTFS_SHA256)
        root = work / "rootfs"
        root.mkdir()
        objects, data_bytes = safe_extract(archive, root)
        shell, links = resolve_rootfs(root, "/bin/sh")
        interpreter, interpreter_links = resolve_rootfs(root, "/lib/ld-musl-riscv64.so.1")
        if shell != root / "bin/busybox" or links != ["/bin/sh->/bin/busybox"]:
            raise RuntimeError(f"unexpected /bin/sh relationship: {links}, {shell}")
        require_hash(shell, BUSYBOX_SHA256)
        require_hash(interpreter, INTERPRETER_SHA256)
        verify_elf(shell, "/lib/ld-musl-riscv64.so.1")
        verify_elf(interpreter, None)
        print(f"rootfs_name={NAME}")
        print(f"rootfs_url={URL}")
        print(f"rootfs_sha256={ROOTFS_SHA256}")
        print(f"rootfs_objects={objects}")
        print(f"rootfs_regular_file_bytes={data_bytes}")
        print("rootfs_lookup=/bin/sh")
        print(f"rootfs_symlink={links[0]}")
        print("rootfs_resolved_object=/bin/busybox")
        print(f"dynamic_busybox_sha256={BUSYBOX_SHA256}")
        print(f"pt_interp=/lib/ld-musl-riscv64.so.1")
        print(f"interpreter_symlinks={','.join(interpreter_links) or 'none'}")
        print(f"real_musl_interpreter_sha256={INTERPRETER_SHA256}")
        if args.output_dir:
            args.output_dir.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(shell, args.output_dir / "bin-sh-resolved-busybox")
            shutil.copyfile(interpreter, args.output_dir / "ld-musl-riscv64.so.1")
            print(f"artifact_output_dir={args.output_dir.resolve()}")
        if args.artifact_only:
            print("PASS: exact Alpine minirootfs namespace and shell artifacts verified")
            return 0
        qemu = shutil.which("qemu-riscv64")
        if not qemu:
            print("UNAVAILABLE: qemu-riscv64 golden Linux-user oracle", file=sys.stderr)
            return 2
        result = subprocess.run(
            [qemu, "-L", str(root), "-0", "/bin/sh", str(shell), "-c", "echo alpine"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if result.returncode != 0 or result.stdout != b"alpine\n" or result.stderr:
            raise RuntimeError(
                f"golden mismatch: status={result.returncode} stdout={result.stdout!r} stderr={result.stderr!r}"
            )
        print("PASS: golden /bin/sh -c 'echo alpine'; status=0 stdout_hex=616c70696e650a")
        return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(getattr(exc, "returncode", 1))
