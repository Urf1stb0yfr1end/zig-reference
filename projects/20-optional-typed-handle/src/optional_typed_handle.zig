const std = @import("std");

/// Opaque typed handle with explicit optional absence.
pub fn TypedHandle(comptime Tag: type, comptime Integer: type) type {
    _ = Tag;
    return struct {
        const Self = @This();
        raw: Integer,

        pub fn init(raw: Integer) Self {
            return .{ .raw = raw };
        }

        pub fn value(self: Self) Integer {
            return self.raw;
        }
    };
}

pub fn OptionalTypedHandle(comptime Tag: type, comptime Integer: type) type {
    const Handle = TypedHandle(Tag, Integer);
    return ?Handle;
}

test "different tag types produce different handle types" {
    const VmTag = struct {};
    const DeviceTag = struct {};
    const VmHandle = TypedHandle(VmTag, u32);
    const DeviceHandle = TypedHandle(DeviceTag, u32);

    const vm: ?VmHandle = VmHandle.init(7);
    const device: ?DeviceHandle = null;
    try std.testing.expectEqual(@as(u32, 7), vm.?.value());
    try std.testing.expect(device == null);
}
