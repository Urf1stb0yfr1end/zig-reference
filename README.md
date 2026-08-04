# Solved once, documented completely, reused forever.

## zig-reference

**A cumulative systems-programming foundation for Zig 0.14.0.**

`zig-reference` preserves recurring systems problems as small, explicit, reusable modules. Each module aims to keep its implementation, tests, human explanation, machine-readable contract, dependency paths, and validation status together so the next programmer or coding agent begins with accumulated knowledge instead of starting over.

This repository is not an alternative standard library, and it does not claim to define official Zig conventions. It is a growing collection of proposed reference forms: mechanisms that can be studied completely, tested independently, and reused as foundations for larger systems.

## The idea

Most software repeatedly pays for the same discoveries:

- where an implementation lives;
- what it accepts and returns;
- what it owns or borrows;
- how it fails;
- what it invalidates;
- which lower layers it depends on;
- how it should be tested;
- whether it was actually validated.

`zig-reference` records those answers once.

A mature module should let a human or agent follow this path:

```text
search for a capability
    ↓
open its module folder
    ↓
read the human and machine contracts
    ↓
see every input, output, endpoint, path, error, and dependency
    ↓
run its tests
    ↓
reuse it in the next layer
```

The goal is simple:

> Never spend time or tokens rediscovering a fact the repository already knows.

## The snowball principle

The repository is designed to become easier to extend as it grows.

```text
validated values
    ↓
checked ranges, addresses, flags, and codecs
    ↓
containers, allocators, readers, writers, and registries
    ↓
parsers, loaders, schedulers, protocols, and devices
    ↓
compilers, databases, operating systems, and hypervisors
```

Higher modules should reuse lower modules whenever their contracts fit. They should inherit settled guarantees and add only the behavior unique to their layer.

That is how the repository snowballs: each solved problem becomes part of the starting point for every problem above it.

Read the full principle in [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md).

## What every module should contain

```text
projects/<canonical-module-name>/
├── src/
│   └── <descriptive_module_name>.zig
├── README.md
├── MASTERY.md
├── DETAILS.md
└── details.json
```

Where present, external smoke tests, examples, fixtures, fuzz targets, and benchmarks remain inside the same module folder.

Each file has a distinct job:

- **`src/*.zig`** — the implementation and internal unit tests;
- **`README.md`** — the accessible introduction and motivation;
- **`MASTERY.md`** — the complete human study guide;
- **`DETAILS.md`** — the concise integration contract;
- **`details.json`** — the exhaustive, prettified contract showing what the machine sees.

The `details.json` contract is intended to expose the module’s exact paths, public endpoints, inputs, outputs, ownership, lifetime, errors, invalidation rules, dependencies, inherited guarantees, test commands, compatibility, and validation state. It should eliminate repeated source archaeology while remaining readable by humans.

## Current foundations

The repository currently includes foundational modules for:

- fixed and dynamic containers;
- ring buffers, stacks, and bit sets;
- bounded binary reading and owned binary writing;
- bitmap allocation and generational handles;
- explicit state transitions;
- checked casts, bounded values, nonzero values, and saturating counters;
- validated enums and bit flags;
- checked alignment, ranges, and address domains;
- sequence numbers, typed handles, unit-safe quantities, and endian codecs;
- ASCII bytes, FourCC values, semantic versions, tagged results, and source spans;
- physical page-frame and physical-address conversion.

Browse the complete capability catalog in [`MODULES.md`](MODULES.md).

## Start here

### To find a capability

Open [`MODULES.md`](MODULES.md). It links each implemented module to its human contract and machine contract.

### To understand the vision

- [`AGE_OF_AGENTS.md`](AGE_OF_AGENTS.md) — why solved software should become constructive memory;
- [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md) — how lower layers accelerate higher ones;
- [`PYRAMID.md`](PYRAMID.md) — the dependency and learning progression;
- [`ARCHETYPES.md`](ARCHETYPES.md) — the shared architectural vocabulary.

### To see the roadmap

