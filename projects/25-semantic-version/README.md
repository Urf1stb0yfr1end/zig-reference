# Semantic Version

A structured `major.minor.patch` value with explicit ordering and a simple same-major compatibility rule.

Useful for file formats, module contracts, protocols, migrations, plugins, and negotiated capabilities.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
