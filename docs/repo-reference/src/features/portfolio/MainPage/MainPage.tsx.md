# src/features/portfolio/MainPage/MainPage.tsx

## Purpose
Portfolio feature module: page sections, navigation, and feature-specific composition logic.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: Feature layer (domain/page-specific UI and behavior)
- Approximate length: 53 lines

## Imports Explained
- `import ThemeProvider, { ScrollSnapProvider } from "@/app/providers";`
- `import PageNav from "@/features/portfolio/PageNav";`
- `import Section from "@/features/portfolio/Section";`
- `import About from "@/features/portfolio/Section/sections/About";`
- `import Contact from "@/features/portfolio/Section/sections/Contact";`
- `import Experience from "@/features/portfolio/Section/sections/Experience";`
- `import Hero from "@/features/portfolio/Section/sections/Hero";`
- `import Projects from "@/features/portfolio/Section/sections/Projects";`
- `import Skills from "@/features/portfolio/Section/sections/Skills";`
- `import ParticleBackground from "@/shared/components/ParticleBackground";`
- `import { usePageOverlayScrollbar, useSnapBoundOffsets } from "@/shared/hooks";`

## Public API (Exports)
- `export default function MainPage() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.
- Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.

## Design Patterns In This File
- Feature-based modularization: code grouped by domain/use-case instead of file type only.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Feature-Sliced Design overview](https://fsd.how/docs/get-started/overview/)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
