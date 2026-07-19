# src/shared/lib/performanceMetrics.ts

## Purpose
Utility module with framework-agnostic or low-level logic shared by hooks/components.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 160 lines

## Imports Explained
- `import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";`

## Public API (Exports)
- `export type PerfMetric = {`
- `export function reportCustomMetric(`
- `export function initPerformanceTracking() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.
- Uses localStorage; wrap in try/catch when writing and guard in non-browser contexts.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
