# Validated ASCII Byte Details

## Purpose
Validate a byte as ASCII and retain that range invariant.

## Public surface
`AsciiByte`, `init`, `get`, `isDigit`, `isAlphabetic`.

## Inputs and outputs
A copied `u8`; output is an owned value containing `u7`.

## Invariants
Stored value is at most `0x7f`.

## Failure behavior
`init` returns `error.NotAscii`; failure creates no value.

## Ownership and cleanup
No allocation or borrowing.

## Dependencies
None.

## Expected dependents
ASCII lexers, HTTP fields, command parsers, identifiers, firmware text boundaries.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-validated-ascii-byte`; compiler validation pending.