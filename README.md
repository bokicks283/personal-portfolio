# Personal Portfolio

React + TypeScript + Tailwind CSS portfolio built with Vite.

## Stack

- React 19
- TypeScript 5
- Tailwind CSS 4
- Vite 8

## Project Layout

```text
src/
  app/
    App.tsx
    styles.css
    providers/
  features/
    portfolio/
      MainPage/
      PageNav/
      Section/
        sections/
  shared/
    components/
      Badge/
      DropDown/
      ParticleBackground/
      ScrollArea/
      ThemeToggle/
      TypedText/
    hooks/
    lib/
  assets/
  content/
  main.tsx
```

## Why This Structure

- `app/`: app bootstrap concerns (root app component, global styles, providers).
- `features/`: page/domain-specific UI and composition (`portfolio`).
- `shared/`: reusable, feature-agnostic components/hooks/libs.
- `content/`: structured data/content used by the UI.

## Path Aliases

- `@/` points to `src/`.
- Configured in:
  - `tsconfig.json`
  - `vite.config.ts`

## Scripts

```bash
npm run dev
npm run dev:host
npm run typecheck
npm run lint
npm run build
npm run perf:bundle
npm run preview
```

## Documentation

- [Docs index](./docs/README.md)
- [Architecture docs](./docs/architecture/README.md)
- [Tooling alignment report](./docs/tooling/stack-alignment-2026-03.md)
- [Performance docs](./docs/performance/README.md)
- [Generated file-by-file reference](./docs/repo-reference/README.md)
