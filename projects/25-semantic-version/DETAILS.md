# Semantic Version Details

## Purpose
Represent and compare numeric major, minor, and patch versions.

## Public surface
`SemanticVersion`, `compare`, `isCompatibleWith`.

## Inputs and outputs
Copied `u32` components and copied ordering/Boolean results.

## Invariants
Comparison is lexicographic by component. Compatibility currently requires equal major and a version not older than the requirement.

## Failure behavior
No runtime errors.

## Ownership and cleanup
No borrowing, allocation, or cleanup.

## Dependencies
Zig standard ordering helpers.

## Expected dependents
Format readers, protocol negotiation, schema migration, module metadata, plugin systems.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-semantic-version`; compiler validation pending.