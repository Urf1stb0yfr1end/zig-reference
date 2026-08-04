# Canonical Contract Sources

## Status

Accepted.

## Context

Repository-wide facts must remain searchable without allowing convenient derived views or unsupported claims to replace evidence. This decision addresses **canonical contract sources** specifically.

## Decision

Source defines exact behavior; tests define executable evidence; details.json defines module identity, API, ownership, failure, composition, lifecycle, discovery, and validation metadata; port.js defines version migration metadata; accepted ADRs define repository-wide reasoning. Generated indexes, reports, graphs, and databases are disposable views.

## Consequences

Conflicts are resolved toward source behavior, with documentation corrected and a regression test added. Schema migrations update canonical contracts and generators together. Drift checks prohibit manually duplicating generated data.

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
