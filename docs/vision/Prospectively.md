# Prospectively

> **This document describes the goal, not the present state.**
>
> The comparisons and token ranges below are hypotheses to be tested. `zig-reference` does not currently claim to achieve these reductions. The purpose of this document is to state the direction clearly enough that future benchmarks can prove, refine, or reject it.

## The proposition

The long-range ambition of `zig-reference` is not merely to contain more code.

It is to make increasingly large software systems cheaper for coding agents to understand, assemble, validate, and repair.

A future agent should spend as little of its context as possible rediscovering engineering decisions that the Foundation already knows.

Instead of repeatedly researching which allocator, parser, page-table model, scheduler primitive, transport abstraction, browser bridge, service pattern, storage adapter, diagnostic, or validation path to use, the agent should be able to ask the Foundation and receive a compact, deterministic answer.

The intended transformation is from this:

```text
RESEARCH       ███████████████
ARCHITECT      ██████████
IMPLEMENT      ███████████████████
DEBUG          █████████████
INTEGRATE      ███████████
```

Toward this:

```text
QUERY          █
SELECT         █
COMPOSE        ███
NOVEL CODE     █████
VALIDATE       ██
```

These bars are illustrative, not measurements.

They express the desired change in where an agent spends its effort.

The goal is not to make the agent think less about genuinely new problems. The goal is to stop charging the agent repeatedly for problems that have already been solved, documented, validated, and made composable.

## Same agent, different starting point

A useful future benchmark is deliberately simple:

```text
Same coding agent
Same task
Same internet access
Same machine
Same validation requirements
Same time and token accounting
```

The only meaningful difference is the starting foundation.

### Run A: internet-first

The agent starts with the specification and the open internet.

It must discover candidate implementations, compare approaches, infer architecture, decide which assumptions to trust, assemble dependencies, establish tests, and repair integration mistakes as they appear.

### Run B: Foundation-first

The agent starts with the same internet access, plus a mature `zig-reference` Foundation.

The Foundation can potentially provide:

- canonical capability selection;
- compact integration briefs;
- dependency closure;
- known ownership and invalidation rules;
- exact public entrypoints;
- stable diagnostics;
- canonical repairs;
- external adapters;
- cross-language recipes;
- focused validation commands;
- evidence for important claims.

The internet remains available for genuinely new information. The Foundation exists to prevent unnecessary rediscovery of settled information.

## Prospective token advantage

The following numbers are not current benchmark results. They are rough hypotheses for what a mature, high-coverage Foundation might eventually make possible.

| Project | Internet-first agent | Mature Foundation + internet | Prospective reduction |
|---|---:|---:|---:|
| Small CLI/tool | 20k-50k | 10k-25k | ~2x |
| Binary parser/codec | 40k-120k | 15k-40k | ~2-4x |
| HTTP API/service | 80k-200k | 25k-70k | ~3x |
| Desktop utility | 100k-300k | 35k-100k | ~3x |
| Browser application | 150k-450k | 40k-130k | ~3-5x |
| Real-time SaaS application | 300k-900k | 70k-220k | ~4-6x |
| Compiler/runtime | 500k-1.5M | 120k-400k | ~4-7x |
| Storage/database engine | 800k-2.5M | 180k-600k | ~4-8x |
| Browser CAD/editor | 700k-2M | 130k-400k | ~5-8x |
| Game/runtime engine | 800k-2.5M | 150k-500k | ~5-8x |
| RISC-V hypervisor | 1M-3M | 180k-600k | ~5-10x |
| Hypervisor + Alpine boot | 1.5M-5M | 250k-900k | ~5-10x |
| Small OS/kernel stack | 2M-7M | 350k-1.2M | ~5-12x |
| Large cross-stack system | 3M-10M+ | 500k-1.8M | ~5-12x+ |

These figures should be treated as targets for experimentation, not promises.

The project succeeds only when real measurements replace speculation.

## Why the advantage could grow with project size

Small programs contain relatively little reusable architecture. There is less solved knowledge to compress.

Large systems contain hundreds of recurring engineering problems.

A hypervisor may require:

```text
physical memory ownership
page-frame allocation
host page tables
guest page tables
address validation
trap handling
vCPU state
interrupts
timers
SBI
FDT
ELF loading
Linux loading
UART
VirtIO
bounded queues
handles
state machines
trace/replay
error policy
QEMU integration
Alpine integration
```

An internet-first agent may need to rediscover much of the architecture connecting those pieces.

A mature Foundation should instead be able to answer:

```text
requirement
→ canonical capability
→ canonical implementation or adapter
→ dependency closure
→ integration contract
→ diagnostics
→ validation
```

