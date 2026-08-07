const scheduler_module = @import("bounded-deterministic-scheduler");
const std = @import("std");
test "external caller controls time and observes deterministic order" {
    var scheduler = scheduler_module.BoundedDeterministicScheduler(2).init(0);
    try scheduler.schedule(.{ .id = 7, .ready_at = 1, .priority = 0 });
    try std.testing.expect(scheduler.nextReady() == null);
    try scheduler.advanceTo(1);
    try std.testing.expectEqual(@as(u32, 7), scheduler.nextReady().?.id);
}