- [`MASTER_MODULE_CHECKLIST.md`](MASTER_MODULE_CHECKLIST.md) — the complete capability ledger;
- [`MASTER_MODULE_CHECKLIST_PROGRESS.md`](MASTER_MODULE_CHECKLIST_PROGRESS.md) — implementation progress and validation state;
- [`HYPER_ZIG_REQUIRED_MODULES.md`](HYPER_ZIG_REQUIRED_MODULES.md) — the specialized path toward a composable Zig hypervisor.

## Early study path

1. [Fixed-capacity vector](projects/00-fixed-capacity-vector/README.md)
2. [Dynamic array](projects/01-dynamic-array/README.md)
3. [Ring buffer](projects/02-ring-buffer/README.md)
4. [Fixed bit set](projects/03-bit-set/README.md)
5. [Bounded byte reader](projects/04-bounded-byte-reader/README.md)
6. [Stack](projects/05-stack/README.md)
7. [Byte writer](projects/06-byte-writer/README.md)
8. [Bitmap allocator](projects/07-bitmap-allocator/README.md)
9. [Generational handles](projects/08-generational-handles/README.md)
10. [Explicit state machine](projects/09-state-machine/README.md)

After those foundations, follow the dependency links in each module’s `DETAILS.md` or `details.json` rather than relying only on numeric order.

## Validation

The repository targets **Zig 0.14.0**.

```sh
zig version
zig build check-module-contracts
zig build test
```

Additional smoke-test commands may be available as the repository-wide external-consumer test layer is completed. Consult `build.zig` and each module’s contract for the exact current commands.

Validation status must remain honest. Source existence, documentation completeness, compiler validation, unit-test success, and smoke-test success are separate claims.

## What makes a module belong here?

A module belongs when:

- it settles a recurring systems-programming problem;
- its naive implementation is easy but its durable implementation is not;
- its invariants, ownership, failure behavior, and invalidation can be made explicit;
- it remains small enough to understand completely;
- it can be independently tested;
- it reduces the cost of several future modules;
- its contract makes reuse easier than reinvention.

A source file alone does not compound.

A discoverable, documented, testable contract does.

## Where Zig distinguishes itself

These modules emphasize qualities that are easy to miss when Zig is described only as a C alternative:

- low-level representations remain visible;
- allocation is an explicit dependency;
- error behavior appears in function types;
- compile-time parameters create specialized concrete types;
- slices preserve length alongside addresses;
- precise integer types express machine constraints;
- hosted and freestanding code can share the same language;
- tests can exercise failure paths and allocation behavior directly.

The objective is not to make systems programming effortless. It is to make responsibility local, explicit, searchable, reusable, and teachable.

## Long-term direction

The long-term aim is a repository mature enough that substantial systems can be created primarily through composition.

A future agent should be able to select validated modules, follow declared dependency edges, generate the orchestration unique to the requested system, and spend most of its effort on genuinely new work.

Hyper-Zig is the flagship expression of that direction: not a hypervisor conjured from one prompt, but a hypervisor assembled from layers the repository has already solved and preserved.

## Central principles

> Solved once, documented completely, reused forever.

A reader or coding agent should not have to rediscover ownership, invariants, failure behavior, cleanup, and dependency purpose every time it opens an unfamiliar systems project.

## Contract-first maintenance

Each implemented module exposes a strict, readable `details.json` and an external named-import smoke test. The generated [`modules.json`](modules.json) manifest provides fast enumeration but is checked against those contracts rather than becoming a second source of truth.

Install the contract validator and run the independent validation layers:

```sh
python3 -m pip install -r tools/requirements.txt
python3 tools/format-module-contracts.py --check
zig build check-module-contracts
zig build smoke
zig build test
```

Use `python3 tools/format-module-contracts.py` to restore canonical two-space/schema-key formatting. Start a future contract without false validation claims with:

```sh
python3 tools/create-module-contract-template.py \
  --module-id 29 \
  --canonical-name bounded-binary-sub-reader
```

The generator refuses to overwrite an existing contract unless `--force` is passed. A generated template is schema-valid but deliberately records implementation, unit, smoke, and compiler validation as incomplete until evidence exists.
