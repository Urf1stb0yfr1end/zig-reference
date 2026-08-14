# Agentic Snowball Batch 32F handoff

## Persistence identity

- Inherited current-main/worktree SHA: `efe255b8b07edf97ae3e89639af84742869f5693`.
- Working branch: `work`.
- Final commit SHA: recorded by the final handoff after this report commit.
- Remote state at entry: no Git remote was configured.
- PR state at entry: unavailable because the worktree had no configured remote.

The coherent implementation/report commit is
`0f92e6eda34c80bf36ade74dd5ccc3e454b47ec1`. An `origin` remote was then
configured as `https://github.com/thanks-cohn/zig-reference.git`, but
`git push -u origin work` failed with `could not read Username for
'https://github.com': No such device or address`. `gh auth status` confirmed
that no GitHub host is authenticated. Remote branch persistence and PR
creation are therefore BLOCKED by unavailable credentials; no PR URL exists.

## Exact Alpine identity

`PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/b32f-ns`
passed. It verified Alpine v3.22.0 RV64 minirootfs SHA-256
`ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`,
517 namespace objects, 7,069,903 regular-file bytes, real
`/bin/sh -> /bin/busybox`, BusyBox SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and real musl interpreter SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

## Repair and exact pressure

The Linux/RV64 compatibility edge now recognizes `execve(221)`. It captures
the guest pathname plus bounded argv and envp vectors through checked user
memory, resolves the exact immutable namespace (including the real
`/bin/ls -> /bin/busybox` symlink), reuses the ELF execution plan, PT_INTERP,
materializer, initial-stack planner, backing, and Sv39 machinery, and retains
the cloned parent's resource bindings and isolated snapshot.

The replacement has an explicit PREPARE/COMMIT boundary. Candidate main and
interpreter pages are separate from the live child. All guest capture,
namespace lookup, ELF validation, image materialization, argv/envp stack
planning, and capacity checks finish before COMMIT. COMMIT removes the prior
image, brk, and runtime leaves, installs the candidate with W+X rejection,
starts at the real interpreter entry, and preserves the architecture thread
register. Child termination restores parent image metadata, backing, stack,
resources, bindings, mappings, break, leaves, and registers.

The first live retry crossed execve but exposed a null allocation after stale
inherited brk leaves collided with the fresh loader's brk growth. The bounded
repair explicitly removes replaced brk leaves and restores parent brk leaves;
the prepared backing bound is 320 pages, leaving bounded loader/runtime
headroom beyond the exact 244-page BusyBox image.

The final unchanged command was:

```text
ls /
```

The exact live trace advanced through PATH lookup, `clone(220)`, the child
`execve(221)`, `ZIGREF_LINUX_EXECVE_COMMIT path=/bin/ls`, real musl startup,
and namespace-backed `newfstatat("/")`. BusyBox then issued Linux/RV64
`openat(56)` and printed:

```text
ls: can't open '/': Function not implemented
```

No listing is claimed. Milestone 1 is fully earned because the real cloned
child crossed execve into its replacement image. Milestone 2 is partial.

## Proof and validation state

| Gate | State |
|---|---|
| Exact Alpine namespace and hashes | PASS |
| Real `/bin/sh -> /bin/busybox` | PASS |
| Bounded execve path/argv/envp capture | PASS in live pressure |
| Real `/bin/ls -> /bin/busybox` exec resolution | PASS |
| Real musl interpreter-first replacement | PASS |
| PREPARE -> COMMIT | PASS |
| W+X=0 enforcement | PASS (preserved at every installed image page) |
| Inherited descriptors/resources across exec | PASS by implementation; no close-on-exec pressure yet |
| Retained parent snapshot | PASS by implementation; final post-child liveness awaits `ls /` completion |
| Trace first-window saturation | PASS (inherited focused proof preserved) |
| Milestone 1 — execve replacement | PASS |
| Milestone 2 — real `ls /` | PARTIAL |
| Playable Alpine | NOT EARNED |

Executed checks:

- `zig build test-recipe-run-hosted-morphic-runtime` passed.
- `zig fmt --check build.zig projects recipes conformance` passed.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` passed: 40 aggregate steps, 60 module command pairs, and 56 tool entrypoints.
- The first `zig build check` attempt failed closed because `.venv/bin/python`
  was absent. After the repository-prescribed environment repair,
  `zig build check` passed.
- `python3 tools/developer-command.py validate-repository` passed.
- The exact live-console freestanding build passed with the generated Batch
  32F namespace, `/bin/sh` argv0, and live input enabled.
- QEMU 8.2.2 executed the exact machine and unchanged `ls /` pressure. Its
  final expected timeout reflects a still-running interactive machine, not a
  passed `ls /` command.

The repository virtual environment is ignored local state and is not part of
the persisted patch.

## Exact frontier

HIGHEST FULLY EARNED MILESTONE: Milestone 1 — bounded namespace-backed
execution-image replacement for the real cloned child.

CURRENT PARTIAL MILESTONE: Milestone 2 — real BusyBox `ls` reaches root
metadata successfully but cannot open the root directory.

EXACTLY ONE NEXT CAUSAL BLOCKER: Linux/RV64 `openat(56)` for the real `/`
directory is unsupported at the compatibility edge; no neutral bounded
directory descriptor/open mechanism is yet connected to it.

EXACT UNCHANGED PRESSURE COMMAND: `ls /`.

EXACT NEXT ACTION: introduce the minimum neutral bounded namespace object/open
descriptor mechanism required by this observed directory request, translate
Linux/RV64 `openat(56)` at the compatibility edge, and immediately retry the
same `ls /` command.
