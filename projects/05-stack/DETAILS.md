# Stack Details

## Purpose

Provide an allocator-backed last-in, first-out container by composing the existing dynamic-array module.

## C pain addressed

C stack implementations frequently duplicate growth, ownership, cleanup, and overflow logic already present in a vector. This module demonstrates reuse instead of reinvention.

## Public surface

- `Stack(T).init(allocator)`
- `deinit()`
- `push(value) !void`
- `pop() ?T`
- `peek() ?T`
- `len() usize`
- `isEmpty() bool`
- `clearRetainingCapacity()`

## Inputs

- Element type `T`, known at compile time.
- An explicit allocator whose lifetime covers the stack.
- Values transferred into stack storage by value.

## Outputs

- `pop` returns the newest value or `null`.
- `peek` returns a copied value and does not mutate state.
- No borrowed element reference is exposed.

## Invariants

- Stack length equals the underlying dynamic-array length.
- The top element, when present, is at `len - 1`.
- All dynamic-array ownership and capacity invariants remain in force.

## Failure behavior

`push` may return allocator or capacity-arithmetic errors. Failure leaves the existing stack unchanged.

## Dependencies

- `projects/02-dynamic-array`

## Expected dependents

- expression evaluator
- depth-first traversal
- parser state stack
- virtual-machine operand stack
- undo history

## Adaptation notes

For freestanding code, substitute a compatible lower storage module rather than changing stack semantics. For non-copyable owned elements, define element cleanup policy in the dependent module.

## Test command

```sh
zig build test-stack
```

## Source map

- implementation: `src/stack.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
