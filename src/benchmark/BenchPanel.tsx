import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRenderCounter } from "./useRenderCounter";
import { useFpsLite } from "./useFpsLite";
import type { TypedTextHandle, TypedTextProps } from "../components/TypedText";
import type { BenchEntry, BenchWindow } from "../types";

type BenchPanelProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<React.ComponentProps<"div"> & any>; // TypedText-like
  typedProps: Omit<TypedTextProps, "lines"> & { lines: TypedTextProps["lines"] };
};

export default function BenchPanel({ title, Component, typedProps }: BenchPanelProps) {
  const rc = useRenderCounter(`Panel:${title}`);
  const fps = useFpsLite();
  const ref = useRef<TypedTextHandle>(null);

  // timings
  const [tStart, setTStart] = useState<number | null>(null);
  const [tFirst, setTFirst] = useState<number | null>(null);
  const [tEnd, setTEnd] = useState<number | null>(null);

  // derive total chars
  const totalChars = useMemo(() => {
    const lines = typedProps.lines ?? [];
    return lines.reduce((acc, line) => {
      const text = line.text ?? (line.segments?.map(s => s.text).join("") ?? "");
      return acc + Array.from(text).length;
    }, 0);
  }, [typedProps.lines]);

  useEffect(() => {
    setTStart(performance.now());
    setTFirst(null);
    setTEnd(null);
  }, [title]);

  // these hooks assume your TypedText calls onComplete at the end (RAF version does)
  const onComplete = () => {
    if (!tEnd) setTEnd(performance.now());
  };

  // crude tap-in: expose helper to console
  useEffect(() => {
    const bw: BenchWindow = window as BenchWindow;
    bw.__bench ??= { renders: {} as Record<string, number> };
    bw.__bench[title] = {
      fpsLive: () => fps,
      renderCount: rc,
      getTimings: () => ({ tStart, tFirst, tEnd, totalChars }),
    } as BenchEntry;
  }, [title, fps, rc, tStart, tFirst, tEnd, totalChars]);

  // We detect "first char" by listening once to a manual start() and then
  // letting you click Start below to kick both panels at similar times.

  return (
    <div className="rounded-2xl border border-neutral-800/70 p-4 bg-[var(--panel,#111214)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-neutral-400">
          FPS ~ {fps} • Renders: {rc}
        </div>
      </div>

      <div className="mt-3 text-wrap">
        <Component
          ref={ref}
          {...typedProps}
          onComplete={() => onComplete()}
          // tap into first char by starting with autoplay=false and clicking Start;
          // or if autoplay is true, we accept a small skew between panels.
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="rounded-md px-3 py-1 ring-1 ring-neutral-700 hover:ring-neutral-500"
          onClick={() => {
            setTStart(performance.now());
            setTFirst(null);
            setTEnd(null);
            ref.current?.start();
            // mark first paint on next frame
            requestAnimationFrame(() => {
              if (!tFirst) setTFirst(performance.now());
            });
          }}
        >Start</button>
        <button
          className="rounded-md px-3 py-1 ring-1 ring-neutral-700 hover:ring-neutral-500"
          onClick={() => ref.current?.reset()}
        >Reset</button>
      </div>

      <div className="mt-3 text-sm text-neutral-300 space-y-1">
        <div>Chars: {totalChars}</div>
        <div>tStart: {tStart?.toFixed(1) ?? "-"} ms</div>
        <div>tFirst (approx): {tFirst ? (tFirst - (tStart ?? tFirst)).toFixed(1) : "-"} ms</div>
        <div>tEnd (onComplete): {tEnd ? (tEnd - (tStart ?? tEnd)).toFixed(1) : "-"} ms</div>
      </div>
    </div>
  );
}
