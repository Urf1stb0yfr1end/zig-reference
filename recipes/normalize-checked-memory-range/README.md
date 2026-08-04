# normalize-checked-memory-range

This composition uses `checked-half-open-range`, `aligned-address-and-size-helpers` through public named-module boundaries. The real adapter and behavioral tests live in [`src/recipe.zig`](src/recipe.zig); `zig build test-recipe-normalize-checked-memory-range` runs this recipe alone and `zig build recipes` runs every recipe.

## Evidence boundary

The adapter preserves only guarantees stated by its dependency contracts. Its source and build wiring were statically inspected during the zero-binary foundation task, but no Zig compiler or recipe test was executed. It therefore remains implemented-unverified and grants no system-proven maturity until textual validation evidence records a successful Zig 0.14.0 run.
