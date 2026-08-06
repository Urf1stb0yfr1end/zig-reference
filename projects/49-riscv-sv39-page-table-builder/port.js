module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "49",
    "canonicalName": "riscv-sv39-page-table-builder",
    "displayName": "RISC-V Sv39 Page Table Builder",
    "directory": "projects/49-riscv-sv39-page-table-builder",
    "publicEntrypoint": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
    "detailsContract": "projects/49-riscv-sv39-page-table-builder/details.json",
    "humanContract": "projects/49-riscv-sv39-page-table-builder/DETAILS.md",
    "portContract": "projects/49-riscv-sv39-page-table-builder/port.js"
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
      "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
    ],
    "publicEntrypoints": [
      "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
    ],
    "internalUnitTests": [
      "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
    ],
    "externalSmokeTests": [
      "projects/49-riscv-sv39-page-table-builder/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/49-riscv-sv39-page-table-builder/README.md",
      "projects/49-riscv-sv39-page-table-builder/MASTERY.md",
      "projects/49-riscv-sv39-page-table-builder/DETAILS.md",
      "projects/49-riscv-sv39-page-table-builder/details.json",
      "projects/49-riscv-sv39-page-table-builder/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Builder",
      "Error",
      "Mutation"
    ],
    "publicTypes": [
      {
        "name": "Builder",
        "kind": "public declaration"
      },
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "Mutation",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-sv39-page-table-builder public behavior, boundaries, and failure semantics."
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
      },
      {
        "canonicalName": "riscv-sv39-page-table-walker",
        "portContract": "projects/47-riscv-sv39-page-table-walker/port.js",
        "importName": "riscv-sv39-page-table-walker",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "riscv-sfence-vma-invalidation",
        "portContract": "projects/48-riscv-sfence-vma-invalidation/port.js",
        "importName": "riscv-sfence-vma-invalidation",
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
      "@This",
      "@TypeOf",
      "@as",
      "@enumFromInt",
      "@intFromEnum"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
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
        "name": "@TypeOf",
        "files": [
          {
            "path": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @TypeOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
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
            "path": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
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
            "path": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromEnum behavior as exercised by this module",
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
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
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
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
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
          "projects/49-riscv-sv39-page-table-builder/tests/smoke_test.zig"
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
    "unitTestStep": "test-riscv-sv39-page-table-builder",
    "smokeTestStep": "smoke-riscv-sv39-page-table-builder",
    "namedModuleImport": "riscv-sv39-page-table-builder",
    "sourcePath": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig",
    "directModuleDependencies": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker",
      "riscv-sfence-vma-invalidation"
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
      "test-riscv-sv39-page-table-builder",
      "smoke-riscv-sv39-page-table-builder"
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
      "@intFromEnum"
    ],
    "overflowSemantics": [],
    "notes": []
  },
  "reflectionAndComptimeUsage": {
    "reflectionSensitive": true,
    "builtins": [
      "@TypeOf"
    ],
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
      "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
    ],
    "smokeTests": [
      "projects/49-riscv-sv39-page-table-builder/tests/smoke_test.zig"
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
        "Builder",
        "Error",
        "Mutation"
      ],
      "affectedFiles": [
        "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-sv39-page-table-builder",
        "zig build smoke-riscv-sv39-page-table-builder"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-sv39-page-table-builder public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Builder",
        "Error",
        "Mutation"
      ],
      "detectionTests": [
        "zig build test-riscv-sv39-page-table-builder",
        "zig build smoke-riscv-sv39-page-table-builder"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker",
      "riscv-sfence-vma-invalidation"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker",
      "riscv-sfence-vma-invalidation",
      "riscv-sv39-page-table-builder"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-sv39-page-table-builder",
      "zig build smoke-riscv-sv39-page-table-builder"
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
      "projects/49-riscv-sv39-page-table-builder/port.js",
      "projects/49-riscv-sv39-page-table-builder/details.json",
      "projects/49-riscv-sv39-page-table-builder/DETAILS.md",
      "projects/44-riscv-sv39-page-table-entry/port.js",
      "projects/45-riscv-sv39-virtual-address-indexing/port.js",
      "projects/46-riscv-page-table-page-owner/port.js",
      "projects/47-riscv-sv39-page-table-walker/port.js",
      "projects/48-riscv-sfence-vma-invalidation/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-sv39-page-table-builder"
    ],
    "recommendedPortOrder": [
      "riscv-sv39-page-table-entry",
      "riscv-sv39-virtual-address-indexing",
      "riscv-page-table-page-owner",
      "riscv-sv39-page-table-walker",
      "riscv-sfence-vma-invalidation",
      "riscv-sv39-page-table-builder"
    ],
    "searchTerms": [
      "@This",
      "@TypeOf",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@TypeOf",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
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
        "builtin": "@This",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "builtin": "@TypeOf",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "builtin": "@enumFromInt",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "builtin": "@intFromEnum",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/49-riscv-sv39-page-table-builder/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Builder",
        "file": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
      },
      {
        "symbol": "Error",
        "file": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
      },
      {
        "symbol": "Mutation",
        "file": "projects/49-riscv-sv39-page-table-builder/src/riscv_sv39_page_table_builder.zig"
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
