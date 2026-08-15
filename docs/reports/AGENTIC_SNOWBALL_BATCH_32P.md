# Agentic Snowball Batch 32P handoff

## Persistence boundary

This run inherited current `main` content at
`2b86353a8c1faf3262e2134f74395b506972af54`; the worktree had no configured
remote, so fetch/push could not run. The coherent runtime/documentation implementation commit is
`945cee8252b75ae131bcf148b97894b3a7f0cdbf`; the persisted handoff-content commit is
`3dbd2de2f163c7443ee7091c0be869a973288ab7`. PR state is recorded below.

## Opening failure, cause, and repair

The unchanged real Alpine pressure was:

```text
cd /tmp
pwd
echo hello > /tmp/hello
cat /tmp/hello
ZIGREF_LINUX_EDGE_TRAP cause=000000000000000d sepc=0000000080206ace stval=00000000000000c8
```

Batch 32O's symbol evidence placed the failing PC in `RealPageOwner.owns`: the
Sv39 builder's owner was null while handling the serialized fork child. The
allocator, `RealPageOwner`, and builder were locals in `freestandingMain`; the
long-lived U-mode process and trap/syscall continuation therefore borrowed
page-table query state from a suspended supervisor stack frame. Four child
setup calls still observed valid values, but the subsequent exec/query path
lost that borrowed owner context.

The repair gives those three mutually dependent objects explicit
supervisor-owned static lifetime and initializes their pointers once before
activating Sv39. `batch26_builder` continues to reference that stable builder.
No cat/path/PC/syscall-134 special case was added. SUM clear, W+X=0,
PREPARE -> COMMIT, immutable source backing, bounded mappings, and parent
restoration remain intact. The static declarations and the real machine retry
are the focused regression for the lifetime invariant.

## Real-QEMU advancement

The canonical Alpine v3.22.0 RV64 artifact was freshly verified: 517 objects,
7,069,903 regular-file bytes, namespace SHA-256
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`,
BusyBox SHA-256 `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and musl SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.
QEMU 8.2.2 then crossed the opening fault, committed `/bin/cat`, and produced:

```text
/tmp
ZIGREF_LINUX_EXECVE_COMMIT path=/bin/cat
hello
still-alive
```

Thus external read-back is earned: real runtime lookup/open/read/offset/EOF,
checked guest copying, child termination, parent restoration, and shell
survival all occurred through ordinary mechanisms.

The immediate unchanged pipeline pressure then produced:

```text
ZIGREF_LINUX_UNSUPPORTED nr=000000000000003b
/bin/sh: can't create pipe: Bad file descriptor
```

Linux/RV64 syscall 59 is `pipe2`. This is a genuinely later pipeline-specific
boundary. No pipe implementation was attempted after the bounded observation.

Highest earned one-shell sequence:

```text
cd /tmp
pwd                         -> /tmp
echo hello > /tmp/hello     -> success
cat /tmp/hello              -> hello (real external BusyBox)
echo still-alive            -> still-alive (original parent shell)
```

External read-back: **EARNED**. Pipeline: **NOT EARNED**. Full Playable Alpine:
**NOT EARNED**.

## Validation and environment

`agent bootstrap` passed. `agent doctor` failed only because `.venv/bin/python`
was absent; Zig 0.14.0 and generated indexes passed. Artifact verification,
focused recipe tests, namespace-backed freestanding builds, QEMU 8.2.2
read-back and pipeline-pressure runs, formatting, command-reference checking,
and diff checks were executed. Aggregate validation results are recorded in the
final command evidence. QEMU was installed in this runner during the run.

Known inherited limits remain: incomplete component-wise symlink semantics,
tiny bounded runtime overlay, serialized single-child model, and deliberately
narrow Linux ABI coverage.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** implement the smallest bounded neutral pipe
resource plus Linux/RV64 `pipe2(59)` compatibility edge required by the observed
ash request, preserving descriptor ownership/inheritance/close and EOF only
after the last writer, then retry unchanged `echo hello | cat`.

## Push / PR state

No git remote is configured, so push is unavailable. A `gh pr create` attempt
after the coherent commits failed explicitly because the runner has neither GitHub
authentication nor a configured remote; no PR was fabricated.
