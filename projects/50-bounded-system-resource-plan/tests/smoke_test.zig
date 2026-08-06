const std = @import("std");
const resource = @import("bounded-system-resource-plan");

test "external caller creates a bounded plan" {
    const P = resource.Planner(.{ .maximum_tasks = 1, .maximum_priorities = 1, .maximum_handles = 1, .maximum_initialization_nodes = 1, .maximum_initialization_edges = 0, .trace_event_capacity = 1, .boot_arena_bytes = 4096 });
    const plan = try P.plan(.{ .total_memory = 24576, .page_size = 4096, .initialization_node_count = 1, .initialization_edges = &.{}, .device_state_bytes = 1, .post_seal_allocation = .permitted });
    try std.testing.expect(plan.constraints_satisfied);
}
