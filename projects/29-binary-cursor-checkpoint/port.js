module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "29",
    "canonicalName": "binary-cursor-checkpoint",
    "displayName": "Binary Cursor Checkpoint",
    "directory": "projects/29-binary-cursor-checkpoint",
    "publicEntrypoint": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
    "detailsContract": "projects/29-binary-cursor-checkpoint/details.json",
    "humanContract": "projects/29-binary-cursor-checkpoint/DETAILS.md",
    "portContract": "projects/29-binary-cursor-checkpoint/port.js"
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
      "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
    ],
    "publicEntrypoints": [
      "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
    ],
    "internalUnitTests": [
      "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
    ],
    "externalSmokeTests": [
      "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/29-binary-cursor-checkpoint/README.md",
      "projects/29-binary-cursor-checkpoint/MASTERY.md",
      "projects/29-binary-cursor-checkpoint/DETAILS.md",
      "projects/29-binary-cursor-checkpoint/details.json",
      "projects/29-binary-cursor-checkpoint/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "BinaryCursorCheckpoint",
      "capture",
      "restore"
    ],
    "publicTypes": [
      {
        "name": "BinaryCursorCheckpoint",
        "kind": "public declaration"
      },
      {
        "name": "capture",
        "kind": "public declaration"
      },
      {
        "name": "restore",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented binary-cursor-checkpoint public behavior, boundaries, and failure semantics."
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
        "canonicalName": "bounded-byte-reader",
        "portContract": "projects/04-bounded-byte-reader/port.js",
        "importName": "bounded-byte-reader",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig",
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
        "path": "std.testing.expectEqual",
        "symbols": [
          "std.testing.expectEqual"
        ],
        "files": [
          "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
          "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
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
          "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
          "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
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
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-binary-cursor-checkpoint",
    "smokeTestStep": "smoke-binary-cursor-checkpoint",
    "namedModuleImport": "binary-cursor-checkpoint",
    "sourcePath": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
    "directModuleDependencies": [
      "bounded-byte-reader"
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
      "test-binary-cursor-checkpoint",
      "smoke-binary-cursor-checkpoint"
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
      "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
    ],
    "smokeTests": [
      "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
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
        "BinaryCursorCheckpoint",
        "capture",
        "restore"
      ],
      "affectedFiles": [
        "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-binary-cursor-checkpoint",
        "zig build smoke-binary-cursor-checkpoint"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented binary-cursor-checkpoint public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "BinaryCursorCheckpoint",
        "capture",
        "restore"
      ],
      "detectionTests": [
        "zig build test-binary-cursor-checkpoint",
        "zig build smoke-binary-cursor-checkpoint"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bounded-byte-reader"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-byte-reader",
      "binary-cursor-checkpoint"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-binary-cursor-checkpoint",
      "zig build smoke-binary-cursor-checkpoint"
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
      "projects/29-binary-cursor-checkpoint/port.js",
      "projects/29-binary-cursor-checkpoint/details.json",
      "projects/29-binary-cursor-checkpoint/DETAILS.md",
      "projects/04-bounded-byte-reader/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-binary-cursor-checkpoint"
    ],
    "recommendedPortOrder": [
      "bounded-byte-reader",
      "binary-cursor-checkpoint"
    ],
    "searchTerms": [
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
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
        "builtin": "@as",
        "files": [
          "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
          "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
          "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig",
          "projects/29-binary-cursor-checkpoint/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "BinaryCursorCheckpoint",
        "file": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
      },
      {
        "symbol": "capture",
        "file": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
      },
      {
        "symbol": "restore",
        "file": "projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig"
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
