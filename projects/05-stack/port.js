module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "05",
    "canonicalName": "stack",
    "displayName": "Stack",
    "directory": "projects/05-stack",
    "publicEntrypoint": "projects/05-stack/src/stack.zig",
    "detailsContract": "projects/05-stack/details.json",
    "humanContract": "projects/05-stack/DETAILS.md",
    "portContract": "projects/05-stack/port.js"
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
      "projects/05-stack/src/stack.zig"
    ],
    "publicEntrypoints": [
      "projects/05-stack/src/stack.zig"
    ],
    "internalUnitTests": [
      "projects/05-stack/src/stack.zig"
    ],
    "externalSmokeTests": [
      "projects/05-stack/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/05-stack/README.md",
      "projects/05-stack/MASTERY.md",
      "projects/05-stack/DETAILS.md",
      "projects/05-stack/details.json",
      "projects/05-stack/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Stack"
    ],
    "publicTypes": [
      {
        "name": "Stack(T)",
        "kind": "generic type factory"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(allocator: std.mem.Allocator) Self"
      },
      {
        "name": "deinit",
        "signature": "deinit(self: *Self) void"
      },
      {
        "name": "len",
        "signature": "len(self: *const Self) usize"
      },
      {
        "name": "isEmpty",
        "signature": "isEmpty(self: *const Self) bool"
      },
      {
        "name": "push",
        "signature": "push(self: *Self, value: T) !void"
      },
      {
        "name": "pop",
        "signature": "pop(self: *Self) ?T"
      },
      {
        "name": "peek",
        "signature": "peek(self: *const Self) ?T"
      },
      {
        "name": "clearRetainingCapacity",
        "signature": "clearRetainingCapacity(self: *Self) void"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "OutOfMemory",
      "Overflow"
    ],
    "invariantsToPreserve": [
      "Preserve the documented stack public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [
      "[object Object]"
    ],
    "failureAtomicityToPreserve": [],
    "binaryLayoutsToPreserve": [],
    "compatibilityPromisesToPreserve": [],
    "intentionallyUnstableDetails": []
  },
  "dependencies": {
    "repository": [
      {
        "canonicalName": "dynamic-array",
        "portContract": "projects/01-dynamic-array/port.js",
        "importName": "dynamic-array",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.mem.Allocator",
      "std.testing.FailingAllocator.init",
      "std.testing.allocator",
      "std.testing.expect",
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
            "path": "projects/05-stack/src/stack.zig",
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
            "path": "projects/05-stack/src/stack.zig",
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
        "path": "std.mem.Allocator",
        "symbols": [
          "std.mem.Allocator"
        ],
        "files": [
          "projects/05-stack/src/stack.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.FailingAllocator.init",
        "symbols": [
          "std.testing.FailingAllocator.init"
        ],
        "files": [
          "projects/05-stack/src/stack.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.allocator",
        "symbols": [
          "std.testing.allocator"
        ],
        "files": [
          "projects/05-stack/src/stack.zig"
        ],
        "purpose": "test assertions and test allocation",
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
          "projects/05-stack/src/stack.zig"
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
          "projects/05-stack/src/stack.zig"
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
          "projects/05-stack/src/stack.zig"
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
          "projects/05-stack/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.FailingAllocator.init",
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [
      "std.mem.Allocator",
      "std.testing.FailingAllocator.init",
      "std.testing.allocator"
    ],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-stack",
    "smokeTestStep": "smoke-stack",
    "namedModuleImport": "stack",
    "sourcePath": "projects/05-stack/src/stack.zig",
    "directModuleDependencies": [
      "dynamic-array"
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
      "test-stack",
      "smoke-stack"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "yes",
    "freestanding": "only with compatible allocator; fixed vector preferred for bootstrap",
    "targets": [],
    "endianSensitive": false,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": true,
    "apis": [
      "std.mem.Allocator",
      "std.testing.FailingAllocator.init",
      "std.testing.allocator"
    ],
    "ownershipTransitions": [],
    "notes": []
  },
  "pointerAndMemoryUsage": {
    "pointerSensitive": true,
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
      "OutOfMemory",
      "Overflow"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/05-stack/src/stack.zig"
    ],
    "smokeTests": [
      "projects/05-stack/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.FailingAllocator.init",
      "std.testing.allocator",
      "std.testing.expect",
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
        "Stack"
      ],
      "affectedFiles": [
        "projects/05-stack/src/stack.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-stack",
        "zig build smoke-stack"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented stack public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Stack"
      ],
      "detectionTests": [
        "zig build test-stack",
        "zig build smoke-stack"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "dynamic-array"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "dynamic-array",
      "stack"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-stack",
      "zig build smoke-stack"
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
      "projects/05-stack/port.js",
      "projects/05-stack/details.json",
      "projects/05-stack/DETAILS.md",
      "projects/01-dynamic-array/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-stack"
    ],
    "recommendedPortOrder": [
      "dynamic-array",
      "stack"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.mem.Allocator",
      "std.testing.FailingAllocator.init",
      "std.testing.allocator",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.mem.Allocator",
      "std.testing.FailingAllocator.init",
      "std.testing.allocator",
      "std.testing.expect",
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
        "builtin": "@This",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.mem.Allocator",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.FailingAllocator.init",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.allocator",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/05-stack/src/stack.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/05-stack/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Stack",
        "file": "projects/05-stack/src/stack.zig"
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
