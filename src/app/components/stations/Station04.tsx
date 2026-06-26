import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StationLayout } from "../StationLayout";
import { useRevealStep } from "../lib/useDeck";
import { Odometer } from "../effects/Odometer";
import { policyIndicators, modernVariants } from "../data/theory";
import { theoryContent } from "../data/theoryContent";

const classicalReveals = [
  ["Giá trị cá biệt hàng hóa", "<", "Giá trị thị trường hàng hóa"],
  ["Năng suất cá biệt tăng vượt trội", "→", "Đạt giá trị thặng dư siêu ngạch"],
  ["Hình thái mang tính chất tạm thời", "nhưng", "Cạnh tranh công nghệ là phổ biến"],
];

function MethodCards() {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-industrial overflow-hidden mt-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="svl-press focus-amber flex w-full items-center justify-between px-5 py-4"
        style={{ cursor: "pointer" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700 }}>
          CÁC HÌNH THỨC HIỆN ĐẠI — 3.1.3
        </span>
        {open ? <ChevronUp size={18} style={{ color: "var(--amber-signal)" }} /> : <ChevronDown size={18} style={{ color: "var(--amber-signal)" }} />}
      </button>
      {open && (
        <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "var(--grid-line)" }}>
          <div className="grid grid-cols-3 gap-3">
            {modernVariants.map((v) => (
              <div
                key={v.id}
                className="p-4"
                style={{ background: "color-mix(in srgb, var(--paper) 5%, var(--ink))", border: "1px solid var(--grid-line)", borderRadius: 4 }}
              >
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--paper)", marginBottom: 4 }}>
                  {v.form}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", lineHeight: 1.45 }}>
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
        <div className="col-span-7 flex flex-col justify-center gap-4">
          {/* Label for Section A */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 0 ? 1 : 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700 }}
          >
            PHẦN A: LÝ THUYẾT CỐT LÕI
          </motion.div>

          {/* Classical Reveals */}
          {classicalReveals.map((block, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0.1, x: step >= i ? 0 : -12 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="pl-4"
              style={{ borderLeft: "2px solid var(--grid-line)" }}
            >
              {block.map((line, j) => {
                const isConnector = line === "<" || line === "→" || line === "nhưng";
                return (
                  <div
                    key={j}
                    style={{
                      fontFamily: isConnector ? "var(--font-mono)" : "var(--font-display)",
                      fontWeight: 800,
                      fontSize: isConnector ? 28 : 28,
                      lineHeight: 1.1,
                      color: isConnector ? "var(--surplus-red)" : "var(--paper)",
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </motion.div>
          ))}

          {/* Label for Section B */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 3 ? 1 : 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700, marginTop: 8 }}
          >
            PHẦN B: THỰC TIỄN 2024-2026
          </motion.div>

          {/* Insilico Medicine Case Study Card */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 3 ? 1 : 0.1, x: step >= 3 ? 0 : -12 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="pl-4 p-6 card-industrial"
            style={{ borderLeft: "4px solid var(--surplus-red)", background: "color-mix(in srgb, var(--ink) 40%, transparent)" }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grid-line)", fontWeight: 700, marginBottom: 8 }}>
              INSILICO MEDICINE
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, color: "var(--amber-signal)", lineHeight: 1.1 }}>
              Rút ngắn <Odometer value={3} decimals={0} />-<Odometer value={6} decimals={0} /> năm còn <Odometer value={18} decimals={0} suffix=" tháng!" />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--paper)", marginTop: 8, lineHeight: 1.45 }}>
              Ứng dụng AI giúp rút ngắn chu kỳ R&D Y sinh học thay vì 3-6 năm như quy trình tiêu chuẩn, mang lại thặng dư siêu ngạch vượt trội trước khi công nghệ được phổ biến xã hội.
            </p>
          </motion.div>

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
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10, fontWeight: 700 }}>
            10 CHỈ BÁO CHÍNH SÁCH
          </div>
          <div className="grid grid-cols-2 gap-3">
            {policyIndicators.map((p) => (
              <div key={p.id} className="card-industrial p-4">
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--paper)" }}>{p.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "color-mix(in srgb, var(--paper) 60%, transparent)", lineHeight: 1.35, marginTop: 4 }}>{p.meaning}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </StationLayout>
  );
}
