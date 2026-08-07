# AGENTS.md

## Mission

`zig-reference` is a cumulative collection of small, definitive Zig 0.14.0 modules. Each module must be understandable by a student, reusable by a programmer, and composable by a project-building tool without reverse-engineering the repository.

The long-term goal is that large Zig systems can be assembled by discovering modules, reading their contracts, following dependencies, reusing validated implementations, and writing only project-specific orchestration.

## Zero-context agent entry

Assume every coding agent may arrive with no prior knowledge of this repository.

Run this compact deterministic bootstrap before reading catalogs or source:

```text
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
```

Then use `agent decide "TASK"`, `agent card MODULE --view select`, `agent compose
CAPABILITY ...`, and `agent card MODULE --view integrate`. Use `agent impact MODULE`
before changing a foundation and `agent diagnostic ZIGREF-*` before inventing a repair.

The repository must explain itself through predictable, conventional, machine-readable paths instead of requiring broad source archaeology. A new agent should be able to determine what exists, what to choose, what to reject, how to integrate it, what can fail, what depends on it, and how to validate the result before reading large amounts of source.

The preferred mental model is:

```text
task
→ discover
→ select or reject
→ compose existing capabilities
→ inspect the smallest useful integration contract
→ write only genuinely missing code
→ validate
→ repair through known diagnostics
```

Do not make a new agent earn basic repository knowledge by recursively reading directories. Query tools and generated indexes are the fast path; canonical contracts provide the next level of detail; source is for implementation details, debugging internals, and genuinely new work.

When extending agent tooling, prefer adding compact structured fields to existing canonical contracts and deriving indexes from them over creating more per-module files. Author only facts that cannot be derived reliably. Dependency closure, reverse dependents, build order, recipe relationships, evidence summaries, focused validation, and change impact should be generated whenever possible.

A fast-path response should be substantially smaller than the documentation it summarizes. Do not copy large README, MASTERY, DETAILS, or source passages into generated agent indexes.

## Standard vocabulary and diagnostics

Agents should not need to learn a private language or repository-specific mini-DSL before they can work here.

Use ordinary engineering terms, conventional JSON, exact Zig symbols, exact paths, exact commands, and stable identifiers. Prefer recognizable concepts such as dependency, capability, error, ownership, borrowing, invalidation, recipe, validation, diagnostic, repair, hosted, freestanding, and deterministic over clever local terminology.

Repository-recognized misuse and repair knowledge uses the stable `ZIGREF-*` diagnostic namespace. A diagnostic identifier must keep the same meaning once published. New diagnostics should be literal enough that a brand-new agent can recognize the category without reading a glossary, for example `ZIGREF-EVENT-TRACE-FULL` or `ZIGREF-TOPO-CYCLE`.

A useful diagnostic should lead directly to action. Where applicable, connect it to:

- the violated rule;
- the affected module or recipe;
- the exact fixture or evidence classification;
- the canonical repair example or repair strategy;
- the focused validation command.

Do not hide the important fact behind prose. The stable code, one-line reason, exact path, and next useful command should be easy to extract.

Do not claim the compiler rejects a misuse when it does not. Distinguish real compile failures, runtime-negative tests, future-analyzer expectations, and documented misuse examples.

## No silent failures and anti-stall rule

Problems should be visible as early and locally as practical.

Do not silently drop work, silently overwrite evidence, silently retry forever, silently substitute a fallback, or convert a failure into an apparent success. If a fallback is intentional, report that the fallback occurred and why.

Tooling, generators, validators, recipes, and long-running workflows should emit minimal deterministic status at meaningful phase boundaries. Normal success output should remain compact. Failure output should become more specific, not more verbose everywhere.

When a command can take noticeable time, print enough information for a new agent to know what is happening without enabling a separate debug framework. Prefer concise progress facts such as:

```text
phase or operation
module / recipe / file currently being processed
count or boundary discovered when useful
stable diagnostic code on recognized failure
exact reason
exact affected path
next focused command or repair path when known
```

