# Agentic Snowball Batch 29: exact static musl boundary win

## Starting frontier and identity

The run started from the merged Batch 28 machine materializer and PR #61's
transport checkpoint. The exact diagnostic was rebuilt from the pinned source
and verified as SHA-256
`ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`.
Host orchestration placed those unchanged 3,016 bytes in temporary caller-owned
storage and the independent verifier found exactly one complete occurrence in
the freestanding machine ELF.

## Observed failures, classification, and repairs

1. The transported bytes were not selected for execution. The machine adapter
   now sends them through the existing `ExecPlan` -> `MaterializedImage` ->
   Linux initial-stack -> PREPARE/COMMIT -> Sv39 -> U-mode machinery. There is no
   second ELF loader and the Batch 26 fixture remains unchanged.
2. PREPARE exhausted the inherited physical pool while creating the low-address
   Sv39 branch required by the real image. The adapter now owns four explicit,
   bounded table-backing pages. Map/unmap preflight allocates all intermediate
   tables before COMMIT; the builder's existing rollback releases a failed
   mutation. Image pages use a separate four-page prepared reservation and no
   ordinary allocation occurs during COMMIT.
3. The real ELF was rejected because `PT_GNU_STACK` and
   `PT_RISCV_ATTRIBUTES` were unknown. The parser now gives GNU stack, GNU
   RELRO, and RISC-V attributes typed identities; the load-plan edge ignores
   these non-load metadata rows. BusyBox then exposed that
   `p_filesz <= p_memsz` applies to `PT_LOAD`, not file-only attributes, and the
   parser was corrected accordingly.
4. The inherited terminal trap count was still set when the next U-mode program
   began. Resetting that per-transition lifecycle state before entry was the
   smallest orchestration repair. The real musl `set_tid_address` call receives
   `ENOSYS`, which this diagnostic tolerates; no speculative syscall was added.

## Causal machine result

The self-test executes one QEMU machine, relates the complete external bytes and
their three exact `PT_LOAD` geometries, requires exact stdout
`batch27-static-musl`, status zero, three materialized pages, W+X=0, completion
of the inherited Batch 26 frame, and rejects a one-byte artifact mutation. Full
mode executes two machines and requires identical bounded Batch 29 result evidence.

The exact pinned static musl diagnostic genuinely printed:

```text
batch27-static-musl
```

It made exactly three observed syscalls (`set_tid_address`, `write`, and
`exit_group`) and terminated with status zero. The static musl boundary is
closed without weakening PREPARE/COMMIT or W+X.

## Immediate BusyBox pressure and next boundary

The exact pinned `busybox.static` SHA-256
`62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`
was immediately selected through the same machine build. ELF planning passed
after the metadata repair; `MaterializedImage(4)` then rejected its measured
245-page image during PREPARE, before COMMIT. Therefore `true`, `echo`, and `sh`
were not executed and are not claimed. The next honest blocker is raising the
machine-adapter prepared-image bound and its linker-owned backing policy to a
reviewable BusyBox-capable region, not a new loader or speculative syscall list.

## Cornerstone neutrality

Exact-byte transport remains host plumbing. Prepared image/table regions are
explicit replaceable machine policy. Typed standard ELF metadata and the
load-only size invariant are reusable by non-Linux ELF consumers. No musl or
BusyBox representation entered neutral Morphic semantics; Linux syscall policy
remains at the edge. The central additions are bounded ownership and truthful
ELF classification, with causal mutation and real-software proofs.
