const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const all_tests_step = b.step("test", "Run all reference-project tests");

    addTestProject(
        b,
        target,
        optimize,
        all_tests_step,
        "test-fixed-vector",
        "Run the fixed-capacity vector tests",
        "projects/00-fixed-capacity-vector/src/fixed_vector.zig",
    );

    addTestProject(
        b,
        target,
        optimize,
        all_tests_step,
        "test-dynamic-array",
        "Run the dynamic array tests",
        "projects/02-dynamic-array/src/dynamic_array.zig",
    );

    addTestProject(
        b,
        target,
        optimize,
        all_tests_step,
        "test-ring-buffer",
        "Run the ring buffer tests",
        "projects/03-ring-buffer/src/ring_buffer.zig",
    );
}

fn addTestProject(
    b: *std.Build,
    target: std.Build.ResolvedTarget,
    optimize: std.builtin.OptimizeMode,
    all_tests_step: *std.Build.Step,
    step_name: []const u8,
    description: []const u8,
    source_path: []const u8,
) void {
    const module = b.createModule(.{
        .root_source_file = b.path(source_path),
        .target = target,
        .optimize = optimize,
    });

    const tests = b.addTest(.{
        .root_module = module,
    });
    const run_tests = b.addRunArtifact(tests);

    const project_step = b.step(step_name, description);
    project_step.dependOn(&run_tests.step);
    all_tests_step.dependOn(&run_tests.step);
}
