# Differential testing

Differential tests compare a module with a named trusted oracle over the same normalized inputs. Suitable targets include endian codecs, semantic versions, FourCC, checked arithmetic, ELF parsing, and serialization. The adapter must document normalization, oracle version, disagreement policy, undefined domains, and how false positives are triaged.

`zig build differential` runs configured targets only. Agreement does not replace the repository contract, and an empty target set grants no evidence. Store textual cases and results; do not commit oracle binaries or caches.
