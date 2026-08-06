const queue = @import("fixed-capacity-priority-queue");
fn before(a: u8, b: u8) bool {
    return a < b;
}
test "remove before reusing capacity" {
    var q = queue.FixedPriorityQueue(u8, 1, before).init();
    try q.insert(1);
    _ = try q.remove();
    try q.insert(2);
}
