#!/usr/bin/env node
"use strict";
const lib = require("./port-lib");
const dir = lib.implementedModules().find((path) => path.endsWith("52-bounded-deterministic-scheduler"));
const expected = lib.contractFor(dir);
const broken = JSON.parse(JSON.stringify(expected));
broken.publicContract.publicSymbols = ["FixedPriorityQueue"];
broken.publicContract.publicTypes = [{ name: "FixedPriorityQueue", kind: "public declaration" }];
const errors = lib.publicSurfaceErrors(broken, expected, "fixture");
if (!errors.some((error) => error.includes("publicSymbols")) || !errors.some((error) => error.includes("publicTypes"))) process.exit(1);
console.log("PASS: dependency declarations cannot replace a module's canonical public surface");
