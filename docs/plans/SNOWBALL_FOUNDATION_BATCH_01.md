# Snowball Foundation Batch 01 plan

## Selection method and overlap audit

The batch was selected after querying the generated identity, capability, dependency, reverse-dependency, symbol, endpoint, recipe, and status views and reading all 39 canonical `details.json` contracts. The existing fixed vector, ring buffer, bit set, bitmap allocator, checked alignment, checked half-open range, generational handle, and object-pool contracts were checked most closely because their names overlap candidate storage and allocation mechanisms.

| Module | Existing dependencies | Expected future dependents | Domains | Why now |
|---|---|---|---|---|
| intrusive doubly linked list | none | schedulers, caches, wait queues, device registries | kernels, runtimes, games, services | Establishes allocation-free membership and unlinking with explicit node ownership. |
| fixed free list | none | pools, slab allocators, descriptor tables, bounded registries | embedded, kernels, databases, games | Turns bounded slot reuse into deterministic constant-time allocation while retaining explicit exhaustion and double-free errors. |
| fixed bump allocator | aligned-address-and-size-helpers | parsers, boot allocators, compiler arenas, request scratch space | compilers, kernels, embedded, services | Centralizes overflow-safe aligned monotonic allocation and reset invalidation. |
| fixed-capacity priority queue | fixed-capacity-vector | schedulers, graph algorithms, simulations, event loops | runtimes, games, compilers, services | Provides deterministic bounded ordering without hidden allocation. |
| fixed-capacity topological sort | fixed-capacity-vector, fixed-capacity priority queue | build planners, initialization order, dependency resolution | build tools, compilers, kernels, package systems | Converts declared dependency edges into deterministic order and detects cycles without allocation. |

The dependency order is: existing primitives; intrusive list, fixed free list, and bump allocator; priority queue; topological sort; then the composition recipe. The first three settle ownership and storage boundaries, the heap adds coordination, and the graph algorithm consumes the ordering primitive.

## Candidates considered but not selected

- **Static deque:** rejected because the existing ring buffer already provides the central bounded FIFO mechanism; a deque should wait for a demonstrated two-ended consumer rather than duplicate storage.
- **Checked address-range arithmetic:** rejected as already covered by checked half-open ranges, distinct address types, and alignment helpers.
- **Range set / interval map:** partly covered by the physical memory region set; a future generic form needs a concrete non-physical consumer before extracting shared policy.
- **Enum set:** useful but substantially overlaps the bit set and validated flags; lower snowball value than allocation and dependency-order foundations.
- **Small string / inline byte builder:** overlaps fixed-capacity vector and byte writer; a future module should be driven by a precise formatting or sentinel contract.
- **Bounded integer parsing:** valuable parser work, but less coherent with this bounded storage and scheduling batch.
- **Cleanup / partial-construction guard:** deferred until a concrete fallible constructor family establishes the required callback and ownership contract.
- **Exact file reading:** hosted-only and lower cross-domain reach than this freestanding batch.
- **CRC/checksum:** valuable but largely independent rather than part of the selected progression.
- **Static graph adjacency as a separate module:** merged into topological sort because splitting the representation would create a shallow module without an independent consumer.
- **Open-addressed map:** high leverage but larger collision, deletion, hashing, and iterator contracts merit a dedicated subsequent batch.
- **One-time initialization:** concurrency memory ordering requires a focused atomics batch.
- **Deadline/timeout types:** should follow a canonical monotonic-clock abstraction.
- **Arena allocator backed by a general allocator:** deferred; the fixed bump allocator first settles the freestanding core without hidden allocation.

## Expected leverage, reuse, and risks

The batch conservatively unlocks several families rather than claiming exact dependent counts: bounded schedulers and event systems; compiler and build dependency planning; early-boot and request-scoped allocation; pools and slab allocators; intrusive run/wait/cache queues; and deterministic initialization planning. Existing modules reused are `aligned-address-and-size-helpers` and `fixed-capacity-vector`; the bitmap allocator was compared but not imported because its first-free scan has a deliberately different complexity contract.

Testing risks include zero-capacity generic instantiation, pointer/link corruption, double free, alignment and address overflow, failed-mutation atomicity, stable tie ordering, duplicate graph edges, and cycle detection. Unit and external named-import smoke tests will cover each boundary. A recipe will allocate intrusive nodes from the bump allocator, recycle logical slot identities through the free list, order ready work through the priority queue, and verify dependency order through topological sorting; it must demonstrate state transfer rather than mere construction.

No conformance family is proposed for this first batch. Existing suites do not define a compatible shared API, and creating adapters solely for maturity credit would be misleading. Dedicated allocator/container/graph conformance should be added only when a second independently implemented member makes a behavioral family real.

Estimated snowball value is **high**: each module settles a repeatedly error-prone bounded/freestanding mechanism, and the final graph layer directly consumes the ordering layer while the recipe proves the storage mechanisms can coordinate.
