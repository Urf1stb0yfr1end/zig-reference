# Mastery: Wrapping Sequence Number

## Mental model
The value lives on a modulo ring. Reaching the largest representable value and advancing produces zero by policy.

## Invariants
- the backing type is unsigned;
- every value of that type is valid;
- `next` and `advance` use wrapping arithmetic;
- `distanceForward` measures modulo-forward distance.

## C pain
Ordinary `+` often makes rollover an unstated assumption. Signed overflow may be undefined; unsigned rollover may be legal but semantically unexplained.

## What Zig makes visible
The `+%` and `-%` operators announce wrapping policy at the operation.

## Remaining danger
Modulo distance alone cannot determine ordering when values may be separated by more than half the sequence space.