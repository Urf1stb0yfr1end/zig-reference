module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "22",
    "canonicalName": "endian-integer-codec",
    "displayName": "Endian Integer Codec",
    "directory": "projects/22-endian-integer-codec",
    "publicEntrypoint": "projects/22-endian-integer-codec/src/endian_integer_codec.zig",
    "detailsContract": "projects/22-endian-integer-codec/details.json",
    "humanContract": "projects/22-endian-integer-codec/DETAILS.md",
    "portContract": "projects/22-endian-integer-codec/port.js"
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
      "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
    ],
    "publicEntrypoints": [
      "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
    ],
    "internalUnitTests": [
      "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
    ],
    "externalSmokeTests": [
      "projects/22-endian-integer-codec/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/22-endian-integer-codec/README.md",
      "projects/22-endian-integer-codec/MASTERY.md",
      "projects/22-endian-integer-codec/DETAILS.md",
      "projects/22-endian-integer-codec/details.json",
      "projects/22-endian-integer-codec/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "EndianIntegerCodec"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [
      "encode",
      "decode"
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented endian-integer-codec public behavior, boundaries, and failure semantics."
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
      "std.builtin.Endian",
      "std.mem.readInt",
      "std.mem.writeInt",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.refAllDeclsRecursive"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as",
      "@sizeOf"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/22-endian-integer-codec/src/endian_integer_codec.zig",
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
        "name": "@sizeOf",
        "files": [
          {
            "path": "projects/22-endian-integer-codec/src/endian_integer_codec.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @sizeOf behavior as exercised by this module",
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
        "path": "std.builtin.Endian",
        "symbols": [
          "std.builtin.Endian"
        ],
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.readInt",
        "symbols": [
          "std.mem.readInt"
        ],
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.writeInt",
        "symbols": [
          "std.mem.writeInt"
        ],
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
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
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualSlices",
        "symbols": [
          "std.testing.expectEqualSlices"
        ],
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
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
          "projects/22-endian-integer-codec/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [
      "std.builtin.Endian",
      "std.mem.readInt",
      "std.mem.writeInt"
    ],
    "mathApis": [],
    "metadataApis": [
      "std.builtin.Endian"
    ]
  },
  "buildSystemUsage": {
    "unitTestStep": "test-endian-integer-codec",
    "smokeTestStep": "smoke-endian-integer-codec",
    "namedModuleImport": "endian-integer-codec",
    "sourcePath": "projects/22-endian-integer-codec/src/endian_integer_codec.zig",
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
      "test-endian-integer-codec",
      "smoke-endian-integer-codec"
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
    "endianSensitive": true,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": false,
    "apis": [],
    "ownershipTransitions": [],
    "notes": []
  },
  "pointerAndMemoryUsage": {
    "pointerSensitive": true,
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
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
    ],
    "smokeTests": [
      "projects/22-endian-integer-codec/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "EndianIntegerCodec"
      ],
      "affectedFiles": [
        "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-endian-integer-codec",
        "zig build smoke-endian-integer-codec"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented endian-integer-codec public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "EndianIntegerCodec"
      ],
      "detectionTests": [
        "zig build test-endian-integer-codec",
        "zig build smoke-endian-integer-codec"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "endian-integer-codec"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-endian-integer-codec",
      "zig build smoke-endian-integer-codec"
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
      "projects/22-endian-integer-codec/port.js",
      "projects/22-endian-integer-codec/details.json",
      "projects/22-endian-integer-codec/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-endian-integer-codec"
    ],
    "recommendedPortOrder": [
      "endian-integer-codec"
    ],
    "searchTerms": [
      "@as",
      "@sizeOf",
      "std.builtin.Endian",
      "std.mem.readInt",
      "std.mem.writeInt",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@sizeOf",
      "std.builtin.Endian",
      "std.mem.readInt",
      "std.mem.writeInt",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.builtin.Endian",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "api": "std.mem.readInt",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "api": "std.mem.writeInt",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/22-endian-integer-codec/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "EndianIntegerCodec",
        "file": "projects/22-endian-integer-codec/src/endian_integer_codec.zig"
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
