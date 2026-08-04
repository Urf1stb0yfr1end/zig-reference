module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "01",
    "canonicalName": "dynamic-array",
    "displayName": "Dynamic Array",
    "directory": "projects/01-dynamic-array",
    "publicEntrypoint": "projects/01-dynamic-array/src/dynamic_array.zig",
    "detailsContract": "projects/01-dynamic-array/details.json",
    "humanContract": "projects/01-dynamic-array/DETAILS.md",
    "portContract": "projects/01-dynamic-array/port.js"
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
      "projects/01-dynamic-array/src/dynamic_array.zig"
    ],
    "publicEntrypoints": [
      "projects/01-dynamic-array/src/dynamic_array.zig"
    ],
    "internalUnitTests": [
      "projects/01-dynamic-array/src/dynamic_array.zig"
    ],
    "externalSmokeTests": [
      "projects/01-dynamic-array/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/01-dynamic-array/README.md",
      "projects/01-dynamic-array/MASTERY.md",
      "projects/01-dynamic-array/DETAILS.md",
      "projects/01-dynamic-array/details.json",
      "projects/01-dynamic-array/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "DynamicArray"
    ],
    "publicTypes": [
      {
        "name": "DynamicArray(T)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(allocator: std.mem.Allocator) Self"
      },
      {
        "name": "deinit",
        "signature": "deinit(self: *Self) void"
      },
      {
        "name": "capacity",
        "signature": "capacity(self: *const Self) usize"
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
        "name": "append",
        "signature": "append(self: *Self, value: T) !void"
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
        "name": "clearRetainingCapacity",
        "signature": "clearRetainingCapacity(self: *Self) void"
      },
      {
        "name": "ensureUnusedCapacity",
        "signature": "ensureUnusedCapacity(self: *Self, additional: usize) !void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "OutOfMemory",
      "Overflow"
    ],
    "invariantsToPreserve": [
      "Preserve the documented dynamic-array public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [
      "[object Object]",
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
      "std.math.add",
      "std.math.mul",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
            "path": "projects/01-dynamic-array/src/dynamic_array.zig",
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
            "path": "projects/01-dynamic-array/src/dynamic_array.zig",
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
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/01-dynamic-array/src/dynamic_array.zig",
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
        "path": "std.math.add",
        "symbols": [
          "std.math.add"
        ],
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
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
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.Allocator",
        "symbols": [
          "std.mem.Allocator"
        ],
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.allocator",
        "symbols": [
          "std.testing.allocator"
        ],
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ],
        "purpose": "test assertions and test allocation",
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
          "projects/01-dynamic-array/src/dynamic_array.zig"
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
          "projects/01-dynamic-array/src/dynamic_array.zig"
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
          "projects/01-dynamic-array/src/dynamic_array.zig"
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
          "projects/01-dynamic-array/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.add",
      "std.math.mul"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-dynamic-array",
    "smokeTestStep": "smoke-dynamic-array",
    "namedModuleImport": "dynamic-array",
    "sourcePath": "projects/01-dynamic-array/src/dynamic_array.zig",
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
      "test-dynamic-array",
      "smoke-dynamic-array"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "yes",
    "freestanding": "only with a supplied freestanding allocator",
    "targets": [],
    "endianSensitive": false,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": true,
    "apis": [
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
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
      "OutOfMemory",
      "Overflow"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/01-dynamic-array/src/dynamic_array.zig"
    ],
    "smokeTests": [
      "projects/01-dynamic-array/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "DynamicArray"
      ],
      "affectedFiles": [
        "projects/01-dynamic-array/src/dynamic_array.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-dynamic-array",
        "zig build smoke-dynamic-array"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented dynamic-array public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "DynamicArray"
      ],
      "detectionTests": [
        "zig build test-dynamic-array",
        "zig build smoke-dynamic-array"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "dynamic-array"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-dynamic-array",
      "zig build smoke-dynamic-array"
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
      "projects/01-dynamic-array/port.js",
      "projects/01-dynamic-array/details.json",
      "projects/01-dynamic-array/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-dynamic-array"
    ],
    "recommendedPortOrder": [
      "dynamic-array"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@memcpy",
      "std.math.add",
      "std.math.mul",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@memcpy",
      "std.math.add",
      "std.math.mul",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.math.mul",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.mem.Allocator",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.testing.allocator",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/01-dynamic-array/src/dynamic_array.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/01-dynamic-array/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "DynamicArray",
        "file": "projects/01-dynamic-array/src/dynamic_array.zig"
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
