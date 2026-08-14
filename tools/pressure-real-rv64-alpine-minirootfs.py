#!/usr/bin/env python3
"""Acquire and prove the exact Batch 32C Alpine RV64 minirootfs shell."""
from __future__ import annotations

import argparse
import hashlib
import json
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
NAMESPACE_FORMAT = "zig-reference-bounded-namespace-v1"


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


def canonical_guest_path(name: str) -> str:
    """Return one absolute guest path, rejecting aliases and root escapes."""
    path = pathlib.PurePosixPath(name)
    parts = list(path.parts)
    if name in (".", "./"):
        return "/"
    while parts and parts[0] == ".":
        parts.pop(0)
    if path.is_absolute() or not parts or any(part in ("", ".", "..") for part in parts):
        raise RuntimeError(f"unsafe or non-canonical archive member: {name}")
    return "/" + "/".join(parts)


def build_namespace(archive_path: pathlib.Path) -> tuple[dict[str, object], bytes]:
    """Serialize the verified archive as neutral metadata plus immutable file data."""
    entries: list[dict[str, object]] = []
    seen: set[str] = set()
    data = bytearray()
    with tarfile.open(archive_path, "r:gz") as archive:
        for member in archive.getmembers():
            path = canonical_guest_path(member.name)
            if path in seen:
                raise RuntimeError(f"duplicate canonical guest path: {path}")
            seen.add(path)
            parent = "/" if path == "/" else str(pathlib.PurePosixPath(path).parent)
            if parent != "/" and parent not in seen:
                raise RuntimeError(f"parent is not represented before child: {path}")
            row: dict[str, object] = {"path": path, "parent": parent, "name": "" if path == "/" else pathlib.PurePosixPath(path).name}
            if member.isdir():
                row["kind"] = "directory"
            elif member.isfile():
                source = archive.extractfile(member)
                if source is None:
                    raise RuntimeError(f"regular file has no bytes: {path}")
                payload = source.read()
                if len(payload) != member.size:
                    raise RuntimeError(f"regular file size mismatch: {path}")
                row.update(kind="regular", data_offset=len(data), data_length=len(payload))
                data.extend(payload)
            elif member.issym():
                target = member.linkname
                if not target or "\0" in target:
                    raise RuntimeError(f"malformed symlink target: {path}")
                row.update(kind="symlink", target=target)
            else:
                raise RuntimeError(f"unsupported archive object: {path}")
            entries.append(row)
    manifest: dict[str, object] = {
        "format": NAMESPACE_FORMAT,
        "rootfs_sha256": ROOTFS_SHA256,
        "object_count": len(entries),
        "regular_file_bytes": len(data),
        "data_sha256": hashlib.sha256(data).hexdigest(),
        "objects": entries,
    }
    validate_namespace(manifest, bytes(data))
    return manifest, bytes(data)


def validate_namespace(manifest: dict[str, object], data: bytes) -> None:
    """Fail closed on malformed metadata, conflicts, and unchecked byte ranges."""
    if manifest.get("format") != NAMESPACE_FORMAT or manifest.get("rootfs_sha256") != ROOTFS_SHA256:
        raise RuntimeError("namespace identity mismatch")
    objects = manifest.get("objects")
    if not isinstance(objects, list) or manifest.get("object_count") != len(objects):
        raise RuntimeError("namespace object count mismatch")
    if manifest.get("regular_file_bytes") != len(data) or manifest.get("data_sha256") != hashlib.sha256(data).hexdigest():
        raise RuntimeError("namespace data accounting mismatch")
    seen: set[str] = set()
    accounted = 0
    for row in objects:
        if not isinstance(row, dict) or not isinstance(row.get("path"), str):
            raise RuntimeError("malformed namespace object")
        path = canonical_guest_path("." if row["path"] == "/" else row["path"].lstrip("/"))
        if path != row["path"] or path in seen:
            raise RuntimeError(f"conflicting namespace path: {path}")
        expected_parent = "/" if path == "/" else str(pathlib.PurePosixPath(path).parent)
        expected_name = "" if path == "/" else pathlib.PurePosixPath(path).name
        if row.get("parent") != expected_parent or row.get("name") != expected_name:
            raise RuntimeError(f"namespace relationship mismatch: {path}")
        if row["parent"] != "/" and row["parent"] not in seen:
            raise RuntimeError(f"missing namespace parent: {path}")
        seen.add(path)
        kind = row.get("kind")
        if kind == "regular":
            offset, length = row.get("data_offset"), row.get("data_length")
            if not isinstance(offset, int) or not isinstance(length, int) or offset != accounted or length < 0 or offset > len(data) or length > len(data) - offset:
                raise RuntimeError(f"invalid namespace byte range: {path}")
            accounted += length
        elif kind == "symlink":
            if not isinstance(row.get("target"), str) or not row["target"] or "\0" in row["target"]:
                raise RuntimeError(f"malformed namespace symlink: {path}")
        elif kind != "directory":
            raise RuntimeError(f"unknown namespace object kind: {path}")
    if accounted != len(data):
        raise RuntimeError("namespace regular-file ranges do not account for all data")


