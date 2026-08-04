# Tagged Result Details

## Purpose
Represent exclusive structured success and failure outcomes.

## Public surface
`TaggedResult(Success, Failure)`, variants `success` and `failure`, plus `isSuccess`, `successValue`, and `failureValue`.

## Inputs and outputs
Compile-time payload types and copied or value-semantic payloads according to those types.

## Invariants
Exactly one variant is active and only its payload is accessible.

## Failure behavior
No runtime errors. Empty accessor results are represented with optionals.

## Ownership and cleanup
The union owns its payload value; cleanup depends on payload types.

## Dependencies
None.

## Expected dependents
Authorization decisions, parser outcomes, instruction emulation, negotiation, validation reports.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-tagged-result`; compiler validation pending.