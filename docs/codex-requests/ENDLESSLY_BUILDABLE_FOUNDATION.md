CODEX REQUEST: ESTABLISH ZIG-REFERENCE AS AN ENDLESSLY BUILDABLE ENGINEERING FOUNDATION



Repository:



thanks-cohn/zig-reference



Repository slogan:



Solved once, documented completely, reused forever.



Operating principle:



Write truth once. Derive every view. Verify continuously.



Strategic objective:



Establish zig-reference as the professional cornerstone for all future Zig engineering in this repository.



The result should not merely be a collection of modules.



It should become a durable engineering system: structured enough for machines, readable enough for humans, strict enough to prevent architectural decay, and flexible enough to support years of increasingly ambitious work.



The repository should aspire to become a de facto standard for cumulative Zig systems engineering: not by claiming authority, but by demonstrating unusually strong contracts, discoverability, reproducibility, composition, validation, and architectural memory.



Preserve Zig 0.14.0 as the repository baseline.



Do not upgrade the repository to Zig 0.15, Zig 0.16, master, nightly, or later APIs.



Do not silently introduce APIs unavailable in Zig 0.14.0.



ZERO-BINARY EXECUTION RULE



This Codex task must not generate any binary files.



Do not generate binaries temporarily.



Do not generate binaries in ignored directories.



Do not generate binaries for validation.



Do not generate:



* SQLite databases;

* compiled executables;

* object files;

* static libraries;

* shared libraries;

* ELF binaries;

* kernel images;

* hypervisor images;

* disk images;

* ISO images;

* QCOW2 images;

* raw images;

* initramfs archives;

* compressed archives;

* rendered graph images;

* PDFs;

* coverage databases;

* profiler output;

* fuzzing corpus files;

* QEMU snapshots;

* core dumps;

* build caches;

* compiler caches;

* package artifacts;

* serialized binary indexes;

* any other non-text output.



Do not invoke commands that compile, link, package, render, archive, create databases, or otherwise emit binary data.



This includes not running Zig compiler-driven validation during this task.



The task may create and modify only reviewable text files, including:



* Zig source code;

* Python source code;

* JavaScript source code;

* JSON;

* JSON Schema;

* Markdown;

* YAML;

* TOML;

* Mermaid;

* DOT;

* plain text;

* shell scripts;

* Git configuration;

* GitHub Actions configuration.



The repository may define compiler-driven commands for future execution, but Codex must not execute those commands during this task.



Do not create a SQLite generator.



Do not create a SQLite database.



Do not create `zig build database`.



Use deterministic JSON indexes as the repository’s query acceleration and discovery layer.



PURPOSE



Transform zig-reference from a growing collection of well-documented modules into a durable, self-verifying, dependency-aware engineering foundation capable of supporting many years of expansion.



The repository should embody:



* first-principles systems programming;

* explicit ownership and failure behavior;

* complete human-readable contracts;

* complete machine-readable contracts;

* deterministic discovery;

* validated module composition;

* reproducible textual evidence;

* dependency-aware growth;

* version-porting memory;

* architectural decision memory;

* objective lifecycle and maturity;

* strong contribution standards;

* automated catalog generation;

* trustworthy generated views;

* minimal repeated research;

* minimal architectural amnesia;

* minimal duplicated truth;

* increasingly powerful commands;

* honest statements about what has and has not been validated.



This task is not about adding decorative files.



It is not about producing a large amount of ceremonial documentation.



It is about creating infrastructure that allows a small number of commands and canonical contracts to perform large amounts of trustworthy work.



The intended future command surface is:



zig build check

zig build test

zig build smoke

zig build index

zig build graph

zig build query -- capability "physical page allocation"

zig build status

zig build recipes

zig build conformance

zig build property

zig build fuzz-smoke

zig build differential

zig build validate-repository



These commands should eventually allow a human or agent to:



* discover capabilities;

* find canonical modules;

* inspect public symbols;

* inspect every public endpoint;

* inspect inputs and outputs;

* inspect error behavior;

* inspect ownership and borrowing;

* follow dependencies;

* inspect reverse dependencies;

* determine build order;

* determine port order;

* inspect lifecycle;

* calculate maturity;

* inspect validation evidence;

* find replacement modules;

* compose higher systems;

* query Hyper-Zig readiness;

* avoid repeatedly rediscovering settled facts.



During this Codex task, implement and statically inspect the command definitions where possible, but do not execute commands that generate compiler output or any other binary data.



1. INSPECT THE EXISTING REPOSITORY BEFORE CHANGING IT



Before modifying anything, inspect:



* README.md;

* AGENTS.md;

* AGE_OF_AGENTS.md;

* ARCHETYPES.md;

* PYRAMID.md;

* SNOWBALL_PRINCIPLE.md;

* build.zig;

* details.schema.json;

* port.schema.json;

* modules.json;

* ports.json;

* every implemented module’s `details.json`;

* every implemented module’s `port.js`;

* the current tools;

* the current documentation tree;

* the module catalog;

* the master checklist;

* the Hyper-Zig roadmap;

* existing smoke tests;

* existing unit tests;

* existing CI configuration;

* existing generated files.



Reuse the foundations already established by merged work.



Do not replace working systems merely to satisfy naming preferences.



Identify:



* missing canonical fields;

* duplicated facts;

* stale paths;

* stale links;

* missing dependencies;

* incorrect dependency declarations;

* placeholder documentation;

* unsupported validation claims;

* maturity claims without evidence;

* generated files that have become accidental canonical sources;

* build steps that exist only nominally;

* query commands that scan unnecessarily;

* conflicting module identities;

* duplicate capability names;

* incorrect Zig-version claims.



Report discovered structural problems honestly.



2. ESTABLISH CANONICAL SOURCES OF TRUTH



Formally define these authorities.



Source code



The canonical truth for implementation behavior.



Tests



The canonical executable specification and evidence for behavior.



details.json



The canonical truth for:



* module identity;

* implementation paths;

* public entrypoints;

* public symbols;

* every public endpoint;

* endpoint inputs;

* endpoint outputs;

* endpoint errors;

* ownership;

* borrowing;

* lifetimes;

* cleanup;

* invalidation;

* failure atomicity;

* dependency contracts;

* inherited guarantees;

* test commands;

* validation status;

* validation evidence references;

* lifecycle;

* maturity evidence;

* capability terms;

* aliases;

* known consumers;

* expected dependents;

* trust boundaries;

* deprecation and replacement data.



port.js



The canonical truth for:



* Zig 0.14.0 version-sensitive usage;

* compiler builtin usage;

* standard-library usage;

* build-system API usage;

* future migration risks;

* dependency port order;

* semantic guarantees a port must preserve;

* known incompatibilities;

* verified migration evidence;

* unverified migration assumptions.



Architectural decision records



The canonical truth for accepted repository-wide architectural reasoning.



Generated files



Derived views only.



Generated files must never become independent sources of truth.



Create:



docs/decisions/0001-canonical-contract-sources.md



It must clearly define:



* canonical files;

* derived files;

* human summaries;

* executable evidence;

* conflict resolution;

* schema migration;

* drift detection;

* what must never be manually synchronized;

* what future agents must update;

* what future agents must regenerate;

* how unsupported claims are handled.



Central rule:



Write facts once in the correct canonical source. Derive or verify every secondary representation.



3. RESPECT THE ROOT DOCUMENTATION POLICY



Keep these foundational documentation files prominently at the repository root:



AGENTS.md

AGE_OF_AGENTS.md

ARCHETYPES.md

PYRAMID.md

SNOWBALL_PRINCIPLE.md



Also retain essential root technical files such as:



README.md

LICENSE

build.zig

details.schema.json

port.schema.json

modules.json if still required

ports.json if still required

machine configuration

source directories

tools

CI configuration



Move other substantial documentation under:



docs/



Use a coherent structure resembling:



docs/

├── architecture/

├── catalog/

├── checklists/

├── decisions/

├── governance/

├── migrations/

├── porting/

├── recipes/

├── reports/

├── rfcs/

├── roadmaps/

├── standards/

└── validation/



Do not over-nest directories.



Preserve Git history through real moves where possible.



Update all internal links.



Add automated stale-path and stale-link detection where practical.



4. CREATE THE CANONICAL REPOSITORY INDEX PIPELINE



Create or complete:



tools/build-repository-index.py



The tool must scan every implemented module’s:



details.json

port.js



It must validate canonical contracts before generating derived views.



Generate deterministic text files:



generated/modules.json

generated/ports.json

generated/dependencies.json

generated/reverse-dependencies.json

generated/capabilities.json

generated/capability-ontology.json

generated/public-symbols.json

generated/endpoints.json

generated/errors.json

generated/status.json

generated/build-order.json

generated/port-order.json

generated/repository-summary.json

generated/repository-health.json



Every generated file must identify itself using a machine-readable field such as:



"_generated": true



and a notice such as:



"_notice": "GENERATED FILE — DO NOT EDIT DIRECTLY"



Generated output must be:



* deterministic;

* prettified;

* stably ordered;

* reproducible;

* valid JSON;

* formatted with two-space indentation;

* terminated by a newline;

* free of meaningless timestamps;

* identical across repeated runs when canonical inputs have not changed.



Support:



python3 tools/build-repository-index.py



python3 tools/build-repository-index.py --check



Check mode must compare generated textual content without writing temporary binary files.



It may generate textual content in memory or in a text-only temporary directory.



Check mode must fail when committed generated views differ from canonical inputs.



5. USE JSON AS THE ONLY QUERY ACCELERATION LAYER



Do not create SQLite infrastructure.



Do not create:



tools/build-repository-database.py



Do not create:



generated/zig-reference.sqlite



Do not create:



zig build database



Do not add database validation.



The generated JSON indexes must be sufficient for repository discovery and querying.



If performance requires optimization, use:



* precomputed JSON maps;

* normalized JSON arrays;

* reverse indexes;

* stable identifier tables;

* capability alias maps;

* endpoint lookup maps;

* symbol lookup maps;

* dependency adjacency lists;

* reverse-dependency adjacency lists;

* precomputed build order;

* precomputed port order.



Prefer transparent data structures over opaque state.



6. CREATE THE REPOSITORY QUERY COMMAND



Create or complete:



tools/query-reference.py



It must use generated JSON indexes rather than repeatedly scanning every module.



It must support human-readable and JSON output.



Required commands:



python3 tools/query-reference.py module fixed-capacity-vector



python3 tools/query-reference.py capability "physical page allocation"



python3 tools/query-reference.py capability "bounded binary parsing"



python3 tools/query-reference.py symbol PhysicalAddress



python3 tools/query-reference.py endpoint append



python3 tools/query-reference.py error Overflow



python3 tools/query-reference.py dependencies physical-page-frame-allocator



python3 tools/query-reference.py dependents checked-half-open-range



python3 tools/query-reference.py build-order hyper-zig



python3 tools/query-reference.py port-order --target 0.16.0



python3 tools/query-reference.py status



python3 tools/query-reference.py unvalidated



python3 tools/query-reference.py maturity stable



python3 tools/query-reference.py deprecated



python3 tools/query-reference.py replacement old-module-name



python3 tools/query-reference.py paths bounded-byte-reader



python3 tools/query-reference.py recipe parse-length-prefixed-record



Support:



--json

--compact

--paths-only

--symbols-only

--recursive

--explain-selection



The query tool should:



* prefer canonical module identifiers;

* resolve aliases;

* report ambiguous matches;

* explain why a module was selected;

* avoid deprecated modules when an active replacement exists;

* distinguish implemented from planned modules;

* distinguish documented from validated behavior;

* never imply semantic certainty where only a text alias matched.



A future agent should be able to retrieve exact relevant information without reading unrelated contracts.



