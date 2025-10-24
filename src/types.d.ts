export type BenchTimings = {
  tStart: number | null;
  tFirst: number | null;
  tEnd: number | null;
  totalChars: number;
};

export type BenchEntry = {
  fpsLive: () => number;
  renderCount: number;
  getTimings: () => BenchTimings;
};

// __bench is a dictionary where most keys are BenchEntry, but we also allow
// a special 'renders' record (string -> number). Use a union in the index
// value so both shapes are accepted.
export type BenchStore = Record<string, BenchEntry | Record<string, number> | undefined>;

export interface BenchWindow extends Window {
  __bench?: BenchStore;
}
