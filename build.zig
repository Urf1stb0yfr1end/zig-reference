const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const vector_module = b.createModule(.{
        .root_source_file = b.path("projects/01-dynamic-array/src/vector.zig"),
        .target = target,
        .optimize = optimize,
    });

    const tests = b.addTest(.{
        .root_module = vector_module,
    });
    const run_tests = b.addRunArtifact(tests);

    const test_step = b.step("test", "Run all reference-project tests");
    test_step.dependOn(&run_tests.step);

    const example_module = b.createModule(.{
        .root_source_file = b.path("projects/01-dynamic-array/src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    example_module.addImport("reference_vector", vector_module);

    const example = b.addExecutable(.{
        .name = "dynamic-array",
        .root_module = example_module,
    });
    b.installArtifact(example);

    const run_example = b.addRunArtifact(example);
    if (b.args) |args| run_example.addArgs(args);

    const run_step = b.step("run-dynamic-array", "Run the dynamic-array example");
    run_step.dependOn(&run_example.step);
}
