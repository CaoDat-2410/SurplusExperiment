interface BottomNavProps {
  stations: { code: string; short: string }[];
  current: number;
  onNavigate: (index: number) => void;
}

export function BottomNav({ stations, current, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex w-full items-stretch border-t" style={{ borderColor: "var(--grid-line)", background: "color-mix(in srgb, var(--paper) 4%, var(--ink))" }}>
      {stations.map((s, i) => {
        const active = i === current;
        return (
          <button
            key={s.code}
            onClick={() => onNavigate(i)}
            className="svl-press focus-amber flex flex-1 min-w-0 items-center justify-center gap-1 sm:gap-2 border-r py-2 sm:py-3 px-1 sm:px-2"
            style={{ borderColor: "var(--grid-line)", background: active ? "var(--amber-signal)" : "transparent", cursor: "pointer" }}
          >
            <span style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "clamp(10px, 1.8vw, 13px)", 
              fontWeight: active ? 800 : 400,
              letterSpacing: "0.02em", 
              color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 70%, transparent)", 
              whiteSpace: "nowrap" 
            }}>
              {i + 1}
            </span>
            <span className="hidden lg:inline" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(10px, 1.6vw, 11px)", color: active ? "var(--ink)" : "color-mix(in srgb, var(--paper) 55%, transparent)", whiteSpace: "nowrap" }}>
              {s.short}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