7. GENERATE DEPENDENCY GRAPHS



Create or complete:



tools/build-dependency-graphs.py



Generate text-based graph datasets:



generated/graphs/module-dependencies.json

generated/graphs/reverse-dependencies.json

generated/graphs/porting-order.json

generated/graphs/capability-to-module.json

generated/graphs/maturity.json

generated/graphs/hyper-zig-readiness.json

generated/graphs/validation-status.json



Generate human-readable textual graph forms:



docs/reports/generated/module-dependencies.mmd

docs/reports/generated/module-dependencies.dot

docs/reports/generated/porting-order.mmd

docs/reports/generated/hyper-zig-readiness.mmd



Do not render these graphs into:



* PNG;

* SVG;

* PDF;

* JPEG;

* WebP;

* any other image or binary format.



Do not hand-maintain graph edges.



All graph edges must derive from canonical contracts.



The graph checker must detect:



* missing dependencies;

* nonexistent modules;

* duplicate edges;

* self-dependencies;

* dependency cycles;

* mismatches between details.json and port.js;

* build imports omitted from contracts;

* contract dependencies omitted from build.zig;

* port dependencies inconsistent with module dependencies;

* declared dependencies unused by source where safely and statically detectable;

* stale generated graph output.



Dependency cycles must fail validation unless explicitly approved by an ADR and represented as an intentional cycle.



8. CREATE A CAPABILITY ONTOLOGY



Create:



docs/standards/CAPABILITY_VOCABULARY.md



Generate:



generated/capability-ontology.json



Each capability may include:



* canonical name;

* human description;

* aliases;

* related terms;

* broader capability;

* narrower capabilities;

* negative matches;

* exact implementing modules;

* partial implementing modules;

* expected input kinds;

* expected output kinds;

* common questions;

* common mistaken matches;

* planned consumers;

* system milestones enabled.



Example:



Canonical capability:



fixed-capacity-sequence



Aliases:



* bounded vector;

* static vector;

* inline vector;

* allocation-free sequence;

* fixed array with logical length.



Negative matches:



* dynamic array;

* linked list;

* unbounded sequence.



Do not create hundreds of speculative capabilities.



Begin with capabilities represented by:



* implemented modules;

* accepted planned modules;

* concrete Hyper-Zig requirements;

* concrete kernel requirements.



The ontology must improve search without pretending perfect semantic understanding.



9. ADD OBJECTIVE MODULE LIFECYCLE



Create:



docs/standards/MODULE_LIFECYCLE.md



Supported lifecycle values:



proposed

experimental

active

stable

deprecated

superseded

archived



Define entry and exit requirements for each state.



A module must not move to stable merely because it is old or appears complete.



A deprecated module should include:



* deprecation reason;

* replacement module when available;

* migration guidance;

* support policy;

* removal eligibility;

* compatibility implications.



10. ADD OBJECTIVE MATURITY LEVELS



Create:



docs/standards/MATURITY_LEVELS.md



Use these levels:



Level 0 — Proposed



The capability is planned but has no implementation.



Level 1 — Implemented



Real source code exists.



Level 2 — Contracted



README.md, MASTERY.md, DETAILS.md, details.json, and port.js exist and satisfy repository requirements.



Level 3 — Unit Validated



Compiler validation and meaningful unit tests have passed.



Level 4 — Externally Smoke Tested



An external consumer smoke test passes through canonical named imports.



Level 5 — Property, Fuzz, Differential, or Failure-Injection Tested



Applicable higher-risk behavioral testing has passed.



Level 6 — Reused



At least one other repository module imports and exercises the module.



Level 7 — System Proven



A composition recipe or flagship system uses the module successfully.



Level 8 — Independently Reviewed



A qualified independent reviewer has reviewed implementation and contracts.



Level 9 — Stable



The public contract, maintenance policy, evidence, review status, reuse, and system proof satisfy the repository’s stability standard.



Do not allow unsupported self-declared maturity.



Generated status tools must calculate the highest provable level from evidence.



A module may declare a target maturity, but its calculated maturity must remain separate.



Add lifecycle and maturity evidence fields to details.schema.json.



11. ADD REPRODUCIBLE TEXTUAL VALIDATION EVIDENCE



Create:



tools/record-validation.py



Validation evidence must be stored as ordinary textual JSON under:



generated/validation/



Use a structure such as:



generated/validation/<commit>/<module>.json



Each record should include:



* module;

* commit;

* exact Zig version;

* operating system;

* architecture;

* target triple;

* optimization mode;

* commands requested;

* commands executed;

* commands skipped;

* reasons for skipped commands;

* exit codes;

* contract-check result;

* unit-test result;

* smoke-test result;

* recipe result;

* conformance result;

* property-test result;

* fuzz result;

* differential-test result;

* system-test result;

* timestamp;

* CI run identifier when available;

* relevant textual hashes;

* warnings;

* validation environment.



Do not manually write successful validation evidence.



Generate success records only after commands actually run.



Do not mark skipped commands as passed.



Do not store:



* binaries;

* raw build artifacts;

* core dumps;

* compressed logs;

* coverage databases;

* raw fuzz files;

* entire build directories.



The repository must distinguish:



* implemented;

* statically inspected;

* compiler validated;

* unit tested;

* smoke tested;

* property tested;

* fuzz tested;

* differentially tested;

* system tested;

* independently reviewed.



Because this Codex task prohibits binary generation, do not create new successful compiler-validation records during this run.



12. ADD ARCHITECTURAL DECISION RECORDS



Create or complete:



docs/decisions/



Add at minimum:



0001-canonical-contract-sources.md

0002-zig-014-baseline.md

0003-named-module-imports.md

0004-external-smoke-tests.md

0005-port-js-migration-contracts.md

0006-generated-views-not-manual-duplicates.md

0007-details-json-human-and-machine-contract.md

0008-dependency-first-snowball-composition.md

0009-json-indexes-as-transparent-query-acceleration.md

0010-objective-module-maturity.md



Do not create an SQLite ADR.



If an existing SQLite ADR was introduced by unmerged or partial work, replace it with the JSON-index decision.



Each ADR must contain:



* Title;

* Status;

* Context;

* Decision;

* Consequences;

* Alternatives considered;

* Alternatives rejected;

* Migration impact;

* Validation impact;

* Agent guidance.



Create:



docs/decisions/TEMPLATE.md



The purpose is to prevent future agents from reversing settled decisions because the reasoning was lost.



Do not populate ADRs with repeated generic boilerplate.



Every ADR must describe its own specific decision.



13. ADD SEMANTIC CONTRACT VERSIONING



Define separate versions for:



implementation_version

public_contract_version

details_schema_version

port_schema_version

repository_index_version



Document the policy in:



docs/standards/VERSIONING.md



Patch changes may include:



* implementation corrections preserving documented behavior;

* documentation clarification;

* additional tests;

* performance improvements preserving guarantees.



Minor changes may include:



* backward-compatible public endpoints;

* new optional capabilities;

* additional supported environments;

* compatible metadata expansion.



Major changes include:



* removing or renaming public endpoints;

* changing ownership;

* changing borrowing;

* changing lifetime;

* changing cleanup responsibility;

* changing invalidation;

* changing failure atomicity;

* changing documented error behavior;

* changing binary layout;

* changing dependency contracts;

* changing semantic guarantees.



Do not use version numbers ceremonially.



Where practical, consistency checking should detect public-contract changes lacking an appropriate version update.



14. ADD DEPRECATION AND REPLACEMENT INFRASTRUCTURE



Every module contract must support:



* lifecycle status;

* introduced version;

* deprecated version;

* superseded version;

* removed version;

* replacement module;

* migration guide;

* support policy;

* deprecation reason.



The query tool must support:



python3 tools/query-reference.py deprecated



python3 tools/query-reference.py replacement old-module-name



Do not delete deprecated modules without a documented removal policy.



Future agents should prefer active replacements unless the user explicitly requests the deprecated module.



15. ADD COMPOSITION RECIPES



Create:



recipes/



Every recipe should contain:



recipe.json

README.md

src/

tests/



Begin with a small initial set based on implemented modules:



recipes/parse-length-prefixed-record

recipes/create-stale-safe-object-registry

recipes/write-and-read-explicit-endian-record

recipes/validate-physical-page-frame

recipes/construct-bounded-state-machine

recipes/normalize-checked-memory-range



Each recipe.json should record:



* recipe identity;

* problem solved;

* selected modules;

* selection reasons;

* direct dependencies;

* dependency order;

* public endpoints used;

* adapters required;

* inherited guarantees;

* gaps discovered;

* future systems enabled;

* intended build commands;

* intended smoke commands;

* validation evidence references.



Recipes must contain real source and meaningful test definitions.



They must not be documentation-only examples.



During this task, statically inspect their structure and imports without executing compiler-driven tests.



Do not claim that recipes compile or pass unless that evidence already exists.



16. ADD CONFORMANCE SUITES



Create:



conformance/



Initial suites:



conformance/fixed-capacity-container

conformance/growable-container

conformance/bounded-reader

conformance/binary-writer

conformance/range-value

conformance/allocator

conformance/handle-registry

conformance/integer-codec



Each suite should define behavior without requiring identical implementations.



For example, bounded-reader conformance may cover:



* empty input;

* successful reads;

* exact-end reads;

* reads beyond the end;

* cursor preservation after failure;

* failure atomicity;

* zero-length slices;

* explicit endianness;

* sub-reader boundaries where applicable.



Do not create tests that merely assert true.



Do not claim conformance because APIs look similar.



A conformance claim must refer to a real executable adapter and real evidence.



During this task, create or improve the textual source and metadata, but do not execute compiler-driven conformance tests.



17. ADD PROPERTY, FUZZ, AND DIFFERENTIAL TEST INFRASTRUCTURE



Create:



docs/standards/TESTING_LEVELS.md

docs/standards/FUZZING.md

docs/standards/DIFFERENTIAL_TESTING.md



Define future build commands:



zig build property

zig build fuzz-smoke

zig build differential



Do not require every module to implement every testing type.



Assign testing requirements according to risk.



High-value targets include:



* integer casts;

* alignment helpers;

* ranges;

* endian codecs;

* bounded readers;

* binary writers;

* semantic versions;

* FourCC;

* enum decoders;

* bit flags;

* ELF parsers;

* allocators;

* handle registries.



Example properties:



* encoding followed by decoding returns the original value;

* checked range length agrees with endpoints;

* aligned results satisfy alignment and never fall below input;

* stale handles never resolve after generation changes;

* reader failure does not advance the cursor;

* writer output length equals documented encoded width.



Differential testing should compare against trusted textual or programmatic oracles where practical.



Do not execute fuzzers or compilers during this task.



18. ADD SECURITY AND TRUST-BOUNDARY INFRASTRUCTURE



Create:



docs/governance/SECURITY.md

docs/standards/THREAT_MODELING.md



Add structured trust-boundary fields to details.schema.json.



For modules handling untrusted input, record:



* trust boundary;

* untrusted inputs;

* validation performed;

* resource-exhaustion risks;

* integer-overflow risks;

* memory-safety risks;

* privilege boundary;

* failure containment;

* security non-goals.



Prioritize meaningful threat models for:



* binary parsers;

* executable loaders;

* physical-memory managers;

* page-table code;

* hypervisor modules;

* network parsers;

* filesystems;

* allocators exposed to untrusted sizes.



Do not add empty ceremonial threat models to trivial modules.



19. ADD GOVERNANCE



Create or complete:



docs/governance/GOVERNANCE.md

docs/governance/CONTRIBUTING.md

docs/governance/REVIEW_POLICY.md

docs/governance/MAINTAINER_GUIDE.md

docs/governance/RELEASE_POLICY.md

