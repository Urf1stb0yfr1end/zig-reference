const queue = @import("fixed-capacity-priority-queue");
fn before(a: u8, b: u8) bool {
    return a < b;
}
test "capacity error is explicit" {
    var q = queue.FixedPriorityQueue(u8, 1, before).init();
    try q.insert(1);
    try @import("std").testing.expectError(error.Full, q.insert(2));
}
