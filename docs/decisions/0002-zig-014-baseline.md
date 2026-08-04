# Zig 0.14.0 Baseline

## Status

Accepted.

## Context

Repository-wide facts must remain searchable without allowing convenient derived views or unsupported claims to replace evidence. This decision addresses **zig 0.14.0 baseline** specifically.

## Decision

All implementation, build, test, and validation work uses exactly Zig 0.14.0. Port contracts may describe later migration without asserting compatibility.

## Consequences

One compiler baseline keeps evidence comparable; newer Zig syntax cannot enter canonical source until a separate baseline decision.

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
