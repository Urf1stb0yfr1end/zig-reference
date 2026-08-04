# Kernel and Alpine Hypervisor Required Modules

> A deduplicated checklist of capabilities not already clearly represented by the general master checklist or the existing Hyper-Zig roadmap.

This checklist has two related goals:

1. complete the missing subsystem ladder required to compose a conventional x86_64 kernel; and
2. add the guest-boot, virtual-device, and integration capabilities required for Hyper-Zig to boot Alpine Linux.

It is a planning checklist, not a validation claim. A checked item means an implementation exists and is represented by a complete repository contract. Compiler, smoke, system, and hardware validation remain separate evidence.

## Counting and overlap rules

- Reuse an existing module whenever its contract already satisfies the capability.
- Do not create a second module merely because a kernel-specific name sounds clearer.
- Where a general primitive exists but a subsystem composition layer does not, add only the composition layer.
- Alternative host boot paths such as Limine, Multiboot2, and UEFI are separate adapters over one canonical boot-information model.
- A direct Linux boot path is the preferred first Alpine milestone; virtual firmware may be added later.
- The host hypervisor does not need a complete host userspace, VFS, or TCP/IP stack merely to boot Alpine.

---

# Part I — Missing conventional-kernel modules

## 01 — Boot and platform entry

- [ ] `boot-protocol-abstraction` — Normalizes supported bootloader and firmware handoffs.
- [ ] `limine-boot-response-adapter` — Converts Limine responses into canonical boot information.
- [ ] `uefi-handoff-adapter` — Converts a UEFI handoff into canonical boot information.
- [ ] `kernel-boot-information` — Owns the validated platform facts consumed after early entry.
- [ ] `initial-kernel-stack-description` — Describes initial stack bounds, alignment, guard policy, and ownership.
- [ ] `bootstrap-memory-reservation-tracker` — Prevents early metadata, modules, and page tables from being reallocated.
- [ ] `boot-module-image-registry` — Catalogs initramfs, kernel modules, guest images, and other boot payloads.
- [ ] `kernel-image-physical-layout` — Describes loaded segments, reserved ranges, and linker-defined boundaries.
- [ ] `boot-failure-record` — Captures deterministic early-boot failure details before the full logger exists.
- [ ] `linker-symbol-boundary-decoder` — Safely imports linker-provided image and section boundaries.

## 02 — CPU initialization and descriptor state

- [ ] `x86_64-descriptor-table-register-access` — Loads and inspects GDTR and IDTR values.
- [ ] `x86_64-cpu-privilege-level` — Represents CPL, DPL, and RPL without raw-number confusion.
- [ ] `x86_64-kernel-stack-selector` — Selects privilege and interrupt stacks by execution context.
- [ ] `x86_64-floating-point-state-initializer` — Establishes deterministic x87 state.
- [ ] `x86_64-simd-state-initializer` — Enables and initializes supported SIMD state.
- [ ] `x86_64-extended-state-save-configuration` — Selects FXSAVE or XSAVE components and area layout.
- [ ] `x86_64-bootstrap-processor-initializer` — Orders descriptor, control-register, SIMD, APIC, and local-state initialization.
- [ ] `x86_64-cpu-topology-model` — Represents packages, cores, threads, APIC identifiers, and online state.
- [ ] `x86_64-cpu-local-storage-initializer` — Installs architecture-specific access to per-CPU state.

## 03 — Interrupts and exceptions

- [ ] `x86_64-interrupt-gate-descriptor` — Encodes and validates interrupt and trap gates.
- [ ] `x86_64-interrupt-stub-registry` — Associates entry stubs with vectors and frame layouts.
- [ ] `x86_64-exception-dispatch-table` — Routes architectural exceptions through typed handlers.
- [ ] `x86_64-irq-dispatch-table` — Routes hardware interrupt vectors through registered handlers.
- [ ] `interrupt-controller-abstraction` — Provides masking, routing, acknowledgement, and end-of-interrupt behavior.
- [ ] `x86_64-legacy-pic-controller` — Supports masking, remapping, acknowledgement, and shutdown of the 8259 PIC.
- [ ] `x86_64-interrupt-acknowledgement-policy` — Centralizes controller-specific end-of-interrupt ordering.
- [ ] `interrupt-masking-guard` — Restores the previous interrupt-enable state on scope exit.
- [ ] `nested-interrupt-state-tracker` — Records legal nested interrupt and exception context.
- [ ] `spurious-interrupt-handler` — Distinguishes harmless spurious vectors from routing defects.

