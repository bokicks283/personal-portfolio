# Providers and Context Pattern

## What a Provider Is

A Provider wraps part of your React tree and supplies shared state/services through Context.

In this repo:

- `ThemeProvider` supplies current theme + setter.
- `ScrollSnapProvider` supplies active section index + `snapTo` action.

Core docs:

- Context guide: https://react.dev/learn/passing-data-deeply-with-context
- `createContext`: https://react.dev/reference/react/createContext
- `useContext`: https://react.dev/reference/react/useContext

## Why Use Providers Here

These concerns are cross-cutting:

- Theme affects many components.
- Scroll snap state is needed by navigation and section behavior.

Prop drilling these values through every intermediate component would increase coupling and boilerplate.

## Design Rules Used

### 1) Define context + hook together

`ScrollSnapHelper.ts` and `ThemeHelpers.ts` define:

- Context object.
- Typed context value.
- Guarded hook (`useTheme`, `useScrollSnapContext`) that throws if provider is missing.

This gives fast failure in development and better TypeScript hints.

### 2) Keep providers thin

Provider components should mainly:

- Build value from hooks/state.
- Pass value to `<Context.Provider>`.
- Render children.

Heavy logic should live in hooks/util modules.

### 3) One context instance per concern

Provider and consuming hook must share the exact same context object instance.

If two files accidentally create separate contexts, consumers will read `null` even when “inside a provider”.

## Typical New-Provider Checklist

1. Create `XHelpers.ts`:
   - Define `XContextValue` type.
   - Create context.
   - Export guarded `useXContext()` hook.
2. Create `XProvider.tsx`:
   - Build value.
   - Provide it with `XContext.Provider`.
3. Re-export from `src/app/providers/index.ts`.
4. Wrap app/feature root where needed.
5. Add tests (or at least runtime smoke check) for missing-provider error and expected value flow.

## When *Not* To Use Context

Avoid Context for state that:

- Is local to one component branch.
- Changes at very high frequency and would cause broad re-renders.

Prefer local state or specialized state tools in those cases.

## Related Docs

- React state fundamentals: https://react.dev/learn/state-a-components-memory
- React reducing unnecessary effects: https://react.dev/learn/you-might-not-need-an-effect
