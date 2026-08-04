# Generated artifact policy

Committed generated material is limited to reviewable deterministic text: JSON indexes and graph data, Markdown reports, Mermaid, and DOT. Canonical inputs are Zig source/tests, `details.json`, `port.js`, recipe metadata, and accepted ADRs. Databases, compiler output, images, archives, fuzz artifacts, caches, and dumps are prohibited.

Deterministic JSON is the only query acceleration layer. CI compares regenerated text in memory or ordinary text files. Before finishing, agents inspect status, stat, numstat, tracked and ignored paths, and every changed file for NUL bytes—not extensions alone.
