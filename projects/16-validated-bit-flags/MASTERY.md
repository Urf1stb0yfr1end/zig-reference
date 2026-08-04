# Mastery: Validated Bit Flags

## Mental model

A bit mask is a compact set. The enum defines the vocabulary of valid members; the wrapper protects the boundary between arbitrary storage and that vocabulary.

## Invariants

- stored bits are a subset of the enum-derived allowed mask;
- insertion and removal affect only the named flag;
- `contains` tests the complete mask represented by a flag;
- `clear` restores the empty set.

## Failure

`fromRaw` returns `error.UnknownBits` before constructing state.

## What Zig still cannot decide

The programmer must ensure enum values are appropriate bit masks and decide whether combinations have higher-level semantic restrictions.

## Snowball value

Once flags are typed, page entries, device controls, protocol capabilities, and permission policies can all inherit the same validated representation.
