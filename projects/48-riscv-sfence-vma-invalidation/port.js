module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "48",
    "canonicalName": "riscv-sfence-vma-invalidation",
    "displayName": "RISC-V SFENCE.VMA Invalidation",
    "directory": "projects/48-riscv-sfence-vma-invalidation",
    "publicEntrypoint": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig",
    "detailsContract": "projects/48-riscv-sfence-vma-invalidation/details.json",
    "humanContract": "projects/48-riscv-sfence-vma-invalidation/DETAILS.md",
    "portContract": "projects/48-riscv-sfence-vma-invalidation/port.js"
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
      "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
    ],
    "publicEntrypoints": [
      "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
    ],
    "internalUnitTests": [
      "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
    ],
    "externalSmokeTests": [
      "projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/48-riscv-sfence-vma-invalidation/README.md",
      "projects/48-riscv-sfence-vma-invalidation/MASTERY.md",
      "projects/48-riscv-sfence-vma-invalidation/DETAILS.md",
      "projects/48-riscv-sfence-vma-invalidation/details.json",
      "projects/48-riscv-sfence-vma-invalidation/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Plan",
      "executeUnsafe",
      "forAddress",
      "forAddressAsid",
      "forAsid",
      "global"
    ],
    "publicTypes": [
      {
        "name": "Plan",
        "kind": "public declaration"
      },
      {
        "name": "executeUnsafe",
        "kind": "public declaration"
      },
      {
        "name": "forAddress",
        "kind": "public declaration"
      },
      {
        "name": "forAddressAsid",
        "kind": "public declaration"
      },
      {
        "name": "forAsid",
        "kind": "public declaration"
      },
      {
        "name": "global",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented riscv-sfence-vma-invalidation public behavior, boundaries, and failure semantics."
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
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.refAllDecls"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as",
      "@panic"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig",
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
        "name": "@panic",
        "files": [
          {
            "path": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @panic behavior as exercised by this module",
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
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
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
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
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
          "projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig"
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
      "std.testing.refAllDecls"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-riscv-sfence-vma-invalidation",
    "smokeTestStep": "smoke-riscv-sfence-vma-invalidation",
    "namedModuleImport": "riscv-sfence-vma-invalidation",
    "sourcePath": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig",
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
      "test-riscv-sfence-vma-invalidation",
      "smoke-riscv-sfence-vma-invalidation"
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
      "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
    ],
    "smokeTests": [
      "projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
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
        "Plan",
        "executeUnsafe",
        "forAddress",
        "forAddressAsid",
        "forAsid",
        "global"
      ],
      "affectedFiles": [
        "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-riscv-sfence-vma-invalidation",
        "zig build smoke-riscv-sfence-vma-invalidation"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented riscv-sfence-vma-invalidation public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Plan",
        "executeUnsafe",
        "forAddress",
        "forAddressAsid",
        "forAsid",
        "global"
      ],
      "detectionTests": [
        "zig build test-riscv-sfence-vma-invalidation",
        "zig build smoke-riscv-sfence-vma-invalidation"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "riscv-sfence-vma-invalidation"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-riscv-sfence-vma-invalidation",
      "zig build smoke-riscv-sfence-vma-invalidation"
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
      "projects/48-riscv-sfence-vma-invalidation/port.js",
      "projects/48-riscv-sfence-vma-invalidation/details.json",
      "projects/48-riscv-sfence-vma-invalidation/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-riscv-sfence-vma-invalidation"
    ],
    "recommendedPortOrder": [
      "riscv-sfence-vma-invalidation"
    ],
    "searchTerms": [
      "@as",
      "@panic",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.refAllDecls"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@panic",
      "std.testing.expect",
      "std.testing.expectEqual",
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
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
        ]
      },
      {
        "builtin": "@panic",
        "files": [
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
        ]
      },
      {
        "api": "std.testing.refAllDecls",
        "files": [
          "projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Plan",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      },
      {
        "symbol": "executeUnsafe",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      },
      {
        "symbol": "forAddress",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      },
      {
        "symbol": "forAddressAsid",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      },
      {
        "symbol": "forAsid",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
      },
      {
        "symbol": "global",
        "file": "projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig"
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
