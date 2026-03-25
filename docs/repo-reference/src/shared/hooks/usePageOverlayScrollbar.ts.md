# src/shared/hooks/usePageOverlayScrollbar.ts

## Purpose
Reusable custom hook encapsulating browser or UI behavior behind a stable API.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 41 lines

## Imports Explained
- `import { useEffect } from "react";`
- `import { createOverlayScrollbar, type OverlaySBOptions } from "@/shared/lib/overlayScrollbar";`

## Public API (Exports)
- `export function usePageOverlayScrollbar(opts?: OverlaySBOptions) {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Uses optional chaining (obj?.x) to avoid runtime errors on null/undefined.

## Design Patterns In This File
- Effect pattern with useEffect for side-effects, subscriptions, and cleanup.
- Custom Hook abstraction (use...) to package reusable stateful behavior.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [React custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React docs home](https://react.dev/)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
