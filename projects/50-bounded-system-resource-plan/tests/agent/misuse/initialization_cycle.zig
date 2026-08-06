const r = @import("bounded-system-resource-plan");
const P = r.Planner(.{ .maximum_tasks = 1, .maximum_priorities = 1, .maximum_handles = 1, .maximum_initialization_nodes = 2, .maximum_initialization_edges = 2, .trace_event_capacity = 1, .boot_arena_bytes = 4096 });
test "initialization_cycle is rejected" {
    try @import("std").testing.expectError(error.InitializationCycle, P.plan(.{ .total_memory = 24576, .page_size = 4096, .initialization_node_count = 2, .initialization_edges = &.{ .{ .before = 0, .after = 1 }, .{ .before = 1, .after = 0 } }, .device_state_bytes = 1, .post_seal_allocation = .forbidden }));
}
