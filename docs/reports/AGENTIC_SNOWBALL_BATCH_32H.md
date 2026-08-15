# Agentic Snowball Batch 32H handoff

## Persistence identity

- Visible clock began `2026-08-15T01:12:00Z` with the first repository command.
- Inherited current worktree SHA: `0b6b569c51f510a434fcceba001bea6913332cde` on branch `work`.
- That SHA is a descendant of authoring/merge baseline `1687c0aae0bbf6c610694d93e8f8132340f4d65a` and adds the Batch 32H request.
- Implementation commit: `024569ae0fd3cc0f01efb6c047f55a16468cd2c8`.
- Initial tracked report commit: `c291f959184bad92f9ee81d43d5f464f7f1dc733`.
- The requested tag `morphic-batch32g-openat-known-symlink-gap` is acknowledged, but is absent from this checkout because no Git remote is configured.
- Remote/PR state: `git fetch origin main` and `git push -u origin work` failed
  because `origin` is not configured. `gh pr create` failed because no GitHub
  authentication or `GH_TOKEN` is configured; no PR exists.

## Exact artifacts and commands

The artifact command verified Alpine v3.22.0 RV64 minirootfs SHA-256
`ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`,
517 objects, 7,069,903 regular-file bytes, BusyBox SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and musl interpreter SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.

Commands executed included:

```text
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/b32h-ns
zig build install-freestanding-riscv64-morphic-runtime -Dexternal-rv64-namespace-manifest=/tmp/b32h-ns/namespace.json -Dexternal-rv64-namespace-data=/tmp/b32h-ns/namespace.data -Dexternal-rv64-argv0=/bin/sh -Dexternal-rv64-live-console-input=true --prefix /tmp/b32h-machine
qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32h-machine/bin/morphic-freestanding-riscv64
zig build test-recipe-run-hosted-morphic-runtime
zig fmt --check build.zig projects recipes conformance
git diff --check
```

The doctor reported only the missing repository `.venv`; Zig 0.14.0 was exact.
QEMU was installed from the environment's package repository when initially
absent, enabling real system-machine evidence.

## Mechanisms and exact real pressure

The Linux/RV64 edge now decodes `getdents64(61)`. A bounded 4096-byte staging
buffer emits Linux dirent64 records derived from immediate children in the
serialized namespace. Object type and stable bounded inode identity come from
the manifest; the open resource owns a shared, bounded cursor, so aliases share
enumeration progress. No expected root names are embedded.

Namespace regular resources now retain manifest identity and a per-open shared
offset. Reads validate the serialized data range, use checked guest-memory
copying, advance only after a successful copy, return bounded partial reads and
EOF, and never fall through to deterministic stdin. The Alpine source backing
remains immutable.

Before repair, exact `ls /` reached:

```text
ZIGREF_LINUX_OPENAT path=/ fd=0000000000000003
ZIGREF_LINUX_UNSUPPORTED nr=0000000000000019
ZIGREF_LINUX_UNSUPPORTED nr=000000000000003d
```

After the directory repair, the immediate retry printed genuine manifest root
entries and retained the shell:

```text
bin
dev
etc
home
lib
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
still-alive
```

Before regular reads, `cat` reported `read error: Bad file descriptor`. After
the repair, the immediate retry produced:

```text
ZIGREF_LINUX_OPENAT path=/etc/alpine-release fd=0000000000000003
3.22.0
still-alive
```

The next unchanged pressure produced:

```text
/bin/sh: cd: line 3: can't cd to /tmp: Function not implemented
/
```

## Validation and milestone state

- Focused hosted Morphic runtime tests passed after both repairs.
- Exact namespace-backed live-console machine compilation passed after both repairs.
- Zig formatting and `git diff --check` passed.
- `zig build check` passed after creating the repository-prescribed `.venv`.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` passed (40 aggregate steps, 60 module command pairs, 56 tool entrypoints).
- The real persistent shell passed `pwd`, `ls /`, `cat /etc/alpine-release`, and `echo still-alive`.
- PREPARE then COMMIT remains present in real boot evidence; W+X remains zero. Neither invariant was weakened.
- The Batch 32G intermediate-component symlink limitation remains inherited and non-causal. It was neither repaired nor concealed.
- Highest genuinely earned milestone: **Leap 2B, read-only Alpine**. Playable Alpine is not claimed.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** Linux/RV64 `chdir(49)` and neutral bounded
cwd process state are missing, causing the real shell's `cd /tmp` to return
`ENOSYS`.

Exact next pressure command:

```text
cd /tmp
```
