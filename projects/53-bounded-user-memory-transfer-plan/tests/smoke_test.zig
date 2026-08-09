const planner = @import("bounded-user-memory-transfer-plan");
const std = @import("std");
fn query(_: *const anyopaque, page: planner.GuestVirtualAddress) ?planner.PageResolution {
    if (page.raw() != 0x1000) return null;
    return .{ .physical_page_start = planner.PhysicalAddress.init(0x8000), .user = true, .readable = true, .writable = false };
}
test "external caller obtains an owned physical transfer plan" {
    const context: u8 = 0;
    const result = try planner.TransferPlan(1).plan(planner.GuestVirtualAddress.init(0x1010), 4, .read_from_user, .{ .context = &context, .queryFn = query });
    try std.testing.expectEqual(@as(usize, 0x8010), result.items()[0].physical_start.raw());
    try std.testing.expectEqual(@as(usize, 4), result.items()[0].byte_count);
}
