# Stack

A stack stores values in **last-in, first-out** order. The newest value is the first one removed.

Stacks appear in expression evaluation, parsing, depth-first search, undo systems, virtual machines, and recursive algorithms expressed iteratively.

## Why this module exists

The stack mechanism is simple. The design lesson is composition.

A common C implementation creates another structure containing a pointer, length, and capacity, then repeats allocation, resizing, overflow, cleanup, and failure handling. That duplication creates another place for the same old bugs.

This Zig implementation reuses the dynamic array already established lower in the pyramid. The stack owns only stack semantics:

- push at the end;
- pop from the end;
- inspect the top;
- expose no irrelevant random-access API.

The lower module continues to own allocation and growth.

## What Zig makes visible

- The element type is part of the container type.
- The allocator is explicit at construction.
- Growth failure appears in `push`'s return type.
- Empty `pop` and `peek` return an optional value.
- Cleanup remains paired with construction.
- Composition removes duplicated memory-management code.

## Study order

1. Read `DETAILS.md` to understand the contract.
2. Read `src/stack.zig` with the dynamic array beside it.
3. Read `MASTERY.md` and answer the readiness questions.
4. Run `zig build test-stack`.
