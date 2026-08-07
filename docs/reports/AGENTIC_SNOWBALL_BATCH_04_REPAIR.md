# Agentic Snowball Batch 04 Repair

## Baseline and environment

The repair began from commit `ea88032` with Zig 0.14.0. The requested `.venv` was absent in this checkout, so it was created and the existing `tools/requirements.txt` was installed with `uv`; `jsonschema` 4.26.0 then imported successfully. No dependency declaration changed.

The independent-review defects were reproduced: all ten Batch 04 cards used test-only declaration traversal instead of integration, and build-child handoffs could precede Zig's final summary or misleadingly report a nested PASS.

## Canonical card repairs

| Module | Functional construction and minimal use |
|---|---|
| ring-buffer | Instantiate `RingBuffer(u8, 4){}`, then `push` and `pop`. |
| stack | Call `Stack(u8).init(allocator)`, `defer deinit`, then `push` and `pop`. |
| state-machine | Instantiate `StateMachine(State, Event, transition).init(initial_state)` and call `apply`. |
| nonzero-integer | Construct `NonZeroInteger(u32)` and call `init` then `get`. |
| saturating-counter | Construct `SaturatingCounter(u8, 10).init`, increment, then read. |
| wrapping-sequence-number | Construct `WrappingSequenceNumber(u8).init`, call `next`, then read. |
| optional-typed-handle | Construct `TypedHandle(ResourceTag, u32)` and assign it to `OptionalTypedHandle`. |
| unit-safe-quantity | Construct a tagged `Quantity`, add same-unit values, then read. |
| validated-ascii-byte | Call `AsciiByte.init` and `get`. |
| fourcc-code | Call `FourCC.fromString` and `asBytes`. |

The cards now list their real generic parameters. Error attribution was narrowed to `RingBuffer.push`, `StateMachine.apply`, `NonZeroInteger.init`, `AsciiByte.init`, and `FourCC.fromString`. Stack is now described as unbounded, allocator-backed dynamic storage with caller-required `deinit`; allocator lifetime and mutation/deinitialization effects are explicit.

## Developer Minimus repair

Previously, build children printed PASS handoffs before Zig printed its Build Summary, and aggregate prerequisites could expose a subordinate PASS before outer failure. Raw Zig steps now produce only ordinary build output. `tools/developer-command.py` is the single canonical outer driver for smoke, complete validation, Morphic plan verification, and Morphic trace verification. It streams the underlying command, waits for its final exit, then emits exactly one outer `LOCATIONS` / `MINIMUS` and returns the original status. Direct Agent Fast Path doctor remains self-contained.

The controlled regression fixtures proved a successful Build Summary precedes one PASS handoff and exit 0, while exit 7 precedes one FAIL handoff, contains no subordinate PASS, and remains exit 7. Canonical commands are documented in `COMMANDS.md`.

## Frontier and validation

Deterministic generation retained 52 contracted modules: 47 full and 5 partial. The pending frontier remains exactly `semantic-version`, `tagged-result`, `source-span`, `owned-byte-buffer`, and `intrusive-doubly-linked-list`; none was migrated. Agent-index regeneration was repeated and the second pass produced no diff. The repair ran the focused cards, formatter/schema/index/manual checks, Minimus success/failure regressions, module tests, smoke, Morphic verification, repository build gates, root-policy negative fixture, and text-only policy checks. Validation evidence was regenerated after build wiring changed so digest truth remained current.

No Batch 05 or benchmark work was started. Zig remains 0.14.0.
