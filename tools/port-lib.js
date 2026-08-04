"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredCategories = ["module", "baseline", "sourceInventory", "publicContract", "dependencies", "zigLanguageFeatures", "compilerBuiltins", "standardLibraryUsage", "buildSystemUsage", "targetAndPlatformUsage", "allocatorUsage", "pointerAndMemoryUsage", "integerAndCastUsage", "reflectionAndComptimeUsage", "errorHandlingUsage", "testingUsage", "knownVersionChanges", "possibleMechanicalTransforms", "manualReviewRequired", "semanticPortingRisks", "migrationOrder", "validationPlan", "testedTargets", "untestedTargets", "agentInstructions", "sourceMap", "history"];

function rel(p) { return path.relative(root, p).replaceAll(path.sep, "/"); }
function implementedModules() {
  return fs.readdirSync(path.join(root, "projects"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d\d-/.test(e.name))
    .map((e) => path.join(root, "projects", e.name))
    .filter((d) => fs.existsSync(path.join(d, "details.json")) && fs.readdirSync(path.join(d, "src")).some((f) => f.endsWith(".zig")))
    .sort();
}
function readDetails(dir) { return JSON.parse(fs.readFileSync(path.join(dir, "details.json"), "utf8")); }
function parseContract(file) {
  const source = fs.readFileSync(file, "utf8");
  const prefix = "module.exports = ";
  if (!source.startsWith(prefix) || !source.endsWith(";\n")) throw new Error(`${rel(file)} must be a static module.exports JSON object with a final newline`);
  const body = source.slice(prefix.length, -2);
  if (/\b(require|import|function|process|eval|globalThis)\b/.test(body)) throw new Error(`${rel(file)} contains executable JavaScript`);
  return JSON.parse(body);
}
function writeContract(file, value) { fs.writeFileSync(file, `module.exports = ${JSON.stringify(value, null, 2)};\n`); }
function buildDependencies() {
  const text = fs.readFileSync(path.join(root, "build.zig"), "utf8");
  const map = new Map();
  for (const match of text.matchAll(/\.name = "([^"]+)"[^\n]+\.dependencies = &\.\{([^}]*)\}/g)) map.set(match[1], [...match[2].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  return map;
}
function builtinInventory(files) {
  const names = new Map();
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const m of text.matchAll(/@[A-Za-z][A-Za-z0-9]*/g)) {
      if (m[0] === "@import") continue;
      if (!names.has(m[0])) names.set(m[0], []);
      if (!names.get(m[0]).includes(file)) names.get(m[0]).push(file);
    }
  }
  return [...names].sort().map(([name, paths]) => ({ name, files: paths.map((p) => ({ path: p, lines: [], symbols: [] })), baselineBehavior: `Zig 0.14.0 ${name} behavior as exercised by this module`, portingRisk: "medium", likelyChangeCategory: "syntax_or_type_semantics", notes: [] }));
}
function stdInventory(files) {
  const found = new Map();
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const m of text.matchAll(/\bstd\.([A-Za-z_][A-Za-z0-9_.]*)/g)) {
      const symbol = `std.${m[1].replace(/[.)},;]+$/, "")}`;
      if (!found.has(symbol)) found.set(symbol, []);
      if (!found.get(symbol).includes(file)) found.get(symbol).push(file);
    }
  }
  return [...found].sort().map(([symbol, files]) => ({ path: symbol, symbols: [symbol], files, purpose: symbol.startsWith("std.testing") ? "test assertions and test allocation" : "implementation support", versionSensitivity: "medium", knownChanges: [], migrationNotes: [] }));
}
function contractFor(dir) {
  const d = readDetails(dir); const mod = d.module; const loc = d.locations; const pub = d.public_surface;
  const name = mod.canonical_name; const directory = rel(dir); const impl = loc.implementation; const smoke = loc.smoke_tests;
  const deps = buildDependencies().get(name) || [];
  const builtins = builtinInventory([...impl, ...loc.unit_tests, ...smoke]); const std = stdInventory([...impl, ...loc.unit_tests, ...smoke]);
  const sensitive = builtins.map((x) => x.name);
  const guarantees = [...(d.state_and_invariants?.invariants || []), ...(d.ownership?.rules || []), ...(d.failure_semantics?.guarantees || [])].map(String);
  if (!guarantees.length) guarantees.push(`Preserve the documented ${name} public behavior, boundaries, and failure semantics.`);
  const risk = guarantees[0] || `The documented behavior of ${name} could change while the code still compiles.`;
  return {
    schemaVersion: "1.0.0", contractVersion: "1.0.0",
    module: { id: mod.id, canonicalName: name, displayName: mod.display_name, directory, publicEntrypoint: loc.public_entrypoint, detailsContract: loc.details_json, humanContract: loc.details_markdown, portContract: `${directory}/port.js` },
    baseline: { zigVersion: "0.14.0", minimumSupportedVersion: "0.14.0", maximumTestedVersion: "", baselineCompilerValidated: false, baselineUnitTestsPassed: false, baselineSmokeTestsPassed: false, lastValidatedCommit: "", validationEvidence: ["Zig compiler was unavailable in the authoring environment; claims remain unverified."] },
    sourceInventory: { implementationFiles: impl, publicEntrypoints: [loc.public_entrypoint], internalUnitTests: loc.unit_tests, externalSmokeTests: smoke, examples: loc.examples, fixtures: loc.fixtures, benchmarks: loc.benchmarks, fuzzTargets: loc.fuzz_targets, buildDefinitions: ["build.zig"], contracts: [`${directory}/README.md`, `${directory}/MASTERY.md`, `${directory}/DETAILS.md`, `${directory}/details.json`, `${directory}/port.js`] },
    publicContract: { publicSymbols: pub.root_symbols, publicTypes: pub.types, publicFunctions: pub.functions, publicMethods: pub.methods, publicConstants: pub.constants, publicErrors: pub.errors, invariantsToPreserve: guarantees, ownershipRulesToPreserve: (d.ownership?.rules || []).map(String), lifetimeRulesToPreserve: (d.lifetimes?.rules || []).map(String), cleanupRulesToPreserve: (d.cleanup?.rules || []).map(String), invalidationRulesToPreserve: (d.invalidation?.rules || []).map(String), failureAtomicityToPreserve: (d.failure_semantics?.atomicity || []).map(String), binaryLayoutsToPreserve: (d.abi_and_layout?.guarantees || []).map(String), compatibilityPromisesToPreserve: [], intentionallyUnstableDetails: [] },
    dependencies: { repository: deps.map((dep) => ({ canonicalName: dep, portContract: `${[...implementedModules()].map(readDetails).find((x) => x.module.canonical_name === dep).locations.module_root}/port.js`, importName: dep, symbolsUsed: [], mustPortFirst: true, reason: "The module imports this direct repository dependency in build.zig.", guaranteesInherited: [] })), standardLibrary: std.map((x) => x.path), external: [] },
    zigLanguageFeatures: { used: [...new Set([...(pub.compile_time_parameters?.length ? ["comptime parameters"] : []), ...(pub.errors?.length ? ["error unions"] : [])])], versionSensitive: sensitive, notes: [] },
    compilerBuiltins: { used: builtins, notUsed: [] },
    standardLibraryUsage: { imports: std, testingApis: std.filter((x) => x.path.startsWith("std.testing")).map((x) => x.path), allocatorApis: std.filter((x) => /Allocator|allocator|testing\.allocator/.test(x.path)).map((x) => x.path), ioApis: std.filter((x) => x.path.startsWith("std.io")).map((x) => x.path), endianApis: std.filter((x) => /Endian|readInt|writeInt|memcpy/.test(x.path)).map((x) => x.path), mathApis: std.filter((x) => x.path.startsWith("std.math")).map((x) => x.path), metadataApis: std.filter((x) => /meta|builtin/.test(x.path)).map((x) => x.path) },
    buildSystemUsage: { unitTestStep: `test-${name}`, smokeTestStep: `smoke-${name}`, namedModuleImport: name, sourcePath: loc.public_entrypoint, directModuleDependencies: deps, buildApisUsed: ["std.Build.createModule", "std.Build.addTest", "std.Build.addRunArtifact", "std.Build.Module.addImport", "std.Build.step"], rootModuleConfiguration: ["root_module"], targetConfiguration: ["standardTargetOptions"], optimizeConfiguration: ["standardOptimizeOption"], runArtifacts: [`test-${name}`, `smoke-${name}`], systemCommands: [], likelyPortingRisks: ["Named module identity and dependency imports must remain singular and ordered."] },
    targetAndPlatformUsage: { hosted: d.compatibility?.hosted || "", freestanding: d.compatibility?.freestanding || "", targets: d.compatibility?.targets || [], endianSensitive: std.some((x) => /Endian|readInt|writeInt/.test(x.path)), notes: [] },
    allocatorUsage: { allocatorSensitive: std.some((x) => /Allocator|allocator/.test(x.path)), apis: std.filter((x) => /Allocator|allocator/.test(x.path)).map((x) => x.path), ownershipTransitions: (d.ownership?.rules || []).map(String), notes: [] },
    pointerAndMemoryUsage: { pointerSensitive: builtins.some((x) => /ptr|align|memcpy|memset/.test(x.name)) || std.some((x) => /mem/.test(x.path)), builtins: sensitive.filter((x) => /ptr|align|memcpy|memset/.test(x)), borrowedMemoryRules: (d.ownership?.borrowing || []).map(String), notes: [] },
    integerAndCastUsage: { builtins: sensitive.filter((x) => /int|truncate|overflow|as/.test(x)), overflowSemantics: (d.arithmetic?.overflow_behavior || []).map(String), notes: [] },
    reflectionAndComptimeUsage: { reflectionSensitive: builtins.some((x) => /typeInfo|Type|field|has/.test(x.name)), builtins: sensitive.filter((x) => /typeInfo|Type|field|has/.test(x)), comptimeParameters: pub.compile_time_parameters || [], notes: [] },
    errorHandlingUsage: { publicErrors: pub.errors, failureGuarantees: (d.failure_semantics?.guarantees || []).map(String), panicBehavior: d.failure_semantics?.panic_behavior || "", notes: [] },
    testingUsage: { unitTests: loc.unit_tests, smokeTests: smoke, testingApis: std.filter((x) => x.path.startsWith("std.testing")).map((x) => x.path), semanticCoverage: (d.testing?.behaviors_covered || []).map(String) },
    knownVersionChanges: [], possibleMechanicalTransforms: [],
    manualReviewRequired: [{ topic: "semantic and build compatibility", reason: "Unknown future Zig releases can change inference, standard-library contracts, or build graph identity.", affectedSymbols: pub.root_symbols, affectedFiles: impl, questionsToAnswer: ["Do public errors, ownership, layout, and failure atomicity still match the contracts?"], requiredTests: [`zig build test-${name}`, `zig build smoke-${name}`] }],
    semanticPortingRisks: [{ risk, consequence: "A syntactically successful port could violate the module contract.", affectedEndpoints: pub.root_symbols, detectionTests: [`zig build test-${name}`, `zig build smoke-${name}`], mitigation: "Compare DETAILS.md and details.json, then run boundary and failure-path tests." }],
    migrationOrder: { portAfter: deps, portBefore: [], independentOf: [], recommendedSequence: [...deps, name], cycleRisks: [] },
    validationPlan: { baselineCommands: ["zig version", "zig build check-module-contracts", "zig build check-port-contracts", `zig build test-${name}`, `zig build smoke-${name}`], targetVersionCommands: [], semanticTests: (d.testing?.behaviors_covered || []).map(String), layoutChecks: [], compileErrorExpectations: [], manualReviewSteps: ["Review compiler diagnostics against verified release notes.", "Compare public behavior, ownership, and failure semantics with the contracts."], successCriteria: ["All contract, unit, and smoke checks pass without semantic drift."], failureCriteria: ["Any unsupported-version claim, changed public behavior, or failing validation command."] },
    testedTargets: [], untestedTargets: [{ zigVersion: ">0.14.0", status: "not_tested", expectedDifficulty: "unknown", knownBlockers: [], notes: ["Inspect verified release notes and compiler diagnostics before creating migration rules."] }],
    agentInstructions: { readFirst: [`${directory}/port.js`, loc.details_json, loc.details_markdown, ...deps.map((x) => `${[...implementedModules()].map(readDetails).find((d) => d.module.canonical_name === x).locations.module_root}/port.js`)], filesUsuallyNotRequired: loc.examples || [], firstCommands: ["zig version", `zig build test-${name}`], recommendedPortOrder: [...deps, name], searchTerms: [...sensitive, ...std.map((x) => x.path)], likelyCompilerFailureAreas: [...sensitive, ...std.map((x) => x.path)], doNotAssume: ["Compilation proves semantic or binary-layout compatibility.", "A newer std.Build API preserves module identity.", "Unknown future releases have a mechanical replacement path."], stopConditions: ["Stop before recording support when the exact target compiler and semantic tests have not run."], completionChecklist: ["Port dependencies first.", "Run contract checks, unit tests, and smoke tests.", "Record evidence without deleting baseline history."] },
    sourceMap: { builtinsToFiles: builtins.map((x) => ({ builtin: x.name, files: x.files.map((f) => f.path) })), standardLibraryToFiles: std.map((x) => ({ api: x.path, files: x.files })), symbolsToFiles: pub.root_symbols.map((symbol) => ({ symbol, file: loc.public_entrypoint })) },
    history: { baselineEstablished: "Zig 0.14.0", migrations: [], notes: ["No later Zig target has been tested."] }
  };
}
function index(contracts) { return { schemaVersion: "1.0.0", generatedFrom: "projects/*/port.js", modules: contracts.map((c) => ({ id: c.module.id, canonicalName: c.module.canonicalName, currentZigVersion: c.baseline.zigVersion, portContract: c.module.portContract, implementationPath: c.module.publicEntrypoint, dependenciesMustPortFirst: c.dependencies.repository.filter((d) => d.mustPortFirst).map((d) => d.canonicalName), baselineValidated: c.baseline.baselineCompilerValidated && c.baseline.baselineUnitTestsPassed && c.baseline.baselineSmokeTestsPassed, testedTargetVersions: c.testedTargets.map((t) => t.zigVersion), knownMigrationBlockers: c.untestedTargets.flatMap((t) => t.knownBlockers) })) };
}
module.exports = { root, rel, requiredCategories, implementedModules, readDetails, parseContract, writeContract, contractFor, index };