## 04 — Physical memory completion

- [ ] `firmware-memory-map-decoder` — Decodes the selected firmware or bootloader memory-map format.
- [ ] `physical-memory-region-classifier` — Maps firmware-specific kinds into canonical usable, reserved, reclaimable, MMIO, and bad-memory classes.
- [ ] `reserved-physical-region-tracker` — Records immutable and temporary reservations with reasons.
- [ ] `low-memory-physical-page-allocator` — Allocates address-constrained pages for x86 startup structures.
- [ ] `dma-capable-physical-page-allocator` — Enforces address width, alignment, and contiguity constraints.
- [ ] `physical-memory-statistics` — Reports totals by class, ownership, fragmentation, and availability.

## 05 — Virtual memory completion

- [ ] `page-table-page-allocator` — Owns allocation and reclamation of page-table pages.
- [ ] `kernel-virtual-address` — Distinguishes canonical kernel virtual addresses from other address domains.
- [ ] `user-virtual-address` — Distinguishes canonical userspace virtual addresses.
- [ ] `address-space-object` — Owns the root table, mappings, policy, and teardown of an address space.
- [ ] `kernel-address-space-initializer` — Builds the direct map, kernel mappings, stacks, and protected gaps.
- [ ] `user-address-space-initializer` — Establishes an empty userspace layout with kernel isolation.
- [ ] `virtual-memory-map-transaction` — Applies a failure-atomic set of mapping operations.
- [ ] `virtual-memory-unmap-transaction` — Removes mappings with explicit page and TLB ownership.
- [ ] `mapping-permission-policy` — Derives executable, writable, user, global, and cache attributes.
- [ ] `kernel-direct-physical-map` — Creates and queries the host physical direct-map region.
- [ ] `guard-page-reservation` — Reserves intentionally unmapped bounds around sensitive regions.
- [ ] `tlb-shootdown-request` — Coordinates remote invalidation after shared mapping changes.
- [ ] `copy-on-write-page-mapping` — Shares pages until a validated write fault requests a private copy.
- [ ] `user-kernel-address-space-split-policy` — Defines canonical lower and upper address-space ownership.

## 06 — Kernel heap and allocation policy

- [ ] `kernel-heap-bootstrap` — Transitions from the boot arena to page-backed allocation.
- [ ] `page-backed-kernel-allocator` — Requests and releases physical/virtual pages for heap growth.
- [ ] `kernel-object-cache` — Provides typed caches over slab or pool allocation.
- [ ] `kernel-small-object-allocator` — Serves bounded small allocations efficiently.
- [ ] `kernel-large-object-allocator` — Serves page-scale allocations with explicit mapping ownership.
- [ ] `interrupt-context-allocation-policy` — Defines which allocators and failure paths are legal in interrupt context.
- [ ] `kernel-allocation-failure-policy` — Distinguishes recoverable failure, reclaim, and fatal exhaustion.
- [ ] `kernel-allocation-statistics` — Reports allocation classes, failures, fragmentation, and high-water marks.
- [ ] `kernel-allocation-debugging-wrapper` — Adds poisoning, guards, ownership tags, and call-site evidence.
- [ ] `kernel-leak-tracking-allocator` — Records unreleased allocations for controlled test environments.

## 07 — Kernel synchronization completion

- [ ] `kernel-mutex` — Sleeping mutual exclusion with explicit scheduler dependency.
- [ ] `kernel-read-write-lock` — Shared/exclusive sleeping lock.
- [ ] `kernel-condition-variable` — Wait-and-notify primitive paired with a kernel mutex.
- [ ] `kernel-wait-queue` — Owns blocked task handles and wakeup ordering.
- [ ] `kernel-completion-object` — Represents a one-shot operation result and waiter set.
- [ ] `kernel-event-object` — Represents persistent or auto-reset event signaling.
- [ ] `kernel-reference-counter` — Controls shared kernel object lifetime with overflow and finalization rules.
- [ ] `preemption-disabling-guard` — Restores the previous preemption state after a critical section.
- [ ] `kernel-lock-order-validator` — Detects forbidden lock acquisition order during validation builds.
- [ ] `priority-inheritance-helper` — Propagates priority across lock ownership to limit inversion.

