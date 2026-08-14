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
