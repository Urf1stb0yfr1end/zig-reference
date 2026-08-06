const std = @import("std");
const trace_module = @import("bounded-deterministic-event-trace");

test "external caller appends, inspects, and renders" {
    var trace = trace_module.BoundedDeterministicEventTrace(2).init();
    try std.testing.expectEqual(@as(u64, 0), try trace.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 }));
    try std.testing.expectEqual(@as(u64, 1), try trace.append(.{ .domain = 2, .kind = 3, .subject = 4, .argument_a = 5, .argument_b = 6 }));
    try std.testing.expectEqual(@as(usize, 2), trace.events().len);
    var output: [512]u8 = undefined;
    try std.testing.expect((try trace.render(&output)).len != 0);
}
