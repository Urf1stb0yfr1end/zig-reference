const std = @import("std");

const ModuleSpec = struct { name: []const u8, source: []const u8, dependencies: []const []const u8 };
const specs = [_]ModuleSpec{
    .{ .name = "fixed-capacity-vector", .source = "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig", .dependencies = &.{} },
    .{ .name = "dynamic-array", .source = "projects/01-dynamic-array/src/dynamic_array.zig", .dependencies = &.{} },
    .{ .name = "ring-buffer", .source = "projects/02-ring-buffer/src/ring_buffer.zig", .dependencies = &.{} },
    .{ .name = "bit-set", .source = "projects/03-bit-set/src/bit_set.zig", .dependencies = &.{} },
    .{ .name = "bounded-byte-reader", .source = "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig", .dependencies = &.{} },
    .{ .name = "stack", .source = "projects/05-stack/src/stack.zig", .dependencies = &.{"dynamic-array"} },
    .{ .name = "byte-writer", .source = "projects/06-byte-writer/src/byte_writer.zig", .dependencies = &.{"dynamic-array"} },
    .{ .name = "bitmap-allocator", .source = "projects/07-bitmap-allocator/src/bitmap_allocator.zig", .dependencies = &.{"bit-set"} },
    .{ .name = "generational-handles", .source = "projects/08-generational-handles/src/generational_handles.zig", .dependencies = &.{} },
    .{ .name = "state-machine", .source = "projects/09-state-machine/src/state_machine.zig", .dependencies = &.{} },
    .{ .name = "checked-integer-cast", .source = "projects/10-checked-integer-cast/src/checked_integer_cast.zig", .dependencies = &.{} },
    .{ .name = "nonzero-integer", .source = "projects/11-nonzero-integer/src/nonzero_integer.zig", .dependencies = &.{} },
    .{ .name = "bounded-integer", .source = "projects/12-bounded-integer/src/bounded_integer.zig", .dependencies = &.{} },
    .{ .name = "saturating-counter", .source = "projects/13-saturating-counter/src/saturating_counter.zig", .dependencies = &.{} },
    .{ .name = "validated-enum-decoder", .source = "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig", .dependencies = &.{} },
    .{ .name = "aligned-address-and-size-helpers", .source = "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig", .dependencies = &.{} },
    .{ .name = "validated-bit-flags", .source = "projects/16-validated-bit-flags/src/validated_bit_flags.zig", .dependencies = &.{} },
    .{ .name = "checked-half-open-range", .source = "projects/17-checked-half-open-range/src/checked_half_open_range.zig", .dependencies = &.{} },
    .{ .name = "distinct-memory-address-types", .source = "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig", .dependencies = &.{} },
    .{ .name = "wrapping-sequence-number", .source = "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig", .dependencies = &.{} },
    .{ .name = "optional-typed-handle", .source = "projects/20-optional-typed-handle/src/optional_typed_handle.zig", .dependencies = &.{} },
    .{ .name = "unit-safe-quantity", .source = "projects/21-unit-safe-quantity/src/unit_safe_quantity.zig", .dependencies = &.{} },
    .{ .name = "endian-integer-codec", .source = "projects/22-endian-integer-codec/src/endian_integer_codec.zig", .dependencies = &.{} },
    .{ .name = "validated-ascii-byte", .source = "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig", .dependencies = &.{} },
    .{ .name = "fourcc-code", .source = "projects/24-fourcc-code/src/fourcc_code.zig", .dependencies = &.{} },
    .{ .name = "semantic-version", .source = "projects/25-semantic-version/src/semantic_version.zig", .dependencies = &.{} },
    .{ .name = "tagged-result", .source = "projects/26-tagged-result/src/tagged_result.zig", .dependencies = &.{} },
    .{ .name = "source-span", .source = "projects/27-source-span/src/source_span.zig", .dependencies = &.{} },
    .{ .name = "physical-page-frame-number-and-address-conversion", .source = "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig", .dependencies = &.{"distinct-memory-address-types"} },
    .{ .name = "binary-cursor-checkpoint", .source = "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig", .dependencies = &.{"bounded-byte-reader"} },
    .{ .name = "bounded-binary-sub-reader", .source = "projects/30-bounded-binary-sub-reader/src/bounded_binary_sub_reader.zig", .dependencies = &.{ "bounded-byte-reader", "binary-cursor-checkpoint" } },
    .{ .name = "length-prefixed-binary-field", .source = "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig", .dependencies = &.{ "bounded-byte-reader", "checked-integer-cast", "endian-integer-codec", "binary-cursor-checkpoint", "bounded-binary-sub-reader" } },
    .{ .name = "type-length-value-decoder", .source = "projects/32-type-length-value-decoder/src/type_length_value_decoder.zig", .dependencies = &.{ "bounded-byte-reader", "checked-integer-cast", "endian-integer-codec", "binary-cursor-checkpoint", "bounded-binary-sub-reader", "length-prefixed-binary-field" } },
    .{ .name = "owned-byte-buffer", .source = "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig", .dependencies = &.{ "dynamic-array", "byte-writer" } },
    .{ .name = "fixed-capacity-object-pool", .source = "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig", .dependencies = &.{ "bitmap-allocator", "generational-handles" } },
    .{ .name = "physical-memory-region-set", .source = "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig", .dependencies = &.{ "fixed-capacity-vector", "validated-enum-decoder", "checked-half-open-range", "distinct-memory-address-types", "physical-page-frame-number-and-address-conversion" } },
    .{ .name = "physical-page-frame-allocator", .source = "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig", .dependencies = &.{ "bit-set", "bitmap-allocator", "checked-half-open-range", "distinct-memory-address-types", "physical-page-frame-number-and-address-conversion", "physical-memory-region-set" } },
    .{ .name = "elf64-file-header-parser", .source = "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig", .dependencies = &.{ "bounded-byte-reader", "checked-integer-cast", "validated-enum-decoder", "checked-half-open-range", "endian-integer-codec", "binary-cursor-checkpoint" } },
    .{ .name = "elf64-program-header-parser", .source = "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig", .dependencies = &.{ "fixed-capacity-vector", "bounded-byte-reader", "checked-integer-cast", "validated-enum-decoder", "aligned-address-and-size-helpers", "validated-bit-flags", "checked-half-open-range", "distinct-memory-address-types", "endian-integer-codec", "binary-cursor-checkpoint", "bounded-binary-sub-reader", "elf64-file-header-parser" } },
};

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});
    const check_command = b.addSystemCommand(&.{ "python3", "tools/module-contract-consistency-checker.py" });
    const check_step = b.step("check-module-contracts", "Validate schema, formatting, paths, public surfaces, dependencies, catalog, and build registrations");
    check_step.dependOn(&check_command.step);
    const port_check_command = b.addSystemCommand(&.{ "node", "tools/check-port-contracts.js" });
    const port_check_step = b.step("check-port-contracts", "Validate static module port contracts and the port index");
    port_check_step.dependOn(&port_check_command.step);
    const port_format_command = b.addSystemCommand(&.{ "node", "tools/format-port-contracts.js" });
    const port_format_step = b.step("format-port-contracts", "Canonically format every module port contract");
    port_format_step.dependOn(&port_format_command.step);
    const port_index_command = b.addSystemCommand(&.{ "node", "tools/generate-port-index.js" });
    const port_index_step = b.step("generate-port-index", "Regenerate ports.json from module port contracts");
    port_index_step.dependOn(&port_index_command.step);
    const portability_smoke_command = b.addSystemCommand(&.{ "node", "tools/portability-smoke-test.js" });
    const portability_smoke_step = b.step("smoke-portability-infrastructure", "Prove port contracts are discoverable and topologically coherent");
    portability_smoke_step.dependOn(&portability_smoke_command.step);

    const policy_command = b.addSystemCommand(&.{ "python3", "tools/check-repository-policy.py" });
    const policy_step = b.step("check", "Validate contracts, ports, generated drift, graphs, and artifact policy");
    policy_step.dependOn(&policy_command.step);
    policy_step.dependOn(check_step);
    policy_step.dependOn(port_check_step);
    const index_command = b.addSystemCommand(&.{ "python3", "tools/build-repository-index.py" });
    const index_step = b.step("index", "Regenerate deterministic textual repository indexes");
    index_step.dependOn(&index_command.step);
    const index_check_command = b.addSystemCommand(&.{ "python3", "tools/build-repository-index.py", "--check" });
    policy_step.dependOn(&index_check_command.step);
    const graph_command = b.addSystemCommand(&.{ "python3", "tools/build-dependency-graphs.py" });
    const graph_step = b.step("graph", "Regenerate and validate textual dependency graphs");
    graph_step.dependOn(&graph_command.step);
    const graph_check_command = b.addSystemCommand(&.{ "python3", "tools/build-dependency-graphs.py", "--check" });
    policy_step.dependOn(&graph_check_command.step);
    const database_command = b.addSystemCommand(&.{ "python3", "tools/build-repository-database.py" });
    const database_step = b.step("database", "Generate an ignored local SQLite acceleration index");
    database_step.dependOn(&database_command.step);
    const database_check_command = b.addSystemCommand(&.{ "python3", "tools/build-repository-database.py", "--check" });
    const status_command = b.addSystemCommand(&.{ "python3", "tools/status.py" });
    const status_step = b.step("status", "Print evidence-backed repository health");
    status_step.dependOn(&status_command.step);
    const query_command = b.addSystemCommand(&.{ "python3", "tools/query-reference.py", "status" });
    const query_step = b.step("query", "Run the default repository status query; use the Python tool for arguments");
    query_step.dependOn(&query_command.step);
    const property_command = b.addSystemCommand(&.{ "python3", "tools/test-specialized-levels.py", "property" });
    const property_step = b.step("property", "Run configured deterministic property infrastructure checks");
    property_step.dependOn(&property_command.step);
    const fuzz_command = b.addSystemCommand(&.{ "python3", "tools/test-specialized-levels.py", "fuzz-smoke" });
    const fuzz_step = b.step("fuzz-smoke", "Run bounded generated-input fuzz infrastructure checks");
    fuzz_step.dependOn(&fuzz_command.step);
    const differential_command = b.addSystemCommand(&.{ "python3", "tools/test-specialized-levels.py", "differential" });
    const differential_step = b.step("differential", "Run configured differential infrastructure checks");
    differential_step.dependOn(&differential_command.step);

    var modules: [specs.len]*std.Build.Module = undefined;
    for (specs, 0..) |spec, i| {
        modules[i] = b.createModule(.{ .root_source_file = b.path(spec.source), .target = target, .optimize = optimize });
    }
    for (specs, 0..) |spec, i| {
        for (spec.dependencies) |dependency_name| modules[i].addImport(dependency_name, findModule(dependency_name, &modules));
    }

    const smoke_all = b.step("smoke", "Run every external-consumer smoke test");
    smoke_all.dependOn(portability_smoke_step);
    const test_all = b.step("test", "Run contract checks, unit tests, and smoke tests");
    test_all.dependOn(check_step);
    test_all.dependOn(port_check_step);
    const recipes_step = b.step("recipes", "Run unit tests for modules used by the initial composition recipes");
    const conformance_step = b.step("conformance", "Run behavioral tests for the initial conformance module families");
    for (specs, 0..) |spec, i| {
        const unit_tests = b.addTest(.{ .root_module = modules[i] });
        const run_unit = b.addRunArtifact(unit_tests);
        const unit_step = b.step(b.fmt("test-{s}", .{spec.name}), b.fmt("Run {s} unit tests", .{spec.name}));
        unit_step.dependOn(&run_unit.step);
        test_all.dependOn(&run_unit.step);
        // These aggregate steps deliberately execute real behavioral module tests rather than empty harnesses.
        if (i <= 9 or i == 17 or i == 22 or i == 28) recipes_step.dependOn(&run_unit.step);
        if (i <= 8 or i == 17 or i == 22) conformance_step.dependOn(&run_unit.step);

        const smoke_module = b.createModule(.{ .root_source_file = b.path(b.fmt("projects/{s}/tests/smoke_test.zig", .{directoryFor(spec.name)})), .target = target, .optimize = optimize });
        smoke_module.addImport(spec.name, modules[i]);
        for (spec.dependencies) |dependency_name| smoke_module.addImport(dependency_name, findModule(dependency_name, &modules));
        const smoke_tests = b.addTest(.{ .root_module = smoke_module });
        const run_smoke = b.addRunArtifact(smoke_tests);
        const smoke_step = b.step(b.fmt("smoke-{s}", .{spec.name}), b.fmt("Run {s} external smoke test", .{spec.name}));
        smoke_step.dependOn(&run_smoke.step);
        smoke_all.dependOn(&run_smoke.step);
        test_all.dependOn(&run_smoke.step);
    }

    const validate_step = b.step("validate-repository", "Run the complete repository validation pipeline");
    validate_step.dependOn(policy_step);
    validate_step.dependOn(&database_check_command.step);
    validate_step.dependOn(test_all);
    validate_step.dependOn(smoke_all);
    validate_step.dependOn(recipes_step);
    validate_step.dependOn(conformance_step);
    validate_step.dependOn(property_step);
    validate_step.dependOn(fuzz_step);
    validate_step.dependOn(differential_step);
}

fn findModule(name: []const u8, modules: []const *std.Build.Module) *std.Build.Module {
    for (specs, modules) |spec, module| if (std.mem.eql(u8, spec.name, name)) return module;
    @panic("unknown repository module dependency");
}

fn directoryFor(name: []const u8) []const u8 {
    for (specs) |spec| if (std.mem.eql(u8, spec.name, name)) {
        const prefix = "projects/";
        const suffix = "/src/";
        const start = prefix.len;
        const end = std.mem.indexOfPos(u8, spec.source, start, suffix) orelse @panic("invalid source path");
        return spec.source[start..end];
    };
    @panic("unknown module");
}
