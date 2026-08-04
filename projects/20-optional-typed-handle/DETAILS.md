# Optional Typed Handle Details

## Purpose
Create domain-specific opaque handles and explicit optional absence.

## Public surface
`TypedHandle(Tag, Integer)`, `OptionalTypedHandle(Tag, Integer)`, `init`, and `value`.

## Inputs and outputs
The tag and integer type are compile-time inputs. Handles are copied values. Optional handles own no resources.

## Invariants
Different tags produce different concrete handle types. `null` is the only absent state.

## Failure behavior
No runtime errors.

## Ownership and cleanup
No allocation or cleanup. A handle does not own the resource it names.

## Dependencies
None.

## Expected dependents
Resource registries, APIs, configuration models, VM/device/timer references.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-optional-typed-handle`; compiler validation pending.