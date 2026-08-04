# parse-length-prefixed-record

This initial composition recipe selects `bounded-byte-reader, binary-cursor-checkpoint, bounded-binary-sub-reader, length-prefixed-binary-field` through their public named-module boundaries. `zig build recipes` executes the selected modules’ real behavioral tests, including their existing boundary and failure paths. This foundation does **not** yet claim a dedicated cross-module adapter or system-proven maturity; that gap is recorded in `recipe.json`.

## Inherited guarantees

Each selected module contributes only the ownership, failure atomicity, bounds, and validation guarantees stated in its canonical `details.json`. No stronger guarantee is inferred by adjacency.
