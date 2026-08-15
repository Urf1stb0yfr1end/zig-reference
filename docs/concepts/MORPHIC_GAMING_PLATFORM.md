# Morphic Gaming Platform

## Status

This document records a long-horizon product and research direction for Morphic. It is not a claim that the platform, developer tooling, performance advantages, commercial game compatibility, AI dialogue systems, or market position described here already exist.

The immediate Morphic program remains compatibility pressure and a small, bounded substrate. The gaming-platform direction becomes relevant only as real software, package installation, graphics, input, audio, storage, networking, and measurable workload specialization become sufficiently mature.

This document is the canonical home for Morphic's gaming-specific roadmap, benchmarks, developer-facing ideas, game-design experiments, and gaming Appliance Mode goals. The general Appliance Mode document should stay workload-neutral and point here for gaming details.

## The question

General-purpose computers are normally organized around coexistence. The operating system assumes many applications, services, caches, desktop components, update agents, daemons, and background tasks may need the machine at once.

But there is another legitimate operating model:

> What if, for a while, the user wants the entire computer to do one thing as well as the hardware can do it?

Morphic should explore that question directly.

For gaming, the long-term objective is a platform where a user can deliberately turn an ordinary computer into a temporary game appliance. The selected game and the minimum environment required to keep it correct receive nearly all usable machine resources. Everything else becomes optional.

This is not literal 100 percent ownership. Morphic itself, page tables, device state, compatibility machinery, storage metadata, display/input/audio paths, safety margins, and other irreducible mechanisms still consume resources. The intended contract is simpler:

> Everything the machine does not need in order to remain correct and run the selected game should be available to that game.

## Gaming as a first-class Appliance Mode

The gaming platform is the game-oriented expression of Morphic Appliance Mode.

A conventional path may resemble:

```text
firmware
  -> general-purpose OS
  -> init and services
  -> desktop session
  -> compositor
  -> launchers and background applications
  -> game
```

A mature Morphic appliance path should investigate how close it can move toward:

```text
firmware
  -> Morphic
  -> minimum required compatibility/runtime environment
  -> game
```

The important word is **minimum**. Morphic should not remove something merely because it looks unnecessary. It should learn, measure, and preserve the mechanisms the workload actually requires while making the remainder reclaimable or absent.

The game should not need to understand Morphic internals merely to benefit from this. Existing Linux-compatible games should first be able to run through ordinary compatibility. Native Morphic-aware games may later opt into stronger contracts.

## A CPU-and-memory-first game category

The platform should not try to win by pretending ordinary system RAM can replace a powerful GPU. It cannot.

GPU compute throughput, texture hardware, shader execution, video memory bandwidth, and other graphics capabilities impose real physical limits. A machine with an inadequate graphics processor will remain inadequate for workloads dominated by those capabilities.

That does not mean every interesting game must be dominated by GPU performance.

Morphic should deliberately cultivate a category of games whose primary ambition lies elsewhere:

- large simulations;
- many persistent agents or entities;
- large procedural worlds;
- memory-resident world state;
- deep strategy systems;
- heavy modding;
- emulation;
- large asset or data working sets;
- CPU-heavy AI and pathfinding;
- persistent state that remembers large amounts of player history;
- deterministic or low-jitter simulation;
- software-rendered, lightweight, 2D, sprite-based, low-poly, or scalable graphical presentation.

For these games, graphics can still use a GPU when one is present. The design goal is simply that the game's central value should not depend on owning an expensive discrete GPU.

A useful phrase for this category is **whole-machine games**: games designed around the assumption that, when the user chooses to play, the machine may temporarily be dedicated to them.

The long-term opportunity is not merely to run existing games. It is to make this resource model attractive enough that developers intentionally design new games around it.

## Sprite-first, 2D, RPG, and simulation-heavy design

A particularly promising design space is modern 2D and sprite-based software that deliberately spends hardware on world complexity rather than maximum rendering complexity.

Early videogames made heavy use of sprites, tilemaps, compact state, and reuse because hardware was constrained. Morphic does not need to imitate those limitations. The interesting inversion is to keep the presentation economical while spending modern CPU and RAM on systems that older machines could never sustain.

A game could therefore look intentionally simple while maintaining a very large internal world:

