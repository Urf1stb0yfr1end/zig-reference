# Mastery: Tagged Result

## Mental model
Exactly one outcome is active, and the active payload matches it.

## Invariants
- success and failure cannot coexist;
- no detached status code can disagree with the payload;
- payload ownership follows the contained type.

## C pain
A return code plus output parameters permits success with uninitialized output, failure with partially meaningful output, and callers that forget to check the status.

## Zig answer
A tagged union stores mutually exclusive variants and exhaustive switching exposes every outcome.

## Remaining danger
Use an error union when the failure carries no domain payload or should participate in `try`. Tagged results are for explicit structured alternatives, not a replacement for every error.