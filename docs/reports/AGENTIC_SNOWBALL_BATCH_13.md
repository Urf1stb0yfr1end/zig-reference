# Agentic Snowball Batch 13 — Bounded Supervisor Timer Interrupt

## Task projection and baseline

The supplied checkout began at `bc8d7a751634453db859248ee3ca12be9a84664f`
on branch `work`; merged Batch 12 commit
`fc5d1a4b85687d0ff41d9806d3357e7791e3eeed` is an ancestor. Zig is exactly
0.14.0. The repository had no configured remote and the historical
`pre-batch-12-freestanding-riscv-baseline` tag was unavailable; neither fact
blocked local implementation.

| Classification | Frozen requirement |
|---|---|
| Existing reusable capability | The bounded resource plan, deterministic scheduler, and deterministic event trace remain the target-neutral semantic foundations. |
| Existing composition | `run-hosted-morphic-runtime` and its single target-neutral core remain canonical. |
| Existing machine boundary | Batch 11 entry/SBI transport/shutdown and Batch 12 direct `stvec`, 288-byte integer `TrapFrame`, synchronous EBREAK dispatch, restoration, and `sret`. |
| Missing reusable capability | None. One timer event creates narrow RISC-V/SBI adapter pressure, not evidence for a generic timer or interrupt module. |
| Project-specific orchestration | SBI timer programming, minimal S-mode interrupt enablement, asynchronous cause dispatch, one-shot neutralization, bounded ELF wait window, and fail-closed execution verifier. |
| External dependency | Real `qemu-system-riscv64` `virt` execution with conventional OpenSBI firmware and `readelf`. |
| Initial unknowns | Actual firmware timer delivery, legal interrupted instruction(s), and time-varying CSR/PC values remained unknown until execution. |
| Rejected alternatives | Linux user-mode, semihosting, software timer markers, periodic ticking, a scheduler redesign, and a generic HAL do not prove the requested machine event. |
| Minimum source set | Freestanding adapter, linker/build wiring, recipe contract, Batch 12 verifier, new focused verifier, command manual, and this report. |
| Success evidence | Two finite real system-QEMU runs: one async cause-5 trap each, ELF-bounded interrupted PC, unchanged interrupt `sepc`, completed one-shot policy, `sret` return, no duplicate delivery, preserved EBREAK proof, and exact Morphic equality. |
| Out of scope | Periodic ticks, preemption, nesting, multiple harts, FP/vector context, paging, U-mode, Linux compatibility, and hardware equivalence. |

Agent Fast Path bootstrap/doctor reported 53 contracted/full modules and zero
partial modules. Preflight confirmed the three selected semantic modules remain
bounded, deterministic, allocation-free, and freestanding-supported. The broad
free-text selector returned unrelated candidates, so none was selected; this
target-specific residual novelty does not justify manufacturing a module.

## Implementation and execution evidence

The supplied image initially lacked QEMU. The permitted conventional command
`apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y
qemu-system-misc qemu-user opensbi` installed Ubuntu packages
`qemu-system-misc` and `qemu-user` 8.2.2+ds-0ubuntu1.18 and `opensbi`
1.7-1~24.04.1. Executed `/usr/bin/qemu-system-riscv64` reports QEMU 8.2.2;
the real machine banner identifies OpenSBI v1.3, runtime SBI 1.0, S-mode next
stage, and the TIME extension. The standard SBI legacy set-timer extension 0,
RV64 `time` CSR, `sie.STIE`, `sstatus.SIE`, and supervisor interrupt cause 5 are
the narrow external semantics used. Firmware support and delivery are also
directly observed rather than inferred from the banner alone.
Aggregate validation also required the conventional Node runtime; installing
Ubuntu `nodejs` 18.19.1+dfsg-6ubuntu5 restored the existing port-contract checks.
The repository-managed `.venv` was provisioned from `tools/requirements.txt`;
validation evidence was refreshed through `.venv/bin/python
tools/record-validation.py --level all` after the system interpreter correctly
refused to pretend that `jsonschema` was available.

The existing direct trap vector now dispatches on both the `scause` interrupt
bit and cause. Only the known synchronous EBREAK advances `sepc` by the
ELF-proven four bytes. The asynchronous cause-5 path records the interrupted
`sepc` unchanged, masks `sie.STIE`, programs the timer deadline to maximum RV64,
restores the fixed integer context, and returns with `sret`. The timer probe
enables only STIE and global S-mode interrupts, uses a compiled bounded wait
region, and confirms representative caller registers and the original stack.
The mask plus maximum deadline is the explicit one-shot neutralization policy;
the verifier requires one delivery and rejects repeated evidence.

