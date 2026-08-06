# Mastery: RISC-V Sv39 Page Table Entry

## Mental model
Treat page-table work as checked transformation over explicitly borrowed storage.

## Invariants
Never truncate, accept reserved bits, hide allocation, or execute privileged invalidation in hosted tests.

## C comparison
C masks are transparent; provider failures and rollback remain conventions unless carefully designed. Zig exposes errors but cannot choose policy or synchronization.

## Exercises
1. Trace three leaf sizes.
2. Inject provider failure.
3. Explain the Sv39x4 extension boundary.
