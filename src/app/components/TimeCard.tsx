import { Odometer } from "./effects/Odometer";

interface TimeCardProps {
  totalHours: number;
  necessaryHours: number;
  surplusHours: number;
  rate: number;
}

// SIGNATURE ELEMENT — factory punch card. Bar splits teal (t₁) / red (t₂)
// with an amber needle at the divide; large mono gauge reads s/v.
export function TimeCard({ totalHours, necessaryHours, surplusHours, rate }: TimeCardProps) {
  const necessaryPct = totalHours > 0 ? (necessaryHours / totalHours) * 100 : 0;

  return (
    <div className="w-full" style={{ background: "var(--paper)", borderRadius: 4, border: "1px solid var(--grid-line)" }}>
      {/* punched holes */}
      <div
        className="h-4 w-full"
        style={{
          backgroundColor: "var(--paper)",
          backgroundImage: "radial-gradient(circle, var(--ink) 0 3px, transparent 3.5px)",
          backgroundSize: "20px 100%",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
      />
      <div className="px-4 pb-5 pt-2 sm:px-6 sm:pb-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.8vw, 12px)", letterSpacing: "0.08em", color: "var(--grid-line)" }}>
              THẺ CHẤM CÔNG · s/v = t₂/t₁ × 100%
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px, 13vw, 60px)", lineHeight: 1, color: "var(--ink)" }}>
              s/v = <Odometer value={rate} decimals={1} suffix="%" />
            </div>
          </div>
          <div className="text-left sm:text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
            <div style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "var(--grid-line)" }}>NGÀY LĐ (t)</div>
            <div style={{ fontSize: "clamp(26px, 7vw, 30px)" }}>
              <Odometer value={totalHours} decimals={1} suffix=" h" />
            </div>
          </div>
        </div>

        <div className="relative h-24 w-full overflow-hidden sm:h-16" style={{ border: "1px solid var(--grid-line)", borderRadius: 4 }}>
          <div
            className="absolute inset-y-0 left-0 flex items-center px-3"
            style={{ width: `${necessaryPct}%`, background: "var(--necessary-teal)", transition: "width 150ms linear" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--paper)", whiteSpace: "nowrap" }}>
              t₁ cần thiết · {necessaryHours.toFixed(2)}h
            </span>
          </div>
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end px-3"
            style={{ width: `${100 - necessaryPct}%`, background: "var(--surplus-red)", transition: "width 150ms linear" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--paper)", whiteSpace: "nowrap" }}>
              t₂ thặng dư · {surplusHours.toFixed(2)}h
            </span>
          </div>
          <div
            className="absolute inset-y-0"
            style={{ left: `${necessaryPct}%`, width: 3, background: "var(--amber-signal)", transform: "translateX(-50%)", transition: "left 150ms linear", boxShadow: "0 0 0 1px var(--ink)" }}
          />
        </div>
      </div>
    </div>
  );
}
