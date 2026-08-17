import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import yaml from "js-yaml";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function findYamlFiles(dir) {
    const results = [];
    for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
        const rel = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...findYamlFiles(rel));
        else if (entry.name.endsWith(".yaml")) results.push(rel);
    }
    return results;
}

const files = [...findYamlFiles("ast"), ...findYamlFiles("cs-mast-s"), ...findYamlFiles("request")];

const remediation = {};
for (const rel of files) {
    const doc = yaml.load(readFileSync(path.join(root, rel), "utf8"));
    if (doc?.id && doc?.remediation) {
        remediation[doc.id] = doc.remediation;
    }
}

writeFileSync(
    path.join(root, "remediation.json"),
    JSON.stringify(remediation, null, 2) + "\n"
);
console.log(`Wrote ${Object.keys(remediation).length} entries to remediation.json`);
