module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "43",
    "canonicalName": "fixed-capacity-topological-sort",
    "displayName": "Fixed Capacity Topological Sort",
    "directory": "projects/43-fixed-capacity-topological-sort",
    "publicEntrypoint": "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
    "detailsContract": "projects/43-fixed-capacity-topological-sort/details.json",
    "humanContract": "projects/43-fixed-capacity-topological-sort/DETAILS.md",
    "portContract": "projects/43-fixed-capacity-topological-sort/port.js"
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
      "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
    ],
    "publicEntrypoints": [
      "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
    ],
    "internalUnitTests": [
      "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
    ],
    "externalSmokeTests": [
      "projects/43-fixed-capacity-topological-sort/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/43-fixed-capacity-topological-sort/README.md",
      "projects/43-fixed-capacity-topological-sort/MASTERY.md",
      "projects/43-fixed-capacity-topological-sort/DETAILS.md",
      "projects/43-fixed-capacity-topological-sort/details.json",
      "projects/43-fixed-capacity-topological-sort/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "FixedTopologicalGraph"
    ],
    "publicTypes": [
      {
        "name": "FixedTopologicalGraph",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented fixed-capacity-topological-sort public behavior, boundaries, and failure semantics."
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
      },
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
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
            "path": "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
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
            "path": "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
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
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualSlices",
        "symbols": [
          "std.testing.expectEqualSlices"
        ],
        "files": [
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
          "projects/43-fixed-capacity-topological-sort/tests/smoke_test.zig"
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
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-fixed-capacity-topological-sort",
    "smokeTestStep": "smoke-fixed-capacity-topological-sort",
    "namedModuleImport": "fixed-capacity-topological-sort",
    "sourcePath": "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
    "directModuleDependencies": [
      "fixed-capacity-vector",
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
      "test-fixed-capacity-topological-sort",
      "smoke-fixed-capacity-topological-sort"
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
      "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
    ],
    "smokeTests": [
      "projects/43-fixed-capacity-topological-sort/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "FixedTopologicalGraph"
      ],
      "affectedFiles": [
        "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-fixed-capacity-topological-sort",
        "zig build smoke-fixed-capacity-topological-sort"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented fixed-capacity-topological-sort public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "FixedTopologicalGraph"
      ],
      "detectionTests": [
        "zig build test-fixed-capacity-topological-sort",
        "zig build smoke-fixed-capacity-topological-sort"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-vector",
      "fixed-capacity-priority-queue"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector",
      "fixed-capacity-priority-queue",
      "fixed-capacity-topological-sort"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-fixed-capacity-topological-sort",
      "zig build smoke-fixed-capacity-topological-sort"
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
      "projects/43-fixed-capacity-topological-sort/port.js",
      "projects/43-fixed-capacity-topological-sort/details.json",
      "projects/43-fixed-capacity-topological-sort/DETAILS.md",
      "projects/00-fixed-capacity-vector/port.js",
      "projects/42-fixed-capacity-priority-queue/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-fixed-capacity-topological-sort"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector",
      "fixed-capacity-priority-queue",
      "fixed-capacity-topological-sort"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig",
          "projects/43-fixed-capacity-topological-sort/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "FixedTopologicalGraph",
        "file": "projects/43-fixed-capacity-topological-sort/src/fixed_capacity_topological_sort.zig"
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
