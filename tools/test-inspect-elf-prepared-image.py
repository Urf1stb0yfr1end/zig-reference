#!/usr/bin/env python3
from __future__ import annotations
import importlib.util
import pathlib
import struct

ROOT = pathlib.Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("inspect_elf", ROOT / "tools/inspect-elf-prepared-image.py")
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)

def fixture(loads):
    data = bytearray(0x5000)
    data[:6] = b"\x7fELF\x02\x01"
    struct.pack_into("<Q", data, 32, 64)
    struct.pack_into("<HH", data, 54, 56, len(loads))
    for index, row in enumerate(loads):
        struct.pack_into("<IIQQQQQQ", data, 64 + index * 56, 1, *row)
    return bytes(data)

# Two segments share one page: count unique pages and union permissions.
data = fixture([(5, 0x1000, 0x400123, 0, 8, 0x900, 0x1000), (6, 0x2000, 0x400800, 0, 8, 0x1000, 0x1000)])
result = MODULE.inspect_elf(data)
assert result["materialized_load_pages"] == 2
assert result["wx_pages"] == 1

# Reject source truncation and filesz greater than memsz.
for bad in [fixture([(4, 0x4ff9, 0x1000, 0, 8, 8, 0x1000)]), fixture([(4, 0x1000, 0x1000, 0, 9, 8, 0x1000)])]:
    try:
        MODULE.inspect_elf(bad)
    except ValueError:
        pass
    else:
        raise AssertionError("invalid PT_LOAD accepted")
print("PASS: ELF PT_LOAD page pressure inspection unique-page, permission-union, and bounds regressions")
