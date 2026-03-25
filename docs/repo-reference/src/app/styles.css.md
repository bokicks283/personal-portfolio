# src/app/styles.css

## Purpose
Global Tailwind + CSS token/theme definitions and reusable utility/component classes.

## File Snapshot
- Kind: Global stylesheet (Tailwind + custom CSS)
- Architecture layer: App layer (bootstrap, global providers, global styles)
- Approximate length: 1019 lines

## Imports Explained
- None.

## Public API (Exports)
- None.

## Syntax Walkthrough (Beginner Friendly)
- No notable language-specific syntax patterns detected beyond standard file content.

## Design Patterns In This File
- No special architectural pattern detected; this file is mainly declarative/supporting content.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [Tailwind custom styles (@layer, @utility)](https://tailwindcss.com/docs/adding-custom-styles)
- [Tailwind theme variables (@theme)](https://tailwindcss.com/docs/theme)
- [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
