# Version Portability

`zig-reference` remains a Zig 0.14.0 repository. A module's static `port.js` is a migration map, not a promise of compatibility with an untested compiler. It records the source inventory, public semantics, version-sensitive builtins and standard-library APIs, build wiring, direct dependency order, risks, and validation plan that a later port must preserve.

## Reading a contract

Read `module`, `baseline`, and `sourceInventory` first; use `publicContract` and `semanticPortingRisks` as the definition of success; then inspect API inventories and `sourceMap`. `testedTargets` contains only evidence-backed runs. `untestedTargets` is deliberately explicit, and empty `knownVersionChanges` and `possibleMechanicalTransforms` mean that no future behavior has been invented.

Contracts use a restricted CommonJS form: `module.exports = ` followed by JSON and a semicolon. The checker parses only the JSON payload and never executes the file. The schema is [`port.schema.json`](../../port.schema.json), the derived index is [`ports.json`](../../ports.json), and build wiring has its own [`build-system.port.js`](../../ports/build-system.port.js).

## Dependency-ordered migration

Port every `dependencies.repository` entry marked `mustPortFirst` before its dependent. Run `node tools/portability-smoke-test.js` to prove the graph is acyclic and print a topological order. Preserve named-import module identity when changing the build graph.

## Recording a verified target

1. Use the exact released compiler and record `zig version`.
2. Read official release notes and compiler diagnostics; do not infer changes from master.
3. Add evidence to `knownVersionChanges` only for observed changes.
4. Add mechanical transforms only when the search locations and replacement are verified; require compilation and semantic review.
5. Run contract checks, dependency tests, module unit tests, and external smoke tests.
6. Append target evidence without deleting the Zig 0.14.0 baseline or earlier migration history.

## Repository-wide upgrade procedure

1. Run `node tools/check-port-contracts.js` on the unchanged baseline.
2. Generate the topological order with `node tools/portability-smoke-test.js`.
3. Port `ports/build-system.port.js` concerns and foundational modules first.
4. Port dependents in graph order, stopping on semantic drift rather than merely fixing compilation.
5. Run `zig build check-module-contracts`, `zig build check-port-contracts`, `zig build smoke`, and `zig build test` with the exact target compiler.
6. Regenerate `ports.json`, preserve historical evidence, and commit verified findings with the port.

## Tooling

- `node tools/create-port-contract.js --module projects/NN-name` creates a non-overwriting inventory template; pass `--force` explicitly to replace one.
- `node tools/format-port-contracts.js --check` checks canonical two-space formatting.
- `node tools/generate-port-index.js` derives `ports.json` from module contracts.
- `node tools/check-port-contracts.js` checks safe static syntax, identities, paths, evidence, documentation, and index consistency.

Solved code should retain its migration knowledge. Every module remembers not only how it works, but what a future port must preserve.
