module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "04",
    "canonicalName": "bounded-byte-reader",
    "displayName": "Bounded Byte Reader",
    "directory": "projects/04-bounded-byte-reader",
    "publicEntrypoint": "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig",
    "detailsContract": "projects/04-bounded-byte-reader/details.json",
    "humanContract": "projects/04-bounded-byte-reader/DETAILS.md",
    "portContract": "projects/04-bounded-byte-reader/port.js"
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
      "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
    ],
    "publicEntrypoints": [
      "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
    ],
    "internalUnitTests": [
      "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
    ],
    "externalSmokeTests": [
      "projects/04-bounded-byte-reader/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/04-bounded-byte-reader/README.md",
      "projects/04-bounded-byte-reader/MASTERY.md",
      "projects/04-bounded-byte-reader/DETAILS.md",
      "projects/04-bounded-byte-reader/details.json",
      "projects/04-bounded-byte-reader/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "BoundedReader"
    ],
    "publicTypes": [
      {
        "name": "BoundedReader",
        "kind": "struct"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(input: []const u8) BoundedReader"
      },
      {
        "name": "remaining",
        "signature": "remaining(self: *const BoundedReader) usize"
      },
      {
        "name": "readBytes",
        "signature": "readBytes(self: *BoundedReader, count: usize) Error![]const u8"
      },
      {
        "name": "skip",
        "signature": "skip(self: *BoundedReader, count: usize) Error!void"
      },
      {
        "name": "readU8",
        "signature": "readU8(self: *BoundedReader) Error!u8"
      },
      {
        "name": "readU16Le/readU16Be",
        "signature": "explicit-endian u16 reads"
      },
      {
        "name": "readU32Le/readU32Be",
        "signature": "explicit-endian u32 reads"
      },
      {
        "name": "subReader",
        "signature": "subReader(self: *BoundedReader, count: usize) Error!BoundedReader"
      },
      {
        "name": "extent",
        "signature": "extent(self: BoundedReader) usize"
      },
      {
        "name": "seek",
        "signature": "seek(self: *BoundedReader, position_: usize) error{InvalidPosition}!void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "UnexpectedEnd",
      "InvalidPosition"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bounded-byte-reader public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [
      "[object Object]"
    ],
    "failureAtomicityToPreserve": [],
    "binaryLayoutsToPreserve": [],
    "compatibilityPromisesToPreserve": [],
    "intentionallyUnstableDetails": []
  },
  "dependencies": {
    "repository": [],
    "standardLibrary": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
            "path": "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig",
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
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
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
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
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
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
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
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
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
          "projects/04-bounded-byte-reader/tests/smoke_test.zig"
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
      "std.testing.expectEqualSlices",
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
    "unitTestStep": "test-bounded-byte-reader",
    "smokeTestStep": "smoke-bounded-byte-reader",
    "namedModuleImport": "bounded-byte-reader",
    "sourcePath": "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig",
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
      "test-bounded-byte-reader",
      "smoke-bounded-byte-reader"
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
      "UnexpectedEnd",
      "InvalidPosition"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
    ],
    "smokeTests": [
      "projects/04-bounded-byte-reader/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "BoundedReader"
      ],
      "affectedFiles": [
        "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-byte-reader",
        "zig build smoke-bounded-byte-reader"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-byte-reader public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "BoundedReader"
      ],
      "detectionTests": [
        "zig build test-bounded-byte-reader",
        "zig build smoke-bounded-byte-reader"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-byte-reader"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-byte-reader",
      "zig build smoke-bounded-byte-reader"
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
      "projects/04-bounded-byte-reader/port.js",
      "projects/04-bounded-byte-reader/details.json",
      "projects/04-bounded-byte-reader/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-byte-reader"
    ],
    "recommendedPortOrder": [
      "bounded-byte-reader"
    ],
    "searchTerms": [
      "@as",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/04-bounded-byte-reader/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "BoundedReader",
        "file": "projects/04-bounded-byte-reader/src/bounded_byte_reader.zig"
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
