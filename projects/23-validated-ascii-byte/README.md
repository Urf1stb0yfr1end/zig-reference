# Validated ASCII Byte

A byte value that can only contain ASCII. Validation happens once at construction, after which ASCII-specific operations can rely on the invariant.

Useful for protocol tokens, lexers, command languages, headers, identifiers, and small freestanding parsers.