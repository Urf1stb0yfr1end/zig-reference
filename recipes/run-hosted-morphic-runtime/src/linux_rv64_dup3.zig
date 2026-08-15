const std = @import("std");
const resource_tables = @import("bounded-resource-table");

pub const Error = error{
    InvalidSource,
    InvalidTarget,
    SameDescriptor,
    UnsupportedFlags,
    ResourceFull,
};

/// Applies the narrow Linux/RV64 dup3(24) policy used by musl's dup2 wrapper.
/// Descriptor flags are not represented by the bounded neutral tables, so only
/// the observed flags=0 form is accepted. Retaining before topology mutation
/// makes resource-capacity failure atomic; after target validation the bounded
/// unbind/bind commit cannot fail.
pub fn replace(
    resources: anytype,
    bindings: anytype,
    source: usize,
    target: usize,
    flags: usize,
    descriptor_limit: usize,
) Error!usize {
    if (flags != 0) return error.UnsupportedFlags;
    if (source == target) return error.SameDescriptor;
    if (target >= descriptor_limit) return error.InvalidTarget;
    const source_reference = bindings.resolve(source) orelse return error.InvalidSource;

    resources.retain(source_reference) catch return error.ResourceFull;
    if (bindings.resolve(target)) |old_reference| {
        const removed = bindings.unbind(target) catch unreachable;
        std.debug.assert(removed.index == old_reference.index and removed.generation == old_reference.generation);
        bindings.bindAt(target, source_reference) catch unreachable;
        _ = resources.release(old_reference) catch unreachable;
    } else {
        bindings.bindAt(target, source_reference) catch {
            _ = resources.release(source_reference) catch unreachable;
            return error.InvalidTarget;
        };
    }
    return target;
}

const TestResources = resource_tables.ResourceTable(3);
const TestBindings = resource_tables.BindingTable(TestResources.ResourceRef, 4);

test "dup3 rejects invalid arguments and retain failure without mutation" {
    var resources = TestResources{};
    var bindings = TestBindings{};
    const source = try resources.create(.{ .backend = @enumFromInt(1), .capabilities = .{ .write = true } });
    const target = try resources.create(.{ .backend = @enumFromInt(2), .capabilities = .{ .read = true } });
    try bindings.bindAt(0, source);
    try bindings.bindAt(1, target);

    try std.testing.expectError(error.InvalidTarget, replace(&resources, &bindings, 0, 4, 0, 4));
    try std.testing.expectError(error.SameDescriptor, replace(&resources, &bindings, 0, 0, 0, 4));
    try std.testing.expectError(error.UnsupportedFlags, replace(&resources, &bindings, 0, 1, 1, 4));
    // dup3-specific EINVAL conditions take precedence over source lookup.
    try std.testing.expectError(error.SameDescriptor, replace(&resources, &bindings, 3, 3, 0, 4));
    try std.testing.expectError(error.UnsupportedFlags, replace(&resources, &bindings, 3, 1, 1, 4));
    // With valid distinct dup3 arguments, the same unbound source is EBADF.
    try std.testing.expectError(error.InvalidSource, replace(&resources, &bindings, 3, 1, 0, 4));
    try std.testing.expectEqual(source, bindings.resolve(0).?);
    try std.testing.expectEqual(target, bindings.resolve(1).?);
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(source));
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(target));

    const source_entry = resources.storage.get(source).?;
    source_entry.references = std.math.maxInt(usize);
    try std.testing.expectError(error.ResourceFull, replace(&resources, &bindings, 0, 1, 0, 4));
    try std.testing.expectEqual(source, bindings.resolve(0).?);
    try std.testing.expectEqual(target, bindings.resolve(1).?);
    try std.testing.expectEqual(@as(?usize, std.math.maxInt(usize)), resources.referenceCount(source));
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(target));
}

test "dup3 replacement owns one alias and releases the displaced resource" {
    var resources = TestResources{};
    var bindings = TestBindings{};
    const source = try resources.create(.{ .backend = @enumFromInt(1), .capabilities = .{ .write = true }, .state = 9 });
    const displaced = try resources.create(.{ .backend = @enumFromInt(2), .capabilities = .{ .read = true } });
    try bindings.bindAt(0, source);
    try bindings.bindAt(1, displaced);

    try std.testing.expectEqual(@as(usize, 1), try replace(&resources, &bindings, 0, 1, 0, 4));
    try std.testing.expectEqual(source, bindings.resolve(1).?);
    try std.testing.expectEqual(@as(?usize, 2), resources.referenceCount(source));
    try std.testing.expect(resources.resolve(displaced) == null);
    try std.testing.expect(!(try resources.release(try bindings.unbind(0))));
    try std.testing.expect(try resources.release(try bindings.unbind(1)));
    try std.testing.expect(resources.resolve(source) == null);
}

test "dup3 replacing an alias of the same resource preserves the reference count" {
    var resources = TestResources{};
    var bindings = TestBindings{};
    const source = try resources.create(.{ .backend = @enumFromInt(3), .capabilities = .{ .read = true } });
    try bindings.bindAt(0, source);
    try resources.retain(source);
    try bindings.bindAt(1, source);

    try std.testing.expectEqual(@as(usize, 1), try replace(&resources, &bindings, 0, 1, 0, 4));
    try std.testing.expectEqual(@as(?usize, 2), resources.referenceCount(source));
    try std.testing.expect(!(try resources.release(try bindings.unbind(0))));
    try std.testing.expect(try resources.release(try bindings.unbind(1)));
}
