const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "ZIGREF-EVENT-TRACE-SEQUENCE-EXHAUSTED contract" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    try std.testing.expectEqual(@as(u64, 0), try t.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 }));
    try std.testing.expect(t.isFull());
}
