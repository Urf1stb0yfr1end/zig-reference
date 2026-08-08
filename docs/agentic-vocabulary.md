# Agentic Vocabulary

This document defines the project-specific vocabulary used by `zig-reference` to describe software designed for coding agents.

These terms are not presented as universal industry standards. They are the language of this project: a compact vocabulary for measuring how easily an agent can discover, select, compose, validate, and repair software without repeatedly reconstructing knowledge that the repository already possesses.

The central question behind the vocabulary is simple:

> How much work must an agent perform to use existing software correctly?

`zig-reference` treats that question as an engineering problem.

## Cost of Correct Use

The total agent effort required to go from a requirement to a correct, validated use of an existing component.

Cost of Correct Use may include:

- bytes or tokens read;
- files inspected;
- queries executed;
- candidate components considered;
- incorrect selections;
- generated replacement code that was unnecessary;
- compile or test iterations;
- diagnostic and repair iterations;
- wall-clock time;
- human intervention.

The project does not optimize merely for the cost of finding code. It optimizes for the cost of using the right code correctly.

A large ecosystem may have enormous capability while still imposing a high Cost of Correct Use.

## Discovery Compression Ratio

The ratio between ordinary repository-discovery cost and the discovery cost when using the `zig-reference` agent interface.

Conceptually:

```text
Discovery Compression Ratio = ordinary discovery cost / agent-interface discovery cost
```

Discovery cost should be reported using concrete measurements such as bytes read, tokens consumed, files inspected, tool calls, or wall time.

Example:

```text
ordinary exploration: 72,000 tokens
agent interface:         1,800 tokens
Discovery Compression Ratio: 40x
```

The purpose is not to promise that every large project becomes tiny. The metric measures how much already-known engineering information can be compressed into a cheap decision surface.

## One-Shot Integration Rate

The percentage of integration tasks in which an agent selects the correct existing components, writes the necessary project-specific code, and passes the relevant validation gate on its first implementation attempt.

Conceptually:

```text
successful first-attempt integrations / total integration attempts
```

One-Shot Integration Rate is an empirical benchmark, not a promise that all software can be completed in one attempt.

The project aims to increase this rate by eliminating avoidable uncertainty before the first edit.

## Codex Accelerator

A repository or engineering corpus deliberately structured to reduce the amount of discovery, architectural reconstruction, reimplementation, debugging, and repair work Codex must perform before reaching a correct validated result.

A Codex Accelerator does not make the model intrinsically faster or more intelligent. It makes the engineering environment cheaper to reason about by exposing solved knowledge in forms Codex can select, compose, and verify directly.

For `zig-reference`, the long-term Codex Accelerator experience is:

```text
user request
→ query the Foundation
→ measure capability coverage
→ select canonical components
→ resolve dependency closure
→ compose what is already solved
→ implement Residual Novelty
→ validate
```

The practical ambition is that attaching the Foundation to a Codex project should reduce tokens consumed, files inspected, wrong architectural starts, repair loops, and human intervention while increasing One-Shot Integration Rate.

A Codex Accelerator claim must eventually be benchmarked against a comparable open-world run. Until measured, acceleration is a project goal rather than a guaranteed performance claim.

The cultural aspiration is simple:

> **Before starting a difficult Codex project, give the agent the Foundation.**

## Agent Navigation Cost

The amount of work required for an agent to move from a user requirement to the exact module, contract, dependency closure, and validation path needed to act.

A healthy repository should make navigation cost grow much more slowly than repository size.

## Bounded Discovery Cost

The design goal that discovering one useful component remains cheap even as the repository grows from tens to hundreds or thousands of modules.

The desired relationship is:

```text
more modules
→ more capability
→ approximately the same discovery procedure
```

rather than:

```text
more modules
→ proportionally more browsing
→ proportionally more context consumption
```

## Correct-Use Distance

The number of meaningful steps between a requirement and a validated correct integration.

For example:

```text
requirement
→ select
→ brief
→ closure
→ import
→ focused validation
```

A repository with a low Correct-Use Distance does not force the agent through unrelated documentation, source archaeology, or repeated trial-and-error.

## Integration Distance

The amount of new reasoning and project-specific code still required after the repository has supplied all reusable foundations.

