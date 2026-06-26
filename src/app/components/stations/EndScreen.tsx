import { useState } from "react";
import { motion } from "motion/react";
import { RefreshCw, Sparkles, AlertTriangle, Layers, BookOpen } from "lucide-react";
import { useRevealStep } from "../lib/useDeck";
import { policyIndicators, modernVariants } from "../data/theory";

const finalReveals = [
  ["Năng suất lao động tăng", "≠", "Tiền lương tăng tương ứng"],
  ["Mức lương thực tế tăng", "≠", "Lao động hưởng phần lớn hơn"],
  ["Vấn đề cốt lõi không phải:", "Có nên tăng năng suất hay không?"],
  ["Vấn đề cốt lõi là:", "AI LÀ NGƯỜI THỤ HƯỞNG TĂNG TRƯỞNG?"],
];

export function EndScreen({
  revealTick,
  resetTick,
  onReset,
}: {
  revealTick: number;
  resetTick: number;
  onReset: () => void;
}) {
  const step = useRevealStep(4, revealTick, resetTick);
  const [activeTab, setActiveTab] = useState<"policy" | "modern">("policy");

  return (
    <div className="relative h-full w-full px-12 py-6 flex flex-col justify-between overflow-hidden">
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(227, 162, 60, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b pb-4 mb-2" style={{ borderColor: "var(--grid-line)" }}>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--amber-signal)", fontWeight: 700 }}>
            TỔNG KẾT THÍ NGHIỆM
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--paper)", lineHeight: 1.1 }}>
            KẾT LUẬN & ĐỊNH HƯỚNG CHÍNH SÁCH
          </h1>
        </div>
        <button
          onClick={onReset}
          className="svl-press focus-amber flex items-center gap-2 px-4 py-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--ink)",
            background: "var(--amber-signal)",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          <RefreshCw size={14} /> CHẠY LẠI (R)
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid h-full grid-cols-12 gap-8 items-center min-h-0 flex-1 relative z-10">
        {/* Left Side: 4 Triết lý luận điểm (Reveal từng phần) */}
        <div className="col-span-6 flex flex-col justify-center gap-5">
          <motion.div
            initial={false}
            animate={{ opacity: step >= 0 ? 1 : 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700 }}
            className="flex items-center gap-2"
          >
            <Sparkles size={14} />
            PHẦN A: LUẬN ĐIỂM TRIẾT LÕI (Space để reveal)
          </motion.div>

          <div className="space-y-4">
            {finalReveals.map((block, i) => {
              const isAccent = i === 3;
              const isVisible = step >= i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0.08, x: -8 }}
                  transition={{ duration: 0.4 }}
                  className="pl-4"
                  style={{
                    borderLeft: `2.5px solid ${isAccent ? "var(--amber-signal)" : "var(--grid-line)"}`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {block.map((line, j) => {
                      const isSymbol = line === "≠";
                      const isHighlight = isAccent && j === 1;

                      return (
                        <span
                          key={j}
                          style={{
                            fontFamily: isSymbol ? "var(--font-mono)" : "var(--font-display)",
                            fontWeight: 800,
                            fontSize: isSymbol ? 30 : isHighlight ? 26 : 22,
                            color: isSymbol ? "var(--amber-signal)" : isHighlight ? "var(--amber-signal)" : "var(--paper)",
                            textShadow: isSymbol ? "0 0 12px rgba(227, 162, 60, 0.5)" : isHighlight ? "0 0 8px rgba(227, 162, 60, 0.3)" : "none",
                          }}
                        >
                          {line}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: step >= 3 ? 0.8 : 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-[13px] border-t pt-4"
            style={{ borderColor: "var(--grid-line)", fontFamily: "var(--font-body)", color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.5 }}
          >
            Nếu tăng năng suất chỉ làm lợi cho giới chủ tư bản, sự bất bình đẳng xã hội sẽ ngày càng trầm trọng. Đây chính là gốc rễ của các cuộc khủng hoảng phân phối trong kinh tế hiện đại.
          </motion.div>
        </div>

        {/* Right Side: Tabs (10 Chỉ báo chính sách / 6 hình thức hiện đại) */}
        <div className="col-span-6 flex flex-col h-full justify-center max-h-[82vh]">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-3.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <button
              onClick={() => setActiveTab("policy")}
              className="svl-press flex items-center gap-2 px-4 py-2 border rounded transition-all duration-200"
              style={{
                cursor: "pointer",
                background: activeTab === "policy" ? "var(--ink)" : "transparent",
                borderColor: activeTab === "policy" ? "var(--amber-signal)" : "var(--grid-line)",
                color: activeTab === "policy" ? "var(--amber-signal)" : "var(--paper)",
                fontWeight: activeTab === "policy" ? 700 : 500,
              }}
            >
              <Layers size={14} /> 10 CHỈ BÁO CHÍNH SÁCH
            </button>
            <button
              onClick={() => setActiveTab("modern")}
              className="svl-press flex items-center gap-2 px-4 py-2 border rounded transition-all duration-200"
              style={{
                cursor: "pointer",
                background: activeTab === "modern" ? "var(--ink)" : "transparent",
                borderColor: activeTab === "modern" ? "var(--amber-signal)" : "var(--grid-line)",
                color: activeTab === "modern" ? "var(--amber-signal)" : "var(--paper)",
                fontWeight: activeTab === "modern" ? 700 : 500,
              }}
            >
              <AlertTriangle size={14} /> 6 HÌNH THỨC HIỆN ĐẠI (3.1.3)
            </button>
          </div>

          {/* Tab content area with scrollbar if needed */}
          <div className="flex-1 overflow-y-auto pr-1 select-none">
            {activeTab === "policy" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-2.5"
              >
                {policyIndicators.map((p, idx) => (
                  <div
                    key={p.id}
                    className="card-industrial p-3 relative overflow-hidden"
                    style={{
                      background: "color-mix(in srgb, var(--paper) 3%, var(--ink))",
                      border: "1px solid var(--grid-line)",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: "rgba(227, 162, 60, 0.15)", color: "var(--amber-signal)", fontFamily: "var(--font-mono)" }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, color: "var(--paper)" }}>
                      {p.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 60%, transparent)", lineHeight: 1.3, marginTop: 3 }}>
                      {p.meaning}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "modern" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-2.5"
              >
                {modernVariants.map((v, idx) => (
                  <div
                    key={v.id}
                    className="card-industrial p-3 relative overflow-hidden"
                    style={{
                      background: "color-mix(in srgb, var(--paper) 3%, var(--ink))",
                      border: "1px solid var(--grid-line)",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: "rgba(235, 94, 85, 0.15)", color: "var(--surplus-red)", fontFamily: "var(--font-mono)" }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, color: "var(--paper)", marginBottom: 4 }}>
                      {v.form}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber-signal)", lineHeight: 1.3 }}>
                      → {v.link}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
