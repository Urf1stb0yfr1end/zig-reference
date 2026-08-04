# Bitmap Allocator

A fixed-capacity allocator for integer slots, built directly on the repository's `BitSet`.

It models allocation as one explicit invariant: a set bit means the matching slot is owned. This is the basis of page-frame allocators, descriptor pools, device slots, VM identifiers, and other systems where resources are addressed by index.

The C pain is not the bit scan itself. It is duplicated bit arithmetic, inconsistent full/empty conventions, silent double frees, invalid indices, and allocation metadata that drifts away from the resources it describes.

This module keeps the mechanism visible while centralizing those rules.

```sh
zig build test-bitmap-allocator
```

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
