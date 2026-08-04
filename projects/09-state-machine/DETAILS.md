# State Machine Integration Contract

## Purpose
Represent legal transitions in one compile-time policy and reject illegal events without changing state.

## C pain addressed
Enums and switches are attractive, but duplicated transition checks and independent flags can drift into contradictory lifecycle states.

## Public surface
`StateMachine(State, Event, transition) type`; returned methods are `init`, `state`, `canApply`, and `apply`. `apply` returns `error{InvalidTransition}!State`.

## Import and location
Implementation, tests, and entrypoint: `projects/09-state-machine/src/state_machine.zig`. Import `StateMachine` from that file.

## Inputs
`State`, `Event`, and `transition: fn (State, Event) ?State` are compile-time inputs. Initial states and events are copied values.

## Outputs
`state` and successful `apply` return copied `State` values. No output requires cleanup.

## State and invariants
The instance owns one current state. Only a non-null policy result replaces it.

## Failure behavior
An illegal pair returns `error.InvalidTransition`; state is unchanged. Side effects inside the supplied policy are not rolled back.

## Ownership and cleanup
No allocation, borrowing, or module cleanup. Callers remain responsible for resources embedded in `State`.

## Dependencies
No repository dependencies. It uses `std.testing` only in tests.

## Expected dependents
Lifecycle controllers for VMs, vCPUs, devices, protocols, and transactions.

## Composition examples
`const Machine = @import("src/state_machine.zig").StateMachine(State, Event, transition);` A controller can perform domain effects only after a successful transition.

## Compatibility and adaptation
Targets Zig 0.14.0; hosted and freestanding suitable; no allocator, endian, libc, OS, or architecture dependency. No synchronization: callers synchronize shared mutation. No stable C ABI is promised.

## Complexity and limits
Space is O(sizeof(State)); call cost is determined by `transition`. One concrete type is generated per compile-time tuple.

## Validation
Run `zig build test-state-machine` or `zig build test`. Compiler validation is currently unverified because Zig is unavailable in this environment.

## Source map
Source/tests: `projects/09-state-machine/src/state_machine.zig`; lesson: `README.md`; reasoning: `MASTERY.md`; machine contract: `details.json`. Known limitation: external side effects are outside failure atomicity. Replace with project-specific transactional orchestration when effects need rollback.