Avoid chatty per-item logging for large scans. One phase-start marker, useful bounded progress for genuinely long work, and one phase-result marker are usually enough.

External commands, subprocesses, and retry loops should be bounded where practical. A failure should identify the command that failed and preserve its exit status. Do not mask nonzero exits merely to keep an aggregate command moving.

Generated state must fail closed on drift: stale indexes, missing references, unsupported evidence claims, inconsistent paths, and invalid contracts should be reported explicitly rather than ignored.

The purpose of debug/status output is not human decoration. It is to prevent agents from wasting context guessing whether a process is hung, what failed, or where to look next.

## Agent efficiency rule

Every reusable addition should reduce future search and reasoning cost, not merely add code.

Before adding metadata, ask whether the fact can be derived from existing canonical truth. Before adding prose, ask whether a controlled identifier, exact symbol, path, or command would answer the agent's question more cheaply. Before adding another file, ask whether the existing contract can express the fact cleanly.

The repository should make these questions cheap to answer:

- What module should I use?
- What module should I reject for this task?
- What capabilities are already solved?
- What remains genuinely missing?
- How do I import and initialize the selected module?
- Which public operation matches the action I need?
- What does the module own or borrow?
- What invalidates returned values?
- What can fail and what is the canonical response?
- Which recipes already compose these capabilities?
- What may break if I modify this shared foundation?
- Which focused command verifies the change?

The ideal project-building agent spends its reasoning budget on the unsolved portion of the requested system, not on rediscovering repository facts already known here.

## Required discovery order

Before creating or modifying a module:

1. Query first with `tools/query-reference.py` and inspect generated indexes before broad searches.
2. Read `docs/catalog/MODULES.md`.
3. Read root `docs/standards/DETAILS.md` and `details.schema.json` when contract structure matters.
4. Search existing module names, capabilities, symbols, errors, and recipes before writing new mechanisms.
5. Read candidate modules' `details.json` before source.
6. Read candidate modules' `DETAILS.md` when human explanation is needed.
7. Inspect source and tests only after the contracts identify the relevant module or when implementation internals are the actual task.
8. Follow dependency links recursively.
9. Reuse compatible modules instead of copying or recreating them.

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

1. query generated capability/module/symbol indexes;
2. compare candidate public surfaces, ownership, environment, resource profile, and failure semantics;
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
- Record direct dependencies and reverse dependents according to the current schema and generation policy.
- Record exact ownership and invalidation rules.
- Record whether the module is compiler-validated.
- Keep field order consistent with the schema for readable diffs.
- Prefer compact structured agent-facing facts over repeating prose already available elsewhere.
- Do not manually author graph facts that canonical repository tooling can derive reliably.

## Dependency graph rules

Dependencies must form a comprehensible directed graph.

- Prefer lower-numbered foundational modules as dependencies when they genuinely fit.
- Avoid cycles.
- Record exact source path, imported symbol, and reason for each canonical edge.
- Make reverse discovery available through generated indexes.
- When a dependency changes its contract, inspect affected dependents and recipes.

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

1. Decompose the request into capabilities and constraints.
2. Query repository indexes before reading source broadly.
3. Select the smallest compatible module set and explicitly reject incompatible candidates.
4. Follow dependencies recursively and inspect matching recipes.
5. Verify hosted versus freestanding assumptions.
6. Verify allocator, resource bounds, thread-safety, endian, platform, and lifetime compatibility.
7. Create the smallest useful integration map before coding.
8. Import existing modules through exact documented paths.
9. Add only missing domain logic and orchestration.
10. Run focused dependency/integration tests first, then the required aggregate validation.
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
- dependencies and dependents are discoverable;
- `docs/catalog/MODULES.md` is updated;
- compatibility and validation status are honest;
- no compatible repository module was unnecessarily recreated;
- recognized failures are visible and lead to a useful diagnostic or exact error path;
- changed tooling does not leave agents with silent long-running phases or ambiguous failure output.