The snowball goal is to reduce Integration Distance over time.

As more mechanisms become canonical modules and recipes, a future agent should spend more effort on genuinely novel policy and less on reconstructing solved infrastructure.

## Choice Entropy

The uncertainty created by multiple plausible components, APIs, patterns, or implementations for the same requirement.

Choice Entropy rises when an agent must compare many apparently valid alternatives without clear rejection criteria.

`zig-reference` attempts to reduce Choice Entropy through canonical modules, controlled capability IDs, explicit `use_when` and `do_not_use_when` rules, and deterministic selection queries.

## Canonicality Advantage

The reduction in agent work obtained when a repository clearly identifies the preferred reusable implementation for a recurring problem.

Canonicality does not mean alternatives can never exist. It means the agent is not forced to rediscover the default choice every time.

## Agent Legibility

The degree to which a repository exposes its engineering meaning in forms that a coding agent can consume directly.

Agent Legibility includes:

- stable identities;
- predictable paths;
- structured contracts;
- explicit ownership;
- explicit invalidation;
- dependency edges;
- controlled capabilities;
- diagnostics;
- repair paths;
- exact validation commands.

A repository may be highly readable to humans while still having poor Agent Legibility.

## Context Efficiency

The amount of useful engineering decision-making obtained per unit of context consumed.

A high-context-efficiency repository exposes high-value facts before long prose or source code.

The project therefore prefers progressive disclosure:

```text
query
→ compact brief
→ diagnostic or closure
→ full contract
→ source only when necessary
```

## Contract Compression

The process of projecting a large canonical contract into a much smaller representation that preserves the constraints required for safe selection and integration.

Contract Compression is successful only when the smaller representation remains decision-correct.

It may omit explanation.

It may not omit a constraint that would change whether an agent should use the component.

## Constraint-Preserving Compression

A stronger form of Contract Compression in which the compact agent representation is never more permissive, more confident, or less restrictive than the canonical contract on correctness-critical behavior.

This is the governing rule for generated agent briefs.

## Projection Loss

A failure of Contract Compression in which a correctness-critical fact disappears from the compact projection.

Example:

```text
canonical contract:
borrow invalid after reset

agent projection:
no invalidation listed
```

That is Projection Loss because the omission can change an integration decision.

## Agent Brief

The smallest deterministic representation intended to answer the ordinary questions required to use a module correctly.

A good Agent Brief should answer:

```text
What is it?
What does it solve?
When should I use it?
When should I reject it?
What does it depend on?
What does it own or borrow?
What invalidates its state?
How does it fail?
What does it export?
How do I validate it?
```

The Agent Brief exists to prevent unnecessary full-contract and source reads.

## Minimum Read Set

The smallest set of repository artifacts an agent must inspect to complete a specific task correctly.

Examples:

```text
ordinary reuse:
agent brief

repair:
diagnostic + repair fixture

module modification:
details.json + source + relevant tests

porting:
port.js + contract + affected source
```

Reducing the Minimum Read Set is a direct way to reduce Cost of Correct Use.

## Source Avoidance Rate

The percentage of ordinary reuse decisions completed correctly without opening implementation source.

A high Source Avoidance Rate is desirable for discovery and reuse because source inspection is expensive and frequently unnecessary when canonical contracts already contain the needed facts.

This metric does not discourage source inspection when modifying, auditing, or debugging implementation behavior.

## Repository Archaeology

The process of reconstructing repository knowledge manually through directory browsing, grep, source reading, test inspection, build-file inspection, and inference.

Repository Archaeology is sometimes necessary.

The goal of the agent interface is to make it exceptional rather than the default discovery method.

## Archaeology Avoidance Rate

The percentage of tasks in which an agent reaches the correct module and integration path without broad repository exploration.

This measures whether the repository's explicit knowledge system is actually replacing manual reconstruction.

## Rediscovery Tax

Agent compute spent learning something the repository already knew but failed to expose cheaply.

Examples include rediscovering:

- which implementation is canonical;
- which allocator is used;
- which error is expected;
- what a reset invalidates;
- which dependency must be initialized first;
- which command validates the component.

The long-term objective is to make the Rediscovery Tax approach zero for settled facts.

## One-Sentence Preventable

