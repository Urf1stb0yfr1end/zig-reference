# Z-Ref Framework

## Status

Design doctrine and prospective framework specification.

Z-Ref is not merely a vocabulary, documentation convention, metadata file, command-line tool, or benchmark helper. It is a structured framework for making software maximally legible, efficient, diagnosable, and verifiable to coding agents and humans.

Its purpose is simple:

> Given an engineering query, Z-Ref should help an agent reach the best available correct result with the least unnecessary work, while refusing silent success, exposing uncertainty, and turning each solved problem into cheaper future work.

Alpz is intended to become the first large system designed natively around this framework.

---

# The problem Z-Ref solves

Modern coding agents are capable, but repositories force them to waste large amounts of effort reconstructing facts that already exist somewhere in the system.

A fresh agent is commonly forced to rediscover:

- where the relevant subsystem lives;
- which implementation is canonical;
- which similarly named implementation is wrong for the task;
- which dependencies matter;
- which components may safely be ignored;
- what owns a resource;
- what invalidates a reference;
- what must initialize first;
- what resource bounds exist;
- what semantics are externally required;
- what is only partially implemented;
- which validation command actually proves the requested behavior;
- whether a passing command really produced the requested artifact;
- whether a test actually ran;
- whether evidence belongs to the current source revision;
- whether a fallback silently changed the requested execution path;
- whether the repository actually knows the answer at all.

This is not merely a documentation problem.

It is a systems-engineering information problem.

Large repositories often contain the answer, but the answer is distributed through source code, build scripts, comments, tests, historical conventions, issue threads, filenames, architecture-specific variants, generated files, and tribal knowledge. The agent must reconstruct a local model before it can begin solving the new problem.

That creates **rediscovery cost**.

The repository may already contain the truth, yet every fresh agent pays for finding it again.

The result is wasted source reads, wasted context, wasted searches, wasted tool calls, wrong hypotheses, wrong architectural starts, unnecessary compilation, unnecessary testing, accidental reimplementation, regressions, and confident answers based on incomplete understanding.

The second problem is equally serious: ordinary engineering workflows often confuse *successful execution* with *successful effect*.

A command may return zero while the expected artifact is absent. A test harness may report no failures because the intended test never ran. An emulator may print the expected prefix and then hang. A stale artifact may be mistaken for a newly validated one. A tool may silently fall back to another backend. A host executable may be mistaken for the requested cross-target artifact.

In all of these cases, the tooling can appear successful while the engineering request has failed.

Z-Ref exists to make both classes of failure first-class framework concerns:

1. **Do not rediscover truth that is already known.**
2. **Do not claim success that has not been proven.**

---

# Definition

Z-Ref is a structured agent-engineering framework that represents:

- what software components are;
- what capabilities they provide;
- how components relate;
- which implementation is canonical;
- when alternatives are valid;
- what invariants must remain true;
- what ownership and lifetime rules apply;
- which bounds and rejection conditions matter;
- which external semantics are implemented;
- what is known, partial, unsupported, or unknown;
- what a change may affect;
- how a requested result should be validated;
- what evidence proves success;
- how failure should be localized and explained;
- what newly learned fact should become reusable knowledge.

Z-Ref then exposes that information through a bounded query interface so an agent can receive the smallest trustworthy task-specific view that is sufficient for correct work.

In short:

> **Z-Ref is the semantic and evidentiary interface between a software system and the agent trying to engineer it.**

---

# Z-Ref is more than a format

Z-Ref contains several related layers.

## 1. Semantic format

A consistent machine-readable representation of components, capabilities, contracts, dependencies, invariants, bounds, compatibility, validation, evidence, and uncertainty.

## 2. Shared vocabulary

A deliberately small set of stable terms used across the repository.

Examples include:

```text
component
capability
contract
invariant
provider
consumer
requires
provides
owns
borrows
invalidates
before
after
bounded-by
implements
compatible-with
subset-of
alternative
canonical
use-when
reject-when
fails-with
affected-by
validate-with
evidence
known
unknown
```

The vocabulary is not the framework itself. It is the grammar through which the framework expresses software truth consistently.

## 3. Query interface

A stable way for agents and humans to ask questions such as:

```text
Where is X?
What provides capability X?
What does X require?
Why is X canonical?
What should not be used here?
What breaks if X changes?
What Linux behavior does X implement?
What remains unsupported?
What is unknown?
What is the smallest relevant source set?
What validator proves this property?
Why did validation fail?
Has this failure happened before?
```

