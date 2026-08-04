# RISC-V 64 Alpine Boot Checklist

> A parallel completion path for building a Zig 0.14.0 RISC-V hypervisor that boots an unmodified Alpine Linux `riscv64` guest to a serial shell.

## Relationship to the existing roadmap

This checklist does **not** replace [`HYPER_ZIG_REQUIRED_MODULES.md`](../roadmaps/HYPER_ZIG_REQUIRED_MODULES.md).

The existing Hyper-Zig roadmap remains the x86_64/Intel VMX path. This document adds a second, independent architecture path centered on RISC-V 64, the RISC-V Hypervisor extension, Sv39/Sv39x4 translation, SBI, device-tree discovery, and a Linux/Alpine guest.

Shared architecture-neutral modules should be reused by both paths whenever their contracts fit. Architecture-specific modules must remain explicit rather than being forced into misleading generic abstractions.

## Completion rule

A checked item means the named capability has:

- an implementation;
- a strict `details.json` contract;
- unit tests;
- an external smoke test;
- Zig 0.14.0 compiler validation;
- honest dependency and validation evidence;
- no tracked binary artifacts.

Integration milestones require reproducible execution evidence in addition to module-level completion.

---

## Milestone 0 — Preserve the green foundation

- [x] All current 39 modules compile under Zig 0.14.0.
- [x] `zig build check` passes.
- [x] `zig build status` passes.
- [x] `zig build smoke` passes.
- [x] `zig build test` passes.
- [x] `zig build recipes` passes.
- [x] `zig build conformance` passes.
- [x] `zig build validate-repository` passes.
- [x] Baseline tagged as `zig-0.14.0-all-validations-pass`.
- [ ] Validation evidence counters truthfully reflect module-level compiler, smoke, and conformance results.
- [ ] GitHub Actions reproduces the seven-command validation gate with Zig 0.14.0.

---

## Milestone 1 — RISC-V architectural value types

- [ ] `riscv-xlent-register-value`
- [ ] `riscv-privilege-mode`
- [ ] `riscv-csr-address`
- [ ] `riscv-csr-read-write-primitives`
- [ ] `riscv-mstatus-sstatus-hstatus-bitfields`
- [ ] `riscv-satp-hgatp-register-values`
- [ ] `riscv-trap-cause`
- [ ] `riscv-interrupt-cause`
- [ ] `riscv-exception-cause`
- [ ] `riscv-trap-vector-mode`
- [ ] `riscv-instruction-address`
- [ ] `riscv-physical-address`
- [ ] `riscv-host-virtual-address`
- [ ] `riscv-guest-physical-address`
- [ ] `riscv-guest-virtual-address`
- [ ] `riscv-page-size-and-alignment`
- [ ] `riscv-pte-permission-flags`
- [ ] `riscv-fence-primitives`
- [ ] `riscv-hypervisor-extension-capability-check`
- [ ] `riscv-isa-extension-set`

**Exit condition:** architectural register, address, cause, privilege, and feature values are represented by explicit tested types.

---

## Milestone 2 — Sv39 host translation

- [ ] `riscv-sv39-page-table-entry`
- [ ] `riscv-sv39-virtual-address-decomposition`
- [ ] `riscv-sv39-canonical-address-validator`
- [ ] `riscv-sv39-page-table-walker`
- [ ] `riscv-sv39-page-table-builder`
- [ ] `riscv-sv39-map-operation`
- [ ] `riscv-sv39-unmap-operation`
- [ ] `riscv-sv39-protect-operation`
- [ ] `riscv-sv39-superpage-policy`
- [ ] `riscv-sv39-translation-fault`
- [ ] `riscv-sfence-vma-wrapper`
- [ ] `riscv-host-address-space-layout`
- [ ] `riscv-early-page-table-arena`
- [ ] `riscv-kernel-stack-with-guard-pages`
- [ ] `riscv-temporary-physical-mapping-window`

**Exit condition:** a freestanding host can create, activate, inspect, modify, and invalidate Sv39 mappings.

---

## Milestone 3 — Sv39x4 guest-stage translation

