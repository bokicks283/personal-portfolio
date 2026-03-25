# src/shared/lib/overlayScrollbar.ts

## Purpose
Utility module with framework-agnostic or low-level logic shared by hooks/components.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 237 lines

## Imports Explained
- None.

## Public API (Exports)
- `export type OverlaySBOptions = {`
- `export type OverlaySBController = { update(): void; destroy(): void; };`
- `export function createOverlayScrollbar(host: Host, opt: OverlaySBOptions = {}): OverlaySBController {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- DOM mutation observation for dynamic UI synchronization.
- Layout observation with ResizeObserver.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.
- MutationObserver with subtree can be expensive on large DOM trees; keep callbacks lightweight.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [MDN MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver)
- [MDN ResizeObserver](https://developer.mozilla.org/docs/Web/API/ResizeObserver)
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
