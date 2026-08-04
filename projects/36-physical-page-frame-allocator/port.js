module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "36",
    "canonicalName": "physical-page-frame-allocator",
    "displayName": "Physical Page Frame Allocator",
    "directory": "projects/36-physical-page-frame-allocator",
    "publicEntrypoint": "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
    "detailsContract": "projects/36-physical-page-frame-allocator/details.json",
    "humanContract": "projects/36-physical-page-frame-allocator/DETAILS.md",
    "portContract": "projects/36-physical-page-frame-allocator/port.js"
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
      "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
    ],
    "publicEntrypoints": [
      "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
    ],
    "internalUnitTests": [
      "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
    ],
    "externalSmokeTests": [
      "projects/36-physical-page-frame-allocator/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/36-physical-page-frame-allocator/README.md",
      "projects/36-physical-page-frame-allocator/MASTERY.md",
      "projects/36-physical-page-frame-allocator/DETAILS.md",
      "projects/36-physical-page-frame-allocator/details.json",
      "projects/36-physical-page-frame-allocator/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "PhysicalPageFrameAllocator"
    ],
    "publicTypes": [
      {
        "name": "PhysicalPageFrameAllocator",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented physical-page-frame-allocator public behavior, boundaries, and failure semantics."
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
        "canonicalName": "bit-set",
        "portContract": "projects/03-bit-set/port.js",
        "importName": "bit-set",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "bitmap-allocator",
        "portContract": "projects/07-bitmap-allocator/port.js",
        "importName": "bitmap-allocator",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-half-open-range",
        "portContract": "projects/17-checked-half-open-range/port.js",
        "importName": "checked-half-open-range",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "distinct-memory-address-types",
        "portContract": "projects/18-distinct-memory-address-types/port.js",
        "importName": "distinct-memory-address-types",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "physical-page-frame-number-and-address-conversion",
        "portContract": "projects/28-physical-page-frame-number-and-address-conversion/port.js",
        "importName": "physical-page-frame-number-and-address-conversion",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "physical-memory-region-set",
        "portContract": "projects/35-physical-memory-region-set/port.js",
        "importName": "physical-memory-region-set",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
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
            "path": "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
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
            "path": "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
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
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
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
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
          "projects/36-physical-page-frame-allocator/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-physical-page-frame-allocator",
    "smokeTestStep": "smoke-physical-page-frame-allocator",
    "namedModuleImport": "physical-page-frame-allocator",
    "sourcePath": "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
    "directModuleDependencies": [
      "bit-set",
      "bitmap-allocator",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set"
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
      "test-physical-page-frame-allocator",
      "smoke-physical-page-frame-allocator"
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
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
    ],
    "smokeTests": [
      "projects/36-physical-page-frame-allocator/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "PhysicalPageFrameAllocator"
      ],
      "affectedFiles": [
        "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-physical-page-frame-allocator",
        "zig build smoke-physical-page-frame-allocator"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented physical-page-frame-allocator public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "PhysicalPageFrameAllocator"
      ],
      "detectionTests": [
        "zig build test-physical-page-frame-allocator",
        "zig build smoke-physical-page-frame-allocator"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bit-set",
      "bitmap-allocator",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bit-set",
      "bitmap-allocator",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set",
      "physical-page-frame-allocator"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-physical-page-frame-allocator",
      "zig build smoke-physical-page-frame-allocator"
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
      "projects/36-physical-page-frame-allocator/port.js",
      "projects/36-physical-page-frame-allocator/details.json",
      "projects/36-physical-page-frame-allocator/DETAILS.md",
      "projects/03-bit-set/port.js",
      "projects/07-bitmap-allocator/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/18-distinct-memory-address-types/port.js",
      "projects/28-physical-page-frame-number-and-address-conversion/port.js",
      "projects/35-physical-memory-region-set/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-physical-page-frame-allocator"
    ],
    "recommendedPortOrder": [
      "bit-set",
      "bitmap-allocator",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set",
      "physical-page-frame-allocator"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
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
        "builtin": "@This",
        "files": [
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig",
          "projects/36-physical-page-frame-allocator/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "PhysicalPageFrameAllocator",
        "file": "projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig"
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
