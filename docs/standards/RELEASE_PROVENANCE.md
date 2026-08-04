# Release provenance

The repository does not currently define a release-producing command. A future release process must run the complete Zig 0.14.0 validation pipeline in a declared environment, record textual evidence, reproduce artifacts independently, publish checksums, inventory dependency licenses, and generate an SBOM and provenance attestation from the actual build. Release authority and tag-signing custody belong to the current maintainer until governance records additional maintainers.

Signed tags, SBOMs, attestations, checksums, and reproducibility claims must never be fabricated or pre-generated. Binary release artifacts remain derived outputs and are never repository indexes. Introducing release commands requires an RFC specifying inputs, outputs, keys, retention, failure handling, and how a reviewer reproduces every claim.
