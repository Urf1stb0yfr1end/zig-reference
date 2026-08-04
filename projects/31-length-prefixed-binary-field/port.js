module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "31",
    "canonicalName": "length-prefixed-binary-field",
    "displayName": "Length Prefixed Binary Field",
    "directory": "projects/31-length-prefixed-binary-field",
    "publicEntrypoint": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
    "detailsContract": "projects/31-length-prefixed-binary-field/details.json",
    "humanContract": "projects/31-length-prefixed-binary-field/DETAILS.md",
    "portContract": "projects/31-length-prefixed-binary-field/port.js"
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
      "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
    ],
    "publicEntrypoints": [
      "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
    ],
    "internalUnitTests": [
      "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
    ],
    "externalSmokeTests": [
      "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/31-length-prefixed-binary-field/README.md",
      "projects/31-length-prefixed-binary-field/MASTERY.md",
      "projects/31-length-prefixed-binary-field/DETAILS.md",
      "projects/31-length-prefixed-binary-field/details.json",
      "projects/31-length-prefixed-binary-field/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "LengthPrefixedField"
    ],
    "publicTypes": [
      {
        "name": "LengthPrefixedField",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented length-prefixed-binary-field public behavior, boundaries, and failure semantics."
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
        "canonicalName": "bounded-byte-reader",
        "portContract": "projects/04-bounded-byte-reader/port.js",
        "importName": "bounded-byte-reader",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-integer-cast",
        "portContract": "projects/10-checked-integer-cast/port.js",
        "importName": "checked-integer-cast",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "endian-integer-codec",
        "portContract": "projects/22-endian-integer-codec/port.js",
        "importName": "endian-integer-codec",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "binary-cursor-checkpoint",
        "portContract": "projects/29-binary-cursor-checkpoint/port.js",
        "importName": "binary-cursor-checkpoint",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "bounded-binary-sub-reader",
        "portContract": "projects/30-bounded-binary-sub-reader/port.js",
        "importName": "bounded-binary-sub-reader",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.builtin.Endian",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
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
            "path": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
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
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
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
        "name": "@sizeOf",
        "files": [
          {
            "path": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
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
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
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
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
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
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
          "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
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
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
          "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
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
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [
      "std.builtin.Endian"
    ],
    "mathApis": [],
    "metadataApis": [
      "std.builtin.Endian"
    ]
  },
  "buildSystemUsage": {
    "unitTestStep": "test-length-prefixed-binary-field",
    "smokeTestStep": "smoke-length-prefixed-binary-field",
    "namedModuleImport": "length-prefixed-binary-field",
    "sourcePath": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
    "directModuleDependencies": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader"
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
      "test-length-prefixed-binary-field",
      "smoke-length-prefixed-binary-field"
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
    "builtins": [
      "@memcpy"
    ],
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
      "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
    ],
    "smokeTests": [
      "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "LengthPrefixedField"
      ],
      "affectedFiles": [
        "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-length-prefixed-binary-field",
        "zig build smoke-length-prefixed-binary-field"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented length-prefixed-binary-field public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "LengthPrefixedField"
      ],
      "detectionTests": [
        "zig build test-length-prefixed-binary-field",
        "zig build smoke-length-prefixed-binary-field"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "length-prefixed-binary-field"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-length-prefixed-binary-field",
      "zig build smoke-length-prefixed-binary-field"
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
      "projects/31-length-prefixed-binary-field/port.js",
      "projects/31-length-prefixed-binary-field/details.json",
      "projects/31-length-prefixed-binary-field/DETAILS.md",
      "projects/04-bounded-byte-reader/port.js",
      "projects/10-checked-integer-cast/port.js",
      "projects/22-endian-integer-codec/port.js",
      "projects/29-binary-cursor-checkpoint/port.js",
      "projects/30-bounded-binary-sub-reader/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-length-prefixed-binary-field"
    ],
    "recommendedPortOrder": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "length-prefixed-binary-field"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf",
      "std.builtin.Endian",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf",
      "std.builtin.Endian",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.builtin.Endian",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
          "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig",
          "projects/31-length-prefixed-binary-field/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "LengthPrefixedField",
        "file": "projects/31-length-prefixed-binary-field/src/length_prefixed_binary_field.zig"
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
