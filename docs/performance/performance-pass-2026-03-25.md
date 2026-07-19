# Performance Pass (2026-03-25)

## Baseline (before this pass)

`npm run build` output:

- JS bundle: `401.84 kB` (`120.74 kB` gzip)
- CSS bundle: `44.04 kB` (`8.62 kB` gzip)
- Static SVG assets in output:
  - `RBLogo.svg` `1,095.23 kB`
  - `RBLogoInverted.svg` `1,095.58 kB`

## Changes Applied

1. Removed heavy nav logo image imports from `PageNav` and replaced with text initials badge.
2. Switched favicon from heavy source asset path to lightweight `/vite.svg`.
3. Replaced `tsparticles` full loader with slim loader (`@tsparticles/slim`).
4. Deferred particle background loading using `React.lazy` + `requestIdleCallback`/timeout fallback.
5. Reduced particle simulation workload:
   - fewer particles
   - lower movement speed
   - reduced-motion handling
6. Optimized `TypedText` animation loop:
   - binary search for visible character count
   - skip state updates when counts do not change
7. Added runtime metrics tracking:
   - web-vitals (`CLS`, `INP`, `LCP`, `FCP`, `TTFB`)
   - custom metrics (`APP_FIRST_FRAME_MS`, `LONG_TASK_MS`)
8. Added repeatable bundle metrics script and JSON output.

## Result (after this pass)

`npm run perf:bundle` output:

- Initial JS bundle (`index-*.js`): `237.25 kB` (`76.08 kB` gzip)
- CSS bundle: `44.15 kB` (`8.63 kB` gzip)
- Deferred chunk (`ParticleBackground-*.js`): `145.69 kB` (`41.42 kB` gzip)
- Total `dist/assets` size: `417.09 kB`

## Improvement Summary

- Initial JS reduced by ~`164.59 kB` (about `40.96%`).
- Removed >`2.19 MB` of heavy SVG assets from build output.
- Total emitted assets reduced from ~`2.63 MB` to ~`0.42 MB` (about `84%` reduction).

## Next Recommended Steps

1. Record runtime metric snapshots from `window.__portfolioPerf.metrics` before/after each future perf change.
2. Consider replacing `tsparticles` with a lighter custom canvas effect if further JS reduction is needed.
3. Audit large CSS utility blocks for unused rules if CSS size becomes a priority.
