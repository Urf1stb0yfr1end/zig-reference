const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const fixed_vector_module = b.createModule(.{
        .root_source_file = b.path("projects/00-fixed-capacity-vector/src/fixed_vector.zig"),
        .target = target,
        .optimize = optimize,
    });

    const fixed_vector_tests = b.addTest(.{
        .root_module = fixed_vector_module,
    });
    const run_fixed_vector_tests = b.addRunArtifact(fixed_vector_tests);

    const fixed_vector_step = b.step(
        "test-fixed-vector",
        "Run the fixed-capacity vector tests",
    );
    fixed_vector_step.dependOn(&run_fixed_vector_tests.step);

    const all_tests_step = b.step("test", "Run all reference-project tests");
    all_tests_step.dependOn(&run_fixed_vector_tests.step);
}