The eventual command interface may expose operations such as:

```text
zref find <query>
zref describe <component-or-capability>
zref provides <capability>
zref requires <component>
zref why <selection>
zref why-not <selection>
zref affected <component>
zref unknown <component-or-capability>
zref validate <target>
zref diagnose <evidence-or-failure>
```

Exact commands may evolve. Their semantic roles should remain stable.

## 4. Task projection system

The full repository may be large. A specific task usually requires only a small portion of its truth.

For query `Q`, Z-Ref should be able to construct a **Task Projection** containing only the relevant:

```text
capabilities
components
contracts
invariants
constraints
dependencies
canonical choices
rejected alternatives
known failure modes
One-Sentence Preventables
affected validation
compatibility requirements
unknowns
likely source set
```

The goal is not arbitrary compression.

The goal is the **Minimum Trustworthy Read Set**: the smallest bounded representation from which the agent can safely begin work without hiding correctness-critical facts.

If the compact projection is insufficient, Z-Ref must say so and widen the read set.

## 5. Execution discipline

Z-Ref should guide an agent from intent to validated result through a consistent workflow.

```text
QUERY
  -> INTERPRET
  -> LOCATE
  -> BOUND
  -> CONSTRAIN
  -> SELECT
  -> ACT
  -> VALIDATE
  -> VERIFY EVIDENCE
  -> DIAGNOSE IF NEEDED
  -> SNOWBALL
```

The agent should spend its intelligence solving the new problem rather than repeatedly reconstructing old ones.

## 6. Evidence system

Z-Ref distinguishes command success from engineering success.

A request is not verified merely because a process returned exit code zero.

A Z-Ref validation may require evidence such as:

```text
command completed
artifact exists
artifact belongs to current source revision
artifact hash matches recorded evidence
target architecture is correct
target environment is correct
intended test actually executed
required semantic observation occurred
no undeclared fallback occurred
timeout remained bounded
relevant regression checks passed
```

Only the declared success conditions determine whether the requested result is **VERIFIED**.

## 7. Diagnostic system

Failure should not dump the agent back into an unbounded search problem.

A useful Z-Ref failure should carry forward the best available diagnosis:

```text
request
failed stage
failed capability
expected state
observed state
likely subsystem boundary
relevant invariants
known causes
remaining unknowns
minimum diagnostic source set
next focused validator
```

The framework should localize failure as aggressively as truth allows.

## 8. Constructive memory

Every completed investigation should ask whether new reusable knowledge was discovered.

A solved failure should be able to produce some combination of:

```text
new canonical fact
new invariant
new rejection condition
new dependency edge
new compatibility statement
new One-Sentence Preventable
new validator
new diagnostic
new regression test
new evidence rule
```

The framework therefore participates directly in the Snowball Principle.

A solved problem should become part of the starting point for future problems.

---

# The central optimization rule

Z-Ref does not optimize for minimum tokens at any cost.

It does not optimize for minimum files opened at any cost.

It does not optimize for minimum wall time at any cost.

Its rule is:

> **Minimize unnecessary engineering work subject to preserving truth.**

That means minimizing:

```text
rediscovery
irrelevant context
unnecessary source reads
unnecessary searches
wrong architectural starts
unnecessary tool calls
unnecessary compilation
unnecessary broad validation
repeated known failures
redundant implementation
```

while preserving:

```text
correctness
explicit uncertainty
compatibility truth
evidence integrity
security
regression resistance
maintainability
```

A cheap wrong answer is a Z-Ref failure.

An explicit `UNKNOWN` can be a Z-Ref success.

---

# Unknown is a first-class state

Z-Ref must never manufacture certainty to preserve a compact interface.

Every important statement should be capable of representing states such as:

```text
EXACT
PARTIAL
SUBSET
UNSUPPORTED
UNKNOWN
STALE
UNVERIFIED
VERIFIED
```

If the repository does not know whether a behavior is supported, Z-Ref should expose that uncertainty rather than invite the agent to import assumptions from another system.

For example:

```text
capability: linux.mmap.shared-file-truncation-race
status: UNKNOWN

required-next-evidence:
  filesystem.truncate semantics
  mapping.file-backed invalidation contract
```

This is preferable to a confident answer assembled from partial resemblance to Linux.

---

# Semantic name integrity

Z-Ref should preserve established vocabulary when established semantics are genuinely inherited.

