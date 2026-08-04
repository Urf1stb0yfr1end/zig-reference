# Validated Enum Decoder: Integration Contract

## Purpose
Validate integer-backed external tags before they enter trusted enum-typed state.

## Public surface
- `decodeEnum(comptime E: type, raw: std.meta.Tag(E)) error{InvalidEnumValue}!E`
- `isValidEnumValue(comptime E: type, raw: std.meta.Tag(E)) bool`

## Import and location
- Implementation: `projects/14-validated-enum-decoder/src/validated_enum_decoder.zig`
- Root symbols: `decodeEnum`, `isValidEnumValue`

## Inputs and outputs
`raw` is copied. Successful output is a copied enum value. No allocation, borrowing, cleanup, or invalidation exists.

## Invariant
Every successful result corresponds to a declared field of `E`.

## Failure behavior
Unknown tags return `error.InvalidEnumValue`; there are no partial effects.

## Dependencies
No repository dependencies. Uses `std.meta` and `std.testing`.

## Expected dependents
Binary parsers, protocol decoders, firmware tables, device registers, FFI adapters, configuration decoders, and command dispatchers.

## Compatibility
Zig 0.14.0 target. Hosted and freestanding suitable when the used standard metadata helpers are available. Thread-safe and allocation-free.

## Complexity
Time is proportional to the enum conversion implementation; space is O(1).

## Validation
```sh
zig build test-validated-enum-decoder
```
Compiler validation remains pending.
