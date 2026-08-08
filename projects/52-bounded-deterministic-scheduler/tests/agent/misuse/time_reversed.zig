const std = @import("std");
const scheduler = @import("bounded-deterministic-scheduler");
test "backward caller time is rejected" {
    var value = scheduler.BoundedDeterministicScheduler(1).init(5);
    try std.testing.expectError(error.TimeReversed, value.advanceTo(4));
}
