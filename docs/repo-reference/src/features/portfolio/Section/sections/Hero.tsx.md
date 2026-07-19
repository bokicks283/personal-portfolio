# src/features/portfolio/Section/sections/Hero.tsx

## Purpose
Portfolio feature module: page sections, navigation, and feature-specific composition logic.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Feature layer (domain/page-specific UI and behavior)
- Approximate length: 79 lines

## Imports Explained
- `import { useEffect, useRef } from "react";`
- `import TypedText, { type TypedTextHandle } from "@/shared/components/TypedText";`

## Public API (Exports)
- `export default function Hero() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional chaining (obj?.x) to avoid runtime errors on null/undefined.

## Design Patterns In This File
- Effect pattern with useEffect for side-effects, subscriptions, and cleanup.
- Viewport observation pattern with IntersectionObserver.
- Feature-based modularization: code grouped by domain/use-case instead of file type only.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.

## Learning Links (Official Docs)
- [Feature-Sliced Design overview](https://fsd.how/docs/get-started/overview/)
- [MDN IntersectionObserver](https://developer.mozilla.org/docs/Web/API/IntersectionObserver)
- [React docs home](https://react.dev/)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
