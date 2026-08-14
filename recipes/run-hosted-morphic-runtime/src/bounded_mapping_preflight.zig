const std = @import("std");

pub const Error = error{
    InvalidBackingIndex,
    MappingConflict,
    WriteExecute,
};

/// Proves that every candidate leaf can be installed without replacing any
/// currently active leaf. Existing leaves prove that their intermediate table
/// path already exists; absent leaves are installed temporarily so the page
/// table owner must provide every required intermediate table, then removed.
///
/// `context` supplies `occupied(virtual_start)`, `map(virtual_start,
/// backing_index)`, and `unmap(virtual_start)`. A failed map must itself be
/// failure-atomic, as the canonical Sv39 Builder.mapPage contract is.
pub fn preflight(pages: anytype, backing_capacity: usize, context: anytype) !void {
    // Reject candidate metadata before asking the mapping provider to mutate
    // even temporary leaves.
    for (pages, 0..) |page, index| {
        if (page.backing_index != index or page.backing_index >= backing_capacity)
            return error.InvalidBackingIndex;
        if (page.permissions.write and page.permissions.execute)
            return error.WriteExecute;
    }

    for (pages) |page| {
        if (context.occupied(page.virtual_start)) {
            if (!context.replaceable(page.virtual_start)) return error.MappingConflict;
            continue;
        }
        try context.map(page.virtual_start, page.backing_index);
        try context.unmap(page.virtual_start);
    }
}

const TestPage = struct {
    virtual_start: usize,
    backing_index: usize,
    permissions: packed struct { write: bool = false, execute: bool = false } = .{},
};

const CapacityModel = struct {
    active_address: usize,
    active_physical: usize,
    active_process_state: usize,
    available_table_paths: usize,
    temporary_leaf: ?usize = null,

    fn occupied(self: *@This(), address: usize) bool {
        return address == self.active_address;
    }

    fn replaceable(self: *@This(), address: usize) bool {
        return address == self.active_address;
    }

    fn map(self: *@This(), address: usize, _: usize) error{OutOfTableBacking}!void {
        if (self.available_table_paths == 0) return error.OutOfTableBacking;
        self.available_table_paths -= 1;
        self.temporary_leaf = address;
    }

    fn unmap(self: *@This(), address: usize) error{UnexpectedLeaf}!void {
        if (self.temporary_leaf != address) return error.UnexpectedLeaf;
        self.temporary_leaf = null;
    }
};

test "mapping capacity failure leaves active execution image and process state unchanged" {
    const pages = [_]TestPage{
        .{ .virtual_start = 0x4000, .backing_index = 0 }, // active leaf: no temporary mutation
        .{ .virtual_start = 0x20_0000, .backing_index = 1 }, // consumes the sole new table path
        .{ .virtual_start = 0x4000_0000, .backing_index = 2 }, // capacity failure
    };
    var model = CapacityModel{
        .active_address = 0x4000,
        .active_physical = 0x9000,
        .active_process_state = 0xfeed_beef,
        .available_table_paths = 1,
    };
    const active_address_before = model.active_address;
    const active_physical_before = model.active_physical;
    const process_state_before = model.active_process_state;

    try std.testing.expectError(error.OutOfTableBacking, preflight(&pages, pages.len, &model));
    try std.testing.expectEqual(active_address_before, model.active_address);
    try std.testing.expectEqual(active_physical_before, model.active_physical);
    try std.testing.expectEqual(process_state_before, model.active_process_state);
    try std.testing.expectEqual(@as(?usize, null), model.temporary_leaf);
}

test "metadata failures occur before temporary mapping" {
    var model = CapacityModel{
        .active_address = 0x4000,
        .active_physical = 0x9000,
        .active_process_state = 7,
        .available_table_paths = 1,
    };
    const wx = [_]TestPage{.{ .virtual_start = 0x8000, .backing_index = 0, .permissions = .{ .write = true, .execute = true } }};
    try std.testing.expectError(error.WriteExecute, preflight(&wx, wx.len, &model));
    try std.testing.expectEqual(@as(usize, 1), model.available_table_paths);
    try std.testing.expectEqual(@as(?usize, null), model.temporary_leaf);
}

test "occupied retained mapping is rejected without mutation" {
    const RetainedModel = struct {
        active_address: usize,
        active_physical: usize,

        fn occupied(self: *@This(), address: usize) bool {
            return address == self.active_address;
        }
        fn replaceable(_: *@This(), _: usize) bool {
            return false;
        }
        fn map(_: *@This(), _: usize, _: usize) error{UnexpectedMap}!void {
            return error.UnexpectedMap;
        }
        fn unmap(_: *@This(), _: usize) error{UnexpectedUnmap}!void {
            return error.UnexpectedUnmap;
        }
    };
    const page = [_]TestPage{.{ .virtual_start = 0x7000, .backing_index = 0 }};
    var model = RetainedModel{ .active_address = 0x7000, .active_physical = 0xa000 };
    try std.testing.expectError(error.MappingConflict, preflight(&page, page.len, &model));
    try std.testing.expectEqual(@as(usize, 0x7000), model.active_address);
    try std.testing.expectEqual(@as(usize, 0xa000), model.active_physical);
}
