# Generated artifact policy

Committed generated material is limited to reviewable deterministic text: JSON indexes and graph data, Markdown reports, Mermaid, and DOT. Canonical inputs are Zig source/tests, `details.json`, `port.js`, and accepted ADRs. SQLite is local acceleration only and defaults to `zig-cache/generated/zig-reference.sqlite`; databases, compiler output, images, archives, fuzz artifacts, caches, and dumps are ignored.

CI validates a binary generator by creating a database in a temporary directory, inspecting normalized table counts and identifiers against canonical JSON, and deleting the temporary directory. The checker never requires a database in Git. Before finishing, agents inspect status, stat, numstat, tracked paths, ignored output, and every changed file for NUL bytes—not extensions alone.
