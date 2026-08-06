module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "45",
    "canonicalName": "riscv-sv39-virtual-address-indexing",
    "displayName": "RISC-V Sv39 Virtual Address Indexing",
    "directory": "projects/45-riscv-sv39-virtual-address-indexing",
    "publicEntrypoint": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig",
    "detailsContract": "projects/45-riscv-sv39-virtual-address-indexing/details.json",
    "humanContract": "projects/45-riscv-sv39-virtual-address-indexing/DETAILS.md",
    "portContract": "projects/45-riscv-sv39-virtual-address-indexing/port.js"
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
      "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
    ],
    "publicEntrypoints": [
      "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
    ],
    "internalUnitTests": [
      "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
    ],
    "externalSmokeTests": [
      "projects/45-riscv-sv39-virtual-address-indexing/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/45-riscv-sv39-virtual-address-indexing/README.md",
      "projects/45-riscv-sv39-virtual-address-indexing/MASTERY.md",
      "projects/45-riscv-sv39-virtual-address-indexing/DETAILS.md",
      "projects/45-riscv-sv39-virtual-address-indexing/details.json",
      "projects/45-riscv-sv39-virtual-address-indexing/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Error",
      "Level",
      "Parts",
      "construct",
      "decompose",
      "isCanonical",
      "pageSize",
      "requireAligned",
      "validateRange"
    ],
    "publicTypes": [
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "Level",
        "kind": "public declaration"
      },
      {
        "name": "Parts",
        "kind": "public declaration"
      },
      {
        "name": "construct",
        "kind": "public declaration"
      },
      {
        "name": "decompose",
        "kind": "public declaration"
      },
      {
        "name": "isCanonical",
        "kind": "public declaration"
      },
      {
        "name": "pageSize",
        "kind": "public declaration"
      },
      {
        "name": "requireAligned",
        "kind": "public declaration"
      },
      {
        "name": "validateRange",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-sv39-virtual-address-indexing public behavior, boundaries, and failure semantics."
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
      "std.math.add",
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
      "@intCast"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig",
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
        "name": "@intCast",
        "files": [
          {
            "path": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intCast behavior as exercised by this module",
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
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
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
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
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
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
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
          "projects/45-riscv-sv39-virtual-address-indexing/tests/smoke_test.zig"
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
    "mathApis": [
      "std.math.add"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-riscv-sv39-virtual-address-indexing",
    "smokeTestStep": "smoke-riscv-sv39-virtual-address-indexing",
    "namedModuleImport": "riscv-sv39-virtual-address-indexing",
    "sourcePath": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig",
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
      "test-riscv-sv39-virtual-address-indexing",
      "smoke-riscv-sv39-virtual-address-indexing"
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
      "@intCast"
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
      "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
    ],
    "smokeTests": [
      "projects/45-riscv-sv39-virtual-address-indexing/tests/smoke_test.zig"
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
        "Level",
        "Parts",
        "construct",
        "decompose",
        "isCanonical",
        "pageSize",
        "requireAligned",
        "validateRange"
      ],
      "affectedFiles": [
        "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-sv39-virtual-address-indexing",
        "zig build smoke-riscv-sv39-virtual-address-indexing"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-sv39-virtual-address-indexing public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Error",
        "Level",
        "Parts",
        "construct",
        "decompose",
        "isCanonical",
        "pageSize",
        "requireAligned",
        "validateRange"
      ],
      "detectionTests": [
        "zig build test-riscv-sv39-virtual-address-indexing",
        "zig build smoke-riscv-sv39-virtual-address-indexing"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-sv39-virtual-address-indexing"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-sv39-virtual-address-indexing",
      "zig build smoke-riscv-sv39-virtual-address-indexing"
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
      "projects/45-riscv-sv39-virtual-address-indexing/port.js",
      "projects/45-riscv-sv39-virtual-address-indexing/details.json",
      "projects/45-riscv-sv39-virtual-address-indexing/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-sv39-virtual-address-indexing"
    ],
    "recommendedPortOrder": [
      "riscv-sv39-virtual-address-indexing"
    ],
    "searchTerms": [
      "@as",
      "@intCast",
      "std.math.add",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@intCast",
      "std.math.add",
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
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
        ]
      },
      {
        "builtin": "@intCast",
        "files": [
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/45-riscv-sv39-virtual-address-indexing/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Error",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "Level",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "Parts",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "construct",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "decompose",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "isCanonical",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "pageSize",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "requireAligned",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
      },
      {
        "symbol": "validateRange",
        "file": "projects/45-riscv-sv39-virtual-address-indexing/src/riscv_sv39_virtual_address_indexing.zig"
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
