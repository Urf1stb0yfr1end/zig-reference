# Mastery: Checked Half-Open Range

## Mental model

A range is not two unrelated integers. It is one value whose order and boundary convention have already been established.

## Invariants

- `start <= end`;
- length is exactly `end - start`;
- the start belongs to a nonempty range;
- the end never belongs to the range;
- touching ranges do not overlap;
- intersections are returned only when nonempty.

## Failure

Reversed endpoints return `error.InvalidRange`. `start + length` overflow returns `error.Overflow`.

## Snowball value

Once all memory, file, parser, and device regions speak the same range language, higher modules can compose without translating boundary folklore at every edge.

## What Zig still cannot decide

The caller must choose the correct unit: bytes, pages, sectors, addresses, or elements. Later typed-range adapters should make those distinctions stronger.
