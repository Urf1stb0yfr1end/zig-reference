# Threat modeling

High-risk contracts identify untrusted inputs, validation, integer overflow and resource-exhaustion risks, memory-safety exposure, privilege boundaries, failure containment, and security non-goals. This is mandatory for binary parsers, ELF loaders, physical-memory/page-table/hypervisor code, network and filesystem parsers, and allocators receiving untrusted sizes. Empty headings are not a threat model; source and failure tests must support claims.
