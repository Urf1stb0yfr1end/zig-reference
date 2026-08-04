# Release policy

Only the repository owner currently authorizes releases. A release requires a reviewed version decision, clean canonical and generated drift checks, Zig 0.14.0 validation, recorded failures/skips, dependency-license review, and an approved changelog/migration account. Stable claims additionally require maturity level 9 evidence.

No release automation, signing, SBOM, or provenance command currently exists. Future mechanisms must follow `docs/standards/RELEASE_PROVENANCE.md` and an accepted RFC. Never fabricate checksums, signatures, attestations, or reproducibility.
