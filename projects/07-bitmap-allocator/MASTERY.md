# Bitmap Allocator Mastery

## Mental model

There is a fixed universe of numbered slots. Bit `i` is the ownership record for slot `i`.

## Invariants

- every slot is either free or allocated;
- `allocatedCount()` equals the number of set bits;
- `next_hint` is either zero for an empty universe or a valid slot index;
- failed allocation and invalid free operations leave state unchanged.

## Ownership

The allocator owns only inline metadata. It does not own the resources represented by its slot numbers.

## Failure

- `allocate()` returns `Full` when no slot exists;
- `free()` returns `IndexOutOfBounds` for an invalid slot;
- `free()` returns `DoubleFree` for an already-free slot.

## Why the common C version hurts

The bit operations are easy. Keeping every caller consistent about bounds, free state, hint movement, and double-free behavior is not.

## Mastery exercises

1. Add contiguous-run allocation.
2. Add reserved ranges.
3. Adapt indices into physical page addresses.
4. Add a two-level summary bitmap for faster large scans.
