# Generated SQLite Is Not Canonical

## Status

Accepted.

## Context

Repository-wide facts must remain searchable without allowing convenient derived views or unsupported claims to replace evidence. This decision addresses **generated sqlite is not canonical** specifically.

## Decision

SQLite is an optional local query accelerator generated under ignored cache paths. CI builds a temporary database, checks schema identifiers and counts against committed JSON, then discards it.

## Consequences

No database enters review or becomes required for discovery; rebuilding is always possible from text.

## Alternatives considered

A manually maintained parallel document, inference from source on every use, and an untracked convention were considered.

## Alternatives rejected

Manual duplication drifts; repeated inference wastes review effort; an informal convention cannot be validated automatically.

## Migration impact

Existing material is migrated by correcting canonical inputs first, regenerating textual views, and removing stale or binary derived artifacts. No behavior is claimed migrated until its prescribed validation runs.

## Validation impact

Repository checks validate required structure, deterministic regeneration, dependency consistency, and evidence boundaries applicable to this decision.

## Agent guidance

Query first, inspect canonical contracts, edit only the appropriate authority, regenerate derived text, run checks, and report unexecuted validation as unverified. Never commit a generated binary.
