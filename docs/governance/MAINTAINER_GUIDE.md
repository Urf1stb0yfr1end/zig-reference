# Maintainer guide

Triage correctness and security before expansion. Check affected reverse dependents, lifecycle replacements, and canonical version changes. Require canonical edits before regeneration, review the final textual diff, run applicable validation, and reject unsupported evidence or binary artifacts.

For abandonment, identify an active owner or mark lifecycle/support status honestly. For releases, follow `RELEASE_POLICY.md`; for durable decisions, use an ADR or RFC. Security reports are minimized, handled privately where possible, and disclosed only after remediation planning. Succession includes permissions, signing authority, open vulnerabilities, and release state—never credentials in Git.
