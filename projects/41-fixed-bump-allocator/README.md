# Fixed Bump Allocator

Allocate aligned slices monotonically from a caller-owned byte region.

Select this module when bounds and ownership must remain explicit and hidden allocation is unacceptable. Do not select it when unbounded growth or implicit synchronization is required. See `DETAILS.md` for the exact integration contract and `MASTERY.md` for reasoning exercises.

The direct C representation is attractive because it is compact. Its ownership, bounds, failed-mutation, and invalidation conventions are normally informal; this Zig API makes those mechanisms visible but cannot choose caller policy or provide synchronization.

## Portability

Future Zig ports must begin with [`port.js`](port.js) and preserve the ownership, bounds, failure-atomicity, and invalidation contract before recording new compiler evidence.
