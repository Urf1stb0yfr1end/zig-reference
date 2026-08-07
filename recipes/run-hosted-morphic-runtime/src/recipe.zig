const std = @import("std");
const resource = @import("bounded-system-resource-plan");
const scheduler_module = @import("bounded-deterministic-scheduler");
const trace_module = @import("bounded-deterministic-event-trace");

const Planner = resource.Planner(.{ .maximum_tasks = 4, .maximum_priorities = 2, .maximum_handles = 4, .maximum_initialization_nodes = 3, .maximum_initialization_edges = 2, .trace_event_capacity = 16, .boot_arena_bytes = 4096 });
const Scheduler = scheduler_module.BoundedDeterministicScheduler(4);
const Trace = trace_module.BoundedDeterministicEventTrace(16);
const edges = [_]resource.DependencyEdge{ .{ .before = 0, .after = 1 }, .{ .before = 1, .after = 2 } };

pub const RunError = Planner.Error || Scheduler.ScheduleError || Scheduler.AdvanceError || Trace.AppendError || error{OutputTooSmall};

pub fn run(output: []u8, trace_output: []u8) RunError!struct { output: []const u8, trace: []const u8 } {
    _ = try Planner.plan(.{ .total_memory = 65536, .page_size = 4096, .initialization_node_count = 3, .initialization_edges = &edges, .device_state_bytes = 1024, .post_seal_allocation = .forbidden });
    var scheduler = Scheduler.init(0);
    var trace = Trace.init();
    var stream = std.io.fixedBufferStream(output);
    const writer = stream.writer();
    _ = try trace.append(.{ .domain = 1, .kind = 1, .subject = 0, .argument_a = 0, .argument_b = 0 });
    try scheduler.schedule(.{ .id = 2, .ready_at = 5, .priority = 1 });
    try scheduler.schedule(.{ .id = 1, .ready_at = 5, .priority = 0 });
    _ = try trace.append(.{ .domain = 2, .kind = 2, .subject = 0, .argument_a = 2, .argument_b = 0 });
    try scheduler.advanceTo(5);
    _ = try trace.append(.{ .domain = 3, .kind = 3, .subject = 0, .argument_a = 5, .argument_b = 0 });
    while (scheduler.nextReady()) |task| {
        writer.print("task {d} at {d}\n", .{ task.id, scheduler.now() }) catch return error.OutputTooSmall;
        _ = try trace.append(.{ .domain = 2, .kind = 4, .subject = task.id, .argument_a = scheduler.now(), .argument_b = task.priority });
    }
    _ = try trace.append(.{ .domain = 1, .kind = 5, .subject = 0, .argument_a = 5, .argument_b = 0 });
    return .{ .output = stream.getWritten(), .trace = try trace.render(trace_output) };
}

pub fn main() !void {
    var output: [128]u8 = undefined; var trace: [2048]u8 = undefined;
    const result = try run(&output, &trace);
    try std.io.getStdOut().writer().writeAll(result.output);
    try std.io.getStdOut().writer().writeAll(result.trace);
}

test "hosted Morphic run is byte repeatable" {
    var oa: [128]u8 = undefined; var ob: [128]u8 = undefined; var ta: [2048]u8 = undefined; var tb: [2048]u8 = undefined;
    const a = try run(&oa, &ta); const b = try run(&ob, &tb);
    try std.testing.expectEqualStrings(a.output, b.output); try std.testing.expectEqualStrings(a.trace, b.trace);
    try std.testing.expectEqualStrings("task 1 at 5\ntask 2 at 5\n", a.output);
}

test "output exhaustion is explicit" {
    var output: [1]u8 = undefined; var trace: [2048]u8 = undefined;
    try std.testing.expectError(error.OutputTooSmall, run(&output, &trace));
}
