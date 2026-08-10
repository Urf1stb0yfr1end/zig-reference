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
    .{ .name = "intrusive-doubly-linked-list", .source = "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig", .dependencies = &.{} },
    .{ .name = "fixed-free-list", .source = "projects/40-fixed-free-list/src/fixed_free_list.zig", .dependencies = &.{} },
    .{ .name = "fixed-bump-allocator", .source = "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig", .dependencies = &.{"aligned-address-and-size-helpers"} },
    .{ .name = "fixed-capacity-priority-queue", .source = "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig", .dependencies = &.{"fixed-capacity-vector"} },
    .{ .name = "fixed-capacity-topological-sort", .source = "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig", .dependencies = &.{ "fixed-capacity-vector", "fixed-capacity-priority-queue" } },
    .{ .name = "riscv-sv39-page-table-entry", .source = "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig", .dependencies = &.{} },
    .{ .name = "riscv-sv39-virtual-address-indexing", .source = "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig", .dependencies = &.{} },
    .{ .name = "riscv-page-table-page-owner", .source = "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig", .dependencies = &.{} },
    .{ .name = "riscv-sv39-page-table-walker", .source = "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig", .dependencies = &.{ "riscv-sv39-page-table-entry", "riscv-sv39-virtual-address-indexing", "riscv-page-table-page-owner" } },
    .{ .name = "riscv-sfence-vma-invalidation", .source = "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig", .dependencies = &.{} },
    .{ .name = "riscv-sv39-page-table-builder", .source = "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig", .dependencies = &.{ "riscv-sv39-page-table-entry", "riscv-sv39-virtual-address-indexing", "riscv-page-table-page-owner", "riscv-sv39-page-table-walker", "riscv-sfence-vma-invalidation" } },
    .{ .name = "bounded-system-resource-plan", .source = "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig", .dependencies = &.{ "bounded-integer", "checked-integer-cast", "aligned-address-and-size-helpers", "fixed-bump-allocator", "fixed-capacity-topological-sort" } },
    .{ .name = "bounded-deterministic-event-trace", .source = "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig", .dependencies = &.{} },
    .{ .name = "bounded-deterministic-scheduler", .source = "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig", .dependencies = &.{"fixed-capacity-priority-queue"} },
    .{ .name = "bounded-user-memory-transfer-plan", .source = "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig", .dependencies = &.{ "fixed-capacity-vector", "checked-half-open-range", "distinct-memory-address-types" } },
};

