const std = @import("std");
const event_trace = @import("bounded-deterministic-event-trace");

pub const capacity = 4096;
pub const Trace = event_trace.BoundedDeterministicEventTrace(capacity);
pub const expected_event_count = 9;

pub const Domain = struct {
    pub const runtime: u16 = 1;
    pub const initialization: u16 = 2;
    pub const scheduler: u16 = 3;
    pub const allocation: u16 = 4;
};
pub const Kind = struct {
    pub const began: u16 = 1;
    pub const ready: u16 = 2;
    pub const sealed: u16 = 3;
    pub const selected: u16 = 4;
    pub const yielded: u16 = 5;
    pub const halted: u16 = 6;
};

pub fn canonicalTrace() Trace.AppendError!Trace {
    var trace = Trace.init();
    _ = try trace.append(.{ .domain = Domain.runtime, .kind = Kind.began, .subject = 0, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.initialization, .kind = Kind.ready, .subject = 1, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.initialization, .kind = Kind.ready, .subject = 2, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.initialization, .kind = Kind.ready, .subject = 3, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.allocation, .kind = Kind.sealed, .subject = 0, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.scheduler, .kind = Kind.ready, .subject = 0, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.scheduler, .kind = Kind.selected, .subject = 0, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.scheduler, .kind = Kind.yielded, .subject = 0, .argument_a = 0, .argument_b = 0 });
    _ = try trace.append(.{ .domain = Domain.runtime, .kind = Kind.halted, .subject = 0, .argument_a = 0, .argument_b = 0 });
    return trace;
}

pub fn main() !void {
    const trace = try canonicalTrace();
    var body: [2048]u8 = undefined;
    const normalized = try trace.render(&body);
    var out = std.io.getStdOut().writer();
    try out.print("MORPHIC EVENT TRACE\nArchitecture: normalized\nCapacity: {d} events\nRecorded: {d} events\n", .{ Trace.capacity, trace.count() });
    const header = "MORPHIC EVENT TRACE\ncount=0000000000000009\ncapacity=0000000000004096\n";
    try out.writeAll(normalized[header.len..]);
}

test "Morphic trace is repeatable and normalized" {
    const a = try canonicalTrace();
    const b = try canonicalTrace();
    try std.testing.expect(a.eql(&b));
    try std.testing.expectEqual(@as(usize, capacity), Trace.capacity);
    try std.testing.expectEqual(@as(usize, expected_event_count), a.count());
    try std.testing.expectEqual(@as(u64, 0), a.events()[0].sequence);
    try std.testing.expectEqual(@as(u64, expected_event_count - 1), a.events()[expected_event_count - 1].sequence);
    for (a.events(), b.events()) |left, right| try std.testing.expectEqualDeep(left, right);
    var first: [2048]u8 = undefined;
    var second: [2048]u8 = undefined;
    try std.testing.expectEqualStrings(try a.render(&first), try b.render(&second));
    comptime {
        if (@hasField(event_trace.NormalizedEvent, "timestamp") or @hasField(event_trace.NormalizedEvent, "pointer")) @compileError("normalized event contains host-derived data");
    }
}
