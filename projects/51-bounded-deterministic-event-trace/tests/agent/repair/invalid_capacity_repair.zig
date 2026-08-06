const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "positive capacity" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    try std.testing.expect(t.isEmpty());
}
