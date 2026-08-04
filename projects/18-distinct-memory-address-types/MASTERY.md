# Mastery: Distinct Memory Address Types

## Mental model

An address is not meaningful without its translation domain. The same integer can name different locations depending on whether it is physical, host virtual, guest physical, or guest virtual.

## Invariants

- each wrapper carries exactly one address domain;
- arithmetic preserves that domain;
- overflow and underflow are explicit errors;
- crossing domains requires an explicit translation step.

## Snowball value

Later page-table, EPT, DMA, loader, and device modules can state their inputs precisely. The type checker then rejects entire classes of cross-domain wiring mistakes before runtime.

## What Zig still cannot decide

A wrapper does not prove that an address is mapped, canonical, aligned, accessible, or owned. Those guarantees belong to later modules layered above this one.
