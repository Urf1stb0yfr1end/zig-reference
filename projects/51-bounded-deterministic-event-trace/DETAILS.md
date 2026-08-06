# Bounded deterministic event trace

## Purpose
Record a bounded insertion-ordered sequence of architecture-neutral events and render it canonically.

## C pain addressed
An inline C array is attractive and efficient, but sequence assignment, overflow handling, full-buffer policy, formatting, and borrowed-view invalidation are normally conventions repeated by each subsystem. This module makes those policies executable. Zig still cannot select domain codes or synchronize callers.

## Public surface
`NormalizedEvent` is a 32-byte `extern struct` of `sequence: u64`, `domain: u16`, `kind: u16`, `subject: u32`, `argument_a: u64`, and `argument_b: u64`. `EventInput` omits sequence. `BoundedDeterministicEventTrace(comptime capacity: usize) type` exposes `init`, `append`, `count`, `remainingCapacity`, `isEmpty`, `isFull`, `events`, `reset`, `eql`, and `render`. Append returns its assigned `u64` or `TraceFull`/`SequenceExhausted`; render returns a borrowed output slice or `OutputTooSmall`. Zero capacity is a compile error.

## Import and location
Implementation: `projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig`; import: `@import("bounded-deterministic-event-trace")`; root constructor: `BoundedDeterministicEventTrace`; smoke test: `projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig`.

## Inputs
`EventInput` is copied. Render borrows mutable caller storage only for the call and returns a read-only slice into it. Domain and kind are caller-controlled stable numeric identifiers; addresses, clocks, random values, and architecture registers must not be disguised as identifiers.

## Outputs
Assigned sequences and counts are copied. `events()` borrows insertion-ordered internal storage. `render()` borrows the written prefix of caller storage; no release is needed.

## State and invariants
Capacity is nonzero and compile-time fixed. Count never exceeds capacity. Sequence zero is first; each success advances by one. The trace is append-only until reset and never overwrites or drops events.

## Failure behavior
`TraceFull`, `SequenceExhausted`, and `OutputTooSmall` leave the trace unchanged. Invalid capacity is rejected at compile time with `ZIGREF-EVENT-TRACE-INVALID-CAPACITY`.

## Ownership and cleanup
Storage is inline and caller-owned with the trace value. There is no allocator and no cleanup operation.

## Dependencies
None. The specialized inline event array is the trace representation itself; importing a generic vector would add an unnecessary dependency without replacing sequence or rendering logic.

## Expected dependents
Future bounded deterministic schedulers, post-seal allocation guards, initialization orchestrators, hosted and freestanding Morphic runtimes, host-target equivalence tools, replay observers, fault injectors, digital twins, and hypervisor trap/guest-state tracers can reuse the envelope, sequence assignment, bounded storage, full behavior, canonical rendering, comparison, diagnostics, and tests. None is implemented here.

## Composition examples
`var trace = BoundedDeterministicEventTrace(16).init(); _ = try trace.append(.{ .domain=1, .kind=1, .subject=0, .argument_a=0, .argument_b=0 });` A future scheduler can borrow a concrete trace and use only `append`, without knowing storage internals. A shared trace-sink conformance family may be useful later; no interface or adapter is invented here.

## Compatibility and adaptation
Targets Zig 0.14.0; hosted and freestanding; no allocator, OS, clock, endian, or architecture dependency. Single-threaded and unsynchronized. Canonical output is field formatting, not in-memory serialization.

## Complexity and limits
Append is O(1); queries are O(1); comparison and rendering are O(count); inline space is O(capacity). Capacity must be positive and fit the target address space.

## Validation
Run `zig build test-bounded-deterministic-event-trace`, `zig build smoke-bounded-deterministic-event-trace`, and `zig build verify-morphic-trace`. Tests cover empty/full/boundary/reset/order/fields, deterministic comparison/rendering, output exhaustion, and an internal sequence-exhaustion seam.

## Source map
Source and unit tests: `projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig`; smoke: `tests/smoke_test.zig`; guides: `README.md`, `MASTERY.md`; recipe: `recipes/trace-morphic-example`.