Two real QEMU `virt` executions each delivered exactly one supervisor timer
interrupt with interrupt bit 1 and cause 5. Both observed interrupted PCs were
inside the independently read ELF interval `[0x80200134, 0x8020014c)`. Each run
completed the one-shot policy, restored the representative registers/stack,
returned through `sret`, emitted `ZIGREF_TIMER_RETURNED`, and proceeded into the
unchanged Morphic core. Absolute timer PC and `sstatus` are treated as
time-varying evidence and validated relationally, not required to match between
runs.

The focused verifier also rechecks the Batch 12 EBREAK against compiled symbols:
cause 3, interrupt bit 0, runtime `sepc=0x802000dc`, and compiled resume
`0x802000e0`. Batch 10 Linux-user, Batch 11 freestanding, Batch 12 synchronous
trap, and Batch 13 timer labs all passed. Native hosted, native fake, Linux-user
QEMU, freestanding QEMU, post-breakpoint QEMU, and post-timer QEMU outputs were
all exactly 765 canonical Morphic bytes.

## Snowball Yield, constructive memory, and limits

- Composition attempted: add exactly one real asynchronous timer pressure to
  the existing machine boundary before invoking the settled Morphic core.
- Existing modules reused: 3 plus their established closure. Existing
  recipes/compositions reused: 1. Existing machine-boundary implementation
  reused: the Batch 11/12 adapter, trap frame, vector, restoration, and SBI
  transport. New reusable modules / recipes: **0 / 0**.
- Project-specific glue: timer programming/enablement, two-class trap dispatch,
  one-shot neutralization, bounded wait labels, distinct evidence frame, and one
  focused verifier. No target-neutral Morphic source was changed.
- Requirements discovered during execution: ReleaseSmall artifacts must
  explicitly retain their symbol table because both old breakpoint and new
  timer relationships are verifier inputs; `build.zig` now says so rather than
  depending on an implicit build-mode behavior.
- Source reads: required standards/reports, recipe contract/source, build
  wiring, three earlier verifiers, Developer Minimus conventions, and command
  manual. Bytes/tokens and counterfactual work are unmeasured.
- Known/unknown diagnostic lookups: no stable `ZIGREF-*` diagnostic described a
  failing invariant; no new diagnostic identity was manufactured. Initial
  delivery and interrupted-PC unknowns were resolved by real execution.
- Focused validation: all four verifier self-tests and all four real Batch
  10–13 execution labs passed. Aggregate validation is recorded below.
- One-Sentence Preventables: never apply an exception's instruction-width
  `sepc` advance to an interrupt; a delivered one-shot timer must neutralize
  both enablement and its programmed deadline before `sret`; retain ELF symbols
  explicitly when runtime proof consumes their addresses.
- Silent-Failure Cascades removed: a marker without an async cause, pending but
  untaken timer, wrong cause class, out-of-window PC, missing return, duplicate
  delivery, incomplete policy, context failure, timeout, and Morphic mismatch
  all fail closed.
- Less-Lines / Instruction Compression: one canonical Batch 13 command now
  mobilizes the same artifact build, ELF identity/symbol inspection, Batch 12
  relationship check, native/fake baselines, two bounded real timer machines,
  evidence parsing, and byte equality. No general speedup, token saving, or
  counterfactual LOC claim is made.
- Explicit non-claims: periodic ticks, timekeeping policy, preemption, nested
  traps/interrupts, multiple harts, full x1–x31 sentinel coverage, FP/vector
  state, paging, U-mode, Linux/Alpine compatibility, and real-hardware
  equivalence remain unproven.

Canonical repository validation completed PASS after command-reference,
generated-index, dependency-graph, format, policy, contract, evidence, unit,
smoke, recipe, conformance, property, fuzz-smoke, and differential gates.
Ordinary validation remains independent of QEMU.

The next smallest evidence-backed pressure is a bounded monotonic supervisor
clock/tick policy that can represent more than a one-shot event without yet
introducing preemption. It must remain separate from generic scheduler or Linux
work until executable pressure establishes the required contract.
