# src/shared/hooks/useSnapBoundOffsets.ts

## Purpose
Reusable custom hook encapsulating browser or UI behavior behind a stable API.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 101 lines

## Imports Explained
- `import { useEffect } from "react";`

## Public API (Exports)
- `export function useSnapBoundOffsets(selector: string = ".snap-container--y") {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional chaining (obj?.x) to avoid runtime errors on null/undefined.
- Uses nullish coalescing (a ?? b) for fallback defaults only when values are nullish.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Effect pattern with useEffect for side-effects, subscriptions, and cleanup.
- DOM mutation observation for dynamic UI synchronization.
- Layout observation with ResizeObserver.
- Custom Hook abstraction (use...) to package reusable stateful behavior.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [MDN MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver)
- [MDN ResizeObserver](https://developer.mozilla.org/docs/Web/API/ResizeObserver)
- [React custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React docs home](https://react.dev/)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
