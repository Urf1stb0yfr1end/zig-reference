# Source Span Details

## Purpose
Represent a checked half-open byte span into source data.

## Public surface
`SourceSpan`, `init`, `len`, `isEmpty`, `slice`.

## Inputs and outputs
Copied byte offsets; `slice` returns a borrowed view into caller-owned source.

## Invariants
`start <= end`. Returned slices are valid only while the source buffer remains alive and unchanged.

## Failure behavior
`init` returns `InvalidOrder`; `slice` returns `OutOfBounds`. Failure changes no state.

## Ownership and cleanup
The span owns offsets and borrows source only during slicing.

## Dependencies
None.

## Expected dependents
Lexers, token streams, parser diagnostics, compilers, configuration validators.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-source-span`; compiler validation pending.