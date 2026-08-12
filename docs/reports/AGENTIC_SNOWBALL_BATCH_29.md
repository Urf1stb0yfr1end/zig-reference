# Agentic Snowball Batch 29 checkpoint

## Starting frontier and exact artifact

This run started at the merged Batch 28 frontier. It rebuilt the pinned static
musl diagnostic and verified SHA-256
`ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`.
The acquisition tool can now place those same verified bytes in caller-owned
temporary storage, and the build can embed that path in the freestanding ELF.
An independent verifier proves the complete byte sequence occurs exactly once
and rejects a one-byte identity mutation.

## Backing repair and causal proof

The first inherited machine limitation was the two-live-frame reuse assumption.
The machine adapter now derives the required count from both prepared images and
uses a distinct, linker-owned four-page bounded reservation. The old executable
therefore remains mapped throughout PREPARE; capacity failure precedes COMMIT;
and each committed image page receives a distinct reserved physical page. This
is harness policy rather than a new neutral Morphic abstraction. It deliberately
excludes ELF, Linux, musl, and BusyBox representation details. The inherited
one-QEMU Batch 26 proof and all 17 causal mutations passed after the change.

## Retry result and honest frontier

The exact static musl bytes reached the freestanding machine ELF, but this
checkpoint did **not** select those bytes as the candidate executed by the
Batch 26 userspace transition. Consequently no musl U-mode entry, output, or
termination is claimed, and BusyBox was not attempted under Morphic. The next
first blocker is an external-pressure machine entry path that applies the
existing ELF/materialization/stack preparation to the transported bytes while
reserving any newly required Sv39 tables before destructive COMMIT. That work is
repairable and this checkpoint is not the requested static-musl boundary win.

## Cornerstone neutrality admission

No permanent central mechanism was admitted. Exact-byte movement is host build
plumbing, while the finite backing region is replaceable machine-adapter policy.
The minimum contract is caller-owned verified bytes plus distinct prepared-page
storage before COMMIT. Its irreversibility cost is low because neither choice is
part of neutral Morphic semantics.
