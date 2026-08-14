# Agentic Snowball Batch 32C: exact Alpine rootfs namespace frontier

## Exact pressure source

This batch pins the official Alpine v3.22.0 RISC-V minirootfs named
`alpine-minirootfs-3.22.0-riscv64.tar.gz`, URL
`https://dl-cdn.alpinelinux.org/alpine/v3.22/releases/riscv64/alpine-minirootfs-3.22.0-riscv64.tar.gz`,
and SHA-256 `ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`.
The fail-closed host tool verifies the archive before extraction and rejects unsafe
member names, hardlinks, and unsupported special objects. It measured 517 archive
objects and 7,069,903 regular-file bytes.

Bounded root-relative host lookup resolves the archive's real `/bin/sh` absolute
symlink to `/bin/busybox`. That BusyBox has SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`, is
RV64 ELF64, and requests exact `PT_INTERP=/lib/ld-musl-riscv64.so.1`. The rootfs's
real interpreter has SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`
and has no PT_INTERP of its own.

QEMU Linux-user 8.2.2, with the extracted tree as its library prefix and guest
`argv[0]=/bin/sh`, ran the exact command. It returned status 0 and exact stdout
hex `616c70696e650a` (`alpine\n`) with no stderr.

## First Morphic pressure and classification

The first Morphic observation exported only the two objects selected by the
verified rootfs lookup and used the inherited bounded caller-artifact transport.
It deliberately did not call that export a rootfs. The machine ran argv
`/bin/sh`, `-c`, `echo alpine`, emitted PREPARE for 152 real-interpreter pages,
then COMMIT and execute, and returned status 0 with exact output hex
`616c70696e650a`. It materialized 203 main pages, reported W+X=0, and entered the
real interpreter at `0x40056d00`; early syscall PCs are in the interpreter range.
Morphic performed no dynamic relocation and did not bypass PT_INTERP.

This successful executable-pair run is useful regression evidence, but it is
**not** `FIRST REAL ALPINE UNDER MORPHIC`. The kernel-facing input was still a
resolved executable/interpreter pair, not a bounded deterministic representation
of the exact 517-object rootfs namespace. Calling it Alpine would violate the
Batch 32C anti-pseudo-root rule even though both bytes genuinely came from the
pinned archive and the output happened to match.

Classification: the first remaining causal boundary is **bounded rootfs namespace
transport and runtime pathname lookup**. The next repair must transport the exact
rootfs relationships in a general bounded representation, preserve `/bin/sh` as a
real symlink, resolve it through neutral filesystem semantics at the Morphic edge,
and only then feed the existing ELF/PT_INTERP PREPARE path. The measured 517
objects and 7,069,903 regular-file bytes must inform explicit capacities; capacities
must not be enlarged blindly and the kernel must not parse the tar archive.

## Evidence ledger

| Boundary | Result |
| --- | --- |
| exact official rootfs identity | PASS |
| fail-closed archive hash | PASS |
| host extraction outside kernel | PASS |
| real `/bin/sh -> /bin/busybox` lookup | PASS (host pressure tool) |
| exact BusyBox/interpreter identities | PASS |
| Linux-user golden command | PASS: `alpine\n`, status 0 |
| Morphic exact selected bytes | PASS: `alpine\n`, status 0 |
| real interpreter-first Morphic execution | PASS |
| Morphic PREPARE/COMMIT | PASS |
| Morphic W+X | PASS: 0 |
| complete bounded rootfs namespace transport | FAIL: not implemented |
| runtime `/bin/sh` lookup from transported namespace | FAIL: not implemented |
| FIRST REAL ALPINE UNDER MORPHIC | **NOT CLAIMED** |

Exactly one remaining blocker: introduce and prove the minimum general bounded
rootfs namespace transport/runtime lookup, then retry the same pinned rootfs and
the same `/bin/sh -c 'echo alpine'` command without substituting the selected pair
for the namespace.

## Continuation: complete neutral namespace serialization

