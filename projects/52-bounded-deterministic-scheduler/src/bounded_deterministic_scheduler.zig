const priority_queue = @import("fixed-capacity-priority-queue");

pub const Task = struct {
    id: u32,
    ready_at: u64,
    priority: u32,
};

fn before(a: Task, b: Task) bool {
    if (a.ready_at != b.ready_at) return a.ready_at < b.ready_at;
    return a.priority < b.priority;
}

pub fn BoundedDeterministicScheduler(comptime capacity: usize) type {
    if (capacity == 0) @compileError("capacity must be greater than zero");
    return struct {
        const Self = @This();
        const Queue = priority_queue.FixedPriorityQueue(Task, capacity, before);

        queue: Queue,
        now_value: u64,

        pub const ScheduleError = Queue.Error;
        // The inherited insert contract includes error.SequenceOverflow.
        pub const AdvanceError = error{TimeReversed};

        pub fn init(initial_time: u64) Self {
            return .{ .queue = Queue.init(), .now_value = initial_time };
        }

        pub fn now(self: *const Self) u64 { return self.now_value; }
        pub fn count(self: *const Self) usize { return self.queue.count(); }

        pub fn schedule(self: *Self, task: Task) ScheduleError!void {
            try self.queue.insert(task);
        }

        pub fn advanceTo(self: *Self, new_time: u64) AdvanceError!void {
            if (new_time < self.now_value) return error.TimeReversed;
            self.now_value = new_time;
        }

        pub fn nextReady(self: *Self) ?Task {
            const next = self.queue.peek() orelse return null;
            if (next.ready_at > self.now_value) return null;
            return self.queue.remove() catch unreachable;
        }

        pub fn nextWakeTime(self: *const Self) ?u64 {
            const next = self.queue.peek() orelse return null;
            return next.ready_at;
        }

        pub fn reset(self: *Self, initial_time: u64) void {
            self.queue.clear();
            self.now_value = initial_time;
        }
    };
}

test "orders by time priority and stable insertion" {
    var scheduler = BoundedDeterministicScheduler(4).init(10);
    try scheduler.schedule(.{ .id = 1, .ready_at = 12, .priority = 2 });
    try scheduler.schedule(.{ .id = 2, .ready_at = 12, .priority = 1 });
    try scheduler.schedule(.{ .id = 3, .ready_at = 12, .priority = 1 });
    try std.testing.expectEqual(@as(?Task, null), scheduler.nextReady());
    try scheduler.advanceTo(12);
    try std.testing.expectEqual(@as(u32, 2), scheduler.nextReady().?.id);
    try std.testing.expectEqual(@as(u32, 3), scheduler.nextReady().?.id);
    try std.testing.expectEqual(@as(u32, 1), scheduler.nextReady().?.id);
}

test "full and reverse time are failure atomic" {
    var scheduler = BoundedDeterministicScheduler(1).init(5);
    try scheduler.schedule(.{ .id = 1, .ready_at = 5, .priority = 0 });
    try std.testing.expectError(error.Full, scheduler.schedule(.{ .id = 2, .ready_at = 5, .priority = 0 }));
    try std.testing.expectEqual(@as(usize, 1), scheduler.count());
    try std.testing.expectError(error.TimeReversed, scheduler.advanceTo(4));
    try std.testing.expectEqual(@as(u64, 5), scheduler.now());
}

const std = @import("std");
