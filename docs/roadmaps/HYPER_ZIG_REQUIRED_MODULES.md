# Hyper-Zig Required Module Roadmap

## Purpose

This document names the reusable modules still needed before a future `Hyper-Zig` build can become primarily an act of composition.

It deliberately excludes modules already present in `zig-reference`, including:

- fixed-capacity vector;
- dynamic array;
- ring buffer;
- fixed bit set;
- bounded byte reader;
- stack;
- byte writer;
- bitmap allocator;
- generational handle table;
- explicit state machine.

Every name below is intentionally descriptive. The name should tell a student, programmer, or coding agent what the module does before its source or contract is opened.

---

## Phase 1: Freestanding Runtime Foundations

1. `freestanding-panic-handler-and-crash-context`
   - Captures fatal failure location, architecture state, and diagnostic context without an operating system.

2. `freestanding-assertion-and-invariant-checking`
   - Provides debug assertions, unreachable-state reporting, and invariant checks suitable for kernel and hypervisor code.

3. `freestanding-memory-copy-move-set-compare`
   - Supplies overlap-aware memory primitives without hosted libc assumptions.

4. `freestanding-byte-and-integer-alignment-helpers`
   - Checks, raises, lowers, and validates addresses and sizes against power-of-two alignments.

5. `checked-address-range-arithmetic`
   - Performs overflow-safe base, length, end, containment, overlap, and intersection calculations.

6. `physical-address-and-virtual-address-distinct-types`
   - Prevents accidental interchange of physical, host virtual, guest physical, and guest virtual addresses.

7. `architecture-sized-register-value-wrapper`
   - Represents register-width values with explicit masking, bit extraction, and reserved-bit validation.

8. `volatile-memory-mapped-register-access`
   - Centralizes volatile loads, stores, masks, and read-modify-write behavior for device and CPU registers.

9. `compiler-and-cpu-memory-barrier-primitives`
   - Makes compiler barriers, acquire/release ordering, and architecture fences explicit.

10. `freestanding-spin-lock-with-irq-state`
    - Provides a basic lock whose contract records interrupt-state assumptions and restoration.

11. `one-time-initialization-cell`
    - Allows exactly-once initialization of global architecture and platform data.

12. `fixed-capacity-boot-arena-allocator`
    - Supplies monotonic allocation before a general page allocator or heap exists.

13. `region-arena-allocator-with-reset`
    - Allocates temporary groups of objects with one explicit reset boundary.

14. `intrusive-doubly-linked-list`
    - Maintains objects in lists without allocating wrapper nodes or obscuring ownership.

15. `fixed-capacity-object-pool`
    - Combines stable storage with bounded object allocation for early and freestanding use.

---

## Phase 2: x86_64 CPU Description and Register Access

16. `x86_64-control-register-access`
    - Reads and writes CR0, CR2, CR3, CR4, and validates reserved or required bits.

17. `x86_64-model-specific-register-access`
    - Wraps `rdmsr` and `wrmsr` with named indices, typed values, and explicit failure assumptions.

18. `x86_64-cpuid-query-and-feature-set`
    - Converts CPUID leaves and subleaves into searchable, typed processor capabilities.

19. `x86_64-rflags-access-and-bit-decoding`
    - Reads, writes, masks, and explains architectural flags.

20. `x86_64-segment-selector-and-descriptor-types`
    - Represents selectors, privilege levels, descriptor fields, and validation rules.

21. `x86_64-global-descriptor-table-builder`
    - Constructs and validates a GDT with explicit segment meanings.

22. `x86_64-task-state-segment-builder`
    - Creates TSS state, privilege stacks, and interrupt-stack-table entries.

23. `x86_64-interrupt-descriptor-table-builder`
    - Constructs gate descriptors and connects vectors to entry stubs.

24. `x86_64-interrupt-and-exception-frame-decoder`
    - Turns raw entry-stack layouts into a typed exception context.

25. `x86_64-fxsave-xsave-capability-and-state-layout`
    - Determines supported extended-state formats and safe save-area sizing.

26. `x86_64-timestamp-counter-access-and-calibration`
    - Reads, orders, and calibrates the TSC against a platform timer.

27. `x86_64-local-apic-register-access`
    - Provides typed xAPIC or x2APIC register operations.

28. `x86_64-io-port-access`
    - Wraps byte, word, and double-word port I/O with explicit widths.

29. `x86_64-cpu-feature-requirement-validator`
    - Compares detected processor capabilities against Hyper-Zig requirements and reports exact deficiencies.

---

