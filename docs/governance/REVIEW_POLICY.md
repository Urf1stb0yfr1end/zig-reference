# Review policy

Review correctness and contracts together. Verify canonical identity, public endpoints, failure atomicity, dependency/import agreement, Zig 0.14.0 APIs, generated drift, threat boundaries, and evidence. Schema, stable-contract, security-sensitive, and breaking changes require explicit owner approval; independent-review maturity requires a reviewer other than the author and a recorded scope.

Recommended branch protection requires pull requests, passing contract/index/graph/policy/format/unit/smoke gates, resolved conversations, and no force pushes to the protected branch. These are recommendations; repository files cannot prove hosted settings are enabled. CI uses minimal read permissions and must not use unsafe `pull_request_target` execution.
