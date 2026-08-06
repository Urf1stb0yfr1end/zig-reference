# Bounded System Resource Plan

## Purpose
Derive an exact bounded resource budget and deterministic initialization order.

## C pain addressed
Direct C arrays and size formulas are attractive, but overflow, alignment rules, graph bounds, and which declaration controls which storage type commonly remain conventions. This module exposes those decisions; Zig still cannot choose suitable capacities or enforce the later runtime's seal.

## Public surface
`Planner(comptime CapacityConfiguration) type`; `Planner.plan(Description) Error!Plan`; `Plan.render([]u8) Error![]const u8`; `Planner.ConcreteStorage`; `Planner.concreteStorageBytes()`; and `Planner.layOutConcreteStorage(*ConcreteStorage)`.

## Import and location
Implementation: `projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig`. Named import: `bounded-system-resource-plan`. Tests are in that source and `tests/smoke_test.zig`.

## Inputs
Configurations are copied compile-time values. `Description.initialization_edges` is borrowed only during `plan`; endpoints must name declared nodes. Sizes are copied and measured in bytes.

## Outputs
`Plan` owns copied scalar results and inline initialization-order storage. Rendered text borrows caller output until that buffer changes. No cleanup is required.

## State and invariants
Every capacity is nonzero; node and edge counts fit; page size is a power of two; declared memory is page aligned; each category is page aligned for the total; checked required memory does not exceed declared memory; initialization is acyclic and stable by node index.

## Failure behavior
Construction is failure-atomic: `InvalidCapacity`, `InvalidAlignment`, `ArithmeticOverflow`, `MemoryExceeded`, `InvalidInitializationNode`, `InitializationCycle`, or `TooManyInitializationEdges` returns no plan. Rendering returns `OutputTooSmall` without allocation.

## Ownership and cleanup
The planner owns no external resource and allocates nothing. The caller owns descriptions, edge slices, concrete storage, and render buffers.

## Dependencies
- `bounded-integer` — `BoundedInteger`, validates priority capacity.
- `checked-integer-cast` — `checkedIntegerCast`, checked size-domain conversion.
- `aligned-address-and-size-helpers` — `isPowerOfTwo` and `alignUp`, page rules.
- `fixed-bump-allocator` — `FixedBumpAllocator`, validates concrete caller-owned layout.
- `fixed-capacity-topological-sort` — `FixedTopologicalGraph`, deterministic ordering; transitively inherits fixed vector and stable priority queue storage.

## Expected dependents
Morphic hosted runtime planning, embedded runtimes, kernels, and deterministic simulators.

## Composition examples
`const P = @import("bounded-system-resource-plan").Planner(config);` then call `P.plan(description)`. The Morphic recipe supplies its one canonical configuration without duplicating algorithms.

## Compatibility and adaptation
Targets Zig 0.14.0 and is currently hosted-only because rendering uses hosted standard-library I/O abstractions. No allocator, libc, endian, or architecture assumption exists. Instances are not synchronized.

## Testing and validation
Run `zig build test-bounded-system-resource-plan`, `zig build smoke-bounded-system-resource-plan`, and `zig build verify-morphic-plan`.

## Known limitations
The planner describes but does not enforce post-seal allocation. It does not implement scheduling, tracing, page tables, boot, devices, or virtualization. Category record layouts are an initial planning ABI, not a stable foreign ABI.
