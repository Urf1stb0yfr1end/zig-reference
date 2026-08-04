# FourCC Code

Represents an exact four-byte identifier without compiler-dependent multi-character constants or host-endian assumptions.

Useful for RIFF chunks, media containers, firmware signatures, binary protocols, and file-format dispatch.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
