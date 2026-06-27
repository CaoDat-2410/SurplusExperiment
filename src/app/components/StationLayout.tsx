import { ReactNode } from "react";

interface StationLayoutProps {
  stationCode: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function StationLayout({ stationCode, title, subtitle, children }: StationLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col px-4 md:px-8 lg:px-16 pb-4 md:pb-6 pt-6 md:pt-10">
      <header className="mb-4 md:mb-5 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 border-b pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          {stationCode}
        </span>
        <h1 className="text-[28px] md:text-[54px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1, color: "var(--paper)" }}>
          {title}
        </h1>
        {subtitle && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
            {subtitle}
          </span>
        )}
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
