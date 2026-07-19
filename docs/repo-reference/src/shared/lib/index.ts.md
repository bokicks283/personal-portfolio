# src/shared/lib/index.ts

## Purpose
Utility module with framework-agnostic or low-level logic shared by hooks/components.

## File Snapshot
- Kind: Barrel export module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 5 lines

## Imports Explained
- None.

## Public API (Exports)
- `export * from "./getCssVarColor";`
- `export * from "./overlayScrollbar";`
- `export * from "./performanceMetrics";`
- `export * from "./scrollDir";`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module export syntax to expose a public API from this file.

## Design Patterns In This File
- Barrel export pattern: this file re-exports modules to simplify imports.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
