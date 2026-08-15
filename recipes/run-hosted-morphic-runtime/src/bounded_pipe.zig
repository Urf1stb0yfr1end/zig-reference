const std = @import("std");

/// ABI-neutral, allocation-free byte pipes. Descriptor ownership stays in the
/// resource tables; this store owns only shared stream bytes.
pub fn PipeStore(comptime pipe_capacity: usize, comptime byte_capacity: usize) type {
    if (pipe_capacity == 0 or byte_capacity == 0) @compileError("pipe capacities must be nonzero");
    return struct {
        const Self = @This();
        const Pipe = struct { active: bool = false, bytes: [byte_capacity]u8 = undefined, start: usize = 0, len: usize = 0 };
        pub const Error = error{ Full, InvalidPipe, WouldBlock };
        pipes: [pipe_capacity]Pipe = [_]Pipe{.{}} ** pipe_capacity,

        pub fn create(self: *Self) Error!usize {
            for (&self.pipes, 0..) |*pipe, index| if (!pipe.active) {
                pipe.* = .{ .active = true };
                return index;
            };
            return error.Full;
        }
        pub fn destroy(self: *Self, id: usize) void {
            if (id < pipe_capacity) self.pipes[id] = .{};
        }
        pub fn write(self: *Self, id: usize, source: []const u8) Error!usize {
            const pipe = self.get(id) orelse return error.InvalidPipe;
            if (source.len != 0 and pipe.len == byte_capacity) return error.WouldBlock;
            const amount = @min(source.len, byte_capacity - pipe.len);
            for (source[0..amount], 0..) |byte, offset| pipe.bytes[(pipe.start + pipe.len + offset) % byte_capacity] = byte;
            pipe.len += amount;
            return amount;
        }
        pub fn read(self: *Self, id: usize, destination: []u8) Error!usize {
            const pipe = self.get(id) orelse return error.InvalidPipe;
            const amount = @min(destination.len, pipe.len);
            for (destination[0..amount], 0..) |*byte, offset| byte.* = pipe.bytes[(pipe.start + offset) % byte_capacity];
            pipe.start = (pipe.start + amount) % byte_capacity;
            pipe.len -= amount;
            return amount;
        }
        pub fn buffered(self: *const Self, id: usize) ?usize {
            return if (id < pipe_capacity and self.pipes[id].active) self.pipes[id].len else null;
        }
        fn get(self: *Self, id: usize) ?*Pipe {
            if (id >= pipe_capacity or !self.pipes[id].active) return null;
            return &self.pipes[id];
        }
    };
}

test "bounded pipe preserves order, wraparound, and explicit full behavior" {
    var pipes: PipeStore(1, 4) = .{};
    const id = try pipes.create();
    try std.testing.expectEqual(@as(usize, 4), try pipes.write(id, "abcd"));
    try std.testing.expectError(error.WouldBlock, pipes.write(id, "e"));
    var first: [2]u8 = undefined;
    _ = try pipes.read(id, &first);
    try std.testing.expectEqualStrings("ab", &first);
    _ = try pipes.write(id, "ef");
    var rest: [4]u8 = undefined;
    _ = try pipes.read(id, &rest);
    try std.testing.expectEqualStrings("cdef", &rest);
}

test "pipe allocation and invalid identities fail explicitly" {
    var pipes: PipeStore(1, 2) = .{};
    const id = try pipes.create();
    try std.testing.expectError(error.Full, pipes.create());
    pipes.destroy(id);
    try std.testing.expectEqual(id, try pipes.create());
    var byte: [1]u8 = undefined;
    try std.testing.expectError(error.InvalidPipe, pipes.read(9, &byte));
}
