const std = @import("std");
const writer_mod = @import("byte-writer");
const reader_mod = @import("bounded-byte-reader");
const codec_mod = @import("endian-integer-codec");

pub fn appendRecord(writer: *writer_mod.ByteWriter, value: u32) !void {
    try writer.writeAll(&codec_mod.EndianIntegerCodec(u32, .big).encode(value));
}

test "explicit big-endian record round trips" {
    var writer = writer_mod.ByteWriter.init(std.testing.allocator);
    defer writer.deinit();
    try appendRecord(&writer, 0x10203040);
    var reader = reader_mod.BoundedReader.init(writer.bytes());
    try std.testing.expectEqual(@as(u32, 0x10203040), try reader.readU32Be());
}
