# port.js Migration Contracts

## Status

Accepted.

## Context

Repository-wide facts must remain searchable without allowing convenient derived views or unsupported claims to replace evidence. This decision addresses **port.js migration contracts** specifically.

## Decision

Each implemented module keeps a static CommonJS port.js contract conforming to port.schema.json. It records baseline-sensitive syntax, APIs, ordering, risks, and validation plans.

## Consequences

Port metadata stays executable by Node while remaining reviewable text; it never predicts untested compatibility.

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
