module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "10",
    "canonicalName": "checked-integer-cast",
    "displayName": "Checked Integer Cast",
    "directory": "projects/10-checked-integer-cast",
    "publicEntrypoint": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
    "detailsContract": "projects/10-checked-integer-cast/details.json",
    "humanContract": "projects/10-checked-integer-cast/DETAILS.md",
    "portContract": "projects/10-checked-integer-cast/port.js"
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
      "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
    ],
    "publicEntrypoints": [
      "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
    ],
    "internalUnitTests": [
      "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
    ],
    "externalSmokeTests": [
      "projects/10-checked-integer-cast/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/10-checked-integer-cast/README.md",
      "projects/10-checked-integer-cast/MASTERY.md",
      "projects/10-checked-integer-cast/DETAILS.md",
      "projects/10-checked-integer-cast/details.json",
      "projects/10-checked-integer-cast/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "checkedIntegerCast"
    ],
    "publicTypes": [],
    "publicFunctions": [
      {
        "name": "checkedIntegerCast",
        "signature": "checkedIntegerCast(comptime Destination: type, value: anytype) error{OutOfRange}!Destination"
      }
    ],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [
      "OutOfRange"
    ],
    "invariantsToPreserve": [
      "Preserve the documented checked-integer-cast public behavior, boundaries, and failure semantics."
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
      "std.math.cast",
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
      "@TypeOf",
      "@as",
      "@compileError",
      "@typeInfo"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@TypeOf",
        "files": [
          {
            "path": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @TypeOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
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
            "path": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
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
            "path": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
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
        "path": "std.math.cast",
        "symbols": [
          "std.math.cast"
        ],
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
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
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
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
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
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
          "projects/10-checked-integer-cast/tests/smoke_test.zig"
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
    "mathApis": [
      "std.math.cast"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-checked-integer-cast",
    "smokeTestStep": "smoke-checked-integer-cast",
    "namedModuleImport": "checked-integer-cast",
    "sourcePath": "projects/10-checked-integer-cast/src/checked_integer_cast.zig",
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
      "test-checked-integer-cast",
      "smoke-checked-integer-cast"
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
      "@TypeOf",
      "@typeInfo"
    ],
    "comptimeParameters": [],
    "notes": []
  },
  "errorHandlingUsage": {
    "publicErrors": [
      "OutOfRange"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
    ],
    "smokeTests": [
      "projects/10-checked-integer-cast/tests/smoke_test.zig"
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
        "checkedIntegerCast"
      ],
      "affectedFiles": [
        "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-checked-integer-cast",
        "zig build smoke-checked-integer-cast"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented checked-integer-cast public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "checkedIntegerCast"
      ],
      "detectionTests": [
        "zig build test-checked-integer-cast",
        "zig build smoke-checked-integer-cast"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "checked-integer-cast"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-checked-integer-cast",
      "zig build smoke-checked-integer-cast"
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
      "projects/10-checked-integer-cast/port.js",
      "projects/10-checked-integer-cast/details.json",
      "projects/10-checked-integer-cast/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-checked-integer-cast"
    ],
    "recommendedPortOrder": [
      "checked-integer-cast"
    ],
    "searchTerms": [
      "@TypeOf",
      "@as",
      "@compileError",
      "@typeInfo",
      "std.math.cast",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@TypeOf",
      "@as",
      "@compileError",
      "@typeInfo",
      "std.math.cast",
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
        "builtin": "@TypeOf",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "builtin": "@typeInfo",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.cast",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/10-checked-integer-cast/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "checkedIntegerCast",
        "file": "projects/10-checked-integer-cast/src/checked_integer_cast.zig"
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
