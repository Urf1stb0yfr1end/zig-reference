# Nonzero Integer

A validated integer wrapper whose stored value can never be zero.

C APIs often reserve zero for “invalid,” “missing,” or “uninitialized,” but ordinary integer variables can still contain it. This module validates once at construction and returns `error.ZeroNotAllowed` when the invariant is not met.

```zig
const NonZeroInteger = @import("src/nonzero_integer.zig").NonZeroInteger;
const NonZeroPageCount = NonZeroInteger(usize);
const count = try NonZeroPageCount.init(raw_count);
```

## Reuse

Useful for divisors, nonempty counts, hardware queue sizes, generation values, nonzero identifiers, and protocol fields where zero is structurally forbidden.

## Test

```sh
zig build test-nonzero-integer
```
