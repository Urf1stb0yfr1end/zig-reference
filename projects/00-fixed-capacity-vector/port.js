module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "00",
    "canonicalName": "fixed-capacity-vector",
    "displayName": "Fixed Capacity Vector",
    "directory": "projects/00-fixed-capacity-vector",
    "publicEntrypoint": "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig",
    "detailsContract": "projects/00-fixed-capacity-vector/details.json",
    "humanContract": "projects/00-fixed-capacity-vector/DETAILS.md",
    "portContract": "projects/00-fixed-capacity-vector/port.js"
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
      "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
    ],
    "publicEntrypoints": [
      "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
    ],
    "internalUnitTests": [
      "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
    ],
    "externalSmokeTests": [
      "projects/00-fixed-capacity-vector/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/00-fixed-capacity-vector/README.md",
      "projects/00-fixed-capacity-vector/MASTERY.md",
      "projects/00-fixed-capacity-vector/DETAILS.md",
      "projects/00-fixed-capacity-vector/details.json",
      "projects/00-fixed-capacity-vector/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "FixedVector"
    ],
    "publicTypes": [
      {
        "name": "FixedVector(T, capacity)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "append",
        "signature": "append(self: *Self, value: T) Error!void"
      },
      {
        "name": "pop",
        "signature": "pop(self: *Self) ?T"
      },
      {
        "name": "get",
        "signature": "get(self: *const Self, index: usize) ?T"
      },
      {
        "name": "items",
        "signature": "items(self: *Self) []T"
      },
      {
        "name": "constItems",
        "signature": "constItems(self: *const Self) []const T"
      },
      {
        "name": "clear",
        "signature": "clear(self: *Self) void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "Full"
    ],
    "invariantsToPreserve": [
      "Preserve the documented fixed-capacity-vector public behavior, boundaries, and failure semantics."
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
    "repository": [],
    "standardLibrary": [
      "std.mem.copyForwards",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [
      "error unions"
    ],
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
            "path": "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig",
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
            "path": "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig",
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
        "path": "std.mem.copyForwards",
        "symbols": [
          "std.mem.copyForwards"
        ],
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
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
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
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
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
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
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
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
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.refAllDeclsRecursive",
        "symbols": [
          "std.testing.refAllDeclsRecursive"
        ],
        "files": [
          "projects/00-fixed-capacity-vector/tests/smoke_test.zig"
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
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-fixed-capacity-vector",
    "smokeTestStep": "smoke-fixed-capacity-vector",
    "namedModuleImport": "fixed-capacity-vector",
    "sourcePath": "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig",
    "directModuleDependencies": [],
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
      "test-fixed-capacity-vector",
      "smoke-fixed-capacity-vector"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "yes",
    "freestanding": "yes; no allocator required",
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
    "publicErrors": [
      "Full"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
    ],
    "smokeTests": [
      "projects/00-fixed-capacity-vector/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
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
        "FixedVector"
      ],
      "affectedFiles": [
        "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-fixed-capacity-vector",
        "zig build smoke-fixed-capacity-vector"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented fixed-capacity-vector public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "FixedVector"
      ],
      "detectionTests": [
        "zig build test-fixed-capacity-vector",
        "zig build smoke-fixed-capacity-vector"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-fixed-capacity-vector",
      "zig build smoke-fixed-capacity-vector"
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
      "projects/00-fixed-capacity-vector/port.js",
      "projects/00-fixed-capacity-vector/details.json",
      "projects/00-fixed-capacity-vector/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-fixed-capacity-vector"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.mem.copyForwards",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.mem.copyForwards",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
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
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.mem.copyForwards",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/00-fixed-capacity-vector/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "FixedVector",
        "file": "projects/00-fixed-capacity-vector/src/fixed_capacity_vector.zig"
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
