module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "14",
    "canonicalName": "validated-enum-decoder",
    "displayName": "Validated Enum Decoder",
    "directory": "projects/14-validated-enum-decoder",
    "publicEntrypoint": "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig",
    "detailsContract": "projects/14-validated-enum-decoder/details.json",
    "humanContract": "projects/14-validated-enum-decoder/DETAILS.md",
    "portContract": "projects/14-validated-enum-decoder/port.js"
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
      "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
    ],
    "publicEntrypoints": [
      "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
    ],
    "internalUnitTests": [
      "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
    ],
    "externalSmokeTests": [
      "projects/14-validated-enum-decoder/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/14-validated-enum-decoder/README.md",
      "projects/14-validated-enum-decoder/MASTERY.md",
      "projects/14-validated-enum-decoder/DETAILS.md",
      "projects/14-validated-enum-decoder/details.json",
      "projects/14-validated-enum-decoder/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "decodeEnum",
      "isValidEnumValue"
    ],
    "publicTypes": [],
    "publicFunctions": [
      {
        "name": "decodeEnum",
        "signature": "decodeEnum(comptime E: type, raw: std.meta.Tag(E)) error{InvalidEnumValue}!E"
      },
      {
        "name": "isValidEnumValue",
        "signature": "isValidEnumValue(comptime E: type, raw: std.meta.Tag(E)) bool"
      }
    ],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [
      "InvalidEnumValue"
    ],
    "invariantsToPreserve": [
      "Preserve the documented validated-enum-decoder public behavior, boundaries, and failure semantics."
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
      "std.meta.Tag",
      "std.meta.intToEnum",
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
        "path": "std.meta.Tag",
        "symbols": [
          "std.meta.Tag"
        ],
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.meta.intToEnum",
        "symbols": [
          "std.meta.intToEnum"
        ],
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
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
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
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
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
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
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
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
          "projects/14-validated-enum-decoder/tests/smoke_test.zig"
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
    "mathApis": [],
    "metadataApis": [
      "std.meta.Tag",
      "std.meta.intToEnum"
    ]
  },
  "buildSystemUsage": {
    "unitTestStep": "test-validated-enum-decoder",
    "smokeTestStep": "smoke-validated-enum-decoder",
    "namedModuleImport": "validated-enum-decoder",
    "sourcePath": "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig",
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
      "test-validated-enum-decoder",
      "smoke-validated-enum-decoder"
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
    "publicErrors": [
      "InvalidEnumValue"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
    ],
    "smokeTests": [
      "projects/14-validated-enum-decoder/tests/smoke_test.zig"
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
        "decodeEnum",
        "isValidEnumValue"
      ],
      "affectedFiles": [
        "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-validated-enum-decoder",
        "zig build smoke-validated-enum-decoder"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented validated-enum-decoder public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "decodeEnum",
        "isValidEnumValue"
      ],
      "detectionTests": [
        "zig build test-validated-enum-decoder",
        "zig build smoke-validated-enum-decoder"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "validated-enum-decoder"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-validated-enum-decoder",
      "zig build smoke-validated-enum-decoder"
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
      "projects/14-validated-enum-decoder/port.js",
      "projects/14-validated-enum-decoder/details.json",
      "projects/14-validated-enum-decoder/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-validated-enum-decoder"
    ],
    "recommendedPortOrder": [
      "validated-enum-decoder"
    ],
    "searchTerms": [
      "std.meta.Tag",
      "std.meta.intToEnum",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "std.meta.Tag",
      "std.meta.intToEnum",
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
    "builtinsToFiles": [],
    "standardLibraryToFiles": [
      {
        "api": "std.meta.Tag",
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ]
      },
      {
        "api": "std.meta.intToEnum",
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/14-validated-enum-decoder/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "decodeEnum",
        "file": "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
      },
      {
        "symbol": "isValidEnumValue",
        "file": "projects/14-validated-enum-decoder/src/validated_enum_decoder.zig"
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