docs/governance/CODE_OF_CONDUCT.md

docs/governance/SECURITY.md



Add:



.github/CODEOWNERS



Document:



* maintainer roles;

* current maintainer reality;

* module ownership;

* review requirements;

* breaking-change approval;

* schema-change approval;

* stability approval;

* security review;

* contributor expectations;

* abandoned-module reassignment;

* maintainer succession;

* dispute resolution;

* release authority.



Do not overstate current governance.



Do not imply an independent committee exists if it does not.



Write policies that work honestly for one maintainer and can scale to many.



20. ADD AN RFC PROCESS



Create:



docs/rfcs/

docs/rfcs/README.md

docs/rfcs/TEMPLATE.md



Require RFCs for:



* new foundational abstractions;

* schema changes;

* naming-policy changes;

* repository-wide API migrations;

* maturity-policy changes;

* new canonical sources;

* ownership-convention changes;

* breaking build-system changes;

* major Hyper-Zig architecture choices.



RFC template sections:



* Summary;

* Motivation;

* Detailed design;

* Public contract;

* Dependency impact;

* Migration impact;

* Alternatives;

* Risks;

* Testing;

* Porting implications;

* Unresolved questions.



Do not require RFCs for ordinary bug fixes or normal module additions following established standards.



21. ADD BUILD COMMANDS THAT DO REAL WORK



Create or integrate definitions for:



zig build check



Future behavior:



* module contract validation;

* port contract validation;

* repository consistency validation;

* generated textual-file drift checks;

* root documentation policy checks;

* graph consistency;

* catalog consistency.



zig build index



Regenerates deterministic textual repository indexes.



zig build graph



Regenerates textual dependency and status graphs.



zig build status



Prints repository health and maturity.



zig build query



Provides a documented wrapper or dispatch to the query tool.



zig build recipes



Builds and tests composition recipes.



zig build conformance



Runs applicable conformance suites.



zig build property



Runs configured property tests.



zig build fuzz-smoke



Runs bounded fuzz smoke tests.



zig build differential



Runs configured differential tests.



zig build validate-repository



Runs:



* check;

* unit tests;

* smoke tests;

* recipe tests;

* conformance tests;

* configured property tests;

* portability infrastructure checks.



zig build test



Must continue to target Zig 0.14.0.



Do not create:



zig build database



Do not invent Zig 0.16 build APIs.



Do not execute these Zig commands during this task because they may generate binary output.



Statically inspect build definitions for obvious Zig 0.14.0 compatibility where possible.



Report compiler validation as pending.



22. ADD A REPOSITORY HEALTH REPORT



Generate textual reports:



docs/reports/generated/REPOSITORY_HEALTH.md

generated/repository-health.json



Report:



* implemented module count;

* contracted module count;

* statically inspected count;

* compiler-validated count;

* unit-tested count;

* smoke-tested count;

* conformance-tested count;

* property-tested count;

* fuzz-tested count;

* reused-module count;

* system-proven count;

* independently reviewed count;

* stable count;

* deprecated count;

* missing-contract count;

* stale generated files;

* dependency cycles;

* unverified paths;

* unsupported claims;

* current Zig baseline;

* port-contract coverage;

* recipe coverage;

* Hyper-Zig readiness.



Every metric must have a documented definition.



Do not turn the report into vanity statistics.



Do not infer validation from the mere presence of tests.



23. ADD CI QUALITY GATES



Add or update GitHub Actions for Zig 0.14.0.



Required future CI checks:



* canonical contract validation;

* port contract validation;

* generated textual-index drift;

* dependency graph validation;

* root documentation policy;

* stale-link detection;

* formatting checks;

* unit tests;

* smoke tests;

* recipe tests;

* conformance tests;

* configured property tests;

* static secret checks where available.



Pin third-party GitHub Actions by immutable commit SHA where practical.



Use minimal workflow permissions.



Do not grant write permission to ordinary pull-request validation.



Do not use `pull_request_target` unsafely.



Document recommended branch protection in:



docs/governance/REVIEW_POLICY.md



Do not claim branch protection was enabled if Codex cannot configure repository settings.



Do not execute CI locally during this task if doing so generates binary files.



24. PREPARE FOR RELEASE PROVENANCE WITHOUT PRETENDING IT EXISTS



Create:



docs/standards/RELEASE_PROVENANCE.md



Document a future path for:



* release checksums;

* SBOM generation;

* reproducible builds;

* build provenance;

* signed tags;

* release artifacts;

* dependency licenses.



Do not create:



* fake SBOMs;

* fake signatures;

* fake attestations;

* binary release artifacts.



Prepare interfaces and standards without prematurely implementing heavy release machinery.



25. UPDATE README.md



Keep this as the first visible slogan:



Solved once, documented completely, reused forever.



Add prominently:



Write truth once. Derive every view. Verify continuously.



Present zig-reference as:



* a first-principles systems engineering reference;

* a cumulative Zig module foundation;

* a human-readable contract system;

* a machine-readable contract system;

* a dependency-aware composition platform;

* a Zig 0.14.0 implementation baseline;

* a version-portable knowledge base;

* a self-verifying repository;

* a future foundation for systems such as Hyper-Zig.



Explain the command surface concisely:



zig build check

zig build index

zig build graph

zig build status

zig build query

zig build smoke

zig build test

zig build validate-repository



Do not overwhelm the README with internal details.



Link to organized documentation under `docs/`.



26. UPDATE AGENTS.md



AGENTS.md must explain how future agents operate.



Required workflow:



1. Query before searching manually.

2. Read generated module identity.

3. Open canonical details.json.

4. Open port.js only for version work.

5. Follow dependency order.

6. Reuse existing modules.

7. Update canonical sources only.

8. Regenerate textual derived views.

9. Run applicable validation.

10. Record evidence honestly.

11. Distinguish planned, implemented, compiled, tested, reused, and stable.

12. Never introduce a duplicate module without searching.

13. Never claim future-version compatibility without evidence.

14. Never hand-edit generated indexes.

15. Never generate opaque repository state when transparent JSON is sufficient.



Explicitly prohibit:



* hand-editing generated indexes;

* creating duplicate modules without querying;

* marking validation successful without execution;

* adding dependencies without contract declarations;

* accidentally changing the Zig baseline;

* inventing future-version compatibility;

* manually updating multiple copies of the same fact;

* bypassing smoke tests;

* ignoring lifecycle replacements;

* treating generated views as canonical;

* creating SQLite or another opaque query database.



27. EXPAND THE CONSISTENCY CHECKER



Expand repository consistency checking to verify:



* canonical sources exist;

* generated text files match canonical inputs;

* generated files are not manually divergent;

* every declared module path exists;

* every public endpoint has structured inputs;

* every public endpoint has structured outputs;

* every documented error has a structured contract;

* dependencies match imports;

* build imports match details.json;

* port dependencies match module dependencies;

* lifecycle values are valid;

* maturity is evidence-backed;

* deprecated modules identify replacements where available;

* recipes use real public imports;

* conformance claims reference executable adapters;

* validation claims reference evidence files;

* root documentation policy is respected;

* stale links are rejected;

* duplicate module identity is rejected;

* conflicting capability definitions are rejected;

* dependency cycles fail unless explicitly approved;

* generated JSON is deterministic;

* no SQLite or database infrastructure exists;

* no repository command depends on a database.



28. TEXT-ONLY VALIDATION FOR THIS TASK



Run:



python3 --version

node --version



Run text-only validation commands such as:



python3 tools/build-repository-index.py



python3 tools/build-repository-index.py --check



python3 tools/build-dependency-graphs.py



python3 tools/query-reference.py status



python3 tools/query-reference.py capability "bounded binary parsing"



python3 tools/query-reference.py dependencies physical-page-frame-number-and-address-conversion



python3 tools/query-reference.py build-order hyper-zig



python3 tools/query-reference.py unvalidated



python3 tools/query-reference.py deprecated



python3 tools/module-contract-consistency-checker.py



node tools/check-port-contracts.js



node tools/format-port-contracts.js --check



node tools/portability-smoke-test.js only if it produces text output and does not invoke Zig or generate binaries.



Also run:



python3 -m compileall -q tools



Only if the resulting `__pycache__` and `.pyc` generation is disabled or avoided.



Prefer:



PYTHONDONTWRITEBYTECODE=1 python3 -m py_compile <specific files>



Do not execute any command that generates `.pyc` files.



Use:



PYTHONDONTWRITEBYTECODE=1



for Python tooling where appropriate.



Do not run:



zig build

zig test

zig run

zig build test

zig build smoke

zig build check

zig build validate-repository

tools/build-repository-database.py

sqlite3

graph rendering

archive creation

image generation

PDF generation

QEMU

kernel packaging

linkers

compilers producing output artifacts



Do not claim compiler-driven commands passed.



Instead, report:



* implemented but not executed;

* statically inspected;

* pending Zig 0.14.0 validation.



If another dependency is unavailable:



* complete all work not requiring it;

* report the exact dependency;

* do not fabricate success;

* provide exact local commands for later execution.



29. VERIFY THAT NO BINARY FILE WAS GENERATED



Before completion:



* inspect `git status`;

* inspect `git diff --stat`;

* inspect `git diff --numstat`;

* inspect all added and modified files;

* verify every added file is text;

* check for NUL bytes;

* ensure no `.pyc` files exist;

* ensure no `__pycache__` directories exist;

* ensure no Zig cache exists;

* ensure no build output exists;

* ensure no database exists;

* ensure no archive exists;

* ensure no rendered graph exists.



Use text-only checks.



Fail the task if any binary file was generated.



Do not merely leave a generated binary untracked.



It must not exist as a result of this task.



30. DO NOT OVERENGINEER THE FIRST PASS



Build strong foundations.



Do not attempt every imaginable future feature.



Prioritize:



* canonical truth;

* deterministic textual indexes;

* queryability;

* dependency graphs;

* capability discovery;

* maturity standards;

* lifecycle standards;

* validation evidence;

* ADRs;

* semantic contract versioning;

* deprecation infrastructure;

* composition recipes;

* conformance foundations;

* governance;

* RFCs;

* useful build definitions;

* CI definitions;

* repository health reporting.



Avoid:



* decorative dashboards;

* speculative ontology bloat;

* fake maturity;

* fake review evidence;

* fake compatibility;

* generated prose sludge;

* unnecessary frameworks;

* hosted services;

* database-first architecture;

* opaque state;

* duplicated facts;

* superficial tests;

* false completion claims.



A smaller system that is true, deterministic, and expandable is better than a large system filled with placeholders.



31. COMPLETION STANDARD



This task is complete only when:



* canonical truth is formally defined;

* all secondary textual views are generated or consistency-checked;

* repository indexes are deterministic;

* dependency graphs are derived from canonical contracts;

* JSON provides the complete query acceleration layer;

* no database infrastructure exists;

* query tooling works;

* capability aliases improve discovery;

* maturity is objective and evidence-backed;

* lifecycle status is recorded;

* validation evidence has a reproducible textual format;

* ADRs preserve architectural reasoning;

* semantic contract versioning is explicit;

* deprecation policy exists;

* recipes contain real compositions;

* initial conformance suites contain meaningful behavioral definitions;

* governance documents exist;

* RFC infrastructure exists;

* CI definitions validate the new infrastructure;

* root documentation remains clean;

* README and AGENTS.md reflect the standard;

* Zig 0.14.0 remains the baseline;

* no false validation claims are introduced;

* no binary file was generated during the task.



32. FINAL REPORT



Report:



1. repository state inspected;

2. canonical sources established;

3. generated textual files introduced;

4. files moved under docs;

5. stale links repaired;

6. module indexes generated;

7. port indexes generated;

8. dependency edges generated;

9. reverse-dependency edges generated;

