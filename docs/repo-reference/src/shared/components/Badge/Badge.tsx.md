# src/shared/components/Badge/Badge.tsx

## Purpose
Reusable UI component intended to be consumed by multiple features.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 60 lines

## Imports Explained
- `import React from "react";`

## Public API (Exports)
- `export default function Badge({ text, className, descriptionText, type, animation }: BadgeProps) {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Uses nullish coalescing (a ?? b) for fallback defaults only when values are nullish.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

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
