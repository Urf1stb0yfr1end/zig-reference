# write-and-read-explicit-endian-record

This composition uses `byte-writer`, `bounded-byte-reader`, `endian-integer-codec` through public named-module boundaries. The real adapter and behavioral tests live in [`src/recipe.zig`](src/recipe.zig); `zig build test-recipe-write-and-read-explicit-endian-record` runs this recipe alone and `zig build recipes` runs every recipe.

## Evidence boundary

The adapter preserves only guarantees stated by its dependency contracts. Its source and build wiring were statically inspected during the zero-binary foundation task, but no Zig compiler or recipe test was executed. It therefore remains implemented-unverified and grants no system-proven maturity until textual validation evidence records a successful Zig 0.14.0 run.