- [ ] `riscv-sv39x4-page-table-entry`
- [ ] `riscv-sv39x4-guest-physical-address-decomposition`
- [ ] `riscv-sv39x4-root-table-layout`
- [ ] `riscv-sv39x4-page-table-walker`
- [ ] `riscv-sv39x4-page-table-builder`
- [ ] `riscv-sv39x4-map-operation`
- [ ] `riscv-sv39x4-unmap-operation`
- [ ] `riscv-sv39x4-protect-operation`
- [ ] `riscv-sv39x4-superpage-policy`
- [ ] `riscv-hfence-gvma-wrapper`
- [ ] `riscv-hfence-vvma-wrapper`
- [ ] `riscv-guest-stage-page-fault-decoder`
- [ ] `riscv-guest-physical-memory-map`
- [ ] `riscv-guest-memory-translation`
- [ ] `riscv-guest-memory-read-write-view`
- [ ] `riscv-guest-page-ownership-tracker`

**Exit condition:** guest-physical memory can be safely backed by host pages and translated through Sv39x4.

---

## Milestone 4 — HS-mode runtime and trap entry

- [ ] `riscv-hs-mode-entry-state`
- [ ] `riscv-hs-mode-runtime-initialization`
- [ ] `riscv-hs-trap-entry-assembly`
- [ ] `riscv-hs-trap-frame`
- [ ] `riscv-hs-trap-frame-decoder`
- [ ] `riscv-hs-trap-dispatcher`
- [ ] `riscv-hs-exception-dispatcher`
- [ ] `riscv-hs-interrupt-dispatcher`
- [ ] `riscv-virtual-supervisor-state`
- [ ] `riscv-vcpu-general-register-state`
- [ ] `riscv-vcpu-csr-state`
- [ ] `riscv-vcpu-lifecycle-controller`
- [ ] `riscv-guest-entry-assembly`
- [ ] `riscv-guest-exit-return-path`
- [ ] `riscv-virtual-instruction-trap-decoder`
- [ ] `riscv-illegal-instruction-emulation-boundary`

**Exit condition:** the host can enter a guest, recover a complete exit state, dispatch the cause, and resume or stop deterministically.

---

## Milestone 5 — Host SBI and platform discovery

- [ ] `riscv-sbi-call-wrapper`
- [ ] `riscv-sbi-base-extension`
- [ ] `riscv-sbi-time-extension`
- [ ] `riscv-sbi-ipi-extension`
- [ ] `riscv-sbi-rfence-extension`
- [ ] `riscv-sbi-hart-state-management-extension`
- [ ] `riscv-sbi-system-reset-extension`
- [ ] `riscv-sbi-debug-console-extension`
- [ ] `riscv-sbi-extension-probe`
- [ ] `riscv-sbi-error-decoder`
- [ ] `riscv-hart-id-set`
- [ ] `riscv-host-timer-source`
- [ ] `riscv-host-console-output`

**Exit condition:** the hypervisor can discover and use required host firmware services without hidden platform assumptions.

---

## Milestone 6 — Flattened Device Tree support

- [ ] `fdt-header-parser`
- [ ] `fdt-reservation-block-parser`
- [ ] `fdt-structure-token-decoder`
- [ ] `fdt-string-table-view`
- [ ] `fdt-node-path-tracker`
- [ ] `fdt-property-decoder`
- [ ] `fdt-cell-width-decoder`
- [ ] `fdt-reg-property-decoder`
- [ ] `fdt-ranges-property-decoder`
- [ ] `fdt-compatible-property-decoder`
- [ ] `fdt-cpu-discovery`
- [ ] `fdt-memory-discovery`
- [ ] `fdt-uart-discovery`
- [ ] `fdt-interrupt-controller-discovery`
- [ ] `fdt-virtio-mmio-discovery`
- [ ] `fdt-builder`
- [ ] `fdt-guest-tree-constructor`
- [ ] `fdt-validation-report`

**Exit condition:** host platform resources are discovered from FDT and a bounded guest FDT can be constructed and validated.

---

## Milestone 7 — Guest SBI virtualization

- [ ] `riscv-guest-sbi-call-decoder`
- [ ] `riscv-guest-sbi-base-emulation`
- [ ] `riscv-guest-sbi-time-emulation`
- [ ] `riscv-guest-sbi-ipi-emulation`
- [ ] `riscv-guest-sbi-rfence-emulation`
- [ ] `riscv-guest-sbi-hart-state-emulation`
- [ ] `riscv-guest-sbi-system-reset-emulation`
- [ ] `riscv-guest-sbi-debug-console-emulation`
- [ ] `riscv-guest-sbi-return-value`
- [ ] `riscv-guest-hart-state-table`
- [ ] `riscv-guest-timer-deadline`
- [ ] `riscv-guest-virtual-interrupt-pending-state`

**Exit condition:** an unmodified Linux guest receives the SBI services required for boot, timing, hart control, console, and shutdown.

---

## Milestone 8 — Interrupts, timers, and virtual platform

