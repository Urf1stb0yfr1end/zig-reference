module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "12",
    "canonicalName": "bounded-integer",
    "displayName": "Bounded Integer",
    "directory": "projects/12-bounded-integer",
    "publicEntrypoint": "projects/12-bounded-integer/src/bounded_integer.zig",
    "detailsContract": "projects/12-bounded-integer/details.json",
    "humanContract": "projects/12-bounded-integer/DETAILS.md",
    "portContract": "projects/12-bounded-integer/port.js"
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
      "projects/12-bounded-integer/src/bounded_integer.zig"
    ],
    "publicEntrypoints": [
      "projects/12-bounded-integer/src/bounded_integer.zig"
    ],
    "internalUnitTests": [
      "projects/12-bounded-integer/src/bounded_integer.zig"
    ],
    "externalSmokeTests": [
      "projects/12-bounded-integer/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/12-bounded-integer/README.md",
      "projects/12-bounded-integer/MASTERY.md",
      "projects/12-bounded-integer/DETAILS.md",
      "projects/12-bounded-integer/details.json",
      "projects/12-bounded-integer/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "BoundedInteger"
    ],
    "publicTypes": [
      {
        "name": "BoundedInteger(T, minimum, maximum)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(value: T) error{OutOfRange}!Self"
      },
      {
        "name": "get",
        "signature": "get(self: Self) T"
      },
      {
        "name": "set",
        "signature": "set(self: *Self, value: T) error{OutOfRange}!void"
      },
      {
        "name": "minValue",
        "signature": "minValue() T"
      },
      {
        "name": "maxValue",
        "signature": "maxValue() T"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "OutOfRange"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bounded-integer public behavior, boundaries, and failure semantics."
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
            "path": "projects/12-bounded-integer/src/bounded_integer.zig",
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
            "path": "projects/12-bounded-integer/src/bounded_integer.zig",
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
            "path": "projects/12-bounded-integer/src/bounded_integer.zig",
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
            "path": "projects/12-bounded-integer/src/bounded_integer.zig",
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
          "projects/12-bounded-integer/src/bounded_integer.zig"
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
          "projects/12-bounded-integer/src/bounded_integer.zig"
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
          "projects/12-bounded-integer/tests/smoke_test.zig"
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
    "unitTestStep": "test-bounded-integer",
    "smokeTestStep": "smoke-bounded-integer",
    "namedModuleImport": "bounded-integer",
    "sourcePath": "projects/12-bounded-integer/src/bounded_integer.zig",
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
      "test-bounded-integer",
      "smoke-bounded-integer"
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
      "OutOfRange"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/12-bounded-integer/src/bounded_integer.zig"
    ],
    "smokeTests": [
      "projects/12-bounded-integer/tests/smoke_test.zig"
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
        "BoundedInteger"
      ],
      "affectedFiles": [
        "projects/12-bounded-integer/src/bounded_integer.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-integer",
        "zig build smoke-bounded-integer"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-integer public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "BoundedInteger"
      ],
      "detectionTests": [
        "zig build test-bounded-integer",
        "zig build smoke-bounded-integer"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-integer"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-integer",
      "zig build smoke-bounded-integer"
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
      "projects/12-bounded-integer/port.js",
      "projects/12-bounded-integer/details.json",
      "projects/12-bounded-integer/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-integer"
    ],
    "recommendedPortOrder": [
      "bounded-integer"
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
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      },
      {
        "builtin": "@typeInfo",
        "files": [
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/12-bounded-integer/src/bounded_integer.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/12-bounded-integer/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "BoundedInteger",
        "file": "projects/12-bounded-integer/src/bounded_integer.zig"
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
