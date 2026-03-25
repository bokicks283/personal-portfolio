# src/features/portfolio/Section/sections/Skills.tsx

## Purpose
Portfolio feature module: page sections, navigation, and feature-specific composition logic.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Feature layer (domain/page-specific UI and behavior)
- Approximate length: 34 lines

## Imports Explained
- `import Badge from "@/shared/components/Badge";`

## Public API (Exports)
- `export default function Skills() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.

## Design Patterns In This File
- Feature-based modularization: code grouped by domain/use-case instead of file type only.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design overview](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
