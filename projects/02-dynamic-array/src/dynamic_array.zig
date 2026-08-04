const std = @import("std");

/// A small allocator-backed dynamic array for teaching ownership, growth,
/// failure atomicity, and reference invalidation.
pub fn DynamicArray(comptime T: type) type {
    return struct {
        const Self = @This();

        allocator: std.mem.Allocator,
        storage: []T,
        len: usize,

        pub fn init(allocator: std.mem.Allocator) Self {
            return .{
                .allocator = allocator,
                .storage = &[_]T{},
                .len = 0,
            };
        }

        pub fn deinit(self: *Self) void {
            if (self.storage.len != 0) {
                self.allocator.free(self.storage);
            }
            self.* = undefined;
        }

        pub fn capacity(self: *const Self) usize {
            return self.storage.len;
        }

        pub fn items(self: *Self) []T {
            return self.storage[0..self.len];
        }

        pub fn constItems(self: *const Self) []const T {
            return self.storage[0..self.len];
        }

        pub fn append(self: *Self, value: T) !void {
            try self.ensureUnusedCapacity(1);
            self.storage[self.len] = value;
            self.len += 1;
        }

        pub fn pop(self: *Self) ?T {
            if (self.len == 0) return null;
            self.len -= 1;
            return self.storage[self.len];
        }

        pub fn get(self: *const Self, index: usize) ?T {
            if (index >= self.len) return null;
            return self.storage[index];
        }

        pub fn clearRetainingCapacity(self: *Self) void {
            self.len = 0;
        }

        pub fn ensureUnusedCapacity(self: *Self, additional: usize) !void {
            const required = try std.math.add(usize, self.len, additional);
            if (required <= self.storage.len) return;

            var new_capacity: usize = if (self.storage.len == 0) 4 else self.storage.len;
            while (new_capacity < required) {
                new_capacity = try std.math.mul(usize, new_capacity, 2);
            }

            const replacement = try self.allocator.alloc(T, new_capacity);
            errdefer self.allocator.free(replacement);

            @memcpy(replacement[0..self.len], self.storage[0..self.len]);

            const old_storage = self.storage;
            self.storage = replacement;
            if (old_storage.len != 0) self.allocator.free(old_storage);
        }
    };
}

test "append grows while preserving values" {
    var array = DynamicArray(u32).init(std.testing.allocator);
    defer array.deinit();

    try array.append(10);
    try array.append(20);
    try array.append(30);
    try array.append(40);
    try array.append(50);

    try std.testing.expectEqual(@as(usize, 5), array.len);
    try std.testing.expect(array.capacity() >= array.len);
    try std.testing.expectEqualSlices(u32, &.{ 10, 20, 30, 40, 50 }, array.constItems());
}

test "pop and clear preserve the invariant" {
    var array = DynamicArray(i32).init(std.testing.allocator);
    defer array.deinit();

    try array.append(7);
    try array.append(9);

    try std.testing.expectEqual(@as(?i32, 9), array.pop());
    try std.testing.expectEqual(@as(usize, 1), array.len);

    const old_capacity = array.capacity();
    array.clearRetainingCapacity();

    try std.testing.expectEqual(@as(usize, 0), array.len);
    try std.testing.expectEqual(old_capacity, array.capacity());
    try std.testing.expectEqual(@as(?i32, null), array.pop());
}

test "zero elements require no allocation" {
    var array = DynamicArray(u8).init(std.testing.allocator);
    defer array.deinit();

    try std.testing.expectEqual(@as(usize, 0), array.len);
    try std.testing.expectEqual(@as(usize, 0), array.capacity());
    try std.testing.expectEqual(@as(?u8, null), array.get(0));
}
