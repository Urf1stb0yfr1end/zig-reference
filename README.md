# zig-reference

**Common systems projects, uncommon clarity.**

`zig-reference` is a cumulative collection of small, complete systems-programming projects written for **Zig 0.14.0**. Each project begins with first principles, states its invariants, exposes ownership and invalidation rules, tests failure paths, and shows how low-level software can remain understandable as it becomes serious.

This is not an alternative standard library and it does not claim official Zig conventions. It is a set of proposed reference forms supported by working implementations.

## The larger vision

[**Age of Agents**](AGE_OF_AGENTS.md) sets out the repository's long-term design principle: software should preserve solved problems as discoverable, composable knowledge so future systems can begin from accumulated understanding rather than from nothing.

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
2. [Dynamic array](projects/01-dynamic-array/README.md) — allocator ownership, checked growth, cleanup, failure atomicity, and reference invalidation.
3. [Ring buffer](projects/02-ring-buffer/README.md) — FIFO order, wrapped indexing, full and empty states, and logical versus physical layout.
4. [Fixed bit set](projects/03-bit-set/README.md) — compact state, bit-to-word mapping, padding invariants, and precise integer widths.
5. [Bounded byte reader](projects/04-bounded-byte-reader/README.md) — borrowed input, checked cursor movement, explicit endianness, and confined sub-readers.

Each project also contains a `MASTERY.md`: a compact guide to its mental model, invariants, ownership, failure behavior, invalidation rules, tests, adaptation points, and readiness questions. The repository-wide standard is described in [MASTERY.md](MASTERY.md).

These files are written for serious human study. Their consistent structure also makes the repository's reasoning easy for documentation tools and coding assistants to locate and combine, without making machine-specific guidance the public face of the project.

The complete dependency plan lives in [PYRAMID.md](PYRAMID.md).

## Run the projects

```sh
zig version
zig build test
zig build test-fixed-vector
zig build test-dynamic-array
zig build test-ring-buffer
zig build test-bit-set
zig build test-bounded-reader
```

## Where Zig distinguishes itself

These projects emphasize qualities that are easy to miss when Zig is described only as a C alternative:

- low-level representations remain visible;
- allocation is a dependency rather than a global assumption;
- error behavior appears in function types;
- compile-time parameters produce specialized concrete types;
- slices preserve length alongside addresses;
- arbitrary-width integers can express machine constraints precisely;
- tests can exercise failure paths and allocation behavior directly;
- the same language works in hosted programs and freestanding systems.

The objective is not to make systems programming look effortless. It is to make responsibility local, explicit, and teachable.

## Repository vocabulary

The shared architectural vocabulary lives in [ARCHETYPES.md](ARCHETYPES.md).

## Zig version

The repository targets Zig **0.14.0**. Examples should be built and tested with that release unless a project explicitly states otherwise.

## Central principle

> Freedom of mechanism. Stability of form.

A reader should not have to rediscover ownership, invariants, failure behavior, and cleanup every time they open an unfamiliar systems project.
