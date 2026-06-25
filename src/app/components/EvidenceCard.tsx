import { ReactNode } from "react";
import { CiteBadge } from "./SourceDrawer";

interface EvidenceCardProps {
  eyebrow: string;
  title?: string;
  sourceId?: string;   // citation id, e.g. "ilo-labour-share"
  sourceMarker?: string; // e.g. "[1]"
  onOpenSource?: (id: string) => void;
  color?: "red" | "teal" | "amber" | "paper";
  children: ReactNode;
  className?: string;
}

const colorMap: Record<string, string> = {
  red: "var(--surplus-red)",
  teal: "var(--necessary-teal)",
  amber: "var(--amber-signal)",
  paper: "var(--paper)",
};

export function EvidenceCard({
  eyebrow,
  title,
  sourceId,
  sourceMarker,
  onOpenSource,
  color = "paper",
  children,
  className = "",
}: EvidenceCardProps) {
  return (
    <div className={"card-industrial flex h-full min-h-[160px] flex-col p-4 sm:min-h-[180px] lg:min-h-0 " + className}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3vw, 14px)", letterSpacing: "0.06em", color: colorMap[color] }}>
          {eyebrow}
        </span>
        {sourceId && sourceMarker && onOpenSource && (
          <CiteBadge id={sourceId} marker={sourceMarker} onOpen={onOpenSource} />
        )}
      </div>
      {title && (
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(14px, 3.4vw, 16px)", color: "var(--paper)", marginBottom: 8 }}>
          {title}
        </div>
      )}
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
