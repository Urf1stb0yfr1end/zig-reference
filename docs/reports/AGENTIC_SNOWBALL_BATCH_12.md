# Agentic Snowball Batch 12 — Supervisor Trap Entry and Bounded State

## Baseline, environment, and frozen requirement map

Implementation began at `abb616a`, whose parent chain contains the frozen peeled
baseline `87978fdf6e9b6c814b57932253885427b1c51f9a`. The supplied checkout did not
contain the `pre-batch-12-freestanding-riscv-baseline` tag and had no remote, so
the tag object could not be verified or fetched; the named baseline commit is an
ancestor of the implementation base. The tag was not created, moved, or deleted.
Zig was exactly 0.14.0.

The starting classification was:

| Classification | Frozen requirement |
|---|---|
| Existing modules | `bounded-system-resource-plan`, `bounded-deterministic-scheduler`, and `bounded-deterministic-event-trace` remain the bounded semantic foundations. |
| Existing composition | `run-hosted-morphic-runtime`, its target-neutral core, and its Batch 11 freestanding adapter remain canonical. |
| Existing toolchain capability | Zig 0.14.0 supplies RISC-V CSRs, naked entry assembly, extern layout checks, and `riscv64-freestanding-none`. |
| Missing reusable capability | None: the executable pressure is narrow target-specific trap glue, not a portable repository module. |
| Project-specific orchestration | Direct `stvec`, fixed integer trap frame, 32-bit EBREAK probe, restoration/`sret`, separate evidence framing, and fail-closed verifier. |
| External dependency | QEMU `virt`, conventional bundled OpenSBI, `readelf`, and finite host subprocess execution. |
| Explicit non-goals | Interrupts/timers, nested traps, trap-stack switching, floating-point/vector context, multiple harts, paging, U-mode, Linux ABI, devices, and generic HAL/kernel work. |

The environment was conventionally provisioned with `apt-get update &&
DEBIAN_FRONTEND=noninteractive apt-get install -y qemu-system-misc qemu-user
opensbi`. Executed QEMU was 8.2.2. The machine banner identified OpenSBI v1.3,
next address `0x80200000`, next mode S-mode, and `MEDELEG=0x0000000000f0b509`.
Aggregate validation exposed the absent conventional Node runtime; the run used
`DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs`, installing Ubuntu
Node 18.19.1, before the successful aggregate rerun.

## Implemented boundary and executed proof

The payload installs an aligned direct `stvec`, emits a literal 32-bit EBREAK,
and enters `supervisorTrapEntry` through the hardware trap path. A fixed 288-byte,
allocation-free `TrapFrame` stores x1-x31 (including the interrupted x2/sp),
`sepc`, `sstatus`, `scause`, and `stval`. Compile-time size and CSR-offset checks
tie the Zig layout to assembly constants. The handler records causal CSRs, applies
the narrow probe-only `sepc + 4` policy, restores the declared integer context and
CSRs, and executes `sret`. Floating-point/vector state and nested traps are not
preserved or claimed.

Two real system-QEMU executions each observed exactly one record: synchronous
cause 3, interrupt bit 0, fault PC `0x00000000802000dc`, resume delta 4, stval 0,
representative t0/t1/a0 sentinel preservation PASS, and original sp restoration
PASS. `ZIGREF_TRAP_RETURNED` occurred after the record. Trap evidence precedes
and remains outside the existing Morphic frame. Native hosted, fake, and both
post-trap machine payloads remained identical at 765 bytes. The independent
Batch 11 verifier also passed on the changed tree.

## Fail-closed decisions and preventables

- **One-Sentence Preventable:** place firmware entry first and assert the ELF
  entry, because QEMU/OpenSBI's payload address must not silently land in a
  newly reordered trap routine.
- **One-Sentence Preventable:** mechanically bind fixed assembly offsets to the
  canonical `TrapFrame` size/CSR offsets.
- **One-Sentence Preventable:** `sepc + 4` is valid only for this known 32-bit
  probe, not a universal exception policy.
- **One-Sentence Preventable:** later Morphic output is not evidence of a trap;
  require distinct taken, returned, and post-trap semantic evidence.
- Missing/duplicate/malformed records, unexpected cause/interrupt, failed
  restoration, missing return, timeout, wrong ELF identity, nondeterminism, and
  Morphic mismatch now fail nonzero without suppressing subprocess output.

## Snowball Yield and Less-Lines / Instruction Compression

composition: one resumable synchronous supervisor trap before the settled Morphic scenario
base commit: `abb616a` (frozen baseline ancestor: `87978fd`)
Zig baseline: 0.14.0
requirements at start: 7 classifications listed above
existing-module requirements: 3 named modules
existing-composition/recipe requirements: 1 (`run-hosted-morphic-runtime`)
missing reusable capabilities: 0
project-specific orchestration requirements: 1 bounded trap boundary
out-of-scope requirements: listed above
requirements discovered during run: explicit entry-section ordering after the trap routine changed link order
existing modules actually reused: 3 plus their established closure
existing recipes/compositions actually reused: 1
new reusable modules created: 0
new reusable recipes/compositions created: 0
known diagnostic lookups used: 0; no published invariant failure matched
unknown diagnostic lookups: 0
new evidenced diagnostics added: 0
source reads required for ordinary reuse: unmeasured
focused validations executed: verifier self-tests, Batch 10, Batch 11, Batch 12, recipe/build checks
aggregate validations executed: canonical repository validation
unmeasured fields: tokens, counterfactual LOC, and formal 0-to-Done speed
notes: one canonical Batch 12 command mobilizes build, ELF inspection, two real machines, trap proof, and semantic comparison. New reusable work was not manufactured to increase counts.

The final `python3 tools/developer-command.py validate-repository` completed with
status PASS for all 53 contracted/full modules (0 partial), including unit,
smoke, recipe, conformance, property, fuzz-smoke, differential, policy, contract,
index, graph, evidence, portability, and command-reference checks.

The relevant new implementation is the target adapter and verifier; exact LOC is
available from `git diff --numstat` rather than treated as a quality metric. Reuse
kept target-neutral Morphic logic unchanged. No benchmark superiority or token
savings are claimed.

## Limits and next pressure

This proves the declared integer frame and representative registers necessarily
clobbered by dispatch plus stack restoration; it does not mechanically sentinel
every one of x1-x31. It does not prove hardware equivalence, nested traps,
asynchronous interrupts, FP/vector preservation, or Linux compatibility. Normal
CI remains independent of this system-QEMU execution lab.

The smallest evidence-backed next pressure is an independently bounded supervisor
timer interrupt and acknowledgement policy, but Batch 12 does not implement it.
