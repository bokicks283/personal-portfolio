# Performance Pass (2026-03-25, Visual Priority)

## Goal for this pass

Prioritize visual identity and animation feel:

- restore full logo usage
- increase particle density and speed
- keep snap scrolling and animations smooth (no visible FPS drops)

Bundle size was intentionally deprioritized in this pass.

## Changes made

1. Restored logo-based navigation visuals in `PageNav` (theme-aware logo image swap).
2. Restored logo favicon in `index.html`.
3. Increased particle workload in `ParticleBackground`:
   - higher particle count
   - higher movement speed
   - larger link distance and stronger opacity
4. Kept reduced-motion handling for accessibility.
5. Added snap-scroll runtime profiling + smoother state updates in `useScrollSnap`:
   - `requestAnimationFrame` throttled `scroll` updates
   - only update active section state when index actually changes
   - scoped/queued DOM mutation re-collection work
   - new runtime metrics during snapping:
     - `SNAP_FPS_EST`
     - `SNAP_FRAME_DROPS`
     - `SNAP_COOLDOWN_MS`

## Re-evaluation

Validation commands:

- `npm run lint` -> pass
- `npm run build` -> pass

Bundle report (expected larger due restored logos):

- emitted assets total: `2553.22 KB`
- JS: `index-*.js` `370.71 KB`

This increase is expected and accepted for this visual-priority pass.

## How to verify runtime smoothness now

Use dev mode and inspect runtime metrics while interacting with snap scroll:

```js
window.__portfolioPerf?.metrics
```

Useful filters:

```js
window.__portfolioPerf?.metrics?.filter(m => m.name.includes("SNAP"))
window.__portfolioPerf?.metrics?.filter(m => ["INP", "LCP", "LONG_TASK_MS"].includes(m.name))
```

Interpretation:

- `SNAP_FPS_EST` should stay near display refresh behavior for smooth feel.
- `SNAP_FRAME_DROPS` should remain low per snap.
- `LONG_TASK_MS` spikes should be infrequent during scroll/snap interactions.

## Next adjustment levers (if drops are observed)

1. Reduce only particle **speed** first (keep count).
2. Then reduce links distance/opacity before dropping count.
3. Finally lower count by device profile tiers if needed.
