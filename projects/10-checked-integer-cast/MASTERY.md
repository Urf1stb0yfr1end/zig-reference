# Mastery: Checked Integer Cast

## Mental model

A cast is not merely syntax. It is a boundary between two sets of representable values. This module permits the conversion only when the source value belongs to the destination set.

## Invariant

Every returned value is exactly equal to the source value and representable by the destination integer type.

## Ownership

No allocation, storage, or borrowed lifetime is involved. The input and output are scalar values.

## Failure

`error.OutOfRange` means conversion would require truncation, sign loss, or reinterpretation. Failure has no side effects.

## C pain

C casts are concise enough that a narrowing conversion can hide in an assignment, macro, function call, or comparison. The resulting value may wrap or truncate while appearing intentional.

## Zig lesson

Keep the low-level conversion, but make range acceptance an explicit fallible operation.

## What Zig cannot decide

The module cannot decide whether conversion is semantically appropriate. A value may fit in `u16` and still be an invalid port, page count, or protocol field.

## Readiness questions

1. Can you explain why representability and semantic validity are separate checks?
2. Can you identify where signed-to-unsigned conversion becomes invalid?
3. Can you choose between checked, wrapping, saturating, and truncating policies deliberately?
