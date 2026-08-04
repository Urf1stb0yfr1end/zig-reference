module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "25",
    "canonicalName": "semantic-version",
    "displayName": "Semantic Version",
    "directory": "projects/25-semantic-version",
    "publicEntrypoint": "projects/25-semantic-version/src/semantic_version.zig",
    "detailsContract": "projects/25-semantic-version/details.json",
    "humanContract": "projects/25-semantic-version/DETAILS.md",
    "portContract": "projects/25-semantic-version/port.js"
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
      "projects/25-semantic-version/src/semantic_version.zig"
    ],
    "publicEntrypoints": [
      "projects/25-semantic-version/src/semantic_version.zig"
    ],
    "internalUnitTests": [
      "projects/25-semantic-version/src/semantic_version.zig"
    ],
    "externalSmokeTests": [
      "projects/25-semantic-version/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/25-semantic-version/README.md",
      "projects/25-semantic-version/MASTERY.md",
      "projects/25-semantic-version/DETAILS.md",
      "projects/25-semantic-version/details.json",
      "projects/25-semantic-version/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "SemanticVersion"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [
      "compare",
      "isCompatibleWith"
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented semantic-version public behavior, boundaries, and failure semantics."
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
      "std.math.Order",
      "std.math.Order.gt",
      "std.math.order",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.refAllDeclsRecursive"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [],
    "notUsed": []
  },
  "standardLibraryUsage": {
    "imports": [
      {
        "path": "std.math.Order",
        "symbols": [
          "std.math.Order"
        ],
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.Order.gt",
        "symbols": [
          "std.math.Order.gt"
        ],
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.order",
        "symbols": [
          "std.math.order"
        ],
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
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
          "projects/25-semantic-version/src/semantic_version.zig"
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
          "projects/25-semantic-version/src/semantic_version.zig"
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
          "projects/25-semantic-version/tests/smoke_test.zig"
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
    "mathApis": [
      "std.math.Order",
      "std.math.Order.gt",
      "std.math.order"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-semantic-version",
    "smokeTestStep": "smoke-semantic-version",
    "namedModuleImport": "semantic-version",
    "sourcePath": "projects/25-semantic-version/src/semantic_version.zig",
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
      "test-semantic-version",
      "smoke-semantic-version"
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
    "builtins": [],
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
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/25-semantic-version/src/semantic_version.zig"
    ],
    "smokeTests": [
      "projects/25-semantic-version/tests/smoke_test.zig"
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
        "SemanticVersion"
      ],
      "affectedFiles": [
        "projects/25-semantic-version/src/semantic_version.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-semantic-version",
        "zig build smoke-semantic-version"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented semantic-version public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "SemanticVersion"
      ],
      "detectionTests": [
        "zig build test-semantic-version",
        "zig build smoke-semantic-version"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "semantic-version"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-semantic-version",
      "zig build smoke-semantic-version"
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
      "projects/25-semantic-version/port.js",
      "projects/25-semantic-version/details.json",
      "projects/25-semantic-version/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-semantic-version"
    ],
    "recommendedPortOrder": [
      "semantic-version"
    ],
    "searchTerms": [
      "std.math.Order",
      "std.math.Order.gt",
      "std.math.order",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "std.math.Order",
      "std.math.Order.gt",
      "std.math.order",
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
    "builtinsToFiles": [],
    "standardLibraryToFiles": [
      {
        "api": "std.math.Order",
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ]
      },
      {
        "api": "std.math.Order.gt",
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ]
      },
      {
        "api": "std.math.order",
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/25-semantic-version/src/semantic_version.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/25-semantic-version/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "SemanticVersion",
        "file": "projects/25-semantic-version/src/semantic_version.zig"
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
