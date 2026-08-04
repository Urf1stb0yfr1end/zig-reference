const std = @import("std");
const dynamic_array = @import("dynamic-array");

/// An allocator-backed writer for constructing binary output explicitly.
pub const ByteWriter = struct {
    const Storage = dynamic_array.DynamicArray(u8);

    storage: Storage,

    pub fn init(allocator: std.mem.Allocator) ByteWriter {
        return .{ .storage = Storage.init(allocator) };
    }

    pub fn deinit(self: *ByteWriter) void {
        self.storage.deinit();
        self.* = undefined;
    }

    pub fn bytes(self: *const ByteWriter) []const u8 {
        return self.storage.constItems();
    }

    pub fn len(self: *const ByteWriter) usize {
        return self.storage.len;
    }

    pub fn checkpoint(self: *const ByteWriter) usize {
        return self.storage.len;
    }

    pub fn rollback(self: *ByteWriter, saved_len: usize) error{InvalidCheckpoint}!void {
        if (saved_len > self.storage.len) return error.InvalidCheckpoint;
        self.storage.len = saved_len;
    }

    pub fn writeByte(self: *ByteWriter, value: u8) !void {
        try self.storage.append(value);
    }

    pub fn writeAll(self: *ByteWriter, input: []const u8) !void {
        try self.storage.ensureUnusedCapacity(input.len);

        const start = self.storage.len;
        const end = start + input.len;
        @memcpy(self.storage.storage[start..end], input);
        self.storage.len = end;
    }

    pub fn writeU16Le(self: *ByteWriter, value: u16) !void {
        var encoded: [2]u8 = undefined;
        std.mem.writeInt(u16, &encoded, value, .little);
        try self.writeAll(&encoded);
    }

    pub fn writeU16Be(self: *ByteWriter, value: u16) !void {
        var encoded: [2]u8 = undefined;
        std.mem.writeInt(u16, &encoded, value, .big);
        try self.writeAll(&encoded);
    }

    pub fn writeU32Le(self: *ByteWriter, value: u32) !void {
        var encoded: [4]u8 = undefined;
        std.mem.writeInt(u32, &encoded, value, .little);
        try self.writeAll(&encoded);
    }

    pub fn writeU32Be(self: *ByteWriter, value: u32) !void {
        var encoded: [4]u8 = undefined;
        std.mem.writeInt(u32, &encoded, value, .big);
        try self.writeAll(&encoded);
    }
};

test "writes bytes in order" {
    var writer = ByteWriter.init(std.testing.allocator);
    defer writer.deinit();

    try writer.writeByte(0xaa);
    try writer.writeAll(&.{ 0xbb, 0xcc });

    try std.testing.expectEqualSlices(u8, &.{ 0xaa, 0xbb, 0xcc }, writer.bytes());
}

test "writes integers with explicit byte order" {
    var writer = ByteWriter.init(std.testing.allocator);
    defer writer.deinit();

    try writer.writeU16Le(0x1234);
    try writer.writeU16Be(0x5678);
    try writer.writeU32Le(0x90abcdef);

    try std.testing.expectEqualSlices(
        u8,
        &.{ 0x34, 0x12, 0x56, 0x78, 0xef, 0xcd, 0xab, 0x90 },
        writer.bytes(),
    );
}

test "rollback restores a prior logical length" {
    var writer = ByteWriter.init(std.testing.allocator);
    defer writer.deinit();

    try writer.writeAll("header");
    const saved = writer.checkpoint();
    try writer.writeAll("temporary");

    try writer.rollback(saved);
    try std.testing.expectEqualStrings("header", writer.bytes());
    try std.testing.expectError(error.InvalidCheckpoint, writer.rollback(saved + 1));
}
