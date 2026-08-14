# Agentic Snowball Batch 32A: first real dynamic musl frontier

## Inherited frontier

Batch 31G's static BusyBox shell result is inherited without reimplementation. Batch 26's distinct main/interpreter planning, ET_DYN bias, auxiliary-vector handoff, PREPARE/COMMIT boundary, interpreter-first U-mode entry, and W+X rejection remain the architecture used here.

## Exact artifacts

The artifact command pins Alpine v3.22 RV64 `musl-1.2.5-r12.apk` (`6814d9cbaad929d14181ef4fbd1d65c7749df43746269b9bdb75551ba32a79db`) and `musl-dev-1.2.5-r12.apk` (`cd16b9d772e93fe5b8a2b87b5182b5be786be7b86be5bf63af65f3537762fd20`). It compiles the checked-in diagnostic and links it with the pinned musl startup objects and real shared libc.

- dynamic main SHA-256: `20342716ce40c554de9d4e24e62ec0ec6294b5ab63aeb38af74eb32f6264a248`;
- real interpreter SHA-256: `03e29a0e547203adb2c5b3f0b67da5d7cd42801027f7981fc476f175b59a29cf`;
- exact PT_INTERP: `/lib/ld-musl-riscv64.so.1`;
- main: RV64 ET_EXEC with four PT_LOAD segments, PT_DYNAMIC, and `DT_NEEDED=libc.musl-riscv64.so.1`;
- interpreter: RV64 ET_DYN with two PT_LOAD segments.

The artifact-only acquisition passed. After installing QEMU 8.2.2, the exact pair also passed the Linux-user golden oracle with exact stdout `batch32a-dynamic-musl\n` and status 0.

## First Morphic attempt and minimum transport repair

The inherited external-artifact pressure path rejected every PT_INTERP executable before materialization. The minimum general repair adds a caller-supplied interpreter build input, passes the main and interpreter together through the existing `ExecPlan`, materializes both independently, derives the interpreter entry and `AT_BASE` from the selected ET_DYN bias, supplies actual ELF program-header count/size facts, and maps both through the same PREPARE then COMMIT sequence. No relocation parsing or application was added to the kernel and entry remains the interpreter entry, not the main entry.

The first system-QEMU retry failed during `ExecPlan` with `InvalidElf`. Inspection classified the exact first cause as the real interpreter's standard `PT_GNU_EH_FRAME` metadata row falling into the unknown-program-header policy. The minimum general repair gives that ELF metadata row a typed identity and lets only the dynamic handoff ignore it; a focused parser test and load-planner test preserve rejection of genuinely unknown rows.

The immediate identical retry completed ELF and image preparation but stopped while preflighting the interpreter's first page-table leaf. The distinct interpreter bias crosses an additional Sv39 table boundary, so the inherited four-page PREPARE table reservation was insufficient. The minimum neutral repair raises that explicit bounded reservation to six pages and emits one bounded interpreter-page preflight fact. No mapping is committed before every main, interpreter, and stack preflight succeeds.

The next identical retry completed the milestone. The first six syscalls have PCs in the executable PT_LOAD of the exact real interpreter at bias `0x40000000`; they include interpreter startup/brk/unmap activity before output. The sole write consumes the exact 22-byte message from a mapped main-image address, distinguishing main execution from an interpreter-only exit. Machine evidence reports 153 interpreter pages, four main pages, main entry `0x11408`, interpreter entry `0x40056cd2`, exact output hex `62617463683332612d64796e616d69632d6d75736c0a`, status 0, and W+X=0. The strict verifier reconstructs the exact artifacts, reruns the machine, checks PREPARE before COMMIT before execution, relates syscall PCs to ELF executable ranges, and relates the exact output buffer to the main image.

## Deliberately unimplemented

No kernel dynamic relocator, musl filename test, direct-main bypass, shared-library filesystem campaign, Alpine minirootfs, dynamic BusyBox campaign, or speculative loader syscall checklist was added.

## Final handoff

| Boundary | Result |
| --- | --- |
| static BusyBox shell | inherited PASS |
| dynamic main identity | PASS |
| real musl interpreter identity | PASS |
| PT_INTERP exact | PASS |
| golden dynamic Linux-user run | PASS |
| real interpreter entered U-mode | PASS |
| first causal loader pressure | `PT_GNU_EH_FRAME` classification, then bounded Sv39 PREPARE table backing |
| real musl loader startup complete | PASS |
| dynamic main executed | PASS |
| `batch32a-dynamic-musl` output | PASS |
| status 0 | PASS |
| W+X=0 | PASS |
| PREPARE/COMMIT | PASS |
| repository validation | PASS (`zig build check` 74/74; complete validation 350/350, 247/247 tests) |
| remote persistence | PASS: Batch 32A work is persisted on PR #69's remote branch |

Exactly one next pressure boundary: after persistence and merge, begin the separately authorized dynamic BusyBox campaign.
