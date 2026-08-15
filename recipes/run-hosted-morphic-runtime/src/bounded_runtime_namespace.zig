const std = @import("std");

pub const Operation = enum { read, write };

/// Access belongs to an open resource description, not to a pathname. Linux
/// translates rejection from this neutral check to EBADF at its ABI edge.
pub const Access = struct {
    pub const Error = error{AccessDenied};
    read: bool = false,
    write: bool = false,

    pub fn permits(self: Access, operation: Operation) bool {
        return switch (operation) {
            .read => self.read,
            .write => self.write,
        };
    }

    pub fn require(self: Access, operation: Operation) Error!void {
        if (!self.permits(operation)) return error.AccessDenied;
    }
};

/// Session-local regular files. Paths and bytes are owned inline; the verified
/// source namespace is never modified.
pub fn RuntimeNamespace(comptime object_capacity: usize, comptime path_capacity: usize, comptime byte_capacity: usize) type {
    return struct {
        const Self = @This();
        pub const Error = error{ InvalidPath, PathTooLong, ObjectCapacity, ByteCapacity, NotFound, AccessDenied, ResourceFull, DescriptorFull };
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

        /// PREPARE resource and binding capacity before COMMIT may create or
        /// truncate namespace state. The caller owns both bounded tables.
        pub fn openPrepared(self: *Self, path: []const u8, create: bool, truncate: bool, resource_available: bool, descriptor_available: bool) Error!usize {
            if (!resource_available) return error.ResourceFull;
            if (!descriptor_available) return error.DescriptorFull;
            return self.open(path, create, truncate);
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

        pub fn writeWithAccess(self: *Self, access: Access, index: usize, offset: usize, bytes: []const u8) Error!usize {
            access.require(.write) catch return error.AccessDenied;
            return self.write(index, offset, bytes);
        }

        pub fn read(self: *const Self, index: usize, offset: usize, output: []u8) Error!usize {
            if (index >= object_capacity or !self.objects[index].used) return error.NotFound;
            const len = self.objects[index].len;
            if (offset >= len) return 0;
            const amount = @min(output.len, len - offset);
            @memcpy(output[0..amount], self.objects[index].bytes[offset..][0..amount]);
            return amount;
        }

        pub fn readWithAccess(self: *const Self, access: Access, index: usize, offset: usize, output: []u8) Error!usize {
            access.require(.read) catch return error.AccessDenied;
            return self.read(index, offset, output);
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

test "resource access modes reject forbidden operations without bytes or offset mutation" {
    var runtime: RuntimeNamespace(1, 16, 8) = .{};
    const id = try runtime.open("/tmp/a", true, false);
    _ = try runtime.write(id, 0, "seed");
    var offset: usize = 0;
    var output: [8]u8 = undefined;

    const read_only: Access = .{ .read = true };
    try std.testing.expectError(error.AccessDenied, runtime.writeWithAccess(read_only, id, offset, "blocked"));
    // A rejected operation never reaches namespace mutation or offset commit.
    try std.testing.expectEqual(@as(usize, 0), offset);
    try std.testing.expectEqual(@as(usize, 4), try runtime.read(id, 0, &output));
    try std.testing.expectEqualStrings("seed", output[0..4]);

    const write_only: Access = .{ .write = true };
    try std.testing.expectError(error.AccessDenied, runtime.readWithAccess(write_only, id, offset, &output));
    try std.testing.expectEqual(@as(usize, 0), offset);

    const read_write: Access = .{ .read = true, .write = true };
    try read_write.require(.read);
    try read_write.require(.write);
    const written = try runtime.writeWithAccess(read_write, id, offset, "both");
    offset += written;
    try std.testing.expectEqual(@as(usize, 4), offset);
    try std.testing.expectEqual(@as(usize, 4), try runtime.readWithAccess(read_write, id, 0, &output));
    try std.testing.expectEqualStrings("both", output[0..4]);
}

test "open prepare failures cannot create truncate or leak caller capacity" {
    var runtime: RuntimeNamespace(2, 16, 8) = .{};
    const existing = try runtime.open("/tmp/a", true, false);
    _ = try runtime.write(existing, 0, "seed");
    var output: [8]u8 = undefined;

    try std.testing.expectError(error.DescriptorFull, runtime.openPrepared("/tmp/new", true, false, true, false));
    try std.testing.expect(runtime.lookup("/tmp/new") == null);
    try std.testing.expectError(error.DescriptorFull, runtime.openPrepared("/tmp/a", false, true, true, false));
    try std.testing.expectError(error.ResourceFull, runtime.openPrepared("/tmp/new", true, false, false, true));
    try std.testing.expect(runtime.lookup("/tmp/new") == null);
    try std.testing.expectError(error.ResourceFull, runtime.openPrepared("/tmp/a", false, true, false, true));
    try std.testing.expectEqual(@as(usize, 4), try runtime.read(existing, 0, &output));
    try std.testing.expectEqualStrings("seed", output[0..4]);

    const created = try runtime.openPrepared("/tmp/new", true, false, true, true);
    _ = try runtime.write(created, 0, "ok");
    _ = try runtime.openPrepared("/tmp/new", false, true, true, true);
    try std.testing.expectEqual(@as(usize, 0), try runtime.read(created, 0, &output));
}
