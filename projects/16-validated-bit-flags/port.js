module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "16",
    "canonicalName": "validated-bit-flags",
    "displayName": "Validated Bit Flags",
    "directory": "projects/16-validated-bit-flags",
    "publicEntrypoint": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
    "detailsContract": "projects/16-validated-bit-flags/details.json",
    "humanContract": "projects/16-validated-bit-flags/DETAILS.md",
    "portContract": "projects/16-validated-bit-flags/port.js"
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
      "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
    ],
    "publicEntrypoints": [
      "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
    ],
    "internalUnitTests": [
      "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
    ],
    "externalSmokeTests": [
      "projects/16-validated-bit-flags/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/16-validated-bit-flags/README.md",
      "projects/16-validated-bit-flags/MASTERY.md",
      "projects/16-validated-bit-flags/DETAILS.md",
      "projects/16-validated-bit-flags/details.json",
      "projects/16-validated-bit-flags/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ValidatedBitFlags"
    ],
    "publicTypes": [
      {
        "name": "ValidatedBitFlags(Flag)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "fromRaw",
        "signature": "fromRaw(raw: Storage) error{UnknownBits}!Self"
      },
      {
        "name": "raw",
        "signature": "raw(self: Self) Storage"
      },
      {
        "name": "contains",
        "signature": "contains(self: Self, flag: Flag) bool"
      },
      {
        "name": "insert",
        "signature": "insert(self: *Self, flag: Flag) void"
      },
      {
        "name": "remove",
        "signature": "remove(self: *Self, flag: Flag) void"
      },
      {
        "name": "clear",
        "signature": "clear(self: *Self) void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "UnknownBits"
    ],
    "invariantsToPreserve": [
      "Preserve the documented validated-bit-flags public behavior, boundaries, and failure semantics."
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
      "std.meta.fields",
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
      "@This",
      "@as",
      "@intCast",
      "@intFromEnum"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
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
            "path": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
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
        "name": "@intCast",
        "files": [
          {
            "path": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intCast behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intFromEnum",
        "files": [
          {
            "path": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromEnum behavior as exercised by this module",
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
        "path": "std.meta.Tag",
        "symbols": [
          "std.meta.Tag"
        ],
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.meta.fields",
        "symbols": [
          "std.meta.fields"
        ],
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
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
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
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
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
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
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
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
          "projects/16-validated-bit-flags/tests/smoke_test.zig"
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
      "std.meta.fields"
    ]
  },
  "buildSystemUsage": {
    "unitTestStep": "test-validated-bit-flags",
    "smokeTestStep": "smoke-validated-bit-flags",
    "namedModuleImport": "validated-bit-flags",
    "sourcePath": "projects/16-validated-bit-flags/src/validated_bit_flags.zig",
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
      "test-validated-bit-flags",
      "smoke-validated-bit-flags"
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
      "@as",
      "@intCast",
      "@intFromEnum"
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
      "UnknownBits"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
    ],
    "smokeTests": [
      "projects/16-validated-bit-flags/tests/smoke_test.zig"
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
        "ValidatedBitFlags"
      ],
      "affectedFiles": [
        "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-validated-bit-flags",
        "zig build smoke-validated-bit-flags"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented validated-bit-flags public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ValidatedBitFlags"
      ],
      "detectionTests": [
        "zig build test-validated-bit-flags",
        "zig build smoke-validated-bit-flags"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "validated-bit-flags"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-validated-bit-flags",
      "zig build smoke-validated-bit-flags"
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
      "projects/16-validated-bit-flags/port.js",
      "projects/16-validated-bit-flags/details.json",
      "projects/16-validated-bit-flags/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-validated-bit-flags"
    ],
    "recommendedPortOrder": [
      "validated-bit-flags"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@intCast",
      "@intFromEnum",
      "std.meta.Tag",
      "std.meta.fields",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@intCast",
      "@intFromEnum",
      "std.meta.Tag",
      "std.meta.fields",
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
        "builtin": "@This",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "builtin": "@intCast",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "builtin": "@intFromEnum",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.meta.Tag",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "api": "std.meta.fields",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/16-validated-bit-flags/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "ValidatedBitFlags",
        "file": "projects/16-validated-bit-flags/src/validated_bit_flags.zig"
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
