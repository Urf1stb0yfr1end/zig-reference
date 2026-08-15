# Agentic Snowball Batch 32I handoff

## Persistence identity and clock

- Visible clock began `2026-08-15T02:05:05Z` with the first repository command.
- Inherited local current-main-equivalent SHA: `820c1a22cddf11537f1aeb5617e8cb41b3e91838` on branch `work`.
- Synchronization could not be performed: this checkout has no `origin` remote and no local `main` branch. The inherited SHA is a descendant of merged Batch 32H commit `f557696711a7968f5aea5fec0253424fa084ff83`.
- Implementation commit: `61010c5d91bcd791e0e33983672f0ba34d664ae0`.
- Initial report/command-manual commit: `3d92c937879347f726ecc64f7cb3a49a673e954e` (the final remote-state amendment necessarily follows it).
- Tag `morphic-batch32g-openat-known-symlink-gap` is acknowledged but absent because no remote is configured.
- Remote push/PR state: `git push -u origin work` failed with status 128 because `origin` is not configured. `gh pr create` failed with status 4 because GitHub authentication and `GH_TOKEN` are absent; no PR was created. Local continuation starts from the final commit on branch `work`; configure `origin`, push `work`, then create the PR.

## Exact identity and commands

The fail-closed artifact acquisition verified Alpine v3.22.0 RV64 minirootfs SHA-256 `ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`, 517 namespace objects, 7,069,903 immutable regular-file bytes, BusyBox SHA-256 `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`, and musl interpreter SHA-256 `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

Commands run included:

```text
git fetch origin main; git checkout main; git pull --ff-only origin main
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/b32i-ns
zig build test-recipe-run-hosted-morphic-runtime
zig build install-freestanding-riscv64-morphic-runtime -Dexternal-rv64-namespace-manifest=/tmp/b32i-ns/namespace.json -Dexternal-rv64-namespace-data=/tmp/b32i-ns/namespace.data -Dexternal-rv64-argv0=/bin/sh -Dexternal-rv64-live-console-input=true --prefix /tmp/b32i-machine
qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32i-machine/bin/morphic-freestanding-riscv64
zig fmt --check recipes/run-hosted-morphic-runtime/src/bounded_process_cwd.zig recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig
git diff --check
```

Doctor passed its indexes and exact Zig 0.14.0 check, but reported the missing repository `.venv` as `ZIGREF-ENV-UNUSABLE`. QEMU 8.2.2 was installed from the environment package repository for runtime proof.

## Repair and focused proof

The repair adds neutral, explicitly bounded 256-byte current-directory process state with atomic rejected updates. Linux/RV64 `chdir(49)` copies the guest path with checked user access, resolves it against the immutable serialized namespace, rejects non-directories, and translates failures at the edge. `getcwd(17)` now returns the stored path. Clone snapshots copy cwd, exec leaves it intact, and retained-parent restoration restores it. The focused recipe test compiles the new unit proof for root initialization, successful change/copy, capacity rejection, and unchanged state after failure.

PREPARE then COMMIT and mapping-capacity preflight remain intact. Real evidence retained `final_wx_leaves=0`; W+X=0 was not weakened. The exact Alpine source namespace remains immutable. Resource bindings and the inherited child-first ownership/restoration model remain intact.

## Exact real-QEMU pressure and state

One persistent real BusyBox/musl Alpine shell produced:

```text
/tmp
/bin/sh: can't create /tmp/hello: Read-only file system
cat: can't open '/tmp/hello': No such file or directory
still-alive
```

Thus `cd /tmp` and the immediate `pwd -> /tmp` retry pass. The command sequence intentionally continued to the next causal boundary. Writable creation/redirection does not pass; no writable runtime object or pipe/process-lifetime mechanism was added. Read-only Alpine remains unregressed based on unchanged code paths and focused compilation, though the shorter pressure run did not repeat the entire read-only command sequence.

The Batch 32G intermediate-component symlink limitation remains inherited and non-causal: it was not repaired and complete Linux pathname semantics are not claimed.

Highest genuinely earned milestone: **Leap 3A — cwd/chdir under real Alpine**. PLAYABLE ALPINE is not claimed.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** `openat(56)` still rejects create/write/truncate flags with `EROFS`; a neutral bounded writable runtime namespace and writable descriptor binding are required for shell redirection.

Exact next pressure command:

```text
echo hello > /tmp/hello
```
