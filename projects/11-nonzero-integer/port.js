module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "11",
    "canonicalName": "nonzero-integer",
    "displayName": "Nonzero Integer",
    "directory": "projects/11-nonzero-integer",
    "publicEntrypoint": "projects/11-nonzero-integer/src/nonzero_integer.zig",
    "detailsContract": "projects/11-nonzero-integer/details.json",
    "humanContract": "projects/11-nonzero-integer/DETAILS.md",
    "portContract": "projects/11-nonzero-integer/port.js"
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
      "projects/11-nonzero-integer/src/nonzero_integer.zig"
    ],
    "publicEntrypoints": [
      "projects/11-nonzero-integer/src/nonzero_integer.zig"
    ],
    "internalUnitTests": [
      "projects/11-nonzero-integer/src/nonzero_integer.zig"
    ],
    "externalSmokeTests": [
      "projects/11-nonzero-integer/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/11-nonzero-integer/README.md",
      "projects/11-nonzero-integer/MASTERY.md",
      "projects/11-nonzero-integer/DETAILS.md",
      "projects/11-nonzero-integer/details.json",
      "projects/11-nonzero-integer/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "NonZeroInteger"
    ],
    "publicTypes": [
      {
        "name": "NonZeroInteger(T)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(value: T) error{ZeroNotAllowed}!Self"
      },
      {
        "name": "get",
        "signature": "get(self: Self) T"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "ZeroNotAllowed"
    ],
    "invariantsToPreserve": [
      "Preserve the documented nonzero-integer public behavior, boundaries, and failure semantics."
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
      "std.testing.expectEqual",
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
      "@compileError",
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
            "path": "projects/11-nonzero-integer/src/nonzero_integer.zig",
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
            "path": "projects/11-nonzero-integer/src/nonzero_integer.zig",
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
            "path": "projects/11-nonzero-integer/src/nonzero_integer.zig",
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
        "name": "@typeInfo",
        "files": [
          {
            "path": "projects/11-nonzero-integer/src/nonzero_integer.zig",
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
        "path": "std.testing.expectEqual",
        "symbols": [
          "std.testing.expectEqual"
        ],
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
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
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
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
          "projects/11-nonzero-integer/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
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
    "unitTestStep": "test-nonzero-integer",
    "smokeTestStep": "smoke-nonzero-integer",
    "namedModuleImport": "nonzero-integer",
    "sourcePath": "projects/11-nonzero-integer/src/nonzero_integer.zig",
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
      "test-nonzero-integer",
      "smoke-nonzero-integer"
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
    "publicErrors": [
      "ZeroNotAllowed"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/11-nonzero-integer/src/nonzero_integer.zig"
    ],
    "smokeTests": [
      "projects/11-nonzero-integer/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
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
        "NonZeroInteger"
      ],
      "affectedFiles": [
        "projects/11-nonzero-integer/src/nonzero_integer.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-nonzero-integer",
        "zig build smoke-nonzero-integer"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented nonzero-integer public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "NonZeroInteger"
      ],
      "detectionTests": [
        "zig build test-nonzero-integer",
        "zig build smoke-nonzero-integer"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "nonzero-integer"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-nonzero-integer",
      "zig build smoke-nonzero-integer"
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
      "projects/11-nonzero-integer/port.js",
      "projects/11-nonzero-integer/details.json",
      "projects/11-nonzero-integer/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-nonzero-integer"
    ],
    "recommendedPortOrder": [
      "nonzero-integer"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@compileError",
      "@typeInfo",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@compileError",
      "@typeInfo",
      "std.testing.expectEqual",
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
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      },
      {
        "builtin": "@typeInfo",
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/11-nonzero-integer/src/nonzero_integer.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/11-nonzero-integer/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "NonZeroInteger",
        "file": "projects/11-nonzero-integer/src/nonzero_integer.zig"
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