An expensive agent mistake, search, repair loop, or rediscovery episode that could have been prevented by surfacing one small, already-known fact before the decisive action was taken.

The name is deliberately literal: the preventing fact should usually be compact enough to state in one sentence, even when failing to surface it can waste large amounts of tokens, tool calls, compilation, source archaeology, or wall-clock time.

Examples include:

```text
This borrow becomes invalid after grow().
This command must use the repository-managed Python environment.
This operation mutates state before returning the error.
This component is hosted-only.
This handle is invalid after remove().
```

A One-Sentence Preventable is not merely an agent error. If the repository possessed the decisive fact and could have exposed it cheaply at the decision point, the wasted work is also an interface defect.

The desired response is therefore not only to repair the immediate task, but to preserve and surface the preventing fact through the canonical contract, Agent Brief, preflight, diagnostic, or other smallest appropriate decision surface.

One-Sentence Preventables are a concrete source of Rediscovery Tax and poor Context Efficiency. The project should drive their recurrence toward zero for settled facts.

Plural: **One-Sentence Preventables**.

## Silent-Failure Cascade

Compounding agent work caused when an important operation fails, degrades, falls back, or does not perform the requested effect while presenting a state that is easy to interpret as success.

A Silent-Failure Cascade is especially expensive for agents because later reasoning may be internally consistent while resting on a false earlier assumption.

Typical shape:

```text
important operation does not achieve requested effect
→ failure or fallback is not made decisive
→ agent assumes success
→ later changes build on false state
→ symptoms appear far from the original cause
→ debugging cost multiplies
```

The preferred design is to fail early and specifically, preserve causal state, and expose the smallest useful diagnostic or repair path. When compatibility requires a conventional outward error surface, richer internal causality may still be retained for diagnostics and validation.

## Reimplementation Tax

The work lost when an agent recreates a mechanism that already exists because the repository failed to make the existing mechanism discoverable or obviously reusable.

The Snowball Principle attacks Reimplementation Tax directly.

## Repair Locality

How narrowly a known failure can be mapped to the violated rule, relevant fixture, repair example, and focused validation command.

High Repair Locality means an agent does not need to reopen the whole subsystem when one known misuse occurs.

The desired path is:

```text
diagnostic
→ violated rule
→ repair example
→ focused validation
```

## Diagnostic Reach

The proportion of known misuse classes that can be reached through stable diagnostic identifiers and linked repair evidence.

Higher Diagnostic Reach means more failures enter a predictable repair path instead of becoming open-ended debugging sessions.

## Invariant-Guided Diagnosis

A debugging approach that classifies failures by identifying which canonical component or system invariant was violated, rather than attempting to catalog every possible error permutation independently.

The desired path is:

```text
native failure or symptom
→ component + operation
→ relevant observed state
→ violated invariant, if known
→ stable diagnostic or explicit unknown
→ repair
→ focused validation
```

Invariant-Guided Diagnosis favors a small set of strong, reusable laws over an ever-growing encyclopedia of superficially different failures. One invariant may explain many symptoms.

A diagnosis must remain evidence-honest. If the available state does not establish which invariant failed, the result remains unknown rather than guessing a cause.

## Failure State Capsule

The smallest deterministic machine-readable snapshot of failure state that preserves the facts needed to continue diagnosis or repair without replaying broad repository archaeology.

Where available, a Failure State Capsule may contain:

- component and operation;
- native error or symptom;
- relevant observed values;
- expected invariant or boundary;
- mutation/rollback status;
- stable diagnostic identity when known;
- minimum useful locations;
- focused validation or next inspection command.

A Failure State Capsule is not a raw log dump. Its purpose is to preserve the decisive state with high Context Efficiency. Unknown or unavailable facts must remain explicit rather than being synthesized.

## Repair Compression Ratio

The ratio between ordinary debugging effort and the effort required when a stable diagnostic leads directly to the relevant rule and repair.

Conceptually:

```text
ordinary repair cost / diagnostic-guided repair cost
```

This is the repair-side counterpart to Discovery Compression Ratio.

## Dependency Visibility

The degree to which direct and transitive dependencies are exposed without source inspection.

Strong Dependency Visibility lets an agent compute a dependency closure, build order, and focused validation plan without recursively exploring implementation files.

## Dependency Closure

