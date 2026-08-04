# Mastery: Stack

## Mental model

A stack is a restricted dynamic sequence. Only the newest element is operationally visible.

The restriction is valuable: callers cannot accidentally depend on operations the abstraction does not promise.

## Core invariant

When `len > 0`, the top element is stored at index `len - 1` of the underlying dynamic array.

## Ownership

The stack owns its dynamic-array storage. Values are stored by value. The supplied allocator remains externally owned.

## Failure

Only growth can fail. A failed `push` does not change the logical contents.

## C pain to recognize

The algorithm is not the hard part. The recurring mistake is reimplementing vector memory management inside every stack, queue, parser, and work list. Duplication multiplies failure paths.

## Zig lesson

Use a lower-level type to carry lower-level invariants. Build the new abstraction by narrowing operations, not by copying implementation machinery.

## What Zig does not decide

Zig does not determine how owned element resources should be destroyed. A stack of handles or owning structs needs a policy at the layer that understands those values.

## Exercises

1. Add `popOrError` with an explicit `Empty` error.
2. Add `pushSlice` while preserving failure atomicity.
3. Build a balanced-delimiter checker using `Stack(u8)`.
4. Build an iterative depth-first traversal.
5. Explain why exposing the underlying storage would weaken the abstraction.

## Readiness questions

- Why does this module depend on dynamic array rather than copy it?
- Which operation may allocate?
- Why is empty represented by `null`?
- What remains valid after a failed push?
- When would a fixed-capacity stack be preferable?