10. cycles found;

11. capability aliases added;

12. query commands implemented;

13. maturity policy implemented;

14. lifecycle policy implemented;

15. validation evidence format implemented;

16. ADRs added;

17. semantic versioning policy added;

18. deprecation policy added;

19. recipes added;

20. recipe execution status;

21. conformance suites added;

22. conformance execution status;

23. property-test infrastructure added;

24. fuzz infrastructure added;

25. differential infrastructure added;

26. governance documents added;

27. RFC infrastructure added;

28. README changes;

29. AGENTS.md changes;

30. build commands defined;

31. CI changes;

32. exact Python version;

33. exact Node version;

34. exact text-only commands executed;

35. contract validation result;

36. generated-file drift result;

37. graph validation result;

38. query validation result;

39. compiler validation status;

40. unit-test status;

41. smoke-test status;

42. recipe-test status;

43. conformance-test status;

44. property-test status;

45. fuzz-test status;

46. differential-test status;

47. repository-validation status;

48. unresolved failures;

49. files requiring human review;

50. confirmation that SQLite was not created;

51. confirmation that no database generator was added;

52. confirmation that no binary file was generated;

53. method used to verify every changed file was text;

54. next highest-leverage infrastructure improvement.



FINAL STANDARD



The repository should no longer depend on memory, repeated searching, or manual duplication to remain coherent.



It should establish this standard:



Solved once, documented completely, reused forever.



Write truth once. Derive every view. Verify continuously.



Each module should make the next module easier.



Each composition should preserve the guarantees of its dependencies.



Each new agent run should begin with more verified knowledge than the run before it.



The repository should become endlessly buildable because its accumulated understanding is structured, searchable, testable, portable, explicit, and preserved.



Do not describe the repository as ahead of its time merely as marketing.



Make it ahead of its time through the quality of its contracts, evidence, architecture, transparency, and cumulative engineering discipline.CODEX REQUEST: ESTABLISH ZIG-REFERENCE AS AN ENDLESSLY BUILDABLE ENGINEERING FOUNDATION



Repository:



thanks-cohn/zig-reference



Repository slogan:



Solved once, documented completely, reused forever.



Operating principle:



Write truth once. Derive every view. Verify continuously.



Strategic objective:



Establish zig-reference as the professional cornerstone for all future Zig engineering in this repository.



The result should not merely be a collection of modules.



It should become a durable engineering system: structured enough for machines, readable enough for humans, strict enough to prevent architectural decay, and flexible enough to support years of increasingly ambitious work.



The repository should aspire to become a de facto standard for cumulative Zig systems engineering: not by claiming authority, but by demonstrating unusually strong contracts, discoverability, reproducibility, composition, validation, and architectural memory.



Preserve Zig 0.14.0 as the repository baseline.



Do not upgrade the repository to Zig 0.15, Zig 0.16, master, nightly, or later APIs.



Do not silently introduce APIs unavailable in Zig 0.14.0.



ZERO-BINARY EXECUTION RULE



This Codex task must not generate any binary files.



Do not generate binaries temporarily.



Do not generate binaries in ignored directories.



Do not generate binaries for validation.



Do not generate:



* SQLite databases;

* compiled executables;

* object files;

* static libraries;

* shared libraries;

* ELF binaries;

* kernel images;

* hypervisor images;

* disk images;

* ISO images;

* QCOW2 images;

* raw images;

* initramfs archives;

* compressed archives;

* rendered graph images;

* PDFs;

* coverage databases;

* profiler output;

* fuzzing corpus files;

* QEMU snapshots;

* core dumps;

* build caches;

* compiler caches;

* package artifacts;

* serialized binary indexes;

* any other non-text output.



Do not invoke commands that compile, link, package, render, archive, create databases, or otherwise emit binary data.



This includes not running Zig compiler-driven validation during this task.



The task may create and modify only reviewable text files, including:



* Zig source code;

* Python source code;

* JavaScript source code;

* JSON;

* JSON Schema;

* Markdown;

* YAML;

* TOML;

* Mermaid;

* DOT;

* plain text;

* shell scripts;

* Git configuration;

* GitHub Actions configuration.



The repository may define compiler-driven commands for future execution, but Codex must not execute those commands during this task.



Do not create a SQLite generator.



Do not create a SQLite database.



Do not create `zig build database`.



Use deterministic JSON indexes as the repository’s query acceleration and discovery layer.



PURPOSE



Transform zig-reference from a growing collection of well-documented modules into a durable, self-verifying, dependency-aware engineering foundation capable of supporting many years of expansion.



The repository should embody:



* first-principles systems programming;

* explicit ownership and failure behavior;

* complete human-readable contracts;

* complete machine-readable contracts;

* deterministic discovery;

* validated module composition;

* reproducible textual evidence;

* dependency-aware growth;

* version-porting memory;

* architectural decision memory;

* objective lifecycle and maturity;

* strong contribution standards;

* automated catalog generation;

* trustworthy generated views;

* minimal repeated research;

* minimal architectural amnesia;

* minimal duplicated truth;

* increasingly powerful commands;

* honest statements about what has and has not been validated.



This task is not about adding decorative files.



It is not about producing a large amount of ceremonial documentation.



It is about creating infrastructure that allows a small number of commands and canonical contracts to perform large amounts of trustworthy work.



The intended future command surface is:



zig build check

zig build test

zig build smoke

zig build index

zig build graph

zig build query -- capability "physical page allocation"

zig build status

zig build recipes

zig build conformance

zig build property

zig build fuzz-smoke

zig build differential

zig build validate-repository



These commands should eventually allow a human or agent to:



* discover capabilities;

* find canonical modules;

* inspect public symbols;

* inspect every public endpoint;

* inspect inputs and outputs;

* inspect error behavior;

* inspect ownership and borrowing;

* follow dependencies;

* inspect reverse dependencies;

* determine build order;

* determine port order;

* inspect lifecycle;

* calculate maturity;

* inspect validation evidence;

* find replacement modules;

* compose higher systems;

* query Hyper-Zig readiness;

* avoid repeatedly rediscovering settled facts.



During this Codex task, implement and statically inspect the command definitions where possible, but do not execute commands that generate compiler output or any other binary data.



1. INSPECT THE EXISTING REPOSITORY BEFORE CHANGING IT



Before modifying anything, inspect:



* README.md;

* AGENTS.md;

* AGE_OF_AGENTS.md;

* ARCHETYPES.md;

* PYRAMID.md;

* SNOWBALL_PRINCIPLE.md;

* build.zig;

* details.schema.json;

* port.schema.json;

* modules.json;

* ports.json;

* every implemented module’s `details.json`;

* every implemented module’s `port.js`;

* the current tools;

* the current documentation tree;

* the module catalog;

* the master checklist;

* the Hyper-Zig roadmap;

* existing smoke tests;

* existing unit tests;

* existing CI configuration;

* existing generated files.



Reuse the foundations already established by merged work.



Do not replace working systems merely to satisfy naming preferences.



Identify:



* missing canonical fields;

* duplicated facts;

* stale paths;

* stale links;

* missing dependencies;

* incorrect dependency declarations;

* placeholder documentation;

* unsupported validation claims;

* maturity claims without evidence;

* generated files that have become accidental canonical sources;

* build steps that exist only nominally;

* query commands that scan unnecessarily;

* conflicting module identities;

* duplicate capability names;

* incorrect Zig-version claims.



Report discovered structural problems honestly.



2. ESTABLISH CANONICAL SOURCES OF TRUTH



Formally define these authorities.



Source code



The canonical truth for implementation behavior.



Tests



The canonical executable specification and evidence for behavior.



details.json



The canonical truth for:



* module identity;

* implementation paths;

* public entrypoints;

* public symbols;

* every public endpoint;

* endpoint inputs;

* endpoint outputs;

* endpoint errors;

* ownership;

* borrowing;

* lifetimes;

* cleanup;

* invalidation;

* failure atomicity;

* dependency contracts;

* inherited guarantees;

* test commands;

* validation status;

* validation evidence references;

* lifecycle;

* maturity evidence;

* capability terms;

* aliases;

* known consumers;

* expected dependents;

* trust boundaries;

* deprecation and replacement data.



port.js



The canonical truth for:



* Zig 0.14.0 version-sensitive usage;

* compiler builtin usage;

* standard-library usage;

* build-system API usage;

* future migration risks;

* dependency port order;

* semantic guarantees a port must preserve;

* known incompatibilities;

* verified migration evidence;

* unverified migration assumptions.



Architectural decision records



The canonical truth for accepted repository-wide architectural reasoning.



Generated files



Derived views only.



Generated files must never become independent sources of truth.



Create:



docs/decisions/0001-canonical-contract-sources.md



It must clearly define:



* canonical files;

* derived files;

* human summaries;

* executable evidence;

* conflict resolution;

* schema migration;

* drift detection;

* what must never be manually synchronized;

* what future agents must update;

* what future agents must regenerate;

* how unsupported claims are handled.



Central rule:



Write facts once in the correct canonical source. Derive or verify every secondary representation.



3. RESPECT THE ROOT DOCUMENTATION POLICY



Keep these foundational documentation files prominently at the repository root:



AGENTS.md

AGE_OF_AGENTS.md

ARCHETYPES.md

PYRAMID.md

SNOWBALL_PRINCIPLE.md



Also retain essential root technical files such as:



README.md

LICENSE

build.zig

details.schema.json

port.schema.json

modules.json if still required

ports.json if still required

machine configuration

source directories

tools

CI configuration



Move other substantial documentation under:



docs/



Use a coherent structure resembling:



docs/

├── architecture/

├── catalog/

├── checklists/

├── decisions/

├── governance/

├── migrations/

├── porting/

├── recipes/

├── reports/

├── rfcs/

├── roadmaps/

├── standards/

└── validation/



Do not over-nest directories.



Preserve Git history through real moves where possible.



Update all internal links.



Add automated stale-path and stale-link detection where practical.



4. CREATE THE CANONICAL REPOSITORY INDEX PIPELINE



Create or complete:



tools/build-repository-index.py



The tool must scan every implemented module’s:



details.json

port.js



It must validate canonical contracts before generating derived views.



Generate deterministic text files:



generated/modules.json

generated/ports.json

generated/dependencies.json

generated/reverse-dependencies.json

generated/capabilities.json

generated/capability-ontology.json

generated/public-symbols.json

generated/endpoints.json

generated/errors.json

generated/status.json

generated/build-order.json

generated/port-order.json

generated/repository-summary.json

generated/repository-health.json



Every generated file must identify itself using a machine-readable field such as:



"_generated": true



and a notice such as:



"_notice": "GENERATED FILE — DO NOT EDIT DIRECTLY"



Generated output must be:



* deterministic;

* prettified;

* stably ordered;

* reproducible;

* valid JSON;

* formatted with two-space indentation;

* terminated by a newline;

* free of meaningless timestamps;

* identical across repeated runs when canonical inputs have not changed.



Support:



python3 tools/build-repository-index.py



python3 tools/build-repository-index.py --check



Check mode must compare generated textual content without writing temporary binary files.



It may generate textual content in memory or in a text-only temporary directory.



Check mode must fail when committed generated views differ from canonical inputs.



5. USE JSON AS THE ONLY QUERY ACCELERATION LAYER



Do not create SQLite infrastructure.



Do not create:



tools/build-repository-database.py



Do not create:



generated/zig-reference.sqlite



Do not create:



zig build database



Do not add database validation.



The generated JSON indexes must be sufficient for repository discovery and querying.



If performance requires optimization, use:



* precomputed JSON maps;

* normalized JSON arrays;

* reverse indexes;

* stable identifier tables;

* capability alias maps;

* endpoint lookup maps;

