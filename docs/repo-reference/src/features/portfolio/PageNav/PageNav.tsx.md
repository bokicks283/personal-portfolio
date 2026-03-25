# src/features/portfolio/PageNav/PageNav.tsx

## Purpose
Portfolio feature module: page sections, navigation, and feature-specific composition logic.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Feature layer (domain/page-specific UI and behavior)
- Approximate length: 82 lines

## Imports Explained
- `import { useMemo } from "react";`
- `import RBLogoDark from "@/assets/RBLogo.svg";`
- `import RBLogo from "@/assets/RBLogoInverted.svg";`
- `import { useTheme } from "@/app/providers";`
- `import ThemeToggle from "@/shared/components/ThemeToggle";`
- `import { useActiveSection } from "@/shared/hooks";`

## Public API (Exports)
- `export default function PageNav({ sections }: Props) {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Defines TypeScript type aliases to model data and function contracts.
- Uses nullish coalescing (a ?? b) for fallback defaults only when values are nullish.

## Design Patterns In This File
- Memoization with useMemo to avoid unnecessary recalculation.
- Feature-based modularization: code grouped by domain/use-case instead of file type only.

## Runtime Notes and Editing Risks
- This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.

## Learning Links (Official Docs)
- [Feature-Sliced Design overview](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [React useMemo](https://react.dev/reference/react/useMemo)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
