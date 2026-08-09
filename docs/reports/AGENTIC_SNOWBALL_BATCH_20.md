# Agentic Snowball Batch 20 — Bounded ECALL Return to U-mode

## Task Projection

Advance only the machine boundary from Batch 19's terminal U-mode trap to one fixed register-only supervisor service, a deliberate SRET resume, proven post-return user execution, and one terminal ECALL. The sealed baseline is tag `morphic-riscv-first-bounded-umode-round-trip` at `25d41ceb967844b527ba1c59a0425ce5765e95af`; implementation began from planning HEAD `8434d715d4658af938104002c68b7be6c83aa744`.

## Pre-implementation gates

With Zig 0.14.0 and QEMU 8.2.2, both Batch 18 commands and both Batch 19 commands passed before source changes. The full commands each ran two real machines; Batch 19 retained 35 leaves, U=2, W+X=0, root `0x80218000` in that pre-change image, and 765-byte Morphic equality.

## Reuse and arithmetic

Batch 20 reuses unchanged the existing U RX code VA `0x80401000`, U RW/NX stack VA `0x80402000`, their Batch 19 physical frames, the four page-table frames and hierarchy, and the reserved supervisor trap stack. It overwrites the existing code frame and allocates neither a physical frame (`7 -> 7`) nor a page-table frame (`4 -> 4`). The final mapping remains exactly two U leaves and zero W+X leaves.

## Trap and return design

`userServiceTrapEntry` begins with `csrrw sp,sscratch,sp`, before any memory access, then saves x1–x31 plus `sepc`, `sstatus`, `scause`, and `stval` in the 288-byte supervisor-only trap frame. The first fixed service accepts only a0=`0x20` and a1=`0x19`, produces a0=`0x39`, prepares the ELF-derived after-service PC, clears SPP/SIE/SPIE/SUM, rearms the fixed trusted stack through the final CSR exchange, and executes SRET. User code observes `0x39`, verifies a preserved register sentinel, writes result `0x39` and sentinel `0x2020` to its own stack, marks a2=`0x20ee`, and executes exactly one terminal ECALL. Both frames reuse the same bounded address.

The copied symbols independently establish service ECALL, resume, and terminal ECALL offsets. Runtime evidence from the final lab records them as user PCs `0x80401014`, `0x80401018`, and `0x8040103a`. Both traps report cause 8, interrupt clear, and SPP clear. The terminal trap transfers deliberately to the known supervisor continuation; supervisor code restores and reads back canonical `stvec`, zero `sscratch`, and unchanged `satp`.

## Fence truth

No PTE changes, so no new SFENCE.VMA is required. Executable bytes do change, so a local-hart FENCE.I executes after repopulation and before user fetch. Changing executable bytes without changing a PTE requires instruction synchronization, not gratuitous translation invalidation.

## Validation and preservation

The Batch 20 full lab ran two real QEMU 8.2.2 machines and passed the strict Batch 12–19 chain before parsing Batch 20. Hosted twice, fake twice, and both machines produced the exact same 765-byte Morphic payload. Final aggregate results are recorded by the validation commands and implementation commit associated with the PR.

## Snowball Yield

Batch 19 paid once for U pages, physical ownership, Sv39 geometry, and trusted trap-stack ownership. Batch 20 reused them unchanged and added project-specific copied probe, full-enough integer context return, fixed service, terminal routing, evidence, and strict verification. New physical frames: 0. New page-table frames: 0. Canonical reusable repairs: 0. Morphic semantic changes: 0. Historical verifiers remain unchanged.

## One-Sentence Preventables

A trap handler that can enter S-mode is not yet a syscall-return boundary: returning safely requires preserving user state, preparing `sepc`/`sstatus`, rearming the trusted stack, and proving post-SRET U-mode execution.

## Explicit non-claims

This does not establish Linux/POSIX ABI behavior, syscall numbering or tables, scalable dispatch, arbitrary user pointers, user-copy or SUM access, processes, ELF userspace loading, scheduling, files, VFS, memory mapping, faults, signals, threads, SMP, hardware portability, or performance.

## Next smallest pressure

The next pressure is one bounded user-memory copy contract with explicit validation and failure behavior, not a broad syscall surface.
