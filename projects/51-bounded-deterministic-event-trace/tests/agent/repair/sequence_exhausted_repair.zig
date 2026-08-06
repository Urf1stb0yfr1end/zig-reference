const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "handle sequence error" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    const result = t.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 });
    try std.testing.expectEqual(@as(u64, 0), try result);
}
