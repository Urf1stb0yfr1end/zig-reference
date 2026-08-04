# Validated Enum Decoder

Decode external integer tags into declared Zig enum values without admitting undeclared states.

## C pain

Casting an arbitrary integer to an enum can smuggle invalid protocol, file-format, register, or FFI values into trusted code.

## Zig form

`decodeEnum` returns either a declared enum value or `error.InvalidEnumValue`. `isValidEnumValue` offers a predicate when branching is preferable.

```zig
const Kind = enum(u8) { request = 1, response = 2 };
const kind = try decodeEnum(Kind, raw_tag);
```

## Reuse

This belongs at binary, protocol, firmware, device-register, and foreign-function boundaries.

## Test

```sh
zig build test-validated-enum-decoder
```
