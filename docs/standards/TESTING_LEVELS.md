# Testing levels

Static contract checking proves metadata coherence, not Zig behavior. Unit tests cover local success, boundary, empty/full, overflow, cleanup, and failure atomicity. External smoke tests prove named-import usability. Recipes prove cross-module orchestration; conformance adapters prove a behavioral family without demanding identical APIs. Property, fuzz, differential, failure-injection, and system tests are assigned according to risk.

Every claim names the command, Zig version, target, result, and evidence record. Skipped work remains skipped. Parser, arithmetic, allocator, ownership, and stale-identity code receive stronger testing than trivial type aliases. Aggregate steps may have no eligible target; that is a valid infrastructure result but grants no module maturity.
