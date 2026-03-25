# src/content/profile.ts

## Purpose
Typed content/data source separated from rendering logic.

## File Snapshot
- Kind: TypeScript module
- Architecture layer: Content/model layer (typed content objects)
- Approximate length: 116 lines

## Imports Explained
- None.

## Public API (Exports)
- `export type SocialLink = {`
- `export type Project = {`
- `export type Role = {`
- `export type Profile = {`
- `export const profile: Profile = {`

## Syntax Walkthrough (Beginner Friendly)
- Uses ES module export syntax to expose a public API from this file.
- Uses union types (A | B) to constrain values to safe, explicit options.
- Uses optional properties (prop?:) so callers can omit non-required values.

## Design Patterns In This File
- No special architectural pattern detected; this file is mainly declarative/supporting content.

## Runtime Notes and Editing Risks
- Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.

## Learning Links (Official Docs)
- [React docs home](https://react.dev/)
- [TypeScript docs home](https://www.typescriptlang.org/docs/)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
