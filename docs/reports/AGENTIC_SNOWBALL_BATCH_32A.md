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

The artifact-only acquisition passed. `qemu-riscv64` is absent in this environment, so the golden Linux-user run is honestly unavailable.

## First Morphic attempt and minimum transport repair

The inherited external-artifact pressure path rejected every PT_INTERP executable before materialization. The minimum general repair adds a caller-supplied interpreter build input, passes the main and interpreter together through the existing `ExecPlan`, materializes both independently, derives the interpreter entry and `AT_BASE` from the selected ET_DYN bias, supplies actual ELF program-header count/size facts, and maps both through the same PREPARE then COMMIT sequence. No relocation parsing or application was added to the kernel and entry remains the interpreter entry, not the main entry.

The exact pair now compiles into the freestanding Morphic machine. The first system-QEMU retry is blocked because `qemu-system-riscv64` is absent. Consequently this run does **not** claim real interpreter instruction execution, loader completion, main execution, output, status, or runtime W+X evidence.

## Deliberately unimplemented

No kernel dynamic relocator, musl filename test, direct-main bypass, shared-library filesystem campaign, Alpine minirootfs, dynamic BusyBox campaign, or speculative loader syscall checklist was added.

## Final handoff

| Boundary | Result |
| --- | --- |
| static BusyBox shell | inherited PASS |
| dynamic main identity | PASS |
| real musl interpreter identity | PASS |
| PT_INTERP exact | PASS |
| golden dynamic Linux-user run | UNAVAILABLE |
| real interpreter entered U-mode | FAIL (not executed) |
| first causal loader pressure | system-QEMU execution unavailable after exact pair compiled into machine |
| real musl loader startup complete | FAIL (not executed) |
| dynamic main executed | FAIL (not executed) |
| `batch32a-dynamic-musl` output | FAIL (not executed) |
| status 0 | FAIL (not executed) |
| W+X=0 | FAIL (not runtime-proven) |
| PREPARE/COMMIT | PASS (transport path preserved; runtime not executed) |
| repository validation | NOT RUN |
| remote persistence | BLOCKED (no Git remote configured) |

Exactly one next pressure boundary: run the exact compiled Morphic machine under `qemu-system-riscv64` and classify its first U-mode trap from the real interpreter.
