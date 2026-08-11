# Agent Context Efficiency Rework

Status: proposal / roadmap

This document proposes a repository-wide rework to make `zig-reference` cheaper for coding agents to understand without weakening the contracts, evidence, validation, or human readability that make the repository useful.

The central question is simple:

> Does the repository preserve solved knowledge in a form that reduces future agent search and reasoning cost, or does it merely move that cost into reading documentation?

The current answer is mixed. The repository has a strong machine-discovery architecture, but it has not yet proved that the default agent workflow consumes less context than ordinary source discovery. The next iteration should preserve the strong parts and aggressively reduce unnecessary context.

## 1. Current assessment

The repository already has several features that are genuinely favorable to agents:

- stable numbered module identities under `projects/`;
- explicit separation of reusable modules, recipes, generated views, tooling, and documentation;
- machine-readable `details.json` contracts;
- deterministic generated agent indexes;
- `tools/query-reference.py` operations for bootstrap, selection, composition, impact, preflight, diagnostics, and focused validation;
- dependency and reverse-dependency discovery without broad source archaeology;
- explicit validation commands and evidence;
- a strong rule that claims must remain narrower than the evidence.

These should be preserved.

The main weakness is not the filesystem itself. The weakness is that too many overlapping representations can become part of the expected reading path.

A module may currently expose the same underlying truth through:

- source and tests;
- `details.json`;
- `DETAILS.md`;
- `README.md`;
- `MASTERY.md`;
- the module catalog;
- generated agent projections;
- plans and reports that mention the module;
- root or roadmap summaries.

That redundancy is useful only when agents can avoid reading most of it.

The repository therefore needs a stronger distinction between **stored knowledge** and **default context**.

## 2. Target behavior

A zero-context coding agent should normally follow a progression close to:

```text
arrive with a task
        ↓
compact bootstrap
        ↓
compact task/capability selection
        ↓
1–3 selected module cards or preflights
        ↓
only the exact source/tests required for the edit
        ↓
focused validation
        ↓
aggregate validation when appropriate
```

The normal path should not be:

```text
read AGENTS.md in full
        ↓
read the complete module catalog
        ↓
read a schema
        ↓
read full details.json
        ↓
read DETAILS.md
        ↓
read MASTERY.md
        ↓
read README.md
        ↓
finally inspect source
```

The second path defeats the purpose of machine-readable engineering memory.

## 3. Preserve these foundations

The rework should not discard the architecture that is already working.

Keep:

1. `projects/` as the canonical reusable-module home.
2. Stable numeric module identities.
3. `recipes/` for compositions rather than hiding integration in prose.
4. `details.json` as canonical machine-facing module contract truth.
5. Generated dependency, capability, diagnostic, validation, and agent indexes.
6. Query-first discovery.
7. Exact focused validation commands.
8. Machine proof reports and explicit nonclaims for major milestones.
9. Deterministic textual generated state that fails closed on drift.
10. Source as authority for exact behavior.

The goal is not less rigor. The goal is **progressive disclosure of rigor**.

## 4. Problem: AGENTS.md is too expensive as a default entry point

`AGENTS.md` contains important rules, but it has grown into a large combination of operating policy, repository philosophy, module standards, documentation policy, command policy, validation policy, diagnostic policy, and handoff conventions.

A fresh agent should not need all of that in active context for every task.

### Proposed change

Split the current material into two layers.

The root `AGENTS.md` should become a compact mandatory contract containing only rules that every coding agent must know before acting, for example:

- target Zig version;
- query before inventing;
- treat checked-out HEAD as truth;
- source/contracts authority order;
- do not hand-edit generated views;
- preserve evidence and nonclaims;
- run focused validation before aggregate validation;
- never silently stop after a long task;
- exact handoff/source-control requirements;
- links to detailed standards.

Detailed policies should live under existing `docs/standards/` documents and be opened only when the task touches them.

### Target

Aim for a root `AGENTS.md` small enough to enter ordinary working context cheaply. A concrete byte/token budget should be established after baseline measurement.

## 5. Problem: the documented discovery order still asks agents to read broad material

The repository correctly says to query first, but the current rules can still send an agent from the query system into the entire human module catalog and then into multiple layers of contract documentation.

That makes the query tool an additional step instead of a replacement for broad discovery.

### Proposed change

Make the canonical agent discovery order:

```text
agent bootstrap
→ agent decide TASK
→ agent card MODULE --view select
→ agent compose / preflight as needed
→ agent card MODULE --view integrate
→ exact source/tests only when needed
```

