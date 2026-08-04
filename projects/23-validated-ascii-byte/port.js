module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "23",
    "canonicalName": "validated-ascii-byte",
    "displayName": "Validated Ascii Byte",
    "directory": "projects/23-validated-ascii-byte",
    "publicEntrypoint": "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig",
    "detailsContract": "projects/23-validated-ascii-byte/details.json",
    "humanContract": "projects/23-validated-ascii-byte/DETAILS.md",
    "portContract": "projects/23-validated-ascii-byte/port.js"
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
      "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
    ],
    "publicEntrypoints": [
      "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
    ],
    "internalUnitTests": [
      "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
    ],
    "externalSmokeTests": [
      "projects/23-validated-ascii-byte/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/23-validated-ascii-byte/README.md",
      "projects/23-validated-ascii-byte/MASTERY.md",
      "projects/23-validated-ascii-byte/DETAILS.md",
      "projects/23-validated-ascii-byte/details.json",
      "projects/23-validated-ascii-byte/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "AsciiByte"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [
      "init",
      "get",
      "isDigit",
      "isAlphabetic"
    ],
    "publicConstants": [],
    "publicErrors": [
      "NotAscii"
    ],
    "invariantsToPreserve": [
      "Preserve the documented validated-ascii-byte public behavior, boundaries, and failure semantics."
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
      "@intCast"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@intCast",
        "files": [
          {
            "path": "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intCast behavior as exercised by this module",
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
          "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
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
          "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
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
          "projects/23-validated-ascii-byte/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expect",
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
    "unitTestStep": "test-validated-ascii-byte",
    "smokeTestStep": "smoke-validated-ascii-byte",
    "namedModuleImport": "validated-ascii-byte",
    "sourcePath": "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig",
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
      "test-validated-ascii-byte",
      "smoke-validated-ascii-byte"
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
      "NotAscii"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
    ],
    "smokeTests": [
      "projects/23-validated-ascii-byte/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
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
        "AsciiByte"
      ],
      "affectedFiles": [
        "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-validated-ascii-byte",
        "zig build smoke-validated-ascii-byte"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented validated-ascii-byte public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "AsciiByte"
      ],
      "detectionTests": [
        "zig build test-validated-ascii-byte",
        "zig build smoke-validated-ascii-byte"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "validated-ascii-byte"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-validated-ascii-byte",
      "zig build smoke-validated-ascii-byte"
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
      "projects/23-validated-ascii-byte/port.js",
      "projects/23-validated-ascii-byte/details.json",
      "projects/23-validated-ascii-byte/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-validated-ascii-byte"
    ],
    "recommendedPortOrder": [
      "validated-ascii-byte"
    ],
    "searchTerms": [
      "@intCast",
      "std.testing.expect",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@intCast",
      "std.testing.expect",
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
        "builtin": "@intCast",
        "files": [
          "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/23-validated-ascii-byte/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "AsciiByte",
        "file": "projects/23-validated-ascii-byte/src/validated_ascii_byte.zig"
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
