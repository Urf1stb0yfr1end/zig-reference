const std = @import("std");
const resource_tables = @import("bounded-resource-table");

pub const deterministic_stdin: u32 = 0;
pub const live_console: u32 = 3;
pub const namespace_directory: u32 = 0x100;
pub const namespace_regular: u32 = 0x101;

pub const Plan = union(enum) {
    deterministic_fixture: struct { start: usize, end: usize },
    live_console,
    unsupported,
};

/// Keeps fixture-backed input exclusive to its historical backend. Namespace
/// identity is stored in resource state, so it must never be interpreted as a
/// fixture offset before real namespace read semantics exist.
pub fn plan(backend: u32, state: usize, requested: usize, fixture_length: usize) Plan {
    return switch (backend) {
        deterministic_stdin => if (state >= fixture_length)
            .{ .deterministic_fixture = .{ .start = fixture_length, .end = fixture_length } }
        else
            .{ .deterministic_fixture = .{ .start = state, .end = state + @min(requested, fixture_length - state) } },
        live_console => .live_console,
        namespace_directory, namespace_regular => .unsupported,
        else => .unsupported,
    };
}

test "namespace resources cannot consume deterministic stdin fixture state" {
    const manifest_identity = 4096;
    const fixture = "stdin-25b-proof";
    const Store = resource_tables.ResourceTable(1);
    var resources = Store{};
    const opened = try resources.create(.{
        .backend = @enumFromInt(namespace_regular),
        // Exercise defense in depth even if a future open adapter accidentally
        // reintroduces a premature generic read capability.
        .capabilities = .{ .read = true },
        .state = manifest_identity,
    });
    const before = resources.resolve(opened).?;
    const regular = plan(@intFromEnum(before.backend), before.state, fixture.len, fixture.len);
    const directory = plan(namespace_directory, manifest_identity, fixture.len, fixture.len);
    try std.testing.expect(regular == .unsupported);
    try std.testing.expect(directory == .unsupported);
    try std.testing.expectEqualDeep(before, resources.resolve(opened).?);

    const historical = plan(deterministic_stdin, 2, 5, fixture.len);
    try std.testing.expectEqual(@as(usize, 2), historical.deterministic_fixture.start);
    try std.testing.expectEqual(@as(usize, 7), historical.deterministic_fixture.end);
}
