# Performance Workflow

This project now tracks performance in two places:

## 1) Runtime Metrics (in browser)

Collected automatically on app load:

- `CLS`
- `INP`
- `LCP`
- `FCP`
- `TTFB`
- custom `APP_FIRST_FRAME_MS`
- custom `LONG_TASK_MS` (when supported)

Where metrics go:

- Console logs in dev mode (`[perf] ...`)
- Local storage key: `portfolio:perf:metrics`
- Optional endpoint if `VITE_PERF_ENDPOINT` is set

Debug in browser console:

```js
window.__portfolioPerf?.metrics
```

## 2) Bundle Metrics (build output)

Run:

```powershell
npm run perf:bundle
```

This runs a production build, prints asset sizes, and writes:

- `docs/performance/latest-bundle-metrics.json`

Use this file to compare size changes between commits.

Latest detailed pass report:

- [Performance Pass 2026-03-25 (Visual Priority)](./performance-pass-2026-03-25-visual-priority.md)
- [Performance Pass 2026-03-25](./performance-pass-2026-03-25.md)
