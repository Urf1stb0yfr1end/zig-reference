module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "15",
    "canonicalName": "aligned-address-and-size-helpers",
    "displayName": "Aligned Address And Size Helpers",
    "directory": "projects/15-aligned-address-and-size-helpers",
    "publicEntrypoint": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig",
    "detailsContract": "projects/15-aligned-address-and-size-helpers/details.json",
    "humanContract": "projects/15-aligned-address-and-size-helpers/DETAILS.md",
    "portContract": "projects/15-aligned-address-and-size-helpers/port.js"
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
      "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
    ],
    "publicEntrypoints": [
      "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
    ],
    "internalUnitTests": [
      "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
    ],
    "externalSmokeTests": [
      "projects/15-aligned-address-and-size-helpers/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/15-aligned-address-and-size-helpers/README.md",
      "projects/15-aligned-address-and-size-helpers/MASTERY.md",
      "projects/15-aligned-address-and-size-helpers/DETAILS.md",
      "projects/15-aligned-address-and-size-helpers/details.json",
      "projects/15-aligned-address-and-size-helpers/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "AlignmentError",
      "isPowerOfTwo",
      "isAligned",
      "alignDown",
      "alignUp",
      "paddingNeeded"
    ],
    "publicTypes": [],
    "publicFunctions": [
      {
        "name": "isPowerOfTwo",
        "signature": "isPowerOfTwo(value: usize) bool"
      },
      {
        "name": "isAligned",
        "signature": "isAligned(value: usize, alignment: usize) AlignmentError!bool"
      },
      {
        "name": "alignDown",
        "signature": "alignDown(value: usize, alignment: usize) AlignmentError!usize"
      },
      {
        "name": "alignUp",
        "signature": "alignUp(value: usize, alignment: usize) AlignmentError!usize"
      },
      {
        "name": "paddingNeeded",
        "signature": "paddingNeeded(value: usize, alignment: usize) AlignmentError!usize"
      }
    ],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [
      "InvalidAlignment",
      "Overflow"
    ],
    "invariantsToPreserve": [
      "Preserve the documented aligned-address-and-size-helpers public behavior, boundaries, and failure semantics."
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
      "@as"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @as behavior as exercised by this module",
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
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
          "projects/15-aligned-address-and-size-helpers/tests/smoke_test.zig"
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
    "unitTestStep": "test-aligned-address-and-size-helpers",
    "smokeTestStep": "smoke-aligned-address-and-size-helpers",
    "namedModuleImport": "aligned-address-and-size-helpers",
    "sourcePath": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig",
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
      "test-aligned-address-and-size-helpers",
      "smoke-aligned-address-and-size-helpers"
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
      "InvalidAlignment",
      "Overflow"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
    ],
    "smokeTests": [
      "projects/15-aligned-address-and-size-helpers/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
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
        "AlignmentError",
        "isPowerOfTwo",
        "isAligned",
        "alignDown",
        "alignUp",
        "paddingNeeded"
      ],
      "affectedFiles": [
        "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-aligned-address-and-size-helpers",
        "zig build smoke-aligned-address-and-size-helpers"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented aligned-address-and-size-helpers public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "AlignmentError",
        "isPowerOfTwo",
        "isAligned",
        "alignDown",
        "alignUp",
        "paddingNeeded"
      ],
      "detectionTests": [
        "zig build test-aligned-address-and-size-helpers",
        "zig build smoke-aligned-address-and-size-helpers"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "aligned-address-and-size-helpers"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-aligned-address-and-size-helpers",
      "zig build smoke-aligned-address-and-size-helpers"
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
      "projects/15-aligned-address-and-size-helpers/port.js",
      "projects/15-aligned-address-and-size-helpers/details.json",
      "projects/15-aligned-address-and-size-helpers/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-aligned-address-and-size-helpers"
    ],
    "recommendedPortOrder": [
      "aligned-address-and-size-helpers"
    ],
    "searchTerms": [
      "@as",
      "std.math.add",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "std.math.add",
      "std.math.maxInt",
      "std.testing.expect",
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
        "builtin": "@as",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/15-aligned-address-and-size-helpers/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "AlignmentError",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      },
      {
        "symbol": "isPowerOfTwo",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      },
      {
        "symbol": "isAligned",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      },
      {
        "symbol": "alignDown",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      },
      {
        "symbol": "alignUp",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
      },
      {
        "symbol": "paddingNeeded",
        "file": "projects/15-aligned-address-and-size-helpers/src/aligned_address_and_size_helpers.zig"
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
