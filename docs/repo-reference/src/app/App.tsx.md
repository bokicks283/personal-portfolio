# src/app/App.tsx

## Purpose
Top-level app composition component that selects the feature root to render.

## File Snapshot
- Kind: React component module (TypeScript + JSX)
- Architecture layer: App layer (bootstrap, global providers, global styles)
- Approximate length: 6 lines

## Imports Explained
- `import MainPage from "@/features/portfolio/MainPage";`

## Public API (Exports)
- `export default function App() {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.

## Design Patterns In This File
- No special architectural pattern detected; this file is mainly declarative/supporting content.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
