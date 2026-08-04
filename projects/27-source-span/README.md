# Source Span

A checked half-open byte range into source text. It centralizes byte offsets, exact slicing, and empty-span behavior for lexers, parsers, diagnostics, compilers, and configuration readers.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
