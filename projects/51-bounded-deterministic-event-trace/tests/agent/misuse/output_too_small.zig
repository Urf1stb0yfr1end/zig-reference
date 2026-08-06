const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "ZIGREF-EVENT-TRACE-OUTPUT-TOO-SMALL" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    _ = try t.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 });
    const before = t;
    var out: [1]u8 = undefined;
    try std.testing.expectError(error.OutputTooSmall, t.render(&out));
    try std.testing.expectEqualDeep(before, t);
}
