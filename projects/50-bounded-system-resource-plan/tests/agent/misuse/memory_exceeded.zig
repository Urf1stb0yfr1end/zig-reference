const r = @import("bounded-system-resource-plan");
const P = r.Planner(.{ .maximum_tasks = 1, .maximum_priorities = 1, .maximum_handles = 1, .maximum_initialization_nodes = 2, .maximum_initialization_edges = 2, .trace_event_capacity = 1, .boot_arena_bytes = 4096 });
test "memory_exceeded is rejected" {
    try @import("std").testing.expectError(error.MemoryExceeded, P.plan(.{ .total_memory = 4096, .page_size = 4096, .initialization_node_count = 1, .initialization_edges = &.{}, .device_state_bytes = 1, .post_seal_allocation = .forbidden }));
}