`docs/catalog/MODULES.md` should remain valuable for humans and as a fallback when generated indexes are unavailable, but it should not be a mandatory read after a successful agent query.

Likewise, full `details.json` should be opened only when the compact projection does not expose a required fact.

## 6. Problem: per-module documentation multiplicity

The current module convention requires `README.md`, `MASTERY.md`, `DETAILS.md`, `details.json`, source, and tests.

This is excellent for a teaching/reference library, but it may create unnecessary maintenance and duplicated truth for modules whose concepts are simple.

### Proposed change

Do not delete these files immediately. First change their roles.

#### `details.json`

Remain canonical for machine-readable integration facts.

#### `README.md`

Remain short and human-facing: what the module is, when to use it, and its scope. It should not duplicate the exhaustive contract.

#### `DETAILS.md`

Investigate generating most or all of it from selected `details.json` fields. Human-authored prose should exist only for facts that cannot be represented cleanly in the structured contract.

#### `MASTERY.md`

Make it optional for future modules unless the module genuinely benefits from a deeper mental model, proof explanation, teaching material, or exercises.

A checked integer cast helper does not necessarily need the same documentation ceremony as an ELF loader or Sv39 page-table builder.

### Migration rule

Existing module files should remain until generators, links, tests, and agent workflows have been migrated. Do not mass-delete documentation for aesthetics.

## 7. Problem: status facts drift across documents

A current concrete example is the root README milestone section becoming stale while later work has already merged or been planned.

This is a structural warning: current status is being repeated manually in too many places.

### Proposed change

Create one canonical machine-readable project-status source for facts such as:

- latest completed batch;
- latest completed machine milestone;
- next active batch/plan;
- latest proof report;
- current main revision when useful;
- current headline nonclaims.

Generate or validate short status sections in README/docs from that canonical source.

Do not turn historical reports into mutable status files. Reports remain immutable evidence of completed runs. The status index merely points to them.

## 8. Problem: plans and reports are useful but can become default-context traps

Long Codex plans are appropriate because they freeze scope and completion requirements for a major batch. Reports are also valuable historical evidence.

The problem appears when a new agent must read several entire historical plans/reports just to recover a few settled facts.

### Proposed change

Add compact generated milestone projections containing only:

- milestone identity;
- exact proved facts;
- explicit nonclaims;
- reusable capabilities introduced;
- relevant proof commands;
- next pressure;
- links to the full plan/report.

The full report remains available for audit. Ordinary successor agents consume the compact projection first.

Historical plans should normally be read only when auditing the intended scope of that exact batch.

## 9. Add hard context budgets to agent-facing projections

The repository currently says fast-path responses should be smaller than the documentation they summarize, but it does not enforce concrete size budgets.

### Proposed change

Measure serialized output size for common operations and add CI limits once reasonable baselines are known.

Candidate targets to evaluate:

```text
agent bootstrap                <= ~1 KB
agent card --view select       <= ~2 KB typical
agent card --view integrate    <= ~4 KB typical
agent preflight                <= ~5 KB typical
agent impact                   <= ~3 KB typical
```

These are starting hypotheses, not immediate hard requirements. Measure current outputs first and choose budgets that preserve important facts.

When an output exceeds its budget, prefer:

1. removing derivable prose;
2. returning stable identifiers/paths instead of explanations;
3. splitting optional detail behind another query;
4. summarizing large dependency sets with count + follow-up command;
5. avoiding repeated fields across views.

Do not truncate correctness-critical obligations merely to satisfy a byte target.

## 10. Add an agent-efficiency benchmark instead of assuming success

The largest missing proof is empirical: the repository has not yet established that Z-Ref reduces total agent context or work.

### Proposed benchmark

Define a set of representative tasks, for example:

- select a bounded byte parser for a new binary format;
- add a small capability that should reuse two existing modules;
- modify a foundation and identify all affected dependents;
- diagnose a known failure;
- integrate an existing module into a recipe;
- implement a small Linux-ABI pressure using existing address/range primitives.

Run each task in two modes:

#### Mode A — ordinary repository discovery

Agent receives normal repository access but no Z-Ref fast-path instructions.

#### Mode B — Z-Ref fast path

Agent begins with the canonical bootstrap/query workflow.

Measure:

- files opened before the first correct edit;
- bytes/tokens of repository text consumed;
- tool/query calls;
- broad searches performed;
- duplicate/reinvented code attempted;
- incorrect candidate modules considered;
- validation retries;
- time to first correct implementation when measurable;
- final correctness;
- total context consumed through completion.

The benchmark should record failures as well as wins. Z-Ref should be allowed to lose a task; otherwise the benchmark is promotional rather than useful.

