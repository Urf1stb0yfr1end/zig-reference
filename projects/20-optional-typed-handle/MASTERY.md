# Mastery: Optional Typed Handle

## Mental model
A handle identifies a resource domain and carries no ownership by itself. Optional absence is represented by `?Handle`, not by `0`, `-1`, or another sentinel.

## Invariants
- the compile-time tag determines the concrete handle type;
- the raw integer is copied, not borrowed;
- absence is structurally distinct from every valid handle value.

## C pain
Raw integers from unrelated tables are interchangeable, while sentinel values acquire several undocumented meanings.

## Zig answer
Compile-time type identity separates domains and optionals represent absence directly.

## Remaining danger
The handle alone does not prove that a resource is live. Pair it with a generational handle table where stale-reference rejection is required.