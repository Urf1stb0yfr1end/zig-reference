# Validated Bit Flags: Integration Contract

## Purpose
Represent a set of enum-named bit masks while rejecting unknown storage bits.

## Public surface
`ValidatedBitFlags(comptime Flag: type)` returns a concrete type with:
- `fromRaw(raw) error{UnknownBits}!Self`
- `raw() Storage`
- `contains(flag) bool`
- `insert(flag)`
- `remove(flag)`
- `clear()`

## Inputs and outputs
Flags and raw storage are copied. The module owns one integer mask and borrows nothing.

## Invariant
`bits & ~allowed_mask == 0` after every successful operation.

## Failure
Only `fromRaw` fails. Unknown bits produce no constructed value and no partial effects.

## Dependencies
No repository dependencies. Uses enum metadata from `std.meta`.

## Expected dependents
Permission sets, page-table entries, VMX controls, device registers, protocol capabilities, and configuration feature sets.

## Compatibility
Hosted and freestanding suitable; allocation-free; no synchronization.

## Complexity
All operations O(1); storage equals the enum tag type.

## Validation
```sh
zig build test-validated-bit-flags
```
Compiler validation remains pending.