## 08 — Tasks, threads, processes, and scheduling

- [ ] `x86_64-saved-cpu-context` — Stores the architectural state required for task switching.
- [ ] `x86_64-context-switch-frame` — Defines the exact stack frame used by switch assembly.
- [ ] `kernel-stack-owner` — Owns mapped stack pages, guard pages, and destruction.
- [ ] `thread-identifier` — Provides typed thread identity with stale-reference protection.
- [ ] `process-identifier` — Provides typed process identity with stale-reference protection.
- [ ] `thread-control-block` — Owns thread state, stack, scheduling data, and wait relationships.
- [ ] `process-control-block` — Owns address space, credentials, files, threads, and lifecycle.
- [ ] `task-lifecycle-state-machine` — Governs creation, runnable, blocked, stopped, exited, and reaped states.
- [ ] `scheduler-runnable-queue` — Stores runnable tasks independently of scheduling policy.
- [ ] `scheduler-priority-run-queue` — Organizes runnable tasks by effective priority.
- [ ] `cooperative-task-scheduler` — Switches tasks at explicit yield and blocking boundaries.
- [ ] `preemptive-task-scheduler` — Adds timer-driven preemption with explicit interrupt contracts.
- [ ] `scheduler-tick-handler` — Accounts runtime and triggers policy decisions.
- [ ] `idle-task` — Provides a defined execution target when no task is runnable.
- [ ] `task-sleep-queue` — Orders sleeping tasks by monotonic wake deadline.
- [ ] `task-wakeup-operation` — Moves a blocked task to a runnable queue exactly once.
- [ ] `task-join-operation` — Allows one task to collect another task's terminal result.
- [ ] `task-cancellation-operation` — Requests and observes cancellation without silent destruction.
- [ ] `cpu-affinity-mask` — Restricts eligible processors for tasks and interrupts.
- [ ] `per-cpu-run-queue` — Owns runnable tasks assigned to one processor.
- [ ] `scheduler-load-balancer` — Transfers work while preserving affinity and lock ordering.
- [ ] `process-address-space-ownership` — Defines sharing and teardown between process and address space.
- [ ] `zombie-process-reaper` — Reclaims exited processes after parent-visible state is collected.

## 09 — Syscalls and userspace boundary

- [ ] `syscall-number` — Provides typed, versioned syscall identity.
- [ ] `syscall-abi-description` — Defines register arguments, return values, clobbers, and error encoding.
- [ ] `syscall-argument-decoder` — Converts raw registers into validated endpoint inputs.
- [ ] `syscall-dispatch-table` — Routes syscall numbers to narrow handlers.
- [ ] `syscall-return-value` — Distinguishes success values, restart, and errors.
- [ ] `userspace-pointer` — Prevents raw kernel dereference of userspace addresses.
- [ ] `userspace-range-validator` — Checks canonicality, overflow, permissions, and complete mapping.
- [ ] `copy-from-userspace` — Copies bounded data while containing faults.
- [ ] `copy-to-userspace` — Writes bounded data while containing faults.
- [ ] `userspace-string-reader` — Reads limited terminated or length-delimited strings.
- [ ] `userspace-entry-frame` — Constructs first entry into ring 3.
- [ ] `kernel-to-userspace-return-path` — Validates state before returning from a syscall or interrupt.
- [ ] `process-exit-syscall` — Transitions a process into terminal state and releases resources.
- [ ] `thread-exit-syscall` — Terminates one thread without implicitly destroying the process.
- [ ] `memory-mapping-syscall` — Validates and applies userspace mapping requests.
- [ ] `file-io-syscall-layer` — Connects userspace I/O calls to open-file descriptions.
- [ ] `exception-to-process-fault-translation` — Converts processor faults into process-visible termination or signals.
- [ ] `userspace-permission-validator` — Applies credentials and object policy to syscall operations.

## 10 — Userspace executable loading

- [ ] `executable-segment-mapper` — Applies validated ELF segments to a process address space.
- [ ] `userspace-image-loader` — Creates a process image from an executable and interpreter policy.
- [ ] `kernel-module-elf-loader` — Loads explicitly supported relocatable kernel modules.
- [ ] `initial-process-image-builder` — Composes executable mappings, stack, arguments, environment, and registers.
- [ ] `userspace-stack-builder` — Writes aligned arguments, environment, and metadata into a new stack.
- [ ] `elf-auxiliary-vector-builder` — Produces the userspace auxiliary vector.
- [ ] `initial-userspace-register-state` — Selects entry point, stack, flags, and segment state.

