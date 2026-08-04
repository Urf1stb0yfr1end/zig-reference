# Mastery: Unit-Safe Quantity

## Mental model
The unit tag is part of the concrete type. `Bytes` and `Pages` may both contain `usize`, but they are not interchangeable.

## Invariants
- arithmetic combines only the same quantity type;
- the scalar is copied and owned by the value;
- conversion between units must be explicit elsewhere.

## C pain
Bytes, elements, sectors, and pages commonly collapse into `size_t`, allowing dimensionally invalid calls that compile cleanly.

## Zig answer
Compile-time type generation makes the unit part of the function signature.

## Remaining danger
The generic arithmetic uses the scalar's ordinary overflow policy. Higher modules must choose checked, wrapping, or saturating arithmetic where appropriate.