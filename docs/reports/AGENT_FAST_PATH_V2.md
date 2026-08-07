# Agent Fast Path v2 measurements

Objective serialized UTF-8 byte counts; they are not token estimates. Measurements use committed generated indexes.

- Bootstrap output: **559 bytes**.
- Full fast-path modules: **7**.
- Partial modules: **45**.
- Manually authored v2 field groups per full module: **12**.
- Derived field groups per module: **11**.

| Module | Select bytes | Integrate bytes | Repair bytes | Files opened | Commands | Source needed |
|---|---:|---:|---:|---:|---:|---|
| `fixed-capacity-object-pool` | 1001 | 1479 | 570 | 0 | 1 per view | no |
| `fixed-free-list` | 948 | 1579 | 921 | 0 | 1 per view | no |
| `fixed-bump-allocator` | 1050 | 1795 | 960 | 0 | 1 per view | no |
| `fixed-capacity-priority-queue` | 1026 | 1830 | 965 | 0 | 1 per view | no |
| `fixed-capacity-topological-sort` | 1044 | 2091 | 1409 | 0 | 1 per view | no |
| `bounded-system-resource-plan` | 1107 | 2398 | 1619 | 0 | 1 per view | no |
| `bounded-deterministic-event-trace` | 1183 | 1635 | 1128 | 0 | 1 per view | no |

Representative selection, integration, composition, impact, and repair scenarios require no file opens: each is one query command after bootstrap. The previous routine route commonly required the generated query plus `details.json`, source, recipe metadata, and dependency queries.

Manually authored v2 fields are `selection_priority`, `alternatives`, `environment_constraints`, `resource_profile`, `construction`, `operation_map`, `error_map`, `composition`, `determinism`, `known_gaps`, `minimal_usage`, and `integration_notes`. Derived fields are direct/transitive dependencies and dependents, dependency build order, matching recipes, diagnostic IDs, focused validation commands, evidence summary, and change impact.
