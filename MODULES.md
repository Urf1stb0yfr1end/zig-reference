# Module Catalog

Use this file for fast discovery. Open a module's `DETAILS.md` before integrating it.

| Module | Purpose | Repository dependencies | Typical dependents | Contract |
|---|---|---|---|---|
| `00-fixed-capacity-vector` | Inline bounded sequence without allocation | none | bootstrap state, fixed stacks, embedded tables | [`DETAILS.md`](projects/00-fixed-capacity-vector/DETAILS.md) |
| `02-dynamic-array` | Allocator-backed growable contiguous sequence | none | stack, byte writer, hash table, token storage | [`DETAILS.md`](projects/02-dynamic-array/DETAILS.md) |
| `03-ring-buffer` | Fixed-capacity FIFO with wrapped logical order | none | work queues, event buffers, serial and network queues | [`DETAILS.md`](projects/03-ring-buffer/DETAILS.md) |
| `03-bit-set` | Compact fixed-count Boolean state | none | bitmap allocators, page maps, permission sets | [`DETAILS.md`](projects/03-bit-set/DETAILS.md) |
| `04-bounded-byte-reader` | Failure-atomic bounded binary input | none | parsers, protocol decoders, executable loaders | [`DETAILS.md`](projects/04-bounded-byte-reader/DETAILS.md) |
| `05-stack` | Allocator-backed LIFO container | `02-dynamic-array` | evaluators, parsers, traversal, virtual machines | [`DETAILS.md`](projects/05-stack/DETAILS.md) |
| `06-byte-writer` | Owned binary output with explicit endianness | `02-dynamic-array` | serializers, network frames, database records | [`DETAILS.md`](projects/06-byte-writer/DETAILS.md) |

## Selection workflow

1. Search this table by capability.
2. Open the linked contract.
3. Verify ownership, environment, failure, and invalidation requirements.
4. Follow listed dependencies.
5. Import the existing source rather than rewriting the mechanism.
6. Run the contract's test command before integration.

## Current status

The repository targets Zig 0.14.0. Code written through this interface has not yet been compiler-validated in the current environment; local `zig build test` remains required before treating a module as verified.
