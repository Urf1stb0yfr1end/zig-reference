# Endian Integer Codec

Encodes and decodes fixed-width integers with byte order selected explicitly in the type. It avoids host-endian casts, packed-struct assumptions, and repeated byte swapping.

Useful for binary formats, network protocols, firmware tables, device registers, and executable loaders.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