## Phase 3: Boot Protocol and Firmware Discovery

30. `multiboot2-information-structure-parser`
    - Safely parses bootloader tags, modules, framebuffer data, and memory maps.

31. `uefi-memory-map-normalizer`
    - Converts firmware descriptors into the repository's canonical physical-memory-region model.

32. `acpi-root-system-description-pointer-parser`
    - Validates RSDP checksums and locates ACPI root tables.

33. `acpi-system-description-table-header-parser`
    - Validates common ACPI table headers, lengths, signatures, and checksums.

34. `acpi-multiple-apic-description-table-parser`
    - Discovers CPUs, local APICs, I/O APICs, and interrupt-source overrides.

35. `acpi-high-precision-event-timer-table-parser`
    - Discovers HPET capabilities and register location.

36. `acpi-fixed-description-table-parser`
    - Extracts reset, power-management, and platform control information.

37. `firmware-physical-memory-map-normalizer`
    - Merges adjacent ranges, rejects overlap contradictions, and assigns canonical memory kinds.

38. `boot-module-and-command-line-catalog`
    - Records named boot payloads, kernel images, init data, and arguments with bounded borrowed views.

39. `early-boot-console-selection`
    - Chooses serial, framebuffer, or emergency output using discovered platform capabilities.

---

## Phase 4: Physical and Virtual Memory

40. `physical-memory-region-set` **Implemented: `projects/35-physical-memory-region-set`.**
    - Stores, normalizes, splits, reserves, and queries physical address ranges.

41. `physical-page-frame-number-and-address-conversion`
    - Converts pages and addresses with checked alignment and overflow rules.

42. `physical-page-frame-allocator` **Implemented: `projects/36-physical-page-frame-allocator`.**
    - Applies the bitmap allocator to actual page ranges while excluding reserved memory.

43. `contiguous-physical-page-run-allocator`
    - Finds aligned multi-page runs for page tables, DMA, and large mappings.

44. `physical-page-ownership-and-purpose-tracker`
    - Records why a page is owned: page table, VM memory, device buffer, metadata, or reserved firmware state.

45. `x86_64-page-table-entry-bitfield`
    - Encodes and decodes architectural page-table entry fields and rejects reserved-bit combinations.

46. `x86_64-four-level-page-table-indexing`
    - Splits canonical virtual addresses into PML4, PDPT, PD, PT, and page offsets.

47. `x86_64-four-level-page-table-builder`
    - Creates, maps, unmaps, and walks host virtual mappings.

48. `x86_64-large-page-mapping-policy`
    - Selects 4 KiB, 2 MiB, or 1 GiB mappings according to alignment and capability.

49. `x86_64-canonical-virtual-address-validator`
    - Validates sign extension and canonical-address ranges.

50. `virtual-address-space-region-allocator`
    - Reserves non-overlapping host virtual ranges independently of physical backing.

51. `temporary-physical-page-mapping-window`
    - Maps arbitrary physical pages into a controlled temporary virtual window.

52. `translation-lookaside-buffer-invalidation`
    - Centralizes local and cross-CPU invalidation contracts.

53. `guard-page-backed-kernel-stack-allocator`
    - Allocates stacks with unmapped guards and explicit lifetime ownership.

54. `page-aligned-byte-buffer`
    - Owns page-granular memory for VM control structures, AP stacks, and device buffers.

---

## Phase 5: Executable and Binary Loading

55. `elf64-file-header-parser` **Implemented: `projects/37-elf64-file-header-parser`.**
    - Parses and validates ELF identity, architecture, type, and table locations.

56. `elf64-program-header-parser` **Implemented: `projects/38-elf64-program-header-parser`.**
    - Reads loadable segments with checked offsets, sizes, permissions, and alignment.

57. `elf64-section-header-parser`
    - Exposes sections for diagnostics, symbols, relocations, and debugging without making them mandatory for loading.

58. `elf64-load-plan-validator`
    - Converts parsed segments into a non-overlapping, bounded, permission-aware load plan.

59. `elf64-image-loader`
    - Copies file bytes, zeroes BSS, maps memory, and returns a validated entry point.

60. `elf64-symbol-table-parser`
    - Supports diagnostics and future debugging facilities.

61. `elf64-relocation-parser-and-applier`
    - Applies only explicitly supported relocation kinds and rejects everything else.

62. `binary-checksum-and-checksum-verification`
    - Supplies reusable additive and table-oriented checksums for firmware and protocol structures.

63. `crc32-checksum`
    - Provides a standard CRC-32 implementation for durable and transport formats.

---