The deterministic transitive set of repository modules required by a selected module or recipe, preferably returned in topological order.

Dependency Closure converts an architectural search problem into a query.

## Validation Closure

The smallest deterministic set of validation commands needed to verify the selected component and the foundations relevant to an integration.

Validation Closure is the testing counterpart to Dependency Closure.

## Validation Distance

The number of steps between a code change and the narrowest command that can meaningfully confirm or reject it.

Low Validation Distance accelerates agent iteration and reduces unnecessary full-repository runs during repair.

## Evidence Distance

The number of indirections between a claim and the concrete evidence supporting it.

The project prefers low Evidence Distance:

```text
claim
→ command
→ fixture/test
→ recorded result
```

Claims should not depend on vague maturity labels or undocumented human memory.

## Evidence Honesty

The rule that the repository must describe exactly what has been demonstrated and no more.

Examples:

```text
runtime-negative test
compile-fail test
future analyzer expectation
documented misuse example
```

must remain distinct.

A passing fixture must never be promoted into a stronger claim merely because it was easy to execute.

## Agent Confidence Surface

The set of repository facts that an agent may consume without additional inference because they are canonical, mechanically checked, or tied to explicit evidence.

Expanding the Agent Confidence Surface reduces speculative reasoning.

## Semantic Search Escape Rate

The percentage of discovery tasks that require falling back from structured deterministic queries to broad text or source search.

A mature agent interface should drive this rate downward for recurring systems problems.

## Structured Decision Rate

The percentage of component-selection decisions made using explicit fields such as capability, environment, effect, ownership, and rejection constraints rather than free-form source interpretation.

Structured Decision Rate measures how much selection has moved from inference into repository knowledge.

## Constraint Rejection Rate

The percentage of unsuitable candidate components eliminated before source inspection because explicit constraints identify them as incompatible.

Rejecting a wrong component cheaply can be as valuable as finding the right component quickly.

## Selection Precision

The rate at which the agent interface returns the component that ultimately survives integration and validation.

High Selection Precision reduces wrong starts and unnecessary generated replacement code.

## Agent Surface Area

The total amount of repository information exposed through the normal machine-facing interface.

The project wants a small Agent Surface Area relative to the total repository corpus while preserving decision correctness.

Thousands of modules should not require thousands of modules' worth of context for a single task.

## Knowledge Density

The amount of reusable engineering knowledge encoded per unit of agent-consumed representation.

A high-Knowledge-Density brief communicates constraints, dependencies, failure behavior, and validation with little redundant prose.

## Knowledge Reuse Yield

The amount of future implementation and reasoning avoided because one solved module, recipe, diagnostic, or proof relation was preserved in reusable form.

Knowledge Reuse Yield is the compounding return described by the Snowball Principle.

## Snowball Yield

The reduction in future work produced by adding one well-connected reusable foundation.

A module with high Snowball Yield enables several later modules, recipes, or systems to inherit its settled mechanisms and guarantees.

## Agent Foothold

Any stable piece of repository knowledge that lets a future coding agent begin from a known point instead of rediscovering the terrain.

Examples include:

- a canonical module;
- capability ID;
- dependency edge;
- Agent Brief;
- diagnostic ID;
- repair fixture;
- recipe;
- proof relation;
- focused validation command.

The repository should accumulate Agent Footholds continuously.

## Foothold Density

The number and quality of useful Agent Footholds available around a module or subsystem.

High Foothold Density means future agents have multiple precise ways to discover, understand, validate, and repair the component without broad exploration.

## Composition Readiness

The degree to which a module can be selected and combined with other modules without additional architecture archaeology.

A composition-ready module exposes its exact boundaries, dependencies, effects, ownership, invalidation, environment compatibility, and focused validation path.

## Agent-Native Canonicality

The condition in which the repository has not merely selected a preferred implementation, but has made that preference explicit in a machine-consumable form together with its constraints and rejection reasons.

This is stronger than having a popular implementation buried somewhere in the tree.

## Corpus Scaling Advantage

The condition in which repository capability grows significantly faster than the context cost of using one relevant portion of it.

The desired long-term relationship is:

```text
50 modules    → cheap selection
500 modules   → cheap selection
5,000 modules → cheap selection
```

The corpus becomes more powerful without becoming proportionally harder for an agent to navigate.

