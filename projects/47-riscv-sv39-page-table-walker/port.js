module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "47",
    "canonicalName": "riscv-sv39-page-table-walker",
    "displayName": "RISC-V Sv39 Page Table Walker",
    "directory": "projects/47-riscv-sv39-page-table-walker",
    "publicEntrypoint": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig",
    "detailsContract": "projects/47-riscv-sv39-page-table-walker/details.json",
    "humanContract": "projects/47-riscv-sv39-page-table-walker/DETAILS.md",
    "portContract": "projects/47-riscv-sv39-page-table-walker/port.js"
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
      "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
    ],
    "publicEntrypoints": [
      "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
    ],
    "internalUnitTests": [
      "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
    ],
    "externalSmokeTests": [
      "projects/47-riscv-sv39-page-table-walker/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/47-riscv-sv39-page-table-walker/README.md",
      "projects/47-riscv-sv39-page-table-walker/MASTERY.md",
      "projects/47-riscv-sv39-page-table-walker/DETAILS.md",
      "projects/47-riscv-sv39-page-table-walker/details.json",
      "projects/47-riscv-sv39-page-table-walker/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Error",
      "Result",
      "walk"
    ],
    "publicTypes": [
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "Result",
        "kind": "public declaration"
      },
      {
        "name": "walk",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-sv39-page-table-walker public behavior, boundaries, and failure semantics."
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
        "canonicalName": "riscv-sv39-page-table-entry",
        "portContract": "projects/44-riscv-sv39-page-table-entry/port.js",
        "importName": "riscv-sv39-page-table-entry",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "riscv-sv39-virtual-address-indexing",
        "portContract": "projects/45-riscv-sv39-virtual-address-indexing/port.js",
        "importName": "riscv-sv39-virtual-address-indexing",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "riscv-page-table-page-owner",
        "portContract": "projects/46-riscv-page-table-page-owner/port.js",
        "importName": "riscv-page-table-page-owner",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as",
      "@enumFromInt"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig",
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
            "path": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @enumFromInt behavior as exercised by this module",
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
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
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
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.refAllDecls",
        "symbols": [
          "std.testing.refAllDecls"
        ],
        "files": [
          "projects/47-riscv-sv39-page-table-walker/tests/smoke_test.zig"
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
      "std.testing.refAllDecls"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-riscv-sv39-page-table-walker",
    "smokeTestStep": "smoke-riscv-sv39-page-table-walker",
    "namedModuleImport": "riscv-sv39-page-table-walker",
    "sourcePath": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig",
    "directModuleDependencies": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner"
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
      "test-riscv-sv39-page-table-walker",
      "smoke-riscv-sv39-page-table-walker"
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
      "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
    ],
    "smokeTests": [
      "projects/47-riscv-sv39-page-table-walker/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
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
        "Error",
        "Result",
        "walk"
      ],
      "affectedFiles": [
        "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-sv39-page-table-walker",
        "zig build smoke-riscv-sv39-page-table-walker"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-sv39-page-table-walker public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Error",
        "Result",
        "walk"
      ],
      "detectionTests": [
        "zig build test-riscv-sv39-page-table-walker",
        "zig build smoke-riscv-sv39-page-table-walker"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-sv39-page-table-walker",
      "zig build smoke-riscv-sv39-page-table-walker"
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
      "projects/47-riscv-sv39-page-table-walker/port.js",
      "projects/47-riscv-sv39-page-table-walker/details.json",
      "projects/47-riscv-sv39-page-table-walker/DETAILS.md",
      "projects/44-riscv-sv39-page-table-entry/port.js",
      "projects/45-riscv-sv39-virtual-address-indexing/port.js",
      "projects/46-riscv-page-table-page-owner/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-sv39-page-table-walker"
    ],
    "recommendedPortOrder": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker"
    ],
    "searchTerms": [
      "@as",
      "@enumFromInt",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@enumFromInt",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
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
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
        ]
      },
      {
        "builtin": "@enumFromInt",
        "files": [
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/47-riscv-sv39-page-table-walker/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Error",
        "file": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
      },
      {
        "symbol": "Result",
        "file": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
      },
      {
        "symbol": "walk",
        "file": "projects/47-riscv-sv39-page-table-walker/src/riscv_sv39_page_table_walker.zig"
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
