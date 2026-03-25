# Stack Alignment Audit (March 2026)

Date executed: 2026-03-24 (America/New_York)

## What Was Checked

- Runtime and package versions.
- Build/lint/typecheck health.
- Alignment with current React, Vite, Tailwind, and Node docs.

## Version Updates Applied

Updated to current compatible targets:

- `react` -> `^19.2.4`
- `react-dom` -> `^19.2.4`
- `react-router-dom` -> `^7.13.2`
- `vite` -> `^8.0.2`
- `@vitejs/plugin-react` -> `^6.0.1`
- `tailwindcss` -> `^4.2.2`
- `@tailwindcss/vite` -> `^4.2.2`
- `@tailwindcss/postcss` -> `^4.2.2`
- typings and lint ecosystem packages updated to latest compatible releases

Added:

- `package.json` `engines.node: >=20.19.0` (matches Vite 8 Node requirement)
- `overrides.flatted: ^3.4.2` to resolve a transitive audit issue

## Why Some Major Versions Were Not Adopted

- `typescript` stayed on `5.9.x` because `typescript-eslint@8.x` supports `<6.0.0`.
- ESLint stayed on `9.x` instead of forcing `10.x` to prioritize stability while still being current and supported.

Remaining `npm outdated` major deltas after this pass:

- `eslint` / `@eslint/js` 9 -> 10
- `eslint-plugin-react-hooks` 5 -> 7
- `eslint-plugin-react-refresh` 0.4 -> 0.5
- `globals` 16 -> 17
- `@types/node` 24 -> 25
- `typescript` 5.9 -> 6.0

These were intentionally deferred because they are non-trivial ecosystem jumps and not required for React 19 + Vite 8 + Tailwind 4 correctness in this repo right now.

## Validation Results

Executed after updates:

- `npm install` -> success, 0 vulnerabilities
- `npm run lint` -> pass
- `npm run build` -> pass (`tsc -b` + Vite production build)

## Architecture Bugfixes Included In This Pass

- Fixed `ScrollSnapProvider` to use the same context instance exported by `ScrollSnapHelper` (prevents context mismatch bugs).
- Refactored theme consumption:
  - `ThemeToggle` now uses `useTheme()` instead of local duplicated theme state.
  - `PageNav` now reads theme from context instead of a DOM `MutationObserver`.

## Upstream References

- Vite guide: https://vite.dev/guide/
- Vite config (`resolve.alias`): https://vite.dev/config/shared-options.html#resolve-alias
- Tailwind with Vite: https://tailwindcss.com/docs/installation/using-vite
- Tailwind theme (`@theme`): https://tailwindcss.com/docs/theme
- Tailwind custom styles (`@layer`, `@utility`): https://tailwindcss.com/docs/adding-custom-styles
- React docs home: https://react.dev/
- React Context: https://react.dev/learn/passing-data-deeply-with-context
- Node release lines/LTS: https://nodejs.org/en/about/previous-releases