def namespace_lookup(manifest: dict[str, object], guest_path: str, limit: int = 16) -> tuple[dict[str, object], list[str]]:
    """Resolve a guest-root path using only serialized neutral namespace facts."""
    objects = {row["path"]: row for row in manifest["objects"]}  # type: ignore[index]
    pending = list(pathlib.PurePosixPath(guest_path).parts[1:])
    resolved: list[str] = []
    links: list[str] = []
    traversed = 0
    if not guest_path.startswith("/"):
        raise RuntimeError(f"namespace lookup requires an absolute path: {guest_path}")
    while pending:
        component = pending.pop(0)
        if component in ("", "."):
            continue
        if component == "..":
            if not resolved:
                raise RuntimeError(f"namespace path escapes root: {guest_path}")
            resolved.pop()
            continue
        candidate = "/" + "/".join(resolved + [component])
        row = objects.get(candidate)
        if row is None:
            raise RuntimeError(f"namespace object not found: {candidate}")
        if row["kind"] == "symlink":
            traversed += 1
            if traversed > limit:
                raise RuntimeError(f"namespace symlink limit exceeded: {guest_path}")
            target = pathlib.PurePosixPath(row["target"])
            links.append(f"{candidate}->{row['target']}")
            if target.is_absolute():
                resolved = []
                target_parts = list(target.parts[1:])
            else:
                target_parts = list(target.parts)
            pending = target_parts + pending
            continue
        if pending and row["kind"] != "directory":
            raise RuntimeError(f"namespace component is not a directory: {candidate}")
        resolved.append(component)
    final_path = "/" + "/".join(resolved)
    row = objects.get(final_path)
    if row is None:
        raise RuntimeError(f"namespace object not found: {final_path}")
    return row, links


def namespace_file_bytes(row: dict[str, object], data: bytes) -> bytes:
    if row.get("kind") != "regular":
        raise RuntimeError(f"namespace object is not a regular file: {row.get('path')}")
    offset, length = row["data_offset"], row["data_length"]
    assert isinstance(offset, int) and isinstance(length, int)
    return data[offset : offset + length]


def write_namespace(output: pathlib.Path, manifest: dict[str, object], data: bytes) -> None:
    output.mkdir(parents=True, exist_ok=True)
    manifest_bytes = (json.dumps(manifest, sort_keys=True, separators=(",", ":")) + "\n").encode()
    for name, payload in (("namespace.json", manifest_bytes), ("namespace.data", data)):
        temporary = output / f".{name}.tmp"
        temporary.write_bytes(payload)
        temporary.replace(output / name)


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
    parser.add_argument("--namespace-output-dir", type=pathlib.Path,
                        help="write the complete bounded namespace manifest and immutable data backing")
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
        manifest, namespace_data = build_namespace(archive)
        if manifest["object_count"] != objects or manifest["regular_file_bytes"] != data_bytes:
            raise RuntimeError("archive extraction and namespace accounting disagree")
        shell, links = resolve_rootfs(root, "/bin/sh")
        interpreter, interpreter_links = resolve_rootfs(root, "/lib/ld-musl-riscv64.so.1")
        if shell != root / "bin/busybox" or links != ["/bin/sh->/bin/busybox"]:
            raise RuntimeError(f"unexpected /bin/sh relationship: {links}, {shell}")
        require_hash(shell, BUSYBOX_SHA256)
        require_hash(interpreter, INTERPRETER_SHA256)
        verify_elf(shell, "/lib/ld-musl-riscv64.so.1")
        verify_elf(interpreter, None)
        namespace_shell, namespace_links = namespace_lookup(manifest, "/bin/sh")
        namespace_busybox = namespace_file_bytes(namespace_shell, namespace_data)
        if namespace_links != ["/bin/sh->/bin/busybox"] or hashlib.sha256(namespace_busybox).hexdigest() != BUSYBOX_SHA256:
            raise RuntimeError("serialized namespace /bin/sh resolution mismatch")
        namespace_interpreter, namespace_interpreter_links = namespace_lookup(manifest, "/lib/ld-musl-riscv64.so.1")
        namespace_interpreter_bytes = namespace_file_bytes(namespace_interpreter, namespace_data)
        if namespace_interpreter_links or hashlib.sha256(namespace_interpreter_bytes).hexdigest() != INTERPRETER_SHA256:
            raise RuntimeError("serialized namespace interpreter resolution mismatch")
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
        print(f"namespace_lookup_trace={','.join(namespace_links)}")
        print(f"namespace_runtime_busybox_sha256={hashlib.sha256(namespace_busybox).hexdigest()}")
        print(f"namespace_runtime_interpreter_sha256={hashlib.sha256(namespace_interpreter_bytes).hexdigest()}")
        if args.namespace_output_dir:
            write_namespace(args.namespace_output_dir, manifest, namespace_data)
            print(f"namespace_format={NAMESPACE_FORMAT}")
            print(f"namespace_manifest={(args.namespace_output_dir / 'namespace.json').resolve()}")
            print(f"namespace_data={(args.namespace_output_dir / 'namespace.data').resolve()}")
            print(f"namespace_data_sha256={manifest['data_sha256']}")
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
