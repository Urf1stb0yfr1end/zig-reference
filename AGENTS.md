# AGENTS.md

## Mission

`zig-reference` is a cumulative collection of small, definitive Zig 0.14.0 modules. Each module must be understandable by a student, reusable by a programmer, and composable by a project-building tool without reverse-engineering the repository.

The long-term goal is that large Zig systems can be assembled by discovering modules, reading their contracts, following dependencies, reusing validated implementations, and writing only project-specific orchestration.

## Required discovery order

Before creating or modifying a module:

1. Read `docs/catalog/MODULES.md`.
2. Read root `docs/standards/DETAILS.md` and `details.schema.json`.
3. Search existing module names and purposes before writing new mechanisms.
4. Read candidate modules' `details.json` first.
5. Read candidate modules' `DETAILS.md` for human explanation.
6. Inspect source and tests only after the contracts identify the relevant module.
7. Follow dependency links recursively.
8. Reuse compatible modules instead of copying or recreating them.

## Required module files

Every module directory must contain:

- `README.md` — what the module is and why it exists;
- `MASTERY.md` — mental model, invariants, reasoning, and exercises;
- `DETAILS.md` — human-readable integration contract;
- `details.json` — exhaustive machine-readable integration contract;
- `src/*.zig` — implementation and tests.

Optional files include examples, benchmarks, fixtures, fuzz tests, and platform integration tests.

A module is incomplete when any required file is missing.

## Source of truth

- Zig source is authoritative for exact behavior.
- `details.json` is authoritative for machine discovery and composition metadata.
- `DETAILS.md` is the human-readable integration contract.
- `MASTERY.md` is the human reasoning guide.
- `docs/catalog/MODULES.md` is the repository discovery index.

When source and documentation disagree, fix the documentation and add a regression test. Never silently preserve drift.

## Module design standard

Each module must:

- have one clear primary responsibility;
- introduce the smallest useful new mechanism;
- reuse lower modules when their guarantees fit;
- expose ownership, borrowing, cleanup, invalidation, bounds, errors, and state transitions explicitly;
- keep failed mutations unchanged or document exact partial effects;
- avoid hidden allocation and hidden global state;
- avoid unsupported performance claims;
- remain small enough to study completely;
- include success, boundary, empty, full, overflow, and failure-path tests where relevant;
- state hosted, freestanding, concurrency, endianness, and platform assumptions;
- target Zig 0.14.0 unless the repository version policy changes explicitly.

## C comparison standard

Every module must identify the real C pain it addresses without caricaturing C. Explain:

- why the direct C version is attractive;
- which conventions remain informal;
- where growth, failure, ownership, aliasing, arithmetic, state, cleanup, or concurrency become difficult;
- which guarantees Zig makes visible;
- what Zig still cannot decide for the programmer.

Do not use vague claims such as "safer" or "better" without naming the mechanism.

## Reuse rules

Before implementing a container, parser helper, byte primitive, allocator helper, state tracker, queue, writer, reader, or handle system:

1. grep `docs/catalog/MODULES.md` and all `details.json` files;
2. compare public surfaces, ownership, environment, and failure semantics;
3. import the existing module when compatible;
4. wrap or adapt it only when the new environment requires different guarantees;
5. document every dependency using exact repository paths and symbols;
6. do not fork an implementation merely for naming preference.

If an existing module is close but insufficient, improve the lower module when the improvement is generally useful. Otherwise build a thin higher-level adapter.

## `details.json` rules

Every `details.json` must validate conceptually against `details.schema.json` and retain every top-level field.

- Do not omit unknown fields.
- Use empty strings, empty arrays, empty objects, or `null` where the schema permits.
- Never invent validation status, benchmarks, portability, or safety guarantees.
- Public symbols, paths, errors, commands, and dependencies must match the repository.
- Record direct dependencies and reverse dependents.
- Record exact ownership and invalidation rules.
- Record whether the module is compiler-validated.
- Keep field order consistent with the schema for readable diffs.

## Dependency graph rules

Dependencies must form a comprehensible directed graph.

- Prefer lower-numbered foundational modules as dependencies.
- Avoid cycles.
- Record exact source path, imported symbol, and reason for each edge.
- Record expected dependents so reverse discovery is possible.
- When a dependency changes its contract, inspect all declared dependents.

## Build integration

Every module must have an individual root build step and participate in `zig build test`.

Use descriptive names such as:

```text
test-fixed-vector
test-dynamic-array
test-ring-buffer
```

Do not claim a module is validated until its command has run successfully with the target Zig version. If the current environment lacks Zig, record validation as unverified.

## Large-project composition workflow

For a request such as a hypervisor, database, server, compiler, or filesystem:

1. Decompose the request into capabilities.
2. Search `docs/catalog/MODULES.md` and `details.json` files by capability, input, output, environment, and expected dependents.
3. Select the smallest compatible module set.
4. Follow dependencies recursively.
5. Verify hosted versus freestanding assumptions.
6. Verify allocator, thread-safety, endian, platform, and lifetime compatibility.
7. Create an integration map before coding.
8. Import existing modules through exact documented paths.
9. Add only missing domain logic and orchestration.
10. Run every dependency test and new integration tests.
11. Update catalog and contracts when new reusable modules emerge.

Do not promise that large systems require no reasoning or can always be completed instantly. The repository reduces rediscovery and duplication; it does not remove hardware, protocol, architecture, and integration complexity.

## Naming and numbering

- Use a stable numeric prefix and descriptive kebab-case directory name.
- Never reuse a numeric prefix.
- Keep directory paths, `docs/catalog/MODULES.md`, build paths, `DETAILS.md`, and `details.json` synchronized.
- Detect and repair numbering drift before adding new modules.

## Completion checklist

A module is complete only when:

- implementation exists;
- tests cover core guarantees and failure paths;
- root build steps exist;
- `README.md`, `MASTERY.md`, `DETAILS.md`, and `details.json` exist;
- paths and symbols match source;
- dependencies and dependents are recorded;
- `docs/catalog/MODULES.md` is updated;
- compatibility and validation status are honest;
- no compatible repository module was unnecessarily recreated.

## Foundation workflow

Future agents must follow this order:

1. Query first with `tools/query-reference.py`.
2. Read generated identity in `generated/modules.json`.
3. Open the selected module's `details.json`.
4. Open `port.js` only for Zig-version work.
5. Follow generated dependency/build order.
6. Reuse compatible existing modules.
7. Edit canonical sources only: source/tests, `details.json`, `port.js`, or ADRs according to authority.
8. Regenerate committed textual views.
9. Run repository validation under Zig 0.14.0.
10. Record executed validation evidence honestly; never mark skipped work passed.
11. Never commit binary generated artifacts, databases, caches, executables, images, archives, or fuzz output.
