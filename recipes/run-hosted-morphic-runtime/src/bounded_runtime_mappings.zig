const std = @import("std");

pub const Permissions = packed struct {
    read: bool = false,
    write: bool = false,
    execute: bool = false,
};

pub const Mapping = struct {
    start: usize,
    end: usize,
    permissions: Permissions,
};

/// Allocation-free runtime address-range ownership. Linux flags and errno are
/// intentionally absent: personalities translate into this neutral boundary.
pub fn BoundedRuntimeMappings(comptime capacity: usize, comptime page_size: usize) type {
    if (capacity == 0 or page_size == 0 or page_size & (page_size - 1) != 0)
        @compileError("mapping capacity and power-of-two page size are required");

    return struct {
        const Self = @This();
        pub const Error = error{ InvalidRange, Collision, CapacityExceeded, WriteExecute };

        entries: [capacity]Mapping = undefined,
        count: usize = 0,

        /// Reserves an aligned half-open range. `pageOccupied` lets the caller
        /// include executable, stack, brk, and page-table truth without copying
        /// those mappings into this table. Failure never changes the table.
        pub fn reserve(
            self: *Self,
            start: usize,
            length: usize,
            permissions: Permissions,
            replace_occupied: bool,
            context: anytype,
            pageOccupied: fn (@TypeOf(context), usize) bool,
        ) Error!void {
            if (length == 0 or start & (page_size - 1) != 0 or length & (page_size - 1) != 0)
                return error.InvalidRange;
            const end = std.math.add(usize, start, length) catch return error.InvalidRange;
            if (end <= start) return error.InvalidRange;
            if (permissions.write and permissions.execute) return error.WriteExecute;
            if (self.count == capacity) return error.CapacityExceeded;

            for (self.entries[0..self.count]) |entry|
                if (start < entry.end and entry.start < end) return error.Collision;
            var page = start;
            while (page < end) : (page += page_size)
                if (!replace_occupied and pageOccupied(context, page)) return error.Collision;

            self.entries[self.count] = .{ .start = start, .end = end, .permissions = permissions };
            self.count += 1;
        }
    };
}

fn neverOccupied(_: void, _: usize) bool {
    return false;
}

test "bounded reservations validate range collision capacity and W+X atomically" {
    const Table = BoundedRuntimeMappings(2, 4096);
    var table: Table = .{};
    try table.reserve(0x2000, 4096, .{}, false, {}, neverOccupied);
    try std.testing.expectError(error.Collision, table.reserve(0x2000, 4096, .{}, false, {}, neverOccupied));
    try std.testing.expectError(error.InvalidRange, table.reserve(0x3001, 4096, .{}, false, {}, neverOccupied));
    try std.testing.expectError(error.InvalidRange, table.reserve(0x3000, 0, .{}, false, {}, neverOccupied));
    try std.testing.expectError(error.InvalidRange, table.reserve(std.math.maxInt(usize) & ~@as(usize, 4095), 8192, .{}, false, {}, neverOccupied));
    try std.testing.expectError(error.WriteExecute, table.reserve(0x3000, 4096, .{ .write = true, .execute = true }, false, {}, neverOccupied));
    try std.testing.expectEqual(@as(usize, 1), table.count);
    try table.reserve(0x3000, 4096, .{ .read = true, .write = true }, false, {}, neverOccupied);
    try std.testing.expectError(error.CapacityExceeded, table.reserve(0x4000, 4096, .{}, false, {}, neverOccupied));
    try std.testing.expectEqual(@as(usize, 2), table.count);
}

test "external occupied pages reject a reservation without mutation" {
    const occupied = struct {
        fn check(_: void, page: usize) bool {
            return page == 0x5000;
        }
    }.check;
    const Table = BoundedRuntimeMappings(1, 4096);
    var table: Table = .{};
    try std.testing.expectError(error.Collision, table.reserve(0x4000, 8192, .{}, false, {}, occupied));
    try std.testing.expectEqual(@as(usize, 0), table.count);
    try table.reserve(0x4000, 8192, .{}, true, {}, occupied);
    try std.testing.expectEqual(@as(usize, 1), table.count);
}
