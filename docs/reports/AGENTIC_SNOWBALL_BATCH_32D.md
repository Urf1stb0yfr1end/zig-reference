# Agentic Snowball Batch 32D handoff

## State and exact Alpine identity

- Inherited request head: `d7ad256ec5c2798c15b8d37097582d51a6f28848` (the checkout exposed branch `work`; no local `main` ref or Git remote was present).
- Environment: Zig 0.14.0 and system `qemu-system-riscv64` 8.2.2, installed for this run.
- Alpine v3.22.0 RV64 minirootfs SHA-256: `ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`.
- Namespace: 517 objects, 7,069,903 regular-file bytes, namespace-data SHA-256 `7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.
- `/bin/sh -> /bin/busybox`; BusyBox SHA-256 `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`.
- PT_INTERP `/lib/ld-musl-riscv64.so.1`; interpreter SHA-256 `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

## Causal repairs and exact retries

The first exact retry proved that `TIOCGWINSZ` was tolerated. The shell read `stdin-25b-proof`, searched for that fixture text as a command, and exited 127. This exposed the actual lifecycle wiring error: `-Dexternal-rv64-live-console-input=true` had been applied to the later Batch 26 regression fixture instead of the external Alpine process. The repair binds backend 3 only for external-process stdin and restores deterministic backend 0 for Batch 26.

The unchanged real shell then accepted `echo morphic`, printed `morphic`, accepted `echo second`, printed `second`, and remained blocked waiting for more input until the bounded QEMU timeout. This earns:

> **FIRST PERSISTENT INTERACTIVE ALPINE SHELL UNDER MORPHIC**

The next exact `pwd` retry exposed RV64 `getcwd` (17). A bounded root-current-directory result plus Linux `writev` (66) scatter/gather output support made `pwd` print `/`; the following `echo second` still succeeded.

The exact `ls /` retry searched `/sbin/ls`, `/usr/sbin/ls`, and `/bin/ls` with `newfstatat` (79). The compatibility edge now supplies the asm-generic 128-byte stat layout from the neutral namespace manifest and honors `AT_SYMLINK_NOFOLLOW`; ordinary lookup follows `/bin/ls -> /bin/busybox`. This advanced the unchanged shell past its former permission failure. The next causal boundary is now explicit: ash reports `/bin/sh: can't fork: Function not implemented`, exits status 2, and its captured output contains that exact message. No BusyBox/app-specific output or unconditional ioctl behavior was added.

## Highest gate and current blocker

- Highest completed leap: **LEAP 1 — persistent interactive Alpine shell**.
- Leap 2 partial: `pwd` passes; `ls /` reaches executable resolution but cannot create its child; `cat /etc/alpine-release` was not run.
- Exactly one next causal blocker: **implement the bounded Linux/RV64 process creation semantics exposed by `ls /` (ash's fork path, beginning with the traced unsupported process-creation syscall), then retry the exact `ls /` command through the same live shell.**

## Preservation and validation

- Exact namespace, real BusyBox shell, real musl interpreter-first execution: PASS.
- PREPARE -> COMMIT: PASS.
- W+X=0: PASS.
- Resource-owned input and fixture/live-console separation: PASS.
- `zig build test-recipe-run-hosted-morphic-runtime`: PASS after the repairs.
- Exact live-console build: PASS.
- Exact QEMU `echo morphic`, `pwd`, `echo second`: PASS; QEMU was intentionally timeout-terminated while the shell waited for input.
- Exact QEMU `ls /`: FAIL at the newly exposed fork/process-creation boundary; status 2.

## Final status

| Result | Status |
|---|---|
| exact Alpine namespace | PASS |
| real `/bin/sh -> /bin/busybox` | PASS |
| real musl interpreter-first | PASS |
| PREPARE/COMMIT | PASS |
| W+X=0 | PASS |
| LEAP 1: status 127 -> interactive shell | PASS |
| live fd0 input | PASS |
| fd1/fd2 console output | PASS |
| `echo morphic` | PASS |
| second command | PASS (`echo second`) |
| LEAP 2: read-only playability | PARTIAL |
| `pwd` | PASS |
| `ls /` | FAIL (fork/process creation) |
| `cat /etc/alpine-release` | NOT RUN |
| LEAP 3: writable `/tmp` + redirection | NOT RUN |
| LEAP 4: pipe/process semantics | NOT RUN |
| PLAYABLE ALPINE | FAIL |
| repository validation | PARTIAL (focused recipe PASS) |
| remote persistence | BLOCKED (no remote configured) |
