# src/shared/hooks/useReveal.ts

## Purpose
Reusable custom hook encapsulating browser or UI behavior behind a stable API.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 68 lines

## Imports Explained
- `import { useEffect, useRef, useState } from "react";`
- `import { ensureScrollDirInstalled, getScrollDir } from "@/shared/lib/scrollDir";`

## Public API (Exports)
- `export function useReveal({`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Uses optional chaining (obj?.x) to avoid runtime errors on null/undefined.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Local UI state with useState.
- Effect pattern with useEffect for side-effects, subscriptions, and cleanup.
- Mutable refs with useRef for DOM handles and non-reactive values.
- Viewport observation pattern with IntersectionObserver.
- Custom Hook abstraction (use...) to package reusable stateful behavior.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [MDN IntersectionObserver](https://developer.mozilla.org/docs/Web/API/IntersectionObserver)
- [React custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React docs home](https://react.dev/)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [React useRef](https://react.dev/reference/react/useRef)
- [React useState](https://react.dev/reference/react/useState)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
