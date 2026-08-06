const m = @import("fixed-free-list");
const std = @import("std");
test "named import" {
    var f = m.FixedFreeList(1).init();
    const i = try f.allocate();
    try f.release(i);
    try std.testing.expectEqual(@as(usize, 0), f.count());
}
