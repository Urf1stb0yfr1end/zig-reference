const std = @import("std");
const scheduler = @import("bounded-deterministic-scheduler");
test "monotonic caller time succeeds" {
    var value = scheduler.BoundedDeterministicScheduler(1).init(5);
    try value.advanceTo(5);
    try std.testing.expectEqual(@as(u64, 5), value.now());
}
