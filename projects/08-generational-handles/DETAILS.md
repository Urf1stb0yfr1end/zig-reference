# Generational Handles Integration Contract

## Purpose
Store values behind index-plus-generation handles that reject removed and stale identities.

## C pain addressed
Pointers and integer indices are compact, but neither carries the validity convention needed after slot removal and reuse.

## Public surface
`HandleTable(T, capacity) type`; nested `Handle`; methods `count`, `insert`, `get`, `getConst`, and `remove`. Insertion may return `error.Full`; lookup and removal use optional results.

## Import and location
Implementation, tests, and entrypoint: `projects/08-generational-handles/src/generational_handles.zig`. Import `HandleTable` from that file.

## Inputs
`T` and `capacity` are compile-time inputs; capacity may be zero. Insert copies `T`. Handles are copied and must match index, occupancy, and generation.

## Outputs
Handles and removed values are copied. `get`/`getConst` return borrowed pointers invalidated by removal, movement, or destruction of the table. Caller cleanup depends on `T`.

## State and invariants
The inline slot array records occupancy, value, and `u32` generation. `len` equals occupied slots. A valid handle matches every validity field.

## Failure behavior
Full insertion returns `error.Full` without mutation. Invalid or stale lookup/removal returns `null` without mutation. Removal advances generation and invalidates prior handles.

## Ownership and cleanup
The table owns copied values and allocates nothing. It does not invoke element destructors; callers must remove and clean up resource-owning values.

## Dependencies
No repository dependencies. It uses `std.testing` only in tests.

## Expected dependents
VM, vCPU, device, timer, and entity registries.

## Composition examples
`var table = @import("src/generational_handles.zig").HandleTable(u32, 16){};` A device registry can expose handles while keeping storage private.

## Compatibility and adaptation
Targets Zig 0.14.0; hosted and freestanding suitable; no allocator, endian, libc, OS, or architecture dependency. No internal synchronization. Layout is not a stable C ABI.

## Complexity and limits
Insertion is O(capacity); lookup/removal are O(1); storage is inline O(capacity). Generation is `u32` and wraps after `2^32` removals of a slot.

## Validation
Run `zig build test-generational-handles` or `zig build test`. Compiler validation is currently unverified because Zig is unavailable in this environment.

## Source map
Source/tests: `projects/08-generational-handles/src/generational_handles.zig`; lesson: `README.md`; reasoning: `MASTERY.md`; machine contract: `details.json`. For indefinite stale-handle retention, replace the wrap policy with a wider or retiring generation scheme.
