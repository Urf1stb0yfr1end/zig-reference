const std = @import("std");
const machines = @import("state-machine");
const bounded = @import("bounded-integer");

pub const State = enum { idle, running, stopped };
pub const Event = enum { start, stop };
fn transition(state: State, event: Event) ?State {
    return switch (state) {
        .idle => if (event == .start) .running else null,
        .running => if (event == .stop) .stopped else null,
        .stopped => null,
    };
}
pub const Machine = machines.StateMachine(State, Event, transition);
pub const RetryBudget = bounded.BoundedInteger(u8, 0, 3);

test "bounded policy value accompanies failure-atomic lifecycle" {
    var machine = Machine.init(.idle);
    const budget = try RetryBudget.init(3);
    try std.testing.expectEqual(@as(u8, 3), budget.get());
    try std.testing.expectError(error.InvalidTransition, machine.apply(.stop));
    try std.testing.expectEqual(State.idle, machine.state());
    _ = try machine.apply(.start);
}
