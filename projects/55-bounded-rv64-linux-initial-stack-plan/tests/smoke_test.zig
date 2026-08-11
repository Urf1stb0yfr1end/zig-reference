const stack = @import("bounded-rv64-linux-initial-stack-plan");
const std = @import("std");
test "external named import constructs canonical image" {
    const argv = [_][]const u8{"app"};
    const made = try stack.plan(128, 1, 0, 1, try stack.GuestStackRange.init(0x8000, 0x8080), &argv, &.{}, &[_]stack.AuxEntry{.{ .type = 6, .value = .{ .immediate = 4096 } }});
    try std.testing.expectEqual(@as(usize, 0), made.initial_sp.raw() % stack.stack_alignment);
    try std.testing.expect(made.bytes().len <= 128);
}
