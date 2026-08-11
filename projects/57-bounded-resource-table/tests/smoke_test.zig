const std = @import("std");
const resource = @import("bounded-resource-table");
const semantic = @import("morphic-semantic-operation");

test "external consumer binds resource without Linux identity" {
    var table = resource.ResourceTable(1){};
    const reference = try table.create(.{ .backend = @enumFromInt(3), .capabilities = .{ .read = true } });
    var bindings = resource.BindingTable(@TypeOf(reference), 2){};
    try bindings.bindAt(0, reference);
    try std.testing.expect(bindings.resolve(0) != null);
}

test "reused generation succeeds through semantic I/O and stale identity fails" {
    const Store = resource.ResourceTable(1);
    var resources = Store{};
    const stale = try resources.create(.{ .backend = @enumFromInt(1), .capabilities = .{ .write = true } });
    try std.testing.expect(try resources.release(stale));
    const fresh = try resources.create(.{ .backend = @enumFromInt(2), .capabilities = .{ .write = true } });
    try std.testing.expectEqual(stale.index, fresh.index);
    try std.testing.expectEqual(stale.generation + 1, fresh.generation);

    const Backend = struct {
        resources: *Store,
        pub fn readBytes(_: @This(), _: semantic.ReadBytes) semantic.Completion {
            return .{ .failure = .operation_not_supported };
        }
        pub fn writeBytes(self: @This(), operation: semantic.WriteBytes) semantic.Completion {
            const reference = resource.referenceFromIdentity(Store.ResourceRef, operation.destination);
            const description = self.resources.resolve(reference) orelse return .{ .failure = .invalid_resource };
            return .{ .success = @intFromEnum(description.backend) };
        }
        pub fn terminate(_: @This(), status: u8) semantic.Completion {
            return .{ .terminated = status };
        }
    };
    const backend = Backend{ .resources = &resources };
    const fresh_result = semantic.execute(.{ .write_bytes = .{ .destination = resource.semanticIdentity(fresh), .source = @enumFromInt(0), .byte_count = 0 } }, backend);
    try std.testing.expectEqual(@as(usize, 2), fresh_result.success);
    const stale_result = semantic.execute(.{ .write_bytes = .{ .destination = resource.semanticIdentity(stale), .source = @enumFromInt(0), .byte_count = 0 } }, backend);
    try std.testing.expectEqual(semantic.Failure.invalid_resource, stale_result.failure);
}
