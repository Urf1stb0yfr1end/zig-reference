module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "57",
    "canonicalName": "bounded-resource-table",
    "displayName": "Bounded Resource Table",
    "directory": "projects/57-bounded-resource-table",
    "publicEntrypoint": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
    "detailsContract": "projects/57-bounded-resource-table/details.json",
    "humanContract": "projects/57-bounded-resource-table/DETAILS.md",
    "portContract": "projects/57-bounded-resource-table/port.js"
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
      "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
    ],
    "publicEntrypoints": [
      "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
    ],
    "internalUnitTests": [
      "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
    ],
    "externalSmokeTests": [
      "projects/57-bounded-resource-table/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/57-bounded-resource-table/README.md",
      "projects/57-bounded-resource-table/MASTERY.md",
      "projects/57-bounded-resource-table/DETAILS.md",
      "projects/57-bounded-resource-table/details.json",
      "projects/57-bounded-resource-table/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Capabilities",
      "BackendId",
      "ResourceTable",
      "BindingTable",
      "semanticIdentity",
      "referenceFromIdentity"
    ],
    "publicTypes": [
      {
        "name": "Capabilities",
        "kind": "public declaration"
      },
      {
        "name": "BackendId",
        "kind": "public declaration"
      },
      {
        "name": "ResourceTable",
        "kind": "public declaration"
      },
      {
        "name": "BindingTable",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [
      {
        "name": "ResourceTable",
        "signature": "ResourceTable(comptime capacity: usize) type"
      },
      {
        "name": "BindingTable",
        "signature": "BindingTable(comptime ResourceRef: type, comptime capacity: usize) type"
      },
      {
        "name": "semanticIdentity",
        "signature": "semanticIdentity(reference: anytype) morphic-semantic-operation.ResourceId"
      },
      {
        "name": "referenceFromIdentity",
        "signature": "referenceFromIdentity(comptime ResourceRef: type, identity: morphic-semantic-operation.ResourceId) ResourceRef"
      }
    ],
    "publicMethods": [
      {
        "name": "create",
        "signature": "create(self: *Self, description: Description) Error!ResourceRef"
      },
      {
        "name": "retain",
        "signature": "retain(self: *Self, reference: ResourceRef) Error!void"
      },
      {
        "name": "release",
        "signature": "release(self: *Self, reference: ResourceRef) Error!bool"
      },
      {
        "name": "resolve",
        "signature": "resolve(self: *const Self, reference_or_slot: anytype) optional result"
      },
      {
        "name": "setState",
        "signature": "setState(self: *Self, reference: ResourceRef, state: usize) Error!void"
      },
      {
        "name": "referenceCount",
        "signature": "referenceCount(self: *const Self, reference: ResourceRef) ?usize"
      },
      {
        "name": "count",
        "signature": "count(self: *const Self) usize"
      },
      {
        "name": "hasCapacity",
        "signature": "hasCapacity(self: *const Self) bool"
      },
      {
        "name": "bindAt",
        "signature": "bindAt(self: *Self, slot: usize, reference: ResourceRef) Error!void"
      },
      {
        "name": "duplicateLowest",
        "signature": "duplicateLowest(self: *Self, source: usize) Error!usize"
      },
      {
        "name": "duplicateLowestAtOrAbove",
        "signature": "duplicateLowestAtOrAbove(self: *Self, source: usize, minimum: usize) Error!usize"
      },
      {
        "name": "lowestFreeAtOrAbove",
        "signature": "lowestFreeAtOrAbove(self: *const Self, minimum: usize) ?usize"
      },
      {
        "name": "unbind",
        "signature": "unbind(self: *Self, slot: usize) Error!ResourceRef"
      }
    ],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented bounded-resource-table public behavior, boundaries, and failure semantics."
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
        "canonicalName": "generational-handles",
        "portContract": "projects/08-generational-handles/port.js",
        "importName": "generational-handles",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "morphic-semantic-operation",
        "portContract": "projects/56-morphic-semantic-operation/port.js",
        "importName": "morphic-semantic-operation",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.math.maxInt",
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
      "@TypeOf",
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
            "path": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/57-bounded-resource-table/tests/smoke_test.zig",
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
            "path": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/57-bounded-resource-table/tests/smoke_test.zig",
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
            "path": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/57-bounded-resource-table/tests/smoke_test.zig",
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
            "path": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/57-bounded-resource-table/tests/smoke_test.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @enumFromInt behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intFromEnum",
        "files": [
          {
            "path": "projects/57-bounded-resource-table/tests/smoke_test.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intFromEnum behavior as exercised by this module",
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
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
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
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
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
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
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
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
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
    "mathApis": [
      "std.math.maxInt"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-bounded-resource-table",
    "smokeTestStep": "smoke-bounded-resource-table",
    "namedModuleImport": "bounded-resource-table",
    "sourcePath": "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
    "directModuleDependencies": [
      "generational-handles",
      "morphic-semantic-operation"
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
      "test-bounded-resource-table",
      "smoke-bounded-resource-table"
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
      "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
    ],
    "smokeTests": [
      "projects/57-bounded-resource-table/tests/smoke_test.zig"
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
        "Capabilities",
        "BackendId",
        "ResourceTable",
        "BindingTable",
        "semanticIdentity",
        "referenceFromIdentity"
      ],
      "affectedFiles": [
        "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-bounded-resource-table",
        "zig build smoke-bounded-resource-table"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented bounded-resource-table public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Capabilities",
        "BackendId",
        "ResourceTable",
        "BindingTable",
        "semanticIdentity",
        "referenceFromIdentity"
      ],
      "detectionTests": [
        "zig build test-bounded-resource-table",
        "zig build smoke-bounded-resource-table"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "generational-handles",
      "morphic-semantic-operation"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "generational-handles",
      "morphic-semantic-operation",
      "bounded-resource-table"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-bounded-resource-table",
      "zig build smoke-bounded-resource-table"
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
      "projects/57-bounded-resource-table/port.js",
      "projects/57-bounded-resource-table/details.json",
      "projects/57-bounded-resource-table/DETAILS.md",
      "projects/08-generational-handles/port.js",
      "projects/56-morphic-semantic-operation/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-bounded-resource-table"
    ],
    "recommendedPortOrder": [
      "generational-handles",
      "morphic-semantic-operation",
      "bounded-resource-table"
    ],
    "searchTerms": [
      "@This",
      "@TypeOf",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@TypeOf",
      "@as",
      "@enumFromInt",
      "@intFromEnum",
      "std.math.maxInt",
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
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@TypeOf",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@enumFromInt",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@intFromEnum",
        "files": [
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig",
          "projects/57-bounded-resource-table/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Capabilities",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      },
      {
        "symbol": "BackendId",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      },
      {
        "symbol": "ResourceTable",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      },
      {
        "symbol": "BindingTable",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      },
      {
        "symbol": "semanticIdentity",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
      },
      {
        "symbol": "referenceFromIdentity",
        "file": "projects/57-bounded-resource-table/src/bounded_resource_table.zig"
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
