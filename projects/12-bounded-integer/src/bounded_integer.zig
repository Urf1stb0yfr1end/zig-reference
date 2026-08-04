const std = @import("std");

/// Integer wrapper constrained to a compile-time inclusive range.
pub fn BoundedInteger(comptime T: type, comptime minimum: T, comptime maximum: T) type {
    if (@typeInfo(T) != .int) {
        @compileError("BoundedInteger requires an integer type");
    }
    if (minimum > maximum) {
        @compileError("minimum must not exceed maximum");
    }

    return struct {
        const Self = @This();

        value: T,

        pub const Error = error{OutOfRange};

        pub fn init(value: T) Error!Self {
            if (value < minimum or value > maximum) return error.OutOfRange;
            return .{ .value = value };
        }

        pub fn get(self: Self) T {
            return self.value;
        }

        pub fn set(self: *Self, value: T) Error!void {
            if (value < minimum or value > maximum) return error.OutOfRange;
            self.value = value;
        }

        pub fn minValue() T {
            return minimum;
        }

        pub fn maxValue() T {
            return maximum;
        }
    };
}

test "accepts both inclusive boundaries" {
    const Priority = BoundedInteger(u8, 1, 10);
    try std.testing.expectEqual(@as(u8, 1), (try Priority.init(1)).get());
    try std.testing.expectEqual(@as(u8, 10), (try Priority.init(10)).get());
}

test "rejects values outside the declared range without mutation" {
    const Priority = BoundedInteger(u8, 1, 10);
    var value = try Priority.init(5);

    try std.testing.expectError(error.OutOfRange, value.set(11));
    try std.testing.expectEqual(@as(u8, 5), value.get());
    try std.testing.expectError(error.OutOfRange, Priority.init(0));
}
