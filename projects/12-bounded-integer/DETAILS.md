# Bounded Integer — Integration Contract

## Purpose
Represent an integer constrained to a compile-time inclusive minimum and maximum.

## C pain addressed
Raw integer fields admit impossible values and spread duplicated range checks throughout a codebase.

## Public surface
- `BoundedInteger(comptime T: type, comptime minimum: T, comptime maximum: T) type`
- `init(value: T) error{OutOfRange}!Self`
- `get(self: Self) T`
- `set(self: *Self, value: T) error{OutOfRange}!void`
- `minValue() T`
- `maxValue() T`

## Import and location
- Implementation: `projects/12-bounded-integer/src/bounded_integer.zig`
- Root symbol: `BoundedInteger`
- Test source: implementation file

## Inputs
- `T`: compile-time integer type.
- `minimum`, `maximum`: compile-time inclusive bounds; `minimum <= maximum`.
- Runtime values are copied scalars and must lie inside the range.

## Outputs
- Successful construction returns an owned scalar wrapper.
- `get()` returns a copied `T`.
- No borrowed views or cleanup.

## State and invariants
- State: `value: T`.
- Invariant: `minimum <= value <= maximum` after every successful operation.

## Failure behavior
- Construction outside the range returns `error.OutOfRange`.
- Failed `set()` leaves the prior value unchanged.
- Invalid compile-time bounds cause a compile error.

## Ownership and cleanup
Owns one scalar. No allocator or destruction.

## Dependencies
Repository: none. Standard library is used only by tests.

## Expected dependents
Interrupt priorities, CPU indices, queue limits, port numbers, register fields, dimensions, protocol fields, retry limits, and configuration schemas.

## Composition examples
```zig
const BoundedInteger = @import("../12-bounded-integer/src/bounded_integer.zig").BoundedInteger;
const InterruptPriority = BoundedInteger(u8, 0, 15);
const priority = try InterruptPriority.init(raw_priority);
```
Combine with checked integer casting when external input has a different width or signedness.

## Compatibility and adaptation
- Zig: 0.14.0 target.
- Hosted and freestanding: yes.
- Allocator: none.
- Thread safety: no internal synchronization.
- Endianness: not applicable.
- FFI: pass the unwrapped scalar across ABI boundaries.

## Complexity and limits
All operations are O(1) time and O(1) space. One concrete type is generated for each `(T, minimum, maximum)` combination.

## Validation
- `zig build test-bounded-integer`
- Covers inclusive boundaries, failed construction, and failure-atomic mutation.
- Compiler validation in the current environment: not performed.

## Source map
- `README.md`
- `MASTERY.md`
- `DETAILS.md`
- `details.json`
- `src/bounded_integer.zig`