- tens of thousands of persistent characters;
- large towns and economies that continue to evolve off-screen;
- faction, migration, trade, weather, conflict, and relationship simulation;
- procedural histories and geography;
- large resident maps with little loading;
- huge inventories and object histories;
- complex quest and consequence state;
- unusually large mod sets;
- agent reasoning or local AI that would be impractical if the graphics stack consumed most of the machine budget.

This is especially attractive for RPGs, roguelikes, tactics games, colony simulators, management games, grand strategy, life simulations, and other genres where abstraction is already part of the aesthetic language.

The guiding design principle is:

> Spend hardware on the world, not merely on the pixels.

That is not an anti-GPU rule. A game should use hardware acceleration when it materially improves the experience. The point is that the game should remain valuable because of its systems, simulation, intelligence, persistence, or scale rather than because it requires a large graphics processor.

A visually modest game with an unusually alive world could be a better Morphic flagship than a visually spectacular game that is almost entirely shader-bound.

## Why ordinary laptops matter

The flagship hardware target should be common hardware, not an exotic gaming workstation.

Millions of machines have:

- 8 or 16 GiB of system RAM;
- a modest multicore CPU;
- integrated graphics or a modest GPU;
- limited or nonexistent GPU upgrade paths;
- shared system memory between CPU and integrated graphics;
- enough raw compute to run interesting software but little room for avoidable overhead.

Those machines make the hypothesis meaningful.

If Morphic can reduce operating-environment overhead, avoid unnecessary background CPU work, reduce memory pressure, avoid paging, improve frame-time consistency, and give the selected workload a larger predictable resource budget, the result may be materially better even when peak graphics throughput does not change.

The correct public question is not:

> Can RAM replace a GPU?

It is:

> How much more useful work can an ordinary machine perform when nearly the whole machine is intentionally organized around the workload the user chose?

## The 8 GiB and 16 GiB challenge

Morphic should eventually maintain fixed-hardware gaming challenges.

### 8 GiB challenge

Use an ordinary 8 GiB machine to test whether Morphic can make workloads practical that become unpleasant under heavier general-purpose environments because of memory pressure, paging, background activity, or limited shared memory.

Useful measures include:

- maximum playable simulation size;
- maximum stable entity count;
- maximum practical mod set;
- working-set size before paging;
- 1 percent and 0.1 percent frame-time lows;
- background CPU wakeups;
- total platform memory overhead;
- memory available to the game;
- load and save behavior under pressure.

### 16 GiB challenge

Use one fixed 16 GiB machine as the flagship whole-machine benchmark.

The experiment should compare, on the same hardware:

1. a conventional reference operating environment;
2. Morphic Normal Mode;
3. Morphic Appliance Mode.

The game build, workload, resolution, graphics settings, driver path where possible, and benchmark scene must remain fixed.

The result should report both wins and losses.

The strongest demonstration may not be a spectacular average-FPS increase. A more important result may be that Morphic allows a larger simulation, larger mod set, larger resident world, or more stable frame times because substantially more of the constrained machine is available to the game.

A future gaming-specific milestone could be named:

```text
★ 16 GiB MORPHIC GAME APPLIANCE ★
```

A credible acceptance contract would require one fixed physical machine, a real demanding game or equivalent interactive workload, real input/audio/storage/runtime behavior, repeatable benchmark scenes, same-hardware reference comparisons, recorded platform overhead, recorded workload memory budget, frame-time or simulation-rate measurements, and publication of negative results as well as wins.

## Workload size is a gaming metric

For this platform, frames per second should not be the only headline metric.

Morphic should also measure **maximum useful workload on fixed hardware**.

Examples:

- largest world that remains responsive;
- largest mod collection that fits without destructive memory pressure;
- largest Java or managed-runtime heap that remains practical;
- highest entity population at a target simulation rate;
- largest procedural region held resident;
- maximum number of simultaneous agents at a fixed update rate;
- maximum simulation complexity at acceptable frame times;
- maximum emulator configuration that remains stable;
- largest persistent state set that can remain hot in memory.

This matters because a platform can create genuine user value without manufacturing additional GPU shader throughput. Allowing the same inexpensive machine to sustain a materially larger game world is itself a performance result.

## Small local language models as a world-language layer

A whole-machine game does not need to make every NPC an autonomous chatbot. That would be expensive, difficult to control, and often unnecessary.

A more practical model is to let the game own facts, rules, quests, consequences, relationships, and simulation state while a small local language model performs narrowly bounded language work.

