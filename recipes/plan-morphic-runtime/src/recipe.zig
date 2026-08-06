const std = @import("std");
const resource = @import("bounded-system-resource-plan");

pub const MorphicPlanner = resource.Planner(.{
    .maximum_tasks = 64,
    .maximum_priorities = 8,
    .maximum_handles = 512,
    .maximum_initialization_nodes = 64,
    .maximum_initialization_edges = 128,
    .trace_event_capacity = 4096,
    .boot_arena_bytes = 512 * 1024,
});

const edges = [_]resource.DependencyEdge{
    .{ .before = 0, .after = 2 },
    .{ .before = 1, .after = 2 },
    .{ .before = 2, .after = 3 },
};

pub fn canonicalPlan() MorphicPlanner.Error!MorphicPlanner.Plan {
    return MorphicPlanner.plan(.{
        .total_memory = 4 * 1024 * 1024,
        .page_size = 4096,
        .initialization_node_count = 4,
        .initialization_edges = &edges,
        .device_state_bytes = 16 * 1024,
        .post_seal_allocation = .forbidden,
    });
}

pub fn renderMorphic(plan: *const MorphicPlanner.Plan, output: []u8) MorphicPlanner.Error![]const u8 {
    var stream = std.io.fixedBufferStream(output);
    const writer = stream.writer();
    writer.writeAll("MORPHIC SYSTEM PLAN\nArchitecture: riscv64\n") catch return error.OutputTooSmall;
    var general: [2048]u8 = undefined;
    const body = try plan.render(&general);
    const prefix = "SYSTEM RESOURCE PLAN\n";
    writer.writeAll(body[prefix.len..]) catch return error.OutputTooSmall;
    return stream.getWritten();
}

pub fn main() !void {
    const plan = try canonicalPlan();
    var output: [2048]u8 = undefined;
    const text = try renderMorphic(&plan, &output);
    try std.io.getStdOut().writer().writeAll(text);
}

test "canonical Morphic plan is exact, deterministic, bounded, and composed" {
    const first = try canonicalPlan();
    const second = try canonicalPlan();
    var a: [2048]u8 = undefined;
    var b: [2048]u8 = undefined;
    const rendered_a = try renderMorphic(&first, &a);
    const rendered_b = try renderMorphic(&second, &b);
    try std.testing.expectEqualStrings(rendered_a, rendered_b);
    try std.testing.expect(std.mem.indexOf(u8, rendered_a, "Post-seal allocation: forbidden") != null);
    try std.testing.expectEqual(first.declared_memory - first.required_memory, first.remaining_memory);
    comptime {
        if (@sizeOf(MorphicPlanner.ConcreteStorage) != MorphicPlanner.concreteStorageBytes()) @compileError("storage and capacity derivation disagree");
    }
    var storage: MorphicPlanner.ConcreteStorage = undefined;
    try std.testing.expectEqual(@sizeOf(MorphicPlanner.ConcreteStorage), try MorphicPlanner.layOutConcreteStorage(&storage));

    try std.testing.expectError(error.MemoryExceeded, MorphicPlanner.plan(.{ .total_memory = 4096, .page_size = 4096, .initialization_node_count = 4, .initialization_edges = &edges, .device_state_bytes = 16384, .post_seal_allocation = .forbidden }));
    const cycle = [_]resource.DependencyEdge{ .{ .before = 0, .after = 1 }, .{ .before = 1, .after = 0 } };
    try std.testing.expectError(error.InitializationCycle, MorphicPlanner.plan(.{ .total_memory = 4 * 1024 * 1024, .page_size = 4096, .initialization_node_count = 2, .initialization_edges = &cycle, .device_state_bytes = 16384, .post_seal_allocation = .forbidden }));
}
