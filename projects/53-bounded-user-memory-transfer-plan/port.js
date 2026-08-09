module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "53",
    "canonicalName": "bounded-user-memory-transfer-plan",
    "displayName": "Bounded User Memory Transfer Plan",
    "directory": "projects/53-bounded-user-memory-transfer-plan",
    "publicEntrypoint": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
    "detailsContract": "projects/53-bounded-user-memory-transfer-plan/details.json",
    "humanContract": "projects/53-bounded-user-memory-transfer-plan/DETAILS.md",
    "portContract": "projects/53-bounded-user-memory-transfer-plan/port.js"
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
      "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
    ],
    "publicEntrypoints": [
      "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
    ],
    "internalUnitTests": [
      "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
    ],
    "externalSmokeTests": [
      "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/53-bounded-user-memory-transfer-plan/README.md",
      "projects/53-bounded-user-memory-transfer-plan/MASTERY.md",
      "projects/53-bounded-user-memory-transfer-plan/DETAILS.md",
      "projects/53-bounded-user-memory-transfer-plan/details.json",
      "projects/53-bounded-user-memory-transfer-plan/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Access",
      "Error",
      "GuestVirtualAddress",
      "PageQuery",
      "PageResolution",
      "PhysicalAddress",
      "Segment",
      "TransferPlan",
      "page_size"
    ],
    "publicTypes": [
      {
        "name": "Access",
        "kind": "public declaration"
      },
      {
        "name": "Error",
        "kind": "public declaration"
      },
      {
        "name": "GuestVirtualAddress",
        "kind": "public declaration"
      },
      {
        "name": "PageQuery",
        "kind": "public declaration"
      },
      {
        "name": "PageResolution",
        "kind": "public declaration"
      },
      {
        "name": "PhysicalAddress",
        "kind": "public declaration"
      },
      {
        "name": "Segment",
        "kind": "public declaration"
      },
      {
        "name": "TransferPlan",
        "kind": "public declaration"
      },
      {
        "name": "page_size",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [
      {
        "name": "TransferPlan",
        "signature": "TransferPlan(comptime capacity: usize) type"
      }
    ],
    "publicMethods": [],
    "publicConstants": [
      {
        "name": "page_size",
        "type": "usize",
        "value": "4096",
        "summary": "Transfer page size."
      }
    ],
    "publicErrors": [
      "AddressOverflow",
      "CapacityExceeded",
      "Unmapped",
      "SupervisorOnly",
      "NotReadable",
      "NotWritable",
      "UnalignedPhysicalPage"
    ],
    "invariantsToPreserve": [
      "Preserve the documented bounded-user-memory-transfer-plan public behavior, boundaries, and failure semantics."
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
        "canonicalName": "fixed-capacity-vector",
        "portContract": "projects/00-fixed-capacity-vector/port.js",
        "importName": "fixed-capacity-vector",
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
      }
    ],
    "standardLibrary": [
      "std.math.maxInt",
      "std.math.sub",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [
      "error unions"
    ],
    "versionSensitive": [
      "@This",
      "@alignCast",
      "@as",
      "@min",
      "@ptrCast"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
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
        "name": "@alignCast",
        "files": [
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @alignCast behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig",
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
        "name": "@min",
        "files": [
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @min behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@ptrCast",
        "files": [
          {
            "path": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @ptrCast behavior as exercised by this module",
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
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.sub",
        "symbols": [
          "std.math.sub"
        ],
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
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
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
          "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualDeep",
        "symbols": [
          "std.testing.expectEqualDeep"
        ],
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
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
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.maxInt",
      "std.math.sub"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-user-memory-transfer-plan",
    "smokeTestStep": "smoke-bounded-user-memory-transfer-plan",
    "namedModuleImport": "bounded-user-memory-transfer-plan",
    "sourcePath": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
    "directModuleDependencies": [
      "fixed-capacity-vector",
      "checked-half-open-range",
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
      "test-bounded-user-memory-transfer-plan",
      "smoke-bounded-user-memory-transfer-plan"
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
    "pointerSensitive": true,
    "builtins": [
      "@alignCast",
      "@ptrCast"
    ],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [
      "@alignCast",
      "@as",
      "@ptrCast"
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
      "AddressOverflow",
      "CapacityExceeded",
      "Unmapped",
      "SupervisorOnly",
      "NotReadable",
      "NotWritable",
      "UnalignedPhysicalPage"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
    ],
    "smokeTests": [
      "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
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
        "Access",
        "Error",
        "GuestVirtualAddress",
        "PageQuery",
        "PageResolution",
        "PhysicalAddress",
        "Segment",
        "TransferPlan",
        "page_size"
      ],
      "affectedFiles": [
        "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-user-memory-transfer-plan",
        "zig build smoke-bounded-user-memory-transfer-plan"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-user-memory-transfer-plan public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Access",
        "Error",
        "GuestVirtualAddress",
        "PageQuery",
        "PageResolution",
        "PhysicalAddress",
        "Segment",
        "TransferPlan",
        "page_size"
      ],
      "detectionTests": [
        "zig build test-bounded-user-memory-transfer-plan",
        "zig build smoke-bounded-user-memory-transfer-plan"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-vector",
      "checked-half-open-range",
      "distinct-memory-address-types"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "bounded-user-memory-transfer-plan"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-user-memory-transfer-plan",
      "zig build smoke-bounded-user-memory-transfer-plan"
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
      "projects/53-bounded-user-memory-transfer-plan/port.js",
      "projects/53-bounded-user-memory-transfer-plan/details.json",
      "projects/53-bounded-user-memory-transfer-plan/DETAILS.md",
      "projects/00-fixed-capacity-vector/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/18-distinct-memory-address-types/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-user-memory-transfer-plan"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "bounded-user-memory-transfer-plan"
    ],
    "searchTerms": [
      "@This",
      "@alignCast",
      "@as",
      "@min",
      "@ptrCast",
      "std.math.maxInt",
      "std.math.sub",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@alignCast",
      "@as",
      "@min",
      "@ptrCast",
      "std.math.maxInt",
      "std.math.sub",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
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
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "builtin": "@alignCast",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
          "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@min",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "builtin": "@ptrCast",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "api": "std.math.sub",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig",
          "projects/53-bounded-user-memory-transfer-plan/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Access",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "Error",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "GuestVirtualAddress",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "PageQuery",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "PageResolution",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "PhysicalAddress",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "Segment",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "TransferPlan",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
      },
      {
        "symbol": "page_size",
        "file": "projects/53-bounded-user-memory-transfer-plan/src/bounded_user_memory_transfer_plan.zig"
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
