# Agentic Snowball Batch 32M handoff

## Inherited persisted boundary

Current history contains merge `9840805` (`Merge PR #88: Batch 32L F_DUPFD
correctness and QEMU frontier`). Batch 32L had proved the unchanged Alpine ash
path through musl's `F_DUPFD_CLOEXEC` fallback to ownership-correct `F_DUPFD`,
then stopped at `/bin/sh: dup2(10,1): Function not implemented`. The inherited
highest state was read-only Alpine plus persistent cwd and bounded writable
runtime state, with descriptor replacement not implemented. This run did not
change the inherited F_DUPFD adapter or its policy.

## Exact implementation

- `recipes/run-hosted-morphic-runtime/src/linux_rv64_dup3.zig` is a focused
  Linux adapter for syscall `dup3(24)`, the RV64 syscall form used by musl for
  the observed `dup2(10,1)` request. The runtime accepts only the observed zero
  flags rather than pretending to model close-on-exec descriptor flags.
- The adapter validates the source and bounded target before mutation, rejects
  dup3's equal-descriptor case, retains the source resource before commit,
  replaces an occupied target, and releases exactly the displaced owned
  reference. Retain failure leaves topology and counts unchanged. Replacing a
  target already aliasing the source performs one retain and one release, so
  the reference count remains exact. No allocation or capacity expansion was
  added.
- Focused tests cover invalid source, out-of-range target, equal descriptors,
  unsupported flags, retain overflow atomicity, occupied replacement, displaced
  final release, same-resource replacement, shared state, and final-close
  retirement.
- `freestanding_riscv64.zig` now decodes syscall 24 separately from Linux/RV64
  `dup(23)` and maps adapter failures to `EBADF`, `EINVAL`, or `ENFILE` at the
  Linux boundary. `bounded_runtime_namespace.zig` imports the focused tests
  through the existing recipe test root.

## Validation actually executed

- Bootstrap passed with 60 contracted modules; doctor initially reported only
  the missing repository virtual environment. The documented venv repair was
  applied, and doctor then passed with Zig 0.14.0.
- `zig build test-recipe-run-hosted-morphic-runtime` passed after the focused
  implementation was formatted.
- The exact namespace-backed freestanding installation passed under Zig 0.14.0.
- `zig fmt --check build.zig projects recipes conformance`, `git diff --check`,
  `zig build check`, and `PYTHONDONTWRITEBYTECODE=1 python3
  tools/check-command-reference.py --check` passed.
- `python3 tools/developer-command.py validate-repository` passed its canonical
  complete handoff: 350/350 steps and 249/249 tests, all 60 module evidence
  records, portability smoke, deterministic indexes and dependency views,
  repository policy, and property/fuzz/differential infrastructure under Zig
  0.14.0.

## Exact Alpine artifact and real-QEMU pressure

The unchanged artifact-only command acquired Alpine v3.22.0 RV64
`alpine-minirootfs-3.22.0-riscv64.tar.gz` with SHA-256
`ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`.
It verified 517 objects, 7,069,903 regular-file bytes, BusyBox SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
musl SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`,
and namespace-data SHA-256
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.

The exact build was:

```text
zig build install-freestanding-riscv64-morphic-runtime -Dexternal-rv64-namespace-manifest=/tmp/b32m-artifact/namespace.json -Dexternal-rv64-namespace-data=/tmp/b32m-artifact/namespace.data -Dexternal-rv64-argv0=/bin/sh -Dexternal-rv64-live-console-input=true --prefix /tmp/b32m-machine
```

The exact real-machine command used QEMU 8.2.2:

```text
qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32m-machine/bin/morphic-freestanding-riscv64
```

In the unchanged live shell, the commands were attempted in required causal
order:

```text
echo hello > /tmp/hello
cat /tmp/hello
```

`echo hello > /tmp/hello` returned to the shell without the inherited dup2
error or any other error, proving redirection crossed syscall 24 and completed.
The immediate `cat /tmp/hello` did not print `hello`. It resolved `/bin/cat`,
entered the bounded clone/exec path, reported unsupported syscall numbers 96,
135, 135, and 134, and then stopped with:

```text
ZIGREF_LINUX_EDGE_TRAP cause=000000000000000f sepc=000000008020006e stval=00000000804026f8
```

Because read-back failed, `echo hello | cat` was not attempted. Read-back,
pipelines, and Playable Alpine are not earned.

## Highest earned milestone

The highest honestly earned state is **real Alpine ash with persistent cwd,
bounded writable runtime state, and ownership-correct dup3-backed redirection;
creation and writing of `/tmp/hello` completed, but external-command read-back
did not**. Immutable serialized backing, bounded runtime mutation, transactional
open, F_DUPFD ownership, O_APPEND rejection, PREPARE -> COMMIT replacement,
mapping preflight, W+X=0, cwd behavior, and the documented intermediate-symlink
limitation remain unchanged.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** diagnose and repair the first causal child
runtime failure exposed by unchanged `cat /tmp/hello` (the observed post-exec
store page fault after unsupported Linux/RV64 child setup calls), then rerun
that unchanged read-back command before attempting the pipeline.

## PR #89 correctness repair

The focused review repair gives dup3-specific `EINVAL` rules their required
precedence: unsupported flags, then equal source and target, then bounded target
validation are evaluated before source-descriptor lookup. Mixed-invalid tests
now prove that an unbound equal descriptor and invalid source with unsupported
flags both select `EINVAL`, while an invalid source with otherwise valid,
distinct arguments selects `EBADF`. Retain-before-mutation, replacement,
same-resource reference accounting, and final-close tests remain unchanged.

After the repair, the focused recipe test, formatting check, `zig build check`,
command-reference check, diff check, and canonical repository validation all
passed. Canonical validation again completed 350/350 steps and 249/249 tests
under Zig 0.14.0. The exact pinned namespace and live-console machine were
rebuilt and rerun with QEMU 8.2.2. In one unchanged shell, `cd /tmp` succeeded,
`pwd` printed `/tmp`, and `echo hello > /tmp/hello` returned without error. The
immediate `cat /tmp/hello` retry reproduced the same `/bin/cat` lookup, clone,
unsupported calls 96/135/135/134, and store-page-fault line recorded above.
Thus the earned milestone and exactly one next causal blocker are unchanged.
