import { Mechanism, mechanismLabels } from "./lib/calculations";

export function MechanismBadge({ mechanism }: { mechanism: Mechanism }) {
  const isActive = mechanism !== "baseline";
  const danger = mechanism === "wage-pressure";
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(12px, 3vw, 14px)",
        letterSpacing: "0.06em",
        padding: "10px 14px",
        borderRadius: 4,
        width: "fit-content",
        maxWidth: "100%",
        color: isActive ? "var(--ink)" : "color-mix(in srgb, var(--paper) 70%, transparent)",
        background: isActive ? (danger ? "var(--surplus-red)" : "var(--amber-signal)") : "transparent",
        border: isActive ? "none" : "1px solid var(--grid-line)",
      }}
    >
      <span style={{ opacity: 0.75 }}>CƠ CHẾ ĐANG KÍCH HOẠT · </span>
      {mechanismLabels[mechanism].toUpperCase()}
    </div>
  );
}
