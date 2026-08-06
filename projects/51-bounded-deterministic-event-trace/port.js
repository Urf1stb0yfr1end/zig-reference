module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "51",
    "canonicalName": "bounded-deterministic-event-trace",
    "displayName": "Bounded Deterministic Event Trace",
    "directory": "projects/51-bounded-deterministic-event-trace",
    "publicEntrypoint": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
    "detailsContract": "projects/51-bounded-deterministic-event-trace/details.json",
    "humanContract": "projects/51-bounded-deterministic-event-trace/DETAILS.md",
    "portContract": "projects/51-bounded-deterministic-event-trace/port.js"
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
      "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
    ],
    "publicEntrypoints": [
      "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
    ],
    "internalUnitTests": [
      "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
    ],
    "externalSmokeTests": [
      "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/51-bounded-deterministic-event-trace/README.md",
      "projects/51-bounded-deterministic-event-trace/MASTERY.md",
      "projects/51-bounded-deterministic-event-trace/DETAILS.md",
      "projects/51-bounded-deterministic-event-trace/details.json",
      "projects/51-bounded-deterministic-event-trace/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "NormalizedEvent",
      "EventInput",
      "BoundedDeterministicEventTrace"
    ],
    "publicTypes": [
      {
        "name": "NormalizedEvent",
        "kind": "public declaration"
      },
      {
        "name": "EventInput",
        "kind": "public declaration"
      },
      {
        "name": "BoundedDeterministicEventTrace",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented bounded-deterministic-event-trace public behavior, boundaries, and failure semantics."
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
      "std.io.fixedBufferStream",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [
      "comptime parameters"
    ],
    "versionSensitive": [
      "@This",
      "@as",
      "@compileError",
      "@sizeOf"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
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
            "path": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig",
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
        "name": "@compileError",
        "files": [
          {
            "path": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @compileError behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@sizeOf",
        "files": [
          {
            "path": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @sizeOf behavior as exercised by this module",
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
          "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
          "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqualStrings",
        "symbols": [
          "std.testing.expectEqualStrings"
        ],
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
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
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [
      "std.io.fixedBufferStream"
    ],
    "endianApis": [],
    "mathApis": [
      "std.math.maxInt"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-deterministic-event-trace",
    "smokeTestStep": "smoke-bounded-deterministic-event-trace",
    "namedModuleImport": "bounded-deterministic-event-trace",
    "sourcePath": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
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
      "test-bounded-deterministic-event-trace",
      "smoke-bounded-deterministic-event-trace"
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
    "comptimeParameters": [
      {
        "name": "capacity_value",
        "type": "usize",
        "constraints": [
          "greater than zero"
        ],
        "meaning": "maximum recorded events"
      }
    ],
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
      "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
    ],
    "smokeTests": [
      "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
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
        "NormalizedEvent",
        "EventInput",
        "BoundedDeterministicEventTrace"
      ],
      "affectedFiles": [
        "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-deterministic-event-trace",
        "zig build smoke-bounded-deterministic-event-trace"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-deterministic-event-trace public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "NormalizedEvent",
        "EventInput",
        "BoundedDeterministicEventTrace"
      ],
      "detectionTests": [
        "zig build test-bounded-deterministic-event-trace",
        "zig build smoke-bounded-deterministic-event-trace"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-deterministic-event-trace"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-deterministic-event-trace",
      "zig build smoke-bounded-deterministic-event-trace"
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
      "projects/51-bounded-deterministic-event-trace/port.js",
      "projects/51-bounded-deterministic-event-trace/details.json",
      "projects/51-bounded-deterministic-event-trace/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-deterministic-event-trace"
    ],
    "recommendedPortOrder": [
      "bounded-deterministic-event-trace"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@compileError",
      "@sizeOf",
      "std.io.fixedBufferStream",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@compileError",
      "@sizeOf",
      "std.io.fixedBufferStream",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectEqualDeep",
      "std.testing.expectEqualStrings",
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
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
          "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@compileError",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.io.fixedBufferStream",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
          "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig",
          "projects/51-bounded-deterministic-event-trace/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualDeep",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "api": "std.testing.expectEqualStrings",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "NormalizedEvent",
        "file": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
      },
      {
        "symbol": "EventInput",
        "file": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
      },
      {
        "symbol": "BoundedDeterministicEventTrace",
        "file": "projects/51-bounded-deterministic-event-trace/src/bounded_deterministic_event_trace.zig"
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