* symbol lookup maps;

* dependency adjacency lists;

* reverse-dependency adjacency lists;

* precomputed build order;

* precomputed port order.



Prefer transparent data structures over opaque state.



6. CREATE THE REPOSITORY QUERY COMMAND



Create or complete:



tools/query-reference.py



It must use generated JSON indexes rather than repeatedly scanning every module.



It must support human-readable and JSON output.



Required commands:



python3 tools/query-reference.py module fixed-capacity-vector



python3 tools/query-reference.py capability "physical page allocation"



python3 tools/query-reference.py capability "bounded binary parsing"



python3 tools/query-reference.py symbol PhysicalAddress



python3 tools/query-reference.py endpoint append



python3 tools/query-reference.py error Overflow



python3 tools/query-reference.py dependencies physical-page-frame-allocator



python3 tools/query-reference.py dependents checked-half-open-range



python3 tools/query-reference.py build-order hyper-zig



python3 tools/query-reference.py port-order --target 0.16.0



python3 tools/query-reference.py status



python3 tools/query-reference.py unvalidated



python3 tools/query-reference.py maturity stable



python3 tools/query-reference.py deprecated



python3 tools/query-reference.py replacement old-module-name



python3 tools/query-reference.py paths bounded-byte-reader



python3 tools/query-reference.py recipe parse-length-prefixed-record



Support:



--json

--compact

--paths-only

--symbols-only

--recursive

--explain-selection



The query tool should:



* prefer canonical module identifiers;

* resolve aliases;

* report ambiguous matches;

* explain why a module was selected;

* avoid deprecated modules when an active replacement exists;

* distinguish implemented from planned modules;

* distinguish documented from validated behavior;

* never imply semantic certainty where only a text alias matched.



A future agent should be able to retrieve exact relevant information without reading unrelated contracts.



7. GENERATE DEPENDENCY GRAPHS



Create or complete:



tools/build-dependency-graphs.py



Generate text-based graph datasets:



generated/graphs/module-dependencies.json

generated/graphs/reverse-dependencies.json

generated/graphs/porting-order.json

generated/graphs/capability-to-module.json

generated/graphs/maturity.json

generated/graphs/hyper-zig-readiness.json

generated/graphs/validation-status.json



Generate human-readable textual graph forms:



docs/reports/generated/module-dependencies.mmd

docs/reports/generated/module-dependencies.dot

docs/reports/generated/porting-order.mmd

docs/reports/generated/hyper-zig-readiness.mmd



Do not render these graphs into:



* PNG;

* SVG;

* PDF;

* JPEG;

* WebP;

* any other image or binary format.



Do not hand-maintain graph edges.



All graph edges must derive from canonical contracts.



The graph checker must detect:



* missing dependencies;

* nonexistent modules;

* duplicate edges;

* self-dependencies;

* dependency cycles;

* mismatches between details.json and port.js;

* build imports omitted from contracts;

* contract dependencies omitted from build.zig;

* port dependencies inconsistent with module dependencies;

* declared dependencies unused by source where safely and statically detectable;

* stale generated graph output.



Dependency cycles must fail validation unless explicitly approved by an ADR and represented as an intentional cycle.



8. CREATE A CAPABILITY ONTOLOGY



Create:



docs/standards/CAPABILITY_VOCABULARY.md



Generate:



generated/capability-ontology.json



Each capability may include:



* canonical name;

* human description;

* aliases;

* related terms;

* broader capability;

* narrower capabilities;

* negative matches;

* exact implementing modules;

* partial implementing modules;

* expected input kinds;

* expected output kinds;

* common questions;

* common mistaken matches;

* planned consumers;

* system milestones enabled.



Example:



Canonical capability:



fixed-capacity-sequence



Aliases:



* bounded vector;

* static vector;

* inline vector;

* allocation-free sequence;

* fixed array with logical length.



Negative matches:



* dynamic array;

* linked list;

* unbounded sequence.



Do not create hundreds of speculative capabilities.



Begin with capabilities represented by:



* implemented modules;

* accepted planned modules;

* concrete Hyper-Zig requirements;

* concrete kernel requirements.



The ontology must improve search without pretending perfect semantic understanding.



9. ADD OBJECTIVE MODULE LIFECYCLE



Create:



docs/standards/MODULE_LIFECYCLE.md



Supported lifecycle values:



proposed

experimental

active

stable

deprecated

superseded

archived



Define entry and exit requirements for each state.



A module must not move to stable merely because it is old or appears complete.



A deprecated module should include:



* deprecation reason;

* replacement module when available;

* migration guidance;

* support policy;

* removal eligibility;

* compatibility implications.



10. ADD OBJECTIVE MATURITY LEVELS



Create:



docs/standards/MATURITY_LEVELS.md



Use these levels:



Level 0 — Proposed



The capability is planned but has no implementation.



Level 1 — Implemented



Real source code exists.



Level 2 — Contracted



README.md, MASTERY.md, DETAILS.md, details.json, and port.js exist and satisfy repository requirements.



Level 3 — Unit Validated



Compiler validation and meaningful unit tests have passed.



Level 4 — Externally Smoke Tested



An external consumer smoke test passes through canonical named imports.



Level 5 — Property, Fuzz, Differential, or Failure-Injection Tested



Applicable higher-risk behavioral testing has passed.



Level 6 — Reused



At least one other repository module imports and exercises the module.



Level 7 — System Proven



A composition recipe or flagship system uses the module successfully.



Level 8 — Independently Reviewed



A qualified independent reviewer has reviewed implementation and contracts.



Level 9 — Stable



The public contract, maintenance policy, evidence, review status, reuse, and system proof satisfy the repository’s stability standard.



Do not allow unsupported self-declared maturity.



Generated status tools must calculate the highest provable level from evidence.



A module may declare a target maturity, but its calculated maturity must remain separate.



Add lifecycle and maturity evidence fields to details.schema.json.



11. ADD REPRODUCIBLE TEXTUAL VALIDATION EVIDENCE



Create:



tools/record-validation.py



Validation evidence must be stored as ordinary textual JSON under:



generated/validation/



Use a structure such as:



generated/validation/<commit>/<module>.json



Each record should include:



* module;

* commit;

* exact Zig version;

* operating system;

* architecture;

* target triple;

* optimization mode;

* commands requested;

* commands executed;

* commands skipped;

* reasons for skipped commands;

* exit codes;

* contract-check result;

* unit-test result;

* smoke-test result;

* recipe result;

* conformance result;

* property-test result;

* fuzz result;

* differential-test result;

* system-test result;

* timestamp;

* CI run identifier when available;

* relevant textual hashes;

* warnings;

* validation environment.



Do not manually write successful validation evidence.



Generate success records only after commands actually run.



Do not mark skipped commands as passed.



Do not store:



* binaries;

* raw build artifacts;

* core dumps;

* compressed logs;

* coverage databases;

* raw fuzz files;

* entire build directories.



The repository must distinguish:



* implemented;

* statically inspected;

* compiler validated;

* unit tested;

* smoke tested;

* property tested;

* fuzz tested;

* differentially tested;

* system tested;

* independently reviewed.



Because this Codex task prohibits binary generation, do not create new successful compiler-validation records during this run.



12. ADD ARCHITECTURAL DECISION RECORDS



Create or complete:



docs/decisions/



Add at minimum:



0001-canonical-contract-sources.md

0002-zig-014-baseline.md

0003-named-module-imports.md

0004-external-smoke-tests.md

0005-port-js-migration-contracts.md

0006-generated-views-not-manual-duplicates.md

0007-details-json-human-and-machine-contract.md

0008-dependency-first-snowball-composition.md

0009-json-indexes-as-transparent-query-acceleration.md

0010-objective-module-maturity.md



Do not create an SQLite ADR.



If an existing SQLite ADR was introduced by unmerged or partial work, replace it with the JSON-index decision.



Each ADR must contain:



* Title;

* Status;

* Context;

* Decision;

* Consequences;

* Alternatives considered;

* Alternatives rejected;

* Migration impact;

* Validation impact;

* Agent guidance.



Create:



docs/decisions/TEMPLATE.md



The purpose is to prevent future agents from reversing settled decisions because the reasoning was lost.



Do not populate ADRs with repeated generic boilerplate.



Every ADR must describe its own specific decision.



13. ADD SEMANTIC CONTRACT VERSIONING



Define separate versions for:



implementation_version

public_contract_version

details_schema_version

port_schema_version

repository_index_version



Document the policy in:



docs/standards/VERSIONING.md



Patch changes may include:



* implementation corrections preserving documented behavior;

* documentation clarification;

* additional tests;

* performance improvements preserving guarantees.



Minor changes may include:



* backward-compatible public endpoints;

* new optional capabilities;

* additional supported environments;

* compatible metadata expansion.



Major changes include:



* removing or renaming public endpoints;

* changing ownership;

* changing borrowing;

* changing lifetime;

* changing cleanup responsibility;

* changing invalidation;

* changing failure atomicity;

* changing documented error behavior;

* changing binary layout;

* changing dependency contracts;

* changing semantic guarantees.



Do not use version numbers ceremonially.



Where practical, consistency checking should detect public-contract changes lacking an appropriate version update.



14. ADD DEPRECATION AND REPLACEMENT INFRASTRUCTURE



Every module contract must support:



* lifecycle status;

* introduced version;

* deprecated version;

* superseded version;

* removed version;

* replacement module;

* migration guide;

* support policy;

* deprecation reason.



The query tool must support:



python3 tools/query-reference.py deprecated



python3 tools/query-reference.py replacement old-module-name



Do not delete deprecated modules without a documented removal policy.



Future agents should prefer active replacements unless the user explicitly requests the deprecated module.



15. ADD COMPOSITION RECIPES



Create:



recipes/



Every recipe should contain:



recipe.json

README.md

src/

tests/



Begin with a small initial set based on implemented modules:



recipes/parse-length-prefixed-record

recipes/create-stale-safe-object-registry

recipes/write-and-read-explicit-endian-record

recipes/validate-physical-page-frame

recipes/construct-bounded-state-machine

recipes/normalize-checked-memory-range



Each recipe.json should record:



* recipe identity;

* problem solved;

* selected modules;

* selection reasons;

* direct dependencies;

* dependency order;

* public endpoints used;

* adapters required;

* inherited guarantees;

* gaps discovered;

* future systems enabled;

* intended build commands;

* intended smoke commands;

* validation evidence references.



Recipes must contain real source and meaningful test definitions.



They must not be documentation-only examples.



During this task, statically inspect their structure and imports without executing compiler-driven tests.



Do not claim that recipes compile or pass unless that evidence already exists.



16. ADD CONFORMANCE SUITES



Create:



conformance/



Initial suites:



conformance/fixed-capacity-container

conformance/growable-container

conformance/bounded-reader

conformance/binary-writer

conformance/range-value

conformance/allocator

conformance/handle-registry

conformance/integer-codec



Each suite should define behavior without requiring identical implementations.



For example, bounded-reader conformance may cover:



* empty input;

* successful reads;

* exact-end reads;

* reads beyond the end;

* cursor preservation after failure;

* failure atomicity;

* zero-length slices;

* explicit endianness;

* sub-reader boundaries where applicable.



Do not create tests that merely assert true.



Do not claim conformance because APIs look similar.



A conformance claim must refer to a real executable adapter and real evidence.



During this task, create or improve the textual source and metadata, but do not execute compiler-driven conformance tests.



17. ADD PROPERTY, FUZZ, AND DIFFERENTIAL TEST INFRASTRUCTURE



Create:



docs/standards/TESTING_LEVELS.md

docs/standards/FUZZING.md

docs/standards/DIFFERENTIAL_TESTING.md



Define future build commands:



zig build property

zig build fuzz-smoke

