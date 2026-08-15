# Agentic Snowball Batch 32J handoff

## Clock and persistence identity

- Visible clock start: `2026-08-15T02:48:22Z`.
- Inherited SHA: `02bb9419a2c3dbc1f55abe43d0fc0487eaf9eb45` on branch `work`; it descends from merged Batch 32I `ae9ae5eb6d9266e7f0773a21aa7ed96d002d89a2`.
- Sync failed because this checkout has neither an `origin` remote nor a local `main` branch.
- `morphic-batch32g-openat-known-symlink-gap` is absent locally; its limitation remains inherited and non-causal.
- Implementation commit: `d89068bd99dda84f15dbdcd05dc2574f89a1b904`; the report/command-manual commit immediately follows it on `work`.
- Push/PR: unavailable because no remote is configured; configure `origin`, push `work`, and create the PR.

## Exact artifact and commands

Alpine minirootfs is v3.22.0 RV64 (`ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`), with 517 objects and 7,069,903 immutable bytes. BusyBox is `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`; musl is `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

Commands included bootstrap/doctor, artifact acquisition, `zig build test-recipe-run-hosted-morphic-runtime`, the freestanding install command with `/tmp/b32j-ns/namespace.{json,data}`, QEMU 8.2.2, formatting, command-reference checking, and `git diff --check`. Doctor reported only the inherited missing `.venv` environment prerequisite.

## Mechanism, proof, and real pressure

Added a neutral inline runtime namespace: four stable pathname objects, 256 bytes each, atomic validation/capacity rejection, create/truncate, bounded partial writes, read-back, and runtime-over-source lookup precedence. Linux flags/errno remain at the RV64 edge. Writable/readable resource descriptions carry shared open offsets, close uses existing reference ownership, checked guest-copy occurs before mutation, and the serialized Alpine manifest/data remain immutable. Focused tests cover create, write/read-back, truncate, object exhaustion, and preservation of the existing object.

The final exact system-QEMU frontier was:

```text
/tmp
/bin/sh: fcntl(1,F_DUPFD,10): Function not implemented
ZIGREF_LINUX_NEWFSTATAT path=/sbin/cat
ZIGREF_LINUX_NEWFSTATAT path=/usr/sbin/cat
ZIGREF_LINUX_NEWFSTATAT path=/bin/cat
```

The unchanged `echo hello > /tmp/hello` therefore advances beyond EROFS/create but does not complete. `cat /tmp/hello`, pipeline, and Playable Alpine are not claimed. An earlier oversized prototype caused a real mapping collision; reducing bounded storage removed that regression before the final retry.

PREPARE -> COMMIT, candidate table/mapping preflight, `final_wx_leaves=0`, read-only source behavior, and cwd clone/exec/parent-restoration code remain intact. The final run printed the prepare/commit phases and the existing focused suite passed. Relative lookup remains bounded as previously documented and was not causal.

Highest earned milestone: **bounded writable runtime namespace reached by real ash, before descriptor duplication**.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** Linux/RV64 `fcntl` with `F_DUPFD` and a minimum descriptor of 10 is unsupported, while the current binding table only addresses descriptors 0–7; ash requires ownership-correct duplication before committing redirection.

Exact next pressure:

```text
echo hello > /tmp/hello
```

## PR #86 focused review repair

- Repair clock began `2026-08-15T03:06:51Z` from head `1266dc8c8118aa22af4264dcdade842523891a6e` on `work`.
- Runtime reads and writes now authorize against the capabilities owned by the resolved open resource description before guest transfer, byte mutation, or offset commit. Linux/RV64 translates a forbidden access to `EBADF`; `O_RDONLY`, `O_WRONLY`, and `O_RDWR` are covered without pathname policy.
- Focused proof performs forbidden writes and reads through the access-gated runtime API, verifies `AccessDenied`, unchanged offset, and unchanged bytes, then proves both operations through read/write access.
- Canonical unit and smoke evidence for all 60 modules was regenerated with `PYTHONDONTWRITEBYTECODE=1 python3 tools/python-environment.py tools/record-validation.py --level all`, followed by canonical index regeneration. `zig build check` passed.
- `python3 tools/developer-command.py validate-repository` passed all 350 build steps and 248 tests under Zig 0.14.0.
- The exact Alpine v3.22.0 RV64 namespace was rebuilt and reverified (517 objects; 7,069,903 immutable bytes; hashes unchanged). The freestanding machine was rebuilt and real QEMU printed:

```text
ZIGREF_BATCH29_PHASE prepare
ZIGREF_BATCH29_PHASE commit
ZIGREF_BATCH29_PHASE execute
/tmp
/bin/sh: fcntl(1,F_DUPFD,10): Function not implemented
```

The proof boundary and highest milestone remain unchanged; redirection is not claimed. PREPARE/COMMIT, mapping preflight, `final_wx_leaves=0`, immutable source backing, cwd behavior, and resource ownership remain intact. Final repair head and remote/PR state are recorded in the user-facing handoff after persistence.
