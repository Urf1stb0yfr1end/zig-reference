const std = @import("std");

/// Converts an integer tag into an enum only when the tag names a declared
/// enum field. Invalid external values remain errors instead of becoming
/// trusted program state.
pub fn decodeEnum(comptime E: type, raw: std.meta.Tag(E)) error{InvalidEnumValue}!E {
    return std.meta.intToEnum(E, raw) catch error.InvalidEnumValue;
}

pub fn isValidEnumValue(comptime E: type, raw: std.meta.Tag(E)) bool {
    _ = decodeEnum(E, raw) catch return false;
    return true;
}

test "declared tags decode" {
    const Kind = enum(u8) { command = 1, response = 2 };
    try std.testing.expectEqual(Kind.command, try decodeEnum(Kind, 1));
    try std.testing.expect(isValidEnumValue(Kind, 2));
}

test "undeclared tags fail explicitly" {
    const Kind = enum(u8) { command = 1, response = 2 };
    try std.testing.expectError(error.InvalidEnumValue, decodeEnum(Kind, 3));
    try std.testing.expect(!isValidEnumValue(Kind, 255));
}
