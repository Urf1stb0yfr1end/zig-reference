const std = @import("std");

pub fn CurrentDirectory(comptime capacity: usize) type {
    if (capacity < 2) @compileError("current-directory capacity must hold root and its terminator");
    return struct {
        const Self = @This();

        bytes: [capacity]u8 = .{'/'} ++ .{0} ** (capacity - 1),
        len: usize = 1,

        pub fn setAbsolute(self: *Self, new_path: []const u8) error{InvalidPath}!void {
            if (new_path.len == 0 or new_path[0] != '/' or new_path.len >= capacity or
                (new_path.len > 1 and new_path[new_path.len - 1] == '/') or std.mem.indexOfScalar(u8, new_path, 0) != null)
                return error.InvalidPath;
            var next: [capacity]u8 = .{0} ** capacity;
            @memcpy(next[0..new_path.len], new_path);
            self.bytes = next;
            self.len = new_path.len;
        }

        pub fn path(self: *const Self) []const u8 {
            return self.bytes[0..self.len];
        }
    };
}

test "bounded cwd changes atomically and copies with process state" {
    const Cwd = CurrentDirectory(16);
    var cwd = Cwd{};
    try std.testing.expectEqualStrings("/", cwd.path());
    try cwd.setAbsolute("/tmp");
    const inherited = cwd;
    try std.testing.expectEqualStrings("/tmp", inherited.path());
    const before = cwd;
    try std.testing.expectError(error.InvalidPath, cwd.setAbsolute("relative"));
    try std.testing.expectEqualDeep(before, cwd);
    try std.testing.expectError(error.InvalidPath, cwd.setAbsolute("/0123456789abcde"));
    try std.testing.expectEqualDeep(before, cwd);
}
