const std = @import("std");

/// Unsigned counter that clamps to zero and a caller-selected maximum instead
/// of wrapping.
pub fn SaturatingCounter(comptime T: type, comptime maximum: T) type {
    const info = @typeInfo(T);
    if (info != .int or info.int.signedness != .unsigned) {
        @compileError("SaturatingCounter requires an unsigned integer type");
    }

    return struct {
        const Self = @This();

        value: T = 0,

        pub fn init(value: T) Self {
            return .{ .value = @min(value, maximum) };
        }

        pub fn get(self: Self) T {
            return self.value;
        }

        pub fn increment(self: *Self) void {
            self.add(1);
        }

        pub fn decrement(self: *Self) void {
            self.subtract(1);
        }

        pub fn add(self: *Self, amount: T) void {
            self.value = @min(maximum, self.value +| amount);
        }

        pub fn subtract(self: *Self, amount: T) void {
            self.value -|= amount;
        }

        pub fn reset(self: *Self) void {
            self.value = 0;
        }

        pub fn isSaturated(self: Self) bool {
            return self.value == maximum;
        }
    };
}

test "addition clamps to the configured maximum" {
    const Counter = SaturatingCounter(u8, 10);
    var counter = Counter.init(8);

    counter.add(7);
    try std.testing.expectEqual(@as(u8, 10), counter.get());
    try std.testing.expect(counter.isSaturated());
}

test "subtraction clamps to zero" {
    const Counter = SaturatingCounter(u16, 100);
    var counter = Counter.init(3);

    counter.subtract(10);
    try std.testing.expectEqual(@as(u16, 0), counter.get());
}

test "initial value is clamped and reset returns to zero" {
    const Counter = SaturatingCounter(u8, 5);
    var counter = Counter.init(200);
    try std.testing.expectEqual(@as(u8, 5), counter.get());

    counter.reset();
    try std.testing.expectEqual(@as(u8, 0), counter.get());
}
