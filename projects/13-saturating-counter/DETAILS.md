# Saturating Counter — Integration Contract

## Purpose
Provide an unsigned counter whose arithmetic clamps between zero and a compile-time maximum.

## C pain addressed
Counter overflow behavior is frequently accidental. Wrapping can reset quotas, telemetry, retry counts, or pressure indicators to misleading values.

## Public surface
- `SaturatingCounter(comptime T: type, comptime maximum: T) type`
- `init(value: T) Self`
- `get(self: Self) T`
- `increment(self: *Self) void`
- `decrement(self: *Self) void`
- `add(self: *Self, amount: T) void`
- `subtract(self: *Self, amount: T) void`
- `reset(self: *Self) void`
- `isSaturated(self: Self) bool`

## Import and location
- Implementation: `projects/13-saturating-counter/src/saturating_counter.zig`
- Root symbol: `SaturatingCounter`
- Test source: implementation file

## Inputs
- `T`: compile-time unsigned integer type.
- `maximum`: compile-time saturation ceiling.
- Runtime values and amounts are copied scalars.

## Outputs
- `get()` returns a copied `T`.
- `isSaturated()` returns a copied Boolean.
- No borrowing or cleanup.

## State and invariants
- State: `value: T`.
- `0 <= value <= maximum`.
- Addition never wraps and never decreases the value.
- Subtraction never wraps and never increases the value.

## Failure behavior
No runtime errors. Initialization and addition clamp to `maximum`; subtraction clamps to zero. Invalid signed `T` causes a compile error.

## Ownership and cleanup
Owns one scalar. No allocator, borrowing, or destruction.

## Dependencies
Repository: none. Standard library is used only by tests.

## Expected dependents
Retry policies, quotas, telemetry counters, bounded error counts, resource-pressure indicators, rate controls, and device-status accumulation.

## Composition examples
```zig
const SaturatingCounter = @import("../13-saturating-counter/src/saturating_counter.zig").SaturatingCounter;
const RetryCount = SaturatingCounter(u8, 8);
var retries = RetryCount.init(0);
retries.increment();
```
Use `BoundedInteger` instead when values outside the range must be rejected rather than absorbed.

## Compatibility and adaptation
- Zig: 0.14.0 target.
- Hosted and freestanding: yes.
- Allocator: none.
- Thread safety: no internal synchronization; use an atomic-specific module for shared counters.
- Endianness: not applicable.
- FFI: unwrap to the underlying integer.

## Complexity and limits
All operations are O(1) time and O(1) space.

## Validation
- `zig build test-saturating-counter`
- Covers upper saturation, lower saturation, initial clamping, reset, and saturation detection.
- Compiler validation in the current environment: not performed.

## Source map
- `README.md`
- `MASTERY.md`
- `DETAILS.md`
- `details.json`
- `src/saturating_counter.zig`
