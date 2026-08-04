const std = @import("std");

/// A vector whose maximum capacity is known at compile time.
///
/// Owns:
/// - inline storage for exactly `capacity` values of `T`;
///
/// Borrows:
/// - nothing;
///
/// Invariants:
/// - `len <= capacity`;
/// - only storage in `[0..len)` contains initialized values;
///
/// Failure:
/// - insertion returns `error.Full` when no unused slot remains;
/// - indexed operations return `error.OutOfBounds` for invalid indices;
///
/// Invalidation:
/// - append preserves existing element addresses;
/// - ordered removal shifts later values and invalidates references to them;
/// - clearing invalidates every element reference.
pub fn FixedVector(comptime T: type, comptime capacity: usize) type {
    return struct {
        const Self = @This();

        pub const Error = error{
            Full,
            OutOfBounds,
        };

        storage: [capacity]T = undefined,
        len: usize = 0,

        pub fn init() Self {
            return .{};
        }

        pub fn count(self: *const Self) usize {
            return self.len;
        }

        pub fn remainingCapacity(self: *const Self) usize {
            return capacity - self.len;
        }

        pub fn isEmpty(self: *const Self) bool {
            return self.len == 0;
        }

        pub fn isFull(self: *const Self) bool {
            return self.len == capacity;
        }

        pub fn items(self: *Self) []T {
            return self.storage[0..self.len];
        }

        pub fn constItems(self: *const Self) []const T {
            return self.storage[0..self.len];
        }

        pub fn append(self: *Self, value: T) Error!void {
            if (comptime capacity == 0) return error.Full;
            if (self.isFull()) return error.Full;

            self.storage[self.len] = value;
            self.len += 1;
        }

        pub fn get(self: *Self, index: usize) Error!*T {
            if (index >= self.len) return error.OutOfBounds;
            return &self.storage[index];
        }

        pub fn getConst(self: *const Self, index: usize) Error!*const T {
            if (index >= self.len) return error.OutOfBounds;
            return &self.storage[index];
        }

        pub fn pop(self: *Self) Error!T {
            if (self.len == 0) return error.OutOfBounds;

            self.len -= 1;
            return self.storage[self.len];
        }

        pub fn orderedRemove(self: *Self, index: usize) Error!T {
            if (index >= self.len) return error.OutOfBounds;

            const removed = self.storage[index];
            const last_index = self.len - 1;

            if (index < last_index) {
                std.mem.copyForwards(
                    T,
                    self.storage[index..last_index],
                    self.storage[index + 1 .. self.len],
                );
            }

            self.len = last_index;
            return removed;
        }

        pub fn clear(self: *Self) void {
            self.len = 0;
        }
    };
}

test "starts empty with full remaining capacity" {
    var values = FixedVector(u32, 4).init();

    try std.testing.expect(values.isEmpty());
    try std.testing.expect(!values.isFull());
    try std.testing.expectEqual(@as(usize, 0), values.count());
    try std.testing.expectEqual(@as(usize, 4), values.remainingCapacity());
}

test "append exposes only initialized elements" {
    var values = FixedVector(u32, 4).init();

    try values.append(10);
    try values.append(20);

    try std.testing.expectEqualSlices(u32, &.{ 10, 20 }, values.constItems());
    try std.testing.expectEqual(@as(usize, 2), values.remainingCapacity());
}

test "append refuses to exceed capacity without changing state" {
    var values = FixedVector(u8, 2).init();

    try values.append(1);
    try values.append(2);
    try std.testing.expectError(error.Full, values.append(3));

    try std.testing.expectEqualSlices(u8, &.{ 1, 2 }, values.constItems());
    try std.testing.expect(values.isFull());
}

test "get checks the initialized range rather than raw capacity" {
    var values = FixedVector(i32, 4).init();
    try values.append(7);

    const first = try values.get(0);
    first.* = 9;

    try std.testing.expectEqual(@as(i32, 9), (try values.getConst(0)).*);
    try std.testing.expectError(error.OutOfBounds, values.get(1));
}

test "pop returns values in reverse insertion order" {
    var values = FixedVector(u8, 3).init();
    try values.append(1);
    try values.append(2);

    try std.testing.expectEqual(@as(u8, 2), try values.pop());
    try std.testing.expectEqual(@as(u8, 1), try values.pop());
    try std.testing.expectError(error.OutOfBounds, values.pop());
}

test "ordered removal preserves order" {
    var values = FixedVector(u8, 5).init();
    try values.append(10);
    try values.append(20);
    try values.append(30);
    try values.append(40);

    try std.testing.expectEqual(@as(u8, 20), try values.orderedRemove(1));
    try std.testing.expectEqualSlices(u8, &.{ 10, 30, 40 }, values.constItems());
}

test "zero-capacity vectors are valid and always full" {
    var values = FixedVector(u8, 0).init();

    try std.testing.expect(values.isEmpty());
    try std.testing.expect(values.isFull());
    try std.testing.expectError(error.Full, values.append(1));
}
