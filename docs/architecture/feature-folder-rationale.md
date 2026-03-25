# Why the `features/` Folder Exists

## Short Answer

`features/` groups code by *use case* (what the user does) instead of only by technical type (`components`, `hooks`, etc.).

That means portfolio-specific UI and behavior live together instead of being scattered across many global folders.

## Example in This Repo

`src/features/portfolio/` contains:

- `MainPage/`: root composition for the portfolio page.
- `PageNav/`: navigation specific to this feature.
- `Section/`: section wrapper + portfolio section implementations.

Without a feature folder, these files would be spread across top-level `components` and `hooks`, which gets harder to navigate as the app grows.

## Why Employers Care

This structure communicates:

- You can design boundaries, not just write components.
- You can scale a codebase beyond “toy app” patterns.
- You can reason about coupling and ownership.

## How It Relates to `shared/`

Rule of thumb:

- Put code in `features/` if it is specific to one business feature.
- Put code in `shared/` only if it is truly reusable across multiple features.

Examples from this repo:

- `ThemeToggle` in `shared/components` is reusable.
- `Portfolio` section implementations stay in `features/portfolio`.

## When To Move Code Between `features` and `shared`

Move from `features` to `shared` when:

- At least two features need it.
- It no longer contains portfolio-specific assumptions.
- The API can be generic.

Keep in `features` when:

- It references feature-specific IDs, routes, or content contracts.
- Generalizing it would add complexity with no practical reuse.

## Reference Models

- Feature-Sliced Design concepts: https://fsd.how/docs/get-started/overview/
- React docs (composition and reuse): https://react.dev/learn/thinking-in-react
- React custom hooks (reuse logic safely): https://react.dev/learn/reusing-logic-with-custom-hooks
