import { ReactNode } from "react";

interface StationLayoutProps {
  stationCode: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function StationLayout({ stationCode, title, subtitle, children }: StationLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col px-16 pb-6 pt-10">
      <header className="mb-5 flex items-baseline gap-4 border-b pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          {stationCode}
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 54, lineHeight: 1, color: "var(--paper)" }}>
          {title}
        </h1>
        {subtitle && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
            {subtitle}
          </span>
        )}
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
