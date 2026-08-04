# Module Catalog

Use this file for fast discovery. Open a module's `DETAILS.md` or `details.json` before integrating it.

| Module | Purpose | Repository dependencies | Typical dependents | Contract |
|---|---|---|---|---|
| `00-fixed-capacity-vector` | Inline bounded sequence without allocation | none | bootstrap state, fixed stacks, embedded tables | [`DETAILS.md`](projects/00-fixed-capacity-vector/DETAILS.md) |
| `02-dynamic-array` | Allocator-backed growable contiguous sequence | none | stack, byte writer, hash table, token storage | [`DETAILS.md`](projects/02-dynamic-array/DETAILS.md) |
| `03-ring-buffer` | Fixed-capacity FIFO with wrapped logical order | none | work queues, event buffers, serial and network queues | [`DETAILS.md`](projects/03-ring-buffer/DETAILS.md) |
| `03-bit-set` | Compact fixed-count Boolean state | none | bitmap allocators, page maps, permission sets | [`DETAILS.md`](projects/03-bit-set/DETAILS.md) |
| `04-bounded-byte-reader` | Failure-atomic bounded binary input | none | parsers, protocol decoders, executable loaders | [`DETAILS.md`](projects/04-bounded-byte-reader/DETAILS.md) |
| `05-stack` | Allocator-backed LIFO container | `02-dynamic-array` | evaluators, parsers, traversal, virtual machines | [`DETAILS.md`](projects/05-stack/DETAILS.md) |
| `06-byte-writer` | Owned binary output with explicit endianness | `02-dynamic-array` | serializers, network frames, database records | [`DETAILS.md`](projects/06-byte-writer/DETAILS.md) |
| `07-bitmap-allocator` | Fixed-capacity slot allocator | `03-bit-set` | page allocators, vector allocators, object pools | [`DETAILS.md`](projects/07-bitmap-allocator/DETAILS.md) |
| `08-generational-handles` | Fixed-capacity table rejecting stale handles | none | VM, vCPU, device, timer, entity registries | [`DETAILS.md`](projects/08-generational-handles/DETAILS.md) |
| `09-state-machine` | Compile-time transition-policy state machine | none | lifecycle controllers, protocols, devices | [`DETAILS.md`](projects/09-state-machine/DETAILS.md) |
| `10-checked-integer-cast` | Rejecting integer conversion | none | parsers, size calculations, ABI boundaries | [`DETAILS.md`](projects/10-checked-integer-cast/DETAILS.md) |
| `11-nonzero-integer` | Integer wrapper that cannot contain zero | none | IDs, divisors, counts, handles | [`DETAILS.md`](projects/11-nonzero-integer/DETAILS.md) |
| `12-bounded-integer` | Compile-time bounded scalar value | none | ports, priorities, dimensions, limits | [`DETAILS.md`](projects/12-bounded-integer/DETAILS.md) |
| `13-saturating-counter` | Counter with explicit clamping arithmetic | none | quotas, retries, telemetry, pressure tracking | [`DETAILS.md`](projects/13-saturating-counter/DETAILS.md) |
| `14-validated-enum-decoder` | Reject undeclared integer-backed enum tags | none | parsers, device registers, FFI adapters | [`DETAILS.md`](projects/14-validated-enum-decoder/DETAILS.md) |
| `15-aligned-address-and-size-helpers` | Checked power-of-two alignment arithmetic | none | page allocators, loaders, DMA, layouts | [`DETAILS.md`](projects/15-aligned-address-and-size-helpers/DETAILS.md) |
| `16-validated-bit-flags` | Typed masks that reject unknown bits | none | permissions, page entries, VMX, registers | [`DETAILS.md`](projects/16-validated-bit-flags/DETAILS.md) |
| `17-checked-half-open-range` | Overflow-safe `[start,end)` region value | none | memory maps, loaders, MMIO, storage | [`DETAILS.md`](projects/17-checked-half-open-range/DETAILS.md) |
| `18-distinct-memory-address-types` | Type-separated host, guest, physical, and virtual addresses | none | page tables, EPT, DMA, guest memory | [`DETAILS.md`](projects/18-distinct-memory-address-types/DETAILS.md) |

## Selection workflow

1. Search this table by capability or problem.
2. Open the linked human contract and adjacent `details.json`.
3. Verify ownership, environment, failure, and invalidation requirements.
4. Follow listed dependencies recursively.
5. Import existing source rather than rewriting the mechanism.
6. Run every dependency test and the final integration tests.

## Snowball rule

Every completed module should reduce the cost of several later modules. Higher layers should inherit tested guarantees from lower layers, so repository growth accelerates through composition rather than repeated implementation.

## Current status

The repository targets Zig 0.14.0. Code written through this interface has not yet been compiler-validated in the current environment; local `zig build test` remains required before treating a module as verified.
