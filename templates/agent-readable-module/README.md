# Agent-readable module migration checklist

1. Query the repository and read the canonical `details.json`, `DETAILS.md`, source, tests, dependencies, and recipes.
2. Add the optional `agent_contract` without replacing existing contract prose.
3. Use controlled values and explicit empty objects/arrays; add only supported diagnostics.
4. Add `PROOF.json` only for useful evidence claims; tests are evidence, not formal proof.
5. Add honest fixtures and repairs under `tests/agent/`, then update `expectations.json`.
6. Regenerate `generated/agent/`; run contract, negative, determinism, module, and repository checks.
