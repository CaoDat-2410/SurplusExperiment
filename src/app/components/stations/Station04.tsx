import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StationLayout } from "../StationLayout";
import { useRevealStep } from "../lib/useDeck";
import { Odometer } from "../effects/Odometer";
import { policyIndicators, modernVariants } from "../data/theory";
import { theoryContent } from "../data/theoryContent";

const reveals = [
  ["Giá trị cá biệt hàng hóa", "<", "Giá trị thị trường hàng hóa"],
  ["Năng suất cá biệt tăng vượt trội", "→", "Đạt giá trị thặng dư siêu ngạch"],
  ["Hình thái mang tính chất tạm thời", "nhưng", "Cạnh tranh công nghệ là phổ biến"],
  ["AI Y sinh (Insilico Medicine):", "Rút ngắn 3-6 năm còn 18 tháng!"],
];

function MethodCards() {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-industrial overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="svl-press focus-amber flex w-full items-center justify-between px-4 py-3"
        style={{ cursor: "pointer" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--amber-signal)" }}>
          CÁC HÌNH THỨC HIỆN ĐẠI — 3.1.3
        </span>
        {open ? <ChevronUp size={16} style={{ color: "var(--amber-signal)" }} /> : <ChevronDown size={16} style={{ color: "var(--amber-signal)" }} />}
      </button>
      {open && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: "var(--grid-line)" }}>
          <div className="grid grid-cols-3 gap-2">
            {modernVariants.map((v) => (
              <div
                key={v.id}
                className="p-3"
                style={{ background: "color-mix(in srgb, var(--paper) 5%, var(--ink))", border: "1px solid var(--grid-line)", borderRadius: 4 }}
              >
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--paper)", marginBottom: 4 }}>
                  {v.form}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber-signal)", lineHeight: 1.45 }}>
                  → {v.link}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Station04({ revealTick, resetTick }: { revealTick: number; resetTick: number }) {
  const step = useRevealStep(4, revealTick, resetTick);
  const extraSection = theoryContent.find((s) => s.type === "extra")!;

  return (
    <StationLayout stationCode="TRẠM 04" title={extraSection.title} subtitle="Space để reveal từng luận điểm → bảng chỉ báo">
      <div className="grid h-full grid-cols-12 gap-6">
        {/* left: reveals + method cards */}
        <div className="col-span-7 flex flex-col justify-center gap-5">
          {reveals.map((block, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0.1, x: step >= i ? 0 : -12 }}
              transition={{ duration: 0.3, ease: "linear" }}
            >
              {block.map((line, j) => {
                const isConnector = line === "<" || line === "→" || line === "nhưng";
                
                // Custom rendering for the Insilico Medicine metrics with Odometer
                if (i === 3 && j === 1) {
                  return (
                    <div
                      key={j}
                      className="flex items-baseline gap-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: 32,
                        lineHeight: 1.05,
                        color: "var(--amber-signal)",
                      }}
                    >
                      <span>Rút ngắn </span>
                      <Odometer value={3} decimals={0} />
                      <span>-</span>
                      <Odometer value={6} decimals={0} />
                      <span> năm còn </span>
                      <Odometer value={18} decimals={0} />
                      <span> tháng!</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={j}
                    style={{
                      fontFamily: isConnector ? "var(--font-mono)" : "var(--font-display)",
                      fontWeight: 800,
                      fontSize: isConnector ? 28 : i === 3 && j === 0 ? 30 : 30,
                      lineHeight: 1.05,
                      color:
                        isConnector
                          ? "var(--surplus-red)"
                          : i === 3 && j === 0
                            ? "var(--paper)"
                            : "var(--paper)",
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </motion.div>
          ))}

          <motion.div
            initial={false}
            animate={{ opacity: step >= 4 ? 1 : 0.1 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <MethodCards />
          </motion.div>
        </div>

        {/* right: policy dashboard */}
        <motion.div
          className="col-span-5"
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0.1 }}
          transition={{ duration: 0.3, ease: "linear" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10 }}>
            10 CHỈ BÁO CHÍNH SÁCH
          </div>
          <div className="grid grid-cols-2 gap-2">
            {policyIndicators.map((p) => (
              <div key={p.id} className="card-industrial p-3">
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--paper)" }}>{p.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 60%, transparent)", lineHeight: 1.35 }}>{p.meaning}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </StationLayout>
  );
}
