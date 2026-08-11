const resource = @import("bounded-resource-table");
test "external consumer binds resource without Linux identity" {
    var table = resource.ResourceTable(1){};
    const reference = try table.create(.{ .backend = @enumFromInt(3), .capabilities = .{ .read = true } });
    var bindings = resource.BindingTable(@TypeOf(reference), 2){};
    try bindings.bindAt(0, reference);
    try @import("std").testing.expect(bindings.resolve(0) != null);
}
