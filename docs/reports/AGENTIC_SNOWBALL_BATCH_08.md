# Agentic Snowball Batch 08 — Invariant-Guided Diagnosis

## Baseline and scope

The actual local base was `ae2a9d8a82af6df33b7e2b0081f9b73fc5a21953`, using Zig 0.14.0. The requested `git pull --ff-only origin main` could not run because this checkout has no `origin` remote; work therefore proceeded from the supplied current checkout and the limitation was not hidden. The mission was the smallest reusable reverse-correctness path. No universal debugger, source-log parser, new module, new recipe, port redesign, Batch 09 work, or `benchmark-pre-morphic-52` change was made.

## Architecture

Canonical invariants are optional `agent_contract.canonical_invariants` records in `details.json`, validated by `details.schema.json` and semantic contract checks. Each record has a stable ID, exact public operation, ordinary-language description, a conventional observed-value relation, diagnostic reference, repair, and focused validation. The agent-index generator projects these records; generated files are never authored. Diagnostics link to the invariant instead of copying a second causal rule. Preflight projects the same record only for modules that have one.

A Failure State Capsule is JSON validated by `schemas/failure-state-capsule.schema.json` version 1.0.0. Required fields are `schema_version`, `component`, `operation`, and `observed`. Optional `native_error` and `symptom` preserve native evidence. Every surviving field distinguished a pressure diagnosis or supported explicit uncertainty; raw logs, caller-asserted diagnoses, stack traces, and mutation claims were excluded.

Structured syntax is:

```text
python3 tools/query-reference.py agent diagnose --capsule PATH
```

The existing `python3 tools/query-reference.py agent diagnose TERM` remains candidate discovery and never emits a `KNOWN` causal classification. Invalid capsules fail nonzero with `ZIGREF-FAILURE-CAPSULE-INVALID`. Valid but insufficient capsules return `UNKNOWN` with `ZIGREF-DIAGNOSIS-UNKNOWN` and mechanically list missing decisive observed values when known.

## Pressure evidence

Three existing modules cover distinct constraints:

| Module | Class | Canonical invariant | Diagnostic | Focused validation |
|---|---|---|---|---|
| `bounded-deterministic-scheduler` | temporal progression | `scheduler-time-monotonic` | new `ZIGREF-SCHEDULER-TIME-REVERSED` | `zig build test-bounded-deterministic-scheduler` |
| `bounded-system-resource-plan` | declared resource bound | `resource-plan-memory-bound` | reused `ZIGREF-RESOURCE-PLAN-MEMORY-EXCEEDED` | `zig build test-bounded-system-resource-plan` |
| `bounded-deterministic-event-trace` | bounded capacity | `event-trace-capacity` | reused `ZIGREF-EVENT-TRACE-FULL` | `zig build test-bounded-deterministic-event-trace` |

The known scheduler capsule establishes `new_time < current_time`. Removing `current_time` produces the committed `scheduler-insufficient.json` capsule and deterministically falls back to `UNKNOWN`. `owned-byte-buffer` with an unsupported deinit symptom is also explicitly unknown. No factual pressure case established multiple distinct symptoms from one invariant, so none is claimed. Known results require zero implementation-source reads after canonicalization.

Authoring read three implementation sources to verify first diagnoses: the scheduler, resource-plan, and event-trace public Zig sources. Ordinary structured diagnosis reads zero implementation sources: it consumes generated module and diagnostic JSON. Diagnostic lookups performed were `TimeReversed`, the resource-plan memory diagnostic, and event-trace full diagnostic.

## Determinism and sizes

Each diagnosis was executed twice and compared byte-for-byte.

| Capsule | Capsule bytes | Diagnosis bytes | Result |
|---|---:|---:|---|
| `scheduler-time-reversed.json` | 170 | 967 | KNOWN |
| `resource-plan-memory-exceeded.json` | 176 | 1010 | KNOWN |
| `event-trace-full.json` | 159 | 960 | KNOWN |
| `scheduler-insufficient.json` | 153 | 592 | UNKNOWN |
| `unknown.json` | 123 | 546 | UNKNOWN |

Preflight sizes before/after were: semantic-version 1665/1665; owned-byte-buffer 2450/2450; bounded-system-resource-plan 4374/4832; bounded-deterministic-scheduler 2371/3014; run-hosted-morphic-runtime 7336/7369. Only pressure projections and the recipe's pressure diagnostic closure grew. Identical hosted Morphic runs remained exactly 765 bytes.

## Snowball Yield and limits

Starting requirements were canonical invariant truth, compact capsules, evidence-honest known/unknown diagnosis, preflight symmetry, three real failure classes, determinism, and narrow validation. Reused modules: scheduler, resource plan, and event trace; reused recipes: none as new work (the existing hosted runtime remained a validation subject). Added three canonical invariants, one stable diagnostic, one schema, six small fixtures including malformed and insufficient cases, and one regression command. New modules: 0. New recipes: 0. Corpus: 53 contracted / 53 full / 0 partial.

This system establishes only the listed numeric relations from canonical truth and supplied observations. It does not infer arbitrary causality, trust caller conclusions, interpret raw logs, prove rollback, or diagnose unsupported external state. Such evidence remains `UNKNOWN`.

## Validation

Focused schema, index, contract, query, module, Morphic, port, command-manual, Minimus, and repository aggregate gates were run as required. The final validation outcomes are reflected in the completed run and command manual; no skipped gate is represented as passed.