## 11. Add context accounting to Snowball Yield

Current Snowball Yield reports often record source reads/token savings as unmeasured.

### Proposed change

For substantial future batches, collect lightweight context-efficiency facts where tooling can do so without intrusive instrumentation:

- number of agent query operations;
- number of candidate contracts opened;
- number of source files opened before implementation;
- number of reusable modules selected;
- number of modules rejected without source inspection;
- broad repository searches required;
- unknown diagnostic lookups;
- whether source archaeology was necessary.

Actual language-model token counts may not always be observable. Do not fabricate them. Byte counts and file-read counts are still useful proxies.

## 12. Make generated views the compression layer

The long-term architecture should be:

```text
canonical source + structured contract + tests
                    ↓
          deterministic generators
                    ↓
     small purpose-specific projections
                    ↓
              agent queries
```

Not:

```text
canonical truth
    ↓
several manually synchronized prose copies
    ↓
agent reads all copies
```

Whenever a fact can be derived, generate it.

Whenever a large contract can be projected for a specific decision, query the projection.

Whenever prose is genuinely necessary, keep it close to the human question it answers rather than repeating machine facts.

## 13. Proposed migration phases

### Phase A — measure before deleting

1. Record current sizes of `AGENTS.md`, module contracts, generated cards, catalogs, and common query responses.
2. Add a small tool that reports agent-facing context sizes.
3. Run several representative tasks and establish a baseline.
4. Record which files agents actually needed.

No documentation is removed in this phase.

### Phase B — fix the default entry path

1. Shorten root `AGENTS.md`.
2. Move detailed rules into existing standards documents.
3. Make query-first progressive disclosure the canonical agent workflow.
4. Stop requiring the full module catalog after successful query selection.
5. Update bootstrap output so the next useful command is always obvious.

### Phase C — reduce duplicated module truth

1. Audit overlap among `README.md`, `DETAILS.md`, `MASTERY.md`, and `details.json`.
2. Generate `DETAILS.md` where feasible.
3. Make `MASTERY.md` optional for suitable future modules.
4. Keep README files intentionally short.
5. Add drift checks where human-authored prose still repeats structured facts.

### Phase D — centralize current status

1. Introduce one canonical project-status index.
2. Generate or validate README status from it.
3. Point status to immutable reports/plans instead of copying their claims.
4. Eliminate manual milestone duplication where practical.

### Phase E — compact milestone memory

1. Generate concise completed-milestone cards from reports.
2. Let successor agents query those cards before historical reports.
3. Keep full evidence available for audit and regression work.

### Phase F — enforce context budgets

1. Establish realistic output budgets from measurements.
2. Add CI checks for common fast-path views.
3. Fail on accidental projection bloat.
4. Provide explicit deeper queries instead of expanding default views.

### Phase G — prove or revise the thesis

Run the agent-efficiency benchmark periodically as the repository grows.

If Z-Ref stops reducing search/reasoning cost, change the architecture rather than defending it.

The repository should be judged by whether future agents can solve more while reading less irrelevant material.

## 14. Success criteria

This rework succeeds when all of the following are true:

1. A zero-context agent can discover the relevant capability without reading the entire catalog.
2. Ordinary module integration normally requires a compact card/preflight plus a small number of source files.
3. `AGENTS.md` no longer dominates initial context.
4. Large `details.json` contracts are stored as truth but rarely consumed whole.
5. Human documentation remains useful without manually duplicating machine facts everywhere.
6. Current milestone status has one canonical source and does not routinely drift.
7. Historical plans/reports remain auditable without becoming mandatory default context.
8. Agent-facing projections have measured and enforced size discipline.
9. Snowball Yield begins collecting real context/search evidence instead of assuming savings.
10. Controlled benchmarks show whether query-first Z-Ref actually reduces work versus ordinary repository discovery.

## 15. Non-goals

This rework must not:

- delete evidence to make the repository look smaller;
- weaken validation or proof requirements;
- remove human-readable documentation entirely;
- hide uncertainty behind compressed summaries;
- replace source authority with generated prose;
- make agent tools opaque or database-dependent;
- force every task through a complex custom DSL;
- optimize for token count at the expense of correctness;
- perform mass path churn without migration evidence.

## 16. Governing principle

The repository began with a useful rule:

> Solved once. Documented completely. Reused forever.

The next refinement should be:

> **Store the complete truth. Load only the truth needed for the current decision.**

That distinction is the difference between an archive that agents can read and an engineering memory that actually makes agents cheaper, faster, and less likely to rediscover solved work.
