# Agentic Snowball Batch 16: bounded freestanding physical-memory ownership

## Starting point

The supplied checkout was at `94c4926fa03be88bfd6151a15015932fdf4affa0`; the independently reproduced Batch 15 revision `8779bab919e31abf84e3601f874cd1e388451a08` is an ancestor. No historical tag was changed.

## First executable gate

Before implementation, `python3 tools/verify-freestanding-riscv64-scheduler-time.py --self-test` passed. After installing the missing system-QEMU executable, `python3 tools/verify-freestanding-riscv64-scheduler-time.py` ran two real QEMU 8.2.2 machines and passed: four real `rdtime` observations per run, readiness `[1,2,0,1]`, selection `[1@0,2@1,3@1,4@3]` after `sret`, Batch 12/13/14 preservation, and exact 765-byte native/fake/machine equality.

## Task Projection

| Fact | Frozen Batch 16 choice |
|---|---|
| Requested capability | Own and exercise a bounded set of real physical frames without guessing platform RAM. |
| Reused modules | `distinct-memory-address-types`, `physical-page-frame-number-and-address-conversion`, `physical-memory-region-set`, and `physical-page-frame-allocator`. |
| Machine adapter | `recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig`; no RISC-V policy enters the allocator. |
| Owned pool | Eight 4096-byte pages in linker section `.physical_page_pool (NOLOAD)`. |
| Linker symbols | `__physical_page_pool_begin`, `__physical_page_pool_end`; `__image_end` includes the pool. |
| Translation evidence | Runtime raw `satp == 0`, independently parsed as Bare before direct physical dereference. |
| Allocation invariants | Exactly eight unique, aligned, entirely in-pool frames; ninth allocation is `Exhausted`. |
| Release invariants | Release index 2, reject its second release, reject pool-end foreign PFN, deterministically reacquire index 2, then reconcile eight free/zero allocated. |
| Rejections | Missing/duplicate frames and fields, bad bounds/page size/Bare state, duplicate/out-of-pool/unaligned frames, sentinel contradiction, missing exhaustion, malformed releases, bad accounting, prior-frame regression, and Morphic drift. |
| Unknowns | Platform RAM outside the ELF-owned interval, hardware ownership discovery, and suitability for paging policy remain unknown and untouched. |
| Non-claims | No Sv39, DTB discovery, U-mode, syscalls, Linux ABI, general PMM, heap, DMA, SMP, or hardware memory test. |
| Minimum trustworthy reads | The four module contracts/sources, recipe contract, freestanding Zig adapter, linker script, current verifier sequence, `COMMANDS.md`, and this plan/report. |
| Focused validation | Both Batch 16 verifier modes plus focused physical-region and frame-allocator tests. |
| Preservation validation | Both Batch 15 verifier modes and complete repository validation. |

## Existing capabilities reused

`PhysicalMemoryRegionSet(1).add` represents precisely one usable interval using `PhysicalAddress`. `PhysicalPageFrameAllocator(8).initFromRegions` consumes that region and supplies its established deterministic allocation, exhaustion, release, foreign-frame, double-free, and accounting semantics. `PhysicalPageFrameNumber.toAddress` establishes the PFN/address relationship. No reusable module changed.

## Linker-owned pool design

The linker aligns a separate NOLOAD section to 4096 bytes after the ordinary BSS and 64 KiB stack, exposes begin/end symbols, advances by exactly `8 * 4096`, and places `__image_end` after it. The verifier reads the built ELF symbol table rather than trusting source or runtime PASS text, checks the exact interval and page alignment, and proves it is disjoint from the linker stack interval. In the recorded real lab, ELF and runtime both reported `[0x80214000,0x8021c000)`.

## Bare-translation proof

The adapter reads the actual supervisor `satp` CSR immediately before pool composition and emits the raw fixed-width value. Each real run reported zero. The verifier requires raw `satp == 0` and `translation=bare`; any nonzero state or contradictory label is rejected. Thus linker addresses are directly dereferenced only under actual Bare identity translation. Sv39 is not installed or activated.

## Real allocation/access scenario

Each machine registers only the linker interval, initializes the existing allocator, allocates eight frames, and records raw PFN/address evidence. For every frame it writes one deterministic machine-word sentinel at byte offset 64 and reads it back. The verifier independently recomputes PFN multiplication, alignment, interval containment, uniqueness, offset bounds, and sentinel values. It then proves ninth-allocation exhaustion; successful release; `DoubleFree`; pool-end `ForeignFrame`; deterministic reacquisition; and final eight-free/zero-allocated accounting. The scenario returns before unchanged Morphic execution.

## Rejection-oriented verifier

`tools/verify-freestanding-riscv64-physical-memory.py --self-test` mutates valid combined evidence and requires rejection of framing, field-set, ELF-bound, page-size, alignment, pool-size, Bare-mode, count, uniqueness/bounds, sentinel, exhaustion, release/rejection, reacquisition, accounting, completion, prior-proof, and Morphic contradictions. Real mode builds and inspects the ELF, runs two finite-timeout QEMU machines, reuses earlier parsers, and ends through Developer Minimus without masking child failures.

## Preservation matrix

| Proof | Mechanical preservation |
|---|---|
| Batch 12 | Existing trap parser plus ELF breakpoint address checks the synchronous breakpoint and return. |
| Batch 13 | Existing timer parser checks the one-shot cause-5 frame and policy. |
| Batch 14 | Existing ticks parser checks four monotonic deliveries/returns, re-arms, and final neutralization. |
| Batch 15 | Existing scheduler parser checks identity mapping, readiness/order, after-`sret` decisions, and completion. |
| Morphic | Two hosted, two fake, and two real-machine payloads compare byte-for-byte at 765 bytes. |

## Snowball Yield

Four existing reusable memory modules and their complete dependency closure were reused. Genuinely new work consists of one linker reservation, a small freestanding composition/evidence adapter, and one independent rejection/real-machine verifier. Reusable modules changed: zero. New reusable modules: zero. Quantitative productivity or universal benchmark gain: `unmeasured`.

## One-Sentence Preventables

Do not treat a linker address as a directly dereferenceable physical frame unless the ELF placement, pool bounds, and actual translation mode make that identity relationship explicit.

Do not call writable QEMU RAM owned merely because its address is known; register only the exact linker-reserved interval.

Do not accept a printed PASS when raw PFNs, addresses, sentinels, errors, counts, and ELF symbols permit independent recomputation.

## Non-claims

This proves a tiny kernel-image-owned pool on QEMU `virt`, not a platform memory map, DTB parser, RAM reclamation scheme, production PMM, full-page memory test, ECC/cache/DMA property, active address space, or Linux/Alpine compatibility. Direct access is proven only while Bare. No arbitrary platform memory is touched.

## Next smallest pressure

The next memory rung is an explicitly reviewed active-Sv39 composition that allocates its page-table pages from proven owned frames, installs controlled mappings, and verifies `satp`/`sfence.vma` behavior. That work must remain separate; Batch 16 deliberately stops before activation.
