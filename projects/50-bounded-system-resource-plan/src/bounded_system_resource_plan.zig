const std = @import("std");
const bounded = @import("bounded-integer");
const casts = @import("checked-integer-cast");
const alignment = @import("aligned-address-and-size-helpers");
const bump = @import("fixed-bump-allocator");
const topo = @import("fixed-capacity-topological-sort");

pub const PostSealAllocation = enum { permitted, forbidden };
pub const DependencyEdge = struct { before: usize, after: usize };

pub const CapacityConfiguration = struct {
    maximum_tasks: usize,
    maximum_priorities: usize,
    maximum_handles: usize,
    maximum_initialization_nodes: usize,
    maximum_initialization_edges: usize,
    trace_event_capacity: usize,
    boot_arena_bytes: usize,
};

pub const Description = struct {
    total_memory: u64,
    page_size: u64,
    initialization_node_count: usize,
    initialization_edges: []const DependencyEdge,
    device_state_bytes: u64,
    scheduler_storage_bytes: ?u64 = null,
    object_storage_bytes: ?u64 = null,
    page_table_bytes: ?u64 = null,
    post_seal_allocation: PostSealAllocation,
};

pub const TaskStorage = extern struct { state: u64, stack_base: u64, priority: u32, flags: u32 };
pub const HandleStorage = extern struct { generation: u32, object_index: u32 };
pub const TraceEventStorage = extern struct { sequence: u64, kind: u32, payload: u32 };

pub fn Planner(comptime capacities: CapacityConfiguration) type {
    return struct {
        const Self = @This();
        const Graph = topo.FixedTopologicalGraph(capacities.maximum_initialization_nodes, capacities.maximum_initialization_edges);
        pub const ConcreteStorage = struct {
            tasks: [capacities.maximum_tasks]TaskStorage,
            handles: [capacities.maximum_handles]HandleStorage,
            trace_events: [capacities.trace_event_capacity]TraceEventStorage,
            boot_arena: [capacities.boot_arena_bytes]u8,
        };
        pub const Error = error{
            InvalidCapacity,
            InvalidAlignment,
            ArithmeticOverflow,
            MemoryExceeded,
            InvalidInitializationNode,
            InitializationCycle,
            TooManyInitializationEdges,
            OutputTooSmall,
        };
        pub const Plan = struct {
            scheduler_bytes: u64,
            object_bytes: u64,
            trace_bytes: u64,
            page_table_bytes: u64,
            device_state_bytes: u64,
            boot_arena_bytes: u64,
            required_memory: u64,
            declared_memory: u64,
            remaining_memory: u64,
            page_size: u64,
            post_seal_allocation: PostSealAllocation,
            initialization_order: Graph.Order,
            constraints_satisfied: bool,

            pub fn render(self: *const Plan, output: []u8) Error![]const u8 {
                var stream = std.io.fixedBufferStream(output);
                const writer = stream.writer();
                writer.print(
                    \\SYSTEM RESOURCE PLAN
                    \\Maximum tasks: {d}
                    \\Maximum priorities: {d}
                    \\Maximum handles: {d}
                    \\Maximum initialization nodes: {d}
                    \\Trace capacity: {d} events
                    \\Page size: {d} bytes
                    \\Post-seal allocation: {s}
                    \\Object storage: {d} bytes
                    \\Scheduler storage: {d} bytes
                    \\Trace storage: {d} bytes
                    \\Page-table reserve: {d} bytes
                    \\Device state: {d} bytes
                    \\Boot arena: {d} bytes
                    \\Required memory: {d} bytes
                    \\Declared memory: {d} bytes
                    \\Reserve: {d} bytes
                    \\Initialization graph: acyclic
                    \\Capacity constraints: satisfied
                    \\Arithmetic checks: satisfied
                    \\
                , .{ capacities.maximum_tasks, capacities.maximum_priorities, capacities.maximum_handles, capacities.maximum_initialization_nodes, capacities.trace_event_capacity, self.page_size, @tagName(self.post_seal_allocation), self.object_bytes, self.scheduler_bytes, self.trace_bytes, self.page_table_bytes, self.device_state_bytes, self.boot_arena_bytes, self.required_memory, self.declared_memory, self.remaining_memory }) catch return error.OutputTooSmall;
                return stream.getWritten();
            }
        };

        pub fn concreteStorageBytes() usize {
            return @sizeOf(ConcreteStorage);
        }

        pub fn plan(description: Description) Error!Plan {
            if (capacities.maximum_tasks == 0 or capacities.maximum_priorities == 0 or capacities.maximum_handles == 0 or capacities.maximum_initialization_nodes == 0 or capacities.trace_event_capacity == 0 or capacities.boot_arena_bytes == 0) return error.InvalidCapacity;
            const Priority = bounded.BoundedInteger(usize, 1, capacities.maximum_priorities);
            _ = Priority.init(capacities.maximum_priorities) catch return error.InvalidCapacity;
            const page_size = casts.checkedIntegerCast(usize, description.page_size) catch return error.ArithmeticOverflow;
            if (!alignment.isPowerOfTwo(page_size)) return error.InvalidAlignment;
            if (description.total_memory % description.page_size != 0) return error.InvalidAlignment;
            if (description.initialization_node_count == 0 or description.initialization_node_count > capacities.maximum_initialization_nodes) return error.InvalidCapacity;

            var graph = Graph.init(description.initialization_node_count) catch return error.InvalidCapacity;
            for (description.initialization_edges) |edge| graph.addEdge(edge.before, edge.after) catch |err| return switch (err) {
                error.InvalidNode => error.InvalidInitializationNode,
                error.Full => error.TooManyInitializationEdges,
                error.DuplicateEdge => error.InvalidInitializationNode,
                error.TooManyNodes => error.InvalidCapacity,
                error.Cycle => unreachable,
            };
            const order = graph.sort() catch |err| return switch (err) {
                error.Cycle => error.InitializationCycle,
                else => unreachable,
            };
            const scheduler = description.scheduler_storage_bytes orelse checkedMul(capacities.maximum_tasks, @sizeOf(TaskStorage)) catch return error.ArithmeticOverflow;
            const objects = description.object_storage_bytes orelse checkedMul(capacities.maximum_handles, @sizeOf(HandleStorage)) catch return error.ArithmeticOverflow;
            const trace = checkedMul(capacities.trace_event_capacity, @sizeOf(TraceEventStorage)) catch return error.ArithmeticOverflow;
            const tables = description.page_table_bytes orelse checkedMul(description.initialization_node_count, page_size) catch return error.ArithmeticOverflow;
            const boot: u64 = casts.checkedIntegerCast(u64, capacities.boot_arena_bytes) catch return error.ArithmeticOverflow;
            var required: u64 = 0;
            for ([_]u64{ scheduler, objects, trace, tables, description.device_state_bytes, boot }) |bytes| {
                const aligned = alignment.alignUp(casts.checkedIntegerCast(usize, bytes) catch return error.ArithmeticOverflow, page_size) catch |err| return switch (err) {
                    error.InvalidAlignment => error.InvalidAlignment,
                    error.Overflow => error.ArithmeticOverflow,
                };
                required = std.math.add(u64, required, casts.checkedIntegerCast(u64, aligned) catch return error.ArithmeticOverflow) catch return error.ArithmeticOverflow;
            }
            if (required > description.total_memory) return error.MemoryExceeded;
            return .{ .scheduler_bytes = scheduler, .object_bytes = objects, .trace_bytes = trace, .page_table_bytes = tables, .device_state_bytes = description.device_state_bytes, .boot_arena_bytes = boot, .required_memory = required, .declared_memory = description.total_memory, .remaining_memory = description.total_memory - required, .page_size = description.page_size, .post_seal_allocation = description.post_seal_allocation, .initialization_order = order, .constraints_satisfied = true };
        }

        pub fn layOutConcreteStorage(storage: *ConcreteStorage) Error!usize {
            var arena = bump.FixedBumpAllocator.init(std.mem.asBytes(storage));
            _ = arena.allocate(@sizeOf(@TypeOf(storage.tasks)), @alignOf(TaskStorage)) catch return error.ArithmeticOverflow;
            _ = arena.allocate(@sizeOf(@TypeOf(storage.handles)), @alignOf(HandleStorage)) catch return error.ArithmeticOverflow;
            _ = arena.allocate(@sizeOf(@TypeOf(storage.trace_events)), @alignOf(TraceEventStorage)) catch return error.ArithmeticOverflow;
            _ = arena.allocate(@sizeOf(@TypeOf(storage.boot_arena)), 1) catch return error.ArithmeticOverflow;
            return arena.used();
        }
    };
}

