# src/app/providers/ScrollSnapProvider/ScrollSnapHelper.ts

## Purpose
Provider-level module responsible for global cross-cutting concerns (theme, scroll behavior, shared context).

## File Snapshot
- Kind: TypeScript module
- Architecture layer: App layer (bootstrap, global providers, global styles)
- Approximate length: 10 lines

## Imports Explained
- `import { createContext, useContext } from "react";`

## Public API (Exports)
- `export type Ctx = { activeIndex: number; snapTo: (i: number) => void };`
- `export const ScrollSnapCtx = createContext<Ctx | null>(null);`
- `export function useScrollSnapContext() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Uses union types (A | B) to constrain values to safe, explicit options.

## Design Patterns In This File
- Provider/Context pattern for cross-tree state sharing without prop drilling.
- Provider composition at app boundary: global services are injected near the root.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [React Context guide](https://react.dev/learn/passing-data-deeply-with-context)
- [React createContext](https://react.dev/reference/react/createContext)
- [React docs home](https://react.dev/)
- [React useContext](https://react.dev/reference/react/useContext)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
