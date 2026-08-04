module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "03",
    "canonicalName": "bit-set",
    "displayName": "Bit Set",
    "directory": "projects/03-bit-set",
    "publicEntrypoint": "projects/03-bit-set/src/bit_set.zig",
    "detailsContract": "projects/03-bit-set/details.json",
    "humanContract": "projects/03-bit-set/DETAILS.md",
    "portContract": "projects/03-bit-set/port.js"
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
      "projects/03-bit-set/src/bit_set.zig"
    ],
    "publicEntrypoints": [
      "projects/03-bit-set/src/bit_set.zig"
    ],
    "internalUnitTests": [
      "projects/03-bit-set/src/bit_set.zig"
    ],
    "externalSmokeTests": [
      "projects/03-bit-set/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/03-bit-set/README.md",
      "projects/03-bit-set/MASTERY.md",
      "projects/03-bit-set/DETAILS.md",
      "projects/03-bit-set/details.json",
      "projects/03-bit-set/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "BitSet"
    ],
    "publicTypes": [
      {
        "name": "BitSet(bit_count)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "set",
        "signature": "set(self: *Self, index: usize) Error!void"
      },
      {
        "name": "unset",
        "signature": "unset(self: *Self, index: usize) Error!void"
      },
      {
        "name": "isSet",
        "signature": "isSet(self: *const Self, index: usize) Error!bool"
      },
      {
        "name": "setAll",
        "signature": "setAll(self: *Self) void"
      },
      {
        "name": "clearAll",
        "signature": "clearAll(self: *Self) void"
      },
      {
        "name": "count",
        "signature": "count(self: *const Self) usize"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "OutOfBounds"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bit-set public behavior, boundaries, and failure semantics."
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
    "repository": [],
    "standardLibrary": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
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
      "@as",
      "@bitSizeOf",
      "@intCast",
      "@memset",
      "@popCount"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/03-bit-set/src/bit_set.zig",
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
            "path": "projects/03-bit-set/src/bit_set.zig",
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
        "name": "@bitSizeOf",
        "files": [
          {
            "path": "projects/03-bit-set/src/bit_set.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @bitSizeOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intCast",
        "files": [
          {
            "path": "projects/03-bit-set/src/bit_set.zig",
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
        "name": "@memset",
        "files": [
          {
            "path": "projects/03-bit-set/src/bit_set.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @memset behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@popCount",
        "files": [
          {
            "path": "projects/03-bit-set/src/bit_set.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @popCount behavior as exercised by this module",
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
          "projects/03-bit-set/src/bit_set.zig"
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
          "projects/03-bit-set/src/bit_set.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualDeep",
        "symbols": [
          "std.testing.expectEqualDeep"
        ],
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
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
          "projects/03-bit-set/src/bit_set.zig"
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
          "projects/03-bit-set/tests/smoke_test.zig"
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
      "std.testing.expectEqualDeep",
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
    "unitTestStep": "test-bit-set",
    "smokeTestStep": "smoke-bit-set",
    "namedModuleImport": "bit-set",
    "sourcePath": "projects/03-bit-set/src/bit_set.zig",
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
      "test-bit-set",
      "smoke-bit-set"
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
    "builtins": [
      "@memset"
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
      "OutOfBounds"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/03-bit-set/src/bit_set.zig"
    ],
    "smokeTests": [
      "projects/03-bit-set/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
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
        "BitSet"
      ],
      "affectedFiles": [
        "projects/03-bit-set/src/bit_set.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bit-set",
        "zig build smoke-bit-set"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bit-set public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "BitSet"
      ],
      "detectionTests": [
        "zig build test-bit-set",
        "zig build smoke-bit-set"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bit-set"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bit-set",
      "zig build smoke-bit-set"
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
      "projects/03-bit-set/port.js",
      "projects/03-bit-set/details.json",
      "projects/03-bit-set/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bit-set"
    ],
    "recommendedPortOrder": [
      "bit-set"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@bitSizeOf",
      "@intCast",
      "@memset",
      "@popCount",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@bitSizeOf",
      "@intCast",
      "@memset",
      "@popCount",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
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
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "builtin": "@bitSizeOf",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "builtin": "@intCast",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "builtin": "@memset",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "builtin": "@popCount",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/03-bit-set/src/bit_set.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/03-bit-set/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "BitSet",
        "file": "projects/03-bit-set/src/bit_set.zig"
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
