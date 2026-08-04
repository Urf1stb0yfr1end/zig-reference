const std = @import("std");

/// Integer wrapper whose stored value can never be zero after successful
/// construction.
pub fn NonZeroInteger(comptime T: type) type {
    if (@typeInfo(T) != .int) {
        @compileError("NonZeroInteger requires an integer type");
    }

    return struct {
        const Self = @This();

        value: T,

        pub const Error = error{ZeroNotAllowed};

        pub fn init(value: T) Error!Self {
            if (value == 0) return error.ZeroNotAllowed;
            return .{ .value = value };
        }

        pub fn get(self: Self) T {
            return self.value;
        }
    };
}

test "constructs positive and negative nonzero values" {
    const Positive = NonZeroInteger(u16);
    const Negative = NonZeroInteger(i16);

    try std.testing.expectEqual(@as(u16, 7), (try Positive.init(7)).get());
    try std.testing.expectEqual(@as(i16, -7), (try Negative.init(-7)).get());
}

test "rejects zero" {
    const Value = NonZeroInteger(u32);
    try std.testing.expectError(error.ZeroNotAllowed, Value.init(0));
}