zig build differential



Do not require every module to implement every testing type.



Assign testing requirements according to risk.



High-value targets include:



* integer casts;

* alignment helpers;

* ranges;

* endian codecs;

* bounded readers;

* binary writers;

* semantic versions;

* FourCC;

* enum decoders;

* bit flags;

* ELF parsers;

* allocators;

* handle registries.



Example properties:



* encoding followed by decoding returns the original value;

* checked range length agrees with endpoints;

* aligned results satisfy alignment and never fall below input;

* stale handles never resolve after generation changes;

* reader failure does not advance the cursor;

* writer output length equals documented encoded width.



Differential testing should compare against trusted textual or programmatic oracles where practical.



Do not execute fuzzers or compilers during this task.



18. ADD SECURITY AND TRUST-BOUNDARY INFRASTRUCTURE



Create:



docs/governance/SECURITY.md

docs/standards/THREAT_MODELING.md



Add structured trust-boundary fields to details.schema.json.



For modules handling untrusted input, record:



* trust boundary;

* untrusted inputs;

* validation performed;

* resource-exhaustion risks;

* integer-overflow risks;

* memory-safety risks;

* privilege boundary;

* failure containment;

* security non-goals.



Prioritize meaningful threat models for:



* binary parsers;

* executable loaders;

* physical-memory managers;

* page-table code;

* hypervisor modules;

* network parsers;

* filesystems;

* allocators exposed to untrusted sizes.



Do not add empty ceremonial threat models to trivial modules.



19. ADD GOVERNANCE



Create or complete:



docs/governance/GOVERNANCE.md

docs/governance/CONTRIBUTING.md

docs/governance/REVIEW_POLICY.md

docs/governance/MAINTAINER_GUIDE.md

docs/governance/RELEASE_POLICY.md

docs/governance/CODE_OF_CONDUCT.md

docs/governance/SECURITY.md



Add:



.github/CODEOWNERS



Document:



* maintainer roles;

* current maintainer reality;

* module ownership;

* review requirements;

* breaking-change approval;

* schema-change approval;

* stability approval;

* security review;

* contributor expectations;

* abandoned-module reassignment;

* maintainer succession;

* dispute resolution;

* release authority.



Do not overstate current governance.



Do not imply an independent committee exists if it does not.



Write policies that work honestly for one maintainer and can scale to many.



20. ADD AN RFC PROCESS



Create:



docs/rfcs/

docs/rfcs/README.md

docs/rfcs/TEMPLATE.md



Require RFCs for:



* new foundational abstractions;

* schema changes;

* naming-policy changes;

* repository-wide API migrations;

* maturity-policy changes;

* new canonical sources;

* ownership-convention changes;

* breaking build-system changes;

* major Hyper-Zig architecture choices.



RFC template sections:



* Summary;

* Motivation;

* Detailed design;

* Public contract;

* Dependency impact;

* Migration impact;

* Alternatives;

* Risks;

* Testing;

* Porting implications;

* Unresolved questions.



Do not require RFCs for ordinary bug fixes or normal module additions following established standards.



21. ADD BUILD COMMANDS THAT DO REAL WORK



Create or integrate definitions for:



zig build check



Future behavior:



* module contract validation;

* port contract validation;

* repository consistency validation;

* generated textual-file drift checks;

* root documentation policy checks;

* graph consistency;

* catalog consistency.



zig build index



Regenerates deterministic textual repository indexes.



zig build graph



Regenerates textual dependency and status graphs.



zig build status



Prints repository health and maturity.



zig build query



Provides a documented wrapper or dispatch to the query tool.



zig build recipes



Builds and tests composition recipes.



zig build conformance



Runs applicable conformance suites.



zig build property



Runs configured property tests.



zig build fuzz-smoke



Runs bounded fuzz smoke tests.



zig build differential



Runs configured differential tests.



zig build validate-repository



Runs:



* check;

* unit tests;

* smoke tests;

* recipe tests;

* conformance tests;

* configured property tests;

* portability infrastructure checks.



zig build test



Must continue to target Zig 0.14.0.



Do not create:



zig build database



Do not invent Zig 0.16 build APIs.



Do not execute these Zig commands during this task because they may generate binary output.



Statically inspect build definitions for obvious Zig 0.14.0 compatibility where possible.



Report compiler validation as pending.



22. ADD A REPOSITORY HEALTH REPORT



Generate textual reports:



docs/reports/generated/REPOSITORY_HEALTH.md

generated/repository-health.json



Report:



* implemented module count;

* contracted module count;

* statically inspected count;

* compiler-validated count;

* unit-tested count;

* smoke-tested count;

* conformance-tested count;

* property-tested count;

* fuzz-tested count;

* reused-module count;

* system-proven count;

* independently reviewed count;

* stable count;

* deprecated count;

* missing-contract count;

* stale generated files;

* dependency cycles;

* unverified paths;

* unsupported claims;

* current Zig baseline;

* port-contract coverage;

* recipe coverage;

* Hyper-Zig readiness.



Every metric must have a documented definition.



Do not turn the report into vanity statistics.



Do not infer validation from the mere presence of tests.



23. ADD CI QUALITY GATES



Add or update GitHub Actions for Zig 0.14.0.



Required future CI checks:



* canonical contract validation;

* port contract validation;

* generated textual-index drift;

* dependency graph validation;

* root documentation policy;

* stale-link detection;

* formatting checks;

* unit tests;

* smoke tests;

* recipe tests;

* conformance tests;

* configured property tests;

* static secret checks where available.



Pin third-party GitHub Actions by immutable commit SHA where practical.



Use minimal workflow permissions.



Do not grant write permission to ordinary pull-request validation.



Do not use `pull_request_target` unsafely.



Document recommended branch protection in:



docs/governance/REVIEW_POLICY.md



Do not claim branch protection was enabled if Codex cannot configure repository settings.



Do not execute CI locally during this task if doing so generates binary files.



24. PREPARE FOR RELEASE PROVENANCE WITHOUT PRETENDING IT EXISTS



Create:



docs/standards/RELEASE_PROVENANCE.md



Document a future path for:



* release checksums;

* SBOM generation;

* reproducible builds;

* build provenance;

* signed tags;

* release artifacts;

* dependency licenses.



Do not create:



* fake SBOMs;

* fake signatures;

* fake attestations;

* binary release artifacts.



Prepare interfaces and standards without prematurely implementing heavy release machinery.



25. UPDATE README.md



Keep this as the first visible slogan:



Solved once, documented completely, reused forever.



Add prominently:



Write truth once. Derive every view. Verify continuously.



Present zig-reference as:



* a first-principles systems engineering reference;

* a cumulative Zig module foundation;

* a human-readable contract system;

* a machine-readable contract system;

* a dependency-aware composition platform;

* a Zig 0.14.0 implementation baseline;

* a version-portable knowledge base;

* a self-verifying repository;

* a future foundation for systems such as Hyper-Zig.



Explain the command surface concisely:



zig build check

zig build index

zig build graph

zig build status

zig build query

zig build smoke

zig build test

zig build validate-repository



Do not overwhelm the README with internal details.



Link to organized documentation under `docs/`.



26. UPDATE AGENTS.md



AGENTS.md must explain how future agents operate.



Required workflow:



1. Query before searching manually.

2. Read generated module identity.

3. Open canonical details.json.

4. Open port.js only for version work.

5. Follow dependency order.

6. Reuse existing modules.

7. Update canonical sources only.

8. Regenerate textual derived views.

9. Run applicable validation.

10. Record evidence honestly.

11. Distinguish planned, implemented, compiled, tested, reused, and stable.

12. Never introduce a duplicate module without searching.

13. Never claim future-version compatibility without evidence.

14. Never hand-edit generated indexes.

15. Never generate opaque repository state when transparent JSON is sufficient.



Explicitly prohibit:



* hand-editing generated indexes;

* creating duplicate modules without querying;

* marking validation successful without execution;

* adding dependencies without contract declarations;

* accidentally changing the Zig baseline;

* inventing future-version compatibility;

* manually updating multiple copies of the same fact;

* bypassing smoke tests;

* ignoring lifecycle replacements;

* treating generated views as canonical;

* creating SQLite or another opaque query database.



27. EXPAND THE CONSISTENCY CHECKER



Expand repository consistency checking to verify:



* canonical sources exist;

* generated text files match canonical inputs;

* generated files are not manually divergent;

* every declared module path exists;

* every public endpoint has structured inputs;

* every public endpoint has structured outputs;

* every documented error has a structured contract;

* dependencies match imports;

* build imports match details.json;

* port dependencies match module dependencies;

* lifecycle values are valid;

* maturity is evidence-backed;

* deprecated modules identify replacements where available;

* recipes use real public imports;

* conformance claims reference executable adapters;

* validation claims reference evidence files;

* root documentation policy is respected;

* stale links are rejected;

* duplicate module identity is rejected;

* conflicting capability definitions are rejected;

* dependency cycles fail unless explicitly approved;

* generated JSON is deterministic;

* no SQLite or database infrastructure exists;

* no repository command depends on a database.





ADDENDUM: CREATE A ROOT COMMAND REFERENCE



Create this root-level file:



COMMANDS.md



Use this exact uppercase filename.



COMMANDS.md must be the canonical human-readable command reference for the entire repository.



It must collect every supported, planned, maintenance, validation, generation, discovery, testing, portability, contribution, and release-related command in one professionally organized location.



The file must prevent future humans and agents from needing to search README files, build.zig, CI workflows, tool source, module documentation, or shell history merely to discover how to operate the repository.



COMMANDS.md must include commands from:



* build.zig;

* Python tools;

* JavaScript and Node tools;

* module-specific test steps;

* repository-wide validation;

* contract formatting;

* contract generation;

* port-contract tooling;

* index generation;

* graph generation;

* querying;

* status and health reporting;

* recipes;

* conformance;

* property testing;

* fuzz smoke testing;

* differential testing;

* formatting;

* CI-equivalent local validation;

* contribution workflows;

* Git inspection;

* release preparation;

* future Hyper-Zig workflows when those commands become real.



Do not invent commands merely to make the reference appear comprehensive.



Every command must be classified as one of:



* Available and verified;

* Available but not executed in this Codex environment;

* Planned and defined;

* Proposed future command;

* Deprecated;

* Removed.



COMMANDS.md must never present a planned command as currently functional.



For each command, document:



* command;

* status;

* purpose;

* prerequisites;

* inputs or arguments;

* common flags;

* files read;

* files written;

* whether it modifies the working tree;

* whether it generates derived text;

* whether it may produce compiler or build output when run by a human later;

* expected successful result;

* important failure modes;

* related commands;

* source of truth defining the command;

* last verified environment or evidence reference when available.



Use concise tables for command discovery, followed by fuller sections where explanation is necessary.



COMMANDS.md should begin with:



# Zig Reference Command Manual



Solved once, documented completely, reused forever.



Write truth once. Derive every view. Verify continuously.



Then include a fast-start section covering the normal future workflow:



1. Inspect repository status.

2. Validate contracts.

3. Regenerate textual indexes.

4. Check generated-file drift.

5. Query existing capabilities.

6. Inspect dependency order.

7. Run applicable tests.

8. Review repository health.

9. Verify the final diff.



Include a compact command index organized by category.



At minimum, cover the following categories.



1. Environment inspection



Document:



zig version

python3 --version

node --version

git status

git diff --stat

git diff --numstat

git diff --check



Clearly state that Zig commands were not executed during this text-only Codex task.



2. Canonical contract tooling



Document the existing real commands for:



* checking module contracts;

* formatting module contracts;

* creating a module-contract template;

* checking port contracts;

* formatting port contracts;

* generating the port index;

* creating a port contract;

