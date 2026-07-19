import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const distAssets = join(root, "dist", "assets");
const outputFile = join(root, "docs", "performance", "latest-bundle-metrics.json");

function toKB(bytes) {
  return Math.round((bytes / 1024) * 100) / 100;
}

function collectAssets(dir) {
  return readdirSync(dir).map((name) => {
    const full = join(dir, name);
    const size = statSync(full).size;
    return { name, bytes: size, kb: toKB(size) };
  });
}

const assets = collectAssets(distAssets).sort((a, b) => b.bytes - a.bytes);
const totalBytes = assets.reduce((sum, item) => sum + item.bytes, 0);

const payload = {
  generatedAt: new Date().toISOString(),
  totalBytes,
  totalKB: toKB(totalBytes),
  assets,
};

console.log("Bundle metrics (dist/assets):");
for (const asset of assets) {
  console.log(`${asset.kb.toFixed(2)} KB\t${asset.name}`);
}
console.log(`Total: ${payload.totalKB.toFixed(2)} KB`);

writeFileSync(outputFile, JSON.stringify(payload, null, 2));
console.log(`Wrote metrics to: ${outputFile}`);
