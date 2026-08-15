const std = @import("std");
const resource_tables = @import("bounded-resource-table");
const bounded_pipe = @import("bounded_pipe.zig");

pub const read_backend: u32 = 0x103;
pub const write_backend: u32 = 0x104;
pub const Error = error{ UnsupportedFlags, DescriptorFull, ResourceFull, PipeFull, CopyOut };

/// Failure-atomic Linux edge: checked guest copy-out is part of the transaction.
pub fn create(pipes: anytype, resources: anytype, bindings: anytype, flags: usize, copy_context: anytype, copyOut: anytype) Error![2]usize {
    if (flags != 0) return error.UnsupportedFlags;
    const read_fd = bindings.lowestFreeAtOrAbove(0) orelse return error.DescriptorFull;
    const write_fd = bindings.lowestFreeAtOrAbove(read_fd + 1) orelse return error.DescriptorFull;
    if (!resources.hasCapacity()) return error.ResourceFull;
    const pipe_id = pipes.create() catch return error.PipeFull;
    errdefer pipes.destroy(pipe_id);
    const reader = resources.create(.{ .backend = @enumFromInt(read_backend), .capabilities = .{ .read = true }, .state = pipe_id }) catch return error.ResourceFull;
    errdefer _ = resources.release(reader) catch unreachable;
    const writer = resources.create(.{ .backend = @enumFromInt(write_backend), .capabilities = .{ .write = true }, .state = pipe_id }) catch return error.ResourceFull;
    errdefer _ = resources.release(writer) catch unreachable;
    bindings.bindAt(read_fd, reader) catch unreachable;
    errdefer _ = bindings.unbind(read_fd) catch unreachable;
    bindings.bindAt(write_fd, writer) catch unreachable;
    errdefer _ = bindings.unbind(write_fd) catch unreachable;
    const descriptors = [2]usize{ read_fd, write_fd };
    copyOut(copy_context, descriptors) catch return error.CopyOut;
    return descriptors;
}

const Resources = resource_tables.ResourceTable(4);
const Pipes = bounded_pipe.PipeStore(1, 8);
fn accept(_: void, _: [2]usize) !void {}
fn reject(_: void, _: [2]usize) !void {
    return error.BadAddress;
}

test "pipe2 separates capabilities and rolls back failed copy-out" {
    var pipes: Pipes = .{};
    var resources: Resources = .{};
    var bindings: resource_tables.BindingTable(Resources.ResourceRef, 4) = .{};
    try std.testing.expectError(error.CopyOut, create(&pipes, &resources, &bindings, 0, {}, reject));
    try std.testing.expectEqual(@as(usize, 0), resources.count());
    try std.testing.expect(bindings.resolve(0) == null);
    try std.testing.expectEqual(@as(usize, 0), try pipes.create());
    pipes.destroy(0);
    const fds = try create(&pipes, &resources, &bindings, 0, {}, accept);
    try std.testing.expectEqual([2]usize{ 0, 1 }, fds);
    try std.testing.expect(resources.resolve(bindings.resolve(0).?).?.capabilities.read);
    try std.testing.expect(resources.resolve(bindings.resolve(1).?).?.capabilities.write);
}

test "pipe2 rejects flags and descriptor exhaustion without mutation" {
    var pipes: Pipes = .{};
    var resources: Resources = .{};
    var bindings: resource_tables.BindingTable(Resources.ResourceRef, 1) = .{};
    try std.testing.expectError(error.UnsupportedFlags, create(&pipes, &resources, &bindings, 0x80000, {}, accept));
    try std.testing.expectError(error.DescriptorFull, create(&pipes, &resources, &bindings, 0, {}, accept));
    try std.testing.expectEqual(@as(usize, 0), resources.count());
}
