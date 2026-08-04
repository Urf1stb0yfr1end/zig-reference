module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "08",
    "canonicalName": "generational-handles",
    "displayName": "Generational Handles",
    "directory": "projects/08-generational-handles",
    "publicEntrypoint": "projects/08-generational-handles/src/generational_handles.zig",
    "detailsContract": "projects/08-generational-handles/details.json",
    "humanContract": "projects/08-generational-handles/DETAILS.md",
    "portContract": "projects/08-generational-handles/port.js"
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
      "projects/08-generational-handles/src/generational_handles.zig"
    ],
    "publicEntrypoints": [
      "projects/08-generational-handles/src/generational_handles.zig"
    ],
    "internalUnitTests": [
      "projects/08-generational-handles/src/generational_handles.zig"
    ],
    "externalSmokeTests": [
      "projects/08-generational-handles/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/08-generational-handles/README.md",
      "projects/08-generational-handles/MASTERY.md",
      "projects/08-generational-handles/DETAILS.md",
      "projects/08-generational-handles/details.json",
      "projects/08-generational-handles/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "HandleTable"
    ],
    "publicTypes": [
      {
        "name": "HandleTable(T, capacity)",
        "kind": "generic type factory"
      },
      {
        "name": "Handle",
        "kind": "index and generation value"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "count",
        "signature": "count(self: *const Self) usize"
      },
      {
        "name": "insert",
        "signature": "insert(self: *Self, value: T) error{Full}!Handle"
      },
      {
        "name": "get",
        "signature": "get(self: *Self, handle: Handle) ?*T"
      },
      {
        "name": "getConst",
        "signature": "getConst(self: *const Self, handle: Handle) ?*const T"
      },
      {
        "name": "remove",
        "signature": "remove(self: *Self, handle: Handle) ?T"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "Full"
    ],
    "invariantsToPreserve": [
      "Preserve the documented generational-handles public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [
      "[object Object]",
      "[object Object]"
    ],
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
            "path": "projects/08-generational-handles/src/generational_handles.zig",
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
            "path": "projects/08-generational-handles/src/generational_handles.zig",
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
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/08-generational-handles/src/generational_handles.zig"
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
          "projects/08-generational-handles/src/generational_handles.zig"
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
          "projects/08-generational-handles/src/generational_handles.zig"
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
          "projects/08-generational-handles/tests/smoke_test.zig"
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
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-generational-handles",
    "smokeTestStep": "smoke-generational-handles",
    "namedModuleImport": "generational-handles",
    "sourcePath": "projects/08-generational-handles/src/generational_handles.zig",
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
      "test-generational-handles",
      "smoke-generational-handles"
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
      "Full"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/08-generational-handles/src/generational_handles.zig"
    ],
    "smokeTests": [
      "projects/08-generational-handles/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "HandleTable"
      ],
      "affectedFiles": [
        "projects/08-generational-handles/src/generational_handles.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-generational-handles",
        "zig build smoke-generational-handles"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented generational-handles public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "HandleTable"
      ],
      "detectionTests": [
        "zig build test-generational-handles",
        "zig build smoke-generational-handles"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "generational-handles"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-generational-handles",
      "zig build smoke-generational-handles"
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
      "projects/08-generational-handles/port.js",
      "projects/08-generational-handles/details.json",
      "projects/08-generational-handles/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-generational-handles"
    ],
    "recommendedPortOrder": [
      "generational-handles"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
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
          "projects/08-generational-handles/src/generational_handles.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/08-generational-handles/src/generational_handles.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.testing.expect",
        "files": [
          "projects/08-generational-handles/src/generational_handles.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/08-generational-handles/src/generational_handles.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/08-generational-handles/src/generational_handles.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/08-generational-handles/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "HandleTable",
        "file": "projects/08-generational-handles/src/generational_handles.zig"
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
