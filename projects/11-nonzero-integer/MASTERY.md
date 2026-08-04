# Mastery: Nonzero Integer

## Mental model

Construction is a proof boundary. Once `NonZeroInteger(T)` exists, dependent code no longer needs to ask whether its value is zero.

## Invariant

`value != 0` for every successfully constructed instance.

## Ownership

The wrapper owns one scalar integer. It allocates nothing and borrows nothing.

## Failure

`init(0)` returns `error.ZeroNotAllowed`. No invalid instance is returned.

## C pain

A comment such as “must not be zero” does not travel with a raw integer. Every caller must remember the rule, and zero may acquire several unrelated sentinel meanings.

## Zig lesson

Convert a repeated precondition into a reusable type-level contract.

## What Zig cannot decide

Nonzero does not imply uniqueness, validity, positivity, or authorization. Additional domain constraints require additional validated types.

## Readiness questions

1. Why is an optional nonzero value different from a raw integer using zero as absence?
2. Which APIs become simpler once zero is unrepresentable?
3. When should a nonzero wrapper remain private to a subsystem?
