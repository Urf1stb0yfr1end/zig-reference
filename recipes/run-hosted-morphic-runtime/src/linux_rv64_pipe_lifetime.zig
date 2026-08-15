const std = @import("std");
const resource_tables = @import("bounded-resource-table");
const bounded_pipe = @import("bounded_pipe.zig");
const pipe2 = @import("linux_rv64_pipe2.zig");
const dup3 = @import("linux_rv64_dup3.zig");

pub const EndpointKind = enum { any, writer };

fn tableOwns(resources: anytype, bindings: anytype, binding_capacity: usize, pipe_id: usize, kind: EndpointKind) bool {
    for (0..binding_capacity) |descriptor| {
        const reference = bindings.resolve(descriptor) orelse continue;
        const description = resources.resolve(reference) orelse continue;
        const backend = @intFromEnum(description.backend);
        if (description.state != pipe_id) continue;
        if (backend == pipe2.write_backend) return true;
        if (kind == .any and backend == pipe2.read_backend) return true;
    }
    return false;
}

/// Queries every descriptor state that currently owns process resources. The
/// suspended table is meaningful only while a fork-shaped parent snapshot is
/// live; stale snapshot storage must not extend endpoint lifetime.
pub fn owned(
    active_resources: anytype,
    active_bindings: anytype,
    suspended_present: bool,
    suspended_resources: anytype,
    suspended_bindings: anytype,
    binding_capacity: usize,
    pipe_id: usize,
    kind: EndpointKind,
) bool {
    if (tableOwns(active_resources, active_bindings, binding_capacity, pipe_id, kind)) return true;
    return suspended_present and tableOwns(suspended_resources, suspended_bindings, binding_capacity, pipe_id, kind);
}

/// Retires an active neutral pipe exactly once, and only after no endpoint is
/// owned by either the running process or its suspended parent snapshot.
pub fn retireIfUnowned(
    pipes: anytype,
    active_resources: anytype,
    active_bindings: anytype,
    suspended_present: bool,
    suspended_resources: anytype,
    suspended_bindings: anytype,
    binding_capacity: usize,
    pipe_id: usize,
) bool {
    if (pipes.buffered(pipe_id) == null) return false;
    if (owned(active_resources, active_bindings, suspended_present, suspended_resources, suspended_bindings, binding_capacity, pipe_id, .any)) return false;
    pipes.destroy(pipe_id);
    return true;
}

const Resources = resource_tables.ResourceTable(8);
const Bindings = resource_tables.BindingTable(Resources.ResourceRef, 8);
const Pipes = bounded_pipe.PipeStore(1, 8);

fn add(resources: *Resources, bindings: *Bindings, fd: usize, backend: u32, pipe_id: usize) !Resources.ResourceRef {
    const reference = try resources.create(.{ .backend = @enumFromInt(backend), .capabilities = .{ .read = backend == pipe2.read_backend, .write = backend == pipe2.write_backend }, .state = pipe_id });
    try bindings.bindAt(fd, reference);
    return reference;
}

fn close(resources: *Resources, bindings: *Bindings, fd: usize) !void {
    _ = try resources.release(try bindings.unbind(fd));
}

test "suspended parent writer prevents child EOF and endpoint retirement" {
    var pipes: Pipes = .{};
    const id = try pipes.create();
    var parent_resources: Resources = .{};
    var parent_bindings: Bindings = .{};
    _ = try add(&parent_resources, &parent_bindings, 4, pipe2.write_backend, id);
    var child_resources = parent_resources;
    var child_bindings = parent_bindings;
    try close(&child_resources, &child_bindings, 4);

    try std.testing.expect(owned(&child_resources, &child_bindings, true, &parent_resources, &parent_bindings, 8, id, .writer));
    try std.testing.expect(!retireIfUnowned(&pipes, &child_resources, &child_bindings, true, &parent_resources, &parent_bindings, 8, id));
    try std.testing.expectEqual(@as(?usize, 0), pipes.buffered(id));

    try close(&parent_resources, &parent_bindings, 4);
    try std.testing.expect(retireIfUnowned(&pipes, &child_resources, &child_bindings, true, &parent_resources, &parent_bindings, 8, id));
    try std.testing.expect(!retireIfUnowned(&pipes, &child_resources, &child_bindings, true, &parent_resources, &parent_bindings, 8, id));
}

test "dup3 final displacement retires pipe without resource or descriptor leak" {
    var pipes: Pipes = .{};
    const id = try pipes.create();
    var resources: Resources = .{};
    var bindings: Bindings = .{};
    const replacement = try resources.create(.{ .backend = @enumFromInt(7), .capabilities = .{ .write = true } });
    try bindings.bindAt(0, replacement);
    const endpoint = try add(&resources, &bindings, 1, pipe2.read_backend, id);
    var unused_resources: Resources = .{};
    var unused_bindings: Bindings = .{};

    _ = try dup3.replace(&resources, &bindings, 0, 1, 0, 8);
    try std.testing.expect(resources.resolve(endpoint) == null);
    try std.testing.expectEqual(@as(?usize, 2), resources.referenceCount(replacement));
    try std.testing.expect(retireIfUnowned(&pipes, &resources, &bindings, false, &unused_resources, &unused_bindings, 8, id));
    try std.testing.expectEqual(@as(usize, 1), resources.count());
    try std.testing.expectEqual(replacement, bindings.resolve(0).?);
    try std.testing.expectEqual(replacement, bindings.resolve(1).?);
}

test "dup3 displacement preserves pipe while active alias or suspended endpoint survives" {
    var pipes: Pipes = .{};
    const id = try pipes.create();
    var resources: Resources = .{};
    var bindings: Bindings = .{};
    const replacement = try resources.create(.{ .backend = @enumFromInt(7), .capabilities = .{ .write = true } });
    try bindings.bindAt(0, replacement);
    const endpoint = try add(&resources, &bindings, 1, pipe2.read_backend, id);
    try resources.retain(endpoint);
    try bindings.bindAt(2, endpoint);
    var suspended_resources = resources;
    var suspended_bindings = bindings;

    _ = try dup3.replace(&resources, &bindings, 0, 1, 0, 8);
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(endpoint));
    try std.testing.expect(!retireIfUnowned(&pipes, &resources, &bindings, true, &suspended_resources, &suspended_bindings, 8, id));
    try close(&resources, &bindings, 2);
    try std.testing.expect(!retireIfUnowned(&pipes, &resources, &bindings, true, &suspended_resources, &suspended_bindings, 8, id));
    try close(&suspended_resources, &suspended_bindings, 1);
    try close(&suspended_resources, &suspended_bindings, 2);
    try std.testing.expect(retireIfUnowned(&pipes, &resources, &bindings, true, &suspended_resources, &suspended_bindings, 8, id));
}