- [ ] `riscv-aclint-mswi-register-model`
- [ ] `riscv-aclint-mtimer-register-model`
- [ ] `riscv-imsic-register-model`
- [ ] `riscv-aplic-register-model`
- [ ] `riscv-plic-register-model`
- [ ] `riscv-virtual-interrupt-router`
- [ ] `riscv-virtual-timer-controller`
- [ ] `riscv-virtual-software-interrupt-controller`
- [ ] `riscv-external-interrupt-injection`
- [ ] `riscv-virtual-interrupt-injection`
- [ ] `riscv-wfi-trap-and-blocking-policy`
- [ ] `riscv-vcpu-wakeup-controller`
- [ ] `riscv-mmio-device-range-registry`
- [ ] `riscv-mmio-access-decoder`
- [ ] `riscv-mmio-dispatcher`

**Exit condition:** guest timer, software, and external interrupts are delivered with reproducible ordering and bounded state transitions.

---

## Milestone 9 — Serial console

- [ ] `uart-16550-register-model`
- [ ] `uart-16550-mmio-handler`
- [ ] `uart-16550-transmit-buffer`
- [ ] `uart-16550-receive-buffer`
- [ ] `uart-16550-interrupt-state`
- [ ] `guest-serial-console`
- [ ] `host-serial-console-bridge`
- [ ] `serial-transcript-capture`

**Exit condition:** guest Linux boot output is visible and the Alpine serial console accepts input.

---

## Milestone 10 — Linux RISC-V image loading

- [ ] `linux-riscv-image-header-parser`
- [ ] `linux-riscv-image-validator`
- [ ] `linux-riscv-kernel-load-plan`
- [ ] `linux-riscv-kernel-loader`
- [ ] `linux-riscv-kernel-entry-state`
- [ ] `linux-initramfs-loader`
- [ ] `linux-riscv-command-line-builder`
- [ ] `linux-riscv-guest-memory-layout`
- [ ] `linux-riscv-boot-hart-selection`
- [ ] `linux-riscv-secondary-hart-startup-state`
- [ ] `linux-riscv-boot-artifact-catalog`
- [ ] `linux-riscv-boot-plan-validator`

**Exit condition:** kernel image, initramfs, command line, guest FDT, and initial register state are placed according to the Linux RISC-V boot contract.

---

## Milestone 11 — Guest execution loop

- [ ] `riscv-vm-configuration`
- [ ] `riscv-vm-owner`
- [ ] `riscv-vcpu-owner`
- [ ] `riscv-vcpu-run-result`
- [ ] `riscv-vcpu-run-loop`
- [ ] `riscv-guest-exit-reason`
- [ ] `riscv-guest-exit-dispatcher`
- [ ] `riscv-guest-fatal-report`
- [ ] `riscv-guest-shutdown-reason`
- [ ] `riscv-guest-reset-controller`
- [ ] `riscv-guest-progress-watchdog`
- [ ] `riscv-deterministic-boot-transcript`

**Exit condition:** the guest can run continuously through expected exits until shell, shutdown, reset, or a fully explained fatal condition.

---

## Milestone 12 — First Alpine shell

- [ ] Obtain a reproducible Alpine Linux `riscv64` kernel and initramfs without committing binary artifacts.
- [ ] Record artifact versions, hashes, source URLs, and retrieval commands as text.
- [ ] Boot the unmodified kernel under the Zig hypervisor.
- [ ] Reach early Linux console output.
- [ ] Complete device-tree parsing in the guest.
- [ ] Complete SBI discovery in the guest.
- [ ] Mount the initramfs root filesystem.
- [ ] Launch Alpine init.
- [ ] Reach an interactive serial login or emergency shell.
- [ ] Execute a deterministic command inside the guest.
- [ ] Shut down through guest SBI system reset.
- [ ] Preserve a textual boot transcript and validation manifest.
- [ ] Reproduce the boot from a clean checkout using documented commands.
- [ ] Run the repository’s seven-command Zig 0.14.0 validation gate after integration.

**Primary milestone:** an unmodified Alpine Linux `riscv64` guest reaches an interactive serial shell.

---

## Milestone 13 — Persistent Alpine guest

- [ ] `virtio-mmio-transport`
- [ ] `virtio-feature-negotiation`
- [ ] `virtio-queue-layout`
- [ ] `virtio-descriptor-chain-walker`
- [ ] `virtio-used-ring-writer`
- [ ] `virtio-interrupt-status`
- [ ] `virtio-block-device-model`
- [ ] `virtio-block-request-decoder`
- [ ] `virtio-block-backing-store`
- [ ] Boot Alpine from a virtual block device.
- [ ] Mount a persistent writable filesystem.
- [ ] Run `apk` against a local or reachable repository.
- [ ] Reboot without losing the guest filesystem.

