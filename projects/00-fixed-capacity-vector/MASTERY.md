# Fixed-Capacity Vector Mastery

## Mental model

A fixed-capacity vector is an array plus a length. The array determines how many elements could fit. The length determines how many elements currently exist.

Only indices below `len` contain live values.

## Invariants

- `len <= capacity`.
- Elements in `storage[0..len]` are initialized.
- Elements in `storage[len..capacity]` are not part of the vector.
- A failed insertion leaves `len` and all live elements unchanged.
- Removal preserves the documented ordering behavior.

## Ownership

The vector owns its inline storage as part of its value. It performs no heap allocation and requires no explicit destruction.

Slices returned by the vector borrow its storage. They must not outlive the vector.

## Failure behavior

Insertion fails with `error.Full` when `len == capacity`.

Checked access fails when the requested index is outside `0..len`.

Failures do not partially modify the vector.

## Invalidation

Appending does not relocate the vector's inline storage, but moving or copying the vector value may change where that storage lives.

Ordered removal shifts later elements. Pointers to shifted elements may then refer to different logical values.

## Why not the obvious C version?

A direct C implementation often exposes the storage array and length separately. Correctness then depends on every caller remembering:

- not to write beyond capacity;
- not to read unused storage;
- to update length exactly once;
- to preserve state when insertion fails.

The Zig type places those duties behind operations whose errors and valid slices are explicit.

## Proof through tests

The tests should establish:

- insertion until full;
- failure when full;
- unchanged contents after failed insertion;
- checked access;
- ordered removal;
- zero-capacity behavior.

## Adaptation notes

This structure is suitable for freestanding programs because it allocates nothing. It can later serve as:

- an early-boot collection;
- a bounded interrupt queue;
- inline temporary storage;
- the base case for a growable vector.

## Mastery exercises

1. Add `pop` without changing failure semantics.
2. Add unordered removal and document its invalidation behavior.
3. Add `insert(index, value)` while preserving failure atomicity.
4. Explain why returning the entire backing array would weaken the abstraction.

## Readiness check

Before continuing, explain:

- why capacity and length are different;
- which storage is initialized;
- why failed insertion must not increment length;
- which references may change meaning after ordered removal.
