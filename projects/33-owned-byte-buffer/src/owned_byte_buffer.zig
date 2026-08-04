const std = @import("std");
const arrays = @import("dynamic-array");
const writer = @import("byte-writer");

pub const OwnedByteBuffer = struct {
    storage: arrays.DynamicArray(u8),
    pub fn init(allocator: std.mem.Allocator) OwnedByteBuffer { return .{ .storage = arrays.DynamicArray(u8).init(allocator) }; }
    pub fn initCopy(allocator: std.mem.Allocator, bytes: []const u8) !OwnedByteBuffer { var self=init(allocator); errdefer self.deinit(); try self.append(bytes); return self; }
    pub fn deinit(self: *OwnedByteBuffer) void { self.storage.deinit(); }
    pub fn capacity(self: *const OwnedByteBuffer) usize { return self.storage.capacity(); }
    pub fn bytes(self: *const OwnedByteBuffer) []const u8 { return self.storage.constItems(); }
    pub fn mutableBytes(self: *OwnedByteBuffer) []u8 { return self.storage.items(); }
    pub fn reserve(self: *OwnedByteBuffer, additional: usize) !void { try self.storage.ensureUnusedCapacity(additional); }
    pub fn appendByte(self: *OwnedByteBuffer, byte: u8) !void { try self.storage.append(byte); }
    pub fn append(self: *OwnedByteBuffer, input: []const u8) !void { try self.reserve(input.len); for(input)|byte| try self.storage.append(byte); }
    pub fn clearRetainingCapacity(self: *OwnedByteBuffer) void { self.storage.clearRetainingCapacity(); }
    pub fn reset(self: *OwnedByteBuffer) void { const allocator=self.storage.allocator; self.deinit(); self.*=init(allocator); }
    pub fn intoWriter(self: *OwnedByteBuffer) writer.ByteWriter { const allocator=self.storage.allocator; var result=writer.ByteWriter.init(allocator); result.storage=self.storage; self.*=init(allocator); return result; }
};
test "copy append clear reset and transfer" { var b=try OwnedByteBuffer.initCopy(std.testing.allocator,"ab"); defer b.deinit(); try b.appendByte('c'); try std.testing.expectEqualStrings("abc",b.bytes()); const cap=b.capacity(); b.clearRetainingCapacity(); try std.testing.expectEqual(cap,b.capacity()); b.reset(); try std.testing.expectEqual(@as(usize,0),b.capacity()); }
test "allocation failure is atomic" { var backing:[1]u8=undefined; var fba=std.heap.FixedBufferAllocator.init(&backing); var b=OwnedByteBuffer.init(fba.allocator()); defer b.deinit(); try std.testing.expectError(error.OutOfMemory,b.append("too long")); try std.testing.expectEqual(@as(usize,0),b.bytes().len); }