## 11 — Kernel device model

- [ ] `kernel-device-identifier` — Gives devices stable typed identity.
- [ ] `kernel-device-object` — Owns device lifecycle, resources, parentage, and driver binding.
- [ ] `kernel-driver-object` — Defines probe, bind, start, stop, reset, and removal behavior.
- [ ] `kernel-device-registry` — Indexes devices by identity, path, class, and parent.
- [ ] `kernel-driver-registry` — Indexes available drivers and match policies.
- [ ] `kernel-bus-abstraction` — Defines discovery and child-device creation for a bus.
- [ ] `device-driver-matcher` — Selects compatible drivers without hidden priority rules.
- [ ] `device-lifecycle-state-machine` — Governs discovered, bound, active, failed, stopped, and removed states.
- [ ] `device-resource-description` — Represents MMIO, PIO, interrupt, DMA, and firmware resources.
- [ ] `interrupt-resource` — Owns routing and handler registration for one device interrupt.
- [ ] `mmio-resource` — Owns a mapped device register range.
- [ ] `io-port-resource` — Owns a reserved port range.
- [ ] `dma-resource` — Owns DMA constraints, mappings, and buffers.
- [ ] `device-dependency-graph` — Orders initialization and shutdown across dependent devices.
- [ ] `device-initialization-order` — Calculates a cycle-free startup plan.
- [ ] `device-failure-record` — Preserves probe and runtime failure evidence.

## 12 — Kernel driver completion

- [ ] `framebuffer-console-driver` — Renders emergency and kernel text to a discovered framebuffer.
- [ ] `pci-device-enumerator` — Walks PCI buses, functions, bridges, and multifunction devices.
- [ ] `pci-capability-list-decoder` — Validates and iterates conventional PCI capabilities.
- [ ] `virtio-transport-abstraction` — Normalizes PCI and MMIO Virtio transports.
- [ ] `virtio-block-driver` — Exposes a Virtio block device through the kernel block interface.
- [ ] `virtio-network-driver` — Exposes a Virtio network interface through the kernel network interface.
- [ ] `kernel-block-device-interface` — Defines asynchronous or synchronous bounded block requests.
- [ ] `kernel-character-device-interface` — Defines stream-oriented device operations.
- [ ] `dma-buffer-allocator` — Produces suitably constrained physical and virtual buffers.
- [ ] `timer-device-abstraction` — Normalizes clocksource and event-timer capabilities.
- [ ] `keyboard-input-abstraction` — Normalizes keyboard events independently of controller details.
- [ ] `random-source-abstraction` — Collects and labels entropy sources without overstating security.
- [ ] `shutdown-and-reboot-device-abstraction` — Normalizes platform power actions.

## 13 — Kernel VFS and storage

- [ ] `vfs-node-interface` — Defines common file, directory, device, and symbolic-link behavior.
- [ ] `inode-identifier` — Gives filesystem objects stable typed identity.
- [ ] `vfs-file-type` — Represents regular files, directories, devices, links, and special nodes.
- [ ] `filesystem-driver-interface` — Defines probe, mount, lookup, and unmount behavior.
- [ ] `filesystem-registry` — Selects filesystem implementations by explicit probe results.
- [ ] `filesystem-mount-object` — Owns a mounted filesystem instance and root node.
- [ ] `mount-table` — Resolves mount points and nested mounts.
- [ ] `vfs-path-lookup` — Walks canonical path components across mounts and links.
- [ ] `directory-entry-cache` — Caches path component to node resolution with invalidation.
- [ ] `open-file-description` — Owns file position, flags, node reference, and operations.
- [ ] `process-file-descriptor-table` — Maps small integers to open-file descriptions.
- [ ] `file-offset` — Provides checked typed file positioning.
- [ ] `vfs-directory-entry` — Represents one directory listing result.
- [ ] `file-permission-model` — Defines access bits and credential checks.
- [ ] `ram-filesystem` — Provides an allocation-backed in-memory filesystem.
- [ ] `initramfs-parser` — Imports a boot archive into the initial filesystem.
- [ ] `device-filesystem` — Publishes kernel devices through VFS nodes.
- [ ] `proc-style-virtual-filesystem` — Publishes generated kernel state without persistent storage.
- [ ] `kernel-page-cache` — Caches file-backed pages with ownership and writeback state.
- [ ] `kernel-buffer-cache` — Caches filesystem metadata and sub-page buffers.
- [ ] `kernel-block-cache` — Caches fixed-size block-device reads and writes.

