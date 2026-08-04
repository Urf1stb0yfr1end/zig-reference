# Explicit State Machine Mastery

## Mental model and representation

The instance contains one `State`. Its compile-time `transition(State, Event) ?State` policy is the only authority for a next state: `null` means the pair is illegal.

## Invariants, ownership, and lifetime

`current` is always a valid `State`, and only successful `apply` assigns it. State and events are copied; the module allocates and borrows nothing. Resource-owning state values require a separate explicit cleanup design.

## Failure behavior and atomicity

`canApply` queries policy without mutation. `apply` computes the optional next state first, returns `error.InvalidTransition` on `null`, and preserves `current` on failure. Side effects inside a caller's transition policy are outside this guarantee and should be avoided.

## Complexity, edge cases, and tests

Storage is O(sizeof(State)); operation cost is the transition function's cost. Terminal behavior is represented by returning `null` for every event. Tests cover a valid sequence, invalid-transition preservation, and terminal-state rejection.

## Adaptation and exercises

Add transition logging outside the policy after success. Model guarded transitions by putting deterministic guard data in `State` or by using a higher orchestration layer. Prove every state/event pair is deliberately accepted or rejected.

Readiness questions: Where is policy defined? Which effects are failure-atomic? How is terminality encoded? Extensions must preserve single-policy authority and assignment-after-validation.