The larger the solved portion of the requested system, the more work can potentially disappear from the agent's task.

## Discovery Compression Ratio

One of the project's central prospective metrics is **Discovery Compression Ratio**.

It asks how much engineering context an agent had to consume before reaching the correct component and integration path.

Conceptually:

```text
Discovery Compression Ratio
=
ordinary discovery cost
÷
Foundation-assisted discovery cost
```

A future result might look like:

```text
ordinary repository discovery: 78,000 tokens
Foundation-assisted discovery:   1,840 tokens

Discovery Compression Ratio:     42.4x
```

That example is illustrative only.

The important goal is that discovery cost should grow much more slowly than corpus size.

Thousands of modules should not require an agent to read thousands of modules.

## Cost of Correct Use

The Foundation should optimize for **Cost of Correct Use**, not merely the number of available implementations.

A component is valuable when an agent can cheaply answer:

```text
What does this solve?
When should I use it?
When should I reject it?
What does it depend on?
What does it own?
What invalidates its outputs?
How does it fail?
How do I import it?
How do I validate it?
What do I do when it fails?
```

If those answers require reading a large source tree, the component is still expensive to use even if its implementation is excellent.

## One-Shot Integration Rate

Another prospective metric is **One-Shot Integration Rate**.

The question is simple:

> After selecting and composing canonical components, how often does the agent's first integration attempt pass the intended validation gate?

A mature Foundation should raise this rate by reducing architectural ambiguity before code generation begins.

The ambition is not magical one-shot programming.

The ambition is to remove avoidable first-attempt failures caused by rediscovery, wrong component choice, misunderstood ownership, hidden invalidation, undocumented assumptions, and inconsistent integration patterns.

## Foundation Coverage and Residual Novelty

As the corpus grows, two additional measures become useful.

**Foundation Coverage** is the fraction of a requested system's reusable capabilities already represented by canonical implementations, adapters, or compositions.

**Residual Novelty** is the portion that remains genuinely new.

A mature request might someday resolve like this:

```text
Required capabilities:         94
Canonical implementations:     81
Canonical adapters:             7
Canonical compositions:         4
Genuinely novel requirements:   2

Foundation Coverage:          97.9%
Residual Novelty:              2.1%
```

Again, this is an example of the target model, not a current result.

The deeper idea is that a task described as:

> Build a hypervisor.

might operationally become:

> Compose these known foundations and implement the two remaining project-specific policies.

That is the transformation the project seeks.

## Own it. Wrap it. Compose it.

The Foundation does not need to reimplement the entire software world.

Its doctrine is:

> **Own it. Wrap it. Compose it.**

**Own it** when a capability is foundational, reusable, and worth preserving canonically.

**Wrap it** when an external system is already the right implementation, but agents need a stable contract, adapter, failure model, and validation path for using it correctly.

**Compose it** when the requested system is already mostly represented by existing capabilities.

This lets the Foundation expand its practical reach without pretending that every dependency must be rewritten from scratch.

## The strongest possible future demonstration

The most compelling benchmark would not be a synthetic token-count exercise.

It would be a real system.

For example:

```text
Task:
Build a RISC-V hypervisor that boots Alpine.

Run A:
Agent + internet

Run B:
Same agent + internet + mature Foundation
```

Then measure:

- total tokens consumed;
- tokens before first implementation;
- files inspected;
- searches performed;
- candidate approaches considered;
- new lines generated;
- duplicated functionality created;
- compilation attempts;
- repair iterations;
- human interventions;
- time to working Alpine shell;
- final correctness;
- final validation status.

The strongest outcome would not merely be that Run B uses fewer tokens.

It would be that Run B finishes a system that Run A cannot complete within the same resource budget.

## The goal

We are **not claiming that this is currently the case**.

We are stating the goal plainly.

We want a future in which a coding agent backed by this Foundation can take on large software projects while spending dramatically less context on rediscovery, architecture search, duplicated implementation, and avoidable repair.

We want the known portion of engineering to become increasingly cheap.

We want corpus growth to increase capability without proportionally increasing cognitive burden.

We want the agent to spend its intelligence where intelligence is actually required: on the parts nobody has solved yet.

The prospective competitive advantage is therefore not simply:

> Zig code takes fewer tokens.

It is:

> **The agent has less engineering left to rediscover.**

And if the snowball works, the advantage should compound.

Every solved primitive becomes a foothold.
Every adapter becomes a bridge.
Every recipe becomes a known route.
Every diagnostic becomes remembered experience.
Every repair becomes reusable knowledge.
Every successful composition enlarges the Foundation.

The end state is aspirational, but deliberate:

>
> **One Agent. One Foundation. A New World.**
