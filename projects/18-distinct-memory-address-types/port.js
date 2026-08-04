module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "18",
    "canonicalName": "distinct-memory-address-types",
    "displayName": "Distinct Memory Address Types",
    "directory": "projects/18-distinct-memory-address-types",
    "publicEntrypoint": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig",
    "detailsContract": "projects/18-distinct-memory-address-types/details.json",
    "humanContract": "projects/18-distinct-memory-address-types/DETAILS.md",
    "portContract": "projects/18-distinct-memory-address-types/port.js"
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
      "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
    ],
    "publicEntrypoints": [
      "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
    ],
    "internalUnitTests": [
      "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
    ],
    "externalSmokeTests": [
      "projects/18-distinct-memory-address-types/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/18-distinct-memory-address-types/README.md",
      "projects/18-distinct-memory-address-types/MASTERY.md",
      "projects/18-distinct-memory-address-types/DETAILS.md",
      "projects/18-distinct-memory-address-types/details.json",
      "projects/18-distinct-memory-address-types/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "PhysicalAddress",
      "HostVirtualAddress",
      "GuestPhysicalAddress",
      "GuestVirtualAddress"
    ],
    "publicTypes": [
      {
        "name": "PhysicalAddress",
        "kind": "wrapper struct"
      },
      {
        "name": "HostVirtualAddress",
        "kind": "wrapper struct"
      },
      {
        "name": "GuestPhysicalAddress",
        "kind": "wrapper struct"
      },
      {
        "name": "GuestVirtualAddress",
        "kind": "wrapper struct"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [
      {
        "name": "init",
        "signature": "init(value: usize) Self"
      },
      {
        "name": "raw",
        "signature": "raw(self: Self) usize"
      },
      {
        "name": "add",
        "signature": "add(self: Self, offset: usize) error{Overflow}!Self"
      },
      {
        "name": "subtract",
        "signature": "subtract(self: Self, offset: usize) error{Underflow}!Self"
      }
    ],
    "publicConstants": [],
    "publicErrors": [
      "Overflow",
      "Underflow"
    ],
    "invariantsToPreserve": [
      "Preserve the documented distinct-memory-address-types public behavior, boundaries, and failure semantics."
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
      "std.math.maxInt",
      "std.math.sub",
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
      "@TypeOf",
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
            "path": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig",
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
            "path": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig",
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
        "name": "@as",
        "files": [
          {
            "path": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig",
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
        "path": "std.math.add",
        "symbols": [
          "std.math.add"
        ],
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
          "projects/18-distinct-memory-address-types/tests/smoke_test.zig"
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
    "mathApis": [
      "std.math.add",
      "std.math.maxInt",
      "std.math.sub"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-distinct-memory-address-types",
    "smokeTestStep": "smoke-distinct-memory-address-types",
    "namedModuleImport": "distinct-memory-address-types",
    "sourcePath": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig",
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
      "test-distinct-memory-address-types",
      "smoke-distinct-memory-address-types"
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
    "reflectionSensitive": true,
    "builtins": [
      "@TypeOf"
    ],
    "comptimeParameters": [],
    "notes": []
  },
  "errorHandlingUsage": {
    "publicErrors": [
      "Overflow",
      "Underflow"
    ],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
    ],
    "smokeTests": [
      "projects/18-distinct-memory-address-types/tests/smoke_test.zig"
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
        "PhysicalAddress",
        "HostVirtualAddress",
        "GuestPhysicalAddress",
        "GuestVirtualAddress"
      ],
      "affectedFiles": [
        "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-distinct-memory-address-types",
        "zig build smoke-distinct-memory-address-types"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented distinct-memory-address-types public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "PhysicalAddress",
        "HostVirtualAddress",
        "GuestPhysicalAddress",
        "GuestVirtualAddress"
      ],
      "detectionTests": [
        "zig build test-distinct-memory-address-types",
        "zig build smoke-distinct-memory-address-types"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "distinct-memory-address-types"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-distinct-memory-address-types",
      "zig build smoke-distinct-memory-address-types"
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
      "projects/18-distinct-memory-address-types/port.js",
      "projects/18-distinct-memory-address-types/details.json",
      "projects/18-distinct-memory-address-types/DETAILS.md"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-distinct-memory-address-types"
    ],
    "recommendedPortOrder": [
      "distinct-memory-address-types"
    ],
    "searchTerms": [
      "@This",
      "@TypeOf",
      "@as",
      "std.math.add",
      "std.math.maxInt",
      "std.math.sub",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError",
      "std.testing.refAllDeclsRecursive"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@TypeOf",
      "@as",
      "std.math.add",
      "std.math.maxInt",
      "std.math.sub",
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
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "builtin": "@TypeOf",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.add",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.math.sub",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
        ]
      },
      {
        "api": "std.testing.refAllDeclsRecursive",
        "files": [
          "projects/18-distinct-memory-address-types/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "PhysicalAddress",
        "file": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
      },
      {
        "symbol": "HostVirtualAddress",
        "file": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
      },
      {
        "symbol": "GuestPhysicalAddress",
        "file": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
      },
      {
        "symbol": "GuestVirtualAddress",
        "file": "projects/18-distinct-memory-address-types/src/distinct_memory_address_types.zig"
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
