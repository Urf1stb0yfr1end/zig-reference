# Agentic Snowball Batch 19 — first bounded U-mode round trip

## Task Projection

- **Requested capability:** one mechanically evidenced S→U→S probe on the Batch 18 hardened Sv39 address space.
- **Executable gate:** at supplied HEAD `71027b868d0c409daf3963a472956b4c7c93dcbd`, the Batch 18 self-test and full two-QEMU lab passed with 32 U=0 leaves, zero W+X leaves, the owned root, Batch 12–17 preservation, and 765-byte Morphic equality.
- **Selected/reused foundations:** physical region/allocator, Sv39 entry/indexing/owner/walker/builder, SFENCE.VMA, the historical trap proofs, and the Morphic hosted/fake/freestanding recipe remain the integration closure.
- **Frame arithmetic:** the eight-page pool retains four page-table frames and one alias frame after Batch 18. Batch 19 consumes two distinct remaining frames for code and stack; no page-table frame is added.
- **VA layout:** alias `0x80400000`; code `0x80401000` (U=1 RX, A=1, D=0); stack `0x80402000..0x80403000` (U=1 RW/NX, A=D=1). These share the existing alias L0 subtree.
- **Privilege invariants:** exactly two U leaves, every other leaf U=0, and no leaf W+X.
- **Probe:** ELF-visible position-independent template bytes are copied into the owned code frame. It stores and reloads `0x139` at the supplied user stack, establishes register sentinels, executes one ECALL, then contains a fail-stop instruction/loop.
- **Synchronization:** the populated mappings receive global SFENCE.VMA followed by local-hart FENCE.I before SRET.
- **Trap policy:** interrupts, SPIE, SPP, and SUM are cleared. `stvec` selects the bounded user trap and `sscratch` holds the dedicated trap-stack top.
- **Trusted stack:** the historical 64 KiB reservation is retained; its upper 4 KiB is linker-symbolized as the U-trap stack while ordinary execution begins below it. The first trap instruction is `csrrw sp,sscratch,sp`; no memory access precedes it.
- **Return:** cause 8, interrupt 0, trapped SPP 0, exact template-derived `sepc`, user-sp bounds, register sentinels, and stack sentinel are recorded. The trap deliberately sets SPP and `sepc` for a known S-mode resume label, after which normal `sp`, `stvec`, and neutral `sscratch` are restored.
- **Raw evidence:** the final frame reports every level-0 VA/PA/raw-PTE row; the verifier decodes PPN and permission bits rather than trusting labels.
- **Unknowns/non-claims:** nested traps, asynchronous U-mode interrupts, adversarial faults, processes, syscall dispatch/return-to-user, user-copy, ELF loading, Linux ABI, SMP, and hardware beyond tested QEMU are not claimed.
- **Minimum trustworthy read set:** this report, the recipe contract, the freestanding Zig source/linker script, Batch 18 verifier, and Batch 19 verifier.
- **Focused commands:** the two Batch 18 gates, both Batch 19 commands, foundation build tests, command drift check, doctor, and repository validation.

## Real-machine evidence

Two QEMU 8.2.2 `virt` machines completed the same copied probe. Each reported `scause=8`, interrupt 0, trapped SPP 0, `sepc=0x8040100e`, user `sp=0x80402ff0`, a trap frame wholly within the supervisor-only dedicated stack, four page-table pages before and after, exactly two U leaves, and zero W+X leaves. Hosted, fake, and both machines produced exactly the same 765-byte Morphic payload.

## Snowball Yield

- Reusable modules reused unchanged: physical memory and complete Sv39 closure.
- Existing page-table hierarchy reused unchanged: yes; four pages before and after.
- Project-specific machine boundary added: copied user template, SRET trampoline, one-shot trap entry/continuation, and evidence frame.
- Canonical reusable repair: none.
- New physical data frames: two. New page-table frames: zero. One pool frame remains unconsumed.
- Old verifiers changed: zero; Batch 12–18 parsers remain historical truth.
- Morphic semantic changes: zero.

## One-Sentence Preventables

Fresh executable bytes are not proven merely because QEMU fetched them: install translations with SFENCE.VMA and synchronize local instruction fetch with FENCE.I before SRET.

## Next smallest pressure

A separately reviewed bounded non-Linux ECALL boundary that deliberately returns to U-mode; Batch 19 does not implement it.
