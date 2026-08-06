const m = @import("fixed-capacity-priority-queue");
const std = @import("std");
fn less(a: u8, b: u8) bool {
    return a < b;
}
test "named import" {
    var q = m.FixedPriorityQueue(u8, 2, less).init();
    try q.insert(2);
    try q.insert(1);
    try std.testing.expectEqual(@as(u8, 1), try q.remove());
}
