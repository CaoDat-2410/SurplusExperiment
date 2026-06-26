import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp, Zap } from "lucide-react";
import { StationLayout } from "../StationLayout";
import { useRevealStep } from "../lib/useDeck";
import { modernVariants } from "../data/theory";

const reveals = [
  { lines: ["Năng suất tăng", "≠", "Lương tăng tương ứng"], accent: false },
  { lines: ["Lương tăng", "≠", "Lao động hưởng phần lớn hơn"], accent: false },
  { lines: ["Vấn đề không phải:", "Có nên tăng năng suất hay không?"], accent: false },
  { lines: ["Vấn đề là:", "AI NHẬN PHẦN TĂNG TRƯỞNG?"], accent: true },
];

function MethodCards() {
  const [open, setOpen] = useState(false);

  return (
    <div className="method-cards-wrapper">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="svl-press focus-amber flex w-full items-center justify-between px-3 sm:px-4 lg:px-5 py-3 sm:py-4 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
        style={{
          background: open
            ? "linear-gradient(90deg, rgba(227, 162, 60, 0.18) 0%, rgba(236, 227, 211, 0.1) 100%)"
            : "linear-gradient(90deg, rgba(227, 162, 60, 0.08) 0%, rgba(236, 227, 211, 0.04) 100%)",
          border: "1px solid var(--amber-signal)",
          borderRadius: 6,
          boxShadow: open ? "0 0 25px rgba(227, 162, 60, 0.25), inset 0 0 30px rgba(227, 162, 60, 0.08)" : "none",
        }}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <motion.div animate={{ rotate: open ? 360 : 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <Zap size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
          </motion.div>
          <span className="min-w-0 text-left" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.4vw, 13px)", letterSpacing: "0.08em", color: "var(--amber-signal)" }}>
            CÁC HÌNH THỨC HIỆN ĐẠI — 3.1.3
          </span>
        </div>
        <motion.div className="shrink-0" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
          {open ? (
            <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
          ) : (
            <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
          )}
        </motion.div>
      </button>

      <div 
        className={`transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-[min(42vh,800px)] sm:max-h-[min(62vh,800px)] overflow-y-auto opacity-100 mt-4 pr-1" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="border-t pt-4 sm:pt-5" style={{ borderColor: "rgba(227, 162, 60, 0.4)" }} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {modernVariants.map((v, idx) => (
            <MethodCard key={v.id} variant={v} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MethodCard({ variant, index }: { variant: typeof modernVariants[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 35px rgba(227, 162, 60, 0.3)" }}
      className="p-3 sm:p-4 cursor-pointer relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(21, 38, 43, 0.98) 0%, rgba(12, 20, 25, 0.99) 100%)",
        border: "1px solid var(--grid-line)",
        borderRadius: 8,
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: index * 0.05 + 0.15, duration: 0.4 }}
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--amber-signal) 50%, transparent 100%)", transformOrigin: "center" }}
      />

      <div 
        className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center rounded-full"
        style={{ background: "rgba(227, 162, 60, 0.2)", fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.6vw, 11px)", color: "var(--amber-signal)", fontWeight: 600 }}
      >
        {index + 1}
      </div>

      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(12px, 1.8vw, 13px)", color: "var(--paper)", marginBottom: 8, lineHeight: 1.35, paddingRight: 24 }}>
        {variant.form}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.6vw, 11px)", color: "var(--amber-signal)", lineHeight: 1.5 }}>
        → {variant.link}
      </div>
    </motion.div>
  );
}

function RevealBlock({ block, index, step }: { block: typeof reveals[0]; index: number; step: number }) {
  const isVisible = step >= index;
  const isAccent = block.accent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 15 }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0.06, x: -12, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 }}
      className="reveal-block"
    >
      <div className="flex items-center flex-wrap gap-x-2 sm:gap-x-3 gap-y-1">
        {block.lines.map((line, j) => {
          const isSymbol = line === "≠";
          const isHighlight = isAccent && j === 1;

          return (
            <span
              key={j}
              className={isSymbol ? "symbol-glow" : ""}
              style={{
                fontFamily: isSymbol ? "var(--font-mono)" : "var(--font-display)",
                fontWeight: 800,
                fontSize: isSymbol ? "clamp(28px, 5vw, 38px)" : isHighlight ? "clamp(28px, 5vw, 40px)" : "clamp(22px, 4vw, 32px)",
                lineHeight: 1.2,
                color: isSymbol ? "var(--amber-signal)" : isHighlight ? "var(--amber-signal)" : "var(--paper)",
                textShadow: isSymbol ? "0 0 15px rgba(227, 162, 60, 0.6), 0 0 30px rgba(227, 162, 60, 0.3)" : isHighlight ? "0 0 10px rgba(227, 162, 60, 0.4)" : "none",
              }}
            >
              {line}
            </span>
          );
        })}
      </div>

      {isAccent && isVisible && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="h-1 mt-2 sm:mt-3 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--amber-signal), transparent 80%)", transformOrigin: "left" }}
        />
      )}
    </motion.div>
  );
}

export function Station04({ revealTick, resetTick }: { revealTick: number; resetTick: number }) {
  const step = useRevealStep(4, revealTick, resetTick);

  return (
    <StationLayout stationCode="TRẠM 05" title="KẾT LUẬN & CHÍNH SÁCH" subtitle="Space để reveal từng luận điểm">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(227, 162, 60, 0.06) 0%, transparent 50%)" }}
      />

      <div className="grid min-h-full grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-center gap-4 sm:gap-5 lg:gap-7 py-2">
          {reveals.map((block, i) => (
            <RevealBlock key={i} block={block} index={i} step={step} />
          ))}
        </div>

        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={step >= 4 ? { opacity: 1, x: 0 } : { opacity: 0.05, x: 30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <MethodCards />
        </motion.div>
      </div>
    </StationLayout>
  );
}
