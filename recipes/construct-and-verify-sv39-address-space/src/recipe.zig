const std = @import("std");
const owner = @import("riscv-page-table-page-owner");
const builder = @import("riscv-sv39-page-table-builder");
const pte = @import("riscv-sv39-page-table-entry");
test "construct verify conflict rollback unmap and invalidation" {
    const O = owner.PageOwner(8);
    var pages = O{};
    var b = try builder.Builder(O).init(&pages);
    _ = try b.mapPage(0x1000, 0x8000, .page_4k, .{ .read = true, .write = true });
    _ = try b.mapPage(0x20_0000, 0x40_0000, .page_2m, .{ .read = true, .execute = true });
    _ = try b.mapPage(0x4000_0000, 0x8000_0000, .page_1g, .{ .read = true });
    try std.testing.expectEqual(@as(u64, 0x8123), (try b.query(0x1123)).physical_address);
    try std.testing.expectEqual(@as(u64, 0x401234), (try b.query(0x201234)).physical_address);
    try std.testing.expectEqual(@as(u64, 0x80001234), (try b.query(0x40001234)).physical_address);
    try std.testing.expectError(error.Conflict, b.mapPage(0x1000, 0, .page_4k, .{ .read = true }));
    const mutation = try b.unmapPage(0x1000, .page_4k);
    try std.testing.expect(mutation.invalidation != null);
    var tiny = owner.PageOwner(2){};
    var fail = try builder.Builder(@TypeOf(tiny)).init(&tiny);
    const before = tiny.count();
    try std.testing.expectError(error.OutOfPages, fail.mapPage(0, 0, .page_4k, .{ .read = true }));
    try std.testing.expectEqual(before, tiny.count());
    try std.testing.expectError(error.MissingMapping, fail.unmapPage(0, .page_4k));
    _ = pte.Entry.invalid();
}
