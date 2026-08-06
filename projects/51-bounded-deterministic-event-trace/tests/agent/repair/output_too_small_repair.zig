const std = @import("std");
const m = @import("bounded-deterministic-event-trace");
test "size output" {
    var t = m.BoundedDeterministicEventTrace(1).init();
    var out: [256]u8 = undefined;
    try std.testing.expect((try t.render(&out)).len > 0);
}
