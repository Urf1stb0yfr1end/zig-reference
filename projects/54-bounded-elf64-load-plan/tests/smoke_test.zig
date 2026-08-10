const planner = @import("bounded-elf64-load-plan");
const std = @import("std");
test "external caller sees bounded planner contract" {
    try std.testing.expectEqual(@as(u16, 243), planner.riscv_machine);
    try std.testing.expectEqual(@as(usize, 64), planner.max_program_headers);
    try std.testing.expect(@sizeOf(planner.LoadPlan(2)) > 0);
}
