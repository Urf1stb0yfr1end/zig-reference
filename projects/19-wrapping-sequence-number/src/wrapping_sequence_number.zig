const std = @import("std");

/// Sequence number whose wraparound policy is explicit.
pub fn WrappingSequenceNumber(comptime T: type) type {
    const info = @typeInfo(T);
    if (info != .int or info.int.signedness != .unsigned)
        @compileError("WrappingSequenceNumber requires an unsigned integer type");

    return struct {
        const Self = @This();
        value: T,

        pub fn init(value: T) Self {
            return .{ .value = value };
        }

        pub fn get(self: Self) T {
            return self.value;
        }

        pub fn next(self: Self) Self {
            return .{ .value = self.value +% 1 };
        }

        pub fn advance(self: Self, amount: T) Self {
            return .{ .value = self.value +% amount };
        }

        pub fn distanceForward(from: Self, to: Self) T {
            return to.value -% from.value;
        }
    };
}

test "wraparound is deliberate" {
    const Seq = WrappingSequenceNumber(u8);
    const last = Seq.init(255);
    try std.testing.expectEqual(@as(u8, 0), last.next().get());
    try std.testing.expectEqual(@as(u8, 2), Seq.distanceForward(Seq.init(254), Seq.init(0)));
}