The central rule is:

> The game decides meaning. The model decides wording.

Most NPC speech can be stateless or nearly stateless. The engine can provide a small structured situation such as:

```text
SCENE
place=market
weather=cold
time=morning

SPEAKER
role=merchant
temperament=warm
relationship=neutral
player_visits_today=2

INTENT
greet
mention_weather
acknowledge_repeat_visit

OUTPUT
one_short_utterance
```

A small model may then produce something natural such as a greeting that mentions the cold and recognizes that the player has returned. It does not need a complete transcript, a vector database, or a biography to perform that task.

The format should be environment-agnostic. A medieval RPG, space game, western, simulation, or modern setting can all provide the same kinds of compact semantic fields while the game-specific engine remains the authority on what is true.

This suggests a reusable **small-LLM dialogue format** whose purpose is not to encode an entire game world but to communicate the minimum local context required to phrase an utterance.

## Structured meaning, generated language, selective memory

The preferred architecture is:

```text
game simulation
    |
    | chooses facts, intent, relationship and consequence
    v
compact dialogue/request state
    |
    v
small local language model
    |
    | generates wording only
    v
player-visible utterance
```

The model should not be trusted to invent authoritative quest state, item ownership, geography, combat outcomes, or persistent world facts unless the game explicitly asks it to propose a bounded value that the engine then validates.

This keeps the system deterministic where determinism matters and generative where variation is useful.

Memory should be spent selectively rather than universally.

A useful tier model is:

- **Tier 0: canned/static.** No model call is needed for fixed UI or highly repeated utility speech.
- **Tier 1: stateless contextual utterance.** The engine supplies the immediate setting, role, mood, and intent. No conversation history is retained.
- **Tier 2: tiny episodic state.** The NPC knows compact facts such as `player_seen_today=2`, `player_helped_me=true`, `trust=-1`, or `topic_weather_used=3`.
- **Tier 3: quest or journey continuity.** A recurring NPC receives the relevant mission state, relationship changes, recent decisions, and a short sequence summary.
- **Tier 4: major-character continuity.** Important characters may receive richer structured memories, selected prior events, and longer chained conversation state where the narrative justifies the cost.

Most NPCs should live at Tier 1 or Tier 2.

A background shopkeeper does not need a lifelong transcript to say a different version of "cold day" or "back again?". The engine can remember only tiny repetition metadata, for example:

```text
topic=weather_cold
usage_count=3
recent_variant_ids=12,41,7
instruction=express the same idea differently
```

The next utterance can then vary without carrying the full previous dialogue.

For major characters, sequence continuity can be chained through compact state summaries rather than retaining every generated token forever. A mission conversation might persist facts such as:

```text
player_refused_job=true
character_offended=true
trust_delta=-2
next_topic=possible_reconsideration
```

Later dialogue can naturally continue from those facts without requiring the model itself to "remember" the entire prior conversation.

## Small models as coordinators, not world authorities

A small local model may also help coordinate bounded high-level influences when the game requests them: tone selection, social response, short-term intent, rumor phrasing, or choosing among engine-approved behavioral options.

The model should still operate inside a narrow contract. A typical decision request might provide a few traits and current facts and ask the model to choose among legal intents rather than giving it unrestricted control of the world.

For example:

```text
ROLE=villager
traits=cautious,loyal
context=town_attacked,player_trusted
legal_intents=hide,help_wounded,carry_supplies
output=intent,tone
```

The engine validates the returned intent and performs the actual simulation.

This architecture means a single small model can service many characters because most characters are not asking for inference continuously. Ordinary schedules, movement, pathfinding, combat, inventory, economy, and quest mechanics remain normal game code.

Inference can be opportunistic and asynchronous. If a character is off-screen, a one- or two-second CPU inference may be perfectly acceptable. A mature Morphic appliance could eventually schedule interactive rendering and input at high priority while using otherwise idle CPU capacity for low-priority NPC language or reasoning work.

The important design goal is not "every NPC is an LLM." It is:

> Every NPC can participate in a persistent simulated world, and the game can spend generative reasoning only when language or bounded judgment is actually useful.

## Why this fits whole-machine gaming

A sprite or 2D RPG can keep graphical demands modest while deliberately using CPU and RAM for simulation, resident state, procedural systems, and a small local model.

