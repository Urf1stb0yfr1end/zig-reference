module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "07",
    "canonicalName": "bitmap-allocator",
    "displayName": "Bitmap Allocator",
    "directory": "projects/07-bitmap-allocator",
    "publicEntrypoint": "projects/07-bitmap-allocator/src/bitmap_allocator.zig",
    "detailsContract": "projects/07-bitmap-allocator/details.json",
    "humanContract": "projects/07-bitmap-allocator/DETAILS.md",
    "portContract": "projects/07-bitmap-allocator/port.js"
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
      "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
    ],
    "publicEntrypoints": [
      "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
    ],
    "internalUnitTests": [
      "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
    ],
    "externalSmokeTests": [
      "projects/07-bitmap-allocator/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/07-bitmap-allocator/README.md",
      "projects/07-bitmap-allocator/MASTERY.md",
      "projects/07-bitmap-allocator/DETAILS.md",
      "projects/07-bitmap-allocator/details.json",
      "projects/07-bitmap-allocator/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "BitmapAllocator"
    ],
    "publicTypes": [
      {
        "name": "BitmapAllocator(slot_count)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "capacity",
        "signature": "capacity(self: *const Self) usize"
      },
      {
        "name": "allocatedCount",
        "signature": "allocatedCount(self: *const Self) usize"
      },
      {
        "name": "isAllocated",
        "signature": "isAllocated(self: *const Self, index: usize) error{IndexOutOfBounds}!bool"
      },
      {
        "name": "allocate",
        "signature": "allocate(self: *Self) Error!usize"
      },
      {
        "name": "free",
        "signature": "free(self: *Self, index: usize) Error!void"
      },
      {
        "name": "reset",
        "signature": "reset(self: *Self) void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "Full",
      "IndexOutOfBounds",
      "DoubleFree"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bitmap-allocator public behavior, boundaries, and failure semantics."
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
    "repository": [
      {
        "canonicalName": "bit-set",
        "portContract": "projects/03-bit-set/port.js",
        "importName": "bit-set",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
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
      "@This",
      "@as"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/07-bitmap-allocator/src/bitmap_allocator.zig",
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
            "path": "projects/07-bitmap-allocator/src/bitmap_allocator.zig",
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
        "path": "std.testing.expectEqual",
        "symbols": [
          "std.testing.expectEqual"
        ],
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
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
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
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
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
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
          "projects/07-bitmap-allocator/tests/smoke_test.zig"
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
    "unitTestStep": "test-bitmap-allocator",
    "smokeTestStep": "smoke-bitmap-allocator",
    "namedModuleImport": "bitmap-allocator",
    "sourcePath": "projects/07-bitmap-allocator/src/bitmap_allocator.zig",
    "directModuleDependencies": [
      "bit-set"
    ],
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
      "test-bitmap-allocator",
      "smoke-bitmap-allocator"
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
      "Full",
      "IndexOutOfBounds",
      "DoubleFree"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
    ],
    "smokeTests": [
      "projects/07-bitmap-allocator/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "BitmapAllocator"
      ],
      "affectedFiles": [
        "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bitmap-allocator",
        "zig build smoke-bitmap-allocator"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bitmap-allocator public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "BitmapAllocator"
      ],
      "detectionTests": [
        "zig build test-bitmap-allocator",
        "zig build smoke-bitmap-allocator"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bit-set"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bit-set",
      "bitmap-allocator"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bitmap-allocator",
      "zig build smoke-bitmap-allocator"
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
      "projects/07-bitmap-allocator/port.js",
      "projects/07-bitmap-allocator/details.json",
      "projects/07-bitmap-allocator/DETAILS.md",
      "projects/03-bit-set/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bitmap-allocator"
    ],
    "recommendedPortOrder": [
      "bit-set",
      "bitmap-allocator"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
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
        "builtin": "@This",
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/07-bitmap-allocator/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "BitmapAllocator",
        "file": "projects/07-bitmap-allocator/src/bitmap_allocator.zig"
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