The continuation adds a coherent first half of that blocker without overclaiming
kernel integration. After verifying the same archive, the pressure tool now emits
`zig-reference-bounded-namespace-v1` as deterministic JSON metadata plus a
distinct immutable data backing. It represents all 517 archive objects (the root,
98 directories total, 84 regular files, and 335 symbolic links) and accounts for
all 7,069,903 regular-file bytes as contiguous, checked, non-overlapping ranges.
It rejects duplicate canonical paths, missing/out-of-order parents, root escapes,
unsupported kinds, malformed links, invalid ranges, inconsistent counts, and data
digest mismatch. Capacities remain caller policy rather than Alpine-shaped Morphic
constants, and no tar parsing moved into the kernel.

Neutral lookup over the serialized representation—not the extracted host tree—
resolves `/bin/sh`, follows `/bin/sh -> /bin/busybox` with a bounded traversal,
and selects bytes hashing to
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`.
The same representation resolves `/lib/ld-musl-riscv64.so.1` to bytes hashing to
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.
The complete immutable data backing SHA-256 is
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.

Focused validation passed with:

```text
PYTHONDONTWRITEBYTECODE=1 python3 tools/test-alpine-rootfs-namespace.py
PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --archive /tmp/alpine-minirootfs-3.22.0-riscv64.tar.gz --artifact-only --namespace-output-dir /tmp/zigref-namespace
```

This is a **safe frontier**, not FIRST REAL ALPINE. The exact first remaining
blocker is to place the emitted manifest and data in a checked caller-owned
Morphic transport region, make the freestanding runtime consume its metadata for
`/bin/sh` and PT_INTERP lookup, and retry the unchanged command. PREPARE/COMMIT,
stdout, status, and W+X results remain inherited regression evidence until that
runtime consumption occurs.

## Final integration: ★ FIRST REAL ALPINE UNDER MORPHIC ★

Starting from `93b910a0eb202d385191bb20862113830f5c400e`, the final continuation
connected the already-proven `zig-reference-bounded-namespace-v1` manifest and
immutable backing directly to the freestanding runtime. The caller-owned,
supervisor-read-only transport is a distinct 8 MiB maximum linker region at
`0x81000000`; its actual complete pinned input occupied `0x6d4000` bytes and did
not overlap the kernel or prepared-image reservation. Arithmetic, manifest
identity/count/accounting, and every regular-file range are checked before
lookup. Runtime absolute-path lookup follows at most 16 symlinks and returns only
a checked read-only regular-file slice.

The exact first retry stopped during external-image table preflight after the
first page: mapping the complete 7 MiB read-only transport consumed more of the
existing bounded page-table reserve than the former two-ELF transport. The
minimum general repair expanded the dedicated, caller-supplied/prepared mapping
table bound from 7 to 16 pages; it did not change user image capacity or bypass
PREPARE/COMMIT. Retrying the same namespace and same command then passed.

Machine evidence from QEMU 8.2.2 establishes that runtime validation consumed
all 517 objects and all 7,069,903 regular-file bytes, runtime lookup followed the
real `/bin/sh -> /bin/busybox`, and the BusyBox bytes exposed their real
`PT_INTERP=/lib/ld-musl-riscv64.so.1`, which runtime lookup obtained from the same
`namespace.data`. Only after those lookups did the existing ELF PREPARE complete,
followed by COMMIT and execute. The real musl entry `0x40056d00` ran before
BusyBox main; exact output was hex `616c70696e650a` (`alpine\n`), exit status was
0, and the final report recorded 203 main pages, 152 interpreter pages, and
`wx=0`. There is no kernel dynamic relocator and no direct-main path.

The host-selected executable-pair proof is no longer the success path: the build
receives the complete manifest and backing, while Morphic itself derives both
ELF slices through namespace lookup. This closes the anti-pseudo-root boundary.

Focused namespace tests, Zig formatting, command-reference drift, and `zig build
check` passed after installing the declared local Python/Node prerequisites.
`python3 tools/developer-command.py validate-repository` initially ran 247/247
tests and 345/350 build steps successfully, then correctly rejected validation
evidence made stale because every module digest includes the changed `build.zig`.
The canonical all-module recorder was subsequently run and refreshed all 60 unit
and smoke evidence records against this Batch 32C revision. The supplied checkout
has no configured Git remote, so no remote head could be pushed or verified from
this environment.
