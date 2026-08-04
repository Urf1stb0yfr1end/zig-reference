# Module lifecycle

Lifecycle expresses maintenance intent, not test evidence.

| State | Entry requirement | Exit requirement |
|---|---|---|
| Proposed | Accepted capability record; no implementation implied. | Implementation begins or proposal is archived. |
| Experimental | Real source exists; contract may change. | Required contract is complete and ownership is assigned. |
| Active | Complete contract, maintained public surface, and applicable checks defined. | Stability evidence is approved, or deprecation begins. |
| Stable | Calculated maturity 9, maintenance policy, system proof, reuse, and independent review. | A breaking replacement is approved. |
| Deprecated | Reason, version, support policy, migration guidance, and replacement when one exists. | Support policy permits supersession or archival. |
| Superseded | Active replacement and compatibility implications are documented. | Removal policy permits archival. |
| Archived | No routine maintenance; history and replacement remain discoverable. | Re-activation requires review as a new lifecycle transition. |

Age never promotes a module. Deprecation fields in `details.json` are empty only when not applicable. Query selection prefers an active replacement unless the caller names the deprecated module explicitly.