## Phase 6: VMX Capability and Control Structures

64. `intel-vmx-cpuid-and-msr-capability-discovery`
    - Determines whether VMX is available and which controls are legal.

65. `intel-vmx-feature-control-msr-validator`
    - Validates lock and enable state before attempting VMX operation.

66. `intel-vmx-control-bit-adjustment`
    - Applies required-zero and required-one masks to requested VMX controls.

67. `intel-vmxon-region-owner`
    - Allocates, initializes, aligns, enters, and leaves VMX operation with explicit cleanup.

68. `intel-vmcs-region-owner`
    - Owns VMCS memory, revision identifiers, clear/load state, and lifecycle.

69. `intel-vmcs-field-encoding-catalog`
    - Gives every supported VMCS field a searchable descriptive name and width.

70. `intel-vmcs-typed-read-write`
    - Wraps VMREAD and VMWRITE with typed fields and diagnostic failure information.

71. `intel-vmcs-host-state-builder`
    - Populates host selectors, tables, control registers, stacks, and return instruction pointer.

72. `intel-vmcs-guest-state-builder`
    - Constructs validated initial guest architectural state.

73. `intel-vmcs-execution-control-builder`
    - Selects pin-based, primary, secondary, entry, and exit controls from policy and capability.

74. `intel-vm-entry-validation-report`
    - Explains invalid guest state, invalid controls, and VM-entry instruction failures.

75. `intel-vm-exit-reason-decoder`
    - Converts raw exit reason and qualification into a tagged, searchable event.

76. `intel-vm-instruction-error-decoder`
    - Maps VM-instruction error numbers to exact causes.

77. `intel-vmx-instruction-wrappers`
    - Wraps VMXON, VMXOFF, VMCLEAR, VMPTRLD, VMLAUNCH, VMRESUME, VMREAD, VMWRITE, INVEPT, and INVVPID.

78. `intel-vcpu-register-state`
    - Stores guest general registers and connects assembly entry state to Zig handlers.

79. `intel-vcpu-lifecycle-controller`
    - Applies the generic state machine to created, configured, runnable, running, paused, stopped, and destroyed vCPUs.

80. `intel-vm-exit-dispatcher`
    - Routes decoded exits to narrow handlers while preserving register and VMCS ownership.

---

## Phase 7: Extended Page Tables and Guest Memory

81. `intel-ept-capability-discovery`
    - Reads supported page sizes, memory types, invalidation modes, and accessed/dirty capabilities.

82. `intel-ept-entry-bitfield`
    - Encodes EPT permissions, memory types, large-page state, and physical addresses.

83. `intel-ept-four-level-indexing`
    - Splits guest physical addresses into EPT hierarchy indices.

84. `intel-ept-page-table-builder`
    - Maps, unmaps, protects, and walks guest-physical-to-host-physical mappings.

85. `intel-ept-invalidation`
    - Performs single-context and global EPT invalidation according to capability.

86. `guest-physical-memory-region-map`
    - Defines RAM, ROM, MMIO, reserved, and shared guest physical ranges.

87. `guest-memory-read-write-translation`
    - Translates bounded guest physical ranges into safe host views.

88. `guest-memory-loader`
    - Places kernels, boot data, stacks, and initial page tables into guest memory.

89. `guest-memory-access-permission-policy`
    - Derives EPT permissions from segment, device, and security policy.

90. `guest-page-fault-and-ept-violation-decoder`
    - Explains access type, permissions, translation state, and guest linear address validity.

---

## Phase 8: Interrupts, Timers, and Multiprocessor Startup

91. `x86_64-interrupt-vector-allocator`
    - Allocates vector numbers while reserving architectural and platform ranges.

92. `x86_64-io-apic-register-access`
    - Reads and writes I/O APIC registers and redirection entries.

93. `x86_64-interrupt-routing-table`
    - Combines ACPI overrides, I/O APIC pins, vectors, polarity, and trigger mode.

94. `x86_64-local-apic-timer-calibration`
    - Calibrates local APIC timer ticks against a known reference.

95. `x86_64-interprocessor-interrupt-sender`
    - Sends fixed, NMI, INIT, and startup interrupts with delivery-status handling.

96. `x86_64-application-processor-bootstrap-trampoline`
    - Defines low-memory trampoline inputs, transition state, and startup handoff.

97. `x86_64-application-processor-startup-controller`
    - Discovers, starts, waits for, and records secondary processors.

98. `per-cpu-storage-and-current-cpu-access`
    - Gives each processor explicit local state and a safe lookup mechanism.

