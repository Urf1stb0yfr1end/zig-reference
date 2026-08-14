# Agentic Snowball Batch 32E handoff

## Persistence identity

- Inherited authoring-main SHA: `3415202cc00d92442533a80def560cdd907309c7`.
- Inherited worktree HEAD: `6342abe4b6ccf87728054fa4c480192bc037d0dc` (the authoritative Batch 32E request commit).
- Branch: `work`.
- Remote persistence: blocked because this checkout has no configured Git remote.
- PR: blocked because no `make_pr` integration or Git remote is available in this environment.

## Exact pressure and repairs

The unchanged real Alpine pressure command was `ls /` in the live `/bin/sh` shell built from the complete v3.22.0 RV64 namespace. The namespace remains 517 objects and 7,069,903 regular-file bytes; `/bin/sh` resolves to the real `/bin/busybox`, whose SHA-256 is `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`. The real musl interpreter SHA-256 remains `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

The first retry confirmed ash's exact clone request as RV64 syscall 220 with flags `0x11` (`SIGCHLD`) and a null child stack. The compatibility edge now creates a bounded fork-shaped child: it retains a distinct parent register context, snapshots main/interpreter/stack address-space backing, resource bindings and state, runtime mappings, break, and backing ownership boundary, returns zero in the child, runs the child first, and restores the parent's isolated state when the child terminates. It rejects nested children, non-`SIGCHLD` exit signals, unsupported flags, and non-null child stacks with `EINVAL`; it does not fake a positive PID without child execution.

The exact retry advanced through clone into the real child. The child then failed its next unsupported Linux operation, ash printed `/bin/sh: ls: Function not implemented`, the parent was restored, and the same shell successfully printed `still-alive`. Thus process creation and parent survival advanced, but Leap 2A remains partial because child exec and the real directory listing have not passed.

That advancing path also reached the historical 64-entry syscall evidence ceiling. Evidence recording is now saturating: semantic execution continues, retained capacity stays bounded, and total/dropped counters expose overflow instead of terminating the OS path. The retry after this repair proved `still-alive` rather than `ZIGREF_LINUX_EDGE_TRAP` at the ceiling.

## Proof state

| Gate | State |
|---|---|
| Exact Alpine namespace | PASS |
| Real `/bin/sh -> /bin/busybox` | PASS |
| Real musl interpreter-first | PASS |
| PREPARE -> COMMIT | PASS |
| W+X=0 | PASS |
| Leap 1 persistent interactive shell | PASS (inherited and preserved) |
| `echo morphic` | PASS (inherited) |
| `pwd` | PASS (inherited) |
| clone(220) | PASS for the observed bounded `SIGCHLD`, null-stack fork shape |
| real child execution | PASS through the next Linux operation and child termination |
| `ls /` | FAIL: child exec boundary remains unsupported |
| shell alive after `ls /` | PASS (`still-alive`) |
| Leap 2A | PARTIAL |
| Leap 2B | NOT RUN |
| Leap 3 | NOT RUN |
| Leap 4 | NOT RUN |
| trace capacity non-fatal | PASS |
| PLAYABLE ALPINE | FAIL |

Focused validation passed with `zig build test-recipe-run-hosted-morphic-runtime`. The exact namespace was regenerated and hash-verified with `PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/b32e-ns`. The exact freestanding payload compiled with the documented live-console command. QEMU retries used `qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32e-machine/bin/morphic-freestanding-riscv64` and injected the unchanged `ls /`, followed by `echo still-alive` only to prove parent liveness.

HIGHEST COMPLETED LEAP: Leap 1 persistent interactive Alpine shell.
CURRENT PARTIAL LEAP: Leap 2A; bounded clone and real child execution pass, but `ls /` does not.
EXACT LAST COMMAND: `ls /` (then `echo still-alive` solely as the required liveness proof).
EXACT NEXT CAUSAL BLOCKER: Linux/RV64 `execve(221)` for the real child `/bin/ls` path is unsupported.
NEXT PRESSURE TARGET: Implement bounded namespace-backed Linux/RV64 `execve(221)` PREPARE -> COMMIT replacement for the cloned child, then retry the exact `ls /` command.
