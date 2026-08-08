# Agentic Snowball Batch 09 — Morphic Machine Operations

## Baseline and Phase 0 environment gate

The actual base commit was `c6911be96e3815f1bc38d960e75193b73b068322` on branch `work`, with Zig 0.14.0. No `origin` remote exists, and `/root/dev/zig-reference` was absent, so work continued in the supplied `/workspace/zig-reference` checkout. The initial unactivated `/usr/bin/python3` could not import `jsonschema`; no repository `.venv` existed. Direct tools used the active shell's `python3`, while `zig build` also launched the literal PATH-resolved `python3`, so the two could differ after activation and both depended on ambient PATH. The tools importing `jsonschema` are `module-contract-consistency-checker.py`, `record-validation.py`, `test-invariant-diagnosis.py`, and `validate-agent-contracts.py`.

The demonstrated cause was ambient interpreter selection plus an unprovisioned checkout, not schema behavior. The conventional source of dependency truth remains `tools/requirements.txt`. The new small launcher selects only the repository `.venv`, checks every declared top-level requirement before execution, installs nothing, and reports `ZIGREF-PYTHON-ENV-UNUSABLE`, the declaration, and the exact venv/pip repair. Build-backed dependency users share it. Doctor now checks this environment before agent contracts. The regression executes real contract validation without activation and safely overrides the venv location to prove the missing environment fails early without `ModuleNotFoundError`. A provisioned activated direct run and an unactivated canonical build-backed run both passed.

## Frozen requirement map

This map was frozen after the Phase 0 gate and before Morphic edits.

| Classification | Requirements |
|---|---|
| Phase 0 repair | deterministic repository Python interpreter and declared-dependency readiness |
| Existing modules | bounded resource planning, deterministic scheduling and caller-controlled logical time, bounded normalized event tracing |
| Existing recipe/composition | `run-hosted-morphic-runtime` planning/scheduling/tracing orchestration and hosted output |
| Missing reusable capability | none demonstrated as a standalone module; the only exercised machine operation is scenario-specific bounded task output |
| Project-specific orchestration | a minimal compile-time machine boundary, hosted adapter, deterministic fake adapter, and same-input comparison inside the existing recipe |
| Out of scope | RISC-V privilege/CSR/trap/SBI behavior, boot, UART, MMIO, FDT, PLIC, CLINT, VirtIO, networking, wall-clock time, halt, allocation, and a universal HAL |

Discovery reused bootstrap, doctor, decide, compose, and preflight for the hosted recipe and modules 50–52. No new capability ID, module, recipe, invariant, or diagnostic was justified.

## One core and the machine boundary

`runCore` remains the single owner of resource planning, scheduler policy, logical time, trace semantics, ordering, and output formatting. Compile-time duck typing requires one operation, `writeTask(id, now)`, plus access to the captured output. Both implementations borrow caller-provided storage, allocate nothing, require no cleanup, and return `OutputTooSmall` on exhaustion. `HostedMachine` uses Zig's fixed-buffer stream; `FakeMachine` uses bounded `bufPrint`. Tests compare logical output and normalized trace byte-for-byte, test both capacity failures, and the two runnable surfaces enable independent repeatability checks.

The pre-change hosted output was captured twice and was byte-identical at 765 bytes using `zig build run-hosted-morphic-runtime`. The post-change hosted and fake artifacts are measured during final validation and compared mechanically. This establishes only this canonical scenario, not cross-target or hardware equivalence.

For a future RISC-V implementation, the tested surface is exactly bounded `writeTask(id, logical_time)` and captured/emitted bytes. Planning, scheduling, logical time, event ordering, trace construction, and formatting stay target-neutral. Privileged setup, SBI/UART transport, traps, interrupts, MMIO discovery, shutdown, and boot remain deliberately outside the boundary. The next evidence-backed step is a bounded output adapter chosen only after a real RISC-V execution environment identifies its transport.

## Agent-native discovery, limits, and Snowball Yield

The existing recipe preflight is the Minimum Read Set: it names exact endpoints, dependency order, inherited guarantees, gaps, and focused commands. The final hosted-recipe preflight projection measured exactly 7466 bytes including its newline; no token estimate is inferred. Hosted and fake output each measured exactly 765 bytes, repeated byte-for-byte, and matched each other byte-for-byte. Source reads during authoring were the existing recipe source, its recipe contract, build wiring, Python launch paths, and four dependency-importing Python tools. Ordinary reuse after canonicalization requires the recipe preflight and recipe contract, not implementation source.

- Existing modules actually reused: `bounded-system-resource-plan`, `bounded-deterministic-scheduler`, `bounded-deterministic-event-trace`, and their dependency closure.
- Existing recipe reused and extended: `run-hosted-morphic-runtime`.
- New reusable modules/recipes: 0/0.
- Known diagnostic lookups used: none; unknown diagnosis did not justify a new identity.
- New invariants/diagnostics: none.
- Focused validation executed: Python environment positive/negative regression; Agent Fast Path, invariant diagnosis, index, contracts, command manual, Minimus, port checks; recipe tests (4/4); hosted verification (66/66 steps, 34/34 tests); two hosted and two fake runs with byte comparisons.
- Aggregate validation executed: check (74/74, 30/30), test (217/217, 162/162), recipes, conformance, plan (67/67, 31/31), trace (71/71, 36/36), smoke (110/110, 53/53), and canonical final repository validation including policy/property/fuzz/differential gates.
- Unmeasured: token savings, hidden compute, comparative development cost, cross-target performance, and hardware equivalence.

The fake is not a simulator, and the boundary is not a universal HAL. It proves one shared target-neutral semantic path with two deterministic output implementations for the operations current evidence requires.
