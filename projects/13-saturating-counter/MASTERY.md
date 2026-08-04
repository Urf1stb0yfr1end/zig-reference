# Mastery: Saturating Counter

## Mental model

Overflow behavior is a policy decision. This counter chooses clamping: addition approaches a configured ceiling, subtraction approaches zero, and neither operation wraps.

## Invariants

- `0 <= value <= maximum`
- addition never decreases the value;
- subtraction never increases the value;
- no operation wraps.

## Ownership

The wrapper owns one scalar unsigned integer and no external resources.

## Failure

Public operations do not return runtime errors. Inputs outside the logical capacity are absorbed by saturation.

## C pain

Counters often wrap because the integer type's arithmetic behavior became the accidental policy. A telemetry count can suddenly become zero; a retry count can reopen a supposedly closed path.

## Zig lesson

Use explicit saturating arithmetic when clamping is the intended meaning, rather than treating overflow as an incidental implementation detail.

## What Zig cannot decide

Saturation can hide persistent overload if callers never inspect `isSaturated()`. Some counters should instead return exhaustion or use a wider type.

## Readiness questions

1. When is saturation safer than checked failure?
2. When would wrapping be the correct policy?
3. What information is lost once a counter is saturated?
