# Security policy

Report vulnerabilities through GitHub private vulnerability reporting when enabled; otherwise open a minimal issue requesting private contact without exploit details. Do not commit secrets, exploit payloads, dumps, databases, images, or build artifacts. The maintained baseline is Zig 0.14.0; later versions are unsupported until verified.

The owner triages affected modules, trust boundaries, dependents, containment, and disclosure without promising an unavailable response SLA. Fixes require regression coverage and honest evidence. Public contracts must not claim security from type shape or test presence alone. See `docs/standards/THREAT_MODELING.md` for module requirements.
