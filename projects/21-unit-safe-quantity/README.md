# Unit-Safe Quantity

Creates distinct scalar types for quantities such as bytes, pages, sectors, ticks, nanoseconds, or pixels. Values with different unit tags cannot be passed interchangeably even when they share the same integer representation.

Use explicit conversion functions in higher modules whenever changing units.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
