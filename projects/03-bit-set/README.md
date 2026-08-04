# Project 03: Fixed Bit Set

A bit set stores many yes-or-no facts compactly. Instead of spending an entire byte or integer on every flag, it packs each fact into one bit.

Common uses include:

- tracking allocated pages;
- recording permissions or capabilities;
- marking visited graph nodes;
- representing available slots;
- maintaining feature and state flags;
- building bitmap allocators.

## Why this belongs in the pyramid

The earlier projects teach initialized storage, capacity, indexing, ownership, and wrapped positions. This project adds a new kind of representation: one logical value is located inside a larger machine word.

The central mapping is:

```text
logical bit index
    -> storage word
    -> bit position inside that word
    -> mask
```

## The deceptively easy C version

A C implementation may begin with an integer array and expressions such as:

```c
words[index / 64] |= 1ULL << (index % 64);
```

That expression is efficient. The problem is everything it leaves unstated:

- Is `index` in range?
- What happens to unused bits in the final word?
- Is the shift performed in a sufficiently wide unsigned type?
- Does `set_all` accidentally expose nonexistent bits?
- Does a count operation include padding bits?
- Which operations preserve the representation invariant?

The arithmetic is not the enemy. The missing boundary around it is.

## The Zig design

`BitSet(bit_count)` makes the logical capacity part of the type. Every indexed operation checks the boundary before mutating storage. The implementation keeps unused high bits in the final word clear, so storage details cannot silently become logical state.

The type has no allocator and no pointer invalidation. It is suitable for hosted and freestanding programs.

## Invariants

1. Only indices in `0..bit_count` are observable.
2. Unused bits in the final storage word are zero.
3. Failed indexed operations do not mutate the set.
4. `countSet()` never counts nonexistent padding bits.

## What Zig demonstrates here

Zig preserves the compact representation and direct bitwise operations that make C attractive. It adds:

- a compile-time capacity;
- an explicit error for invalid indices;
- a narrow integer type for the shift amount;
- tests over boundary words and zero-sized sets;
- a representation invariant enforced by the type itself.

This is not abstraction away from the machine. It is a clearer statement of exactly which machine operations are valid.

## Run

```sh
zig build test-bit-set
```

Continue with [MASTERY.md](MASTERY.md) after reading the implementation and tests together.