Linux, POSIX, ELF, musl, Alpine, and other standard terms are valuable because agents already understand them.

But familiar names become dangerous when they imply capabilities or semantics that the implementation does not provide.

Therefore a borrowed external concept should declare its relationship explicitly:

```text
EXACT
Semantics intentionally match the external contract.

SUBSET
Only the declared subset is supported.

ADAPTER
Alpz-native machinery implements the external contract.

ANALOGUE
The internal concept is similar but not compatible and should use an Alpz-native name.
```

The intended architectural rule is:

> **Familiar on the outside. Canonical on the inside.**

Alpz should understand and host Linux/Alpine-facing contracts without blindly inheriting Linux's internal historical structure.

---

# Canonicality

Z-Ref should make accidental multiplicity expensive.

When one implementation is the correct general solution, the framework should make it easy to discover and hard to accidentally rebuild.

Alternatives are allowed when there is a real reason, but the reason must be explicit.

Example:

```text
capability: memory.allocate

canonical:
  kernel_allocator

alternative:
  bootstrap_allocator
  use-when: before allocator initialization
  reject-when: normal scheduler-backed kernel execution

alternative:
  dma_allocator
  use-when: device-visible constrained allocation
```

The agent should not need archaeology merely to learn which of several similarly named files is correct.

---

# No silent success

A central Z-Ref invariant is:

> **No claimed success without evidence tied to the requested effect.**

The framework should explicitly defend against:

- exit zero with no requested artifact;
- expected output followed by a hang;
- truncated output mistaken for complete output;
- silent fallback to another backend;
- stale generated evidence;
- skipped tests presented as passes;
- wrong-architecture artifacts;
- artifacts modified after validation;
- unbounded timeout paths;
- false-positive diagnostics;
- compatibility claims inferred from installation alone.

A validation result should be reproducible, revision-bound, and inspectable.

---

# Failure should improve the next attempt

When an operation fails, the framework should ask two separate questions:

1. How do we solve this instance?
2. What reusable fact would have made this failure cheaper or impossible?

The second question prevents Z-Ref from becoming a sophisticated log viewer.

A productive failure can move through:

```text
failure
  -> causal diagnosis
  -> preventing fact
  -> canonical contract update
  -> focused validator
  -> diagnostic rule
  -> regression test
  -> future automatic surfacing
```

This is the desired compounding behavior.

---

# Z-Ref completeness

A component should not be considered fully mature merely because its source compiles.

Three completion levels should be distinguished:

## Code complete

The implementation exists and performs its intended function.

## Validation complete

The intended behavior has reproducible validation and evidence.

## Z-Ref complete

A fresh agent can correctly discover, select, reason about, modify, and validate the component without relying on undocumented tribal knowledge.

A mature foundation component should satisfy all three.

A prospective Z-Ref-complete component should answer, at minimum:

```text
What is this?
What capability does it provide?
When should it be used?
When should it not be used?
What implementation is canonical?
What alternatives exist and why?
What does it require?
What depends on it?
What does it own?
What does it borrow?
What invalidates its references?
What must happen before or after it?
What resource bounds apply?
What can fail?
What external semantics does it implement?
What is partial, unsupported, or unknown?
What might change if this component changes?
What focused validator proves the relevant behavior?
What evidence constitutes success?
```

---

# Relationship to the benchmark program

The Agentic Comparative Benchmark Program should not be treated as a collection of tests to game.

Its benchmark families describe the failure classes Z-Ref should be designed to eliminate or expose.

A mature Z-Ref system should naturally perform strongly because the framework attacks the underlying engineering costs.

## Minimum archaeology

Z-Ref should reduce time to the correct subsystem, wrong implementation choice, source bytes read, and Minimum Read Set.

## Linux versus Linux plus agent layer

The framework must prove that a smaller system designed natively around Z-Ref gains advantages that cannot be reproduced just as cheaply by placing an overlay on a historically large system.

## Rust's strongest advantages

Z-Ref does not pretend that repository semantics replace language-level safety. It should instead reduce the remaining ownership, lifetime, validation, and review burden while honestly recording where Rust prevents defects earlier.

## Agent engineering efficiency

Fresh agents should find reusable implementations, choose the correct architecture, avoid wrong starts, and complete changes with low variance.

## Context compression

Task Projections must reduce context without dropping correctness-critical truth.

## One-Sentence Preventables

Known decisive facts should surface before an agent pays to rediscover them.

