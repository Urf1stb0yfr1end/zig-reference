# The Zig Reference Pyramid

`zig-reference` is cumulative. Each project introduces only a small number of new ideas, then becomes usable knowledge for the projects above it.

The repository does not begin with a server, database, or virtual machine. It begins with the smallest structure that can state and defend an invariant.

## Design rule

Every new level must answer three questions:

1. What new problem is introduced here?
2. Which lower-level ideas does the solution reuse?
3. Which higher-level projects will depend on this idea?

A project should not hide an important mechanism merely to shorten the code. The implementation must remain small enough to study, but complete enough to teach habits that survive production use.

## Pyramid

```text
                         10  compiler / virtual machine
                      09  key-value database
                   08  HTTP server and protocol state
                07  thread pool and work queues
             06  process runner and pipelines
          05  binary formats and validated parsers
       04  hash table and indexed storage
    03  ring buffer and queues
 02  dynamic array and owned growth
01  fixed-capacity vector
00  invariants, slices, errors, tests
```

## Level 01: fixed-capacity vector

The smallest complete project.

It introduces:

- a generic container;
- the relationship between length and capacity;
- initialized and uninitialized storage;
- bounds-checked insertion and removal;
- slices as views over initialized elements;
- reference invalidation rules;
- invariants stated in prose and enforced by tests.

It deliberately performs no allocation. This lets the reader understand the container before ownership and allocation failure are added.

## Level 02: dynamic array

The fixed-capacity vector becomes heap-backed and growable.

Only then do we introduce:

- allocator ownership;
- capacity growth policy;
- checked size arithmetic;
- allocation failure;
- failure-atomic mutation;
- pointer invalidation after reallocation;
- explicit destruction.

## How later projects reuse the base

- The ring buffer reuses capacity, indexing, and initialized-region reasoning.
- The hash table reuses owned storage, growth, failure atomicity, and invalidation rules.
- Parsers reuse slices, bounded indexing, explicit errors, and validated state.
- Work queues reuse ring-buffer mechanics and add synchronization.
- Databases reuse dynamic storage, parsing, checksums, and failure-atomic replacement.
- Servers reuse bounded readers, state machines, queues, and owned resources.

## Teaching standard

Every project includes:

- **What it is**
- **Why people build it**
- **The deceptively easy C version**
- **Where that version begins to decay**
- **The invariants**
- **The Zig design**
- **Failure-path tests**
- **Reference invalidation rules**
- **Exercises that extend rather than rewrite the design**

The objective is cumulative understanding: each new project should feel like the next necessary consequence of the previous one.