## 14 — Kernel networking

These modules are needed for a standalone kernel network stack, but not for the first Alpine guest because Alpine supplies its own stack.

- [ ] `kernel-network-device-interface` — Normalizes packet transmit, receive, link, and feature behavior.
- [ ] `kernel-packet-buffer` — Owns packet storage, offsets, headroom, and lifetime.
- [ ] `ethernet-frame-parser` — Validates and exposes Ethernet headers and payload.
- [ ] `arp-neighbor-table` — Resolves IPv4 peers to link-layer addresses.
- [ ] `ipv4-address` — Provides typed IPv4 addressing and masks.
- [ ] `ipv4-packet-parser` — Validates IPv4 header length, fragmentation, and checksum.
- [ ] `ipv4-routing-table` — Selects routes by prefix and metric.
- [ ] `icmpv4-handler` — Handles required control and error messages.
- [ ] `udp-socket-table` — Routes datagrams by local and remote endpoint.
- [ ] `udp-packet-parser` — Validates lengths and checksums.
- [ ] `tcp-connection-state-machine` — Governs TCP sequencing, retransmission, and closure.
- [ ] `kernel-socket-identifier` — Provides typed stale-safe socket identity.
- [ ] `kernel-socket-registry` — Owns socket lookup and lifetime.
- [ ] `network-receive-queue` — Buffers received packets under explicit pressure policy.
- [ ] `network-transmit-queue` — Buffers outbound packets under explicit pressure policy.
- [ ] `loopback-network-device` — Provides deterministic local packet delivery.

## 15 — Kernel diagnostics and security boundaries

- [ ] `structured-kernel-log-event` — Defines stable event identity and bounded fields.
- [ ] `kernel-panic-handler` — Freezes unsafe activity and emits the strongest available diagnostics.
- [ ] `kernel-stack-trace-capture` — Walks supported stack frames safely enough for diagnostics.
- [ ] `kernel-symbol-lookup-table` — Maps instruction addresses to known symbol ranges.
- [ ] `kernel-assertion-policy` — Separates recoverable checks, debug assertions, and fatal invariants.
- [ ] `kernel-crash-dump-writer` — Emits bounded machine-readable crash state to a configured sink.
- [ ] `kernel-health-report` — Summarizes memory, scheduler, interrupt, and device health.
- [ ] `memory-manager-diagnostics` — Reports regions, mappings, ownership, and allocator state.
- [ ] `scheduler-diagnostics` — Reports runnable, blocked, sleeping, and stuck tasks.
- [ ] `interrupt-diagnostics` — Reports routing, counts, nesting, masking, and unexpected vectors.
- [ ] `device-manager-diagnostics` — Reports discovery, binding, resources, and failures.
- [ ] `kernel-lock-diagnostics` — Reports ownership, waiters, contention, and order violations.
- [ ] `kernel-watchdog-interface` — Arms, services, and reports watchdog state.
- [ ] `kernel-capability-identifier` — Provides stable identifiers for privileged operations.
- [ ] `kernel-capability-set` — Represents granted capabilities with explicit inheritance.
- [ ] `process-credentials` — Owns user, group, and capability identity.
- [ ] `kernel-user-identifier` — Provides typed user identity.
- [ ] `kernel-group-identifier` — Provides typed group identity.
- [ ] `kernel-permission-checker` — Evaluates credentials against object policy.
- [ ] `kernel-object-access-policy` — Defines operation-specific authorization on kernel objects.
- [ ] `executable-mapping-policy` — Governs executable memory creation.
- [ ] `write-xor-execute-policy` — Rejects writable and executable mappings unless explicitly authorized.
- [ ] `privilege-transition-validator` — Checks every kernel/userspace transition state.
- [ ] `syscall-authorization-layer` — Applies capability and object policy before side effects.
- [ ] `resource-quota-tracker` — Accounts memory, handles, processes, files, and other bounded resources.
- [ ] `process-isolation-policy` — Defines which resources and namespaces a process may observe.