**Exit condition:** Alpine boots from persistent virtual storage rather than only an initramfs.

---

## Milestone 14 — Networked Alpine guest

- [ ] `virtio-network-device-model`
- [ ] `virtio-network-header-codec`
- [ ] `virtio-network-rx-queue`
- [ ] `virtio-network-tx-queue`
- [ ] `host-guest-packet-bridge`
- [ ] `virtual-network-address-configuration`
- [ ] `virtual-network-checksum-policy`
- [ ] Obtain an IP address inside Alpine.
- [ ] Reach the host from the guest.
- [ ] Reach an allowed external endpoint from the guest.
- [ ] Install or update a package with `apk`.
- [ ] Start SSH inside the guest.
- [ ] Log in to the Alpine guest over SSH.

**Exit condition:** the guest has reproducible virtio networking and remote shell access.

---

## Milestone 15 — Multiprocessor guest

- [ ] `riscv-multi-vcpu-topology`
- [ ] `riscv-vcpu-thread-or-scheduler-binding`
- [ ] `riscv-guest-ipi-routing`
- [ ] `riscv-guest-tlb-shootdown-emulation`
- [ ] `riscv-multi-vcpu-startup-barrier`
- [ ] `riscv-multi-vcpu-stop-controller`
- [ ] `riscv-shared-guest-memory-ordering-contract`
- [ ] Boot Alpine with at least two guest harts.
- [ ] Verify all guest harts become online.
- [ ] Run a deterministic concurrent guest workload.
- [ ] Shut down all vCPUs cleanly.

**Exit condition:** Alpine boots and operates correctly with multiple virtual harts.

---

## Milestone 16 — Reproducibility and system proof

- [ ] QEMU-based host execution is documented and automated.
- [ ] Required QEMU version and machine configuration are pinned textually.
- [ ] A clean checkout can recreate all external guest artifacts from recorded hashes and URLs.
- [ ] No Alpine image, kernel, initramfs, disk image, firmware blob, executable, object file, cache, or archive is committed.
- [ ] Boot tests have explicit timeouts and failure diagnostics.
- [ ] Boot transcript assertions are deterministic and minimally brittle.
- [ ] Negative tests cover malformed FDT, invalid kernel image, bad mappings, and unsupported SBI calls.
- [ ] Guest memory translation has fuzz/property coverage.
- [ ] FDT and image parsers have bounded-input fuzz coverage.
- [ ] Page-table walkers have differential or model-based tests.
- [ ] Every architecture-specific assumption is documented.
- [ ] `zig build check` passes.
- [ ] `zig build status` passes.
- [ ] `zig build smoke` passes.
- [ ] `zig build test` passes.
- [ ] `zig build recipes` passes.
- [ ] `zig build conformance` passes.
- [ ] `zig build validate-repository` passes.
- [ ] A clean integration command boots Alpine to shell and exits successfully.
- [ ] `system_proven` becomes true only after the reproducible boot evidence exists.

---

## Recommended implementation order

1. Evidence/status integrity for the existing 39-module foundation.
2. `riscv-sv39-page-table-entry` as the first new RISC-V module.
3. Remaining architectural value types and CSR wrappers.
4. Sv39 host mapping.
5. Sv39x4 guest-stage mapping.
6. HS-mode entry, trap handling, and vCPU state.
7. Host SBI wrappers and FDT discovery.
8. Guest SBI virtualization.
9. Interrupt, timer, and MMIO framework.
10. UART and serial transcript support.
11. Linux image/initramfs/FDT loading.
12. Guest execution loop.
13. Alpine initramfs boot to serial shell.
14. Virtio block and persistent Alpine.
15. Virtio network and SSH.
16. Multi-vCPU support and final reproducibility proof.

## Final definition of success

The RISC-V path is complete when a clean checkout can, using Zig 0.14.0 and documented external dependencies:

1. pass the full repository validation pipeline;
2. build the RISC-V hypervisor without tracked binary artifacts;
3. retrieve hash-verified Alpine guest artifacts externally;
4. boot an unmodified Alpine Linux `riscv64` guest;
5. reach an interactive serial shell;
6. run a deterministic guest command;
7. shut down cleanly;
8. reproduce the result from documented textual commands and evidence.
