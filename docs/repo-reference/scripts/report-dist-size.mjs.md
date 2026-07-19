# scripts/report-dist-size.mjs

## Purpose
Project file supporting app runtime, tooling, or documentation.

## File Snapshot
- Kind: Repository file
- Architecture layer: Automation/tooling scripts
- Approximate length: 38 lines

## Imports Explained
- `import { readdirSync, statSync, writeFileSync } from "node:fs";`
- `import { join, resolve } from "node:path";`

## Public API (Exports)
- None.

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.

## Design Patterns In This File
- No special architectural pattern detected; this file is mainly declarative/supporting content.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
