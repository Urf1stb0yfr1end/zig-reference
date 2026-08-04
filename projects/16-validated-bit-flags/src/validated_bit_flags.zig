const std = @import("std");

/// Creates a flag-set type from an enum whose values are individual bit masks.
pub fn ValidatedBitFlags(comptime Flag: type) type {
    const Storage = std.meta.Tag(Flag);

    comptime var allowed_mask: Storage = 0;
    inline for (std.meta.fields(Flag)) |field| {
        allowed_mask |= @as(Storage, @intCast(field.value));
    }

    return struct {
        const Self = @This();

        bits: Storage = 0,

        pub fn fromRaw(raw: Storage) error{UnknownBits}!Self {
            if ((raw & ~allowed_mask) != 0) return error.UnknownBits;
            return .{ .bits = raw };
        }

        pub fn raw(self: Self) Storage {
            return self.bits;
        }

        pub fn contains(self: Self, flag: Flag) bool {
            const mask: Storage = @intFromEnum(flag);
            return (self.bits & mask) == mask;
        }

        pub fn insert(self: *Self, flag: Flag) void {
            self.bits |= @intFromEnum(flag);
        }

        pub fn remove(self: *Self, flag: Flag) void {
            self.bits &= ~@as(Storage, @intFromEnum(flag));
        }

        pub fn clear(self: *Self) void {
            self.bits = 0;
        }
    };
}

test "named flags compose without unknown bits" {
    const Permission = enum(u8) { read = 1, write = 2, execute = 4 };
    const Permissions = ValidatedBitFlags(Permission);

    var flags = try Permissions.fromRaw(1 | 4);
    try std.testing.expect(flags.contains(.read));
    try std.testing.expect(flags.contains(.execute));
    try std.testing.expect(!flags.contains(.write));

    flags.insert(.write);
    flags.remove(.read);
    try std.testing.expectEqual(@as(u8, 6), flags.raw());
}

test "unknown storage bits are rejected" {
    const Permission = enum(u8) { read = 1, write = 2 };
    const Permissions = ValidatedBitFlags(Permission);
    try std.testing.expectError(error.UnknownBits, Permissions.fromRaw(0b100));
}
