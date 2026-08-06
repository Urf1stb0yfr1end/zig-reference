module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "42",
    "canonicalName": "fixed-capacity-priority-queue",
    "displayName": "Fixed Capacity Priority Queue",
    "directory": "projects/42-fixed-capacity-priority-queue",
    "publicEntrypoint": "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
    "detailsContract": "projects/42-fixed-capacity-priority-queue/details.json",
    "humanContract": "projects/42-fixed-capacity-priority-queue/DETAILS.md",
    "portContract": "projects/42-fixed-capacity-priority-queue/port.js"
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
      "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
    ],
    "publicEntrypoints": [
      "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
    ],
    "internalUnitTests": [
      "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
    ],
    "externalSmokeTests": [
      "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/42-fixed-capacity-priority-queue/README.md",
      "projects/42-fixed-capacity-priority-queue/MASTERY.md",
      "projects/42-fixed-capacity-priority-queue/DETAILS.md",
      "projects/42-fixed-capacity-priority-queue/details.json",
      "projects/42-fixed-capacity-priority-queue/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "FixedPriorityQueue"
    ],
    "publicTypes": [
      {
        "name": "FixedPriorityQueue",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented fixed-capacity-priority-queue public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [],
    "failureAtomicityToPreserve": [],
    "binaryLayoutsToPreserve": [],
    "compatibilityPromisesToPreserve": [],
    "intentionallyUnstableDetails": []
  },
  "dependencies": {
    "repository": [
      {
        "canonicalName": "fixed-capacity-vector",
        "portContract": "projects/00-fixed-capacity-vector/port.js",
        "importName": "fixed-capacity-vector",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.math.maxInt",
      "std.mem.swap",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
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
            "path": "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @as behavior as exercised by this module",
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
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.swap",
        "symbols": [
          "std.mem.swap"
        ],
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ],
        "purpose": "implementation support",
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
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
          "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig"
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
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.maxInt"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-fixed-capacity-priority-queue",
    "smokeTestStep": "smoke-fixed-capacity-priority-queue",
    "namedModuleImport": "fixed-capacity-priority-queue",
    "sourcePath": "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
    "directModuleDependencies": [
      "fixed-capacity-vector"
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
      "test-fixed-capacity-priority-queue",
      "smoke-fixed-capacity-priority-queue"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "yes",
    "freestanding": "yes",
    "targets": [],
    "endianSensitive": false,
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
    "builtins": [],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [
      "@as"
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
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
    ],
    "smokeTests": [
      "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
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
        "FixedPriorityQueue"
      ],
      "affectedFiles": [
        "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-fixed-capacity-priority-queue",
        "zig build smoke-fixed-capacity-priority-queue"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented fixed-capacity-priority-queue public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "FixedPriorityQueue"
      ],
      "detectionTests": [
        "zig build test-fixed-capacity-priority-queue",
        "zig build smoke-fixed-capacity-priority-queue"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-vector"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector",
      "fixed-capacity-priority-queue"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-fixed-capacity-priority-queue",
      "zig build smoke-fixed-capacity-priority-queue"
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
      "projects/42-fixed-capacity-priority-queue/port.js",
      "projects/42-fixed-capacity-priority-queue/details.json",
      "projects/42-fixed-capacity-priority-queue/DETAILS.md",
      "projects/00-fixed-capacity-vector/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-fixed-capacity-priority-queue"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector",
      "fixed-capacity-priority-queue"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.math.maxInt",
      "std.mem.swap",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.math.maxInt",
      "std.mem.swap",
      "std.testing.expectEqual",
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
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
          "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ]
      },
      {
        "api": "std.mem.swap",
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig",
          "projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "FixedPriorityQueue",
        "file": "projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig"
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
