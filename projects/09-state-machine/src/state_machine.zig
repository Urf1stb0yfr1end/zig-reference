const std = @import("std");

/// A generic explicit state machine whose transition policy is supplied at
/// compile time. Failed transitions leave the current state unchanged.
pub fn StateMachine(
    comptime State: type,
    comptime Event: type,
    comptime transition: fn (State, Event) ?State,
) type {
    return struct {
        const Self = @This();

        pub const Error = error{InvalidTransition};

        current: State,

        pub fn init(initial: State) Self {
            return .{ .current = initial };
        }

        pub fn state(self: *const Self) State {
            return self.current;
        }

        pub fn canApply(self: *const Self, event: Event) bool {
            return transition(self.current, event) != null;
        }

        pub fn apply(self: *Self, event: Event) Error!State {
            const next = transition(self.current, event) orelse return error.InvalidTransition;
            self.current = next;
            return next;
        }
    };
}

const VmState = enum { created, configured, runnable, running, paused, stopped, destroyed };
const VmEvent = enum { configure, ready, start, pause, resume, stop, destroy };

fn vmTransition(state: VmState, event: VmEvent) ?VmState {
    return switch (state) {
        .created => if (event == .configure) .configured else null,
        .configured => if (event == .ready) .runnable else if (event == .destroy) .destroyed else null,
        .runnable => if (event == .start) .running else if (event == .destroy) .destroyed else null,
        .running => if (event == .pause) .paused else if (event == .stop) .stopped else null,
        .paused => if (event == .resume) .running else if (event == .stop) .stopped else null,
        .stopped => if (event == .destroy) .destroyed else null,
        .destroyed => null,
    };
}

test "valid transitions advance state" {
    var machine = StateMachine(VmState, VmEvent, vmTransition).init(.created);

    try std.testing.expectEqual(VmState.configured, try machine.apply(.configure));
    try std.testing.expectEqual(VmState.runnable, try machine.apply(.ready));
    try std.testing.expectEqual(VmState.running, try machine.apply(.start));
    try std.testing.expectEqual(VmState.paused, try machine.apply(.pause));
    try std.testing.expectEqual(VmState.running, try machine.apply(.resume));
}

test "invalid transitions preserve state" {
    var machine = StateMachine(VmState, VmEvent, vmTransition).init(.created);
    try std.testing.expect(!machine.canApply(.start));
    try std.testing.expectError(error.InvalidTransition, machine.apply(.start));
    try std.testing.expectEqual(VmState.created, machine.state());
}

test "terminal state rejects every event" {
    var machine = StateMachine(VmState, VmEvent, vmTransition).init(.stopped);
    _ = try machine.apply(.destroy);
    try std.testing.expectError(error.InvalidTransition, machine.apply(.start));
    try std.testing.expectEqual(VmState.destroyed, machine.state());
}
