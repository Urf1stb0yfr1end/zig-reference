# ELF64 File-Header Parser Mastery

## Mental model and representation
Parse and validate one allocation-free ELF64 file header. Treat each value as proof that its documented invariants were checked. Logical state is separate from backing bytes or inline capacity.

## Invariants, ownership, borrowing, and lifetime
Inputs are copied only when scalar; slices and readers borrow their backing storage. Owned allocations require `deinit`; fixed and parser values require no cleanup. Never outlive an owner or mutate while a borrowed view is used.

## Failure, atomicity, and invalidation
Validation errors leave the externally visible cursor or collection unchanged unless a successful commit is documented. Growth invalidates buffer views; removal/reset invalidates object references; borrowed parser output lasts as long as input.

## Complexity and edge cases
Scalar operations are O(1); ordered collections and iteration are O(n). Study empty/zero capacity, exact boundaries, overflow, truncation, exhaustion, stale handles, and double release.

## Dependency contracts and adaptation points
Read `bounded-byte-reader`, `checked-integer-cast`, `validated-enum-decoder`, `checked-half-open-range`, `endian-integer-codec`, `binary-cursor-checkpoint` contracts first. Adapt capacity, endian, advancement, classification, and unknown-value policy without weakening lower guarantees.

## Exercises and readiness questions
1. Add a boundary test without private-field access.
2. Explain cleanup and every invalidated borrow.
3. Prove failed mutation is atomic.
4. Can you identify which dependency owns each checked mechanism?

## Safe modification boundaries
Keep source, unit tests, smoke tests, build registration, catalogs, dependency edges, and both contracts synchronized. Do not replace typed addresses or checked arithmetic with raw integers.
