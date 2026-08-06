module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "39",
    "canonicalName": "intrusive-doubly-linked-list",
    "displayName": "Intrusive Doubly Linked List",
    "directory": "projects/39-intrusive-doubly-linked-list",
    "publicEntrypoint": "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
    "detailsContract": "projects/39-intrusive-doubly-linked-list/details.json",
    "humanContract": "projects/39-intrusive-doubly-linked-list/DETAILS.md",
    "portContract": "projects/39-intrusive-doubly-linked-list/port.js"
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
      "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
    ],
    "publicEntrypoints": [
      "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
    ],
    "internalUnitTests": [
      "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
    ],
    "externalSmokeTests": [
      "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/39-intrusive-doubly-linked-list/README.md",
      "projects/39-intrusive-doubly-linked-list/MASTERY.md",
      "projects/39-intrusive-doubly-linked-list/DETAILS.md",
      "projects/39-intrusive-doubly-linked-list/details.json",
      "projects/39-intrusive-doubly-linked-list/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "IntrusiveDoublyLinkedList"
    ],
    "publicTypes": [
      {
        "name": "IntrusiveDoublyLinkedList",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented intrusive-doubly-linked-list public behavior, boundaries, and failure semantics."
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
      "std.debug.assert",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
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
            "path": "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
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
            "path": "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig",
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
        "path": "std.debug.assert",
        "symbols": [
          "std.debug.assert"
        ],
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
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
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
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
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
          "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig"
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
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
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
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-intrusive-doubly-linked-list",
    "smokeTestStep": "smoke-intrusive-doubly-linked-list",
    "namedModuleImport": "intrusive-doubly-linked-list",
    "sourcePath": "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
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
      "test-intrusive-doubly-linked-list",
      "smoke-intrusive-doubly-linked-list"
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
      "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
    ],
    "smokeTests": [
      "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
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
        "IntrusiveDoublyLinkedList"
      ],
      "affectedFiles": [
        "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-intrusive-doubly-linked-list",
        "zig build smoke-intrusive-doubly-linked-list"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented intrusive-doubly-linked-list public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "IntrusiveDoublyLinkedList"
      ],
      "detectionTests": [
        "zig build test-intrusive-doubly-linked-list",
        "zig build smoke-intrusive-doubly-linked-list"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "intrusive-doubly-linked-list"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-intrusive-doubly-linked-list",
      "zig build smoke-intrusive-doubly-linked-list"
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
      "projects/39-intrusive-doubly-linked-list/port.js",
      "projects/39-intrusive-doubly-linked-list/details.json",
      "projects/39-intrusive-doubly-linked-list/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-intrusive-doubly-linked-list"
    ],
    "recommendedPortOrder": [
      "intrusive-doubly-linked-list"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.debug.assert",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.debug.assert",
      "std.testing.expect",
      "std.testing.expectEqual",
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
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
          "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.debug.assert",
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig",
          "projects/39-intrusive-doubly-linked-list/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "IntrusiveDoublyLinkedList",
        "file": "projects/39-intrusive-doubly-linked-list/src/intrusive_doubly_linked_list.zig"
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
