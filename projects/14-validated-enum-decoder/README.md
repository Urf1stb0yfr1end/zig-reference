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

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
