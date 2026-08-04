# Module Details Standard

Every module in `zig-reference` must contain a `DETAILS.md`. It is the standard programmer's guide and the composition contract for that module.

A reader should be able to discover a module by name, read only its `DETAILS.md`, decide whether it fits, locate its implementation, understand its inputs and outputs, follow its dependencies, and integrate it without reverse-engineering the source tree.

`DETAILS.md` is optimized for precision and navigation, but remains ordinary technical documentation for humans.

## Required sections

Every module detail file must include these headings in this order.

### Purpose
One responsibility, stated without marketing language.

### C pain addressed
The recurring C failure mode, ambiguity, duplicated mechanism, or maintenance burden the module is designed to reduce.

### Public surface
Exact public types and operations, including constructor shape, parameter types, return types, optionals, and error unions. Names must match the implementation.

### Import and location
- repository-relative implementation path;
- Zig import path used by another repository module;
- public root symbol or type name;
- test source path.

### Inputs
For every meaningful input, state:
- type;
- ownership: owned, borrowed, copied, or transferred;
- lifetime requirement;
- valid range or structural constraints;
- whether it may alias internal state.

### Outputs
For every meaningful output, state:
- type;
- ownership and lifetime;
- whether it is copied or borrowed;
- what invalidates it;
- whether the caller must release anything.

### State and invariants
List all conditions that must hold before and after every successful public operation. Identify logical state separately from physical representation where relevant.

### Failure behavior
List possible errors and optional-empty results. For each failing operation, say whether state is unchanged, partially changed, rolled back, or consumed.

### Ownership and cleanup
State exactly what the module owns, what it borrows, who supplies allocators, which operation releases resources, and whether element-level cleanup belongs to the caller or a dependent layer.

### Dependencies
For every repository dependency, provide:
- module name;
- exact source path;
- symbol used;
- reason for dependency.

Write `None` when there are no repository dependencies. Do not hide conceptual dependencies.

### Expected dependents
Name the larger modules and project classes that should reuse this component. This is the reverse dependency map used during architecture selection.

### Composition examples
Show at least one minimal Zig snippet that imports and uses the module, plus one sentence explaining how a larger component would combine it with another repository module.

### Compatibility and adaptation
State:
- target Zig version;
- hosted or freestanding suitability;
- allocator assumptions;
- thread-safety status;
- endian or platform assumptions;
- foreign-interface constraints;
- known substitutions for restricted environments.

### Complexity and limits
State important time complexity, space behavior, compile-time limits, resource limits, and scaling constraints. Avoid unsupported performance claims.

### Validation
Provide:
- exact test command;
- important test categories;
- whether compiler validation has been performed;
- any required integration or platform tests.

### Source map
List exact repository-relative paths for implementation, tests, README, MASTERY guide, examples, benchmarks, and related modules.

## Documentation roles

- `README.md`: What the module is and why it exists.
- `MASTERY.md`: How to reason about it deeply.
- `DETAILS.md`: How to select, call, compose, adapt, and validate it.
- `MODULES.md`: Fast repository-wide discovery index.

The `DETAILS.md` files are the authoritative composition map. Source code remains authoritative for exact behavior when documentation and implementation disagree.

## Composition goal

A large request should reduce to:

1. Search `MODULES.md` for candidate names.
2. Read candidate `DETAILS.md` files.
3. Follow their dependency paths recursively.
4. Select compatible inputs, outputs, ownership, and environment assumptions.
5. Import existing modules instead of recreating their mechanisms.
6. Add only the project-specific orchestration and domain logic.
7. Run every listed dependency test plus the new integration tests.

The goal is not zero reasoning. The goal is to spend reasoning on the new system rather than repeatedly rediscovering settled components.
