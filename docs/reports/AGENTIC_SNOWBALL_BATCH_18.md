# Agentic Snowball Batch 18: Supervisor-only Sv39 permission domains

## Baseline and first executable gate

Work began at planning revision `3dfac9224ff537e58e79e6299df20751acbfe610`. The supplied checkout initially lacked `qemu-system-riscv64`; QEMU 8.2.2 was installed rather than treating that environmental absence as evidence. The Batch 17 rejection self-test then passed, and its canonical real lab built the current ELF and passed two bounded system-QEMU runs: the owned eight-page pool, Bare allocator phase, four real page-table frames, active Sv39 root, global fence, non-identity alias, Batch 12–16 proofs, and exact 765-byte Morphic equality all held.

## Task Projection

| Question | Frozen Batch 18 answer |
|---|---|
| Requested capability | Harden the already-active bounded supervisor Sv39 address space without changing Morphic semantics. |
| Canonical gate | Batch 17 self-test plus its two-real-machine execution lab. |
| Reused modules | Sv39 Entry, indexing, Walker, Builder, SFENCE.VMA invalidation, address/PFN conversion, physical region set, and page-frame allocator. |
| Linker domains | ELF symbols define contiguous page-aligned text, rodata, and writable half-open ranges. |
| Page policy | 4096-byte transitions; incompatible sections never share a hardware page. |
| Live mutation | `Builder.protect` directly replaces a valid leaf once, preserving target and level; no transient unmap. |
| Text | Supervisor RX, A=1, D=0. |
| Rodata | Supervisor R/NX, A=1, D=0. |
| Writable state | Data, BSS, stack, owned pool, and identity-mapped page tables are supervisor RW/NX, A=D=1. |
| Alias | Supervisor RW/NX, A=D=1, with a distinct owned physical target. |
| U/W^X | Every emitted installed leaf has U=0; the verifier recomputes W+X and requires zero. |
| satp/fence | Mode, ASID, and owned root remain unchanged; one global SFENCE.VMA follows all replacements and precedes probes. |
| Positive probes | Hardened code execution, rodata read, stack/global mutation, alias write/read, identity read, satp read, evidence output, then Morphic. |
| Raw evidence | One bounded VA/PA/raw-PTE/level row per installed leaf, decoded independently by Python. |
| Failure behavior | Missing, malformed, contradictory, extra, duplicate, wrong-level, wrong-target, unsafe-permission, stale, and out-of-order evidence fails nonzero. |
| Unknowns | Real hardware behavior beyond QEMU and multi-hart invalidation remain unmeasured. |
| Non-claims | No U-mode, faults/recovery, processes, ASIDs, syscalls, demand paging, general VMM, or Linux ABI. |
| Minimum trustworthy read set | Linker script, freestanding adapter, Entry/Walker/Builder contracts and source, SFENCE contract, recipe, and focused verifier. |
| Focused validation | Canonical tests/smokes for the Sv39 and physical-memory closure, both Batch 17 surfaces, and both Batch 18 surfaces. |
| Preservation | Batch 12–17 parsers plus hosted/fake/two-real-machine Morphic byte equality. |
| Success evidence | ELF-derived ranges and actual installed raw leaf bits, not labels or a machine-reported W^X count. |

## Implementation truth

The linker now establishes `__text_domain_begin/end`, `__rodata_domain_begin/end`, and `__writable_domain_begin/end`. The text-to-rodata and rodata-to-writable transitions are aligned to 4096 bytes; the writable range includes data, BSS, the 64 KiB stack, and the eight-page owned pool. `__image_begin` and `__image_end` retain their whole-image meaning.

Review found the old `Builder.protect` unsuitable for a live address space: it called `unmapPage` and then `mapPage`, transiently installing an invalid leaf and collapsing the second operation's error to `ProviderWriteFailure`. The smallest canonical repair walks to the existing leaf, validates its level, constructs a legal replacement with the old physical base, and performs exactly one provider write. Tests cover preserved PA/level, exact permission changes, missing/malformed rejection, write-failure atomicity, and the returned address invalidation plan.

Walker results now carry `raw_entry`, tying evidence to the entry actually read from provider memory. Batch 18 tightens all historical Batch 17 leaves, performs one global SFENCE.VMA, executes the positive probes, and emits one fixed-capacity row for every identity leaf plus the alias. The verifier derives expected pages from ELF symbols and independently decodes V/R/W/X/U/A/D, reserved bits, PPN, target, and level.

## Real-machine evidence and preservation

The canonical Batch 18 lab ran two QEMU 8.2.2 `virt` machines. The inspected ELF and both outputs agreed on text `[0x80200000,0x80205000)`, rodata `[0x80205000,0x80206000)`, writable `[0x80206000,0x8021f000)`, 32 total installed leaves, and root `0x80217000`. Independent decoding found text RX, rodata R/NX, writable and alias RW/NX, U=0 everywhere, and W+X=0 everywhere. Both runs retained Sv39 mode/root across mutation, crossed the global fence, passed all positive probes, preserved Batch 12–17, and emitted the exact canonical 765-byte Morphic payload after `ZIGREF_SV39_PERMISSIONS_RETURNED`.

| Proof | Result |
|---|---|
| Batch 12 breakpoint/sret | Preserved by existing parser and ELF symbol check. |
| Batch 13 one-shot timer | Preserved. |
| Batch 14 four ticks/re-arms/returns | Preserved. |
| Batch 15 real-time scheduler bridge | Preserved. |
| Batch 16 owned physical memory | Preserved. |
| Batch 17 active Sv39 and alias | Preserved as a historical pre-hardening frame. |
| Batch 18 permission domains | Two real machines passed independent raw-PTE verification. |
| Morphic equality | Hosted = fake = two hardened real machines, 765 bytes. |

## Snowball Yield

Direct reuse covered 11 reusable foundations: Entry, indexing, hosted page-owner precedent, Walker, SFENCE invalidation, Builder, distinct address types, PFN conversion, physical region set, physical allocator, and the bounded scheduler/Morphic path. Existing `construct-and-verify-sv39-address-space` knowledge and the `run-hosted-morphic-runtime` recipe supplied the composition pattern. Two reusable layers changed: Builder received safe live leaf replacement, and Walker exposed the raw provider entry. Morphic semantic changes were zero; no old verifier required semantic weakening or modification. The Batch 17 lab ran twice before implementation and again on the final tree; the Batch 18 lab ran two real machines. Exact target/verifier/documentation line totals are derived from the final diff rather than promoted as a universal productivity benchmark.

The machine acquired materially stronger memory-protection semantics primarily by recomposing existing Sv39 machinery and refining linker truth, rather than inventing another page-table subsystem.

## One-Sentence Preventables

1. A permission split is not real if incompatible ELF sections still share one hardware page.
2. W^X is a property of installed leaf PTE bits, not of section names or documentation labels.
3. Do not transiently unmap the page currently executing merely because stale TLB state might let QEMU survive.
4. Changing live PTE permissions is incomplete until the required translation invalidation boundary has executed.
5. A supervisor-only kernel map must prove U=0 on every installed kernel leaf, not merely omit user-mode tests.

## Explicit non-claims and next pressure

This batch does not add user mappings, U-mode execution, page-fault handling or recovery, processes, syscalls, Linux ABI behavior, demand paging, copy-on-write, ASIDs, SMP shootdown, a higher half, hardware RAM discovery, or a general VMM. The next smallest pressure is a separately reviewed bounded U-mode entry/return contract built on this hardened supervisor baseline; it is deliberately not implemented here.
