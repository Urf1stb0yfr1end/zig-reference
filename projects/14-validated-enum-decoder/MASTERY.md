# Mastery: Validated Enum Decoder

## Mental model

An enum is trusted program state. An integer from a file, device, network packet, or foreign API is not. Decoding is the border crossing.

## Invariant

Every returned value names a field declared by the target enum.

## Failure

An unknown integer returns `error.InvalidEnumValue`. No state exists to mutate.

## Why this matters

Once decoding succeeds, downstream switches can remain exhaustive and do not need a default branch for impossible tags.

## What Zig still cannot decide

The language cannot determine whether the chosen enum matches the external specification or whether unknown values should be rejected, preserved, or negotiated.

## Readiness questions

- Why is a cast not validation?
- Where should decoding occur?
- When should unknown values remain forward-compatible data instead of errors?
