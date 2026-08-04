# Semantic contract versioning

Five versions describe different authorities: `implementation_version` tracks behavior-preserving implementation releases; `public_contract_version` tracks consumer-visible semantics; root `schema_version` tracks `details.schema.json`; `port.js` `schemaVersion` tracks `port.schema.json`; and generated indexes expose the generator format as `repository_index_version`.

Patch releases correct implementation while preserving documented behavior, clarify documentation, add tests, or improve performance without changing guarantees. Minor releases add backward-compatible endpoints, optional capabilities, environments, or metadata. Major releases remove or rename endpoints or change ownership, borrowing, lifetime, cleanup, invalidation, failure atomicity, errors, layout, dependency contracts, or semantic guarantees.

Versions are evidence, not ceremony. A public-surface change requires review of the public contract version and dependents. Schema changes require an RFC, migration of canonical contracts and readers, regenerated views, and drift checks. Empty deprecation version fields mean “not applicable,” not “unknown success.”