## Agent-Native Standardization

The practice of expressing recurring software knowledge through one stable set of machine-facing conventions instead of allowing every module to invent its own documentation and discovery structure.

The intended result is that learning how to interrogate one `zig-reference` module teaches an agent how to interrogate every module.

## One Corpus, One Grammar

A project principle stating that every reusable component should answer the same classes of questions through the same conceptual vocabulary.

The component implementation may vary enormously.

The grammar for discovering and reasoning about it should not.

## Correctness Before Context

A project principle stating that context reduction is valuable only when the reduced representation preserves the information needed for correct decisions.

A 500-byte brief that causes a wrong integration is worse than a 5 KiB brief that preserves the necessary constraints.

Compression serves correctness, not the reverse.

## Query Before Browse

The default agent behavior expected by `zig-reference`:

```text
query structured repository knowledge first
browse human documentation second
inspect canonical contract when deeper detail is required
inspect source when implementation knowledge is required
```

This reverses the usual assumption that source-tree exploration is the first step.

## The Agentic Snowball

The cumulative effect produced when every solved implementation also leaves behind structured discovery, dependency, diagnostic, repair, composition, and validation knowledge.

The code solves today's problem.

The Agentic Snowball reduces the cost of tomorrow's problem.

## The De Facto Test

The practical standard by which this project should judge whether it has become genuinely useful to coding agents:

> Given a choice, does an agent repeatedly choose `zig-reference` because it is the lowest-cost path to a correct validated result?

That behavior matters more than package count, slogans, or claims of language superiority.

The long-term ambition is that using the repository becomes rational simply because the Cost of Correct Use is lower.

---

# Reconstruction Vocabulary

The following terms describe the project's farther-horizon reconstruction thesis: the idea that a comparatively compact Foundation might eventually preserve enough canonical engineering knowledge for an agent to reconstruct large classes of software without depending on broad rediscovery.

These are prospective metrics and design terms. They are not claims that the present repository has already achieved these properties.

## Reconstructive Leverage

The amount and diversity of validated software that can be reconstructed from a given amount of canonical engineering knowledge.

Conceptually:

```text
Reconstructive Leverage = reconstructible validated capability / canonical foundation size
```

The numerator may eventually be measured using capability count, validated application classes, reproducible system outputs, or another explicitly defined benchmark unit.

The term captures the difference between preserving finished artifacts and preserving the reusable engineering knowledge needed to create many artifacts.

A small corpus with high Reconstructive Leverage can enable systems vastly larger and more diverse than the corpus itself.

## Foundation Density

The amount of validated reusable capability carried per unit of canonical Foundation corpus.

Conceptually:

```text
Foundation Density = validated reusable capability / canonical corpus bytes
```

Foundation Density rewards compression through reuse rather than compression through omission.

Removing contracts, tests, or safety constraints merely to make the repository smaller does not improve meaningful Foundation Density.

The desired direction is:

```text
less duplication
+ more canonical reuse
+ preserved evidence
= greater engineering consequence per byte
```

## Residual Novelty

The portion of a requested system that still requires genuinely new engineering after the Foundation has resolved everything it already knows how to implement, adapt, or compose.

Conceptually:

```text
Residual Novelty = unresolved genuinely novel requirements / total required capability
```

Residual Novelty is not a defect. Every genuinely new product needs some.

The goal is to stop settled infrastructure from masquerading as novelty merely because an agent had to rediscover it.

A mature Foundation should drive Residual Novelty toward the actual application-specific problem rather than toward zero at any cost.

## Reconstruction Coverage

The percentage of capabilities required by a target system that the Foundation can already supply through canonical implementation, reconstructible adapter, or validated composition.

Conceptually:

```text
Reconstruction Coverage = foundation-resolved required capabilities / total required capabilities
```

Example:

```text
required capability classes: 126
foundation-resolved:          115
Reconstruction Coverage:     91.3%
```

Coverage must be tied to an explicit target and capability model. It should never be presented as a universal percentage without defining the benchmark set.

## Reconstruction Depth

The number and significance of software layers the Foundation can traverse upward from its minimum bootstrap assumptions while remaining on documented, reconstructible paths.

Example progression:

