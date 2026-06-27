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
      <div className="px-8 pb-8 pt-3">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.08em", color: "var(--grid-line)" }}>
              THẺ CHẤM CÔNG · s/v = t₂/t₁ × 100%
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 72, lineHeight: 1, color: "var(--ink)" }}>
              s/v = <Odometer value={rate} decimals={1} suffix="%" />
            </div>
          </div>
          <div className="text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
            <div style={{ fontSize: 14, color: "var(--grid-line)" }}>NGÀY LĐ (t)</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>
              <Odometer value={totalHours} decimals={1} suffix=" h" />
            </div>
          </div>
        </div>

        <div className="relative h-20 w-full overflow-hidden" style={{ border: "1px solid var(--grid-line)", borderRadius: 4 }}>
          <div
            className="absolute inset-y-0 left-0 flex items-center px-4"
            style={{ width: `${necessaryPct}%`, background: "var(--necessary-teal)", transition: "width 150ms linear" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "var(--paper)", whiteSpace: "nowrap" }}>
              t₁ cần thiết · {necessaryHours.toFixed(2)}h
            </span>
          </div>
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end px-4"
            style={{ width: `${100 - necessaryPct}%`, background: "var(--surplus-red)", transition: "width 150ms linear" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "var(--paper)", whiteSpace: "nowrap" }}>
              t₂ thặng dư · {surplusHours.toFixed(2)}h
            </span>
          </div>
          <div
            className="absolute inset-y-0"
            style={{ left: `${necessaryPct}%`, width: 4, background: "var(--amber-signal)", transform: "translateX(-50%)", transition: "left 150ms linear", boxShadow: "0 0 0 1px var(--ink)" }}
          />
        </div>
      </div>
    </div>
  );
}
