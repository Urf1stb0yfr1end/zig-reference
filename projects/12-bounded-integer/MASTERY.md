# Mastery: Bounded Integer

## Mental model

A bounded integer represents a domain value, not merely a machine integer. The compile-time minimum and maximum define the set of valid runtime values.

## Invariant

`minimum <= value <= maximum` after every successful public operation.

## Ownership

The wrapper owns one scalar value. It allocates nothing and borrows nothing.

## Failure

Construction and mutation return `error.OutOfRange`. Failed mutation leaves the previous value unchanged.

## C pain

Raw integer fields permit impossible values throughout the system. Range checks become duplicated, inconsistent, or absent at later call sites.

## Zig lesson

Validate at ingress, preserve the invariant in the type, and let downstream code accept the stronger value.

## What Zig cannot decide

A numerical range does not capture every semantic rule. Some domains have gaps, relational constraints, or state-dependent validity.

## Readiness questions

1. Why are inclusive boundaries part of the public contract?
2. When should a range be compile-time versus runtime configuration?
3. How would you compose this with checked casting from an external field width?
