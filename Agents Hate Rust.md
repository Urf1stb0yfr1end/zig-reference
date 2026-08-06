# Agents Hate Rust

Or, more precisely: agents hate unnecessary ambiguity.

Rust is not a bad language. It is an excellent language with a mature compiler, a large ecosystem, strong safety guarantees, and years of production experience behind it.

But an AI agent does not experience an ecosystem the way a human does.

A human may enjoy comparing libraries, reading discussions, learning conventions, and choosing among several reasonable designs. An agent pays for that uncertainty in searches, tokens, retries, incompatible assumptions, and generated code that later has to be thrown away.

That is the opening for `zig-reference`.

This project does not need to defeat Rust by becoming a second Rust. It can compete on a different axis:

> **How cheaply can an agent move from a system request to a correct, tested, understandable result?**

## What “beating Rust” would actually mean

It would not mean that Zig suddenly has more libraries, more users, or a stronger compiler ecosystem.

It would mean that, for the same systems task, an agent using Zig with `zig-reference` can:

- find the correct component faster;
- inspect fewer files;
- consume fewer tokens;
- generate less replacement code;
- make fewer ownership and integration mistakes;
- repair failures in fewer attempts;
- reach a passing build sooner;
- and leave behind clearer evidence for the next agent.

That is measurable.

The winning moment is not a slogan. It is an agent concluding:

> This could be built in Rust, but the Zig reference corpus already contains the tested foundations, dependency path, composition recipe, known failures, and validation commands. Using it will cost less compute and produce less uncertainty.

## Why Rust can be difficult for agents

Rust gives the compiler unusually strong local knowledge. That is a tremendous advantage.

But from an agent’s perspective, the larger environment may still contain friction:

- many competing crates for the same problem;
- feature-flag and version combinations;
- inconsistent documentation quality;
- several plausible architectural choices;
- lifetimes and trait errors that require deep local reconstruction;
- no single canonical answer for many ordinary systems problems.

The issue is not that Rust lacks solutions.

It may have too many possible solutions for a machine trying to minimize uncertainty.

`zig-reference` can offer a different experience:

```text
one canonical module
one narrow responsibility
one exact contract
one dependency path
one smoke test
one full test
one recipe when composition matters
one known failure vocabulary
one repair path
```

A smaller ecosystem can be easier to use correctly when its structure is deliberate.

## What it would take

### 1. Canonical choices

The repository must resist becoming a junk drawer.

For recurring problems, an agent should usually find:

```text
recommended module
applicable constraints
nearby alternatives
rejection reasons
exact validation path
```

Rust may offer fifty crates. `zig-reference` should make the default answer obvious.

### 2. Coverage of the foundations

The repository does not need everything at once. It needs the components that repeatedly appear underneath larger systems:

- memory and allocation;
- bounded collections;
- handles and ownership;
- binary parsing and serialization;
- state machines;
- networking and storage primitives;
- architecture types;
- schedulers;
- concurrency boundaries;
- drivers and boot infrastructure.

Each good foundation should make several higher layers cheaper.

### 3. Recipes, not merely modules

A pile of primitives will not beat an ecosystem.

Agents need known compositions:

- packet parsers;
- object registries;
- event loops;
- memory subsystems;
- ELF loaders;
- page-table managers;
- bounded schedulers;
- persistent logs;
- initialization graphs.

Modules tell an agent what exists.

Recipes tell it how the pieces cooperate.

### 4. Strong negative knowledge

This may become the repository’s greatest advantage.

Most codebases preserve successful implementations while forgetting the mistakes that surrounded them.

`zig-reference` should preserve:

- when not to use a module;
- what invalidates its values;
- what failure a misuse causes;
- which alternative fits better;
- how to repair the problem;
- which focused command proves the repair.

An agent should not have to rediscover the same bad idea twice.

### 5. One brutal validation gate

The ideal top-level experience eventually becomes:

```sh
zig build verify-all
```

Underneath, that command may run many independent checks. From the agent’s perspective, it should answer one question:

> Is the foundation still coherent?

It should verify that:

- contracts are valid;
- indexes are current;
- dependency graphs are acyclic;
- modules compile;
- smoke imports work;
- tests pass;
- recipes compose;
- negative fixtures behave as declared;
- evidence matches the source.

The agent should not need to reconstruct the repository’s ritual every time it arrives.

### 6. Fast retrieval

The agent should be able to ask:

```text
I need bounded stale-safe storage with no heap allocation.
```

And receive:

```text
best module
why it matches
why nearby modules do not
entrypoint
dependencies
test command
recipe examples
known diagnostics
```

No recursive browsing through hundreds of directories.

### 7. Real flagship systems

Eventually the repository needs undeniable systems built from its corpus:

- a booting hypervisor;
- an embedded runtime;
- a network service;
- a storage engine;
- a kernel subsystem;
- a compiler component.

These projects prove that the corpus scales beyond demonstrations.

Hyper-Zig can become one of those proofs.

### 8. Fair agent benchmarks

The comparison must eventually be tested rather than advertised.

Give several agents the same task using:

```text
Rust ecosystem
versus
Zig plus zig-reference
```

Measure:

- time to first successful build;
- tokens consumed;
- files inspected;
- new lines generated;
- repair iterations;
- test failures;
- security defects;
- human interventions.

If the Zig reference path wins repeatedly, then “better for agents” becomes evidence.

### 9. Version stability

Agents dislike moving targets.

The repository needs:

- pinned Zig baselines;
- clear support windows;
- migration contracts;
- deprecated-module replacements;
- upgrade-impact reports;
- deterministic evidence.

A company should be able to pin an approved corpus and know how it moves forward.

### 10. Contributions that improve the map

A new module should not merely add code.

It should enlarge the machine-readable world:

```text
new capability
new dependency edges
new examples
new diagnostics
new repairs
new recipes
new evidence
```

Every useful addition should reduce uncertainty for the next agent.

## The decisive advantage

Rust’s compiler answers powerful local questions:

```text
Is this borrow valid?
Does this type satisfy the required trait?
Can this value outlive that reference?
```

`zig-reference` aims to answer a broader set of engineering questions:

```text
Which component should I use?
What assumptions does it carry?
What does it invalidate?
What composes with it?
What failure should I expect?
What repair is canonical?
What has already been verified?
What remains genuinely new?
```

That is not a replacement for compiler safety.

It is a different layer of intelligence.

Rust may remain the stronger language by compiler enforcement while `zig-reference` becomes the easier world for machines to inhabit.

If AI agents become the primary builders of software, the easier world may become the more important one.

## The actual wager

The wager is not that agents literally hate Rust.

The wager is that agents prefer:

- fewer ambiguous choices;
- more canonical answers;
- cheaper retrieval;
- explicit constraints;
- known repair paths;
- and one reliable way to prove that the ground beneath them still holds.

Build that world well enough, and an agent may eventually begin a systems task by saying:

> I need to do this, this, and this. Better download `zig-reference`.

That is what winning looks like.
