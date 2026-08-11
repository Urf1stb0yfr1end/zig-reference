# Generated artifact policy

Committed generated material is limited to reviewable deterministic text: JSON indexes and graph data, Markdown reports, Mermaid, and DOT. Canonical inputs are Zig source/tests, `details.json`, `port.js`, recipe metadata, and accepted ADRs. Databases, compiler output, generated images, archives, fuzz artifacts, caches, and dumps are prohibited.

A small exact allowlist of curated, human-authored project branding under `Images/` may be tracked as ordinary repository assets. Those files are not generated evidence, indexes, caches, or query acceleration, and their presence does not authorize arbitrary binary additions elsewhere. `tools/check-repository-policy.py` is the executable authority for that exact allowlist.

Deterministic JSON is the only query acceleration layer. CI compares regenerated text in memory or ordinary text files. Before finishing, agents inspect status, stat, numstat, tracked and ignored paths, and every changed file for NUL bytes, except that exact intentionally binary branding allowlist—not extensions alone.
