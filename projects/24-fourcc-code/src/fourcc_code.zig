const std = @import("std");

/// Four-byte code with byte order independent construction and display.
pub const FourCC = struct {
    bytes: [4]u8,

    pub fn init(bytes: [4]u8) FourCC {
        return .{ .bytes = bytes };
    }

    pub fn fromString(text: []const u8) error{InvalidLength}!FourCC {
        if (text.len != 4) return error.InvalidLength;
        return .{ .bytes = text[0..4].* };
    }

    pub fn asBytes(self: FourCC) [4]u8 {
        return self.bytes;
    }

    pub fn eql(self: FourCC, other: FourCC) bool {
        return std.mem.eql(u8, &self.bytes, &other.bytes);
    }
};

test "fourcc preserves exact bytes" {
    const riff = try FourCC.fromString("RIFF");
    try std.testing.expect(riff.eql(FourCC.init(.{ 'R', 'I', 'F', 'F' })));
    try std.testing.expectError(error.InvalidLength, FourCC.fromString("ELF"));
}