99. `cross-cpu-call-and-acknowledgement`
    - Executes bounded requests on other CPUs and records completion.

100. `monotonic-deadline-and-timeout`
    - Represents deadlines, elapsed time, and timeout checks without unit ambiguity.

---

## Phase 9: Guest Execution and Exit Handling

101. `cpuid-exit-policy-and-emulation`
     - Filters and synthesizes guest-visible CPUID capabilities.

102. `model-specific-register-exit-policy`
     - Allows, masks, emulates, or rejects guest RDMSR and WRMSR operations.

103. `control-register-access-exit-handler`
     - Emulates guest CR reads and writes while enforcing architectural requirements.

104. `io-port-exit-decoder-and-dispatcher`
     - Decodes size, direction, repetition, string mode, and port number.

105. `memory-mapped-io-exit-dispatcher`
     - Routes EPT-backed device ranges to registered emulators.

106. `hlt-exit-handler-and-vcpu-blocking-policy`
     - Distinguishes halt, wakeup, interruptibility, and stopped lifecycle state.

107. `external-interrupt-exit-handler`
     - Acknowledges and routes host interrupts without losing guest state.

108. `exception-and-nmi-exit-handler`
     - Decodes and reinjects supported guest exceptions and NMIs.

109. `interrupt-window-and-nmi-window-controller`
     - Requests exits only when delayed injection can proceed.

110. `guest-event-injection-builder`
     - Encodes interrupt, exception, error-code, and instruction-length injection fields.

111. `vmcall-hypercall-abi`
     - Defines call numbers, register arguments, results, errors, and version negotiation.

112. `instruction-emulation-result`
     - Standardizes advance, retry, inject, block, stop, and fatal outcomes across exit handlers.

---

## Phase 10: Minimal Virtual Devices

113. `virtual-device-address-range-registry`
     - Registers non-overlapping PIO and MMIO ranges using stable handles.

114. `virtual-uart-16550-register-model`
     - Emulates the small serial device needed for early guest output.

115. `virtual-uart-16550-io-port-handler`
     - Connects decoded port exits to the UART register model.

116. `virtual-debug-output-device`
     - Provides a deliberately minimal guest-to-host diagnostic channel.

117. `virtual-interrupt-controller-interface`
     - Defines the boundary between device events and guest interrupt delivery.

118. `virtual-pit-channel-model`
     - Models the minimal programmable interval timer behavior needed by simple guests.

119. `virtual-cmos-real-time-clock-register-model`
     - Supplies basic time and platform bytes expected by early software.

120. `virtual-pci-configuration-space`
     - Provides configuration address/data access and a bounded virtual device catalog.

121. `virtio-mmio-transport-state-machine`
     - Models feature negotiation, queue setup, status, notification, and reset.

122. `virtio-descriptor-chain-walker`
     - Safely walks bounded guest-owned descriptor chains.

123. `virtio-console-device`
     - Offers a modern paravirtual console after the minimal UART path works.

124. `virtio-block-device-request-parser`
     - Validates and executes bounded guest block requests against a backend interface.

---

## Phase 11: Scheduling, Events, and Concurrency

125. `bounded-multi-producer-single-consumer-queue`
     - Provides an explicitly synchronized event path for many producers and one owner.

126. `bounded-single-producer-single-consumer-queue`
     - Supplies a simpler lock-free or low-lock path where ownership permits it.

127. `vcpu-run-queue`
     - Queues runnable vCPU handles without embedding scheduler policy into VM objects.

128. `cooperative-vcpu-scheduler`
     - Runs vCPUs until exit, block, pause, stop, or time budget exhaustion.

129. `timer-event-min-heap`
     - Orders future events by monotonic deadline.

130. `deferred-work-queue`
     - Moves non-critical work out of interrupt and VM-exit contexts.

131. `cross-component-event-type`
     - Provides a tagged union for lifecycle, timer, device, interrupt, and shutdown events.

132. `shutdown-coordinator`
     - Orders vCPU stop, device quiescence, resource release, and VMX teardown.

133. `cancellation-token-and-observed-cancellation`
     - Makes cancellation ownership and observation explicit across long operations.

---

## Phase 12: Diagnostics, Testing, and Reproducibility

134. `freestanding-log-record-format`
     - Defines timestamp, CPU, severity, component, event, and bounded payload fields.

135. `fixed-capacity-in-memory-log-ring`
     - Retains recent diagnostics without allocation or filesystem access.

136. `serial-log-sink`
     - Emits structured records through a configured serial transport.

