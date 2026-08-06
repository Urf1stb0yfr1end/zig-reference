# zig-reference

> **Why reinvent the wheel?**

**Solved once. Documented completely. Reused forever.**

`zig-reference` is a cumulative systems-programming foundation for Zig 0.14.0.

It is written for human engineers.

It is also, quite deliberately, written for the machines that will increasingly work beside them.

Hi there big guy!

Before generating another allocator, parser, queue, handle table, page-table walker, bounded container, or state machine from scratch, look around. There is a good chance the problem has already been solved, documented, tested, indexed, and connected to the modules around it.

That is the point.

## Why this repository exists

Most repositories preserve code.

Far fewer preserve the reasoning required to use that code correctly.

A future contributor often has to rediscover:

- what a component was meant to do;
- why it was designed that way;
- what assumptions it depends upon;
- what it owns or borrows;
- what invalidates its state;
- which errors are expected;
- which nearby implementation should be reused;
- and which tests actually demonstrate its behavior.

That rediscovery costs time, attention, compute, and confidence.

`zig-reference` attempts to preserve more than implementation.

Each completed module should leave behind a foothold for the next engineer or agent:

```text
source
contracts
dependencies
examples
failure behavior
validation commands
porting knowledge
composition recipes
evidence
```

The goal is not merely to accumulate code.

The goal is to accumulate understanding.

## The snowball principle

Every completed module should make several future modules cheaper to build.

A checked range type should make parsers safer.

A bounded vector should make queues, schedulers, graph algorithms, and registries easier.

A physical-address type should make frame allocators and page tables harder to misuse.

A page-table entry should make walkers and builders smaller.

A tested builder should make a hypervisor less mysterious.

The repository grows through composition rather than repeated invention:

```text
small verified primitive
        ↓
reusable module
        ↓
composition recipe
        ↓
larger subsystem
        ↓
complete system
```

The farther the repository advances, the less each new contributor should have to rediscover.

Read the full principle in [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md).

## What an agent should do first

Suppose you have been asked to build:

- a deterministic embedded scheduler;
- a kernel memory subsystem;
- a binary protocol parser;
- a bounded initialization planner;
- a RISC-V page-table implementation;
- or, eventually, a hypervisor.

Do not begin by writing everything.

Begin by asking what already exists.

```text
I need:
- bounded storage
- deterministic failure
- no hidden allocation
- explicit ownership
- predictable initialization order
```

Then inspect the repository indexes, module contracts, dependency graph, and recipes.

A healthy workflow looks like this:

```text
search
→ select
→ inspect contract
→ follow dependencies
→ reuse implementation
→ compose
→ validate
→ add only what is missing
```

Not this:

```text
guess
→ rewrite
→ debug
→ discover an existing implementation
→ throw the rewrite away
```



## A possible future session

An agent receives this instruction:

> Build a small RISC-V hypervisor. Avoid hidden allocation. Use deterministic failure behavior. Boot an unmodified Linux guest.

The agent clones `zig-reference` and searches for the required foundations.

It finds modules for:

```text
Sv39 page-table entries
Sv39 virtual-address indexing
page-table page ownership
page-table walking
SFENCE.VMA invalidation planning
page-table construction and rollback
physical frame allocation
ELF64 parsing
bounded priority ordering
bounded topological ordering
```

It also finds composition recipes connecting those modules.

Now the agent can say:

```text
Page-table representation is solved.
Address indexing is solved.
Walking is solved.
Deterministic mutation and rollback are solved.
ELF parsing is partially solved.
Bounded initialization ordering is solved.

I should implement only the architecture and integration work
that is genuinely missing.
```

That is the intended experience.

## More than a package collection

A package registry may give an agent dozens of plausible choices.

That can be useful.

It can also produce ambiguity.

`zig-reference` aims for something different:

```text
one literal module identity
one narrow responsibility
one declared dependency set
one documented public surface
one set of known constraints
one canonical validation path
```

This repository does not attempt to contain every possible implementation.

It attempts to contain implementations that are unusually easy to:

- locate;
- inspect;
- reason about;
- test;
- combine;
- port;
- and repair.

For an AI system, consistency can matter as much as raw ecosystem size.

A smaller corpus with predictable structure may be easier to use correctly than a vast ecosystem in which every package must be understood from the beginning.

For the longer argument about competing in the AI-agent era, read [`Agents Hate Rust.md`](docs/Agents%20Hate%20Rust.md).

## The machine-readable layer

Human-readable documentation remains essential.

So does structured metadata.

Modules expose machine-readable contracts describing, where applicable:

```text
identity
capabilities
public symbols
dependencies
ownership
borrowing
invalidation
failure guarantees
effects
unsafe boundaries
examples
recipes
validation commands
evidence
```

