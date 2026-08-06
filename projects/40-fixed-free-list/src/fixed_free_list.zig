const std = @import("std");

/// Deterministic O(1) allocator for integer indices in `[0, capacity)`.
pub fn FixedFreeList(comptime capacity: usize) type {
    return struct {
        const Self = @This();
        const sentinel = capacity;
        pub const Error = error{ Full, OutOfRange, DoubleFree };
        next: [capacity]usize = initializedLinks(),
        allocated: [capacity]bool = [_]bool{false} ** capacity,
        head: usize = if (capacity == 0) sentinel else 0,
        used: usize = 0,

        fn initializedLinks() [capacity]usize {
            var links: [capacity]usize = undefined;
            for (&links, 0..) |*link, i| link.* = if (i + 1 < capacity) i + 1 else sentinel;
            return links;
        }
        pub fn init() Self {
            return .{};
        }
        pub fn count(self: *const Self) usize {
            return self.used;
        }
        pub fn allocate(self: *Self) Error!usize {
            if (comptime capacity == 0) return error.Full;
            if (self.head == sentinel) return error.Full;
            const index = self.head;
            self.head = self.next[index];
            self.allocated[index] = true;
            self.used += 1;
            return index;
        }
        pub fn release(self: *Self, index: usize) Error!void {
            if (comptime capacity == 0) return error.OutOfRange;
            if (index >= capacity) return error.OutOfRange;
            if (!self.allocated[index]) return error.DoubleFree;
            self.allocated[index] = false;
            self.next[index] = self.head;
            self.head = index;
            self.used -= 1;
        }
        pub fn isAllocated(self: *const Self, index: usize) Error!bool {
            if (comptime capacity == 0) return error.OutOfRange;
            if (index >= capacity) return error.OutOfRange;
            return self.allocated[index];
        }
        pub fn reset(self: *Self) void {
            self.* = init();
        }
    };
}

test "exhaustion, deterministic reuse, invalid release, and zero capacity" {
    var list = FixedFreeList(2).init();
    try std.testing.expectEqual(@as(usize, 0), try list.allocate());
    const one = try list.allocate();
    try std.testing.expectError(error.Full, list.allocate());
    try list.release(one);
    try std.testing.expectError(error.DoubleFree, list.release(one));
    try std.testing.expectError(error.OutOfRange, list.release(2));
    try std.testing.expectEqual(one, try list.allocate());
    var zero = FixedFreeList(0).init();
    try std.testing.expectError(error.Full, zero.allocate());
}