## 16 — Kernel composition and system validation

- [ ] `kernel-configuration-model` — Describes enabled subsystems, policies, limits, and platform choices.
- [ ] `kernel-build-profile` — Selects debug, validation, release, and target-specific behavior.
- [ ] `kernel-subsystem-registry` — Gives subsystems stable identity and lifecycle hooks.
- [ ] `kernel-initialization-graph` — Orders initialization from declared dependencies.
- [ ] `kernel-boot-sequence` — Executes the initialization graph with bounded failure reporting.
- [ ] `kernel-shutdown-sequence` — Quiesces tasks, devices, filesystems, and CPUs in dependency order.
- [ ] `kernel-dependency-resolver` — Produces a validated selected subsystem closure.
- [ ] `kernel-capability-report` — Reports available platform and compiled capabilities.
- [ ] `kernel-feature-manifest` — Records the exact selected build and runtime feature set.
- [ ] `minimal-kernel-composition-recipe` — Builds the smallest bootable validated kernel.
- [ ] `minimal-userspace-composition-recipe` — Builds the smallest userspace process and filesystem image.
- [ ] `kernel-integration-smoke-test` — Boots and proves a bounded end-to-end scenario.
- [ ] `kernel-qemu-launch-harness` — Launches a deterministic virtual machine configuration.
- [ ] `kernel-qemu-serial-output-validator` — Matches boot and test markers under a deadline.
- [ ] `kernel-boot-timeout-detector` — Converts hangs into stage-aware failures.
- [ ] `kernel-image-packaging` — Produces bootloader-ready kernel and payload artifacts.
- [ ] `kernel-release-manifest` — Records build inputs, features, hashes, and validation references.
- [ ] `kernel-reproducibility-report` — Compares rebuilt artifacts without claiming unsupported reproducibility.

---

# Part II — Additional modules required to boot Alpine under Hyper-Zig

These are the gaps that remain after the existing Hyper-Zig roadmap. The preferred first milestone directly loads an Alpine-compatible Linux kernel and initramfs and exposes a serial console. Disk, networking, and SMP follow as later milestones.

## 17 — Guest RAM ownership and boot layout

- [ ] `guest-ram-owner` — Owns host backing pages and EPT mappings for guest RAM.
- [ ] `guest-physical-address-allocator` — Reserves non-overlapping guest-physical ranges for RAM, boot data, and devices.
- [ ] `guest-boot-layout-planner` — Places kernel, initramfs, command line, tables, and stacks within guest memory.
- [ ] `guest-initial-page-table-builder` — Builds any guest paging structures required by the selected Linux entry path.
- [ ] `guest-boot-stack-builder` — Creates the initial guest stack and validates alignment and bounds.
- [ ] `guest-initial-register-state-builder` — Produces the architectural state expected by the Linux boot protocol.

## 18 — Linux direct-boot protocol

- [ ] `linux-x86-boot-protocol-parser` — Validates supported Linux boot protocol versions and fields.
- [ ] `linux-x86-setup-header-decoder` — Decodes the setup header without relying on packed host structs.
- [ ] `linux-bzimage-kernel-loader` — Loads the protected-mode payload from a Linux bzImage.
- [ ] `linux-boot-parameter-builder` — Constructs the zeropage and referenced boot structures.
- [ ] `linux-e820-memory-map-builder` — Describes guest RAM, reserved, ACPI, and device regions to Linux.
- [ ] `linux-kernel-command-line-builder` — Produces a bounded guest command line with serial-console policy.
- [ ] `linux-initramfs-image-loader` — Places and describes the initramfs in guest memory.
- [ ] `linux-poweroff-and-reboot-detector` — Recognizes supported guest shutdown and reset mechanisms.
- [ ] `alpine-boot-artifact-catalog` — Validates and groups the selected Alpine kernel, initramfs, and optional modules.
- [ ] `alpine-serial-console-profile` — Supplies the tested command-line and console settings for the first milestone.

## 19 — vCPU execution completion

- [ ] `vcpu-execution-loop` — Repeatedly enters the guest, decodes exits, applies outcomes, and records bounded diagnostics.
- [ ] `guest-shutdown-detector` — Converts supported ACPI, port, hypercall, and halt patterns into lifecycle events.
- [ ] `guest-reset-controller` — Resets vCPU, device, timer, and memory-visible state in a defined order.
- [ ] `virtual-interrupt-injection-queue` — Queues guest-visible interrupts until legal injection windows.
- [ ] `guest-monotonic-clock` — Exposes a stable virtual time source derived from host monotonic time.
- [ ] `guest-timer-event-queue` — Orders virtual timer expirations and vCPU wakeups.

