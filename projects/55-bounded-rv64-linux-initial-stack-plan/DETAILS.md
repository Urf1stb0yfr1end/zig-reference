# Integration Contract

Import `bounded-rv64-linux-initial-stack-plan`. Call `plan(byte_capacity, argv_capacity, env_capacity, aux_capacity, stack_range, argv, envp, auxv)`.

The returned `StackPlan` owns inline bytes corresponding exactly to `[initial_sp, stack_range.end)`. At the 16-byte-aligned `initial_sp`, little-endian 64-bit words encode `argc`, argv pointers, zero, envp pointers, zero, ordered auxv pairs, and an internally appended `(AT_NULL, 0)`. Zero padding follows, then strings packed in argv order followed by envp order. Every string receives exactly one NUL byte and every pointer names its first byte.

`argv` must be nonempty. Strings may be empty but cannot contain NUL. `envp` may be empty. Caller auxv keys must be nonzero and unique. Values may be immediate or symbolically name an argv/env string. All capacities, arithmetic, stack containment, and symbolic indices are checked before a plan escapes. No cleanup is required; `bytes()` borrows from the plan and is invalidated when it is moved, mutated, or destroyed.
