# Mastery: Bounded User Memory Transfer Plan

## Mental model

Treat planning as validation followed by publication. `TransferPlan(capacity).plan` constructs a local value, so an error never exposes the fragments accumulated before the error. A successful plan is an owned sequence of page-confined fragments; copying is a later concern.

## Invariants

- The checked half-open request range prevents wrapping.
- Zero length is valid, produces no segments, and invokes no query.
- Each nonempty segment stays within one 4 KiB page.
- Segment virtual starts and request offsets are contiguous and strictly ordered.
- Segment lengths sum to the requested length, so every byte appears exactly once.
- Physical page offsets equal virtual page offsets; physical pages need not be contiguous.
- Every page is user-accessible and has the permission required by the declared direction.
- Capacity is checked for the complete page count before the first query.

## Reasoning about direction

`read_from_user` means the eventual consumer reads user memory, so the mapping must be readable. `write_to_user` means the eventual consumer writes user memory, so the mapping must be writable. User accessibility is required in both cases.

## Exercises

1. Prove that advancing by `fragment_length` cannot leave a gap.
2. Adapt an Sv39 walker result into `PageResolution` without putting walker policy in this module.
3. Decide whether a caller should merge physically adjacent segments after validation; explain why this planner deliberately retains page boundaries.
