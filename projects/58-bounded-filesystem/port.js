module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "58",
    "canonicalName": "bounded-filesystem",
    "displayName": "Bounded Filesystem",
    "directory": "projects/58-bounded-filesystem",
    "publicEntrypoint": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
    "detailsContract": "projects/58-bounded-filesystem/details.json",
    "humanContract": "projects/58-bounded-filesystem/DETAILS.md",
    "portContract": "projects/58-bounded-filesystem/port.js"
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
      "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
    ],
    "publicEntrypoints": [
      "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
    ],
    "internalUnitTests": [
      "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
    ],
    "externalSmokeTests": [
      "projects/58-bounded-filesystem/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/58-bounded-filesystem/README.md",
      "projects/58-bounded-filesystem/MASTERY.md",
      "projects/58-bounded-filesystem/DETAILS.md",
      "projects/58-bounded-filesystem/details.json",
      "projects/58-bounded-filesystem/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ObjectId",
      "Kind",
      "Error",
      "FileSystem"
    ],
    "publicTypes": [
      {
        "name": "ObjectId",
        "kind": "public declaration"
      },
      {
        "name": "Kind",
        "kind": "public declaration"
      },
      {
        "name": "Error",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [
      {
        "name": "FileSystem",
        "signature": "FileSystem(comptime object_capacity: usize, comptime name_capacity: usize, comptime file_capacity: usize) type"
      }
    ],
    "publicMethods": [
      {
        "name": "create",
        "signature": "create(self: *Self, parent: ObjectId, name: []const u8, kind: Kind, bytes: []const u8) Error!ObjectId"
      },
      {
        "name": "lookup",
        "signature": "lookup(self: *const Self, start: ObjectId, path: []const u8) Error!ObjectId"
      },
      {
        "name": "read",
        "signature": "read(self: *const Self, id: ObjectId, offset: usize, destination: []u8) Error!usize"
      },
      {
        "name": "resolve",
        "signature": "resolve(self: *const Self, id: ObjectId) ?*const Object"
      }
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented bounded-filesystem public behavior, boundaries, and failure semantics."
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
      "std.mem.eql",
      "std.mem.indexOfScalar",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "@memcpy",
      "@min"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
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
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
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
        "name": "@enumFromInt",
        "files": [
          {
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @enumFromInt behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intFromEnum",
        "files": [
          {
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromEnum behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @memcpy behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@min",
        "files": [
          {
            "path": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
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
        "path": "std.mem.eql",
        "symbols": [
          "std.mem.eql"
        ],
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.indexOfScalar",
        "symbols": [
          "std.mem.indexOfScalar"
        ],
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
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
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
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
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualStrings",
        "symbols": [
          "std.testing.expectEqualStrings"
        ],
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
          "projects/58-bounded-filesystem/tests/smoke_test.zig"
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
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-filesystem",
    "smokeTestStep": "smoke-bounded-filesystem",
    "namedModuleImport": "bounded-filesystem",
    "sourcePath": "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
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
      "test-bounded-filesystem",
      "smoke-bounded-filesystem"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "supported",
    "freestanding": "supported",
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
    "pointerSensitive": true,
    "builtins": [
      "@memcpy"
    ],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [
      "@as",
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
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
    ],
    "smokeTests": [
      "projects/58-bounded-filesystem/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
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
        "ObjectId",
        "Kind",
        "Error",
        "FileSystem"
      ],
      "affectedFiles": [
        "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-filesystem",
        "zig build smoke-bounded-filesystem"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-filesystem public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ObjectId",
        "Kind",
        "Error",
        "FileSystem"
      ],
      "detectionTests": [
        "zig build test-bounded-filesystem",
        "zig build smoke-bounded-filesystem"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-filesystem"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-filesystem",
      "zig build smoke-bounded-filesystem"
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
      "projects/58-bounded-filesystem/port.js",
      "projects/58-bounded-filesystem/details.json",
      "projects/58-bounded-filesystem/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-filesystem"
    ],
    "recommendedPortOrder": [
      "bounded-filesystem"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "@memcpy",
      "@min",
      "std.mem.eql",
      "std.mem.indexOfScalar",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "@memcpy",
      "@min",
      "std.mem.eql",
      "std.mem.indexOfScalar",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
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
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "builtin": "@enumFromInt",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "builtin": "@intFromEnum",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "builtin": "@min",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.mem.eql",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "api": "std.mem.indexOfScalar",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualStrings",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig",
          "projects/58-bounded-filesystem/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "ObjectId",
        "file": "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
      },
      {
        "symbol": "Kind",
        "file": "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
      },
      {
        "symbol": "Error",
        "file": "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
      },
      {
        "symbol": "FileSystem",
        "file": "projects/58-bounded-filesystem/src/bounded_filesystem.zig"
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
