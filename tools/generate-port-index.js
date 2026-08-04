#!/usr/bin/env node
"use strict";
const fs = require("fs"); const path = require("path"); const lib = require("./port-lib");
const contracts = lib.implementedModules().map((d) => lib.parseContract(path.join(d, "port.js")));
fs.writeFileSync(path.join(lib.root, "ports.json"), `${JSON.stringify(lib.index(contracts), null, 2)}\n`); console.log(`generated ports.json for ${contracts.length} modules`);
