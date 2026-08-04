# FourCC Code Details

## Purpose
Represent exact four-byte codes independently of integer layout.

## Public surface
`FourCC`, `init`, `fromString`, `asBytes`, `eql`.

## Inputs and outputs
Copied `[4]u8` or a borrowed four-byte slice copied into the value.

## Invariants
Exactly four ordered bytes are stored.

## Failure behavior
`fromString` returns `error.InvalidLength`; state is not created on failure.

## Ownership and cleanup
The value owns its four bytes. No allocator.

## Dependencies
None.

## Expected dependents
RIFF/WAV, AVI, PNG-like signature adapters, firmware and protocol dispatch.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-fourcc-code`; compiler validation pending.