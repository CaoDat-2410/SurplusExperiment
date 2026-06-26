interface BottomNavProps {
  stations: { code: string; short: string }[];
  current: number;
  onNavigate: (index: number) => void;
}

// Fixed bottom conveyor bar.
export function BottomNav({ stations, current, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex w-full items-stretch border-t" style={{ borderColor: "var(--grid-line)", background: "color-mix(in srgb, var(--paper) 4%, var(--ink))" }}>
      {stations.map((s, i) => {
        const active = i === current;
        return (
          <button
            key={s.code}
            onClick={() => onNavigate(i)}
            className="svl-press focus-amber flex flex-1 items-center justify-center gap-1 border-r py-3 px-1"
            style={{ borderColor: "var(--grid-line)", background: active ? "var(--amber-signal)" : "transparent", cursor: "pointer" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 70%, transparent)" }}>
              {s.code}
            </span>
            <span className="hidden sm:inline" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
              {s.short}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
