# Validated ASCII Byte

A byte value that can only contain ASCII. Validation happens once at construction, after which ASCII-specific operations can rely on the invariant.

Useful for protocol tokens, lexers, command languages, headers, identifiers, and small freestanding parsers.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
