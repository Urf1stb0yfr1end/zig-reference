# Checked Integer Cast — Integration Contract

## Purpose
Convert an integer value to another integer type only when the value is exactly representable.

## C pain addressed
Implicit narrowing, signedness conversion, and cast-based truncation make invalid values appear successfully converted.

## Public surface
- `checkedIntegerCast(comptime Destination: type, value: anytype) error{OutOfRange}!Destination`

## Import and location
- Implementation: `projects/10-checked-integer-cast/src/checked_integer_cast.zig`
- Symbol: `checkedIntegerCast`
- Test source: implementation file

## Inputs
- `Destination`: compile-time integer type.
- `value`: integer or comptime integer, copied by value.
- No allocation, borrowing, or aliasing.

## Outputs
- Success: scalar `Destination` equal to the source mathematical value.
- Failure: `error.OutOfRange`.
- Caller cleanup: none.

## State and invariants
Stateless. Every returned value is representable by `Destination` without truncation or sign loss.

## Failure behavior
Failure has no side effects and produces no partial output.

## Ownership and cleanup
None.

## Dependencies
- Zig standard library: `std.math.cast`.
- Repository dependencies: none.

## Expected dependents
Binary decoders, FFI gates, page-count conversion, device-register adapters, protocol field validators, bounded integer construction, and allocator size calculations.

## Composition examples
```zig
const cast = @import("../10-checked-integer-cast/src/checked_integer_cast.zig");
const packet_length = try cast.checkedIntegerCast(u16, parsed_length);
```
Combine with `BoundedInteger` when representability is necessary but not sufficient for semantic validity.

## Compatibility and adaptation
- Zig: 0.14.0 target.
- Hosted: yes.
- Freestanding: yes.
- Allocator: none.
- Thread safety: stateless.
- Endianness: not applicable.
- FFI: useful at foreign integer boundaries; no stable ABI is declared.

## Complexity and limits
- Time: O(1).
- Space: O(1).
- Supports Zig integer types accepted by `std.math.cast`.

## Validation
- `zig build test-checked-integer-cast`
- Covers widening, narrowing, signedness, bounds, and comptime literals.
- Compiler validation in the current environment: not performed.

## Source map
- `README.md`
- `MASTERY.md`
- `DETAILS.md`
- `details.json`
- `src/checked_integer_cast.zig`
