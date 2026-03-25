# Project Organization

## Goal

The structure is optimized for:

- Faster onboarding (you can find code by business area quickly).
- Safer refactors (clear dependency boundaries).
- Reuse without accidental coupling.

Current structure:

```text
src/
  app/
  features/
  shared/
  content/
  assets/
  main.tsx
```

## Layer Responsibilities

### `src/main.tsx`

- Single entrypoint.
- Mounts React into `#root`.
- Imports global styles once.

Docs:

- React `createRoot`: https://react.dev/reference/react-dom/client/createRoot
- React `StrictMode`: https://react.dev/reference/react/StrictMode

### `src/app/`

- App-level wiring only.
- Global providers (theme, scroll-snap context).
- App shell component and global CSS.

Think of `app` as the assembly layer, not feature implementation.

### `src/features/`

- Business/page features.
- In this repo: `features/portfolio/*` owns your portfolio page behavior and section composition.

Feature files may import from `shared`, but `shared` must not import from `features`.

### `src/shared/`

- Reusable building blocks:
  - `components/` generic UI.
  - `hooks/` reusable logic.
  - `lib/` low-level utilities.

This keeps generic logic from being locked inside one feature.

### `src/content/`

- Typed data model/content (`profile.ts`) separated from rendering.
- Lets you change copy/content without editing UI logic.

### `src/assets/`

- Static assets (SVG logos, etc.).

## Dependency Rule (Important)

Use this directional rule:

```text
app -> features -> shared
```

- `app` can depend on `features` and `shared`.
- `features` can depend on `shared`.
- `shared` should not depend on `features` or `app`.

This is the key to avoiding circular dependencies and accidental coupling.

## Why This Is “Modern”

React itself does not enforce folder structure. Modern teams generally adopt domain-oriented structures so code scales by feature instead of file type.

References:

- React docs (project organization is intentionally flexible): https://react.dev/learn
- Feature-Sliced Design overview: https://fsd.how/docs/get-started/overview/

## Tradeoffs

Pros:

- Easier to scale.
- Better separation of concerns.
- Cleaner imports and ownership.

Cons:

- Slightly more folders up front.
- Requires discipline with import boundaries.

For a learning project and employer-facing portfolio, this tradeoff is worth it because it demonstrates architectural thinking, not just component authoring.