## 20 — Minimal Alpine serial-console device completion

- [ ] `virtual-uart-16550-interrupt-behavior` — Produces line, receive, transmit, and modem interrupt state expected by Linux.
- [ ] `host-serial-output-sink` — Sends guest UART bytes to the selected host diagnostic transport.
- [ ] `guest-console-byte-queue` — Buffers guest console output with explicit overflow behavior.
- [ ] `virtual-legacy-pic-model` — Provides the interrupt behavior needed when the selected guest path uses legacy PIC mode.
- [ ] `virtual-local-apic-model` — Provides LAPIC register, timer, and interrupt-delivery behavior.
- [ ] `virtual-io-apic-model` — Provides guest interrupt redirection behavior.
- [ ] `virtual-programmable-interval-timer` — Provides Linux-compatible minimal PIT behavior.
- [ ] `virtual-timestamp-counter-policy` — Defines guest-visible TSC offset, stability, and capability exposure.

At completion of sections 17–20, the intended system milestone is:

> Direct-load an Alpine-compatible Linux kernel and initramfs, boot one vCPU with fixed RAM, present a serial console, reach an Alpine shell, and shut down deterministically.

## 21 — Disk-backed Alpine with Virtio block

- [ ] `virtual-device-identifier` — Provides stable identity for emulated devices.
- [ ] `virtual-device-object` — Owns virtual-device state, resources, features, and lifecycle.
- [ ] `virtual-device-registry` — Resolves device handles and enumeration order.
- [ ] `virtual-bus-abstraction` — Defines PCI or MMIO child-device discovery.
- [ ] `virtual-device-resource-description` — Represents guest MMIO, PIO, interrupt, and DMA-visible resources.
- [ ] `virtual-pci-device-enumerator` — Presents the configured virtual PCI topology.
- [ ] `virtual-pci-bar-model` — Models guest-programmable BAR values and address decoding.
- [ ] `virtio-feature-negotiation` — Validates device and driver feature selection.
- [ ] `virtio-pci-transport` — Implements modern or transitional Virtio PCI transport policy.
- [ ] `virtio-queue-owner` — Owns queue configuration, reset, notification, and descriptor access.
- [ ] `virtio-block-device-model` — Executes validated Virtio block requests against a backend.
- [ ] `virtual-block-device-interface` — Defines sector reads, writes, flush, capacity, and errors.
- [ ] `host-disk-image-backend` — Adapts a bounded host image or block source to the virtual device interface.
- [ ] `virtual-block-request-validator` — Checks direction, length, sector range, and descriptor ownership.
- [ ] `guest-disk-interrupt-delivery` — Signals completed block requests through the selected virtual interrupt path.

## 22 — Alpine networking and SSH

- [ ] `virtual-network-device-interface` — Defines packet transmit, receive, feature, and link behavior.
- [ ] `virtual-packet-buffer` — Owns bounded guest/host packet bytes and offsets.
- [ ] `virtio-network-device-model` — Implements the Virtio-net configuration and queue behavior presented to Alpine.
- [ ] `virtio-network-transmit-queue` — Validates and forwards guest transmit chains.
- [ ] `virtio-network-receive-queue` — Supplies host packets into guest-owned receive buffers.
- [ ] `guest-network-interrupt-delivery` — Signals queue and configuration events.
- [ ] `host-tap-network-backend` — Connects virtual Ethernet frames to a host TAP interface where available.
- [ ] `host-userspace-network-backend` — Provides a non-TAP backend for controlled testing.
- [ ] `virtual-ethernet-frame-forwarder` — Moves complete frames without requiring a host TCP/IP implementation.
- [ ] `virtual-network-packet-validator` — Applies size, queue, checksum-offload, and feature constraints.

## 23 — Alpine SMP and multiple vCPUs