fn checkedMul(a: usize, b: usize) error{ArithmeticOverflow}!u64 {
    const product = std.math.mul(usize, a, b) catch return error.ArithmeticOverflow;
    return casts.checkedIntegerCast(u64, product) catch return error.ArithmeticOverflow;
}

test "general planner exact arithmetic, ordering, policy, storage, and failures" {
    const P = Planner(.{ .maximum_tasks = 2, .maximum_priorities = 2, .maximum_handles = 3, .maximum_initialization_nodes = 3, .maximum_initialization_edges = 3, .trace_event_capacity = 4, .boot_arena_bytes = 4096 });
    const edges = [_]DependencyEdge{ .{ .before = 1, .after = 2 }, .{ .before = 0, .after = 2 } };
    const description: Description = .{ .total_memory = 32768, .page_size = 4096, .initialization_node_count = 3, .initialization_edges = &edges, .device_state_bytes = 1, .post_seal_allocation = .forbidden };
    const result = try P.plan(description);
    try std.testing.expectEqualSlices(usize, &.{ 0, 1, 2 }, result.initialization_order.items());
    try std.testing.expectEqual(result.declared_memory - result.required_memory, result.remaining_memory);
    try std.testing.expectEqual(PostSealAllocation.forbidden, result.post_seal_allocation);
    var storage: P.ConcreteStorage = undefined;
    try std.testing.expectEqual(@sizeOf(P.ConcreteStorage), try P.layOutConcreteStorage(&storage));
    var insufficient = description;
    insufficient.total_memory = 4096;
    try std.testing.expectError(error.MemoryExceeded, P.plan(insufficient));
    var bad_align = description;
    bad_align.page_size = 3;
    try std.testing.expectError(error.InvalidAlignment, P.plan(bad_align));
    var overflow = description;
    overflow.scheduler_storage_bytes = std.math.maxInt(u64);
    try std.testing.expectError(error.ArithmeticOverflow, P.plan(overflow));
    const cycle = [_]DependencyEdge{ .{ .before = 0, .after = 1 }, .{ .before = 1, .after = 0 } };
    var cyclic = description;
    cyclic.initialization_edges = &cycle;
    try std.testing.expectError(error.InitializationCycle, P.plan(cyclic));
    const invalid = [_]DependencyEdge{.{ .before = 0, .after = 3 }};
    var invalid_nodes = description;
    invalid_nodes.initialization_edges = &invalid;
    try std.testing.expectError(error.InvalidInitializationNode, P.plan(invalid_nodes));
}
