# Bitmap Allocator

A fixed-capacity allocator for integer slots, built directly on the repository's `BitSet`.

It models allocation as one explicit invariant: a set bit means the matching slot is owned. This is the basis of page-frame allocators, descriptor pools, device slots, VM identifiers, and other systems where resources are addressed by index.

The C pain is not the bit scan itself. It is duplicated bit arithmetic, inconsistent full/empty conventions, silent double frees, invalid indices, and allocation metadata that drifts away from the resources it describes.

This module keeps the mechanism visible while centralizing those rules.

```sh
zig build test-bitmap-allocator
```
