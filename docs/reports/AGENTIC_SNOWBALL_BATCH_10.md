# Agentic Snowball Batch 10 — RISC-V Execution Probe

## Environment and frozen requirement map

The supplied repository root is `/workspace/zig-reference`, branch `work`, at base
commit `edccfd47839e1b15ed8be790edb418f82dea417e`. No Git remote exists, so
synchronization was unavailable and the supplied checkout was used as the
authoritative snapshot. Zig is 0.14.0. The repository virtual environment was
provisioned from `tools/requirements.txt`. QEMU user-mode was provisioned with
`apt-get update && apt-get install -y qemu-user`; the execution dependency is
`/usr/bin/qemu-riscv64`, version 8.2.2.

This requirement map was frozen before implementation changes:

| Classification | Requirement |
|---|---|
| Existing module | `bounded-system-resource-plan` supplies bounded planning. |
| Existing module | `bounded-deterministic-scheduler` supplies caller-timed deterministic scheduling. |
| Existing module | `bounded-deterministic-event-trace` supplies bounded normalized tracing and rendering. |
| Existing recipe/composition | `run-hosted-morphic-runtime` supplies the single `runCore` scenario plus hosted and deterministic fake machines. |
| Existing toolchain capability | Zig 0.14.0 cross-compiles Linux executables; whether the current composition can use it remains to be tested. |
| Missing reusable capability | None demonstrated before implementation. |
| Project-specific orchestration | Build the existing scenario for riscv64 Linux, execute it twice under QEMU user-mode, and compare raw bytes with native hosted/fake output. |
| External execution dependency | Conventional riscv64 Linux userspace emulation through QEMU user-mode. |
| Out of scope | Linux boot, firmware, supervisor/machine mode, SBI, CSRs, traps, interrupts, MMIO, UART, FDT, PLIC, CLINT, VirtIO, page-table activation, hypervisor behavior, and a universal HAL. |

Agent Fast Path discovery selected the event trace as the closest module and
identified the hosted Morphic recipe plus modules 50–52 as the applicable
composition. Their preflights state target-independent, hosted/freestanding,
allocation-free contracts; no new capability ID or module was justified.

## Execution evidence and structural result

Before build changes, `zig build run-hosted-morphic-runtime` was captured twice
and `zig build run-fake-morphic-runtime` was captured twice. Each artifact was
765 bytes; hosted repeatability, fake repeatability, and hosted/fake equality
all passed with raw `cmp` comparisons.

The cheapest cross-target path succeeded without a target-specific source file.
The same `recipes/run-hosted-morphic-runtime/src/recipe.zig` root and its single
`runCore` implementation compile for `riscv64-linux-musl`. The public install
step writes a statically linked Linux userspace executable, and the canonical
Python execution-lab command performs the native and emulated runs and raw-byte
comparisons. No scheduler, plan, trace, task-ordering, or formatting source was
copied or specialized.

Execution used exact target `riscv64-linux-musl`, build command
`zig build install-riscv64-morphic-runtime -Dtarget=riscv64-linux-musl --prefix
PATH`, and emulator command `/usr/bin/qemu-riscv64
PATH/bin/run-hosted-morphic-runtime`. GNU `readelf -h` identified the artifact as
ELF64, little-endian, System V, executable type, machine `RISC-V`. Both emulator
runs exited zero and produced exactly 765 bytes. RISC-V run 1 equaled run 2;
native hosted equaled native fake; and native hosted equaled RISC-V, all by exact
byte comparison. The canonical verifier repeated and reported these facts.

Normal `validate-repository` remains independent of QEMU and proves the normal
contracts, behavioral tests, policies, and generated-state gates. The separate
`python3 tools/verify-riscv64-morphic-runtime.py` execution-lab command
additionally proves actual execution of this one canonical scenario as RISC-V
Linux userspace machine code under the recorded QEMU version. It does not prove
hardware equivalence, privileged behavior, freestanding execution, performance,
or every possible Morphic input.

## Next freestanding pressure

Linux userspace currently supplies process entry and exit, stdout transport,
stack/bootstrap, and default panic behavior. The next smallest pressure should
choose and execute one explicit freestanding entry/output/exit boundary in a
conventional emulator environment while preserving `runCore`; it must not assume
that this result already justifies SBI, traps, interrupts, MMIO, or a universal
hardware abstraction.

## Snowball Yield

- **Composition:** execute the settled Morphic scenario as real riscv64 Linux
  machine code and compare its canonical observables.
- **Base commit / branch / Zig:**
  `edccfd47839e1b15ed8be790edb418f82dea417e`, `work`, Zig 0.14.0.
- **Requirements at start:** three existing-module requirements, one existing
  recipe requirement, one existing-toolchain requirement, zero demonstrated
  missing reusable capabilities, one project-specific orchestration requirement,
  one external execution dependency, and the explicitly listed privileged and
  boot exclusions.
- **Existing modules actually reused:** `bounded-system-resource-plan`,
  `bounded-deterministic-scheduler`, `bounded-deterministic-event-trace`, plus
  their existing dependency closure.
- **Existing recipe/composition actually reused:**
  `run-hosted-morphic-runtime` and its single `runCore` semantic implementation.
- **New reusable modules / recipes:** 0 / 0.
- **New target-specific source files:** 0. The Python verifier and build install
  step are project-specific execution/test orchestration.
- **Missing reusable capabilities before/during implementation:** none / none.
- **Known diagnostic lookups used:** none; no observed invariant failure required
  a `ZIGREF-*` repair lookup.
- **Unknown diagnostic lookups:** none; the initial foreign-binary build-run
  failure was ordinary host execution configuration and was resolved by explicit
  QEMU execution rather than classified as a semantic failure.
- **Source reads:** before selection, none; after preflight, the recipe contract,
  recipe/fake sources, relevant build wiring, command manual entries, and
  Developer Minimus driver/formatter were read. Exact byte volume was unmeasured.
- **Focused validation:** native hosted/fake recipe execution and comparisons,
  real RISC-V execution and comparisons, recipe tests, Agent Fast Path and
  invariant tests, contract/index drift, command-manual drift, and Minimus tests.
- **Aggregate validation:** after refreshing stale validation evidence from the
  supplied pre-run snapshot, `python3 tools/developer-command.py
  validate-repository` passed 322/322 steps and 206/206 tests. The preceding run
  failed closed specifically on the stale `fixed-capacity-vector` source digest;
  all 206 behavioral tests in that run passed, and evidence regeneration plus the
  final rerun resolved the drift without changing module source.
- **External dependency:** `/usr/bin/qemu-riscv64` 8.2.2 installed conventionally
  from Ubuntu's `qemu-user` package; GNU `readelf` supplied architecture evidence.
- **Unmeasured:** token savings, hidden compute, comparative development cost,
  cross-target performance, hardware behavior, and output beyond the canonical
  scenario.