137. `debug-exit-port-test-result`
     - Allows deterministic QEMU integration-test completion and status reporting.

138. `register-and-bitfield-pretty-printer`
     - Produces human-readable names and decoded fields for architecture state.

139. `vmcs-diagnostic-dump`
     - Prints selected VMCS groups with field names, widths, and interpreted values.

140. `page-table-walk-diagnostic`
     - Explains each host or EPT translation level and the precise failure point.

141. `deterministic-fault-injection-controller`
     - Injects allocation, parsing, mapping, device, and transition failures by named checkpoint.

142. `freestanding-test-case-registry`
     - Registers and runs unit-style tests without a hosted test process.

143. `qemu-launch-command-builder`
     - Constructs repeatable emulator invocations from explicit machine and image configuration.

144. `qemu-serial-output-test-harness`
     - Captures output, enforces deadlines, and matches structured success or failure markers.

145. `hypervisor-capability-report`
     - Produces one complete report of CPU, VMX, EPT, APIC, timing, and memory prerequisites.

146. `hypervisor-boot-stage-trace`
     - Records progress through boot stages so hangs become bounded, searchable failures.

147. `guest-execution-trace-ring`
     - Retains recent exits, register summaries, and injected events for post-failure diagnosis.

148. `module-contract-consistency-checker`
     - Verifies module names, paths, imports, `DETAILS.md`, `details.json`, build steps, and catalog entries agree.

149. `details-json-schema-validator`
     - Validates every machine-readable module contract against the repository schema.

150. `repository-dependency-graph-generator`
     - Produces a dependency graph from `details.json` rather than rediscovering imports repeatedly.

---

## Phase 13: Hyper-Zig Composition Modules

These remain reusable modules, but they are the first layer whose names are explicitly hypervisor-oriented.

151. `hypervisor-platform-discovery`
     - Composes CPUID, ACPI, timers, APIC, and memory-map modules into one validated platform model.

152. `hypervisor-host-memory-manager`
     - Composes physical ranges, page allocation, host page tables, mapping windows, and ownership tracking.

153. `hypervisor-vmx-host-environment`
     - Composes VMX capability checks, per-CPU VMXON ownership, host-state construction, and teardown.

154. `hypervisor-guest-memory-manager`
     - Composes guest ranges, backing pages, EPT mappings, image loading, and permission policy.

155. `hypervisor-virtual-machine-object`
     - Owns VM identity, lifecycle, memory manager, devices, vCPUs, and teardown ordering.

156. `hypervisor-virtual-cpu-object`
     - Owns VMCS, registers, lifecycle, event injection, execution policy, and run-queue state.

157. `hypervisor-virtual-device-manager`
     - Owns device handles, address ranges, event routing, and reset order.

158. `hypervisor-vm-execution-loop`
     - Composes VM entry, exit decoding, dispatch, instruction results, scheduling, and diagnostics.

159. `hypervisor-configuration-model`
     - Describes guest memory, CPUs, kernel image, devices, policies, and limits without executing them.

160. `hypervisor-configuration-validator`
     - Rejects contradictory, unsupported, overlapping, oversized, or unsafe configurations before resources are acquired.

161. `hypervisor-build-plan`
     - Converts validated configuration into an ordered, failure-atomic resource acquisition plan.

162. `hypervisor-instance-builder`
     - Executes the build plan with explicit rollback for partial construction.

163. `hypervisor-instance-destroyer`
     - Releases resources in an order derived from documented ownership edges.

164. `hypervisor-top-level-runtime`
     - Connects boot, platform discovery, initialization, VM construction, scheduling, shutdown, and fatal diagnostics.

---

## Completion Rule

A module is not considered available merely because a source file exists.

It becomes compositional infrastructure only when it has:

- a literal, discoverable name;
- a narrow public responsibility;
- implementation and failure-path tests;
- `README.md`;
- `docs/standards/MASTERY.md`;
- `DETAILS.md`;
- exhaustive `details.json`;
- a build step;
- a catalog entry;
- exact dependency paths;
- honest compiler-validation status;
- documented hosted or freestanding assumptions.

The future `Hyper-Zig` command should select these modules by capability, follow their declared edges, and write only the architecture that remains unique to the final hypervisor.

## Parallel RISC-V Sv39 foundation (implemented)
Modules 44–49 provide host-stage Sv39 representation, indexing, page ownership, walking, deterministic mutation with rollback, and SFENCE.VMA planning. They do not replace the x86_64 roadmap and deliberately defer Sv39x4, hgatp, traps, SBI, FDT, devices, and Alpine boot.
