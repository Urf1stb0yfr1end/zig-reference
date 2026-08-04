# Validated Bit Flags

A typed wrapper for enum-named bit masks that rejects storage bits with no declared meaning.

## C pain

Raw masks and macros permit reserved bits, combine unrelated domains, and scatter validation across callers.

## Zig form

```zig
const Permission = enum(u8) { read = 1, write = 2, execute = 4 };
const Permissions = ValidatedBitFlags(Permission);
var flags = try Permissions.fromRaw(raw);
flags.insert(.write);
```

The enum names the valid individual masks. `fromRaw` rejects unknown bits.

## Reuse

Permissions, VMX controls, page-table flags, device registers, protocol capabilities, and configuration features.

## Test

```sh
zig build test-validated-bit-flags
```

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
