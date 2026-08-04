# Checked Integer Cast

A single explicit boundary for integer conversion.

C makes casts compact, but narrowing, signedness changes, and sentinel conversions can silently change meaning. This module asks one question before conversion: **is the source value representable by the destination integer type?**

```zig
const checkedIntegerCast = @import("src/checked_integer_cast.zig").checkedIntegerCast;
const port = try checkedIntegerCast(u16, parsed_value);
```

Successful conversion returns the destination value. An unrepresentable value returns `error.OutOfRange` without truncation or wrapping.

## Why it matters

Later modules can use this boundary for packet lengths, page counts, offsets, device fields, protocol identifiers, and foreign integer values instead of scattering ad hoc comparisons.

## Test

```sh
zig build test-checked-integer-cast
```
