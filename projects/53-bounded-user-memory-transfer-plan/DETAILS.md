# Bounded User Memory Transfer Plan Details

## Purpose
Plan a bounded user virtual byte range into validated, ordered physical transfer segments without accessing user memory.

## C pain addressed
A direct C loop over page translations is attractive and small, but overflow, permission direction, page offsets, capacity, and partial output are commonly informal caller conventions. This module makes those decisions explicit. Zig still cannot ensure that a later copier uses the plan correctly or that mappings remain stable after the query.

## Public surface
- `GuestVirtualAddress`, `PhysicalAddress`: re-exported distinct address types.
- `page_size: usize = 4096`.
- `Access = enum { read_from_user, write_to_user }`.
- `PageResolution { physical_page_start, user, readable, writable }`.
- `PageQuery { context, queryFn }`; `query(page_start) ?PageResolution`.
- `Segment { physical_start, virtual_start, request_offset, byte_count }`.
- `Error = error { AddressOverflow, CapacityExceeded, Unmapped, SupervisorOnly, NotReadable, NotWritable, UnalignedPhysicalPage }`.
- `TransferPlan(comptime capacity: usize) type`, with `plan(start, length, access, resolver) Error!Self` and `items() []const Segment`.

## Import and location
Implementation: `projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig`. Named import: `bounded-user-memory-transfer-plan`. Public root: that source file. Tests are in the source and `projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig`.

## Inputs
Addresses, length, access, and page-resolution records are copied. `PageQuery.context` is borrowed only for the synchronous call and must remain valid for its duration. The provider receives aligned virtual page starts and must return an aligned physical page start plus truthful mapping permissions.

## Outputs
The returned plan owns inline copied segments and requires no cleanup. `items()` borrows the plan until it is moved or destroyed. Segments contain physical and virtual starts, request-relative offset, and count, so later copying need not dereference the original user pointer.

## State and invariants
A successful empty request has zero segments and performs zero queries. A successful nonempty plan validates every touched page. Segments are page-confined, ordered, gap-free, nonoverlapping, retain virtual-to-physical page offsets, and represent each requested byte exactly once. Physical pages may be non-contiguous.

## Failure behavior
Range or physical addition overflow returns `AddressOverflow`. Insufficient compile-time segment capacity returns `CapacityExceeded` before any query. Missing mappings, supervisor-only pages, absent direction-specific permission, and unaligned physical page results return their named errors. The plan is built locally and no result is returned on failure, including failure after earlier valid pages; caller state is unchanged.

## Ownership and cleanup
The module allocates nothing and owns only inline segment values. It borrows the resolver context during `plan`. No cleanup is required. Callers own synchronization and mapping-stability policy.

## Dependencies
- `fixed-capacity-vector`: `projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig`, `FixedVector`, for bounded inline output.
- `checked-half-open-range`: `projects/17-checked-half-open-range/src/checked_half_open_range.zig`, `CheckedRange`, for checked start-plus-length arithmetic.
- `distinct-memory-address-types`: `projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig`, `GuestVirtualAddress` and `PhysicalAddress`, to prevent domain confusion.

## Expected dependents
Freestanding kernels, hypervisors, emulators, syscall adapters, debuggers, and hosted virtual-memory simulations.

## Composition examples
```zig
const transfer = @import("bounded-user-memory-transfer-plan");
const plan = try transfer.TransferPlan(2).plan(user_start, length, .read_from_user, query);
for (plan.items()) |fragment| consumePhysical(fragment.physical_start, fragment.byte_count);
```
An Sv39-specific layer can adapt walker results into `PageResolution`; the planner stays independent of page-table implementation and ABI policy.

## Compatibility and adaptation
Targets Zig 0.14.0 and is suitable for hosted or freestanding use. It has no allocator, endian, OS, ABI, or architecture dependency. Instances are not internally synchronized. The callback uses `*const anyopaque`, so an adapter is required at foreign interfaces.

## Complexity and limits
For `p` touched pages, time is O(p) and inline space is O(capacity). Capacity is a compile-time deterministic bound. Page size is fixed at 4096 bytes. The planner deliberately emits one segment per touched virtual page rather than coalescing adjacent physical pages.

## Validation
Run `zig build test-bounded-user-memory-transfer-plan` and `zig build smoke-bounded-user-memory-transfer-plan`. Tests cover same-page reads and writes, crossings, non-contiguous backing, overflow, mapping and permission failures, zero length, capacity exhaustion, later-page failure atomicity, and exact offsets. Zig 0.14.0 validation is recorded only by repository evidence tooling.

## Source map
- Implementation/unit tests: `projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig`
- Smoke: `projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig`
- README: `projects/53-bounded-user-memory-transfer-plan/README.md`
- Mastery: `projects/53-bounded-user-memory-transfer-plan/MASTERY.md`
- Contract: `projects/53-bounded-user-memory-transfer-plan/details.json`
- Port contract: `projects/53-bounded-user-memory-transfer-plan/port.js`
