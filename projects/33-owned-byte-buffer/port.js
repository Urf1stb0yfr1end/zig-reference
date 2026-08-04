module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "33",
    "canonicalName": "owned-byte-buffer",
    "displayName": "Owned Byte Buffer",
    "directory": "projects/33-owned-byte-buffer",
    "publicEntrypoint": "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
    "detailsContract": "projects/33-owned-byte-buffer/details.json",
    "humanContract": "projects/33-owned-byte-buffer/DETAILS.md",
    "portContract": "projects/33-owned-byte-buffer/port.js"
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
      "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
    ],
    "publicEntrypoints": [
      "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
    ],
    "internalUnitTests": [
      "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
    ],
    "externalSmokeTests": [
      "projects/33-owned-byte-buffer/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/33-owned-byte-buffer/README.md",
      "projects/33-owned-byte-buffer/MASTERY.md",
      "projects/33-owned-byte-buffer/DETAILS.md",
      "projects/33-owned-byte-buffer/details.json",
      "projects/33-owned-byte-buffer/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "OwnedByteBuffer"
    ],
    "publicTypes": [
      {
        "name": "OwnedByteBuffer",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented owned-byte-buffer public behavior, boundaries, and failure semantics."
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
    "repository": [
      {
        "canonicalName": "dynamic-array",
        "portContract": "projects/01-dynamic-array/port.js",
        "importName": "dynamic-array",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "byte-writer",
        "portContract": "projects/06-byte-writer/port.js",
        "importName": "byte-writer",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.heap.FixedBufferAllocator.init",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
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
            "path": "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/33-owned-byte-buffer/tests/smoke_test.zig",
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
        "path": "std.heap.FixedBufferAllocator.init",
        "symbols": [
          "std.heap.FixedBufferAllocator.init"
        ],
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.Allocator",
        "symbols": [
          "std.mem.Allocator"
        ],
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.allocator",
        "symbols": [
          "std.testing.allocator"
        ],
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
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
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
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
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
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
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "allocatorApis": [
      "std.heap.FixedBufferAllocator.init",
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-owned-byte-buffer",
    "smokeTestStep": "smoke-owned-byte-buffer",
    "namedModuleImport": "owned-byte-buffer",
    "sourcePath": "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
    "directModuleDependencies": [
      "dynamic-array",
      "byte-writer"
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
      "test-owned-byte-buffer",
      "smoke-owned-byte-buffer"
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
    "allocatorSensitive": true,
    "apis": [
      "std.heap.FixedBufferAllocator.init",
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
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
      "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
    ],
    "smokeTests": [
      "projects/33-owned-byte-buffer/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expectEqual",
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
        "OwnedByteBuffer"
      ],
      "affectedFiles": [
        "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-owned-byte-buffer",
        "zig build smoke-owned-byte-buffer"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented owned-byte-buffer public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "OwnedByteBuffer"
      ],
      "detectionTests": [
        "zig build test-owned-byte-buffer",
        "zig build smoke-owned-byte-buffer"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "dynamic-array",
      "byte-writer"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "dynamic-array",
      "byte-writer",
      "owned-byte-buffer"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-owned-byte-buffer",
      "zig build smoke-owned-byte-buffer"
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
      "projects/33-owned-byte-buffer/port.js",
      "projects/33-owned-byte-buffer/details.json",
      "projects/33-owned-byte-buffer/DETAILS.md",
      "projects/01-dynamic-array/port.js",
      "projects/06-byte-writer/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-owned-byte-buffer"
    ],
    "recommendedPortOrder": [
      "dynamic-array",
      "byte-writer",
      "owned-byte-buffer"
    ],
    "searchTerms": [
      "@as",
      "std.heap.FixedBufferAllocator.init",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expectEqual",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "std.heap.FixedBufferAllocator.init",
      "std.mem.Allocator",
      "std.testing.allocator",
      "std.testing.expectEqual",
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
        "builtin": "@as",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.heap.FixedBufferAllocator.init",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ]
      },
      {
        "api": "std.mem.Allocator",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ]
      },
      {
        "api": "std.testing.allocator",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualStrings",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig",
          "projects/33-owned-byte-buffer/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "OwnedByteBuffer",
        "file": "projects/33-owned-byte-buffer/src/owned_byte_buffer.zig"
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
