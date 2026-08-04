module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "28",
    "canonicalName": "physical-page-frame-number-and-address-conversion",
    "displayName": "Physical Page Frame Number And Address Conversion",
    "directory": "projects/28-physical-page-frame-number-and-address-conversion",
    "publicEntrypoint": "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig",
    "detailsContract": "projects/28-physical-page-frame-number-and-address-conversion/details.json",
    "humanContract": "projects/28-physical-page-frame-number-and-address-conversion/DETAILS.md",
    "portContract": "projects/28-physical-page-frame-number-and-address-conversion/port.js"
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
      "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
    ],
    "publicEntrypoints": [
      "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
    ],
    "internalUnitTests": [
      "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
    ],
    "externalSmokeTests": [
      "projects/28-physical-page-frame-number-and-address-conversion/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/28-physical-page-frame-number-and-address-conversion/README.md",
      "projects/28-physical-page-frame-number-and-address-conversion/MASTERY.md",
      "projects/28-physical-page-frame-number-and-address-conversion/DETAILS.md",
      "projects/28-physical-page-frame-number-and-address-conversion/details.json",
      "projects/28-physical-page-frame-number-and-address-conversion/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "PageSize",
      "PhysicalPageFrameNumber"
    ],
    "publicTypes": [],
    "publicFunctions": [],
    "publicMethods": [
      "init",
      "toAddress",
      "fromAddress"
    ],
    "publicConstants": [],
    "publicErrors": [
      "Overflow",
      "Unaligned"
    ],
    "invariantsToPreserve": [
      "Preserve the documented physical-page-frame-number-and-address-conversion public behavior, boundaries, and failure semantics."
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
        "canonicalName": "distinct-memory-address-types",
        "portContract": "projects/18-distinct-memory-address-types/port.js",
        "importName": "distinct-memory-address-types",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.math.mul",
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
            "path": "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig",
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
        "path": "std.math.mul",
        "symbols": [
          "std.math.mul"
        ],
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
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
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
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
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
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
          "projects/28-physical-page-frame-number-and-address-conversion/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.mul"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-physical-page-frame-number-and-address-conversion",
    "smokeTestStep": "smoke-physical-page-frame-number-and-address-conversion",
    "namedModuleImport": "physical-page-frame-number-and-address-conversion",
    "sourcePath": "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig",
    "directModuleDependencies": [
      "distinct-memory-address-types"
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
      "test-physical-page-frame-number-and-address-conversion",
      "smoke-physical-page-frame-number-and-address-conversion"
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
      "Overflow",
      "Unaligned"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
    ],
    "smokeTests": [
      "projects/28-physical-page-frame-number-and-address-conversion/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "PageSize",
        "PhysicalPageFrameNumber"
      ],
      "affectedFiles": [
        "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-physical-page-frame-number-and-address-conversion",
        "zig build smoke-physical-page-frame-number-and-address-conversion"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented physical-page-frame-number-and-address-conversion public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "PageSize",
        "PhysicalPageFrameNumber"
      ],
      "detectionTests": [
        "zig build test-physical-page-frame-number-and-address-conversion",
        "zig build smoke-physical-page-frame-number-and-address-conversion"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "distinct-memory-address-types"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-physical-page-frame-number-and-address-conversion",
      "zig build smoke-physical-page-frame-number-and-address-conversion"
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
      "projects/28-physical-page-frame-number-and-address-conversion/port.js",
      "projects/28-physical-page-frame-number-and-address-conversion/details.json",
      "projects/28-physical-page-frame-number-and-address-conversion/DETAILS.md",
      "projects/18-distinct-memory-address-types/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-physical-page-frame-number-and-address-conversion"
    ],
    "recommendedPortOrder": [
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion"
    ],
    "searchTerms": [
      "@as",
      "std.math.mul",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "std.math.mul",
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
        "builtin": "@as",
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.mul",
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/28-physical-page-frame-number-and-address-conversion/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "PageSize",
        "file": "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
      },
      {
        "symbol": "PhysicalPageFrameNumber",
        "file": "projects/28-physical-page-frame-number-and-address-conversion/src/physical_page_frame_number_and_address_conversion.zig"
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
