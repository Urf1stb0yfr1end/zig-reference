# Dynamic Array Mastery

## Mental model

A dynamic array is a contiguous heap allocation plus two numbers:

- `len`: the number of live elements;
- `capacity`: the number of elements the allocation can hold.

Growth replaces the allocation with a larger one, copies the live elements, and only then releases the old allocation.

## Invariants

- `len <= capacity`.
- Live elements occupy `items[0..len]`.
- The allocation length equals `capacity`.
- Empty state owns no non-empty allocation.
- Failed growth leaves the original allocation, length, and elements unchanged.
- Every successful initialization has one matching destruction responsibility.

## Ownership

The vector owns its allocation. The allocator is a dependency used to acquire and release that storage.

Returned slices borrow the allocation. They do not own it and must not outlive the vector.

## Failure behavior

Appending may fail because:

- capacity arithmetic overflows;
- allocation fails.

A failed append does not add the new value and does not destroy or replace existing contents.

## Invalidation

Any operation that grows or explicitly changes capacity may relocate storage and invalidate every pointer, slice, and iterator into the vector.

Removal may shift elements and therefore change the logical value reached by an existing element pointer.

## Why not the obvious C version?

A typical C vector begins as `pointer + length + capacity`. The representation is sound, but its guarantees are usually scattered across conventions:

- whether `realloc` is assigned through a temporary;
- whether growth arithmetic can overflow;
- whether capacity changes before allocation succeeds;
- who frees the storage;
- whether callers know that append invalidates pointers.

The Zig implementation makes allocation failure part of the operation, keeps the allocator relationship visible, and commits state only after replacement storage exists.

## Proof through tests

The tests should establish:

- appending across several growth events;
- preservation of ordering and values;
- explicit capacity reservation;
- allocation-failure behavior;
- state preservation after failed growth;
- destruction without leaks under a testing allocator;
- zero-sized element behavior where relevant.

## Adaptation notes

Hosted applications can use a general allocator. Freestanding systems may instead use:

- a fixed region;
- an arena;
- a page allocator;
- caller-supplied replacement storage.

The growth and failure-atomicity archetype should remain even when the allocator changes.

## Mastery exercises

1. Add `reserveExact` and compare it with geometric growth.
2. Add `shrinkToFit` and document its invalidation behavior.
3. Add ordered insertion with rollback-safe growth.
4. Adapt the vector to a caller-supplied region without changing its public invariants.
5. Demonstrate the unsafe C pattern of assigning `realloc` directly to the owned pointer, then explain the lost-allocation failure.

## Readiness check

Before continuing, explain:

- why `len` cannot exceed `capacity`;
- why replacement storage must be allocated before old storage is released;
- which operations invalidate every borrowed slice;
- what state remains after allocation failure;
- why the allocator is part of the ownership story.
