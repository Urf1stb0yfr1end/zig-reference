# Agentic Snowball Batch 14 — Bounded Monotonic Supervisor Ticks

## Baseline and Task Projection

The supplied checkout began at `b2b4a0e0f5c9725652e85f2e192cd3abd75104f8`
on branch `work`, the canonical merged Batch 13 baseline. The independently
reproduced Batch 13 commit `fa2c0f502efd0381b2ad32c24b50ce89d4dc148c`
is represented by that merged state. Before implementation, both the Batch 13
self-test and two-run real system-QEMU proof passed: each machine delivered one
asynchronous S-mode cause-5 interrupt, neutralized it, returned through `sret`,
and retained the 765-byte canonical Morphic payload. No remote or historical
evidence tags were configured in the supplied checkout.

| Classification | Frozen requirement |
|---|---|
| Existing reusable capability | `bounded-system-resource-plan`, `bounded-deterministic-scheduler`, and `bounded-deterministic-event-trace` remain the bounded target-neutral foundations. |
| Existing composition | `run-hosted-morphic-runtime` and its shared target-neutral Morphic core remain canonical. |
| Existing machine boundary | Batch 11 entry/SBI transport, Batch 12 direct `stvec` and 288-byte `TrapFrame`, and Batch 13 one-shot timer dispatch/neutralization. |
| Missing reusable capability | None. The new pressure is narrow RISC-V/SBI proof orchestration, not a portable clock, scheduler, or timer API. |
| Project-specific orchestration | Four-entry fixed telemetry, `rdtime`, explicit deadline chaining, phase dispatch, final neutralization, bounded wait/return counting, and one fail-closed verifier. |
| External dependency | Zig 0.14.0, real `qemu-system-riscv64` `virt`, bundled conventional OpenSBI, `qemu-riscv64`, and `readelf`. |
| Initial unknowns | Whether four events would deliver reliably, whether observed time would be strictly monotonic, and which compiled wait PC would be interrupted. |
| Rejected alternatives | Software counter markers, Linux user-mode timer behavior, indefinite periodic ticking, preemption, a generic HAL, and weakening the one-shot verifier. |
| Minimum Trustworthy Read Set | This plan/report, recipe contract, freestanding adapter, Batch 12/13 verifiers, command manual, and Developer Minimus helper. |
| Success evidence | Self-test rejection matrix plus two finite real machines, four independently parsed interrupts each, strict time/deadline relations, four returns, final neutralization, preserved earlier frames, and exact Morphic equality. |
| Out of scope | Accuracy/frequency/drift claims, preemption, sleep/timeouts, U-mode, multiple harts, wall-clock/POSIX/Linux clocks, and real-hardware equivalence. |

Agent Fast Path reported 53 contracted/full modules and zero partial modules.
Preflight confirmed the selected foundations are bounded, allocation-free,
freestanding-supported, and expose caller-controlled logical time rather than a
hardware clock. The free-text selector suggested unrelated general containers;
they were rejected because this residual capability is target-specific.

## Time facts and implementation

Architecturally, the RV64 `time` counter is read with `rdtime`; the execution
boundary uses the conventional SBI legacy set-timer extension already proven in
Batch 13. Firmware provenance comes from QEMU's OpenSBI banner and TIME extension;
actual delivery and ordering are observed directly. These facts support only
monotonic counter ordering in this proof environment—not seconds, nanoseconds,
wall time, precision, long-term frequency accuracy, or drift bounds.

The repeated phase has a compiled count of four and interval of 100,000 counter
units. Its bounded state records active/final flags, count, return count, and four
entries of `sepc`, `scause`, `sstatus`, observed time, current deadline, next
deadline, and re-arm state. Each non-final handler reads fresh time and programs
`observed_time + 100000`, avoiding reuse of an already-late deadline. The fourth
handler masks `sie.STIE`, programs maximum RV64 deadline, marks final
neutralization, restores context, and returns. A post-final delivery increments
the count and therefore fails the exact-count gate rather than disappearing.

The synchronous EBREAK path remains cause 3 / interrupt 0 and alone advances
`sepc` by four. The independent one-shot phase remains cause 5 / interrupt 1,
leaves `sepc` unchanged, masks STIE, sets maximum deadline, and emits its original
frame. The repeated phase then re-enables only the required state. Its assembly
wait region increments `tick_return_count` only after control has returned from
the trap entry, mechanically reconciling four deliveries with four `sret`
returns and representative integer/stack preservation.