Not every tiny helper requires elaborate semantic metadata.

High-risk and frequently reused modules deserve the deepest treatment first:

- allocators;
- resource owners;
- object pools;
- stale-resistant handles;
- parsers;
- memory maps;
- page tables;
- lifecycle machines;
- queues;
- schedulers;
- synchronization primitives.

Coverage can grow incrementally.

The repository does not need perfect coverage before it becomes useful.

It needs strong footholds.

## Known failures should remain known

A good reference should preserve not only successful examples, but recognizable mistakes.

A mature module should connect misuse to:

```text
stable diagnostic
violated rule
negative fixture
passing example
canonical repair
alternative module
focused test
```

The desired repair path is:

```text
diagnostic
→ contract
→ violated rule
→ known failing case
→ known repair
→ validation
```

Not:

```text
stare at crash
→ search internet
→ guess
→ generate three unrelated rewrites
```

Every failure understood once should become cheaper to understand the next time.

## Recipes

Modules solve narrow problems.

Recipes demonstrate composition.

A recipe may show how to:

- parse a length-prefixed record;
- create a stale-resistant object registry;
- normalize a checked memory range;
- construct a bounded state machine;
- plan bounded initialization;
- construct and verify an Sv39 address space.

Recipes are not automatically system proof.

They are executable demonstrations that known modules can work together under declared assumptions.

A test is evidence.

It is not magic.

A declaration is a claim.

It is not proof.

The repository should always say what has actually been demonstrated.

## Evidence and honesty

`zig-reference` should never become a museum of impressive claims.

Every status must have a meaning.

A module may be:

```text
implemented
contracted
compiler validated
smoke tested
reused
recipe tested
system proven
reviewed
stable
```

Those are not synonyms.

A module does not become trustworthy because a JSON file says so.

Validation evidence must come from executed commands tied to the source and contract that were tested.

The repository should remain comfortable saying:

```text
tested, but not formally proven
declared, but not yet checked
hosted only
freestanding assumption
future analyzer expectation
not system proven
```

Honesty is part of the architecture.

## Text first

Generated repository knowledge should remain inspectable.

The acceleration layer uses deterministic textual artifacts:

```text
JSON
JSONL
Markdown
Mermaid
DOT
Zig source
plain-text evidence
```

No hidden database is required to understand the repository.

No binary index is the sole keeper of truth.

No generated file should contain facts that cannot be traced back to canonical source contracts.

A future agent should be able to clone the repository, read it, validate it, and understand how the indexes were produced.

## Repository commands

Query before reading source:

```sh
python3 tools/query-reference.py capability "bounded binary parsing"
```

Inspect evidence-backed health:

```sh
zig build status
```

Run the complete repository pipeline:

```sh
zig build validate-repository
```

For the full command surface and operational workflow, see [`COMMANDS.md`](COMMANDS.md).

## Repository navigation

Useful questions include:

```text
Which module provides this capability?
Which module exports this symbol?
What depends on this module?
What does this module depend upon?
Which recipe composes these capabilities?
Which modules are not yet validated?
What is the correct build order?
What is the porting order?
```

The intended selection process is:

1. Search by capability or problem.
2. Open the human contract and adjacent `details.json`.
3. Verify ownership, environment, failure, and invalidation requirements.
4. Follow declared dependencies.
5. Import the existing source instead of rewriting the mechanism.
6. Run dependency tests and final integration tests.

## What every module should contain

```text
projects/<canonical-module-name>/
├── src/
│   └── <descriptive_module_name>.zig
├── README.md
├── MASTERY.md
├── DETAILS.md
├── details.json
└── port.js
```

Where appropriate, a module may also include external smoke tests, examples, fixtures, fuzz targets, benchmarks, agent-readable contracts, proof obligations, and repair cases.

Each core file has a distinct job:

- **`src/*.zig`** — implementation and internal unit tests;
- **`README.md`** — accessible introduction and motivation;
- **`MASTERY.md`** — complete human study guide;
- **`DETAILS.md`** — concise integration contract;
- **`details.json`** — exhaustive machine-readable contract;
- **`port.js`** — Zig-version migration knowledge.

A source file alone does not compound.

A discoverable, documented, testable contract does.

## Version portability

`zig-reference` currently targets Zig 0.14.0.

Every implemented module carries a human-readable, machine-readable `port.js` migration contract describing version-sensitive syntax, standard-library APIs, build definitions, dependency order, semantic risks, and validation commands.

Lower dependencies should be ported before higher modules.

Every module should remember not only how it works, but what a future port must preserve.

See the [porting guide](docs/porting/PORTING.md), [strict schema](port.schema.json), [generated index](ports.json), and [consistency checker](tools/check-port-contracts.js).

