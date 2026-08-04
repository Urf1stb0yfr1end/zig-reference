module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "35",
    "canonicalName": "physical-memory-region-set",
    "displayName": "Physical Memory Region Set",
    "directory": "projects/35-physical-memory-region-set",
    "publicEntrypoint": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
    "detailsContract": "projects/35-physical-memory-region-set/details.json",
    "humanContract": "projects/35-physical-memory-region-set/DETAILS.md",
    "portContract": "projects/35-physical-memory-region-set/port.js"
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
      "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
    ],
    "publicEntrypoints": [
      "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
    ],
    "internalUnitTests": [
      "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
    ],
    "externalSmokeTests": [
      "projects/35-physical-memory-region-set/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/35-physical-memory-region-set/README.md",
      "projects/35-physical-memory-region-set/MASTERY.md",
      "projects/35-physical-memory-region-set/DETAILS.md",
      "projects/35-physical-memory-region-set/details.json",
      "projects/35-physical-memory-region-set/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "RegionKind",
      "PhysicalMemoryRegion",
      "PhysicalMemoryRegionSet"
    ],
    "publicTypes": [
      {
        "name": "RegionKind",
        "kind": "public declaration"
      },
      {
        "name": "PhysicalMemoryRegion",
        "kind": "public declaration"
      },
      {
        "name": "PhysicalMemoryRegionSet",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented physical-memory-region-set public behavior, boundaries, and failure semantics."
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
        "canonicalName": "validated-enum-decoder",
        "portContract": "projects/14-validated-enum-decoder/port.js",
        "importName": "validated-enum-decoder",
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
      },
      {
        "canonicalName": "physical-page-frame-number-and-address-conversion",
        "portContract": "projects/28-physical-page-frame-number-and-address-conversion/port.js",
        "importName": "physical-page-frame-number-and-address-conversion",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.mem.sort",
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
            "path": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
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
            "path": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
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
        "path": "std.mem.sort",
        "symbols": [
          "std.mem.sort"
        ],
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
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
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
          "projects/35-physical-memory-region-set/tests/smoke_test.zig"
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
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
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
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
          "projects/35-physical-memory-region-set/tests/smoke_test.zig"
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
    "unitTestStep": "test-physical-memory-region-set",
    "smokeTestStep": "smoke-physical-memory-region-set",
    "namedModuleImport": "physical-memory-region-set",
    "sourcePath": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
    "directModuleDependencies": [
      "fixed-capacity-vector",
      "validated-enum-decoder",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion"
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
      "test-physical-memory-region-set",
      "smoke-physical-memory-region-set"
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
      "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
    ],
    "smokeTests": [
      "projects/35-physical-memory-region-set/tests/smoke_test.zig"
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
        "RegionKind",
        "PhysicalMemoryRegion",
        "PhysicalMemoryRegionSet"
      ],
      "affectedFiles": [
        "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-physical-memory-region-set",
        "zig build smoke-physical-memory-region-set"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented physical-memory-region-set public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "RegionKind",
        "PhysicalMemoryRegion",
        "PhysicalMemoryRegionSet"
      ],
      "detectionTests": [
        "zig build test-physical-memory-region-set",
        "zig build smoke-physical-memory-region-set"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-vector",
      "validated-enum-decoder",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector",
      "validated-enum-decoder",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-physical-memory-region-set",
      "zig build smoke-physical-memory-region-set"
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
      "projects/35-physical-memory-region-set/port.js",
      "projects/35-physical-memory-region-set/details.json",
      "projects/35-physical-memory-region-set/DETAILS.md",
      "projects/00-fixed-capacity-vector/port.js",
      "projects/14-validated-enum-decoder/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/18-distinct-memory-address-types/port.js",
      "projects/28-physical-page-frame-number-and-address-conversion/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-physical-memory-region-set"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector",
      "validated-enum-decoder",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "physical-page-frame-number-and-address-conversion",
      "physical-memory-region-set"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "std.mem.sort",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "std.mem.sort",
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
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.mem.sort",
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
          "projects/35-physical-memory-region-set/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig",
          "projects/35-physical-memory-region-set/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "RegionKind",
        "file": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
      },
      {
        "symbol": "PhysicalMemoryRegion",
        "file": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
      },
      {
        "symbol": "PhysicalMemoryRegionSet",
        "file": "projects/35-physical-memory-region-set/src/physical_memory_region_set.zig"
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
