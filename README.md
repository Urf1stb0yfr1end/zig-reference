# zig-reference

**Common systems projects, uncommon clarity.**

`zig-reference` is a cumulative collection of small, complete systems-programming projects written for **Zig 0.14.0**. Each project begins with first principles, states its invariants, exposes ownership and invalidation rules, tests failure paths, and shows how low-level software can remain understandable as it becomes serious.

This is not an alternative standard library and it does not claim official Zig conventions. It is a set of proposed reference forms supported by implementations and explicit validation status.

## The larger vision

[**Age of Agents**](AGE_OF_AGENTS.md) sets out the long-term design principle: software should preserve solved problems as discoverable, composable knowledge so future systems begin from accumulated understanding rather than from nothing.

[**The Snowball Principle**](SNOWBALL_PRINCIPLE.md) states the repository's growth law: every completed lower module should reduce the implementation, search, documentation, and testing cost of several higher modules.

## Discovery and progress

- [`MODULES.md`](MODULES.md) — fast capability catalog
- [`MASTER_MODULE_CHECKLIST.md`](MASTER_MODULE_CHECKLIST.md) — complete planning ledger
- [`MASTER_MODULE_CHECKLIST_PROGRESS.md`](MASTER_MODULE_CHECKLIST_PROGRESS.md) — current completion overlay
- [`HYPER_ZIG_REQUIRED_MODULES.md`](HYPER_ZIG_REQUIRED_MODULES.md) — specialized Hyper-Zig dependency view
- [`DETAILS.md`](DETAILS.md) — human composition-contract standard
- [`details.schema.json`](details.schema.json) — machine-contract schema

## What makes a project belong here?

A project belongs when:

- students and working programmers commonly need it;
- its naive implementation is easy, but its durable implementation is not;
- it exposes a recurring systems-programming failure mode;
- Zig can make important guarantees visible without hiding the mechanism;
- it remains small enough to study completely;
- its ideas become reusable foundations for later projects.

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

Each project carries `README.md`, `MASTERY.md`, `DETAILS.md`, and `details.json` beside its implementation.

## Run the projects

```sh
zig version
zig build test
```

Individual test steps are listed in each module contract and registered in `build.zig`.

## Where Zig distinguishes itself

These projects emphasize qualities easy to miss when Zig is described only as a C alternative:

- low-level representations remain visible;
- allocation is a dependency rather than a global assumption;
- error behavior appears in function types;
- compile-time parameters produce specialized concrete types;
- slices preserve length alongside addresses;
- precise integer types express machine constraints;
- tests can exercise failure paths and allocation behavior directly;
- the same language works in hosted programs and freestanding systems.

The objective is not to make systems programming effortless. It is to make responsibility local, explicit, searchable, and teachable.

## Repository vocabulary

The shared architectural vocabulary lives in [`ARCHETYPES.md`](ARCHETYPES.md).

## Zig version

The repository targets Zig **0.14.0**. Examples should be built and tested with that release unless a module explicitly states otherwise.

## Central principle

> Freedom of mechanism. Stability of form.

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