## Silent-failure resistance

Validation must prove requested effects rather than trusting superficial success signals.

## Compatibility

Support claims must be explicit, tiered, and evidence-backed.

## Machine reality

Hardware, concurrency, storage, networking, and failure-pressure discoveries should flow back into contracts, diagnostics, and validators.

## Security, scale, and organizational maturity

Z-Ref must remain useful when the repository is large, the failure is emergent, the agent is adversarial, the original author is absent, or future models differ substantially from the models used to design the framework.

The mature aspiration is not that Alpz must win every benchmark.

The stronger engineering target is:

> **When two systems already possess the capability required by a task, a fresh capable coding agent should usually reach a correct validated change with substantially less rediscovery and waste on the Z-Ref-native system.**

A long-term internal ambition may be to win roughly nine out of ten representative agent-engineering comparisons where the compared systems possess equivalent relevant capabilities.

That is an aspiration to be tested, not a result to be assumed.

---

# What Z-Ref should measure

A Z-Ref-native workflow should make it possible to measure more than pass/fail.

Useful measurements include:

```text
time to locate correct subsystem
files opened
source bytes read
external searches
tool calls
wrong hypotheses
wrong architectural starts
compile attempts
test attempts
human interventions
regressions
reused code
new reusable capability
project-specific glue
Minimum Read Set
time to causal diagnosis
time to validated repair
known/unknown calibration
```

A particularly important derived concept is **Rediscovery Cost**: engineering effort spent recovering existing system truth before genuinely new problem solving can begin.

The mature Z-Ref goal is to drive Rediscovery Cost downward as the repository grows.

That is the opposite of the common large-system failure mode in which physical growth produces proportional cognitive growth.

---

# Why smallness matters

Z-Ref is not intended to hide the fact that Alpz is smaller than Linux.

Smallness is one of the experimental advantages.

A smaller codebase provides a smaller physical search space. Z-Ref should compound that advantage by also creating a smaller **effective semantic search space**.

The desired combination is:

```text
smaller implementation surface
+ one canonical implementation by default
+ stable semantic vocabulary
+ explicit dependency graph
+ explicit invariants
+ explicit rejection conditions
+ explicit compatibility mappings
+ focused validation
+ evidence-backed success
+ constructive memory
```

The result should be a system whose cognitive size grows more slowly than its physical size.

A repository may eventually contain thousands of components while agents still encounter the same small semantic grammar and bounded task-specific views.

That is a central scaling hypothesis of Z-Ref.

---

# Design laws

The following laws summarize the framework.

## 1. No rediscovery when knowledge already exists.

Known engineering truth should be cheaply queryable and automatically surfaced when relevant.

## 2. No unnecessary work when it can be ruled out.

Known rejection conditions should eliminate bad paths before implementation begins.

## 3. No claimed success without evidence.

Execution status is not sufficient proof of requested effect.

## 4. No hidden uncertainty.

Unknown, partial, stale, and unsupported states must remain explicit.

## 5. No accidental canonical ambiguity.

Multiple valid implementations require declared selection rules.

## 6. No silent semantic borrowing.

External names must not imply unsupported external behavior.

## 7. No failure without the best available explanation.

Failure output should preserve causal context and point toward the smallest useful next investigation.

## 8. No solved problem without asking what should compound.

Reusable discoveries should become contracts, validators, diagnostics, dependency knowledge, or preventables.

## 9. No compression that outruns truth.

Task projections may reduce context only while preserving the information required for correct decisions.

## 10. No agent-specific magic required.

The framework should remain useful to fresh capable agents, independent engineers, and future model families without hidden Alpz-specific prompting.

---

# End state

A mature Z-Ref-native repository should allow an unfamiliar coding agent to receive a user request and rapidly determine:

```text
what the request means
what capability it touches
where that capability is implemented
which implementation is canonical
which alternatives are invalid
which facts govern correctness
what minimum source must be read
what existing code should be reused
what may be affected
what validation is required
what evidence proves success
what remains unknown
where to look if validation fails
what reusable knowledge should be recorded afterward
```

The source code remains the implementation truth.

Z-Ref makes that truth economically accessible to engineering agents.

Its ultimate purpose is not to make agents read faster.

It is to make them **rediscover less, assume less, waste less, fail more visibly, diagnose more quickly, and leave the system easier for the next agent than they found it.**

> **Z-Ref turns existing engineering truth into a reusable interface instead of a recurring archaeology exercise.**