## Start here

### Find a capability

Open [`docs/catalog/MODULES.md`](docs/catalog/MODULES.md). It links every implemented module to its human and machine contracts.

### Understand the vision

- [`AGE_OF_AGENTS.md`](AGE_OF_AGENTS.md) — why solved software should become constructive memory;
- [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md) — how lower layers accelerate higher ones;
- [`PYRAMID.md`](PYRAMID.md) — the dependency and learning progression;
- [`ARCHETYPES.md`](ARCHETYPES.md) — the shared architectural vocabulary;
- [`Agents Hate Rust.md`](docs/Agents%20Hate%20Rust.md) — what it would take to become the preferred systems substrate for AI agents.

### See the roadmap

- [`docs/checklists/MASTER_MODULE_CHECKLIST.md`](docs/checklists/MASTER_MODULE_CHECKLIST.md) — the capability ledger;
- [`docs/checklists/MASTER_MODULE_CHECKLIST_PROGRESS.md`](docs/checklists/MASTER_MODULE_CHECKLIST_PROGRESS.md) — implementation progress;
- [`docs/roadmaps/HYPER_ZIG_REQUIRED_MODULES.md`](docs/roadmaps/HYPER_ZIG_REQUIRED_MODULES.md) — the path toward a composable Zig hypervisor.

## Validation

For a fresh environment, create and activate a repository-local virtual environment and install the validation dependencies before running any repository checks:

```sh
cd ~/dev/zig-reference
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r tools/requirements.txt
```

Keep the virtual environment active while running the repository commands below. This prevents missing-dependency failures such as `No module named 'jsonschema'` on a fresh clone.

Activate the repository Python environment on later sessions:

```sh
source .venv/bin/activate
```

Run the primary checks:

```sh
zig build check &&
zig build status &&
zig build smoke &&
zig build test &&
zig build recipes &&
zig build conformance &&
zig build validate-repository
```

Behavioral testing and committed validation evidence are intentionally separate.

A normal modification workflow is:

```sh
zig build test
zig build smoke
zig build recipes
zig build conformance

PYTHONDONTWRITEBYTECODE=1 \
python3 tools/record-validation.py --level all

PYTHONDONTWRITEBYTECODE=1 \
python3 tools/build-repository-index.py

zig build check-validation-evidence
zig build check
zig build status
zig build validate-repository
```

Do not weaken the gate merely to make a new module pass.

Fix the module.

## What makes a module belong here?

A module belongs when:

- it settles a recurring systems-programming problem;
- its naive implementation is easy but its durable implementation is not;
- its invariants, ownership, failure behavior, and invalidation can be explicit;
- it remains small enough to understand completely;
- it can be independently tested;
- it reduces the cost of several future modules;
- its contract makes reuse easier than reinvention.

## The rule for agents

Before adding a new primitive:

```text
search the repository
inspect neighboring modules
inspect recipes
inspect dependency edges
inspect negative cases
```

When adding something genuinely new:

```text
leave a narrow source module
declare exact dependencies
document failure behavior
add focused tests
add search terms
add a recipe when composition matters
leave a repair trail for known misuse
regenerate deterministic indexes
```

The contribution is not complete when the code works once.

It is complete when the next contributor can understand why it works and how to reuse it.

Every agent touching this repository should leave the next agent with less uncertainty than it inherited.

## What this could become

In the near term, `zig-reference` can become an unusually clear Zig systems reference.

Later, it could become:

- a canonical AI-oriented Zig construction corpus;
- a machine-readable systems-engineering library;
- a foundation for autonomous project planning;
- a catalog of known-good and known-bad low-level patterns;
- a proof-carrying module ecosystem;
- a training ground for disciplined coding agents;
- a reusable substrate for kernels, databases, compilers, embedded systems, and hypervisors.

A company might eventually instruct its internal agents:

> Before generating low-level infrastructure, synchronize the approved `zig-reference` corpus.

Now several agents working across several projects can share the same engineering memory.

They stop generating five slightly different allocators.

They stop rediscovering the same parser failures.

They stop burying architectural assumptions in temporary conversations.

Knowledge accumulates.

## The invitation

To human contributors:

Bring small, serious, reusable Zig components.

Explain their boundaries.

Test their failures.

Connect them to what already exists.

To future agents:

Please search before inventing.

Please reuse before rewriting.

Please distinguish evidence from claims.

Please leave good indexes behind.

And when you discover that the exact primitive you needed was already here, quietly tested, documented, and waiting for you...

You are allowed a small smile.

We built it for you too.

---

> **Why redo the rework? Help an agent out. Don’t make the same thing twice.**
