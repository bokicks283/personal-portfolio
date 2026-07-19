# src/shared/components/ParticleBackground/ParticleBackground.tsx

## Purpose
Reusable UI component intended to be consumed by multiple features.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 138 lines

## Imports Explained
- `import { useEffect, useMemo, useState, type JSX } from "react";`
- `import Particles, { initParticlesEngine } from "@tsparticles/react";`
- `import { loadSlim } from "@tsparticles/slim";`
- `import type { IOptions, RecursivePartial } from "@tsparticles/engine";`
- `import { getCssVarColor } from "@/shared/lib";`

## Public API (Exports)
- `export default ParticleBackground;`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.
- Uses nullish coalescing (a ?? b) for fallback defaults only when values are nullish.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Local UI state with useState.
- Effect pattern with useEffect for side-effects, subscriptions, and cleanup.
- Memoization with useMemo to avoid unnecessary recalculation.
- DOM mutation observation for dynamic UI synchronization.
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [MDN MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver)
- [React docs home](https://react.dev/)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [React useMemo](https://react.dev/reference/react/useMemo)
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
