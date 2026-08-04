const std = @import("std");

pub const AsciiByte = struct {
    pub const Error = error{NotAscii};
    value: u7,

    pub fn init(byte: u8) Error!AsciiByte {
        if (byte > 0x7f) return error.NotAscii;
        return .{ .value = @intCast(byte) };
    }

    pub fn get(self: AsciiByte) u8 {
        return self.value;
    }

    pub fn isDigit(self: AsciiByte) bool {
        const byte = self.get();
        return byte >= '0' and byte <= '9';
    }

    pub fn isAlphabetic(self: AsciiByte) bool {
        const byte = self.get();
        return (byte >= 'a' and byte <= 'z') or (byte >= 'A' and byte <= 'Z');
    }
};

test "rejects non ASCII bytes" {
    try std.testing.expectError(error.NotAscii, AsciiByte.init(0x80));
    try std.testing.expect((try AsciiByte.init('7')).isDigit());
    try std.testing.expect((try AsciiByte.init('Z')).isAlphabetic());
}
