interface BottomNavProps {
  stations: { code: string; short: string }[];
  current: number;
  onNavigate: (index: number) => void;
}

export function BottomNav({ stations, current, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex w-full items-stretch border-t overflow-x-auto" style={{ borderColor: "var(--grid-line)", background: "color-mix(in srgb, var(--paper) 4%, var(--ink))" }}>
      {stations.map((s, i) => {
        const active = i === current;
        return (
          <button
            key={s.code}
            onClick={() => onNavigate(i)}
            className="svl-press focus-amber flex min-w-[78px] sm:min-w-[96px] items-center justify-center gap-1 sm:gap-2 border-r py-2 sm:py-3 px-2 sm:px-3 shrink-0"
            style={{ borderColor: "var(--grid-line)", background: active ? "var(--amber-signal)" : "transparent", cursor: "pointer" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.8vw, 12px)", letterSpacing: "0.06em", color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 70%, transparent)" }}>
              {s.code}
            </span>
            <span className="hidden md:inline" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(11px, 1.8vw, 12px)", color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
              {s.short}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
