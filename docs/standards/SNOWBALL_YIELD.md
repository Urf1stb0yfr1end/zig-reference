# Snowball Yield

`zig-reference` should not merely accumulate code. It should make later engineering cheaper because earlier work remains discoverable, composable, diagnosable, and validated.

**Snowball Yield** is the reduction in future work produced by adding well-connected reusable foundations. The project vocabulary defines the term in `docs/agentic-vocabulary.md`; this document defines how major composition runs record it without turning ordinary bookkeeping into an inflated benchmark claim.

## Purpose

When a major run composes a subsystem or system, record what the repository already supplied, what was genuinely missing, what new reusable foundations were added, and what evidence closed the loop.

The record exists to answer one practical question:

> How much of today's engineering was already solved before this run began, and how much new reusable truth did this run leave for the next one?

This is factual bookkeeping, not a performance promise.

## When to record it

Record Snowball Yield for major composition work such as Morphic stages, substantial recipes, cross-module subsystem integration, or other runs whose purpose is to consume and extend the existing corpus.

Do not require a Snowball Yield section for tiny fixes, documentation-only edits, isolated formatting, or a single-module maintenance change unless that work materially changes reuse or composition behavior.

## Freeze the requirement map before implementation

Before writing new implementation code, write down the reusable engineering capabilities and constraints required by the composition.

Classify each requirement using the repository state that existed at the start of the run:

- **existing module** — one canonical module already satisfies the requirement;
- **existing composition/recipe** — an existing recipe or known composition satisfies it;
- **missing reusable capability** — the requirement is broadly reusable but no compatible existing foundation satisfies it;
- **project-specific orchestration** — required for this system, but not a reusable foundation on its own;
- **out of scope** — deliberately deferred from the current composition target.

A requirement should appear once in the top-level map. Do not inflate reuse by counting every transitive dependency as another top-level requirement unless that dependency was independently required by the composition.

If implementation reveals a genuinely new requirement, add it explicitly and mark it as discovered during the run. Do not silently rewrite the initial requirement map to make the result look better.

## What counts as reuse

Count an existing module or recipe as reused only when it was actually selected for the composition and its relevant integration path was validated.

Merely finding a module in the repository does not count as reuse.

A transitive dependency may be listed for traceability, but it should not be double-counted as both an independently satisfied requirement and hidden support for another requirement unless both facts are true.

## What counts as new reusable work

Count a new foundation only when the run leaves it in a reusable repository form with the normal project guarantees: canonical implementation, contract, discovery metadata, dependencies, focused validation, and honest evidence.

Target-specific glue, one-off test scaffolding, or orchestration that is not useful outside the current composition should remain project-specific orchestration rather than being promoted merely to improve the numbers.

## Required run record

Every applicable run report should contain a `## Snowball Yield` section with, at minimum:

```text
composition:
base commit:
Zig baseline:

requirements at start:
existing-module requirements:
existing-composition/recipe requirements:
missing reusable capabilities:
project-specific orchestration requirements:
out-of-scope requirements:
requirements discovered during run:

existing modules actually reused:
existing recipes/compositions actually reused:
new reusable modules created:
new reusable recipes/compositions created:

known diagnostic lookups used:
unknown diagnostic lookups:
new evidenced diagnostics added:

source reads required for ordinary reuse:
focused validations executed:
aggregate validations executed:

unmeasured fields:
notes:
```

Prefer explicit names beside counts so another agent can reproduce the classification.

## Measurement rules

Use exact observations whenever practical:

- exact module and recipe identities;
- exact command names;
- exact diagnostic IDs;
- exact counts derived from the frozen requirement map;
- exact byte sizes when measured from deterministic command output;
- exact file/source reads only when the run can account for them reliably;
- exact elapsed time or token counts only when the environment actually exposes them.

If a quantity was not measured, write `unmeasured`. Do not estimate token savings, hidden model compute, or hypothetical baseline work and present the estimate as observed fact.

Do not convert a successful composition into a universal claim about all projects, all agents, all languages, or all workloads.

## Debugging is part of the snowball

A major composition run should record whether known failures were resolved through the Debug Fast Path and whether genuinely new repeatable failures became evidenced repair knowledge.

The preferred loop is:

```text
compose
→ validate narrowly
→ encounter failure
→ diagnose known failure cheaply, or preserve unknown truth
→ repair
→ encode reusable evidence when justified
→ validate
→ leave the next agent a better foothold
```

Do not create diagnostics merely to increase a count. Unknown failures remain explicitly unknown until evidence supports a stable diagnosis.

## Progressive disclosure still applies

Snowball bookkeeping must not make ordinary agent use more expensive.

Keep run records in reports and standards. Do not dump historical composition data into every module card, bootstrap response, or selection query. The normal agent path should continue to expose only the cheapest sufficient truth.

## Relationship to formal benchmarking

Snowball Yield records describe what happened inside a run. They are not a substitute for controlled agent benchmarks.

A future benchmark may compare identical tasks, models, environments, limits, and acceptance criteria with and without a frozen `zig-reference` corpus. Until then, Snowball Yield should remain conservative engineering bookkeeping.

The governing principle is simple:

> **Make each successful composition leave less rediscovery for the next one.**
