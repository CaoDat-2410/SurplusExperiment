import { AlertTriangle, Bot, User } from "lucide-react";

interface FactoryBlueprintProps {
  automationLevel: number; // 0–100
}

// Blueprint factory: low-skill workers fade & get warning as automation rises;
// high-skill workers brighten; robots appear. Reflects the cited Vietnam case.
export function FactoryBlueprint({ automationLevel }: FactoryBlueprintProps) {
  const a = automationLevel / 100;
  const lowSkillOpacity = 1 - a * 0.75;
  const highSkillOpacity = 0.45 + a * 0.55;
  const robotCount = Math.round(a * 8);
  const lowSkillWarning = a > 0.6;

  const label =
    automationLevel < 25
      ? "Mô hình thâm dụng lao động"
      : automationLevel < 75
        ? "Chuyển đổi công nghệ"
        : "Giá trị thặng dư tương đối qua tự động hóa";

  return (
    <div className="card-industrial relative h-full p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3.2vw, 14px)", color: "var(--paper)" }}>SƠ ĐỒ NHÀ MÁY</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3.1vw, 14px)", color: "var(--amber-signal)" }}>{label}</span>
      </div>

      <div className="grid min-h-[calc(100%-3rem)] grid-cols-3 gap-3 sm:gap-4">
        {/* low skill */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.7vw, 13px)", color: "var(--necessary-teal)", marginBottom: 8 }}>
            LAO ĐỘNG KỸ NĂNG THẤP
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5" style={{ opacity: lowSkillOpacity, transition: "opacity 150ms linear" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center"
                style={{
                  background: "color-mix(in srgb, var(--necessary-teal) 30%, var(--ink))",
                  border: lowSkillWarning ? "1px solid var(--surplus-red)" : "1px solid var(--grid-line)",
                  borderRadius: 2,
                }}
              >
                <User size={18} className="sm:size-5" style={{ color: "var(--paper)" }} />
              </div>
            ))}
          </div>
          {lowSkillWarning && (
            <div className="mt-2 flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.6vw, 13px)", color: "var(--surplus-red)" }}>
              <AlertTriangle size={13} /> Rủi ro mất việc / phi chính thức
            </div>
          )}
        </div>

        {/* high skill */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.7vw, 13px)", color: "var(--amber-signal)", marginBottom: 8 }}>
            LAO ĐỘNG KỸ NĂNG CAO
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5" style={{ opacity: highSkillOpacity, transition: "opacity 150ms linear" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--amber-signal) 35%, var(--ink))", border: "1px solid var(--amber-signal)", borderRadius: 2 }}
              >
                <User size={18} className="sm:size-5" style={{ color: "var(--paper)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* robots */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 2.7vw, 13px)", color: "var(--paper)", marginBottom: 8 }}>ROBOT</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center"
                style={{
                  background: "color-mix(in srgb, var(--paper) 8%, var(--ink))",
                  border: "1px solid var(--grid-line)",
                  borderRadius: 2,
                  opacity: i < robotCount ? 1 : 0.12,
                  transition: "opacity 150ms linear",
                }}
              >
                <Bot size={18} className="sm:size-5" style={{ color: i < robotCount ? "var(--amber-signal)" : "var(--grid-line)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
