# Agentic Snowball Batch 32B: dynamic BusyBox shell frontier

## Inherited boundary

Batch 32A merge `316779627636bea950053bbbbc995e36d0ebdc29` and its engineering tag remain the inherited real-musl proof. This run did not reimplement the dynamic loader path. The canonical Batch 32A verifier remains green.

## Exact artifacts and Linux oracle

The new fail-closed acquisition command pins Alpine v3.22 RV64 `busybox-1.37.0-r20.apk` at SHA-256 `467e8f01c30ff318e20e51c10dd93d1e170d39ceca95e89c8360984ef77ef0a2` and the matching `musl-1.2.5-r12.apk` at SHA-256 `6814d9cbaad929d14181ef4fbd1d65c7749df43746269b9bdb75551ba32a79db`. The extracted dynamic BusyBox SHA-256 is `bb2ea620f7f6563676aa80a27e10d701738849988ae9944fcfe606d07b1e25a1`; the real interpreter SHA-256 is `03e29a0e547203adb2c5b3f0b67da5d7cd42801027f7981fc476f175b59a29cf`.

BusyBox is RV64 ET_DYN, has `PT_DYNAMIC`, requests exact `PT_INTERP=/lib/ld-musl-riscv64.so.1`, and records `DT_NEEDED=libc.musl-riscv64.so.1`. Its two load rows are `0x0:0xc59e8:0xc59e8:0x5` and `0xc6770:0x38cd:0x43a0:0x6` (virtual address, file size, memory size, flags).

QEMU Linux-user 8.2.2 ran the same exact pair through all three commands: `true` returned status 0 with empty output; `echo batch32b` returned exact `batch32b\n` and status 0; `sh -c 'echo batch32b'` returned exact `batch32b\n` and status 0.

## First Morphic pressure and exact frontier

The first Morphic `busybox true` build reused the Batch 32A caller-supplied main/interpreter transport and existing argv options. It did not reach the external-artifact PREPARE marker. ELF inspection classified the first causal boundary before a neutral runtime semantic: embedding this substantially larger caller artifact expands the ordinary kernel read-only/data load through the fixed `0x80400000` cumulative fixture window. The produced kernel data load ends at `0x80418000`, while the inherited fixture begins at `0x80400000`. The machine therefore stops after the physical-memory proof, before external PREPARE.

An attempted separate immutable artifact section was rejected rather than persisted: merely moving the load bytes outside the ordinary image made them unavailable through the current identity-map boundary and did not produce a valid proof. No speculative address rewrite, BusyBox special case, or weakened mapping policy was retained.

Classification: ordinary Morphic composition pressure, not framework failure. The minimum next repair is a general bounded caller-artifact transport placement whose loaded bytes are explicitly included in the supervisor identity map without overlapping either the fixture window or prepared-image reservation. Retry the exact `busybox true` artifact immediately after that repair.

## Preserved and deliberately unimplemented

No kernel dynamic relocator, direct BusyBox entry, BusyBox-specific core branch, runtime filesystem, minirootfs, process tree, or speculative syscall was added. The first Morphic attempt did not reach U-mode, so W+X and PREPARE/COMMIT are not claimed for BusyBox. Batch 32A still proves those properties for the inherited dynamic-musl boundary.

## Final handoff

| Boundary | Result |
| --- | --- |
| static BusyBox shell | inherited PASS |
| real dynamic musl | inherited PASS |
| dynamic BusyBox package identity | PASS |
| dynamic BusyBox executable identity | PASS |
| real interpreter identity | PASS |
| PT_INTERP exact | PASS |
| Linux golden true | PASS |
| Linux golden echo | PASS |
| Linux golden shell | PASS |
| real interpreter entered U-mode | FAIL (BusyBox attempt) |
| dynamic BusyBox true | FAIL |
| dynamic BusyBox echo | FAIL (not attempted after true) |
| first shell causal frontier | not reached; caller-artifact transport overlaps fixed fixture window before PREPARE |
| dynamic BusyBox shell | FAIL |
| exact batch32b stdout | FAIL (Morphic) |
| shell status 0 | FAIL (Morphic) |
| W+X=0 | FAIL (not reached) |
| PREPARE/COMMIT | FAIL (not reached) |
| Batch 32A regression | PASS |
| repository validation | NOT RUN in the original Codex checkout; GitHub CI is authoritative for the persisted PR |
| remote persistence | PASS: Batch 32B frontier work is persisted on PR #70's remote branch |

Exactly one next major pressure boundary: make large immutable caller-artifact transport explicitly mapped and non-overlapping, then retry the same exact dynamic BusyBox `true` command.
