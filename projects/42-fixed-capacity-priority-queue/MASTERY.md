# Mastering Fixed Capacity Priority Queue

## Mental model

Order a bounded set of values without allocation while preserving insertion order for equal priorities. The representation has a fixed bound, performs no hidden allocation, owns only inline metadata, and is single-threaded unless the caller synchronizes all access.

## Invariants and reasoning

Successful operations preserve representation bounds. Errors `Full, Empty, SequenceOverflow` leave state unchanged. Returned values are copied unless the API returns a documented pointer or slice; such borrows end when their backing caller-owned storage ends and are invalidated by the mutations named in `DETAILS.md`.

## C comparison

A direct C implementation is appealing because arrays and pointers expose the mechanism cheaply. The hard part is keeping initialization, overflow, membership, ownership, and cleanup conventions synchronized across callers. Zig exposes error unions, slices, optionals, and compile-time capacity, but the programmer still chooses capacity, lifetime, synchronization, and element cleanup.

## Exercises

1. Trace the empty, full, and first successful mutation.
2. Prove that each failure path leaves observable state unchanged.
3. Identify every borrow invalidated by reset or mutation.
4. Design a dependent module without adding hidden allocation.
