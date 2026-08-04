const std = @import("std");

/// Explicit byte-order conversion for fixed-width integer values.
pub fn EndianIntegerCodec(comptime T: type, comptime endian: std.builtin.Endian) type {
    return struct {
        const byte_count = @sizeOf(T);

        pub fn decode(bytes: *const [byte_count]u8) T {
            return std.mem.readInt(T, bytes, endian);
        }

        pub fn encode(value: T) [byte_count]u8 {
            var bytes: [byte_count]u8 = undefined;
            std.mem.writeInt(T, &bytes, value, endian);
            return bytes;
        }
    };
}

test "endianness is selected by the type" {
    const U16Le = EndianIntegerCodec(u16, .little);
    const U16Be = EndianIntegerCodec(u16, .big);
    try std.testing.expectEqualSlices(u8, &.{ 0x34, 0x12 }, &U16Le.encode(0x1234));
    try std.testing.expectEqualSlices(u8, &.{ 0x12, 0x34 }, &U16Be.encode(0x1234));
    const input = [_]u8{ 0x78, 0x56 };
    try std.testing.expectEqual(@as(u16, 0x5678), U16Le.decode(&input));
}
