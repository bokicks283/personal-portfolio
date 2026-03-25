# eslint.config.js

## Purpose
Project file supporting app runtime, tooling, or documentation.

## File Snapshot
- Kind: ESLint configuration
- Architecture layer: Tooling/configuration
- Approximate length: 24 lines

## Imports Explained
- `import js from '@eslint/js'`
- `import globals from 'globals'`
- `import reactHooks from 'eslint-plugin-react-hooks'`
- `import reactRefresh from 'eslint-plugin-react-refresh'`
- `import tseslint from 'typescript-eslint'`
- `import { defineConfig, globalIgnores } from 'eslint/config'`

## Public API (Exports)
- `export default defineConfig([`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module import syntax (import ... from ...) to declare dependencies.
- Uses ES module export syntax to expose a public API from this file.

## Design Patterns In This File
- No special architectural pattern detected; this file is mainly declarative/supporting content.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
