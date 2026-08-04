# Checked Half-Open Range

A validated `[start, end)` range for memory, files, parsing, devices, and allocation.

## C pain

Codebases mix inclusive and exclusive endpoints, recompute `start + length` without overflow checks, and disagree about whether touching ranges overlap.

## Zig form

`CheckedRange` validates construction and centralizes containment, overlap, and intersection.

```zig
const region = try CheckedRange.fromStartAndLength(base, length);
if (region.containsValue(address)) { ... }
```

Touching ranges such as `[10,20)` and `[20,30)` do not overlap.

## Reuse

Physical memory maps, virtual address reservations, binary table bounds, file extents, MMIO registration, allocators, and database pages.

## Test

```sh
zig build test-checked-half-open-range
```

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
