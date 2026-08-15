# Agentic Snowball Batch 32L handoff

## Clock, inheritance, and persistence

- Visible clock start: `2026-08-15T11:37:50Z`.
- Handoff production began at `2026-08-15T11:49:00Z`; final handoff assembly completed at `2026-08-15T12:00:30Z`.
- Inherited SHA: `b2d7c59bcfd68e597d45af8591f0cd16a877ae51` on branch `work`.
- Sync failed closed before editing because this checkout has no Git remote and no local `main`; current history already contained PR #87 merge `47b3bb3b142edb4d931a8804d55e15ef98faf6f5` and the Batch 32L request.
- Agent-local Batch 32L implementation identifier `af53f56e9935c398a8b17e332a6694ebca7a4657` (`morphic: repair F_DUPFD errno and cross QEMU boundary`) was not persisted as a resolvable GitHub commit and must not be treated as a reproducible history boundary. The persisted implementation history for this run is PR #88 and its GitHub commit ancestry.
- Push was unavailable in the execution checkout because `git remote -v` was empty. Persistence was subsequently established through GitHub PR #88.

## Mandatory opening repairs

### Linux/RV64 F_DUPFD errno and ownership

Linux policy now lives in the focused `linux_rv64_fdupfd` adapter rather than the neutral `BindingTable`. It resolves the source first (`EBADF`), rejects a sign-extended negative or any minimum outside the 16-descriptor bounded model (`EINVAL`), distinguishes a valid minimum with no eligible slot (`EMFILE`), selects the lowest eligible slot, retains the shared resource exactly once before binding, and rolls that retain back if binding cannot commit. Resource-retain failure remains `ENFILE`.

Focused tests prove invalid sign-extended and at-limit minima, invalid source, eligible exhaustion, unchanged bindings/reference count on failure, lowest eligible selection, shared resource-owned state, and the two-close lifecycle. The descriptor capacity remains 16.

Real pressure also exposed that an unsupported `fcntl` command must return Linux `EINVAL`, not `ENOSYS`: musl uses `EINVAL` to fall back from its unavailable CLOEXEC duplication request to plain `F_DUPFD`. Correcting that compatibility-edge policy allowed unchanged ash to cross the inherited `fcntl(1,F_DUPFD,10)` boundary.

### Batch 32K persisted history

`docs/reports/AGENTIC_SNOWBALL_BATCH_32K.md` no longer presents nonexistent `a39268b` as persisted history. It records resolvable PR #87 head `335e8aa097e0740ff6cdad0b1b15b8a48c3e7247`, merge `47b3bb3b142edb4d931a8804d55e15ef98faf6f5`, and explicitly classifies `a39268b` as an unpersisted agent-local identifier. The repository checkout does not contain the requested historical tag object, but the canonical Batch 32L request records its accepted name as `morphic-batch32k-fdupfd-known-p2s-qemu-unproven`.

## Validation

- Agent bootstrap passed: 60 contracted modules, 58 full fast-path contracts, and 2 partial contracts.
- Initial agent doctor failed only because `.venv/bin/python` was absent. The documented repair (`python3 -m venv .venv` and dependency installation) completed.
- `zig fmt --check build.zig projects recipes conformance` passed.
- `git diff --check` passed before persistence.
- `zig build test-recipe-run-hosted-morphic-runtime` passed after correcting the focused exhaustion fixture (26 tests in the step).
- Exact Alpine freestanding installation passed under Zig 0.14.0.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` passed.
- An intermediate build-graph-only test registration caused `zig build check` to fail closed on stale validation-evidence digests. The registration was replaced by importing the focused tests through the existing recipe test root, so no build graph/evidence digest changed. Final `zig build check` then passed.
- `python3 tools/developer-command.py validate-repository` passed, including all 60 module records, portability smoke, deterministic indexes and dependency views, repository policy, command reference, differential/property/fuzz infrastructure checks, and the aggregate Zig build/test graph.

## Exact Alpine artifact and real-QEMU evidence

The canonical artifact-only flow produced the exact Alpine v3.22.0 RV64 minirootfs archive SHA-256 `ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`, 517 namespace objects, and 7,069,903 immutable regular-file bytes. BusyBox SHA-256 was `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`, musl SHA-256 was `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`, and namespace-data SHA-256 was `7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.

System QEMU was initially absent. A bounded `apt-get install qemu-system-misc` succeeded and supplied `qemu-system-riscv64` 8.2.2. The exact freestanding live-console build and `qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32l-machine/bin/morphic-freestanding-riscv64` were then executed against the unchanged artifact.

In real ash, `cd /tmp` and `pwd` again produced `/tmp`. The first retry still printed `fcntl(1,F_DUPFD,10): Function not implemented`; changing unsupported-fcntl-command policy from `ENOSYS` to Linux `EINVAL` enabled musl's fallback. The immediate retry crossed F_DUPFD and produced repeated:

```text
/bin/sh: dup2(10,1): Function not implemented
```

This is genuine real BusyBox/musl/system-QEMU pressure. Redirection did not complete, `/tmp/hello` read-back was not earned, the pipeline was not earned, and the canonical one-shell Playable Alpine sequence did not pass. Immutable serialized backing, bounded writable runtime state, transactional runtime open, PREPARE -> COMMIT exec replacement, mapping preflight, W+X=0, cwd behavior, descriptor/resource ownership, O_APPEND rejection, and the documented intermediate-symlink limitation remain preserved.

## Highest earned milestone and next pressure

Highest earned state is **read-only Alpine plus persistent cwd and bounded writable runtime state, with real ash now proven across the F_DUPFD fallback path up to descriptor replacement**. This is not Playable Alpine.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** implement ownership-correct Linux/RV64 `dup2(10,1)`/its directly observed syscall form with atomic target replacement, then rerun unchanged `echo hello > /tmp/hello` in the same real-QEMU flow.
