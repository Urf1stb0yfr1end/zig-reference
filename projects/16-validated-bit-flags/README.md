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
