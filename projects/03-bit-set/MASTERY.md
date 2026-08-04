# Mastery: Fixed Bit Set

## Mental model

A bit set is an array of logical booleans encoded inside fixed-width unsigned words. The public index names a logical bit. The implementation derives a word index and a one-bit mask.

For 64-bit words:

```text
word index = bit index / 64
bit offset = bit index % 64
mask       = 1 << bit offset
```

## What must always be true

- No public operation accepts an index outside `0..bit_count`.
- Padding bits in the last word remain zero.
- The logical count is independent of the physical word count.
- A failed mutation leaves the complete value unchanged.

## Why padding bits matter

A 70-bit set requires two 64-bit words. The second word contains only six logical bits. The remaining 58 bits exist physically but not logically.

If `setAll()` fills both words with ones and does not clear those 58 padding bits, then:

- `countSet()` may report 128 instead of 70;
- equality based on raw storage may become misleading;
- later bitmap allocation may return an index outside the permitted range.

This is a small example of a broad systems principle:

> Physical representation may contain states that the logical model must forbid.

## Why the operations return errors

Unchecked indexing would make the implementation shorter. It would also move responsibility to every caller and allow one incorrect index to address an unrelated word.

The checked operation defines the boundary once. Code that has already proved an index valid can later add a carefully documented unchecked internal operation, but the reference interface begins with the safe contract.

## Zig ideas to study

### Compile-time parameters

`BitSet(70)` and `BitSet(128)` are different concrete types. Their storage sizes are known at compile time, requiring no runtime allocator or metadata.

### Arbitrary-width integers

The shift amount is represented as `u6`, the exact integer width required to address the 64 positions in a `u64`. This documents and enforces the machine constraint.

### Explicit representation

The implementation does not hide bit arithmetic. It isolates it in `locate`, making the representation readable and preventing duplicated arithmetic from drifting across methods.

## Tests to understand

1. Bits at indices 0, 64, and 129 prove word-boundary behavior.
2. A 70-bit `setAll` proves padding is masked.
3. An out-of-range mutation proves failure atomicity.
4. A zero-capacity set proves the generic handles its smallest legal form.

## Exercises

1. Add `findFirstSet()`.
2. Add `findFirstClear()` without returning padding bits.
3. Add union, intersection, and difference between equal-capacity sets.
4. Add an iterator over set indices.
5. Build a fixed bitmap allocator on top of the type.
6. Compare inline storage with a caller-supplied slice version.

## Readiness questions

You understand this project when you can explain:

- why `bit_count` and storage capacity are not the same;
- why the final word requires masking;
- why the shift amount uses `u6`;
- how a bitmap allocator can reuse this type;
- which guarantees would be lost by exposing `words` as the primary API.
