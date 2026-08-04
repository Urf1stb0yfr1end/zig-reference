# JSON Indexes as Transparent Query Acceleration

## Status

Accepted.

## Context

Discovery must be fast enough for agents while remaining reviewable, reproducible, and usable without opaque local state.

## Decision

Deterministic JSON files under `generated/` are the only repository query-acceleration layer. They are derived from `details.json`, `port.js`, recipe metadata, and accepted policy. SQLite, database generators, binary indexes, and a `zig build database` step are prohibited.

## Consequences

Queries can load normalized maps without rescanning every contract. Reviewers can diff every index, and deleting the generated directory loses no canonical information.

## Alternatives considered

Scanning canonical files for each query, SQLite, and custom serialized indexes were considered.

## Alternatives rejected

Repeated scans waste work; SQLite and custom serialization introduce opaque binary state and an additional validation surface.

## Migration impact

Remove the former database generator, build step, CI check, and documentation. Regenerate JSON views when canonical inputs change.

## Validation impact

Index `--check`, command-reference checks, and repository policy checks reject drift and the reintroduction of database infrastructure.

## Agent guidance

Query committed JSON first. Improve normalized JSON structures when performance requires it; never add a database as a shortcut.
