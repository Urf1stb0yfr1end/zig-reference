const std = @import("std");
const dynamic_array = @import("dynamic-array");

/// A last-in, first-out container built by composition over DynamicArray.
pub fn Stack(comptime T: type) type {
    return struct {
        const Self = @This();
        const Storage = dynamic_array.DynamicArray(T);

        storage: Storage,

        pub fn init(allocator: std.mem.Allocator) Self {
            return .{ .storage = Storage.init(allocator) };
        }

        pub fn deinit(self: *Self) void {
            self.storage.deinit();
            self.* = undefined;
        }

        pub fn len(self: *const Self) usize {
            return self.storage.len;
        }

        pub fn isEmpty(self: *const Self) bool {
            return self.storage.len == 0;
        }

        pub fn push(self: *Self, value: T) !void {
            try self.storage.append(value);
        }

        pub fn pop(self: *Self) ?T {
            return self.storage.pop();
        }

        pub fn peek(self: *const Self) ?T {
            if (self.storage.len == 0) return null;
            return self.storage.storage[self.storage.len - 1];
        }

        pub fn clearRetainingCapacity(self: *Self) void {
            self.storage.clearRetainingCapacity();
        }
    };
}

test "stack preserves last-in first-out order" {
    var stack = Stack(u32).init(std.testing.allocator);
    defer stack.deinit();

    try stack.push(10);
    try stack.push(20);
    try stack.push(30);

    try std.testing.expectEqual(@as(?u32, 30), stack.pop());
    try std.testing.expectEqual(@as(?u32, 20), stack.pop());
    try std.testing.expectEqual(@as(?u32, 10), stack.pop());
    try std.testing.expectEqual(@as(?u32, null), stack.pop());
}

test "peek does not mutate the stack" {
    var stack = Stack(u8).init(std.testing.allocator);
    defer stack.deinit();

    try stack.push(7);
    try stack.push(9);

    try std.testing.expectEqual(@as(?u8, 9), stack.peek());
    try std.testing.expectEqual(@as(usize, 2), stack.len());
}

test "failed growth leaves existing values intact" {
    var failing = std.testing.FailingAllocator.init(std.testing.allocator, .{ .fail_index = 0 });
    var stack = Stack(u8).init(failing.allocator());
    defer stack.deinit();

    try std.testing.expectError(error.OutOfMemory, stack.push(1));
    try std.testing.expect(stack.isEmpty());
}