That creates a workload profile that is unusually aligned with Morphic's thesis:

```text
modest renderer
+ large simulation
+ large resident world state
+ small local language model
+ selective memory
+ whole-machine CPU/RAM budget
```

The user does not need an expensive discrete GPU for the central game mechanic to be meaningful. A GPU or integrated graphics path can still accelerate presentation when available, but the valuable part of the machine is increasingly its general-purpose compute and memory.

This is one of the strongest candidate areas for future collaboration with game developers because the game can be designed around a predictable machine budget rather than merely ported after the fact.

## Developer-facing goal

A mature Morphic gaming platform should make whole-machine specialization easy for developers rather than requiring them to understand kernel internals.

An eventual workload manifest or SDK could let a game describe requirements and preferences such as:

```text
workload: game
resource-policy: appliance
memory: all-available
cpu: all-available
latency: interactive
graphics: optional | required
audio: required
network: optional
persistent-storage: required
background-services: minimum
local-language-model: optional
```

This is only a conceptual interface. The actual contract must be designed from measured requirements and should remain small, capability-oriented, and hardware-aware.

The platform should distinguish between:

- **required resources**, without which the game cannot run correctly;
- **preferred resources**, which improve the experience when available;
- **reclaimable platform resources**, which Morphic can yield under pressure;
- **optional hardware acceleration**, which the game may exploit without making it the sole basis of the experience;
- **optional inference resources**, which may be scheduled opportunistically without compromising input or simulation latency.

The goal is predictable ownership, not benchmark cheating.

## A genre and a platform can reinforce each other

The strategic aspiration is for Morphic to become the natural platform for whole-machine, CPU-and-memory-first games.

That would require more than naming the category. Morphic would have to earn the position by supplying a better environment for this class of software.

The reinforcing loop would be:

```text
Morphic proves measurable whole-machine advantages
        |
        v
developers can target a predictable CPU/RAM budget
        |
        v
games become possible or scale further on ordinary hardware
        |
        v
users have a concrete reason to boot Morphic
        |
        v
more developers have a reason to support the platform
```

If this loop becomes real, developers may eventually design for the assumption that a Morphic appliance owns most of the machine rather than merely treating Morphic as another operating-system port.

That is the point where the gaming direction becomes a platform rather than an optimization feature.

## What becoming a de facto standard would require

Market leadership is an aspiration, not a technical consequence of having a small kernel.

For Morphic to become a de facto standard for this category, it would need to earn several things:

1. **Measured advantage.** Fixed-machine tests must demonstrate meaningful benefits for workloads that actually care about CPU time, memory capacity, memory pressure, latency, or background interference.
2. **Easy deployment.** A user should eventually be able to choose a game appliance and enter it without becoming a systems engineer.
3. **Developer simplicity.** Supporting Morphic should be inexpensive enough that independent developers can justify it.
4. **Stable contracts.** Games need predictable interfaces, versioning, resource semantics, persistence, input, audio, networking, graphics, and optional inference behavior.
5. **Hardware breadth.** The useful target is ordinary consumer hardware, especially constrained laptops and desktops.
6. **Independent software.** Third-party developers must demonstrate that the platform is not merely optimized for Morphic's own benchmark programs.
7. **Reproducible benchmarks.** Public claims should be independently repeatable.
8. **Trustworthy failure behavior.** A game appliance must not gain performance by sacrificing data integrity, security, recovery, or predictable exit behavior.
9. **A recognizable compatibility mark.** If the platform matures sufficiently, a small certification profile could define what "Morphic Whole-Machine Compatible" means.
10. **A real software catalog.** A platform becomes a standard because useful software chooses it, not because the repository declares itself one.

The objective is therefore not to claim market ownership in advance. It is to build the conditions under which developers could rationally choose Morphic as the reference platform for this style of game.

## Compatibility and game pressure ladder

The gaming pressure ladder should progress from easy proof to increasingly demanding real software.

### Stage 1: Doom / Freedoom

Purpose:

- first complete graphical game loop;
- keyboard/mouse input;
- timers and files;
- audio where available;
- save/load state;
- clean exit back to the desktop or shell.

Doom is a beginning, not the performance demonstration.

### Stage 2: Quake-family engine

Purpose:

- higher-resolution real-time 3D;
- stronger input/timing pressure;
- OpenGL/SDL-class paths depending on the selected engine;
- network and audio pressure;
- repeatable timedemo-style measurements where available.

