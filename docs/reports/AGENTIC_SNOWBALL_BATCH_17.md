# Agentic Snowball Batch 17 — Active Sv39 Kernel Continuation

## Starting point

The supplied checkout started at `c772ab69e60791da9ec0e36eb87617511723712e`, a descendant of the merged Batch 16 baseline `8ff90a267c1b84940ef0d033bc237fa9aa199f28` containing only the Batch 17 plan commit beyond that merge.

## First executable gate

After installing the repository Python requirements and QEMU 8.2.2, the Batch 16 rejection self-test passed. The canonical physical-memory lab then ran two real system-QEMU machines and reproduced the linker/runtime pool, Bare `satp`, eight unique sentinel-tested frames, exhaustion/release/rejection/accounting, Batch 12–15 evidence, and 765-byte Morphic equality.

## Task Projection

| Obligation | Batch 17 decision |
|---|---|
| Requested capability | Activate a bounded kernel Sv39 address space and continue Morphic execution. |
| Canonical gate | Preserve the Batch 16 Bare physical-memory phase verbatim before activation. |
| Reused modules | Physical region/frame allocation; Sv39 entry, indexing, walker, builder, and SFENCE.VMA invalidation modules. |
| Reused recipe knowledge | `construct-and-verify-sv39-address-space` supplied the builder/walker/rollback composition. |
| Provider boundary | A freestanding-only `RealPageOwner` adapts the existing physical allocator to checked 512-entry real pages. |
| Frame source | Only `[__physical_page_pool_begin,__physical_page_pool_end)`. |
| Mapping policy | 4 KiB identity leaves for the exact page-rounded ELF image plus one alias leaf. |
| Permissions | The continuation is temporarily RWX with A/D set; the alias is RW with A/D set. No hardening claim. |
| Alias | Canonical `0x80400000`, outside the identity span, maps one owned non-table frame. |
| satp / ASID | RV64 Sv39 mode 8, ASID 0, owned root PPN. |
| Fence | Existing `global()` / `executeUnsafe()` privileged boundary after `csrw satp`. |
| Failure | Builder errors shut down; its existing rollback releases newly created intermediates. The verifier rejects contradictions without installing broken tables. |
| Unknowns | Hardware beyond QEMU, multi-hart coordination, and a future permission split remain unmeasured. |
| Non-claims | No U-mode, processes, syscalls, Linux ABI, demand paging, general VMM, higher half, or SMP. |
| Minimum read set | Builder, entry, walker, invalidation contracts/source; physical allocator contract; freestanding source/linker script; recipe metadata. |
| Focused validators | Six Sv39 module test/smoke pairs, Sv39 recipe test, physical allocator test/smoke, Batch 17 self-test and lab. |

## Existing capabilities reused

The implementation consumes the existing entry encoding and permissions, virtual indexing through the builder, walker query, transactional builder page creation, global invalidation plan/execution, physical region representation, PFN conversion, and physical allocator. No reusable module was created or modified.

## Real page-table owner/provider adapter

`RealPageOwner` is target-specific and allocation-free. `allocate` obtains a real frame from `PhysicalPageFrameAllocator`, zeroes all 4096 bytes before publishing it, and records it in an eight-slot array. `read` and `write` accept only recorded pages and checked indices below 512. `release` converts the real address back to a PFN and returns it to the allocator, preserving generic builder rollback behavior.

## Owned page-table frame accounting

The observed pool was `[0x80215000,0x8021d000)`. The alias data frame was `0x8021c000`. Four unique aligned page-table frames were `0x80215000`, `0x80216000`, `0x80217000`, and `0x80218000`; the first was the installed root. Five of eight frames were allocated, leaving bounded spare capacity.

## Mapping policy and kernel continuation footprint

ELF symbols independently established the page-rounded continuation range `[0x80200000,0x8021d000)`. Exactly 29 identity 4 KiB leaves cover code, rodata, data/BSS, active stack, and the owned pool. A thirtieth leaf maps the alias. SBI calls provide output and shutdown, so no MMIO mapping is asserted or installed.

