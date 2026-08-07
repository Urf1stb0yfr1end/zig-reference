# Agentic Snowball Batch 04

## Baseline and result

The baseline was commit `287d716`, with 52 contracted modules, 37 full Agent Fast Path v2 cards, and 15 partial cards. The final projection remains 52 contracted modules and is 47 full / 5 partial under Zig 0.14.0.

## Permanent policy and Minimus design

`AGENTS.md` now makes `COMMANDS.md` maintenance mandatory for every repository-changing Codex run and requires the final command-reference drift check. It also permanently defines the Developer Minimus: serious aggregate developer checks retain ordinary output and append a bounded, deterministic `LOCATIONS` then `MINIMUS` handoff without changing exit truth.

`tools/developer-minimus.py` is a small text-only formatter. It validates requested paths, emits durable absolute `file://` URIs, optionally derives the already-generated 52/47/5 counts, and emits no logs or opaque state. The implemented surfaces are agent doctor, aggregate smoke, repository validation, Morphic plan verification, and Morphic trace verification. None writes a diagnostic text log, so no log integration was applicable.

Regression coverage proves ordinary doctor JSON precedes `LOCATIONS`, `LOCATIONS` precedes `MINIMUS`, deterministic invocations match byte-for-byte, paths exist, failure remains nonzero, and the handoff is below the 200-line ceiling.

## Grounded Batch 03 semantic audit

Generated cards were inspected before canonical contracts. Four parser-facing cards—length-prefixed binary field, TLV decoder, ELF64 file header parser, and ELF64 program header parser—contained demonstrably unrelated physical-memory/page-frame/hypervisor aliases and a 4 KiB architecture-policy statement. Those projections were removed and replaced with conservative module-specific exclusions. Physical-memory modules retained genuinely relevant page terminology, and Sv39 modules retained architecture constraints.

## Mechanical ten-module migration

The pending frontier was recomputed from the tree. Impact, dependency, and recipe information favored the foundational contiguous prefix through FourCC while leaving five isolated/lower-leverage partials. Exactly ten modules partial at Part D start were migrated: ring-buffer, stack, state-machine, nonzero-integer, saturating-counter, wrapping-sequence-number, optional-typed-handle, unit-safe-quantity, validated-ascii-byte, and fourcc-code. Their contracts now expose selection/rejection, environment/resource bounds, functional construction, operations, errors, ownership/borrowing/invalidation, deterministic behavior, gaps, minimal usage, and focused validation.

This improves the direct/transitive closures discoverable from the generated graph, including bounded container/state foundations and typed scalar/value foundations used by future composition. No unsupported recipe or Morphic feature was invented. Representative cards are compact generated projections and ordinary integration should require no source inspection where canonical contract truth is complete.

## Acceptance and remaining frontier

The final partial frontier is semantic-version, tagged-result, source-span, owned-byte-buffer, and intrusive-doubly-linked-list. Batch 05 should finish those five before beginning a broader Morphic/agent benchmark phase, so the benchmark starts with a complete current contract frontier.

Index generation was run twice with no second-pass difference. Validation results are recorded only for commands actually executed in this run; full gate output and exit status remain the authoritative evidence. Root policy remains strict, both flagship vision files remain at repository root, and no binary/opaque artifacts are introduced.
