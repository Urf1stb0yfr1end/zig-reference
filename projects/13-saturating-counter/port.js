module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "13",
    "canonicalName": "saturating-counter",
    "displayName": "Saturating Counter",
    "directory": "projects/13-saturating-counter",
    "publicEntrypoint": "projects/13-saturating-counter/src/saturating_counter.zig",
    "detailsContract": "projects/13-saturating-counter/details.json",
    "humanContract": "projects/13-saturating-counter/DETAILS.md",
    "portContract": "projects/13-saturating-counter/port.js"
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
      "projects/13-saturating-counter/src/saturating_counter.zig"
    ],
    "publicEntrypoints": [
      "projects/13-saturating-counter/src/saturating_counter.zig"
    ],
    "internalUnitTests": [
      "projects/13-saturating-counter/src/saturating_counter.zig"
    ],
    "externalSmokeTests": [
      "projects/13-saturating-counter/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/13-saturating-counter/README.md",
      "projects/13-saturating-counter/MASTERY.md",
      "projects/13-saturating-counter/DETAILS.md",
      "projects/13-saturating-counter/details.json",
      "projects/13-saturating-counter/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "SaturatingCounter"
    ],
    "publicTypes": [
      {
        "name": "SaturatingCounter(T, maximum)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(value: T) Self"
      },
      {
        "name": "get",
        "signature": "get(self: Self) T"
      },
      {
        "name": "increment",
        "signature": "increment(self: *Self) void"
      },
      {
        "name": "decrement",
        "signature": "decrement(self: *Self) void"
      },
      {
        "name": "add",
        "signature": "add(self: *Self, amount: T) void"
      },
      {
        "name": "subtract",
        "signature": "subtract(self: *Self, amount: T) void"
      },
      {
        "name": "reset",
        "signature": "reset(self: *Self) void"
      },
      {
        "name": "isSaturated",
        "signature": "isSaturated(self: Self) bool"
      }
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented saturating-counter public behavior, boundaries, and failure semantics."
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
      "std.testing.refAllDeclsRecursive"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@compileError",
      "@min",
      "@typeInfo"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/13-saturating-counter/src/saturating_counter.zig",
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
            "path": "projects/13-saturating-counter/src/saturating_counter.zig",
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
            "path": "projects/13-saturating-counter/src/saturating_counter.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @compileError behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@min",
        "files": [
          {
            "path": "projects/13-saturating-counter/src/saturating_counter.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @min behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@typeInfo",
        "files": [
          {
            "path": "projects/13-saturating-counter/src/saturating_counter.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @typeInfo behavior as exercised by this module",
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
          "projects/13-saturating-counter/src/saturating_counter.zig"
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
          "projects/13-saturating-counter/src/saturating_counter.zig"
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
          "projects/13-saturating-counter/tests/smoke_test.zig"
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
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-saturating-counter",
    "smokeTestStep": "smoke-saturating-counter",
    "namedModuleImport": "saturating-counter",
    "sourcePath": "projects/13-saturating-counter/src/saturating_counter.zig",
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
      "test-saturating-counter",
      "smoke-saturating-counter"
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
    "reflectionSensitive": true,
    "builtins": [
      "@typeInfo"
    ],
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
      "projects/13-saturating-counter/src/saturating_counter.zig"
    ],
    "smokeTests": [
      "projects/13-saturating-counter/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
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
        "SaturatingCounter"
      ],
      "affectedFiles": [
        "projects/13-saturating-counter/src/saturating_counter.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-saturating-counter",
        "zig build smoke-saturating-counter"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented saturating-counter public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "SaturatingCounter"
      ],
      "detectionTests": [
        "zig build test-saturating-counter",
        "zig build smoke-saturating-counter"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "saturating-counter"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-saturating-counter",
      "zig build smoke-saturating-counter"
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
      "projects/13-saturating-counter/port.js",
      "projects/13-saturating-counter/details.json",
      "projects/13-saturating-counter/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-saturating-counter"
    ],
    "recommendedPortOrder": [
      "saturating-counter"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@compileError",
      "@min",
      "@typeInfo",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@compileError",
      "@min",
      "@typeInfo",
      "std.testing.expect",
      "std.testing.expectEqual",
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
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "builtin": "@min",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "builtin": "@typeInfo",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/13-saturating-counter/src/saturating_counter.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/13-saturating-counter/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "SaturatingCounter",
        "file": "projects/13-saturating-counter/src/saturating_counter.zig"
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