* checking portability consistency;

* portability infrastructure smoke testing.



Discover exact filenames and flags from the repository rather than guessing them.



3. Repository indexes



Document:



python3 tools/build-repository-index.py

python3 tools/build-repository-index.py --check



Explain which textual files these commands generate or validate.



4. Repository graph commands



Document:



python3 tools/build-dependency-graphs.py



Document supported check or output flags if they genuinely exist.



Explain that only JSON, Mermaid, DOT, Markdown, or plain-text output is supported by repository policy.



5. Query commands



Document every supported form of:



python3 tools/query-reference.py



Include examples for:



* module;

* capability;

* symbol;

* endpoint;

* error;

* dependencies;

* dependents;

* build order;

* port order;

* lifecycle;

* maturity;

* deprecated modules;

* replacements;

* unvalidated modules;

* paths;

* recipes;

* repository status.



Document:



--json

--compact

--paths-only

--symbols-only

--recursive

--explain-selection



Only include flags that actually work after implementation.



6. Repository build commands



Document the intended interface:



zig build check

zig build index

zig build graph

zig build status

zig build query

zig build recipes

zig build conformance

zig build property

zig build fuzz-smoke

zig build differential

zig build smoke

zig build test

zig build validate-repository



For each build command, distinguish:



* defined in build.zig;

* statically inspected;

* compiler verified;

* not executed in this task.



Do not include:



zig build database



7. Module-specific commands



Generate a deterministic module-command inventory from canonical module metadata.



Document:



* each module’s unit-test build step;

* each module’s smoke-test build step;

* contract checks related to that module;

* relevant recipe or conformance commands;

* public module import name where useful.



Do not manually duplicate hundreds of module commands in several files.



COMMANDS.md may contain a generated section between stable markers such as:



<!-- BEGIN GENERATED MODULE COMMANDS -->



<!-- END GENERATED MODULE COMMANDS -->



The generated section must derive from canonical contracts or build metadata.



The surrounding explanatory text remains manually maintained.



8. Recipes



Document how to:



* list recipes;

* query a recipe;

* build a specific recipe;

* test a specific recipe;

* run all recipe checks.



Only mark commands available when actually wired into the repository.



9. Conformance



Document how to:



* list conformance suites;

* inspect claimed conformance;

* run a suite;

* run all suites;

* identify modules lacking conformance evidence.



10. Property, fuzz, and differential testing



Document:



zig build property

zig build fuzz-smoke

zig build differential



Explain:



* risk-based applicability;

* configured targets;

* bounded smoke behavior;

* evidence recording;

* commands that currently have no eligible targets.



Do not imply all modules support these testing levels.



11. Validation evidence



Document the real interface for:



tools/record-validation.py



Include:



* recording successful runs;

* recording failures;

* recording skipped commands;

* linking evidence to a module;

* refusing fabricated success;

* locating existing evidence.



12. Porting workflows



Document the complete supported porting workflow:



* inspect the current baseline;

* query port order;

* inspect a module’s port.js;

* validate port contracts;

* generate the port index;

* run portability consistency checks;

* record verified migration evidence.



Include example target-version queries without claiming that target version is already supported.



13. Repository health and status



Document commands for:



* repository status;

* maturity status;

* lifecycle status;

* unvalidated modules;

* deprecated modules;

* dependency cycles;

* Hyper-Zig readiness;

* generated-file drift.



14. Contribution workflow



Document a professional local contribution sequence:



git status

git switch -c <branch>

git diff

git diff --check

git add <paths>

git diff --cached

git commit

git push



Do not embed credentials, tokens, personal branch names, or repository secrets.



Explain that contributors should run the strongest applicable validation before committing.



15. CI equivalence



Map each CI check to its closest local command.



Clearly identify checks that cannot be reproduced exactly outside GitHub Actions.



Do not claim branch protection or hosted CI settings can be configured through a local command.



16. Release preparation



Document only real or formally planned release commands.



Distinguish:



* currently available;

* documented future interface;

* intentionally unsupported.



Do not create fake signing, provenance, SBOM, or release commands.



17. Prohibited and removed commands



Include a section explicitly stating that the repository does not support:



tools/build-repository-database.py

zig build database

SQLite generation

binary index generation

rendered graph generation as part of repository indexing



Explain that deterministic JSON indexes replace the database layer.



COMMANDS.md SYNCHRONIZATION



COMMANDS.md must not become another manually drifting source of truth.



Implement a text-only checker:



tools/check-command-reference.py



The checker must compare COMMANDS.md against:



* build.zig command definitions;

* known Python CLI entrypoints;

* known Node CLI entrypoints;

* modules.json;

* canonical module test metadata;

* recipe metadata;

* conformance metadata;

* generated repository indexes where appropriate.



It must detect:



* commands defined in code but absent from COMMANDS.md;

* commands documented as available but absent from the repository;

* stale tool paths;

* stale build-step names;

* obsolete flags;

* database commands that reappear;

* module commands missing from the generated section;

* commands marked verified without evidence where detectable.



Support:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py



Optionally support:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check



Do not create bytecode or binary caches.



Add the command-reference checker to:



* repository consistency checking;

* the future `zig build check` definition;

* CI validation;

* `zig build validate-repository`.



Do not execute Zig build commands during this Codex task.



README AND AGENTS INTEGRATION



Update README.md with a prominent link to:



COMMANDS.md



Use wording similar to:



For the complete repository command surface, operational workflows, status definitions, and validation commands, see COMMANDS.md.



Update AGENTS.md to require:



* consulting COMMANDS.md before inventing or guessing commands;

* updating canonical command definitions first;

* regenerating or validating the generated module-command section;

* running `tools/check-command-reference.py`;

* never documenting a command as available unless it exists;

* never claiming a command was verified unless it was executed successfully.



COMMAND REFERENCE VALIDATION



During this task, run only text-safe checks:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check



Do not run either form if implementation would create bytecode; set `PYTHONDONTWRITEBYTECODE=1`.



Also inspect:



git diff -- COMMANDS.md tools/check-command-reference.py README.md AGENTS.md build.zig



Do not execute any compiler-driven command.



COMPLETION REQUIREMENTS FOR COMMANDS.md



This addendum is complete only when:



* root `COMMANDS.md` exists;

* every real repository command is discoverable from it;

* command statuses are honest;

* available and planned commands are clearly separated;

* every command states its source of truth;

* module command listings derive from canonical metadata;

* README.md links to it;

* AGENTS.md requires its use;

* a checker detects command-documentation drift;

* CI and repository consistency definitions include that checker;

* no database command is documented;

* no binary file is generated;

* no command is falsely marked verified.



FINAL REPORT ADDITIONS



Add these items to the final report:



55. COMMANDS.md created;

56. command categories documented;

57. available commands documented;

58. planned commands documented;

59. deprecated or prohibited commands documented;

60. module-specific commands indexed;

61. command-reference generated section created;

62. command-reference checker created;

63. command-reference drift result;

64. README command-manual link added;

65. AGENTS.md command-manual requirements added;

66. commands found in code but missing from documentation;

67. documented commands found to be nonexistent;

68. commands whose verification remains pending;

69. confirmation that `zig build database` is absent;

70. confirmation that no binary-generating command was executed.

Add this section to the request before **“28. TEXT-ONLY VALIDATION FOR THIS TASK.”** Then renumber the later sections.



ADDENDUM: CREATE A ROOT COMMAND REFERENCE



Create this root-level file:



COMMANDS.md



Use this exact uppercase filename.



COMMANDS.md must be the canonical human-readable command reference for the entire repository.



It must collect every supported, planned, maintenance, validation, generation, discovery, testing, portability, contribution, and release-related command in one professionally organized location.



The file must prevent future humans and agents from needing to search README files, build.zig, CI workflows, tool source, module documentation, or shell history merely to discover how to operate the repository.



COMMANDS.md must include commands from:



* build.zig;

* Python tools;

* JavaScript and Node tools;

* module-specific test steps;

* repository-wide validation;

* contract formatting;

* contract generation;

* port-contract tooling;

* index generation;

* graph generation;

* querying;

* status and health reporting;

* recipes;

* conformance;

* property testing;

* fuzz smoke testing;

* differential testing;

* formatting;

* CI-equivalent local validation;

* contribution workflows;

* Git inspection;

* release preparation;

* future Hyper-Zig workflows when those commands become real.



Do not invent commands merely to make the reference appear comprehensive.



Every command must be classified as one of:



* Available and verified;

* Available but not executed in this Codex environment;

* Planned and defined;

* Proposed future command;

* Deprecated;

* Removed.



COMMANDS.md must never present a planned command as currently functional.



For each command, document:



* command;

* status;

* purpose;

* prerequisites;

* inputs or arguments;

* common flags;

* files read;

* files written;

* whether it modifies the working tree;

* whether it generates derived text;

* whether it may produce compiler or build output when run by a human later;

* expected successful result;

* important failure modes;

* related commands;

* source of truth defining the command;

* last verified environment or evidence reference when available.



Use concise tables for command discovery, followed by fuller sections where explanation is necessary.



COMMANDS.md should begin with:



# Zig Reference Command Manual



Solved once, documented completely, reused forever.



Write truth once. Derive every view. Verify continuously.



Then include a fast-start section covering the normal future workflow:



1. Inspect repository status.

2. Validate contracts.

3. Regenerate textual indexes.

4. Check generated-file drift.

5. Query existing capabilities.

6. Inspect dependency order.

7. Run applicable tests.

8. Review repository health.

9. Verify the final diff.



Include a compact command index organized by category.



At minimum, cover the following categories.



1. Environment inspection



Document:



zig version

python3 --version

node --version

git status

git diff --stat

git diff --numstat

git diff --check



Clearly state that Zig commands were not executed during this text-only Codex task.



2. Canonical contract tooling



Document the existing real commands for:



* checking module contracts;

* formatting module contracts;

* creating a module-contract template;

* checking port contracts;

* formatting port contracts;

* generating the port index;

* creating a port contract;

* checking portability consistency;

* portability infrastructure smoke testing.



Discover exact filenames and flags from the repository rather than guessing them.



3. Repository indexes



Document:



python3 tools/build-repository-index.py

python3 tools/build-repository-index.py --check



Explain which textual files these commands generate or validate.



4. Repository graph commands



Document:



python3 tools/build-dependency-graphs.py



Document supported check or output flags if they genuinely exist.



Explain that only JSON, Mermaid, DOT, Markdown, or plain-text output is supported by repository policy.



5. Query commands



Document every supported form of:



python3 tools/query-reference.py



Include examples for:



* module;

* capability;

* symbol;

* endpoint;

* error;

* dependencies;

* dependents;

* build order;

* port order;

* lifecycle;

* maturity;

* deprecated modules;

* replacements;

* unvalidated modules;

* paths;

* recipes;

* repository status.



Document:



--json

--compact

--paths-only

--symbols-only

--recursive

--explain-selection



Only include flags that actually work after implementation.



6. Repository build commands



Document the intended interface:



zig build check

zig build index

zig build graph

zig build status

zig build query

zig build recipes

zig build conformance

zig build property

zig build fuzz-smoke

zig build differential

zig build smoke

zig build test

zig build validate-repository



For each build command, distinguish:



* defined in build.zig;

* statically inspected;

* compiler verified;

* not executed in this task.



Do not include:



zig build database



7. Module-specific commands



Generate a deterministic module-command inventory from canonical module metadata.



Document:



* each module’s unit-test build step;

* each module’s smoke-test build step;

* contract checks related to that module;

* relevant recipe or conformance commands;

* public module import name where useful.



Do not manually duplicate hundreds of module commands in several files.



COMMANDS.md may contain a generated section between stable markers such as:



<!-- BEGIN GENERATED MODULE COMMANDS -->



