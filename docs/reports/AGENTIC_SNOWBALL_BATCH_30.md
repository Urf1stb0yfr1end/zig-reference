# Agentic Snowball Batch 30

## Green recovery

The inherited Batch 29 checkpoint was deliberately red: Zig 0.14.0 formatting rejected `recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig`. Batch 30 applied canonical `zig fmt`; the diff is formatting-only.

After installing the declared Python environment plus Node.js and QEMU in the runner, every CI-equivalent command named by the Batch 30 request passed. The Batch 26 one-machine proof and its 17 negative mutations passed. The exact pinned static-musl artifact (`ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`) also passed through the inherited machine path, printed `batch27-static-musl`, exited zero, materialized three pages, preserved W+X=0, and rejected the identity mutation.

## BusyBox frontier

The previously measured exact BusyBox executable remains `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`, with 245 materialized pages. This recovery commit does not claim a capacity-policy repair or BusyBox execution. Therefore all three requested Morphic results remain **not passed**:

- `busybox.static true`: not passed;
- `busybox.static echo batch30`: not passed;
- `busybox.static sh -c 'echo batch30'`: not passed.

The first blocker remains the machine-adapter four-page prepared-image reservation. The measured 245 pages are not treated as a Morphic architectural constant. No BusyBox-specific loader, speculative syscall checklist, PREPARE/COMMIT weakening, or W+X exception was added.
