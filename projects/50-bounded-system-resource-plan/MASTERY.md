# Mastery

## Mental model

`Planner(configuration)` makes capacity choices part of a concrete Zig type. `plan` validates runtime totals and graph edges, derives bytes from the actual record types, page-aligns every reservation, and returns an immutable value.

## Invariants

All capacities are positive, pages are power-of-two aligned, all arithmetic is checked, graph nodes are in range and acyclic, and required memory never exceeds declared memory. Failed construction returns no partial plan.

## Why this snowballs

Alignment, checked casts, bounded values, monotonic layout, bounded graph storage, stable priority ordering, and topological sorting are imported. The new code only connects capacities to resource records and budget categories.

## Exercises

Add an acyclic edge without changing the stable order; test a memory declaration exactly equal to `required_memory`; explain why post-seal policy is data rather than enforcement.