## Focused machine evidence

The repository was provisioned under the permitted package policy with
`apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y
qemu-system-misc qemu-user opensbi`. Executed QEMU is 8.2.2, the machine banner
reports OpenSBI v1.3, `readelf` is GNU Binutils 2.42, and Zig is 0.14.0.

The focused verifier builds and inspects the current freestanding ELF, checks its
RISC-V executable/static/entry identity, anchors breakpoint and both timer wait
regions in symbols, runs native hosted/fake paths twice, and runs two real QEMU
machines. Each real run delivered exactly four repeated cause-5 interrupts with
interrupt bit 1. In the first recorded proof the observed sequences were
`[619140, 720745, 821877, 923017]` and
`[695351, 796295, 897263, 998256]`; values are deliberately relational evidence,
not stable golden bytes. Every current deadline was reached, every next deadline
was exactly fresh observed time plus 100,000, all three non-final records were
explicitly re-armed, and each final record used maximum deadline with STIE
masked. Both return counts were four, no fifth delivery occurred, the Batch 12
breakpoint and Batch 13 one-shot parsers passed, and native/fake/two machine
Morphic payloads were equal at 765 bytes.

Self-tests reject missing/duplicate frames, count/return mismatch, duplicate or
skipped indexes, wrong cause/class, malformed hex, pre-deadline and non-monotonic
time, broken deadline chaining, missing re-arm, missing final neutralization,
out-of-ELF-window PC, missing return, and unexpected fields. Timeouts, command
failures, ELF mismatch, prior-proof regressions, and Morphic mismatch remain
nonzero failures with one final Developer Minimus handoff.

## Snowball Yield and constructive memory

- Existing modules reused: 3 plus their established closure; existing
  compositions reused: 1; existing machine boundary reused: Batch 11/12/13.
- New reusable modules/recipes: **0/0**. Target-specific glue: one bounded tick
  phase. Focused validators added: one, with self-test and real execution modes.
- Facts that compound: an explicit phase prevents one-shot/repeated ambiguity;
  fresh-time-relative re-arming bounds late-delivery behavior; return count
  distinguishes handler entry from completed `sret`; post-final delivery is
  preserved as failure evidence.
- One-Sentence Preventables: never infer multiple hardware interrupts from a
  printed count; reconcile records and post-`sret` returns. Never re-arm an
  already-late fixed deadline without a bounded catch-up policy. Never let the
  repeated phase weaken the independent one-shot contract.
- Failure paths eliminated: silent software-only ticks, missing/out-of-order
  delivery, non-monotonic observation, malformed cause, missing re-arm, missing
  final neutralization, extra delivery, missing return, timeout, stale ELF
  relationship, and Morphic drift.
- Broad archaeology still required: none beyond the plan-directed machine
  adapter/verifier/contract surfaces. Reads, tokens, counterfactual LOC, and
  performance improvement are unmeasured.
- Less-Lines effect: one command composes build, ELF inspection, prior-frame
  checks, two native baselines, two fake baselines, two real machines, relational
  telemetry validation, and byte equality. No universal speed or LOC claim is made.

## Non-claims and next pressure

This is not indefinite periodic timekeeping, a production clock, preemption,
scheduler fairness, sleep queues, timeouts, U-mode delivery, multi-hart
coordination, wall/calendar time, POSIX/Linux clock compatibility, or proof on
real hardware. FP/vector and nested-interrupt context remain outside the fixed
integer frame.

The smallest next evidenced pressure is to decide whether the now three-class
trap/timer phase dispatch has enough real duplication to justify a small bounded
dispatch consolidation, or whether a non-preemptive scheduler-facing monotonic
time input is the narrower next executable need. Execution evidence—not an
aspirational Batch 15 choice—must decide.

## Aggregate validation

The explicit `zig build test`, `smoke`, `recipes`, `conformance`, `property`,
`fuzz-smoke`, and `differential` surfaces passed. Command-reference, repository
index, dependency graph, Agent Fast Path index, contract formatting, tracked Zig
formatting, and diff-whitespace checks passed. The canonical
`python3 tools/developer-command.py validate-repository` completed **322/322**
steps with **206/206** tests, 53 contracted/full modules, zero partial modules,
and one final PASS handoff. Ordinary aggregate validation remains independent of
QEMU; the separately executed preservation matrix supplies the machine evidence.