```text
machine primitives
→ runtime foundations
→ toolchain
→ operating environment
→ storage + networking
→ services
→ application core
→ browser-facing application
→ distributed composed system
```

A corpus may have broad application coverage while having shallow Reconstruction Depth if it depends on large unexplained foundations below it.

Deep Reconstruction Depth means more of the stack is part of the known world.

## Bootstrap Independence

The degree to which the Foundation can reproduce its useful execution environment without relying on undocumented outside software, package registries, codebases, or engineering knowledge.

Bootstrap Independence does not imply creation from literal nothing.

Every reconstruction experiment must state its irreducible assumptions, such as:

- physical hardware;
- firmware or machine startup state;
- processor specification;
- an initial agent runtime;
- a minimal compiler or executable bootstrap mechanism.

The metric becomes meaningful only when those assumptions are explicit.

The goal is to minimize everything above them that must be imported from an unknown external world.

## Reconstructive Closure

The condition in which a subsystem has enough preserved implementation, contract, specification, dependency, adapter, recipe, repair, and validation knowledge to be reproduced without an unrecorded outside engineering dependency.

Reconstructive Closure is stronger than "the code exists."

A subsystem is not reconstructively closed if rebuilding it still requires hidden tribal knowledge, an undocumented binary artifact, or an unexplained external package.

Conceptually:

```text
implementation
+ contracts
+ dependency closure
+ necessary specifications
+ build path
+ validation closure
= candidate reconstructive closure
```

Claims of Reconstructive Closure should eventually be tested from clean, deliberately restricted environments.

## Reconstruction Escape Rate

The percentage of reconstruction tasks that force the agent outside the Foundation because a required implementation, specification, adapter, or engineering fact is missing.

Conceptually:

```text
Reconstruction Escape Rate = tasks requiring outside engineering knowledge / reconstruction tasks attempted
```

For mature, intentionally covered domains, the project wants this rate to fall.

A high escape rate identifies where the Foundation still has holes even if it contains many modules.

## Seed Sufficiency

Whether a declared Foundation snapshot, together with an explicit minimum bootstrap environment, contains enough engineering knowledge to reach a specified reconstruction milestone.

Seed Sufficiency is always milestone-relative.

Examples:

```text
Seed sufficient for bounded native CLI environment: yes/no
Seed sufficient for RISC-V guest boot: yes/no
Seed sufficient for offline HTTP service stack: yes/no
Seed sufficient for browser-facing CAD reconstruction: yes/no
```

This prevents vague claims that the corpus is simply "enough."

Enough for what must always be stated.

## Civilization Compression Ratio

A deliberately broad, partly poetic metric describing the relationship between the size or complexity of a reproducibly reconstructible software world and the size of the canonical Foundation needed to reconstruct it.

Conceptually:

```text
Civilization Compression Ratio = reconstructible software-world scale / Foundation scale
```

This metric is difficult to define rigorously because "software-world scale" is not naturally one-dimensional.

It should therefore be treated as a research framing until a defensible benchmark methodology exists.

Its purpose is to ask an important design question:

> **How small can the seed become while the world it can reproducibly grow becomes larger?**

## Reconstructive Snowball

The civilization-scale extension of the Agentic Snowball.

A reconstruction does not merely consume the Foundation. It can return newly proven capabilities, adapters, recipes, diagnostics, repairs, specifications, and composition evidence to it.

The desired cycle is:

```text
Foundation
→ reconstruct system
→ discover genuinely new reusable knowledge
→ canonicalize it
→ validate it
→ return it to Foundation
→ next reconstruction begins from a stronger seed
```

The Reconstructive Snowball is the mechanism by which a Foundation can become more capable without asking each future agent to repeat the history that produced it.

## The New World Test

A long-horizon practical test for the reconstruction thesis:

> Given only a declared Foundation snapshot, explicit bootstrap assumptions, and a capable agent, how much useful software infrastructure can be reproducibly rebuilt without outside engineering knowledge?

The goal is not to answer this with rhetoric.

The goal is to make progressively larger portions of the answer executable, benchmarked, and falsifiable.

The project's farthest horizon can therefore be summarized as:

> **Own it. Wrap it. Compose it.**
>
> **Build almost anything. Rediscover almost nothing.**
>
> **One Agent. One Foundation. A New World.**