## Foundation workflow

Future agents must follow this order:

1. Query first with `tools/query-reference.py`.
2. Read the smallest useful generated result rather than loading every contract.
3. Open the selected module's `details.json` when the generated view is insufficient.
4. Open `port.js` only for Zig-version work.
5. Follow generated dependency/build order.
6. Reuse compatible existing modules.
7. Edit canonical sources only: source/tests, `details.json`, `port.js`, or ADRs according to authority.
8. Regenerate committed textual views.
9. Run focused validation, then repository validation under Zig 0.14.0.
10. Record executed validation evidence honestly; never mark skipped work passed.
11. Never commit binary generated artifacts, databases, caches, executables, images, archives, or fuzz output.

An outside project must not copy a module and discard its contract. Query first,
select the exact canonical module, record its zig-reference module identity and Zig
baseline, preserve its declared environment/resource/lifetime constraints, retain a
link or copy of its `details.json`, run its focused validation commands, and look up
known `ZIGREF-*` diagnostics before creating a repair. Never silently discard an
error that the selected contract exposes.

## Command workflow

- Consult root [`COMMANDS.md`](COMMANDS.md) before inventing or guessing a command.
- Change the defining build step, CLI, or canonical metadata before changing its manual entry.
- Regenerate or validate the module-command section and run `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check`.
- Never document a command as available unless it exists, or call it verified unless it executed successfully in the reported environment.
- Never hand-edit generated indexes, duplicate modules without querying, add undeclared dependencies, bypass applicable smoke tests, ignore lifecycle replacements, or treat generated views as canonical.
- Never change the Zig 0.14.0 baseline or claim later-version compatibility without evidence.
- Never manually synchronize multiple copies of a fact, and never create SQLite or other opaque query state where transparent JSON suffices.
- Preserve nonzero exit status on failure and make recognized failures visible enough that a new agent can identify the affected phase and next useful inspection point.

## Mandatory command-manual maintenance

Every Codex run that changes the repository must leave `COMMANDS.md` current. Add every new runnable command; update changed commands, arguments, purposes, and honestly established validation/workflow information; and remove or accurately mark obsolete commands. Even when the command surface is unchanged, record material validation or workflow facts established by the run. Never document a command that does not exist or call one validated unless it executed successfully in the reported environment. Before completion run `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check`.

## Developer Minimus

Canonical serious developer-facing aggregate health, smoke, doctor, verification, validation, diagnostic, and support flows append—not replace, suppress, or rewrite—their ordinary output with a bounded handoff in this order: `LOCATIONS`, then `MINIMUS`. Tiny focused unit tests are excluded. `LOCATIONS` lists only a small set of existing, relevant canonical sources, contracts, indexes, reports, recipes, or existing logs, using durable literal `file:///absolute/path` URIs resolved from the current worktree or log destination. If a covered diagnostic already writes a `.txt` log, append the same handoff there; do not create logs merely for this rule.

A Minimus is deterministic, cheap, and at most 200 lines (normally far shorter). Derive facts from results already computed and keep key order stable. Include only useful status (`PASS`, `FAIL`, or `PARTIAL`), exact command/subsystem, important counts/boundaries, material successes or changes, actionable warnings/failures, and an exact next command or repair path; include branch, commit, Zig version, target, or environment only when useful. Never dump raw logs, repeat extensive passing output, mask a failure, change the original exit status, or rescan the repository solely to restate known facts.


For build-backed checks, `python3 tools/developer-command.py OPERATION` is the canonical outer handoff surface. Raw `zig build ...` steps are implementation commands: they preserve Zig's ordinary output but do not emit Minimus. The outer driver waits for Zig (including its Build Summary), emits exactly one handoff for the operation the developer invoked, and returns Zig's exit status. Aggregate prerequisites must use raw steps and must never emit subordinate handoffs. Direct `python3 tools/query-reference.py agent doctor` remains its own canonical surface.
