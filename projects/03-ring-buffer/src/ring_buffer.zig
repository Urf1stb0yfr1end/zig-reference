const std = @import("std");

/// A fixed-capacity first-in, first-out queue whose logical order may wrap
/// around the end of its backing array.
pub fn RingBuffer(comptime T: type, comptime capacity: usize) type {
    return struct {
        const Self = @This();

        storage: [capacity]T = undefined,
        head: usize = 0,
        len: usize = 0,

        pub const Error = error{Full};

        pub fn count(self: *const Self) usize {
            return self.len;
        }

        pub fn isEmpty(self: *const Self) bool {
            return self.len == 0;
        }

        pub fn isFull(self: *const Self) bool {
            return self.len == capacity;
        }

        pub fn push(self: *Self, value: T) Error!void {
            if (self.isFull()) return error.Full;
            if (capacity == 0) return error.Full;

            const tail = (self.head + self.len) % capacity;
            self.storage[tail] = value;
            self.len += 1;
        }

        pub fn pop(self: *Self) ?T {
            if (self.isEmpty()) return null;

            const value = self.storage[self.head];
            self.len -= 1;

            if (self.len == 0) {
                self.head = 0;
            } else {
                self.head = (self.head + 1) % capacity;
            }

            return value;
        }

        pub fn peek(self: *const Self) ?T {
            if (self.isEmpty()) return null;
            return self.storage[self.head];
        }

        pub fn get(self: *const Self, logical_index: usize) ?T {
            if (logical_index >= self.len) return null;
            if (capacity == 0) return null;

            const physical_index = (self.head + logical_index) % capacity;
            return self.storage[physical_index];
        }

        pub fn clear(self: *Self) void {
            self.head = 0;
            self.len = 0;
        }
    };
}

test "queue preserves first-in first-out order" {
    var queue = RingBuffer(u8, 3){};

    try queue.push(10);
    try queue.push(20);
    try queue.push(30);

    try std.testing.expectEqual(@as(?u8, 10), queue.pop());
    try std.testing.expectEqual(@as(?u8, 20), queue.pop());
    try std.testing.expectEqual(@as(?u8, 30), queue.pop());
    try std.testing.expectEqual(@as(?u8, null), queue.pop());
}

test "wrapped storage preserves logical order" {
    var queue = RingBuffer(u32, 3){};

    try queue.push(1);
    try queue.push(2);
    try queue.push(3);
    try std.testing.expectEqual(@as(?u32, 1), queue.pop());
    try std.testing.expectEqual(@as(?u32, 2), queue.pop());

    try queue.push(4);
    try queue.push(5);

    try std.testing.expectEqual(@as(?u32, 3), queue.get(0));
    try std.testing.expectEqual(@as(?u32, 4), queue.get(1));
    try std.testing.expectEqual(@as(?u32, 5), queue.get(2));
}

test "full push fails without changing the queue" {
    var queue = RingBuffer(i16, 2){};

    try queue.push(7);
    try queue.push(9);
    try std.testing.expectError(error.Full, queue.push(11));

    try std.testing.expectEqual(@as(usize, 2), queue.count());
    try std.testing.expectEqual(@as(?i16, 7), queue.pop());
    try std.testing.expectEqual(@as(?i16, 9), queue.pop());
}

test "zero-capacity queue is valid and always full" {
    var queue = RingBuffer(u8, 0){};

    try std.testing.expect(queue.isEmpty());
    try std.testing.expect(queue.isFull());
    try std.testing.expectError(error.Full, queue.push(1));
    try std.testing.expectEqual(@as(?u8, null), queue.pop());
}
