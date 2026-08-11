module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "56",
    "canonicalName": "morphic-semantic-operation",
    "displayName": "Morphic Semantic Operation",
    "directory": "projects/56-morphic-semantic-operation",
    "publicEntrypoint": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
    "detailsContract": "projects/56-morphic-semantic-operation/details.json",
    "humanContract": "projects/56-morphic-semantic-operation/DETAILS.md",
    "portContract": "projects/56-morphic-semantic-operation/port.js"
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
      "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
    ],
    "publicEntrypoints": [
      "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
    ],
    "internalUnitTests": [
      "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
    ],
    "externalSmokeTests": [
      "projects/56-morphic-semantic-operation/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/56-morphic-semantic-operation/README.md",
      "projects/56-morphic-semantic-operation/MASTERY.md",
      "projects/56-morphic-semantic-operation/DETAILS.md",
      "projects/56-morphic-semantic-operation/details.json",
      "projects/56-morphic-semantic-operation/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ResourceId",
      "GuestAddress",
      "ReadBytes",
      "WriteBytes",
      "Request",
      "Failure",
      "Completion",
      "execute"
    ],
    "publicTypes": [
      {
        "name": "ResourceId",
        "kind": "public declaration"
      },
      {
        "name": "GuestAddress",
        "kind": "public declaration"
      },
      {
        "name": "ReadBytes",
        "kind": "public declaration"
      },
      {
        "name": "WriteBytes",
        "kind": "public declaration"
      },
      {
        "name": "Request",
        "kind": "public declaration"
      },
      {
        "name": "Failure",
        "kind": "public declaration"
      },
      {
        "name": "Completion",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [
      {
        "name": "execute",
        "signature": "execute(request: Request, backend: anytype) Completion"
      }
    ],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented morphic-semantic-operation public behavior, boundaries, and failure semantics."
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
    "standardLibrary": [],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
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
            "path": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/56-morphic-semantic-operation/tests/smoke_test.zig",
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
        "name": "@enumFromInt",
        "files": [
          {
            "path": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @enumFromInt behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      }
    ],
    "notUsed": []
  },
  "standardLibraryUsage": {
    "imports": [],
    "testingApis": [],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-morphic-semantic-operation",
    "smokeTestStep": "smoke-morphic-semantic-operation",
    "namedModuleImport": "morphic-semantic-operation",
    "sourcePath": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
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
      "test-morphic-semantic-operation",
      "smoke-morphic-semantic-operation"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "",
    "freestanding": "",
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
      "@intFromEnum"
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
      "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
    ],
    "smokeTests": [
      "projects/56-morphic-semantic-operation/tests/smoke_test.zig"
    ],
    "testingApis": [],
    "semanticCoverage": []
  },
  "knownVersionChanges": [],
  "possibleMechanicalTransforms": [],
  "manualReviewRequired": [
    {
      "topic": "semantic and build compatibility",
      "reason": "Unknown future Zig releases can change inference, standard-library contracts, or build graph identity.",
      "affectedSymbols": [
        "ResourceId",
        "GuestAddress",
        "ReadBytes",
        "WriteBytes",
        "Request",
        "Failure",
        "Completion",
        "execute"
      ],
      "affectedFiles": [
        "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-morphic-semantic-operation",
        "zig build smoke-morphic-semantic-operation"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented morphic-semantic-operation public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ResourceId",
        "GuestAddress",
        "ReadBytes",
        "WriteBytes",
        "Request",
        "Failure",
        "Completion",
        "execute"
      ],
      "detectionTests": [
        "zig build test-morphic-semantic-operation",
        "zig build smoke-morphic-semantic-operation"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "morphic-semantic-operation"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-morphic-semantic-operation",
      "zig build smoke-morphic-semantic-operation"
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
      "projects/56-morphic-semantic-operation/port.js",
      "projects/56-morphic-semantic-operation/details.json",
      "projects/56-morphic-semantic-operation/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-morphic-semantic-operation"
    ],
    "recommendedPortOrder": [
      "morphic-semantic-operation"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@enumFromInt",
      "@intFromEnum"
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
          "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig",
          "projects/56-morphic-semantic-operation/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@enumFromInt",
        "files": [
          "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
        ]
      },
      {
        "builtin": "@intFromEnum",
        "files": [
          "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [],
    "symbolsToFiles": [
      {
        "symbol": "ResourceId",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "GuestAddress",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "ReadBytes",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "WriteBytes",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "Request",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "Failure",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "Completion",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
      },
      {
        "symbol": "execute",
        "file": "projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig"
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
