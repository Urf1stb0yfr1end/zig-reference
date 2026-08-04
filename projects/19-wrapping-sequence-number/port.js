module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "19",
    "canonicalName": "wrapping-sequence-number",
    "displayName": "Wrapping Sequence Number",
    "directory": "projects/19-wrapping-sequence-number",
    "publicEntrypoint": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
    "detailsContract": "projects/19-wrapping-sequence-number/details.json",
    "humanContract": "projects/19-wrapping-sequence-number/DETAILS.md",
    "portContract": "projects/19-wrapping-sequence-number/port.js"
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
      "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
    ],
    "publicEntrypoints": [
      "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
    ],
    "internalUnitTests": [
      "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
    ],
    "externalSmokeTests": [
      "projects/19-wrapping-sequence-number/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/19-wrapping-sequence-number/README.md",
      "projects/19-wrapping-sequence-number/MASTERY.md",
      "projects/19-wrapping-sequence-number/DETAILS.md",
      "projects/19-wrapping-sequence-number/details.json",
      "projects/19-wrapping-sequence-number/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "WrappingSequenceNumber"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [
      "init",
      "get",
      "next",
      "advance",
      "distanceForward"
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented wrapping-sequence-number public behavior, boundaries, and failure semantics."
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
            "path": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
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
            "path": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
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
            "path": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
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
            "path": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
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
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
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
          "projects/19-wrapping-sequence-number/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
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
    "unitTestStep": "test-wrapping-sequence-number",
    "smokeTestStep": "smoke-wrapping-sequence-number",
    "namedModuleImport": "wrapping-sequence-number",
    "sourcePath": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig",
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
      "test-wrapping-sequence-number",
      "smoke-wrapping-sequence-number"
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
      "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
    ],
    "smokeTests": [
      "projects/19-wrapping-sequence-number/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "WrappingSequenceNumber"
      ],
      "affectedFiles": [
        "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-wrapping-sequence-number",
        "zig build smoke-wrapping-sequence-number"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented wrapping-sequence-number public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "WrappingSequenceNumber"
      ],
      "detectionTests": [
        "zig build test-wrapping-sequence-number",
        "zig build smoke-wrapping-sequence-number"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "wrapping-sequence-number"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-wrapping-sequence-number",
      "zig build smoke-wrapping-sequence-number"
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
      "projects/19-wrapping-sequence-number/port.js",
      "projects/19-wrapping-sequence-number/details.json",
      "projects/19-wrapping-sequence-number/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-wrapping-sequence-number"
    ],
    "recommendedPortOrder": [
      "wrapping-sequence-number"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@compileError",
      "@typeInfo",
      "std.testing.expectEqual",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@compileError",
      "@typeInfo",
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
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
        ]
      },
      {
        "builtin": "@typeInfo",
        "files": [
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/19-wrapping-sequence-number/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "WrappingSequenceNumber",
        "file": "projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig"
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
