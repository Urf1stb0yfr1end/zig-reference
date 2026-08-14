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

## Continuation: bounded caller-artifact transport and first dynamic BusyBox shell

The continuation preserves the PR #70 frontier above. The minimum general repair places both caller-supplied ELF byte arrays in a page-aligned, read-only `PT_LOAD` at `0x81000000`, outside the ordinary kernel image, the inherited `0x80400000` fixture window, and the prepared-image reservation. The linker bounds the combined transport at 2 MiB and rejects capacity or reservation overlap. Supervisor page-table construction now identity-maps exactly the linker-declared half-open caller-artifact range read-only. No artifact name, hash, applet, guest address, or output participates in placement.

The first repaired large-artifact retry exposed two transport integration facts before external PREPARE. First, an orphan `.srodata.cst8` followed the distant output section and became unavailable after `satp`; the ordinary read-only domain now explicitly collects all `.srodata` input. Second, the new distant supervisor mapping consumes one bounded page-table page; increasing the dedicated prepared-table reservation from six to seven pages preserved the execution PREPARE budget without borrowing user-image data frames. The exact same `busybox true` retry then reached PREPARE, COMMIT, the real interpreter, and status 0.

Focused placement evidence used the default small caller pair and the exact 1,442,176-byte BusyBox/interpreter pair. `readelf -lW` reports the ordinary loads ending below `0x80400000`, the prepared reservation at `0x80600000`, and the large caller bytes in a distinct read-only load at `0x81000000` with file/memory size `0x161000`. Linker alignment, the 2 MiB `ASSERT`, checked output-section placement, and runtime begin/end ordering fail closed for zero/reversed, overflowed/capacity-exceeded, or colliding layouts. `zig build test-recipe-run-hosted-morphic-runtime` preserved the bounded mapping table's positive, collision, capacity, alignment, arithmetic-overflow, occupied-page, rollback, and W+X rejection tests.

The exact pinned dynamic BusyBox ladder was then advanced in order:

1. `/bin/busybox true`: status 0, empty output, 203 main pages, 153 interpreter pages, W+X=0.
2. `/bin/busybox echo batch32b`: status 0, `output_hex=62617463683332620a` (exact `batch32b\n`), W+X=0.
3. `/bin/busybox sh -c 'echo batch32b'`: status 0, `output_hex=62617463683332620a` (exact `batch32b\n`), W+X=0.

Each machine emitted `prepare`, the 153-page real-interpreter PREPARE fact, `commit`, and `execute` in that order. The result's interpreter entry is `0x40056cd2`; early syscall PCs are within the real interpreter executable load before BusyBox main execution. Unsupported loader probes remained visible as `-ENOSYS` and tolerated by musl; they were not converted into a speculative syscall checklist. No relocation was performed by Morphic, PREPARE/COMMIT was not bypassed, and Alpine minirootfs work was not begun.

The canonical Batch 32A real-dynamic-musl verifier passed after the shared mapping changes. `zig build check` passed, and the canonical `python3 tools/developer-command.py validate-repository` handoff passed all 350 steps and 247 tests. Local branch persistence is complete, while remote push/PR persistence is blocked because this environment has no authenticated GitHub credentials.

### Continuation final handoff

| Boundary | Result |
| --- | --- |
| Batch 32A dynamic musl regression | PASS |
| dynamic BusyBox artifact identity | inherited PASS |
| Linux golden true | inherited PASS |
| Linux golden echo | inherited PASS |
| Linux golden shell | inherited PASS |
| bounded caller-artifact transport | PASS |
| supervisor mapping of caller bytes | PASS |
| external PREPARE reached | PASS |
| real interpreter entered U-mode | PASS |
| dynamic BusyBox true | PASS |
| dynamic BusyBox echo | PASS |
| dynamic BusyBox shell | PASS |
| exact `batch32b` stdout | PASS |
| status 0 | PASS |
| W+X=0 | PASS |
| PREPARE/COMMIT | PASS |
| repository validation | PASS: 350/350 steps, 247/247 tests |
| remote persistence | BLOCKED: no authenticated GitHub credentials are available |

Exactly one next causal boundary: Batch 32B is complete; begin a separately authorized Batch 32C with the exact Alpine minirootfs and real `/bin/sh -c 'echo alpine'` pressure.
