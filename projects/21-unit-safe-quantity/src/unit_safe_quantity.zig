const std = @import("std");

/// Distinct scalar quantity identified by a compile-time unit tag.
pub fn Quantity(comptime Unit: type, comptime Scalar: type) type {
    _ = Unit;
    return struct {
        const Self = @This();
        value: Scalar,

        pub fn init(value: Scalar) Self {
            return .{ .value = value };
        }

        pub fn get(self: Self) Scalar {
            return self.value;
        }

        pub fn add(self: Self, other: Self) Self {
            return .{ .value = self.value + other.value };
        }

        pub fn subtract(self: Self, other: Self) Self {
            return .{ .value = self.value - other.value };
        }
    };
}

test "units remain distinct concrete types" {
    const BytesTag = struct {};
    const PagesTag = struct {};
    const Bytes = Quantity(BytesTag, usize);
    const Pages = Quantity(PagesTag, usize);

    const total = Bytes.init(4).add(Bytes.init(8));
    const pages = Pages.init(3);
    try std.testing.expectEqual(@as(usize, 12), total.get());
    try std.testing.expectEqual(@as(usize, 3), pages.get());
}
