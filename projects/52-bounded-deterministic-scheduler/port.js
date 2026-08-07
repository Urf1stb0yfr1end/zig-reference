module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "52",
    "canonicalName": "bounded-deterministic-scheduler",
    "displayName": "Bounded Deterministic Scheduler",
    "directory": "projects/52-bounded-deterministic-scheduler",
    "publicEntrypoint": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
    "detailsContract": "projects/52-bounded-deterministic-scheduler/details.json",
    "humanContract": "projects/52-bounded-deterministic-scheduler/DETAILS.md",
    "portContract": "projects/52-bounded-deterministic-scheduler/port.js"
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
      "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
    ],
    "publicEntrypoints": [
      "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
    ],
    "internalUnitTests": [
      "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
    ],
    "externalSmokeTests": [
      "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/52-bounded-deterministic-scheduler/README.md",
      "projects/52-bounded-deterministic-scheduler/MASTERY.md",
      "projects/52-bounded-deterministic-scheduler/DETAILS.md",
      "projects/52-bounded-deterministic-scheduler/details.json",
      "projects/52-bounded-deterministic-scheduler/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Task",
      "BoundedDeterministicScheduler"
    ],
    "publicTypes": [
      {
        "name": "Task",
        "kind": "public declaration"
      },
      {
        "name": "BoundedDeterministicScheduler",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented bounded-deterministic-scheduler public behavior, boundaries, and failure semantics."
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
        "canonicalName": "fixed-capacity-priority-queue",
        "portContract": "projects/42-fixed-capacity-priority-queue/port.js",
        "importName": "fixed-capacity-priority-queue",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@compileError"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
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
            "path": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig",
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
        "name": "@compileError",
        "files": [
          {
            "path": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @compileError behavior as exercised by this module",
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
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
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
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
          "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
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
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
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
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-deterministic-scheduler",
    "smokeTestStep": "smoke-bounded-deterministic-scheduler",
    "namedModuleImport": "bounded-deterministic-scheduler",
    "sourcePath": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
    "directModuleDependencies": [
      "fixed-capacity-priority-queue"
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
      "test-bounded-deterministic-scheduler",
      "smoke-bounded-deterministic-scheduler"
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
    "pointerSensitive": false,
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
      "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
    ],
    "smokeTests": [
      "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
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
        "Task",
        "BoundedDeterministicScheduler"
      ],
      "affectedFiles": [
        "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-deterministic-scheduler",
        "zig build smoke-bounded-deterministic-scheduler"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-deterministic-scheduler public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Task",
        "BoundedDeterministicScheduler"
      ],
      "detectionTests": [
        "zig build test-bounded-deterministic-scheduler",
        "zig build smoke-bounded-deterministic-scheduler"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-priority-queue"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-priority-queue",
      "bounded-deterministic-scheduler"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-deterministic-scheduler",
      "zig build smoke-bounded-deterministic-scheduler"
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
      "projects/52-bounded-deterministic-scheduler/port.js",
      "projects/52-bounded-deterministic-scheduler/details.json",
      "projects/52-bounded-deterministic-scheduler/DETAILS.md",
      "projects/42-fixed-capacity-priority-queue/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-deterministic-scheduler"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-priority-queue",
      "bounded-deterministic-scheduler"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@compileError",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@compileError",
      "std.testing.expect",
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
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
          "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig",
          "projects/52-bounded-deterministic-scheduler/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Task",
        "file": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
      },
      {
        "symbol": "BoundedDeterministicScheduler",
        "file": "projects/52-bounded-deterministic-scheduler/src/bounded_deterministic_scheduler.zig"
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
