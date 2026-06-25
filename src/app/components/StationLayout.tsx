import { ReactNode } from "react";

interface StationLayoutProps {
  stationCode: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function StationLayout({ stationCode, title, subtitle, children }: StationLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-4 sm:pb-6 pt-6 sm:pt-8 lg:pt-10">
      <header className="mb-3 sm:mb-4 lg:mb-5 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 lg:gap-4 border-b pb-2 sm:pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.4vw, 14px)", letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          {stationCode}
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px, 5vw, 44px)", lineHeight: 1, color: "var(--paper)" }}>
          {title}
        </h1>
        {subtitle && (
          <span className="hidden sm:inline" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px, 1.4vw, 14px)", color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
            {subtitle}
          </span>
        )}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
