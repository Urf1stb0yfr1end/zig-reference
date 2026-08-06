# Bounded System Resource Plan

A hosted-only deterministic planner that turns compile-time capacity declarations and a runtime memory description into an exact, page-aligned resource budget and initialization order. It allocates nothing, renders into caller storage, and is a planning artifact—not a scheduler, runtime, or hypervisor.

Read [`DETAILS.md`](DETAILS.md) for integration, [`MASTERY.md`](MASTERY.md) for the reasoning model, and [`port.js`](port.js) before Zig-version work.
