#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const strict = process.argv.includes("--strict");
const jsonOnly = process.argv.includes("--json");
const baseArg = process.argv.find((arg) => arg.startsWith("--base-url="));
const baseUrl = baseArg ? baseArg.slice("--base-url=".length).replace(/\/$/, "") : null;
const findings = [];

function check(id, layer, ok, detail, severity = ok ? "info" : "medium") {
  findings.push({ id, layer, ok, detail, severity });
}

function read(relativePath) {
  const file = path.join(ROOT, relativePath);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function walk(relativeDir) {
  const root = path.join(ROOT, relativeDir);
  if (!existsSync(root)) return [];
  const files = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(full);
      else files.push(path.relative(ROOT, full));
    }
  };
  visit(root);
  return files;
}

const packageJson = JSON.parse(read("package.json") || "{}");
const indexHtml = read("index.html") || "";
const manifest = read("public/manifest.webmanifest") || "";
const serviceWorker = read("public/sw.js") || "";

check("identity:package-name", "trust", packageJson.name === "weather-fashion", "package identity is Weather Fashion", "high");
check("identity:index-title", "trust", /<title>Weather Fashion<\/title>/i.test(indexHtml), "index title matches the brand", "high");
check("identity:manifest", "trust", /"name":\s*"Weather Fashion"/.test(manifest), "PWA manifest name matches the brand", "medium");
check("identity:theme-color", "theme", /#f1f4f2/i.test(indexHtml) && /#f1f4f2/i.test(manifest), "brand surface color is consistent across HTML and manifest", "medium");
check("identity:icon", "theme", existsSync(path.join(ROOT, "public/icon.svg")), "brand icon exists", "medium");
check("identity:service-worker-cache", "flow", /weather-fashion-(shell|images)-v1/.test(serviceWorker), "service-worker cache namespace is brand-specific", "medium");

const productionFiles = [
  "index.html",
  "package.json",
  "package-lock.json",
  "public/manifest.webmanifest",
  "public/sw.js",
  "public/icon.svg",
  ...walk("src"),
];
const knowledgeFiles = [
  "SECURITY.md",
  "docs/knowledge/weather-fashion-development.md",
  "docs/strategy/weather-fashion-plan.md",
  "docs/qa/office-hours-debate-autoresearch.md",
];
for (const relativePath of knowledgeFiles) {
  check(
    `knowledge:file:${relativePath}`,
    "knowledge",
    existsSync(path.join(ROOT, relativePath)),
    `${relativePath} is present for durable project context`,
    "medium",
  );
}

const publicFiles = [
  ...productionFiles,
  ...knowledgeFiles,
  "README.md",
  "CONTRIBUTING.md",
];
const secretPattern = /(-----BEGIN (?:OPENSSH|RSA|EC|DSA|PRIVATE) KEY-----|AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|gh[pousr]_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{20,})/;
const secretFindings = publicFiles.filter((relativePath) => secretPattern.test(read(relativePath) || ""));
check(
  "security:public-knowledge-no-secrets",
  "trust",
  secretFindings.length === 0,
  secretFindings.length ? `credential-shaped value in ${secretFindings.join(", ")}` : "no credential-shaped values in public production or knowledge files",
  "high",
);

const knowledgeText = knowledgeFiles.map((relativePath) => read(relativePath) || "").join("\n");
check(
  "knowledge:lineage",
  "knowledge",
  /Lineage/.test(knowledgeText) && /WeatherFashion V2/.test(knowledgeText),
  "development lineage is recorded",
  "medium",
);
check(
  "knowledge:strategy",
  "knowledge",
  /Strategic thesis/.test(knowledgeText) && /reviewed personal archive/.test(knowledgeText),
  "strategy explains the reviewed closet-to-decision loop",
  "medium",
);
check(
  "knowledge:security-boundary",
  "trust",
  /Never commit/.test(read("SECURITY.md") || "") && /provider credentials/.test(read("SECURITY.md") || ""),
  "credential and private-data boundaries are documented",
  "high",
);
const residue = [];
for (const relativePath of productionFiles) {
  const contents = read(relativePath) || "";
  for (const term of ["Open Wardrobe", "open-wardrobe-shell", "open-wardrobe-edits", "tandpfun/wardrobe"]) {
    if (contents.includes(term)) residue.push(`${term} in ${relativePath}`);
  }
}
check("identity:no-source-residue", "trust", residue.length === 0, residue.length ? residue.join("; ") : "no upstream brand residue in production surfaces", "high");

const exposedKey = productionFiles.some((relativePath) => /OPENAI_API_KEY\s*[:=]\s*["']?sk-/i.test(read(relativePath) || ""));
check("security:no-client-api-key", "trust", !exposedKey, exposedKey ? "possible OpenAI secret in a production surface" : "no OpenAI secret pattern in production surfaces", "high");

check("uiux:root-mount", "uiux", /<div\s+id=["']root["']/.test(indexHtml), "React root mount exists", "high");
check("uiux:viewport", "uiux", /name=["']viewport["']/.test(indexHtml), "mobile viewport is declared", "medium");
check("uiux:description", "uiux", /name=["']description["']/.test(indexHtml), "page description is declared", "low");
check("flow:empty-state", "flow", /begin your archive/.test(read("src/App.jsx") || ""), "empty state gives a first action", "medium");
check("flow:reduced-motion", "theme", /prefers-reduced-motion/.test(read("src/styles.css") || "") && /prefers-reduced-motion/.test(read("src/import-flow.css") || ""), "reduced-motion behavior is present in both app surfaces", "low");

if (baseUrl) {
  for (const endpoint of ["/", "/manifest.webmanifest", "/icon.svg", "/api/import/config", "/api/import/wardrobe"]) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, { signal: AbortSignal.timeout(10000) });
      check(`live:${endpoint.slice(1).replaceAll("/", "-") || "home"}`, "trust", response.ok, `${endpoint} returned HTTP ${response.status}`, "high");
    } catch (error) {
      check(`live:${endpoint.slice(1).replaceAll("/", "-") || "home"}`, "trust", false, `${endpoint} probe failed: ${error.message}`, "high");
    }
  }
}

const blocking = findings.filter((finding) => !finding.ok && ["high", "medium"].includes(finding.severity));
const result = { pass: blocking.length === 0, failed: blocking, findings, baseUrl, strict };
if (jsonOnly) console.log(JSON.stringify(result));
else {
  console.log(`Weather Fashion autoresearch: ${result.pass ? "PASS" : "FAIL"}`);
  for (const finding of findings) console.log(`${finding.ok ? "PASS" : "FAIL"} [${finding.layer}] ${finding.id}: ${finding.detail}`);
}
if (strict && blocking.length) process.exitCode = 2;
