#!/usr/bin/env python3
"""Inspect the bounded page-image pressure implied by ELF64 PT_LOAD entries."""
from __future__ import annotations

import argparse
import hashlib
import pathlib
import struct
import sys

PAGE_SIZE = 4096
PT_LOAD = 1
PF_X = 1
PF_W = 2
PF_R = 4


def inspect_elf(data: bytes) -> dict[str, object]:
    if len(data) < 64 or data[:4] != b"\x7fELF" or data[4:6] != b"\x02\x01":
        raise ValueError("expected little-endian ELF64")
    phoff = struct.unpack_from("<Q", data, 32)[0]
    phentsize, phnum = struct.unpack_from("<HH", data, 54)
    if phentsize < 56 or phoff + phentsize * phnum > len(data):
        raise ValueError("program-header table is out of bounds")
    pages: dict[int, int] = {}
    loads: list[dict[str, int]] = []
    for index in range(phnum):
        fields = struct.unpack_from("<IIQQQQQQ", data, phoff + index * phentsize)
        kind, flags, offset, vaddr, _, filesz, memsz, align = fields
        if kind != PT_LOAD:
            continue
        if filesz > memsz or offset + filesz > len(data) or vaddr + memsz > 1 << 64:
            raise ValueError(f"invalid PT_LOAD {index}")
        loads.append({"index": index, "offset": offset, "vaddr": vaddr, "filesz": filesz, "memsz": memsz, "flags": flags, "align": align})
        if memsz == 0:
            continue
        first = vaddr & ~(PAGE_SIZE - 1)
        last = (vaddr + memsz + PAGE_SIZE - 1) & ~(PAGE_SIZE - 1)
        for page in range(first, last, PAGE_SIZE):
            pages[page] = pages.get(page, 0) | flags
    wx_pages = sum(bool(flags & PF_W and flags & PF_X) for flags in pages.values())
    return {"load_segments": loads, "materialized_load_pages": len(pages), "wx_pages": wx_pages}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("elf", type=pathlib.Path)
    parser.add_argument("--expected-sha256")
    args = parser.parse_args()
    data = args.elf.read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    if args.expected_sha256 and digest != args.expected_sha256:
        raise ValueError(f"ELF SHA-256 mismatch: expected {args.expected_sha256}, got {digest}")
    result = inspect_elf(data)
    print(f"elf_sha256={digest}")
    for load in result["load_segments"]:
        print("pt_load=" + ",".join(f"{key}={value:#x}" for key, value in load.items()))
    print(f"materialized_load_pages={result['materialized_load_pages']}")
    print(f"wx_pages={result['wx_pages']}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, struct.error) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1)
