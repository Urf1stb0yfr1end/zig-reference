# Agentic Snowball Batch 15 — Scheduler-Facing Monotonic Time

## Starting point

Work began on branch `work` at `21c284047e1ca6f29e16d19e9cf3690ecd5dda3e`. The supplied checkout did not contain the named historical tags locally; the independently reproduced Batch 14 revision and immutable evidence name supplied by the task were `b4893c9da3caa59d3b74b14b10d6e144fd7caf55` and `morphic-riscv-first-bounded-monotonic-supervisor-ticks`. No tag was created, moved, or deleted.

Before implementation, both `python3 tools/verify-freestanding-riscv64-supervisor-ticks.py --self-test` and the real two-run system-QEMU lab passed on the supplied source. Each machine delivered four strictly monotonic cause-5 ticks, returned four times, re-armed three times, neutralized the final deadline, and retained 765-byte Morphic equality.

## Task Projection

| Fact | Projection |
|---|---|
| Requested capability | Feed real supervisor-visible `rdtime` observations to deterministic scheduling without preemption. |
| Reused scheduler | `projects/52-bounded-deterministic-scheduler`, especially `BoundedDeterministicScheduler`, `schedule`, `advanceTo`, and `nextReady`. |
| Reused machine proof | The four-element bounded Batch 14 observation arrays and post-`sret` return count in the freestanding adapter. |
| Semantic boundary | Interrupt context only records `rdtime` and performs the established re-arm/neutralize policy; normal S-mode code calls the scheduler after `ticksProbe` proves all returns. |
| Dependencies | Existing scheduler dependency closure and Morphic recipe; no new module. |
| Scheduler invariant | `advanceTo` rejects time reversal; ready ordering remains ready time, priority, then stable insertion sequence. |
| Machine invariant | Four raw observations are strictly increasing in each independently parsed real-machine run. |
| Unknowns | Counter frequency, accuracy, physical units, wrap horizon, and real-hardware behavior are unmeasured. |
| Rejected alternatives | Scheduling in the handler, fabricated time increments, a generic clock/HAL module, preemption, context switching, sleeping APIs, POSIX/Linux names, and U-mode. |
| Minimum read set | Scheduler card/preflight/contract/source; recipe contract; freestanding adapter; Batch 14 verifier. |
| Focused validators | Scheduler unit/smoke, Batch 14 verifier, and the new Batch 15 self-test and real lab. |
| Success evidence | Two real machines, four observations each, identity mapping, readiness `[1,2,0,1]`, order `[1@0,2@1,3@1,4@3]`, decisions after four returns, and Morphic equality. |

## Adapter and bounded scenario

The adapter initializes a four-slot scheduler from the first recorded RV64 counter value and schedules four copied tasks. Task 1 is eligible at observation 0; tasks 2 and 3 share observation 1's threshold and equal priority to exercise insertion stability; task 4 is eligible at observation 3. It then advances through the four recorded values and drains ready work. This happens only after `ticksProbe` has reconciled four trap deliveries with four post-`sret` returns. The handler neither imports nor calls the scheduler.

Machine-to-scheduler mapping is exact identity from RV64 `usize` to the scheduler's `u64` representation. The freestanding target is RV64, so there is no narrowing. The bridge performs no addition and therefore introduces no arithmetic overflow. Batch 14's wrapping deadline experiment stays narrowly machine-specific and is not promoted to scheduler-time policy. The scheduler retains `TimeReversed` rejection.

The distinct `ZIGREF_SCHEDULER_TIME_*` frame contains a compiled observation count, mapping identity, return-before-decision count, task thresholds, each machine and scheduler time, per-observation ready count, decision phase, selected task/order evidence, remaining count, and completion marker. Storage and telemetry are fixed at four entries.

## Executed evidence

The rejection-oriented self-test rejects missing/duplicate frames, wrong counts, unexpected/duplicate fields, malformed fixed-width values, non-monotonic observations, scheduler mapping drift, reversed scheduler time, incorrect readiness counts, unstable equal-threshold ordering, interrupt-phase decisions, missing completion/return markers, and malformed prior frames. The real verifier also invokes the established Batch 12, 13, and 14 parsers.

Two QEMU 8.2.2/OpenSBI 1.3 executions each consumed four real `rdtime` observations. Both produced readiness counts `[1,2,0,1]` and stable selection `1@0,2@1,3@1,4@3` after four `sret` returns. Batch 12 breakpoint, Batch 13 one-shot, and Batch 14 repeated-tick evidence remained valid. Native hosted, deterministic fake, and both real machines were byte-identical at 765 canonical Morphic bytes.

## Preservation matrix

| Proof | Result |
|---|---|
| Batch 10 Linux-user execution | Preserved by focused self-test and real lab. |
| Batch 11 freestanding execution | Preserved by focused self-test and real lab. |
| Batch 12 breakpoint trap | PASS in two Batch 15 machines and the dedicated preservation lab. |
| Batch 13 one-shot timer | PASS in two Batch 15 machines and the dedicated preservation lab. |
| Batch 14 four ticks | PASS in baseline and final dedicated labs and parsed in both Batch 15 machines. |
| Morphic semantics | PASS, exact 765-byte equality across hosted, fake, and two machine runs. |

## Snowball Yield

No reusable module or scheduler public method was added. One target-specific adapter composes the existing machine observation store with the existing scheduler. Existing trap, timer, tick, ELF, Morphic extraction, and Developer Minimus helpers are reused by the focused verifier. Agent Fast Path selected the scheduler and exposed its monotonic invariant, operation map, dependency closure, and validation commands before source inspection. New factual files are one verifier and this report; existing build wiring, adapter, recipe truth, and command manual changed.

## One-Sentence Preventables

Do not infer scheduler-facing time from tick presence: require parsed raw `rdtime` identity, monotonic scheduler advancement, threshold/order recomputation, and evidence that decisions follow the corresponding `sret` returns.

## Non-claims and next pressure

This is non-preemptive and does not prove context switching, sleeping, clock frequency/accuracy/units, wall time, POSIX/Linux compatibility, U-mode, multiple harts, real hardware, or Alpine boot. The smallest next evidenced pressure is a bounded non-preemptive timeout/wake orchestration with an explicit counter-unit and overflow policy, unless active virtual-memory ownership becomes the independently prioritized foundation.
