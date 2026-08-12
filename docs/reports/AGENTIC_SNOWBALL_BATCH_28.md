# Agentic Snowball Batch 28 machine-integration checkpoint

## Boundary reached

This checkpoint machine-integrates project 59's neutral `MaterializedImage` into
the inherited Batch 26 destructive exec path. PREPARE now constructs complete
main and interpreter page images, verifies that all backing identities already
exist, and retains Program A on every ordinary failure. COMMIT consumes every
prepared page generically, copies the prepared 4096 bytes through its
supervisor-owned physical backing, and installs final Sv39 R/W/X/U permissions
without an RWX population window. The existing global `sfence.vma` and `fence.i`
remain after the complete mapping set.

The historical two-frame machine fixture is deliberately still bounded. The
adapter rejects an image needing more than its two already-reserved backing
frames during PREPARE rather than allocating after destructive unmap. This is a
causal, permanent regression proof of the machine boundary, not the final
external-artifact transport solution.

## Exact real pressure retry and first blocker

The exact pinned static musl artifact was rebuilt and hash-checked by
`python3 tools/pressure-real-rv64-userspace.py --artifact-only`. Its three
`PT_LOAD` regions materialize three pages. The exact pinned BusyBox has 245
materialized pages by its measured ELF geometry. Neither exact artifact was
transported into the freestanding image in this checkpoint, and neither was
executed by Morphic. The audit also found that the inherited Batch 26 adapter
unconditionally resolved and required a `PT_INTERP` image. That orchestration
blocker is repaired here: a static image now prepares an empty interpreter image,
omits `AT_BASE`, and enters its main entry without interpreter bias, while a
dynamic image still resolves its exact declared interpreter and retains the
existing interpreter preparation and entry behavior. The remaining observed
blockers are bounded external-artifact transport and a general prepared backing
reservation of at least three image frames (plus any newly required Sv39 table
frames). No syscall blocker has yet been observed under Morphic because the exact
static target has not reached U-mode there.

## Validation and nonclaims

The freestanding payload compiles under Zig 0.14.0 after this integration. The
inherited Batch 26 verifier passed its one-QEMU self-test with all 17 mutations
rejected and its two-QEMU full mode with PREPARE/COMMIT, causal generation, and
W+X=0 preserved. After regenerating the canonical agent and repository indexes,
`zig build check` and `zig build validate-repository` both passed. Static musl
output, BusyBox applets, and the BusyBox shell remain unproved under Morphic and
are explicitly not claimed.
