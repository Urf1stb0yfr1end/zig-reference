# zig-reference

**Common systems projects, uncommon clarity.**

`zig-reference` is a cumulative collection of small, complete systems-programming projects written for **Zig 0.14.0**. Each project begins with first principles, states its invariants, exposes ownership and invalidation rules, tests failure paths, and shows how low-level software can remain understandable as it becomes serious.

This is not an alternative standard library and it does not claim official Zig conventions. It is a set of proposed reference forms supported by working implementations.

## What makes a project belong here?

A project belongs in this repository when:

- students and working programmers commonly build it;
- its naive implementation is easy, but its durable implementation is not;
- it exposes a recurring systems-programming failure mode;
- Zig can make the important guarantees visible without hiding the mechanism;
- the implementation remains small enough to study completely;
- its ideas become building blocks for later projects.

## Study path

1. [Fixed-capacity vector](projects/00-fixed-capacity-vector/README.md) — length, capacity, initialized storage, slices, explicit errors, and invariants.
2. [Dynamic array](projects/02-dynamic-array/README.md) — allocator ownership, checked growth, cleanup, failure atomicity, and reference invalidation.
3. [Ring buffer](projects/03-ring-buffer/README.md) — FIFO order, wrapped indexing, full and empty states, and logical versus physical layout.

The complete dependency plan lives in [PYRAMID.md](PYRAMID.md).

## Run the projects

```sh
zig version
zig build test
zig build test-fixed-vector
zig build test-dynamic-array
zig build test-ring-buffer
```

## Repository vocabulary

The shared architectural vocabulary lives in [ARCHETYPES.md](ARCHETYPES.md).

## Zig version

The repository targets Zig **0.14.0**. Examples should be built and tested with that release unless a project explicitly states otherwise.

## Central principle

> Freedom of mechanism. Stability of form.

A reader should not have to rediscover ownership, invariants, failure behavior, and cleanup every time they open an unfamiliar systems project.
