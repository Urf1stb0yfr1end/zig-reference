# Evidence-derived maturity

Maturity is calculated from canonical structure and committed evidence, never self-awarded. A module may declare a target separately.

0. **Proposed:** planned, no implementation.
1. **Implemented:** real source exists.
2. **Contracted:** README, MASTERY, DETAILS, `details.json`, and `port.js` satisfy checks.
3. **Unit validated:** Zig 0.14.0 compiler validation and meaningful unit tests passed.
4. **Externally smoke tested:** a canonical named-import consumer passed.
5. **Advanced tested:** applicable property, fuzz, differential, or failure-injection evidence passed.
6. **Reused:** a repository dependent imports and exercises it.
7. **System proven:** a validated recipe or flagship system uses it.
8. **Independently reviewed:** a qualified reviewer and scope are recorded.
9. **Stable:** public contract, maintenance policy, evidence, review, reuse, and system proof meet the stability standard.

Levels require all prior applicable evidence. A test file, build step, elapsed age, declaration, or skipped command is not success. `generated/status.json` deliberately understates work lacking textual evidence.
