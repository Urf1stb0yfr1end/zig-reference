# Agentic Snowball Batch 32G handoff

## Persistence identity

- Inherited current-main/worktree SHA: `670f4fc116cbecdd6e4f377b529b0809ccc23604`.
- Merged Batch 32F baseline in history: `eb2da5a8a9f63de34eebf3b4299a2c0881ca1d07`.
- Working branch: `work`.
- Implementation/report commit: `c36af8a1d194b554383436268129e41b04f23b98`.
- Remote state at entry: no Git remote was configured. An `origin` remote was added, but `git push -u origin work` failed because HTTPS credentials are unavailable.
- PR state: `gh auth status` reports no authenticated GitHub host, and `gh pr create` failed closed; no PR link exists.

## Implemented bounded repair

The Linux/RV64 compatibility edge now decodes `openat(56)`. The adapter copies
the guest path through the existing bounded checked user-memory path, admits only
absolute `AT_FDCWD` lookup for this observed slice, rejects write/create/truncate
against the immutable source namespace, distinguishes directory and regular
objects from the serialized namespace metadata, and translates failures to
Linux errno only at the edge.

A successful lookup creates a neutral bounded resource carrying namespace-object
identity and capability state, then binds it into the lowest available
process-local descriptor slot. Resource creation and binding capacity failures
are bounded; a binding failure releases the candidate resource. The resource
and binding tables remain part of the fork snapshot and survive execve exactly
as in Batch 32F. Capacity was raised from four to sixteen bounded resources to
permit actual opened objects without displacing stdin, stdout, or stderr.

This does not implement directory enumeration, regular-file reads, writable
state, cwd mutation, or pipes. No Alpine path, command, expected descriptor, or
expected directory entry is embedded.

## Exact Alpine identity and pressure

`PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/b32g-ns`
passed and verified Alpine v3.22.0 RV64 minirootfs SHA-256
`ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`,
517 namespace objects, 7,069,903 regular-file bytes, BusyBox SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and musl interpreter SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

The exact live-console machine build with that generated namespace, `/bin/sh`,
and live input passed. The unchanged pressure command remains:

```text
ls /
```

The real retry could not execute because this supplied environment has no
`qemu-system-riscv64`; `timeout` reported `No such file or directory`. Therefore
Milestone 2A is **PARTIAL**, not earned: the adapter and exact machine compile,
but real BusyBox has not proved that its exact open request succeeds. The
highest fully earned milestone remains inherited Batch 32F Milestone 1
(execve replacement). Playable Alpine is not claimed.

## Validation state

- `zig build test-recipe-run-hosted-morphic-runtime` passed.
- `zig fmt --check build.zig projects recipes conformance` passed.
- Exact namespace acquisition/validation passed.
- Exact namespace-backed live-console freestanding build passed.
- Real QEMU pressure was unavailable because `qemu-system-riscv64` is absent.
- `zig build check` passed after creating the repository-prescribed `.venv`.
- `python3 tools/developer-command.py validate-repository` passed: 350/350 steps and 248/248 tests.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` passed: 40 aggregate steps, 60 module command pairs, and 56 tool entrypoints.
- `zig fmt --check build.zig projects recipes conformance` passed.

## Causal frontier

**EXACTLY ONE NEXT CAUSAL BLOCKER:** real-machine confirmation of the new
Linux/RV64 `openat(56)` adapter and observation of BusyBox's next syscall are
blocked by the absent `qemu-system-riscv64` executable.

The exact unchanged command exposing the frontier is:

```text
ls /
```

The next action is to run the already-built exact live-console machine with
QEMU, submit `ls /`, confirm `ZIGREF_LINUX_OPENAT path=/`, and implement only
the next syscall exposed by that real trace (expected to concern the opened
directory, but not assumed until observed).
