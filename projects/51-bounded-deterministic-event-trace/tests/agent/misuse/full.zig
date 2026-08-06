const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "ZIGREF-EVENT-TRACE-FULL" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    const e = m.EventInput{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 };
    _ = try t.append(e);
    const before = t;
    try std.testing.expectError(error.TraceFull, t.append(e));
    try std.testing.expectEqualDeep(before, t);
}
