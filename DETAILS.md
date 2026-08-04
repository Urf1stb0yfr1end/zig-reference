# Module Details Standard

Every module in `zig-reference` should contain a `DETAILS.md` that lets a reader—or a future project builder—decide quickly whether the module fits a larger design.

A module detail file must state:

1. **Purpose** — the single responsibility of the module.
2. **C pain addressed** — the recurring failure or ambiguity the module makes visible.
3. **Public surface** — constructors, operations, return values, and errors.
4. **Inputs** — borrowed values, owned values, allocators, configuration, and constraints.
5. **Outputs** — returned values, transferred ownership, borrowed views, and invalidation.
6. **Invariants** — conditions that remain true before and after every public operation.
7. **Failure behavior** — which operations fail and whether failure changes state.
8. **Dependencies** — exact lower modules reused by this module.
9. **Dependents** — larger modules expected to build on it.
10. **Adaptation notes** — hosted, freestanding, concurrent, and foreign-interface constraints.
11. **Test command** — the exact build step proving the module.
12. **Source map** — the implementation and study-document paths.

`DETAILS.md` is a selection document. `MASTERY.md` is a study document. `README.md` is the introduction.

A large project should be able to inspect module names, read their `DETAILS.md` files, select compatible components, then follow the dependency links without rediscovering the repository architecture.
