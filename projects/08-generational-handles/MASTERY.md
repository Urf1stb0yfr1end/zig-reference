# Generational Handles Mastery

## Mental model and representation

A handle is not a pointer. It is a claim that slot `index` is occupied in generation `generation`. Each inline slot stores optional `T` data and its current `u32` generation; the table stores an occupied count.

## Invariants, ownership, and lifetime

The count equals occupied slots. A valid handle has an in-range index, an occupied slot, and an equal generation. The table owns copied `T` values but performs no element cleanup. Pointers returned by `get` borrow a slot and expire on removal, table movement, or table destruction.

## Failure and invalidation

A full insert returns `error.Full` without mutation. Invalid or stale lookup/removal returns `null` without mutation. Successful removal copies out `T`, empties the slot, and advances its generation; every older handle for that slot becomes stale. Generation arithmetic wraps, so a sufficiently old handle can theoretically become equal again after `2^32` removals of one slot.

## Complexity and edge cases

Lookup and removal are O(1); insertion scans O(capacity). A zero-capacity table is valid and always full. Tests cover insertion, retrieval, stale rejection, invalid removal, full capacity, and zero capacity.

## Adaptation and exercises

Consider a free-list if insertion scans are too costly. Consider a wider generation or retirement-on-wrap policy when stale handles may survive billions of reuse cycles. Add a resource-owning `T` only with an explicit caller cleanup protocol.

Readiness questions: What invalidates a borrowed pointer? Why does index checking alone fail? What happens at generation wrap? When extending the module, preserve count/occupancy agreement and failure atomicity.
