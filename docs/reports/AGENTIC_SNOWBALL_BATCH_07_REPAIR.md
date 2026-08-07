# Agentic Snowball Batch 07 Repair

## Baseline and scope

- Base commit: `dcdac0f98329b7a403fe1f070fb8616c751be145`.
- Compiler: Zig 0.14.0.
- Independent-review starting result: 42 checks passed and 2 failed.
- This was repair and consistency work only. It added no module or recipe and did not begin Batch 08, Failure State Capsules, or Invariant-Guided Diagnosis.

## Repairs

The zero-context bootstrap had a separately maintained beginner operation list and workflow which omitted the already-supported `preflight` parser operation. The bootstrap now derives its beginner-visible operations from the canonical workflow, and that workflow places `preflight` after `compose` and before `card integrate`. The acceptance test requires every operation named by the beginner workflow to be discoverable in bootstrap and specifically checks the semantic position of `preflight`. Specialized operations remain progressively disclosed.

`COMMANDS.md` also contained a current-tense 52-contract sentence left beside legitimate historical Batch 05 and Batch 03 counts. The current claim is now marked as current corpus state and says 53 contracted, 53 full, and 0 partial. `tools/check-command-reference.py --check` derives those values from `generated/agent/modules.json` and rejects a missing, duplicated, or stale marked current claim; explicitly historical batch counts remain allowed.

The historical request in `docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_07_CORRECT_USE_PREFLIGHT.txt` and the original `docs/reports/AGENTIC_SNOWBALL_BATCH_07.md` were not changed.

## Determinism and semantic preservation

Each representative preflight was run twice and compared byte-for-byte. Sizes were unchanged before and after this repair:

| Subject | Before | After |
|---|---:|---:|
| `semantic-version` | 1665 | 1665 |
| `owned-byte-buffer` | 2450 | 2450 |
| `bounded-system-resource-plan` | 4374 | 4374 |
| `bounded-deterministic-scheduler` | 2371 | 2371 |
| `run-hosted-morphic-runtime` | 7336 | 7336 |

The scheduler still exposes `Task` and `BoundedDeterministicScheduler`, not `FixedPriorityQueue`. The hosted recipe still exposes `python3 tools/developer-command.py verify-hosted-morphic-runtime`. An unknown subject remained explicit and returned exit status 2. Two identical hosted Morphic runs were byte-identical at exactly 765 bytes.

## Validation

Focused validation passed: bootstrap and doctor; Agent Fast Path acceptance and contract self-tests; agent-index drift; command-reference drift; port contracts and public-surface regression; Developer Minimus regression; Zig formatting; scheduler unit and smoke tests; hosted recipe and raw/canonical hosted verification. The raw hosted verification passed 66/66 steps and 32/32 tests.

Repository gates also passed: `zig build check` (74/74 steps, 30/30 tests), `zig build test` (217/217 steps, 162/162 tests), recipes (49/49 steps, 58/58 tests), conformance (23/23 steps, 42/42 tests), Morphic plan and trace outer verification, aggregate smoke, and canonical complete validation (322/322 steps, 204/204 tests). Developer Minimus and the Debug Fast Path retained their existing contracts.

No benchmark tag, preflight semantics, generated index, Zig baseline, Morphic runtime, module, or recipe was changed.