### Stage 3: OpenArena / Quake III-class workload

Purpose:

- mature 3D engine workload;
- stronger renderer pressure;
- multiplayer/network paths;
- repeatable benchmark behavior;
- clear frame-time comparison against another OS on the same hardware.

### Stage 4: Xonotic

Purpose:

- richer renderer and asset load;
- desktop graphics integration;
- audio/network/input pressure;
- higher memory and CPU demand than earlier stages;
- a visually credible public demonstration.

### Stage 5: SuperTuxKart

Purpose:

- larger asset set;
- more complex scene/render behavior;
- broader graphical/media library pressure;
- broader package-manager and dynamic-library proof;
- frame-time and memory-overhead benchmarking.

### Stage 6: CPU-heavy simulation / strategy / RPG workload

This is where Morphic should deliberately shift from "can it run graphics?" toward "does whole-machine specialization create a meaningful advantage?"

Suitable workloads should pressure:

- many active entities;
- pathfinding and simulation;
- memory allocation churn;
- large resident state;
- managed runtimes where relevant;
- mod systems;
- long-frame spikes and simulation-rate stability;
- optional local AI or small-model inference.

### Stage 7: commercial native-Linux or compatibility-layer game

Only after the open-source ladder is stable should Morphic attempt mainstream commercial workloads. Requirements may include launchers, broader libc assumptions, Vulkan/OpenGL maturity, gamepad support, audio, networking, DRM/runtime dependencies, and larger memory footprints.

The title should be selected for reproducibility, benchmarkability, legal availability, and hardware fit rather than popularity alone.

### Stage 8: demanding 8/16 GiB flagship

The eventual flagship should be a workload heavy enough that operating-system overhead actually matters on ordinary constrained hardware.

The experiment should hold hardware, workload, settings, game version, and benchmark scene constant while comparing a conventional reference environment, Morphic Normal Mode, and Morphic Appliance Mode.

Meaningful outcomes include:

- the workload fits without swapping where the reference environment does not;
- materially more RAM is available to the game;
- simulation scale increases;
- mod capacity increases;
- frame-time spikes decrease;
- 1 percent lows improve;
- background CPU wakeups collapse;
- loading behavior improves due to workload-directed cache policy;
- equivalent performance is achieved with materially less platform overhead.

## Browser-mediated desktop as an early bridge

A browser-accessible desktop can be an early development bridge before Morphic has a complete local graphics/input device stack.

Conceptually:

```text
host browser
    |
mouse + keyboard + display transport
    |
Morphic-hosted Alpine graphical session
    |
real X/desktop applications and games
```

This can provide genuine interactive mouse and keyboard control while the host browser temporarily handles presentation and input transport.

It should be labeled accurately: it proves the graphical userspace and interaction path, not native local GPU/input support or final gaming performance.

This bridge can accelerate the game ladder because Doom, Quake, and later graphical applications can pressure real userspace semantics before native local graphics/input work is complete.

## Relationship to apk and the Alpine software world

A working `apk` is a major prerequisite because it turns Alpine into a self-extending compatibility pressure source.

Once package installation is genuinely reliable, Morphic can use real packages rather than hand-porting each application.

The ideal early story is not:

> Morphic contains a custom implementation for each game.

It is:

> Alpine installed an ordinary application, Morphic supplied the general semantics it required, and the application ran without a Morphic-specific compatibility path.

Native whole-machine games can come later, after the compatibility path has already proved that Morphic is not merely special-casing its demos.

## Native whole-machine games

Once compatibility and the workload contract are mature, Morphic can invite developers to build games that intentionally exploit the model.

A native whole-machine game might assume that:

- the selected process tree can request nearly all reclaimable memory;
- background services can be reduced to a documented minimum;
- CPU cores can be reserved or assigned predictably;
- the runtime can expose exact resource budgets;
- large state can remain resident where the hardware permits;
- optional GPU acceleration can be used without making an expensive GPU mandatory;
- local inference can be treated as a bounded optional resource;
- exiting the appliance returns the machine to a general-purpose environment safely.

That would support game designs whose scale is difficult to guarantee under an ordinary multitasking desktop.

