const std = @import("std");
const resource_tables = @import("bounded-resource-table");

pub const Error = error{
    InvalidSource,
    InvalidMinimum,
    DescriptorFull,
    ResourceFull,
};

/// Applies Linux/RV64 F_DUPFD policy to neutral bounded tables. Linux passes
/// the minimum as an `int`; a negative value is sign-extended in the RV64
/// register. The bounded descriptor limit is policy supplied by the caller.
pub fn duplicate(
    resources: anytype,
    bindings: anytype,
    source: usize,
    minimum_argument: usize,
    descriptor_limit: usize,
) Error!usize {
    const reference = bindings.resolve(source) orelse return error.InvalidSource;
    if (minimum_argument > std.math.maxInt(i32) or minimum_argument >= descriptor_limit)
        return error.InvalidMinimum;
    const destination = bindings.lowestFreeAtOrAbove(minimum_argument) orelse
        return error.DescriptorFull;

    resources.retain(reference) catch return error.ResourceFull;
    bindings.bindAt(destination, reference) catch {
        _ = resources.release(reference) catch unreachable;
        return error.DescriptorFull;
    };
    return destination;
}

const TestResources = resource_tables.ResourceTable(2);
const TestBindings = resource_tables.BindingTable(TestResources.ResourceRef, 4);

test "F_DUPFD distinguishes invalid minimum, exhaustion, and invalid source without ownership changes" {
    var resources = TestResources{};
    var bindings = TestBindings{};
    const reference = try resources.create(.{ .backend = @enumFromInt(1), .capabilities = .{ .read = true, .write = true }, .state = 7 });
    try bindings.bindAt(0, reference);

    try std.testing.expectError(error.InvalidMinimum, duplicate(&resources, &bindings, 0, std.math.maxInt(usize), 4));
    try std.testing.expectError(error.InvalidMinimum, duplicate(&resources, &bindings, 0, 4, 4));
    try std.testing.expectError(error.InvalidSource, duplicate(&resources, &bindings, 3, 0, 4));
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(reference));
    try std.testing.expect(bindings.resolve(1) == null);

    const occupied = try resources.create(.{ .backend = @enumFromInt(4), .capabilities = .{} });
    try bindings.bindAt(1, occupied);
    try bindings.bindAt(2, occupied);
    try bindings.bindAt(3, occupied);
    try std.testing.expectError(error.DescriptorFull, duplicate(&resources, &bindings, 0, 1, 4));
    try std.testing.expectEqual(@as(?usize, 1), resources.referenceCount(reference));
    try std.testing.expectEqual(occupied, bindings.resolve(1).?);
}

test "F_DUPFD chooses the lowest eligible slot and aliases shared state until final close" {
    var resources = TestResources{};
    var bindings = TestBindings{};
    const reference = try resources.create(.{ .backend = @enumFromInt(2), .capabilities = .{ .read = true }, .state = 11 });
    const occupied = try resources.create(.{ .backend = @enumFromInt(3), .capabilities = .{} });
    try bindings.bindAt(0, reference);
    try bindings.bindAt(1, occupied);

    const destination = try duplicate(&resources, &bindings, 0, 1, 4);
    try std.testing.expectEqual(@as(usize, 2), destination);
    try std.testing.expectEqual(reference, bindings.resolve(destination).?);
    try std.testing.expectEqual(@as(?usize, 2), resources.referenceCount(reference));
    try resources.setState(reference, 19);
    try std.testing.expectEqual(@as(usize, 19), resources.resolve(bindings.resolve(destination).?).?.state);
    try std.testing.expect(!(try resources.release(try bindings.unbind(0))));
    try std.testing.expect(try resources.release(try bindings.unbind(destination)));
    try std.testing.expect(resources.resolve(reference) == null);
    try std.testing.expect(try resources.release(try bindings.unbind(1)));
}
