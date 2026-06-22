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
}: EvidenceCardProps) {
  return (
    <div className="card-industrial flex h-full flex-col p-4">
      <div className="mb-1 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: colorMap[color] }}>
          {eyebrow}
        </span>
        {sourceId && sourceMarker && onOpenSource && (
          <CiteBadge id={sourceId} marker={sourceMarker} onOpen={onOpenSource} />
        )}
      </div>
      {title && (
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--paper)", marginBottom: 6 }}>
          {title}
        </div>
      )}
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
