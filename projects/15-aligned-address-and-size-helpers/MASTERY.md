# Mastery: Alignment Helpers

## Mental model

Alignment is a promise about divisibility by a power of two. Round-down removes low address bits; round-up first adds a mask, so overflow must be checked.

## Invariants

- alignment is nonzero and a power of two;
- successful `alignDown` is no greater than the input;
- successful `alignUp` is no less than the input;
- both results are aligned;
- `paddingNeeded` exactly bridges input to `alignUp`.

## Failure

Invalid alignment returns `error.InvalidAlignment`. Round-up overflow returns `error.Overflow`.

## What Zig still cannot decide

The caller must choose the correct hardware, ABI, file-format, or allocator alignment.
