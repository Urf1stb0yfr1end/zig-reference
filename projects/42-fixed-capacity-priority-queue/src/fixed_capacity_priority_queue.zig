const std = @import("std");
const vector = @import("fixed-capacity-vector");

/// Stable bounded min-priority queue. `lessThan(a,b)` must define a strict order;
/// values equivalent under it leave in insertion order.
pub fn FixedPriorityQueue(comptime T: type, comptime capacity: usize, comptime lessThan: fn (T, T) bool) type {
    const Entry = struct { value: T, sequence: usize };
    const Storage = vector.FixedVector(Entry, capacity);
    return struct {
        const Self = @This();
        pub const Error = error{ Full, Empty, SequenceOverflow };
        entries: Storage = Storage.init(),
        next_sequence: usize = 0,

        fn before(a: Entry, b: Entry) bool {
            if (lessThan(a.value, b.value)) return true;
            if (lessThan(b.value, a.value)) return false;
            return a.sequence < b.sequence;
        }
        pub fn init() Self {
            return .{};
        }
        pub fn count(self: *const Self) usize {
            return self.entries.count();
        }
        pub fn peek(self: *const Self) ?*const T {
            if (self.entries.count() == 0) return null;
            return &self.entries.constItems()[0].value;
        }
        pub fn insert(self: *Self, value: T) Error!void {
            if (self.entries.isFull()) return error.Full;
            if (self.next_sequence == std.math.maxInt(usize)) return error.SequenceOverflow;
            self.entries.append(.{ .value = value, .sequence = self.next_sequence }) catch return error.Full;
            self.next_sequence += 1;
            var child = self.entries.count() - 1;
            while (child > 0) {
                const parent = (child - 1) / 2;
                if (!before(self.entries.items()[child], self.entries.items()[parent])) break;
                std.mem.swap(Entry, &self.entries.items()[child], &self.entries.items()[parent]);
                child = parent;
            }
        }
        pub fn remove(self: *Self) Error!T {
            if (self.entries.count() == 0) return error.Empty;
            const result = self.entries.items()[0].value;
            const last = self.entries.pop() catch unreachable;
            if (self.entries.count() != 0) {
                self.entries.items()[0] = last;
                var parent: usize = 0;
                while (true) {
                    const left = parent * 2 + 1;
                    if (left >= self.entries.count()) break;
                    const right = left + 1;
                    var child = left;
                    if (right < self.entries.count() and before(self.entries.items()[right], self.entries.items()[left])) child = right;
                    if (!before(self.entries.items()[child], self.entries.items()[parent])) break;
                    std.mem.swap(Entry, &self.entries.items()[child], &self.entries.items()[parent]);
                    parent = child;
                }
            }
            return result;
        }
        pub fn clear(self: *Self) void {
            self.entries.clear();
            self.next_sequence = 0;
        }
    };
}

fn ascending(a: u8, b: u8) bool {
    return a < b;
}
test "ordered stable removal, full failure, empty, and zero capacity" {
    var queue = FixedPriorityQueue(u8, 4, ascending).init();
    try queue.insert(3);
    try queue.insert(1);
    try queue.insert(2);
    try queue.insert(1);
    try std.testing.expectError(error.Full, queue.insert(0));
    try std.testing.expectEqual(@as(u8, 1), try queue.remove());
    try std.testing.expectEqual(@as(u8, 1), try queue.remove());
    try std.testing.expectEqual(@as(u8, 2), try queue.remove());
    try std.testing.expectEqual(@as(u8, 3), try queue.remove());
    try std.testing.expectError(error.Empty, queue.remove());
    var zero = FixedPriorityQueue(u8, 0, ascending).init();
    try std.testing.expectError(error.Full, zero.insert(1));
}
