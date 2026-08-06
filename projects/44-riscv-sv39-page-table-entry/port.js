module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "44",
    "canonicalName": "riscv-sv39-page-table-entry",
    "displayName": "RISC-V Sv39 Page Table Entry",
    "directory": "projects/44-riscv-sv39-page-table-entry",
    "publicEntrypoint": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig",
    "detailsContract": "projects/44-riscv-sv39-page-table-entry/details.json",
    "humanContract": "projects/44-riscv-sv39-page-table-entry/DETAILS.md",
    "portContract": "projects/44-riscv-sv39-page-table-entry/port.js"
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
      "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
    ],
    "publicEntrypoints": [
      "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
    ],
    "internalUnitTests": [
      "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
    ],
    "externalSmokeTests": [
      "projects/44-riscv-sv39-page-table-entry/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/44-riscv-sv39-page-table-entry/README.md",
      "projects/44-riscv-sv39-page-table-entry/MASTERY.md",
      "projects/44-riscv-sv39-page-table-entry/DETAILS.md",
      "projects/44-riscv-sv39-page-table-entry/details.json",
      "projects/44-riscv-sv39-page-table-entry/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "DecodeError",
      "Entry",
      "Kind",
      "Level",
      "Permissions"
    ],
    "publicTypes": [
      {
        "name": "DecodeError",
        "kind": "public declaration"
      },
      {
        "name": "Entry",
        "kind": "public declaration"
      },
      {
        "name": "Kind",
        "kind": "public declaration"
      },
      {
        "name": "Level",
        "kind": "public declaration"
      },
      {
        "name": "Permissions",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-sv39-page-table-entry public behavior, boundaries, and failure semantics."
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
      "@as",
      "@intFromBool"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig",
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
        "name": "@intFromBool",
        "files": [
          {
            "path": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromBool behavior as exercised by this module",
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
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
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
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
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
          "projects/44-riscv-sv39-page-table-entry/tests/smoke_test.zig"
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
    "unitTestStep": "test-riscv-sv39-page-table-entry",
    "smokeTestStep": "smoke-riscv-sv39-page-table-entry",
    "namedModuleImport": "riscv-sv39-page-table-entry",
    "sourcePath": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig",
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
      "test-riscv-sv39-page-table-entry",
      "smoke-riscv-sv39-page-table-entry"
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
      "@intFromBool"
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
      "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
    ],
    "smokeTests": [
      "projects/44-riscv-sv39-page-table-entry/tests/smoke_test.zig"
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
        "DecodeError",
        "Entry",
        "Kind",
        "Level",
        "Permissions"
      ],
      "affectedFiles": [
        "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-sv39-page-table-entry",
        "zig build smoke-riscv-sv39-page-table-entry"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-sv39-page-table-entry public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "DecodeError",
        "Entry",
        "Kind",
        "Level",
        "Permissions"
      ],
      "detectionTests": [
        "zig build test-riscv-sv39-page-table-entry",
        "zig build smoke-riscv-sv39-page-table-entry"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-sv39-page-table-entry"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-sv39-page-table-entry",
      "zig build smoke-riscv-sv39-page-table-entry"
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
      "projects/44-riscv-sv39-page-table-entry/port.js",
      "projects/44-riscv-sv39-page-table-entry/details.json",
      "projects/44-riscv-sv39-page-table-entry/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-sv39-page-table-entry"
    ],
    "recommendedPortOrder": [
      "riscv-sv39-page-table-entry"
    ],
    "searchTerms": [
      "@as",
      "@intFromBool",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@intFromBool",
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
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
        ]
      },
      {
        "builtin": "@intFromBool",
        "files": [
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/44-riscv-sv39-page-table-entry/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "DecodeError",
        "file": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
      },
      {
        "symbol": "Entry",
        "file": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
      },
      {
        "symbol": "Kind",
        "file": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
      },
      {
        "symbol": "Level",
        "file": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
      },
      {
        "symbol": "Permissions",
        "file": "projects/44-riscv-sv39-page-table-entry/src/riscv_sv39_page_table_entry.zig"
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
