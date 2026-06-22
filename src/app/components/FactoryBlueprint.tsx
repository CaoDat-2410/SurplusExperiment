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
    <div className="card-industrial relative h-full p-5">
      <div className="mb-3 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--paper)" }}>SƠ ĐỒ NHÀ MÁY</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)" }}>{label}</span>
      </div>

      <div className="grid h-[calc(100%-2rem)] grid-cols-3 gap-4">
        {/* low skill */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--necessary-teal)", marginBottom: 6 }}>
            LAO ĐỘNG KỸ NĂNG THẤP
          </div>
          <div className="grid grid-cols-4 gap-2" style={{ opacity: lowSkillOpacity, transition: "opacity 150ms linear" }}>
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
                <User size={14} style={{ color: "var(--paper)" }} />
              </div>
            ))}
          </div>
          {lowSkillWarning && (
            <div className="mt-2 flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--surplus-red)" }}>
              <AlertTriangle size={13} /> Rủi ro mất việc / phi chính thức
            </div>
          )}
        </div>

        {/* high skill */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber-signal)", marginBottom: 6 }}>
            LAO ĐỘNG KỸ NĂNG CAO
          </div>
          <div className="grid grid-cols-4 gap-2" style={{ opacity: highSkillOpacity, transition: "opacity 150ms linear" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--amber-signal) 35%, var(--ink))", border: "1px solid var(--amber-signal)", borderRadius: 2 }}
              >
                <User size={14} style={{ color: "var(--paper)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* robots */}
        <div className="flex flex-col">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--paper)", marginBottom: 6 }}>ROBOT</div>
          <div className="grid grid-cols-4 gap-2">
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
                <Bot size={14} style={{ color: i < robotCount ? "var(--amber-signal)" : "var(--grid-line)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
