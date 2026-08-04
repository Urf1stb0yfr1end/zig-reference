# Explicit State Machine

This module centralizes legal state/event pairs in one compile-time transition function. `apply` changes the current state only when that policy returns a next state.

C enums and switches are direct and efficient, but lifecycle checks often become duplicated between callers while several booleans admit contradictory combinations. `StateMachine` makes the policy dependency and invalid-transition error visible. Zig still cannot decide which transitions are semantically correct, roll back side effects performed outside the machine, or synchronize shared instances.

```zig
const StateMachine = @import("src/state_machine.zig").StateMachine;
const Machine = StateMachine(State, Event, transition);
var machine = Machine.init(.created);
_ = try machine.apply(.start);
```

Protocol handshakes and VM, vCPU, and device lifecycles can reuse this transition boundary.
