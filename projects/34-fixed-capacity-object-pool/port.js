module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "34",
    "canonicalName": "fixed-capacity-object-pool",
    "displayName": "Fixed Capacity Object Pool",
    "directory": "projects/34-fixed-capacity-object-pool",
    "publicEntrypoint": "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
    "detailsContract": "projects/34-fixed-capacity-object-pool/details.json",
    "humanContract": "projects/34-fixed-capacity-object-pool/DETAILS.md",
    "portContract": "projects/34-fixed-capacity-object-pool/port.js"
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
      "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
    ],
    "publicEntrypoints": [
      "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
    ],
    "internalUnitTests": [
      "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
    ],
    "externalSmokeTests": [
      "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/34-fixed-capacity-object-pool/README.md",
      "projects/34-fixed-capacity-object-pool/MASTERY.md",
      "projects/34-fixed-capacity-object-pool/DETAILS.md",
      "projects/34-fixed-capacity-object-pool/details.json",
      "projects/34-fixed-capacity-object-pool/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ObjectPool"
    ],
    "publicTypes": [
      {
        "name": "ObjectPool",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented fixed-capacity-object-pool public behavior, boundaries, and failure semantics."
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
        "canonicalName": "bitmap-allocator",
        "portContract": "projects/07-bitmap-allocator/port.js",
        "importName": "bitmap-allocator",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "generational-handles",
        "portContract": "projects/08-generational-handles/port.js",
        "importName": "generational-handles",
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
            "path": "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
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
            "path": "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig",
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
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
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
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
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
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
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
    "unitTestStep": "test-fixed-capacity-object-pool",
    "smokeTestStep": "smoke-fixed-capacity-object-pool",
    "namedModuleImport": "fixed-capacity-object-pool",
    "sourcePath": "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
    "directModuleDependencies": [
      "bitmap-allocator",
      "generational-handles"
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
      "test-fixed-capacity-object-pool",
      "smoke-fixed-capacity-object-pool"
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
      "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
    ],
    "smokeTests": [
      "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
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
        "ObjectPool"
      ],
      "affectedFiles": [
        "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-fixed-capacity-object-pool",
        "zig build smoke-fixed-capacity-object-pool"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented fixed-capacity-object-pool public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ObjectPool"
      ],
      "detectionTests": [
        "zig build test-fixed-capacity-object-pool",
        "zig build smoke-fixed-capacity-object-pool"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bitmap-allocator",
      "generational-handles"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bitmap-allocator",
      "generational-handles",
      "fixed-capacity-object-pool"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-fixed-capacity-object-pool",
      "zig build smoke-fixed-capacity-object-pool"
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
      "projects/34-fixed-capacity-object-pool/port.js",
      "projects/34-fixed-capacity-object-pool/details.json",
      "projects/34-fixed-capacity-object-pool/DETAILS.md",
      "projects/07-bitmap-allocator/port.js",
      "projects/08-generational-handles/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-fixed-capacity-object-pool"
    ],
    "recommendedPortOrder": [
      "bitmap-allocator",
      "generational-handles",
      "fixed-capacity-object-pool"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
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
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig",
          "projects/34-fixed-capacity-object-pool/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "ObjectPool",
        "file": "projects/34-fixed-capacity-object-pool/src/fixed_capacity_object_pool.zig"
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
