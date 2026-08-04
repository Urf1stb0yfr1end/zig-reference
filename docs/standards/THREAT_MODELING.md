# Threat modeling

A meaningful module threat model identifies the trust boundary, untrusted inputs, validation, resource-exhaustion and integer-overflow risks, memory-safety risks, privilege boundary, failure containment, and security non-goals. It is required for binary/executable/network/filesystem parsers, physical-memory and page-table code, hypervisor boundaries, and allocators receiving attacker-controlled sizes.

Review data flow before implementation, then ensure `details.json` input and security fields match source checks. Failure atomicity and bounded resource use are explicit guarantees only when implemented and tested. Trivial modules should state that no independent threat model is warranted rather than copy ceremonial prose.
