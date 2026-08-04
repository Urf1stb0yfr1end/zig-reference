module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "06",
    "canonicalName": "byte-writer",
    "displayName": "Byte Writer",
    "directory": "projects/06-byte-writer",
    "publicEntrypoint": "projects/06-byte-writer/src/byte_writer.zig",
    "detailsContract": "projects/06-byte-writer/details.json",
    "humanContract": "projects/06-byte-writer/DETAILS.md",
    "portContract": "projects/06-byte-writer/port.js"
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
      "projects/06-byte-writer/src/byte_writer.zig"
    ],
    "publicEntrypoints": [
      "projects/06-byte-writer/src/byte_writer.zig"
    ],
    "internalUnitTests": [
      "projects/06-byte-writer/src/byte_writer.zig"
    ],
    "externalSmokeTests": [
      "projects/06-byte-writer/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/06-byte-writer/README.md",
      "projects/06-byte-writer/MASTERY.md",
      "projects/06-byte-writer/DETAILS.md",
      "projects/06-byte-writer/details.json",
      "projects/06-byte-writer/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ByteWriter"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented byte-writer public behavior, boundaries, and failure semantics."
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
      }
    ],
    "standardLibrary": [
      "std.mem.Allocator",
      "std.mem.writeInt",
      "std.testing.allocator",
      "std.testing.expectEqualSlices",
      "std.testing.expectEqualStrings",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@memcpy"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/06-byte-writer/src/byte_writer.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @memcpy behavior as exercised by this module",
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
        "path": "std.mem.Allocator",
        "symbols": [
          "std.mem.Allocator"
        ],
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/src/byte_writer.zig"
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
          "projects/06-byte-writer/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expectEqualSlices",
      "std.testing.expectEqualStrings",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
    "ioApis": [],
    "endianApis": [
      "std.mem.writeInt"
    ],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-byte-writer",
    "smokeTestStep": "smoke-byte-writer",
    "namedModuleImport": "byte-writer",
    "sourcePath": "projects/06-byte-writer/src/byte_writer.zig",
    "directModuleDependencies": [
      "dynamic-array"
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
      "test-byte-writer",
      "smoke-byte-writer"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "unknown",
    "freestanding": "unknown",
    "targets": [],
    "endianSensitive": true,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": true,
    "apis": [
      "std.mem.Allocator",
      "std.testing.allocator"
    ],
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
      "projects/06-byte-writer/src/byte_writer.zig"
    ],
    "smokeTests": [
      "projects/06-byte-writer/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.allocator",
      "std.testing.expectEqualSlices",
      "std.testing.expectEqualStrings",
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
        "ByteWriter"
      ],
      "affectedFiles": [
        "projects/06-byte-writer/src/byte_writer.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-byte-writer",
        "zig build smoke-byte-writer"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented byte-writer public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ByteWriter"
      ],
      "detectionTests": [
        "zig build test-byte-writer",
        "zig build smoke-byte-writer"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "dynamic-array"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "dynamic-array",
      "byte-writer"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-byte-writer",
      "zig build smoke-byte-writer"
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
      "projects/06-byte-writer/port.js",
      "projects/06-byte-writer/details.json",
      "projects/06-byte-writer/DETAILS.md",
      "projects/01-dynamic-array/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-byte-writer"
    ],
    "recommendedPortOrder": [
      "dynamic-array",
      "byte-writer"
    ],
    "searchTerms": [
      "@memcpy",
      "std.mem.Allocator",
      "std.mem.writeInt",
      "std.testing.allocator",
      "std.testing.expectEqualSlices",
      "std.testing.expectEqualStrings",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@memcpy",
      "std.mem.Allocator",
      "std.mem.writeInt",
      "std.testing.allocator",
      "std.testing.expectEqualSlices",
      "std.testing.expectEqualStrings",
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
        "builtin": "@memcpy",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.mem.Allocator",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.mem.writeInt",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.testing.allocator",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualStrings",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/06-byte-writer/src/byte_writer.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/06-byte-writer/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "ByteWriter",
        "file": "projects/06-byte-writer/src/byte_writer.zig"
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
