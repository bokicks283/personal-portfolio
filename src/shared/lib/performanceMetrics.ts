import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

const STORAGE_KEY = "portfolio:perf:metrics";
const MAX_STORED = 120;

export type PerfMetric = {
  name: string;
  value: number;
  id: string;
  rating?: string;
  delta?: number;
  navigationType?: string;
  timestamp: number;
  path: string;
  extra?: Record<string, unknown>;
};

type PerfDebugApi = {
  metrics: PerfMetric[];
  clear: () => void;
};

declare global {
  interface Window {
    __portfolioPerf?: PerfDebugApi;
  }
}

function getPath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

function toPayload(metric: Metric): PerfMetric {
  return {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    path: getPath(),
  };
}

function readStored(): PerfMetric[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as PerfMetric[]) : [];
  } catch {
    return [];
  }
}

function writeStored(next: PerfMetric[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(-MAX_STORED)));
  } catch {
    // best-effort only
  }
}

function ensureDebugApi() {
  if (typeof window === "undefined") return;
  if (window.__portfolioPerf) return;
  window.__portfolioPerf = {
    metrics: readStored(),
    clear: () => {
      writeStored([]);
      if (window.__portfolioPerf) window.__portfolioPerf.metrics = [];
    },
  };
}

function sendToEndpoint(metric: PerfMetric) {
  const endpoint = import.meta.env.VITE_PERF_ENDPOINT as string | undefined;
  if (!endpoint || typeof window === "undefined") return;

  const body = JSON.stringify(metric);
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
    keepalive: true,
  }).catch(() => {
    // best-effort only
  });
}

function emitMetric(metric: PerfMetric) {
  ensureDebugApi();

  const next = [...readStored(), metric].slice(-MAX_STORED);
  writeStored(next);
  if (window.__portfolioPerf) window.__portfolioPerf.metrics = next;

  window.dispatchEvent(new CustomEvent("portfolio:perf-metric", { detail: metric }));

  if (import.meta.env.DEV) {
    const rounded = Math.round(metric.value * 100) / 100;
    console.info(`[perf] ${metric.name}: ${rounded}`, metric);
  }

  sendToEndpoint(metric);
}

export function reportCustomMetric(
  name: string,
  value: number,
  extra?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  emitMetric({
    name,
    value,
    id: `${name}-${Date.now()}`,
    timestamp: Date.now(),
    path: getPath(),
    extra,
  });
}

function observeLongTasks() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  try {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        reportCustomMetric("LONG_TASK_MS", entry.duration, { entryType: entry.entryType });
      }
    });
    observer.observe({ type: "longtask", buffered: true } as PerformanceObserverInit);
  } catch {
    // unsupported browser
  }
}

export function initPerformanceTracking() {
  if (typeof window === "undefined") return;
  ensureDebugApi();

  onCLS((metric) => emitMetric(toPayload(metric)));
  onINP((metric) => emitMetric(toPayload(metric)));
  onLCP((metric) => emitMetric(toPayload(metric)));
  onFCP((metric) => emitMetric(toPayload(metric)));
  onTTFB((metric) => emitMetric(toPayload(metric)));

  observeLongTasks();
}