Possible design directions include enormous simulations, persistent worlds, agent-heavy strategy games, 2D or sprite RPGs, unusually large mod systems, procedural universes, software-rendered experimental games, and games whose complexity is intentionally spent on systems rather than graphics fidelity.

## Developer collaboration goal

If the platform reaches measurable maturity, Morphic should actively seek collaboration with game developers rather than assuming developers will discover the model on their own.

The strongest collaborations would be with teams whose games are naturally constrained by CPU, RAM, simulation scale, persistence, modding, or managed-runtime overhead rather than raw GPU throughput.

The ideal progression is:

1. prove the whole-machine budget on existing software;
2. publish a tiny stable resource contract;
3. build one or more reference games or open demonstrations;
4. work with independent developers to reproduce the advantage without Morphic-specific benchmark tricks;
5. help developers design new games around a predictable machine budget;
6. establish a compatibility/profile mark only after multiple independent games satisfy the contract.

The platform should be judged by whether independent developers can create better experiences for ordinary hardware, not by whether Morphic can produce impressive internal demos.

## What Morphic should never promise

The gaming platform must remain technically credible.

It should never claim that:

- RAM substitutes for arbitrary GPU compute;
- a tiny kernel automatically makes every game faster;
- all 8 or 16 GiB of a machine can literally be handed to a game;
- integrated graphics become equivalent to high-end discrete graphics;
- games that are purely GPU-bound will necessarily benefit materially;
- a small language model automatically creates believable NPCs;
- generated dialogue can replace authoritative game state;
- dedicated execution excuses incorrect compatibility behavior;
- benchmark-specific special cases count as general mechanisms;
- ordinary security, persistence, recovery, or correctness can be discarded merely for higher benchmark numbers.

A negative benchmark is useful information. The project should deliberately discover the boundary where Morphic specialization ceases to matter because the underlying hardware becomes the dominant limit.

## Long-horizon gaming-platform goals

A mature Morphic gaming platform should aim to demonstrate all of the following:

- boot an ordinary machine directly into a selected game appliance;
- run real packaged games without Morphic-specific compatibility hacks;
- provide interactive graphics, mouse, keyboard, controller, audio, storage, and networking where required;
- expose a measured resource budget to the selected game;
- allow nearly all safely reclaimable RAM to become workload-available;
- make CPU allocation and background interference explicit rather than accidental;
- support software-rendered and GPU-accelerated games according to the hardware actually present;
- make 8 GiB and 16 GiB consumer machines first-class benchmark targets;
- publish workload-scale metrics in addition to FPS;
- provide a small developer-facing whole-machine contract;
- provide a compact environment-agnostic small-LLM dialogue/request format if local generative dialogue proves useful;
- make stateless contextual utterances cheap enough for large populations while reserving richer memory for quests and major characters;
- support independent games intentionally designed around CPU and memory abundance rather than maximum GPU demand;
- make 2D, sprite, RPG, simulation, strategy, and persistent-world designs first-class examples rather than treating them as lesser graphical workloads;
- make entering and leaving Appliance Mode safe and understandable to ordinary users;
- demonstrate meaningful gains on identical hardware before making performance claims;
- cultivate an ecosystem in which whole-machine games are a recognizable software category;
- become, if the evidence and ecosystem justify it, the reference platform developers think of when they want a game to temporarily use almost the entire useful machine.

The underlying question is intentionally simple:

> If the user has chosen one application as the purpose of the machine right now, how much of the machine can we responsibly give to it?

For the gaming-platform direction, Morphic's job is to make the answer measurable, safe, portable, and useful enough that developers can build around it.

## Relationship to Morphic's larger mission

Gaming is not a replacement for Morphic's compatibility research. It is a particularly visible application of the same philosophy.

Morphic learns the semantics real software actually requires, keeps the durable substrate small, and avoids permanently inheriting unnecessary operating-system machinery. Whole-machine gaming extends that principle from compatibility into resource ownership.

The long-term progression is therefore:

```text
inherit enough semantics to run real software
        |
        v
measure what the workload actually requires
        |
        v
remove or reclaim what it does not require
        |
        v
give the recovered machine budget back to the workload
        |
        v
make that budget predictable enough for developers to design around
```

If that progression works, the gaming platform is not a side identity or an admission that Morphic cannot decide what it is. It is one concrete expression of what a mature Morphic substrate should make possible: real software inheriting the machine resources it needs without dragging an unnecessarily large operating world along with it.