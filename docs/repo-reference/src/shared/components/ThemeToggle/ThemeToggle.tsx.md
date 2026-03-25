# src/shared/components/ThemeToggle/ThemeToggle.tsx

## Purpose
Reusable UI component intended to be consumed by multiple features.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Shared layer (reusable components, hooks, libraries)
- Approximate length: 84 lines

## Imports Explained
- `import Dropdown, { type Group } from "../DropDown";`
- `import { useTheme, type ThemeName } from "@/app/providers";`

## Public API (Exports)
- `export default function ThemeToggle() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Shared module boundary for reusable, feature-agnostic code.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design layers](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