<!-- END GENERATED MODULE COMMANDS -->



The generated section must derive from canonical contracts or build metadata.



The surrounding explanatory text remains manually maintained.



8. Recipes



Document how to:



* list recipes;

* query a recipe;

* build a specific recipe;

* test a specific recipe;

* run all recipe checks.



Only mark commands available when actually wired into the repository.



9. Conformance



Document how to:



* list conformance suites;

* inspect claimed conformance;

* run a suite;

* run all suites;

* identify modules lacking conformance evidence.



10. Property, fuzz, and differential testing



Document:



zig build property

zig build fuzz-smoke

zig build differential



Explain:



* risk-based applicability;

* configured targets;

* bounded smoke behavior;

* evidence recording;

* commands that currently have no eligible targets.



Do not imply all modules support these testing levels.



11. Validation evidence



Document the real interface for:



tools/record-validation.py



Include:



* recording successful runs;

* recording failures;

* recording skipped commands;

* linking evidence to a module;

* refusing fabricated success;

* locating existing evidence.



12. Porting workflows



Document the complete supported porting workflow:



* inspect the current baseline;

* query port order;

* inspect a module’s port.js;

* validate port contracts;

* generate the port index;

* run portability consistency checks;

* record verified migration evidence.



Include example target-version queries without claiming that target version is already supported.



13. Repository health and status



Document commands for:



* repository status;

* maturity status;

* lifecycle status;

* unvalidated modules;

* deprecated modules;

* dependency cycles;

* Hyper-Zig readiness;

* generated-file drift.



14. Contribution workflow



Document a professional local contribution sequence:



git status

git switch -c <branch>

git diff

git diff --check

git add <paths>

git diff --cached

git commit

git push



Do not embed credentials, tokens, personal branch names, or repository secrets.



Explain that contributors should run the strongest applicable validation before committing.



15. CI equivalence



Map each CI check to its closest local command.



Clearly identify checks that cannot be reproduced exactly outside GitHub Actions.



Do not claim branch protection or hosted CI settings can be configured through a local command.



16. Release preparation



Document only real or formally planned release commands.



Distinguish:



* currently available;

* documented future interface;

* intentionally unsupported.



Do not create fake signing, provenance, SBOM, or release commands.



17. Prohibited and removed commands



Include a section explicitly stating that the repository does not support:



tools/build-repository-database.py

zig build database

SQLite generation

binary index generation

rendered graph generation as part of repository indexing



Explain that deterministic JSON indexes replace the database layer.



COMMANDS.md SYNCHRONIZATION



COMMANDS.md must not become another manually drifting source of truth.



Implement a text-only checker:



tools/check-command-reference.py



The checker must compare COMMANDS.md against:



* build.zig command definitions;

* known Python CLI entrypoints;

* known Node CLI entrypoints;

* modules.json;

* canonical module test metadata;

* recipe metadata;

* conformance metadata;

* generated repository indexes where appropriate.



It must detect:



* commands defined in code but absent from COMMANDS.md;

* commands documented as available but absent from the repository;

* stale tool paths;

* stale build-step names;

* obsolete flags;

* database commands that reappear;

* module commands missing from the generated section;

* commands marked verified without evidence where detectable.



Support:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py



Optionally support:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check



Do not create bytecode or binary caches.



Add the command-reference checker to:



* repository consistency checking;

* the future `zig build check` definition;

* CI validation;

* `zig build validate-repository`.



Do not execute Zig build commands during this Codex task.



README AND AGENTS INTEGRATION



Update README.md with a prominent link to:



COMMANDS.md



Use wording similar to:



For the complete repository command surface, operational workflows, status definitions, and validation commands, see COMMANDS.md.



Update AGENTS.md to require:



* consulting COMMANDS.md before inventing or guessing commands;

* updating canonical command definitions first;

* regenerating or validating the generated module-command section;

* running `tools/check-command-reference.py`;

* never documenting a command as available unless it exists;

* never claiming a command was verified unless it was executed successfully.



COMMAND REFERENCE VALIDATION



During this task, run only text-safe checks:



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py



PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check



Do not run either form if implementation would create bytecode; set `PYTHONDONTWRITEBYTECODE=1`.



Also inspect:



git diff -- COMMANDS.md tools/check-command-reference.py README.md AGENTS.md build.zig



Do not execute any compiler-driven command.



COMPLETION REQUIREMENTS FOR COMMANDS.md



This addendum is complete only when:



* root `COMMANDS.md` exists;

* every real repository command is discoverable from it;

* command statuses are honest;

* available and planned commands are clearly separated;

* every command states its source of truth;

* module command listings derive from canonical metadata;

* README.md links to it;

* AGENTS.md requires its use;

* a checker detects command-documentation drift;

* CI and repository consistency definitions include that checker;

* no database command is documented;

* no binary file is generated;

* no command is falsely marked verified.



FINAL REPORT ADDITIONS



Add these items to the final report:



55. COMMANDS.md created;

56. command categories documented;

57. available commands documented;

58. planned commands documented;

59. deprecated or prohibited commands documented;

60. module-specific commands indexed;

61. command-reference generated section created;

62. command-reference checker created;

63. command-reference drift result;

64. README command-manual link added;

65. AGENTS.md command-manual requirements added;

66. commands found in code but missing from documentation;

67. documented commands found to be nonexistent;

68. commands whose verification remains pending;

69. confirmation that `zig build database` is absent;

70. confirmation that no binary-generating command was executed.

28. TEXT-ONLY VALIDATION FOR THIS TASK



Run:



python3 --version

node --version



Run text-only validation commands such as:



python3 tools/build-repository-index.py



python3 tools/build-repository-index.py --check



python3 tools/build-dependency-graphs.py



python3 tools/query-reference.py status



python3 tools/query-reference.py capability "bounded binary parsing"



python3 tools/query-reference.py dependencies physical-page-frame-number-and-address-conversion



python3 tools/query-reference.py build-order hyper-zig



python3 tools/query-reference.py unvalidated



python3 tools/query-reference.py deprecated



python3 tools/module-contract-consistency-checker.py



node tools/check-port-contracts.js



node tools/format-port-contracts.js --check



node tools/portability-smoke-test.js only if it produces text output and does not invoke Zig or generate binaries.



Also run:



python3 -m compileall -q tools



Only if the resulting `__pycache__` and `.pyc` generation is disabled or avoided.



Prefer:



PYTHONDONTWRITEBYTECODE=1 python3 -m py_compile <specific files>



Do not execute any command that generates `.pyc` files.



Use:



PYTHONDONTWRITEBYTECODE=1



for Python tooling where appropriate.



Do not run:



zig build

zig test

zig run

zig build test

zig build smoke

zig build check

zig build validate-repository

tools/build-repository-database.py

sqlite3

graph rendering

archive creation

image generation

PDF generation

QEMU

kernel packaging

linkers

compilers producing output artifacts



Do not claim compiler-driven commands passed.



Instead, report:



* implemented but not executed;

* statically inspected;

* pending Zig 0.14.0 validation.



If another dependency is unavailable:



* complete all work not requiring it;

* report the exact dependency;

* do not fabricate success;

* provide exact local commands for later execution.



29. VERIFY THAT NO BINARY FILE WAS GENERATED



Before completion:



* inspect `git status`;

* inspect `git diff --stat`;

* inspect `git diff --numstat`;

* inspect all added and modified files;

* verify every added file is text;

* check for NUL bytes;

* ensure no `.pyc` files exist;

* ensure no `__pycache__` directories exist;

* ensure no Zig cache exists;

* ensure no build output exists;

* ensure no database exists;

* ensure no archive exists;

* ensure no rendered graph exists.



Use text-only checks.



Fail the task if any binary file was generated.



Do not merely leave a generated binary untracked.



It must not exist as a result of this task.



30. DO NOT OVERENGINEER THE FIRST PASS



Build strong foundations.



Do not attempt every imaginable future feature.



Prioritize:



* canonical truth;

* deterministic textual indexes;

* queryability;

* dependency graphs;

* capability discovery;

* maturity standards;

* lifecycle standards;

* validation evidence;

* ADRs;

* semantic contract versioning;

* deprecation infrastructure;

* composition recipes;

* conformance foundations;

* governance;

* RFCs;

* useful build definitions;

* CI definitions;

* repository health reporting.



Avoid:



* decorative dashboards;

* speculative ontology bloat;

* fake maturity;

* fake review evidence;

* fake compatibility;

* generated prose sludge;

* unnecessary frameworks;

* hosted services;

* database-first architecture;

* opaque state;

* duplicated facts;

* superficial tests;

* false completion claims.



A smaller system that is true, deterministic, and expandable is better than a large system filled with placeholders.



31. COMPLETION STANDARD



This task is complete only when:



* canonical truth is formally defined;

* all secondary textual views are generated or consistency-checked;

* repository indexes are deterministic;

* dependency graphs are derived from canonical contracts;

* JSON provides the complete query acceleration layer;

* no database infrastructure exists;

* query tooling works;

* capability aliases improve discovery;

* maturity is objective and evidence-backed;

* lifecycle status is recorded;

* validation evidence has a reproducible textual format;

* ADRs preserve architectural reasoning;

* semantic contract versioning is explicit;

* deprecation policy exists;

* recipes contain real compositions;

* initial conformance suites contain meaningful behavioral definitions;

* governance documents exist;

* RFC infrastructure exists;

* CI definitions validate the new infrastructure;

* root documentation remains clean;

* README and AGENTS.md reflect the standard;

* Zig 0.14.0 remains the baseline;

* no false validation claims are introduced;

* no binary file was generated during the task.



32. FINAL REPORT



Report:



1. repository state inspected;

2. canonical sources established;

3. generated textual files introduced;

4. files moved under docs;

5. stale links repaired;

6. module indexes generated;

7. port indexes generated;

8. dependency edges generated;

9. reverse-dependency edges generated;

10. cycles found;

11. capability aliases added;

12. query commands implemented;

13. maturity policy implemented;

14. lifecycle policy implemented;

15. validation evidence format implemented;

16. ADRs added;

17. semantic versioning policy added;

18. deprecation policy added;

19. recipes added;

20. recipe execution status;

21. conformance suites added;

22. conformance execution status;

23. property-test infrastructure added;

24. fuzz infrastructure added;

25. differential infrastructure added;

26. governance documents added;

27. RFC infrastructure added;

28. README changes;

29. AGENTS.md changes;

30. build commands defined;

31. CI changes;

32. exact Python version;

33. exact Node version;

34. exact text-only commands executed;

35. contract validation result;

36. generated-file drift result;

37. graph validation result;

38. query validation result;

39. compiler validation status;

40. unit-test status;

41. smoke-test status;

42. recipe-test status;

43. conformance-test status;

44. property-test status;

45. fuzz-test status;

46. differential-test status;

47. repository-validation status;

48. unresolved failures;

49. files requiring human review;

50. confirmation that SQLite was not created;

51. confirmation that no database generator was added;

52. confirmation that no binary file was generated;

53. method used to verify every changed file was text;

54. next highest-leverage infrastructure improvement.



FINAL STANDARD



The repository should no longer depend on memory, repeated searching, or manual duplication to remain coherent.



It should establish this standard:



Solved once, documented completely, reused forever.



Write truth once. Derive every view. Verify continuously.



Each module should make the next module easier.



Each composition should preserve the guarantees of its dependencies.



Each new agent run should begin with more verified knowledge than the run before it.



The repository should become endlessly buildable because its accumulated understanding is structured, searchable, testable, portable, explicit, and preserved.



Do not describe the repository as ahead of its time merely as marketing.



Make it ahead of its time through the quality of its contracts, evidence, architecture, transparency, and cumulative engineering discipline.
