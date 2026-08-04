# Aligned Address and Size Helpers

Checked power-of-two alignment operations for addresses, sizes, offsets, pages, DMA buffers, file sections, and device structures.

## C pain

Alignment formulas are copied throughout systems code, often accepting zero or non-power-of-two alignments and overflowing during round-up.

## API

- `isPowerOfTwo`
- `isAligned`
- `alignDown`
- `alignUp`
- `paddingNeeded`

`alignUp` fails rather than wrapping when `value + alignment - 1` exceeds `usize`.

## Test

```sh
zig build test-alignment-helpers
```