- [ ] `virtual-cpu-topology-model` — Presents sockets, cores, threads, and APIC identifiers to the guest.
- [ ] `per-cpu-vcpu-run-state` — Owns host-side execution state for each virtual CPU.
- [ ] `vcpu-scheduler` — Selects runnable vCPUs while preserving ownership and blocking rules.
- [ ] `vcpu-runnable-queue` — Stores runnable vCPU handles independently of policy.
- [ ] `vcpu-blocking-and-wakeup` — Connects HLT, timers, interrupts, and shutdown to scheduler state.
- [ ] `guest-tlb-shootdown-coordination` — Coordinates virtual CPU mapping visibility where required.

## 24 — Alpine system validation and composition

- [ ] `hyper-zig-build-profile` — Selects host platform, guest path, devices, diagnostics, and validation behavior.
- [ ] `hyper-zig-subsystem-registry` — Gives host and guest-facing subsystems stable identity and lifecycle.
- [ ] `hyper-zig-initialization-graph` — Orders host setup, VMX, guest memory, devices, and vCPUs.
- [ ] `hyper-zig-shutdown-sequence` — Quiesces vCPUs, devices, VMX, and host resources.
- [ ] `hyper-zig-dependency-resolver` — Selects the exact transitive module closure for a guest profile.
- [ ] `host-machine-capability-report` — Reports whether the machine can run the selected Hyper-Zig profile.
- [ ] `guest-configuration-model` — Describes guest CPUs, RAM, boot artifacts, devices, and limits.
- [ ] `guest-lifecycle-controller` — Governs created, loaded, runnable, running, paused, stopped, and destroyed states.
- [ ] `alpine-initramfs-guest-recipe` — Compiles and boots the direct-kernel Alpine shell milestone.
- [ ] `alpine-disk-image-guest-recipe` — Compiles and boots the Virtio-disk Alpine milestone.
- [ ] `alpine-networked-guest-recipe` — Boots Alpine with Virtio-net and proves network reachability.
- [ ] `hyper-zig-qemu-launch-harness` — Runs nested or emulated integration configurations where supported.
- [ ] `hyper-zig-bare-metal-launch-harness` — Packages and launches on supported physical test hardware.
- [ ] `alpine-serial-output-validator` — Matches Linux, OpenRC, shell, and shutdown markers under deadlines.
- [ ] `alpine-boot-progress-detector` — Converts output and exit state into named boot stages.
- [ ] `alpine-boot-timeout-detector` — Reports the final observed stage instead of a generic hang.
- [ ] `hyper-zig-integration-smoke-test` — Proves one complete guest boot and controlled shutdown.
- [ ] `hyper-zig-image-packaging` — Produces a bootable host image and records required guest artifacts.
- [ ] `hyper-zig-feature-manifest` — Records selected modules, target, guest profile, and virtual hardware.
- [ ] `hyper-zig-reproducibility-report` — Compares rebuilt host artifacts and guest-input hashes honestly.

---

# Milestone views

## Minimal standalone kernel

Requires the relevant reusable foundations plus Parts I sections 01–08, interrupt/timer support, diagnostics, and kernel composition. It does not yet require host userspace, VFS, or networking.

## General-purpose kernel with userspace

Adds sections 09–13 and the security boundary portions of section 15.

## Network-capable standalone kernel

Adds section 14 and the required device drivers.

## First Alpine shell under Hyper-Zig

Requires the existing Hyper-Zig roadmap plus Part II sections 17–20 and the initramfs validation recipe.

## Disk-backed Alpine

Adds section 21.

## Alpine with networking and SSH

Adds section 22.

## Alpine with multiple vCPUs

Adds section 23.

---

# Completion discipline

Every implemented item must receive the repository-standard module structure, canonical `details.json`, `port.js`, named import, unit tests, external smoke test, dependency declarations, and honest validation evidence.

Virtualization and kernel modules must additionally document:

- privilege level and execution context;
- trusted and untrusted inputs;
- interrupt and preemption assumptions;
- architecture and target assumptions;
- ownership of physical, virtual, and guest memory;
- cleanup and rollback after partial initialization;
- register and reserved-bit requirements;
- concurrency and cross-CPU behavior;
- malformed guest behavior and containment;
- emulator evidence separately from physical-hardware evidence.

Generated SQLite databases, disk images, kernel images, initramfs archives, and other binary artifacts are derived outputs. GitHub or patch tools may report that binary files are unsupported. That does not invalidate the text source changes. Regenerate those artifacts locally or in CI and record their hashes and validation evidence without treating them as canonical source.