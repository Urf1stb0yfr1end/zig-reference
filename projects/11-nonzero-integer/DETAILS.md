# Nonzero Integer — Integration Contract

## Purpose
Represent an integer whose value is guaranteed not to be zero.

## C pain addressed
Raw integer sentinels make zero carry several meanings and force repeated precondition checks across call sites.

## Public surface
- `NonZeroInteger(comptime T: type) type`
- `init(value: T) error{ZeroNotAllowed}!Self`
- `get(self: Self) T`

## Import and location
- Implementation: `projects/11-nonzero-integer/src/nonzero_integer.zig`
- Root symbol: `NonZeroInteger`
- Test source: implementation file

## Inputs
- `T`: compile-time integer type.
- `value`: copied scalar integer.
- Valid construction requires `value != 0`.

## Outputs
- `Self`: owned scalar wrapper.
- `get()`: copied `T`.
- No borrowed views or cleanup.

## State and invariants
- Exactly one field: `value: T`.
- Invariant: `value != 0` for every valid instance.

## Failure behavior
`init(0)` returns `error.ZeroNotAllowed`. No invalid instance or partial state is produced.

## Ownership and cleanup
Owns one scalar. No allocator, borrowing, transfer, or destruction.

## Dependencies
Repository: none. Standard library is used only by tests.

## Expected dependents
Nonzero page counts, divisors, hardware queue depths, generation counters, protocol identifiers, nonempty collection lengths, and validated configuration.

## Composition examples
```zig
const NonZeroInteger = @import("../11-nonzero-integer/src/nonzero_integer.zig").NonZeroInteger;
const NonZeroPageCount = NonZeroInteger(usize);
const pages = try NonZeroPageCount.init(raw_pages);
```
Combine with checked integer casting before construction when input arrives in a wider or signed type.

## Compatibility and adaptation
- Zig: 0.14.0 target.
- Hosted and freestanding: yes.
- Allocator: none.
- Thread safety: immutable values are freely shareable; synchronization of mutable containing state remains external.
- Endianness: not applicable.
- FFI: unwrap to the underlying integer at a foreign boundary.

## Complexity and limits
All operations are O(1) time and O(1) space.

## Validation
- `zig build test-nonzero-integer`
- Covers positive, negative, and zero rejection.
- Compiler validation in the current environment: not performed.

## Source map
- `README.md`
- `MASTERY.md`
- `DETAILS.md`
- `details.json`
- `src/nonzero_integer.zig`
