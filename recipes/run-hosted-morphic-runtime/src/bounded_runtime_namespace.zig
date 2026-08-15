const std = @import("std");

/// Session-local regular files. Paths and bytes are owned inline; the verified
/// source namespace is never modified.
pub fn RuntimeNamespace(comptime object_capacity: usize, comptime path_capacity: usize, comptime byte_capacity: usize) type {
    return struct {
        const Self = @This();
        pub const Error = error{ InvalidPath, PathTooLong, ObjectCapacity, ByteCapacity, NotFound };
        const Object = struct { used: bool = false, path: [path_capacity]u8 = undefined, path_len: usize = 0, bytes: [byte_capacity]u8 = undefined, len: usize = 0 };
        objects: [object_capacity]Object = .{Object{}} ** object_capacity,

        pub fn lookup(self: *const Self, path: []const u8) ?usize {
            for (self.objects, 0..) |object, index| if (object.used and std.mem.eql(u8, object.path[0..object.path_len], path)) return index;
            return null;
        }

        /// Returns stable object identity. Creation is committed only after all
        /// validation/capacity checks pass.
        pub fn open(self: *Self, path: []const u8, create: bool, truncate: bool) Error!usize {
            if (path.len < 2 or path[0] != '/' or path[path.len - 1] == '/') return error.InvalidPath;
            if (path.len > path_capacity) return error.PathTooLong;
            if (self.lookup(path)) |index| {
                if (truncate) self.objects[index].len = 0;
                return index;
            }
            if (!create) return error.NotFound;
            for (&self.objects, 0..) |*object, index| if (!object.used) {
                object.path_len = path.len;
                @memcpy(object.path[0..path.len], path);
                object.len = 0;
                object.used = true;
                return index;
            };
            return error.ObjectCapacity;
        }

        pub fn write(self: *Self, index: usize, offset: usize, bytes: []const u8) Error!usize {
            if (index >= object_capacity or !self.objects[index].used) return error.NotFound;
            if (offset > byte_capacity) return error.ByteCapacity;
            const amount = @min(bytes.len, byte_capacity - offset);
            if (amount == 0 and bytes.len != 0) return error.ByteCapacity;
            @memcpy(self.objects[index].bytes[offset..][0..amount], bytes[0..amount]);
            self.objects[index].len = @max(self.objects[index].len, offset + amount);
            return amount;
        }

        pub fn read(self: *const Self, index: usize, offset: usize, output: []u8) Error!usize {
            if (index >= object_capacity or !self.objects[index].used) return error.NotFound;
            const len = self.objects[index].len;
            if (offset >= len) return 0;
            const amount = @min(output.len, len - offset);
            @memcpy(output[0..amount], self.objects[index].bytes[offset..][0..amount]);
            return amount;
        }
    };
}

test "bounded create truncate read back and capacity failure" {
    var runtime: RuntimeNamespace(1, 16, 8) = .{};
    const id = try runtime.open("/tmp/a", true, false);
    try std.testing.expectEqual(@as(usize, 5), try runtime.write(id, 0, "hello"));
    var output: [8]u8 = undefined;
    try std.testing.expectEqual(@as(usize, 5), try runtime.read(id, 0, &output));
    try std.testing.expectEqualStrings("hello", output[0..5]);
    try std.testing.expectError(error.ObjectCapacity, runtime.open("/tmp/b", true, false));
    _ = try runtime.open("/tmp/a", false, true);
    try std.testing.expectEqual(@as(usize, 0), try runtime.read(id, 0, &output));
}
