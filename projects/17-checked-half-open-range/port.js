module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "17",
    "canonicalName": "checked-half-open-range",
    "displayName": "Checked Half Open Range",
    "directory": "projects/17-checked-half-open-range",
    "publicEntrypoint": "projects/17-checked-half-open-range/src/checked_half_open_range.zig",
    "detailsContract": "projects/17-checked-half-open-range/details.json",
    "humanContract": "projects/17-checked-half-open-range/DETAILS.md",
    "portContract": "projects/17-checked-half-open-range/port.js"
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
      "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
    ],
    "publicEntrypoints": [
      "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
    ],
    "internalUnitTests": [
      "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
    ],
    "externalSmokeTests": [
      "projects/17-checked-half-open-range/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/17-checked-half-open-range/README.md",
      "projects/17-checked-half-open-range/MASTERY.md",
      "projects/17-checked-half-open-range/DETAILS.md",
      "projects/17-checked-half-open-range/details.json",
      "projects/17-checked-half-open-range/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "CheckedRange"
    ],
    "publicTypes": [
      {
        "name": "CheckedRange",
        "kind": "struct"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(start: usize, end: usize) Error!CheckedRange"
      },
      {
        "name": "fromStartAndLength",
        "signature": "fromStartAndLength(start: usize, length: usize) Error!CheckedRange"
      },
      {
        "name": "length",
        "signature": "length(self: CheckedRange) usize"
      },
      {
        "name": "isEmpty",
        "signature": "isEmpty(self: CheckedRange) bool"
      },
      {
        "name": "containsValue",
        "signature": "containsValue(self: CheckedRange, value: usize) bool"
      },
      {
        "name": "containsRange",
        "signature": "containsRange(self: CheckedRange, other: CheckedRange) bool"
      },
      {
        "name": "overlaps",
        "signature": "overlaps(self: CheckedRange, other: CheckedRange) bool"
      },
      {
        "name": "intersection",
        "signature": "intersection(self: CheckedRange, other: CheckedRange) ?CheckedRange"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "InvalidRange",
      "Overflow"
    ],
    "invariantsToPreserve": [
      "Preserve the documented checked-half-open-range public behavior, boundaries, and failure semantics."
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
      "std.math.add",
      "std.math.maxInt",
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
      "@as",
      "@max",
      "@min"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/17-checked-half-open-range/src/checked_half_open_range.zig",
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
        "name": "@max",
        "files": [
          {
            "path": "projects/17-checked-half-open-range/src/checked_half_open_range.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @max behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@min",
        "files": [
          {
            "path": "projects/17-checked-half-open-range/src/checked_half_open_range.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @min behavior as exercised by this module",
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
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
          "projects/17-checked-half-open-range/tests/smoke_test.zig"
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
    "mathApis": [
      "std.math.add",
      "std.math.maxInt"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-checked-half-open-range",
    "smokeTestStep": "smoke-checked-half-open-range",
    "namedModuleImport": "checked-half-open-range",
    "sourcePath": "projects/17-checked-half-open-range/src/checked_half_open_range.zig",
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
      "test-checked-half-open-range",
      "smoke-checked-half-open-range"
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
    "publicErrors": [
      "InvalidRange",
      "Overflow"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
    ],
    "smokeTests": [
      "projects/17-checked-half-open-range/tests/smoke_test.zig"
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
        "CheckedRange"
      ],
      "affectedFiles": [
        "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-checked-half-open-range",
        "zig build smoke-checked-half-open-range"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented checked-half-open-range public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "CheckedRange"
      ],
      "detectionTests": [
        "zig build test-checked-half-open-range",
        "zig build smoke-checked-half-open-range"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "checked-half-open-range"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-checked-half-open-range",
      "zig build smoke-checked-half-open-range"
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
      "projects/17-checked-half-open-range/port.js",
      "projects/17-checked-half-open-range/details.json",
      "projects/17-checked-half-open-range/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-checked-half-open-range"
    ],
    "recommendedPortOrder": [
      "checked-half-open-range"
    ],
    "searchTerms": [
      "@as",
      "@max",
      "@min",
      "std.math.add",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@max",
      "@min",
      "std.math.add",
      "std.math.maxInt",
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
        "builtin": "@as",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "builtin": "@max",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "builtin": "@min",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/17-checked-half-open-range/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "CheckedRange",
        "file": "projects/17-checked-half-open-range/src/checked_half_open_range.zig"
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
