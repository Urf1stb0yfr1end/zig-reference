module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "50",
    "canonicalName": "bounded-system-resource-plan",
    "displayName": "Bounded System Resource Plan",
    "directory": "projects/50-bounded-system-resource-plan",
    "publicEntrypoint": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
    "detailsContract": "projects/50-bounded-system-resource-plan/details.json",
    "humanContract": "projects/50-bounded-system-resource-plan/DETAILS.md",
    "portContract": "projects/50-bounded-system-resource-plan/port.js"
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
      "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
    ],
    "publicEntrypoints": [
      "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
    ],
    "internalUnitTests": [
      "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
    ],
    "externalSmokeTests": [
      "projects/50-bounded-system-resource-plan/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/50-bounded-system-resource-plan/README.md",
      "projects/50-bounded-system-resource-plan/MASTERY.md",
      "projects/50-bounded-system-resource-plan/DETAILS.md",
      "projects/50-bounded-system-resource-plan/details.json",
      "projects/50-bounded-system-resource-plan/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "CapacityConfiguration",
      "DependencyEdge",
      "Description",
      "HandleStorage",
      "Planner",
      "PostSealAllocation",
      "TaskStorage",
      "TraceEventStorage"
    ],
    "publicTypes": [
      {
        "name": "CapacityConfiguration",
        "kind": "public declaration"
      },
      {
        "name": "DependencyEdge",
        "kind": "public declaration"
      },
      {
        "name": "Description",
        "kind": "public declaration"
      },
      {
        "name": "HandleStorage",
        "kind": "public declaration"
      },
      {
        "name": "Planner",
        "kind": "public declaration"
      },
      {
        "name": "PostSealAllocation",
        "kind": "public declaration"
      },
      {
        "name": "TaskStorage",
        "kind": "public declaration"
      },
      {
        "name": "TraceEventStorage",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented bounded-system-resource-plan public behavior, boundaries, and failure semantics."
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
        "canonicalName": "bounded-integer",
        "portContract": "projects/12-bounded-integer/port.js",
        "importName": "bounded-integer",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-integer-cast",
        "portContract": "projects/10-checked-integer-cast/port.js",
        "importName": "checked-integer-cast",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "aligned-address-and-size-helpers",
        "portContract": "projects/15-aligned-address-and-size-helpers/port.js",
        "importName": "aligned-address-and-size-helpers",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "fixed-bump-allocator",
        "portContract": "projects/41-fixed-bump-allocator/port.js",
        "importName": "fixed-bump-allocator",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "fixed-capacity-topological-sort",
        "portContract": "projects/43-fixed-capacity-topological-sort/port.js",
        "importName": "fixed-capacity-topological-sort",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.io.fixedBufferStream",
      "std.math.add",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.asBytes",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@TypeOf",
      "@alignOf",
      "@sizeOf",
      "@tagName"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
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
            "path": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
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
        "name": "@alignOf",
        "files": [
          {
            "path": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @alignOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@sizeOf",
        "files": [
          {
            "path": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @sizeOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@tagName",
        "files": [
          {
            "path": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @tagName behavior as exercised by this module",
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
        "path": "std.io.fixedBufferStream",
        "symbols": [
          "std.io.fixedBufferStream"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.add",
        "symbols": [
          "std.math.add"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.math.mul",
        "symbols": [
          "std.math.mul"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.asBytes",
        "symbols": [
          "std.mem.asBytes"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
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
          "projects/50-bounded-system-resource-plan/tests/smoke_test.zig"
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
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualSlices",
        "symbols": [
          "std.testing.expectEqualSlices"
        ],
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
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
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
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
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [
      "std.io.fixedBufferStream"
    ],
    "endianApis": [],
    "mathApis": [
      "std.math.add",
      "std.math.maxInt",
      "std.math.mul"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-system-resource-plan",
    "smokeTestStep": "smoke-bounded-system-resource-plan",
    "namedModuleImport": "bounded-system-resource-plan",
    "sourcePath": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig",
    "directModuleDependencies": [
      "bounded-integer",
      "checked-integer-cast",
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator",
      "fixed-capacity-topological-sort"
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
      "test-bounded-system-resource-plan",
      "smoke-bounded-system-resource-plan"
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
      "@alignOf"
    ],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [],
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
      "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
    ],
    "smokeTests": [
      "projects/50-bounded-system-resource-plan/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
        "CapacityConfiguration",
        "DependencyEdge",
        "Description",
        "HandleStorage",
        "Planner",
        "PostSealAllocation",
        "TaskStorage",
        "TraceEventStorage"
      ],
      "affectedFiles": [
        "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-system-resource-plan",
        "zig build smoke-bounded-system-resource-plan"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-system-resource-plan public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "CapacityConfiguration",
        "DependencyEdge",
        "Description",
        "HandleStorage",
        "Planner",
        "PostSealAllocation",
        "TaskStorage",
        "TraceEventStorage"
      ],
      "detectionTests": [
        "zig build test-bounded-system-resource-plan",
        "zig build smoke-bounded-system-resource-plan"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bounded-integer",
      "checked-integer-cast",
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator",
      "fixed-capacity-topological-sort"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-integer",
      "checked-integer-cast",
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator",
      "fixed-capacity-topological-sort",
      "bounded-system-resource-plan"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-system-resource-plan",
      "zig build smoke-bounded-system-resource-plan"
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
      "projects/50-bounded-system-resource-plan/port.js",
      "projects/50-bounded-system-resource-plan/details.json",
      "projects/50-bounded-system-resource-plan/DETAILS.md",
      "projects/12-bounded-integer/port.js",
      "projects/10-checked-integer-cast/port.js",
      "projects/15-aligned-address-and-size-helpers/port.js",
      "projects/41-fixed-bump-allocator/port.js",
      "projects/43-fixed-capacity-topological-sort/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-system-resource-plan"
    ],
    "recommendedPortOrder": [
      "bounded-integer",
      "checked-integer-cast",
      "aligned-address-and-size-helpers",
      "fixed-bump-allocator",
      "fixed-capacity-topological-sort",
      "bounded-system-resource-plan"
    ],
    "searchTerms": [
      "@This",
      "@TypeOf",
      "@alignOf",
      "@sizeOf",
      "@tagName",
      "std.io.fixedBufferStream",
      "std.math.add",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.asBytes",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@TypeOf",
      "@alignOf",
      "@sizeOf",
      "@tagName",
      "std.io.fixedBufferStream",
      "std.math.add",
      "std.math.maxInt",
      "std.math.mul",
      "std.mem.asBytes",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualSlices",
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
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "builtin": "@TypeOf",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "builtin": "@alignOf",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "builtin": "@tagName",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.io.fixedBufferStream",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.math.add",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.math.mul",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.mem.asBytes",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/50-bounded-system-resource-plan/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualSlices",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "CapacityConfiguration",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "DependencyEdge",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "Description",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "HandleStorage",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "Planner",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "PostSealAllocation",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "TaskStorage",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
      },
      {
        "symbol": "TraceEventStorage",
        "file": "projects/50-bounded-system-resource-plan/src/bounded_system_resource_plan.zig"
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
