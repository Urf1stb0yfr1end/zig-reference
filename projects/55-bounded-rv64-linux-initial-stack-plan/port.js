module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "55",
    "canonicalName": "bounded-rv64-linux-initial-stack-plan",
    "displayName": "Bounded Rv64 Linux Initial Stack Plan",
    "directory": "projects/55-bounded-rv64-linux-initial-stack-plan",
    "publicEntrypoint": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
    "detailsContract": "projects/55-bounded-rv64-linux-initial-stack-plan/details.json",
    "humanContract": "projects/55-bounded-rv64-linux-initial-stack-plan/DETAILS.md",
    "portContract": "projects/55-bounded-rv64-linux-initial-stack-plan/port.js"
  },
  "baseline": {
    "zigVersion": "0.14.0",
    "minimumSupportedVersion": "0.14.0",
    "maximumTestedVersion": "",
    "baselineCompilerValidated": false,
    "baselineUnitTestsPassed": false,
    "baselineSmokeTestsPassed": false,
    "lastValidatedCommit": "",
    "validationEvidence": [
      "Zig compiler was unavailable in the authoring environment; claims remain unverified."
    ]
  },
  "sourceInventory": {
    "implementationFiles": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
    ],
    "publicEntrypoints": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
    ],
    "internalUnitTests": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
    ],
    "externalSmokeTests": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/README.md",
      "projects/55-bounded-rv64-linux-initial-stack-plan/MASTERY.md",
      "projects/55-bounded-rv64-linux-initial-stack-plan/DETAILS.md",
      "projects/55-bounded-rv64-linux-initial-stack-plan/details.json",
      "projects/55-bounded-rv64-linux-initial-stack-plan/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "AuxEntry",
      "AuxValue",
      "Error",
      "GuestStackRange",
      "GuestVirtualAddress",
      "StackPlan",
      "at_null",
      "plan",
      "stack_alignment",
      "word_size"
    ],
    "publicTypes": [
      {
        "name": "AuxEntry",
        "kind": "public declaration"
      },
      {
        "name": "AuxValue",
        "kind": "public declaration"
      },
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "GuestStackRange",
        "kind": "public declaration"
      },
      {
        "name": "GuestVirtualAddress",
        "kind": "public declaration"
      },
      {
        "name": "StackPlan",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [
      {
        "name": "StackPlan",
        "signature": "StackPlan(comptime byte_capacity: usize) type"
      },
      {
        "name": "plan",
        "signature": "plan(comptime byte_capacity, argv_capacity, env_capacity, aux_capacity: usize, stack_range: GuestStackRange, argv: []const []const u8, envp: []const []const u8, auxv: []const AuxEntry) Error!StackPlan(byte_capacity)"
      }
    ],
    "publicMethods": [],
    "publicConstants": [
      {
        "name": "word_size",
        "type": "usize",
        "value": "8",
        "summary": "RV64 table word bytes."
      },
      {
        "name": "stack_alignment",
        "type": "usize",
        "value": "16",
        "summary": "RISC-V procedure-entry SP alignment."
      },
      {
        "name": "at_null",
        "type": "u64",
        "value": "0",
        "summary": "Auxiliary vector terminator key."
      }
    ],
    "publicErrors": [
      "EmptyArgv",
      "TooManyArgv",
      "TooManyEnv",
      "TooManyAuxv",
      "InteriorNul",
      "CallerSuppliedAtNull",
      "DuplicateAuxType",
      "InvalidSymbolicTarget",
      "AddressOverflow",
      "StackRangeTooSmall",
      "OutputCapacityExceeded"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bounded-rv64-linux-initial-stack-plan public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [
      "[object Object]"
    ],
    "failureAtomicityToPreserve": [],
    "binaryLayoutsToPreserve": [],
    "compatibilityPromisesToPreserve": [],
    "intentionallyUnstableDetails": []
  },
  "dependencies": {
    "repository": [
      {
        "canonicalName": "aligned-address-and-size-helpers",
        "portContract": "projects/15-aligned-address-and-size-helpers/port.js",
        "importName": "aligned-address-and-size-helpers",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-half-open-range",
        "portContract": "projects/17-checked-half-open-range/port.js",
        "importName": "checked-half-open-range",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "distinct-memory-address-types",
        "portContract": "projects/18-distinct-memory-address-types/port.js",
        "importName": "distinct-memory-address-types",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "endian-integer-codec",
        "portContract": "projects/22-endian-integer-codec/port.js",
        "importName": "endian-integer-codec",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.debug.assert",
      "std.math.add",
      "std.math.cast",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.indexOfScalar",
      "std.mem.readInt",
      "std.mem.sliceTo",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [
      "error unions"
    ],
    "versionSensitive": [
      "@This",
      "@as",
      "@intCast",
      "@max",
      "@memcpy"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @This behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @as behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intCast",
        "files": [
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intCast behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@max",
        "files": [
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @max behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @memcpy behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      }
    ],
    "notUsed": []
  },
  "standardLibraryUsage": {
    "imports": [
      {
        "path": "std.debug.assert",
        "symbols": [
          "std.debug.assert"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.add",
        "symbols": [
          "std.math.add"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.cast",
        "symbols": [
          "std.math.cast"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.mul",
        "symbols": [
          "std.math.mul"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.indexOfScalar",
        "symbols": [
          "std.mem.indexOfScalar"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.readInt",
        "symbols": [
          "std.mem.readInt"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.sliceTo",
        "symbols": [
          "std.mem.sliceTo"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
          "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqual",
        "symbols": [
          "std.testing.expectEqual"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
          "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualStrings",
        "symbols": [
          "std.testing.expectEqualStrings"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectError",
        "symbols": [
          "std.testing.expectError"
        ],
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [
      "std.mem.readInt"
    ],
    "mathApis": [
      "std.math.add",
      "std.math.cast",
      "std.math.maxInt",
      "std.math.mul"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-rv64-linux-initial-stack-plan",
    "smokeTestStep": "smoke-bounded-rv64-linux-initial-stack-plan",
    "namedModuleImport": "bounded-rv64-linux-initial-stack-plan",
    "sourcePath": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
    "directModuleDependencies": [
      "aligned-address-and-size-helpers",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec"
    ],
    "buildApisUsed": [
      "std.Build.createModule",
      "std.Build.addTest",
      "std.Build.addRunArtifact",
      "std.Build.Module.addImport",
      "std.Build.step"
    ],
    "rootModuleConfiguration": [
      "root_module"
    ],
    "targetConfiguration": [
      "standardTargetOptions"
    ],
    "optimizeConfiguration": [
      "standardOptimizeOption"
    ],
    "runArtifacts": [
      "test-bounded-rv64-linux-initial-stack-plan",
      "smoke-bounded-rv64-linux-initial-stack-plan"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "supported",
    "freestanding": "supported",
    "targets": [],
    "endianSensitive": true,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": false,
    "apis": [],
    "ownershipTransitions": [],
    "notes": []
  },
  "pointerAndMemoryUsage": {
    "pointerSensitive": true,
    "builtins": [
      "@memcpy"
    ],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [
      "@as",
      "@intCast"
    ],
    "overflowSemantics": [],
    "notes": []
  },
  "reflectionAndComptimeUsage": {
    "reflectionSensitive": false,
    "builtins": [],
    "comptimeParameters": [],
    "notes": []
  },
  "errorHandlingUsage": {
    "publicErrors": [
      "EmptyArgv",
      "TooManyArgv",
      "TooManyEnv",
      "TooManyAuxv",
      "InteriorNul",
      "CallerSuppliedAtNull",
      "DuplicateAuxType",
      "InvalidSymbolicTarget",
      "AddressOverflow",
      "StackRangeTooSmall",
      "OutputCapacityExceeded"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
    ],
    "smokeTests": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "semanticCoverage": []
  },
  "knownVersionChanges": [],
  "possibleMechanicalTransforms": [],
  "manualReviewRequired": [
    {
      "topic": "semantic and build compatibility",
      "reason": "Unknown future Zig releases can change inference, standard-library contracts, or build graph identity.",
      "affectedSymbols": [
        "AuxEntry",
        "AuxValue",
        "Error",
        "GuestStackRange",
        "GuestVirtualAddress",
        "StackPlan",
        "at_null",
        "plan",
        "stack_alignment",
        "word_size"
      ],
      "affectedFiles": [
        "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-rv64-linux-initial-stack-plan",
        "zig build smoke-bounded-rv64-linux-initial-stack-plan"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-rv64-linux-initial-stack-plan public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "AuxEntry",
        "AuxValue",
        "Error",
        "GuestStackRange",
        "GuestVirtualAddress",
        "StackPlan",
        "at_null",
        "plan",
        "stack_alignment",
        "word_size"
      ],
      "detectionTests": [
        "zig build test-bounded-rv64-linux-initial-stack-plan",
        "zig build smoke-bounded-rv64-linux-initial-stack-plan"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "aligned-address-and-size-helpers",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "aligned-address-and-size-helpers",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "bounded-rv64-linux-initial-stack-plan"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-rv64-linux-initial-stack-plan",
      "zig build smoke-bounded-rv64-linux-initial-stack-plan"
    ],
    "targetVersionCommands": [],
    "semanticTests": [],
    "layoutChecks": [],
    "compileErrorExpectations": [],
    "manualReviewSteps": [
      "Review compiler diagnostics against verified release notes.",
      "Compare public behavior, ownership, and failure semantics with the contracts."
    ],
    "successCriteria": [
      "All contract, unit, and smoke checks pass without semantic drift."
    ],
    "failureCriteria": [
      "Any unsupported-version claim, changed public behavior, or failing validation command."
    ]
  },
  "testedTargets": [],
  "untestedTargets": [
    {
      "zigVersion": ">0.14.0",
      "status": "not_tested",
      "expectedDifficulty": "unknown",
      "knownBlockers": [],
      "notes": [
        "Inspect verified release notes and compiler diagnostics before creating migration rules."
      ]
    }
  ],
  "agentInstructions": {
    "readFirst": [
      "projects/55-bounded-rv64-linux-initial-stack-plan/port.js",
      "projects/55-bounded-rv64-linux-initial-stack-plan/details.json",
      "projects/55-bounded-rv64-linux-initial-stack-plan/DETAILS.md",
      "projects/15-aligned-address-and-size-helpers/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/18-distinct-memory-address-types/port.js",
      "projects/22-endian-integer-codec/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-rv64-linux-initial-stack-plan"
    ],
    "recommendedPortOrder": [
      "aligned-address-and-size-helpers",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "bounded-rv64-linux-initial-stack-plan"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@intCast",
      "@max",
      "@memcpy",
      "std.debug.assert",
      "std.math.add",
      "std.math.cast",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.indexOfScalar",
      "std.mem.readInt",
      "std.mem.sliceTo",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@intCast",
      "@max",
      "@memcpy",
      "std.debug.assert",
      "std.math.add",
      "std.math.cast",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.indexOfScalar",
      "std.mem.readInt",
      "std.mem.sliceTo",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "doNotAssume": [
      "Compilation proves semantic or binary-layout compatibility.",
      "A newer std.Build API preserves module identity.",
      "Unknown future releases have a mechanical replacement path."
    ],
    "stopConditions": [
      "Stop before recording support when the exact target compiler and semantic tests have not run."
    ],
    "completionChecklist": [
      "Port dependencies first.",
      "Run contract checks, unit tests, and smoke tests.",
      "Record evidence without deleting baseline history."
    ]
  },
  "sourceMap": {
    "builtinsToFiles": [
      {
        "builtin": "@This",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
          "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@intCast",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "builtin": "@max",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.debug.assert",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.math.add",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.math.cast",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.math.mul",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.mem.indexOfScalar",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.mem.readInt",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.mem.sliceTo",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
          "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig",
          "projects/55-bounded-rv64-linux-initial-stack-plan/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualStrings",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "AuxEntry",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "AuxValue",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "Error",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "GuestStackRange",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "GuestVirtualAddress",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "StackPlan",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "at_null",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "plan",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "stack_alignment",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      },
      {
        "symbol": "word_size",
        "file": "projects/55-bounded-rv64-linux-initial-stack-plan/src/bounded_rv64_linux_initial_stack_plan.zig"
      }
    ]
  },
  "history": {
    "baselineEstablished": "Zig 0.14.0",
    "migrations": [],
    "notes": [
      "No later Zig target has been tested."
    ]
  }
};
