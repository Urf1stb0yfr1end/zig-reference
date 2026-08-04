# Fuzzing

Fuzzing targets untrusted parsers, codecs, ranges, casts, allocators, and registries where generated inputs explore state combinations. `zig build fuzz-smoke` is a bounded future CI interface, not an exhaustive campaign. Each target must define input framing, maximum size/time, deterministic seed handling where possible, invariants, crash triage, and corpus retention policy.

Never commit raw corpora, crashes, caches, coverage databases, or binaries. Preserve a minimized regression as reviewable text or an ordinary unit test. A successful bounded run records its exact limits; absence of a crash never proves total safety.
