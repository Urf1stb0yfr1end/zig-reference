const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const all_tests_step = b.step("test", "Run all reference-project tests");

    addTestProject(b, target, optimize, all_tests_step, "test-fixed-vector", "Run the fixed-capacity vector tests", "projects/00-fixed-capacity-vector/src/fixed_vector.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-dynamic-array", "Run the dynamic array tests", "projects/02-dynamic-array/src/dynamic_array.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-ring-buffer", "Run the ring buffer tests", "projects/03-ring-buffer/src/ring_buffer.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-bit-set", "Run the fixed bit set tests", "projects/03-bit-set/src/bit_set.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-bounded-reader", "Run the bounded byte reader tests", "projects/04-bounded-byte-reader/src/bounded_reader.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-stack", "Run the stack tests", "projects/05-stack/src/stack.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-byte-writer", "Run the byte writer tests", "projects/06-byte-writer/src/byte_writer.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-bitmap-allocator", "Run the bitmap allocator tests", "projects/07-bitmap-allocator/src/bitmap_allocator.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-generational-handles", "Run the generational handle table tests", "projects/08-generational-handles/src/generational_handles.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-state-machine", "Run the explicit state machine tests", "projects/09-state-machine/src/state_machine.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-checked-integer-cast", "Run the checked integer cast tests", "projects/10-checked-integer-cast/src/checked_integer_cast.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-nonzero-integer", "Run the nonzero integer tests", "projects/11-nonzero-integer/src/nonzero_integer.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-bounded-integer", "Run the bounded integer tests", "projects/12-bounded-integer/src/bounded_integer.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-saturating-counter", "Run the saturating counter tests", "projects/13-saturating-counter/src/saturating_counter.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-validated-enum-decoder", "Run the validated enum decoder tests", "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-alignment-helpers", "Run the alignment helper tests", "projects/15-aligned-address-and-size-helpers/src/alignment_helpers.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-validated-bit-flags", "Run the validated bit flags tests", "projects/16-validated-bit-flags/src/validated_bit_flags.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-checked-half-open-range", "Run the checked half-open range tests", "projects/17-checked-half-open-range/src/checked_half_open_range.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-distinct-memory-address-types", "Run the distinct memory address type tests", "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-wrapping-sequence-number", "Run the wrapping sequence number tests", "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-optional-typed-handle", "Run the optional typed handle tests", "projects/20-optional-typed-handle/src/optional_typed_handle.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-unit-safe-quantity", "Run the unit-safe quantity tests", "projects/21-unit-safe-quantity/src/unit_safe_quantity.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-endian-integer-codec", "Run the endian integer codec tests", "projects/22-endian-integer-codec/src/endian_integer_codec.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-validated-ascii-byte", "Run the validated ASCII byte tests", "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-fourcc-code", "Run the FourCC tests", "projects/24-fourcc-code/src/fourcc_code.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-semantic-version", "Run the semantic version tests", "projects/25-semantic-version/src/semantic_version.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-tagged-result", "Run the tagged result tests", "projects/26-tagged-result/src/tagged_result.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-source-span", "Run the source span tests", "projects/27-source-span/src/source_span.zig");
    addTestProject(b, target, optimize, all_tests_step, "test-physical-page-frame-conversion", "Run the physical page frame conversion tests", "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_conversion.zig");
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

    const tests = b.addTest(.{ .root_module = module });
    const run_tests = b.addRunArtifact(tests);

    const project_step = b.step(step_name, description);
    project_step.dependOn(&run_tests.step);
    all_tests_step.dependOn(&run_tests.step);
}
