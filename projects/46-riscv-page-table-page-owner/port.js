module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "46",
    "canonicalName": "riscv-page-table-page-owner",
    "displayName": "RISC-V Page Table Page Owner",
    "directory": "projects/46-riscv-page-table-page-owner",
    "publicEntrypoint": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig",
    "detailsContract": "projects/46-riscv-page-table-page-owner/details.json",
    "humanContract": "projects/46-riscv-page-table-page-owner/DETAILS.md",
    "portContract": "projects/46-riscv-page-table-page-owner/port.js"
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
      "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
    ],
    "publicEntrypoints": [
      "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
    ],
    "internalUnitTests": [
      "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
    ],
    "externalSmokeTests": [
      "projects/46-riscv-page-table-page-owner/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/46-riscv-page-table-page-owner/README.md",
      "projects/46-riscv-page-table-page-owner/MASTERY.md",
      "projects/46-riscv-page-table-page-owner/DETAILS.md",
      "projects/46-riscv-page-table-page-owner/details.json",
      "projects/46-riscv-page-table-page-owner/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Error",
      "PageOwner",
      "entries_per_page"
    ],
    "publicTypes": [
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "PageOwner",
        "kind": "public declaration"
      },
      {
        "name": "entries_per_page",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-page-table-page-owner public behavior, boundaries, and failure semantics."
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
            "path": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig",
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
            "path": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig",
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
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
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
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
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
          "projects/46-riscv-page-table-page-owner/tests/smoke_test.zig"
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
    "unitTestStep": "test-riscv-page-table-page-owner",
    "smokeTestStep": "smoke-riscv-page-table-page-owner",
    "namedModuleImport": "riscv-page-table-page-owner",
    "sourcePath": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig",
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
      "test-riscv-page-table-page-owner",
      "smoke-riscv-page-table-page-owner"
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
      "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
    ],
    "smokeTests": [
      "projects/46-riscv-page-table-page-owner/tests/smoke_test.zig"
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
        "PageOwner",
        "entries_per_page"
      ],
      "affectedFiles": [
        "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-page-table-page-owner",
        "zig build smoke-riscv-page-table-page-owner"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-page-table-page-owner public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Error",
        "PageOwner",
        "entries_per_page"
      ],
      "detectionTests": [
        "zig build test-riscv-page-table-page-owner",
        "zig build smoke-riscv-page-table-page-owner"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-page-table-page-owner"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-page-table-page-owner",
      "zig build smoke-riscv-page-table-page-owner"
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
      "projects/46-riscv-page-table-page-owner/port.js",
      "projects/46-riscv-page-table-page-owner/details.json",
      "projects/46-riscv-page-table-page-owner/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-page-table-page-owner"
    ],
    "recommendedPortOrder": [
      "riscv-page-table-page-owner"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
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
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/46-riscv-page-table-page-owner/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Error",
        "file": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
      },
      {
        "symbol": "PageOwner",
        "file": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
      },
      {
        "symbol": "entries_per_page",
        "file": "projects/46-riscv-page-table-page-owner/src/riscv_page_table_page_owner.zig"
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
