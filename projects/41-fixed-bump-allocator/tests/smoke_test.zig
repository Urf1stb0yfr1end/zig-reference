const m = @import("fixed-bump-allocator");
const std = @import("std");
test "named import" {
    var bytes: [8]u8 = undefined;
    var a = m.FixedBumpAllocator.init(&bytes);
    try std.testing.expectEqual(@as(usize, 2), (try a.allocate(2, 1)).len);
}
