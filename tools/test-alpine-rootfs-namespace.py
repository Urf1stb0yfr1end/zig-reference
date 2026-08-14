#!/usr/bin/env python3
"""Focused deterministic tests for the neutral bounded namespace serializer."""
from __future__ import annotations

import importlib.util
import io
import pathlib
import tarfile
import tempfile


SOURCE = pathlib.Path(__file__).with_name("pressure-real-rv64-alpine-minirootfs.py")
SPEC = importlib.util.spec_from_file_location("alpine_namespace", SOURCE)
assert SPEC and SPEC.loader
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)


def archive(path: pathlib.Path, rows: list[tuple[str, str, bytes]]) -> None:
    with tarfile.open(path, "w:gz") as output:
        for name, kind, payload in rows:
            info = tarfile.TarInfo(name)
            if kind == "directory":
                info.type = tarfile.DIRTYPE
                output.addfile(info)
            elif kind == "symlink":
                info.type = tarfile.SYMTYPE
                info.linkname = payload.decode()
                output.addfile(info)
            else:
                info.size = len(payload)
                output.addfile(info, io.BytesIO(payload))


def rejected(action, message: str) -> None:
    try:
        action()
    except RuntimeError:
        return
    raise AssertionError(message)


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="zigref-namespace-test-") as raw:
        root = pathlib.Path(raw)
        good = root / "good.tar.gz"
        archive(good, [
            ("bin", "directory", b""),
            ("bin/app", "regular", b"payload"),
            ("bin/sh", "symlink", b"/bin/app"),
            ("loop", "symlink", b"/loop"),
        ])
        manifest, data = module.build_namespace(good)
        assert manifest["object_count"] == 4 and manifest["regular_file_bytes"] == 7
        row, links = module.namespace_lookup(manifest, "/bin/sh")
        assert links == ["/bin/sh->/bin/app"]
        assert module.namespace_file_bytes(row, data) == b"payload"
        rejected(lambda: module.namespace_lookup(manifest, "/missing"), "missing component accepted")
        rejected(lambda: module.namespace_lookup(manifest, "/loop", 2), "symlink loop accepted")
        rejected(lambda: module.namespace_lookup(manifest, "/../bin/app"), "root escape accepted")

        duplicate = root / "duplicate.tar.gz"
        archive(duplicate, [("bin", "directory", b""), ("bin/app", "regular", b"a"), ("bin/app", "regular", b"b")])
        rejected(lambda: module.build_namespace(duplicate), "duplicate canonical path accepted")

        damaged = dict(manifest)
        damaged["regular_file_bytes"] = len(data) + 1
        rejected(lambda: module.validate_namespace(damaged, data), "damaged byte accounting accepted")
        print("PASS: deterministic bounded namespace construction, ranges, lookup, symlinks, loops, escapes, and conflicts")


if __name__ == "__main__":
    main()