## Permissions policy

The first continuation proof maps the exact bounded image/pool range RWX with Accessed and Dirty set. This modest implementation avoids a whole-RAM map but does not claim W^X or hardened segment permissions. The alias is RW, non-executable, supervisor-only, with Accessed and Dirty set.

## satp transition proof and SFENCE.VMA boundary

Both runs began the Batch 16 phase at raw `satp=0`. Batch 17 installed raw `satp=0x8000000000080215`: mode 8 (Sv39), ASID 0, root PPN `0x80215`, which recomputes to owned root `0x80215000`. The existing global SFENCE.VMA privileged execution surface ran immediately after the CSR write, then actual CSR readback and ordinary Zig execution succeeded.

## Non-identity alias and post-activation continuation

The existing builder and walker resolved `0x80400000` to owned frame `0x8021c000`. After activation the machine wrote `0xa1175a39c0de0011` through alias offset 128 and read the same value through both alias and identity addresses. A stack-local increment and writable global marker produced `0x51a918`. Evidence output continued, the marker declared Morphic next, and the Morphic frame followed the Sv39 completion/return markers without returning to Bare.

## Rejection-oriented verifier

`tools/verify-freestanding-riscv64-active-sv39.py --self-test` rejects missing/duplicate frames and returns, non-Bare starts, foreign/duplicate/misaligned table frames, excessive counts, wrong mode/ASID/root, malformed mappings, identity/noncanonical/overlapping aliases, foreign targets, walker mismatch, missing fence/continuation, sentinel contradiction, wrong ordering, and prior-proof loss. Real mode reads ELF symbols, reuses Batch 12–16 parsers, runs two finite-time QEMU machines, and compares native, fake, and machine Morphic bytes.

## Preservation matrix

| Proof | Result |
|---|---|
| Batch 12 breakpoint trap/return | PASS in both runs |
| Batch 13 one-shot timer | PASS in both runs |
| Batch 14 four monotonic ticks | PASS in both runs |
| Batch 15 scheduler-time bridge | PASS in both runs |
| Batch 16 Bare physical ownership | PASS in both runs |
| Batch 17 active Sv39 and alias | PASS in both runs |
| Hosted/fake/two-machine Morphic | Exact 765-byte equality |

## Snowball Yield

- Reusable modules directly consumed: 10 (physical address/PFN, region set, allocator, five Sv39 foundations, scheduler, and Morphic core).
- Existing recipe knowledge reused: one Sv39 construction recipe plus the existing Morphic runtime recipe.
- New reusable modules: 0. Existing reusable modules modified: 0.
- New target-specific adapter code: one bounded real-page owner and activation/evidence path in the freestanding body.
- New verifier code: one strict self-test/real-lab verifier.
- New integration/build/doc code: three build imports, one linker symbol, recipe/command truth, and this report.
- Final Batch 17 real QEMU executions: 2; the mandatory pre-change Batch 16 gate also executed 2.
- Entry representation, indexing, walking, mutation/rollback, and invalidation were reused rather than rewritten.
- Morphic semantics changed: no. Previous machine verifiers required semantic modification: no.
- Unavailable quantities: generalized performance impact and hardware portability are unmeasured.

## One-Sentence Preventables

Constructed page tables are not an active address space: require real `satp` MODE=Sv39, the owned root PPN, a hardware non-identity access, and continued post-fence execution before claiming paging works.

## Non-claims

This proof is not a general VMM, permission-hardening design, higher-half ABI, U-mode or process address space, ASID allocator, demand pager, page-fault policy, SMP shootdown protocol, syscall surface, or Linux/POSIX compatibility layer.

## Next smallest pressure

The next memory pressure is an explicitly reviewed code/rodata/data permission split or a bounded kernel/user mapping policy before any U-mode transition; it should preserve this owned-frame and active-transition evidence rather than broaden the current claim implicitly.
