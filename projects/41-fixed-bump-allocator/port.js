module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "41",
    "canonicalName": "fixed-bump-allocator",
    "displayName": "Fixed Bump Allocator",
    "directory": "projects/41-fixed-bump-allocator",
    "publicEntrypoint": "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
    "detailsContract": "projects/41-fixed-bump-allocator/details.json",
    "humanContract": "projects/41-fixed-bump-allocator/DETAILS.md",
    "portContract": "projects/41-fixed-bump-allocator/port.js"
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
      "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
    ],
    "publicEntrypoints": [
      "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
    ],
    "internalUnitTests": [
      "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
    ],
    "externalSmokeTests": [
      "projects/41-fixed-bump-allocator/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/41-fixed-bump-allocator/README.md",
      "projects/41-fixed-bump-allocator/MASTERY.md",
      "projects/41-fixed-bump-allocator/DETAILS.md",
      "projects/41-fixed-bump-allocator/details.json",
      "projects/41-fixed-bump-allocator/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "FixedBumpAllocator"
    ],
    "publicTypes": [
      {
        "name": "FixedBumpAllocator",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented fixed-bump-allocator public behavior, boundaries, and failure semantics."
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
        "canonicalName": "aligned-address-and-size-helpers",
        "portContract": "projects/15-aligned-address-and-size-helpers/port.js",
        "importName": "aligned-address-and-size-helpers",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.math.add",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as",
      "@intFromPtr"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/41-fixed-bump-allocator/tests/smoke_test.zig",
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
        "name": "@intFromPtr",
        "files": [
          {
            "path": "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromPtr behavior as exercised by this module",
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
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
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
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
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
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
          "projects/41-fixed-bump-allocator/tests/smoke_test.zig"
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
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
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
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.add"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-fixed-bump-allocator",
    "smokeTestStep": "smoke-fixed-bump-allocator",
    "namedModuleImport": "fixed-bump-allocator",
    "sourcePath": "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
    "directModuleDependencies": [
      "aligned-address-and-size-helpers"
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
      "test-fixed-bump-allocator",
      "smoke-fixed-bump-allocator"
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
      "@intFromPtr"
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
      "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
    ],
    "smokeTests": [
      "projects/41-fixed-bump-allocator/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
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
        "FixedBumpAllocator"
      ],
      "affectedFiles": [
        "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-fixed-bump-allocator",
        "zig build smoke-fixed-bump-allocator"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented fixed-bump-allocator public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "FixedBumpAllocator"
      ],
      "detectionTests": [
        "zig build test-fixed-bump-allocator",
        "zig build smoke-fixed-bump-allocator"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "aligned-address-and-size-helpers"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-fixed-bump-allocator",
      "zig build smoke-fixed-bump-allocator"
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
      "projects/41-fixed-bump-allocator/port.js",
      "projects/41-fixed-bump-allocator/details.json",
      "projects/41-fixed-bump-allocator/DETAILS.md",
      "projects/15-aligned-address-and-size-helpers/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-fixed-bump-allocator"
    ],
    "recommendedPortOrder": [
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator"
    ],
    "searchTerms": [
      "@as",
      "@intFromPtr",
      "std.math.add",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@intFromPtr",
      "std.math.add",
      "std.testing.expect",
      "std.testing.expectEqual",
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
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
          "projects/41-fixed-bump-allocator/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@intFromPtr",
        "files": [
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig",
          "projects/41-fixed-bump-allocator/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "FixedBumpAllocator",
        "file": "projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig"
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
