import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import ScrollArea from "../ScrollArea";

export type Option = { value: string; label: string };
export type Group = { label: string; options: Option[] };

type BaseProps = {
  value: string;
  onChange: (v: string) => void;

  /** Trigger min width (rem). Default 11 */
  minWidthRem?: number;
  /** Menu max height before scroll. Accepts number (rem) or any CSS length string. Default 16 (rem). */
  maxMenuHeight?: number | string;

  placeholder?: string;
  className?: string;

  /** Trigger composition */
  insideLabel?: ReactNode;
  separator?: ReactNode;
  showSelectedValue?: boolean;
  chevronIcon?: ReactNode;
};

type FlatProps = BaseProps & { options: Option[]; groups?: never };
type GroupedProps = BaseProps & { groups: Group[]; options?: never };

export type DropdownProps = FlatProps | GroupedProps;

export default function Dropdown(props: DropdownProps) {
  const {
    value,
    onChange,
    minWidthRem,
    maxMenuHeight,
    insideLabel,
    separator,
    showSelectedValue = false,
    chevronIcon,
    placeholder = "Select",
    className = "",
  } = props;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [menuW, setMenuW] = useState<number>(224);

  const currentLabel = useMemo(() => {
    const find = (opts: Option[]) => opts.find(o => o.value === value)?.label;
    if ("options" in props && props.options) return find(props.options) ?? placeholder;
    if ("groups" in props && props.groups) {
      for (const g of props.groups) { const m = find(g.options); if (m) return m; }
      return placeholder;
    }
    return placeholder;
  }, [props, value, placeholder]);

  // outside click + Esc
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // keep menu width equal to trigger
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const update = () => setMenuW(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const baseBtn =
    "inline-flex items-center gap-2 rounded-lg border border-[color:var(--ring)] " +
    "bg-[var(--surface)] px-3 py-2 text-sm text-[var(--fg)] " +
    "hover:ring-2 hover:ring-[color:var(--ring)] transition min-w-0";

  // normalize height: number => rem string
  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={`${baseBtn} ${className}`}
        style={{ minWidth: `${minWidthRem}rem` }}
      >
        {insideLabel && <span className="text-[var(--muted)]">{insideLabel}</span>}
        {separator !== undefined ? <span aria-hidden="true">{separator}</span> : null}
        {showSelectedValue && (
          <span className="truncate text-[var(--muted)]">{currentLabel}</span>
        )}
        <span className="ml-auto pl-1 text-[var(--muted)]">
          {chevronIcon ?? (
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
            </svg>
          )}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 rounded-xl border border-[color:var(--ring)]
          bg-[var(--surface)] shadow-xl"
          style={{ width: menuW }}
        >
          <ScrollArea
            maxHeight={typeof maxMenuHeight === "number" ? `${maxMenuHeight}rem` : (maxMenuHeight ?? "16rem")}
            className="rounded-xl"
            pulseOnMount
            sb={{
              thicknessPx: 4,     // thinner for menus
              thumbMinPx: 24,     // shorter thumb
              thumbRightPx: 2,
              railRightPx: 0,
              railInsetTopPx: 4,
              railInsetBottomPx: 4,
              hideAfterMs: 600,   // fade faster in menus
            }}
          >
            <ul
              role="listbox"
              tabIndex={-1}
              className="overflow-visible"
            >
              {"groups" in props && props.groups
                ? props.groups.map((g) => (
                  <li key={g.label} className="border-b last:border-b-0 border-[color:var(--ring)]/30">
                    <div className="px-3 py-2 text-xs uppercase tracking-wide text-[var(--muted)]/80">
                      {g.label}
                    </div>
                    <ul>
                      {g.options.map(opt => (
                        <li key={opt.value}>
                          <button
                            role="option"
                            aria-selected={opt.value === value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={[
                              "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors",
                              "hover:bg-[var(--accent)] hover:text-[var(--bg)]",
                              opt.value === value ? "bg-[color:var(--ring)]/20 text-[var(--fg)]" : "text-[var(--fg)]"
                            ].join(" ")}
                          >
                            <span>{opt.label}</span>
                            {opt.value === value && (
                              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.3a1 1 0 0 1-1.423.011L3.29 9.965a1 1 0 1 1 1.42-1.407l3.01 3.036 6.542-6.59a1 1 0 0 1 1.442-.013z" />
                              </svg>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
                : (props as FlatProps).options!.map((opt) => (
                  <li key={opt.value}>
                    <button
                      role="option"
                      aria-selected={opt.value === value}
                      onClick={() => { onChange(opt.value); setOpen(false); }}
                      className={[
                        "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors",
                        "hover:bg-[var(--accent)] hover:text-[var(--bg)]",
                        opt.value === value ? "bg-[color:var(--ring)]/20 text-[var(--fg)]" : "text-[var(--fg)]"
                      ].join(" ")}
                    >
                      <span>{opt.label}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
