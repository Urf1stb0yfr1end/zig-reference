const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "handle full" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    _ = try t.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 });
    try std.testing.expectError(error.TraceFull, t.append(.{ .domain = 1, .kind = 2, .subject = 0, .argument_a = 0, .argument_b = 0 }));
}
