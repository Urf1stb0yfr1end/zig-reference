const std = @import("std");

/// Architecture-neutral logical event. Canonical interchange is `render`, not its bytes.
pub const NormalizedEvent = extern struct {
    sequence: u64,
    domain: u16,
    kind: u16,
    subject: u32,
    argument_a: u64,
    argument_b: u64,
};

comptime {
    if (@sizeOf(NormalizedEvent) != 32) @compileError("NormalizedEvent must be exactly 32 bytes");
}

pub const EventInput = struct {
    domain: u16,
    kind: u16,
    subject: u32,
    argument_a: u64,
    argument_b: u64,
};

pub fn BoundedDeterministicEventTrace(comptime capacity_value: usize) type {
    if (capacity_value == 0) @compileError("ZIGREF-EVENT-TRACE-INVALID-CAPACITY: capacity must be greater than zero");
    return struct {
        const Self = @This();
        pub const capacity = capacity_value;
        pub const AppendError = error{ TraceFull, SequenceExhausted };
        pub const RenderError = error{OutputTooSmall};

        storage: [capacity_value]NormalizedEvent = undefined,
        count_value: usize = 0,
        next_sequence: u64 = 0,

        pub fn init() Self {
            return .{};
        }
        pub fn count(self: *const Self) usize {
            return self.count_value;
        }
        pub fn remainingCapacity(self: *const Self) usize {
            return capacity_value - self.count_value;
        }
        pub fn isEmpty(self: *const Self) bool {
            return self.count_value == 0;
        }
        pub fn isFull(self: *const Self) bool {
            return self.count_value == capacity_value;
        }
        pub fn events(self: *const Self) []const NormalizedEvent {
            return self.storage[0..self.count_value];
        }

        pub fn append(self: *Self, input: EventInput) AppendError!u64 {
            if (self.count_value == capacity_value) return error.TraceFull;
            if (self.next_sequence == std.math.maxInt(u64)) return error.SequenceExhausted;
            const assigned = self.next_sequence;
            self.storage[self.count_value] = .{ .sequence = assigned, .domain = input.domain, .kind = input.kind, .subject = input.subject, .argument_a = input.argument_a, .argument_b = input.argument_b };
            self.count_value += 1;
            self.next_sequence += 1;
            return assigned;
        }

        pub fn reset(self: *Self) void {
            self.count_value = 0;
            self.next_sequence = 0;
        }

        pub fn eql(self: *const Self, other: *const Self) bool {
            if (self.count_value != other.count_value) return false;
            for (self.events(), other.events()) |a, b| {
                if (a.sequence != b.sequence or a.domain != b.domain or a.kind != b.kind or a.subject != b.subject or a.argument_a != b.argument_a or a.argument_b != b.argument_b) return false;
            }
            return true;
        }

        /// Renders explicit fields; never dumps native representation.
        pub fn render(self: *const Self, output: []u8) RenderError![]const u8 {
            var stream = std.io.fixedBufferStream(output);
            const writer = stream.writer();
            writer.print("MORPHIC EVENT TRACE\ncount={d:0>16}\ncapacity={d:0>16}\n", .{ self.count_value, capacity_value }) catch return error.OutputTooSmall;
            for (self.events()) |event| writer.print("{d:0>16} domain={x:0>4} kind={x:0>4} subject={x:0>8} argument_a={x:0>16} argument_b={x:0>16}\n", .{ event.sequence, event.domain, event.kind, event.subject, event.argument_a, event.argument_b }) catch return error.OutputTooSmall;
            return stream.getWritten();
        }
    };
}

const sample = EventInput{ .domain = 1, .kind = 2, .subject = 3, .argument_a = 4, .argument_b = 5 };

test "empty, append, ordering, exact fields, capacity, and reset" {
    var trace = BoundedDeterministicEventTrace(2).init();
    try std.testing.expect(trace.isEmpty());
    try std.testing.expectEqual(@as(usize, 2), trace.remainingCapacity());
    try std.testing.expectEqual(@as(u64, 0), try trace.append(sample));
    try std.testing.expectEqual(@as(u64, 1), try trace.append(.{ .domain = 6, .kind = 7, .subject = 8, .argument_a = 9, .argument_b = 10 }));
    try std.testing.expect(trace.isFull());
    try std.testing.expectEqualDeep(NormalizedEvent{ .sequence = 0, .domain = 1, .kind = 2, .subject = 3, .argument_a = 4, .argument_b = 5 }, trace.events()[0]);
    const before = trace;
    try std.testing.expectError(error.TraceFull, trace.append(sample));
    try std.testing.expectEqualDeep(before, trace);
    trace.reset();
    try std.testing.expect(trace.isEmpty());
    try std.testing.expectEqual(@as(u64, 0), try trace.append(sample));
}

test "identical inputs compare and render identically and rendering is failure atomic" {
    var a = BoundedDeterministicEventTrace(2).init();
    var b = BoundedDeterministicEventTrace(2).init();
    _ = try a.append(sample);
    _ = try b.append(sample);
    try std.testing.expect(a.eql(&b));
    var out_a: [512]u8 = undefined;
    var out_b: [512]u8 = undefined;
    const text_a = try a.render(&out_a);
    const text_b = try b.render(&out_b);
    try std.testing.expectEqualStrings(text_a, text_b);
    const before = a;
    var tiny: [1]u8 = undefined;
    try std.testing.expectError(error.OutputTooSmall, a.render(&tiny));
    try std.testing.expectEqualDeep(before, a);
}

test "sequence exhaustion is failure atomic through private state" {
    var trace = BoundedDeterministicEventTrace(1).init();
    trace.next_sequence = std.math.maxInt(u64);
    const before = trace;
    try std.testing.expectError(error.SequenceExhausted, trace.append(sample));
    try std.testing.expectEqualDeep(before, trace);
}

test "normalized event is 32 bytes" {
    try std.testing.expectEqual(@as(usize, 32), @sizeOf(NormalizedEvent));
}
