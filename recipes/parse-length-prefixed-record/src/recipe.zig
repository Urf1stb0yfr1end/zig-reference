const std = @import("std");
const reader_mod = @import("bounded-byte-reader");
const field_mod = @import("length-prefixed-binary-field");

pub fn parse(input: []const u8) ![]const u8 {
    var reader = reader_mod.BoundedReader.init(input);
    return (try field_mod.LengthPrefixedField(u16, .big).read(&reader)).bytes();
}

test "truncation is rejected and a complete borrowed record parses" {
    try std.testing.expectEqualSlices(u8, "ok", try parse(&.{ 0, 2, 'o', 'k' }));
    try std.testing.expectError(error.UnexpectedEnd, parse(&.{ 0, 3, 'x' }));
}
