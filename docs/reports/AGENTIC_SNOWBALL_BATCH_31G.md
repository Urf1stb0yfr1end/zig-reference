# Agentic Snowball Batch 31G: first static BusyBox shell under Morphic

## Identity and environment

This run started at supplied checkout head `2ba2c5e82efeba6f77ada90d561cffa8d4fd523d` (request-creation main `de4e7d03e00cae1f0ab32cd4a531e35e4525e40a`). The exact Alpine v3.22 `busybox.static` SHA-256 was reverified as `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`; the static-musl diagnostic remained `ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`. Execution used Zig 0.14.0 and QEMU 8.2.2.

The environment initially lacked both QEMU executables. Installing the Ubuntu QEMU 8.2.2 packages made system emulation available. The requested golden command, `qemu-riscv64 -strace /tmp/batch31g-artifacts/busybox.static sh -c 'echo batch31g'`, exited 1 without stdout or trace output in this container, as did a plain user-mode invocation. No Linux golden results are invented from that unusable oracle. The already-observed Batch 31F trace therefore remained the causal pressure source.

## Inherited frontier and causal retries

The inherited proof retained static musl, BusyBox `true`, `AT_PAGESZ=4096`, fixed no-access mmap, one-page RW anonymous mmap, multiple one-page anonymous mappings, exact BusyBox echo, 244 executable image pages, and W+X=0. Shell pressure had continued after unsupported syscall 172 (`getpid -> -ENOSYS`) and first failed fatally at `mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) -> -EINVAL`.

The first identical shell retry after multi-page mmap repair accepted that request as one virtual range at `0x108000`. It then exposed a write page fault at `0x80401be0`, immediately below the inherited single mapped startup-stack page. A bounded two-page external stack was the next minimum repair. The immediate second retry completed:

```text
batch31g
ZIGREF_BATCH29_RESULT syscalls=000000000000001d status=0000000000000000 output_hex=62617463683331670a pages=00000000000000f4 wx=0000000000000000
```

The exact runtime syscall evidence records the 8192-byte mapping at `0x108000`, subsequent one-page mapping at `0x10a000`, exact nine-byte write, and terminal `exit_group(0)`. `getpid` remained `-ENOSYS`; the successful shell proves it was not required and it was deliberately not implemented.

## Neutral mechanisms and Linux edge

`BoundedRuntimeMappings` now provides checked page-count conversion and a last-reservation cancellation primitive. The Linux/RV64 edge accepts the already-classified non-fixed RW private-anonymous slice for any checked page-multiple length within bounded backing capacity. It reserves one contiguous virtual range, zeros every claimed page before mapping, installs only RW user leaves, commits backing ownership only after all pages map, and removes installed leaves plus the reservation on a mid-map failure. Zero length, non-page multiples, overflow, collision on any page, record exhaustion, backing exhaustion, and W+X remain rejected without a partial live mapping.

The external-process stack uses two bounded pages with the same top address and planned initial bytes. Its lower page temporarily displaces a cumulative-lab fixture leaf; that exact leaf is restored after the external process terminates, preserving the later machine proof sequence. This is process startup/runtime-memory policy, not a BusyBox address or Linux mmap-flag mechanism.

## Architectural admission

1. **Pressure:** the exact 8192-byte anonymous mmap and then a real stack write one page below the old stack exposed the mechanisms.
2. **Why neutral:** contiguous page-range reservation, zeroed anonymous backing, transactional leaf installation, and bounded stack backing are address-space mechanisms; only Linux flag and errno translation remains at the edge.
3. **Other consumers:** a freestanding language runtime arena and a bounded plugin/worker address space can reuse multi-page zeroed mappings; a command interpreter and recursive ABI guest can reuse a bounded multi-page startup stack.
4. **Excluded history:** no BusyBox identity, PID assumption, Linux VMA growth policy, overcommit, file mapping, `munmap`, demand paging, or arbitrary protection combinations were added.
5. **Smallest contract:** checked page-multiple length, one contiguous unoccupied virtual range, bounded zeroed backing, requested neutral permissions, and all-or-nothing commit.
6. **Reversibility:** the Linux adapter slice and two-page external stack policy are local; the neutral table additions are narrow and can be replaced without changing callers' Linux identity.
7. **Proof:** focused mapping tests plus the exact system-QEMU shell retry establish the two-page request, later stack pressure, status 0, and W+X=0 causally.

## Focused proof and persistence

`zig build test-recipe-run-hosted-morphic-runtime` passed all eight tests, including one- and two-page reservations, zero/misaligned/overflow rejection, collision across the second page, capacity behavior, W+X rejection, and rollback restoring record capacity. The exact artifact build and QEMU execution passed and the cumulative machine continued through `ZIGREF_MORPHIC_END` after the displaced fixture leaf was restored.

The supplied checkout has no Git remote and exposes no PR-creation tool. Local commit persistence is possible, but push, remote-head verification, and draft PR creation are platform/tooling blocked and are recorded in the failure ledger. Dynamic musl and Alpine work were not started.