const RecipeSpec = struct { name: []const u8, dependencies: []const []const u8 };
const AgentFixtureClass = enum { runtime_negative_test, repair, future_analyzer_expectation };
const AgentFixtureSpec = struct { module: []const u8, path: []const u8, class: AgentFixtureClass };
const agent_fixture_specs = [_]AgentFixtureSpec{
    .{ .module = "fixed-capacity-object-pool", .path = "projects/34-fixed-capacity-object-pool/tests/agent/misuse/pool_stale_handle.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-capacity-object-pool", .path = "projects/34-fixed-capacity-object-pool/tests/agent/repair/pool_stale_handle_repair.zig", .class = .repair },
    .{ .module = "fixed-capacity-object-pool", .path = "projects/34-fixed-capacity-object-pool/tests/agent/misuse/pool_double_release.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-capacity-object-pool", .path = "projects/34-fixed-capacity-object-pool/tests/agent/repair/pool_double_release_repair.zig", .class = .repair },
    .{ .module = "fixed-free-list", .path = "projects/40-fixed-free-list/tests/agent/misuse/freelist_double_release.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-free-list", .path = "projects/40-fixed-free-list/tests/agent/repair/freelist_double_release_repair.zig", .class = .repair },
    .{ .module = "fixed-bump-allocator", .path = "projects/41-fixed-bump-allocator/tests/agent/misuse/bump_use_after_reset.zig", .class = .future_analyzer_expectation },
    .{ .module = "fixed-bump-allocator", .path = "projects/41-fixed-bump-allocator/tests/agent/repair/bump_use_after_reset_repair.zig", .class = .repair },
    .{ .module = "fixed-capacity-priority-queue", .path = "projects/42-fixed-capacity-priority-queue/tests/agent/misuse/pqueue_capacity.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-capacity-priority-queue", .path = "projects/42-fixed-capacity-priority-queue/tests/agent/repair/pqueue_capacity_repair.zig", .class = .repair },
    .{ .module = "fixed-capacity-topological-sort", .path = "projects/43-fixed-capacity-topological-sort/tests/agent/misuse/topo_cycle.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-capacity-topological-sort", .path = "projects/43-fixed-capacity-topological-sort/tests/agent/repair/topo_cycle_repair.zig", .class = .repair },
    .{ .module = "fixed-capacity-topological-sort", .path = "projects/43-fixed-capacity-topological-sort/tests/agent/misuse/topo_invalid_vertex.zig", .class = .runtime_negative_test },
    .{ .module = "fixed-capacity-topological-sort", .path = "projects/43-fixed-capacity-topological-sort/tests/agent/repair/topo_invalid_vertex_repair.zig", .class = .repair },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/misuse/memory_exceeded.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/repair/memory_exceeded_repair.zig", .class = .repair },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/misuse/arithmetic_overflow.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/repair/arithmetic_overflow_repair.zig", .class = .repair },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/misuse/initialization_cycle.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/repair/initialization_cycle_repair.zig", .class = .repair },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/misuse/invalid_alignment.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/repair/invalid_alignment_repair.zig", .class = .repair },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/misuse/invalid_capacity.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-system-resource-plan", .path = "projects/50-bounded-system-resource-plan/tests/agent/repair/invalid_capacity_repair.zig", .class = .repair },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/misuse/full.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/repair/full_repair.zig", .class = .repair },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/misuse/output_too_small.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/repair/output_too_small_repair.zig", .class = .repair },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/misuse/sequence_exhausted.zig", .class = .runtime_negative_test },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/repair/sequence_exhausted_repair.zig", .class = .repair },
    .{ .module = "bounded-deterministic-event-trace", .path = "projects/51-bounded-deterministic-event-trace/tests/agent/repair/invalid_capacity_repair.zig", .class = .repair },
};
const recipe_specs = [_]RecipeSpec{
    .{ .name = "parse-length-prefixed-record", .dependencies = &.{ "bounded-byte-reader", "length-prefixed-binary-field" } },
    .{ .name = "create-stale-safe-object-registry", .dependencies = &.{"fixed-capacity-object-pool"} },
    .{ .name = "write-and-read-explicit-endian-record", .dependencies = &.{ "byte-writer", "bounded-byte-reader", "endian-integer-codec" } },
    .{ .name = "validate-physical-page-frame", .dependencies = &.{ "distinct-memory-address-types", "physical-page-frame-number-and-address-conversion" } },
    .{ .name = "construct-bounded-state-machine", .dependencies = &.{ "state-machine", "bounded-integer" } },
    .{ .name = "normalize-checked-memory-range", .dependencies = &.{ "checked-half-open-range", "aligned-address-and-size-helpers" } },
    .{ .name = "plan-bounded-initialization", .dependencies = &.{ "intrusive-doubly-linked-list", "fixed-free-list", "fixed-bump-allocator", "fixed-capacity-priority-queue", "fixed-capacity-topological-sort" } },
    .{ .name = "construct-and-verify-sv39-address-space", .dependencies = &.{ "riscv-sv39-page-table-entry", "riscv-sv39-virtual-address-indexing", "riscv-page-table-page-owner", "riscv-sv39-page-table-walker", "riscv-sfence-vma-invalidation", "riscv-sv39-page-table-builder" } },
    .{ .name = "plan-morphic-runtime", .dependencies = &.{"bounded-system-resource-plan"} },
    .{ .name = "trace-morphic-example", .dependencies = &.{"bounded-deterministic-event-trace"} },
    .{ .name = "run-hosted-morphic-runtime", .dependencies = &.{ "bounded-system-resource-plan", "bounded-deterministic-scheduler", "bounded-deterministic-event-trace" } },
};

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});
    const check_command = b.addSystemCommand(&.{ "python3", "tools/python-environment.py", "tools/module-contract-consistency-checker.py" });
    const check_step = b.step("check-module-contracts", "Validate schema, formatting, paths, public surfaces, dependencies, catalog, and build registrations");
    check_step.dependOn(&check_command.step);
    const agent_check_command = b.addSystemCommand(&.{ "python3", "tools/python-environment.py", "tools/validate-agent-contracts.py" });
    const agent_check_step = b.step("validate-agent-contracts", "Validate agent-readable modules and deterministic projections");
    agent_check_step.dependOn(&agent_check_command.step);
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
    policy_step.dependOn(agent_check_step);
    policy_step.dependOn(port_check_step);
    const command_reference_check = b.addSystemCommand(&.{ "python3", "tools/check-command-reference.py", "--check" });
    policy_step.dependOn(&command_reference_check.step);
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
    const status_command = b.addSystemCommand(&.{ "python3", "tools/status.py" });
    const status_step = b.step("status", "Print evidence-backed repository health");
    status_step.dependOn(&status_command.step);
    const evidence_check_command = b.addSystemCommand(&.{ "python3", "tools/python-environment.py", "tools/record-validation.py", "--check" });
    const evidence_check_step = b.step("check-validation-evidence", "Reject invalid, stale, or wrong-version module evidence");
    evidence_check_step.dependOn(&evidence_check_command.step);
    policy_step.dependOn(evidence_check_step);
    status_step.dependOn(evidence_check_step);
    status_step.dependOn(&index_check_command.step);
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
    for (agent_fixture_specs) |fixture| {
        const fixture_module = b.createModule(.{ .root_source_file = b.path(fixture.path), .target = target, .optimize = optimize });
        fixture_module.addImport(fixture.module, findModule(fixture.module, &modules));
        const fixture_tests = b.addTest(.{ .root_module = fixture_module });
        switch (fixture.class) {
            .runtime_negative_test, .repair => agent_check_step.dependOn(&b.addRunArtifact(fixture_tests).step),
            // This fixture documents a contract violation that Zig 0.14.0 accepts. Compiling it
            // confirms that status, but deliberately awards no runtime-negative evidence.
            .future_analyzer_expectation => agent_check_step.dependOn(&fixture_tests.step),
        }
    }

    const smoke_core = b.step("smoke-checks", "Run every external-consumer smoke test before the developer handoff");
    smoke_core.dependOn(portability_smoke_step);
    const test_all = b.step("test", "Run contract checks, unit tests, and smoke tests");
    test_all.dependOn(check_step);
    test_all.dependOn(port_check_step);
    const recipes_step = b.step("recipes", "Run unit tests for modules used by the initial composition recipes");
    const conformance_step = b.step("conformance", "Run configured family tests; no maturity credit without dedicated adapters");
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
        smoke_core.dependOn(&run_smoke.step);
        test_all.dependOn(&run_smoke.step);
    }
    const smoke_all = b.step("smoke", "Run every external-consumer smoke test");
    smoke_all.dependOn(smoke_core);

    for (recipe_specs) |recipe| {
        const recipe_module = b.createModule(.{ .root_source_file = b.path(b.fmt("recipes/{s}/src/recipe.zig", .{recipe.name})), .target = target, .optimize = optimize });
        for (recipe.dependencies) |dependency_name| recipe_module.addImport(dependency_name, findModule(dependency_name, &modules));
        const recipe_tests = b.addTest(.{ .root_module = recipe_module });
        const run_recipe = b.addRunArtifact(recipe_tests);
        const recipe_step = b.step(b.fmt("test-recipe-{s}", .{recipe.name}), b.fmt("Run {s} composition tests", .{recipe.name}));
        recipe_step.dependOn(&run_recipe.step);
        recipes_step.dependOn(&run_recipe.step);
        if (std.mem.eql(u8, recipe.name, "run-hosted-morphic-runtime")) {
            const executable = b.addExecutable(.{ .name = "run-hosted-morphic-runtime", .root_module = recipe_module });
            const install_riscv64 = b.addInstallArtifact(executable, .{});
            b.step("install-riscv64-morphic-runtime", "Cross-compile and install the Morphic executable selected by -Dtarget")
                .dependOn(&install_riscv64.step);
            const freestanding_target = b.resolveTargetQuery(.{ .cpu_arch = .riscv64, .os_tag = .freestanding, .abi = .none });
            const freestanding_module = b.createModule(.{ .root_source_file = b.path("recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig"), .target = freestanding_target, .optimize = .ReleaseSmall, .code_model = .medium });
            freestanding_module.addImport("morphic-core", recipe_module);
            freestanding_module.addImport("bounded-deterministic-scheduler", findModule("bounded-deterministic-scheduler", &modules));
            freestanding_module.addImport("distinct-memory-address-types", findModule("distinct-memory-address-types", &modules));
            freestanding_module.addImport("physical-page-frame-number-and-address-conversion", findModule("physical-page-frame-number-and-address-conversion", &modules));
            freestanding_module.addImport("physical-memory-region-set", findModule("physical-memory-region-set", &modules));
            freestanding_module.addImport("physical-page-frame-allocator", findModule("physical-page-frame-allocator", &modules));
            freestanding_module.addImport("riscv-sv39-page-table-entry", findModule("riscv-sv39-page-table-entry", &modules));
            freestanding_module.addImport("riscv-sv39-page-table-builder", findModule("riscv-sv39-page-table-builder", &modules));
            freestanding_module.addImport("riscv-sfence-vma-invalidation", findModule("riscv-sfence-vma-invalidation", &modules));
            freestanding_module.addImport("bounded-user-memory-transfer-plan", findModule("bounded-user-memory-transfer-plan", &modules));
            const freestanding = b.addExecutable(.{ .name = "morphic-freestanding-riscv64", .root_module = freestanding_module });
            freestanding.entry = .disabled;
            freestanding.root_module.strip = false;
            freestanding.setLinkerScript(b.path("recipes/run-hosted-morphic-runtime/freestanding-riscv64.ld"));
            const install_freestanding = b.addInstallArtifact(freestanding, .{});
            b.step("install-freestanding-riscv64-morphic-runtime", "Build and install the freestanding RISC-V Morphic payload")
                .dependOn(&install_freestanding.step);
            const run_hosted = b.addRunArtifact(executable);
            b.step("run-hosted-morphic-runtime", "Run deterministic hosted Morphic composition").dependOn(&run_hosted.step);
            const fake_module = b.createModule(.{ .root_source_file = b.path("recipes/run-hosted-morphic-runtime/src/fake.zig"), .target = target, .optimize = optimize });
            fake_module.addImport("morphic-core", recipe_module);
            const fake_executable = b.addExecutable(.{ .name = "run-fake-morphic-runtime", .root_module = fake_module });
            const run_fake = b.addRunArtifact(fake_executable);
            b.step("run-fake-morphic-runtime", "Run deterministic fake-machine Morphic composition").dependOn(&run_fake.step);
            const verify_hosted = b.step("verify-hosted-morphic-runtime", "Verify hosted Morphic composition and dependencies");
            verify_hosted.dependOn(&run_recipe.step);
            verify_hosted.dependOn(agent_check_step);
        }
        if (std.mem.eql(u8, recipe.name, "trace-morphic-example")) {
            const executable = b.addExecutable(.{ .name = "trace-morphic-example", .root_module = recipe_module });
            const run_trace = b.addRunArtifact(executable);
            const trace_step = b.step("trace-morphic-example", "Print the canonical deterministic Morphic event trace");
            trace_step.dependOn(&run_trace.step);
            const verify_step = b.step("verify-morphic-trace-checks", "Verify the trace module, smoke test, recipe, and agent contracts before handoff");
            verify_step.dependOn(&run_recipe.step);
            verify_step.dependOn(agent_check_step);
            const trace_module = findModule("bounded-deterministic-event-trace", &modules);
            const trace_unit = b.addRunArtifact(b.addTest(.{ .root_module = trace_module }));
            verify_step.dependOn(&trace_unit.step);
            const smoke_module = b.createModule(.{ .root_source_file = b.path("projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"), .target = target, .optimize = optimize });
            smoke_module.addImport("bounded-deterministic-event-trace", trace_module);
            const trace_smoke = b.addRunArtifact(b.addTest(.{ .root_module = smoke_module }));
            verify_step.dependOn(&trace_smoke.step);
            b.step("verify-morphic-trace", "Verify Morphic trace").dependOn(verify_step);
        }
        if (std.mem.eql(u8, recipe.name, "plan-morphic-runtime")) {
            const executable = b.addExecutable(.{ .name = "plan-morphic-runtime", .root_module = recipe_module });
            const run_plan = b.addRunArtifact(executable);
            const plan_step = b.step("plan-morphic-runtime", "Print the canonical deterministic Morphic resource plan");
            plan_step.dependOn(&run_plan.step);
            const verify_step = b.step("verify-morphic-plan-checks", "Verify Morphic plan before handoff");
            verify_step.dependOn(&run_recipe.step);
            verify_step.dependOn(agent_check_step);
            b.step("verify-morphic-plan", "Verify Morphic plan").dependOn(verify_step);
        }
    }

    const validate_step = b.step("validate-repository-checks", "Run the complete repository validation pipeline before handoff");
    validate_step.dependOn(policy_step);
    validate_step.dependOn(agent_check_step);
    validate_step.dependOn(test_all);
    validate_step.dependOn(smoke_core);
    validate_step.dependOn(recipes_step);
    validate_step.dependOn(conformance_step);
    validate_step.dependOn(property_step);
    validate_step.dependOn(fuzz_step);
    validate_step.dependOn(differential_step);
    b.step("validate-repository", "Run complete repository validation").dependOn(validate_step);
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
