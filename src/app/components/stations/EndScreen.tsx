import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { RefreshCw, Sparkles, Lightbulb, Target } from "lucide-react";

const takeaways = [
  { text: "Giá trị thặng dư là phần giá trị mới vượt quá tiền lương — phần bị nhà tư bản chiếm đoạt trong sản xuất.", icon: Sparkles, highlight: "Giá trị thặng dư" },
  { text: "Tư bản mở rộng giá trị thặng dư bằng kéo dài giờ làm (tuyệt đối) hoặc tăng năng suất (tương đối) và các hình thức hiện đại khác.", icon: Target, highlight: "kéo dài giờ làm" },
  { text: "Trong kinh tế hiện đại, vấn đề lớn không phải là có năng suất tăng hay không — mà là thành quả năng suất được phân phối cho ai.", icon: Lightbulb, highlight: "phân phối cho ai" },
];

function TakeawayCard({ item, index }: { item: typeof takeaways[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -40, y: 20 }} animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }} className="flex items-start gap-3 sm:gap-5">
      <motion.div className="shrink-0" initial={{ scale: 0, rotate: -180 }} animate={isInView ? { scale: 1, rotate: 0 } : {}} transition={{ delay: index * 0.15 + 0.1, type: "spring", stiffness: 250 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px, 6vw, 48px)", lineHeight: 1, color: "var(--amber-signal)", textShadow: "0 0 20px rgba(227, 162, 60, 0.5)" }}>
          {index + 1}
        </div>
      </motion.div>

      <motion.div className="flex-1 p-3 sm:p-5 relative" style={{ background: "linear-gradient(145deg, rgba(21, 38, 43, 0.95) 0%, rgba(12, 20, 25, 0.98) 100%)", border: "1px solid var(--grid-line)", borderRadius: 8, borderLeft: "3px solid var(--amber-signal)" }} whileHover={{ borderColor: "var(--amber-signal)" }} initial={{ scale: 0.95 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: index * 0.15 + 0.2 }}>
        <motion.div className="absolute top-2 sm:top-3 right-2 sm:right-3" initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * 0.15 + 0.4 }}>
          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
        </motion.div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px, 2vw, 15px)", color: "var(--paper)", lineHeight: 1.6, paddingRight: 24 }}>
          {item.text.split(item.highlight).map((part, i) => (
            <span key={i}>{i > 0 && <span style={{ color: "var(--amber-signal)", fontWeight: 700 }}>{item.highlight}</span>}{part}</span>
          ))}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function EndScreen({ onReset }: { onReset: () => void }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const questionRef = useRef<HTMLDivElement>(null);
  const isQuestionInView = useInView(questionRef, { once: true });
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 md:px-12 lg:px-24 text-center relative overflow-y-auto py-4">
      <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(227, 162, 60, 0.08) 0%, transparent 50%)" }} />

      <motion.div ref={headerRef} initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7 }} className="relative">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 6vw, 56px)", lineHeight: 1.1, color: "var(--paper)", textShadow: "0 0 40px rgba(227, 162, 60, 0.2)" }}>
          HOÀN THÀNH THÍ NGHIỆM
        </div>
      </motion.div>

      <motion.div className="w-full max-w-2xl sm:max-w-3xl text-left" initial={{ opacity: 0, y: 30 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.8vw, 13px)", letterSpacing: "0.14em", color: "var(--amber-signal)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles size={14} className="sm:w-4 sm:h-4" />
          3 ĐIỀU CẦN NHỚ
        </div>
        <div className="flex flex-col gap-3 sm:gap-5">
          {takeaways.map((item, i) => (<TakeawayCard key={i} item={item} index={i} />))}
        </div>
      </motion.div>

      <motion.div ref={questionRef} initial={{ opacity: 0, y: 20 }} animate={isQuestionInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="relative">
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2.5vw, 17px)", maxWidth: 600, color: "color-mix(in srgb, var(--paper) 75%, transparent)", lineHeight: 1.65 }}>
          Câu hỏi còn lại: nếu năng suất tăng, làm thế nào để thành quả đó được
          <strong style={{ color: "var(--amber-signal)", fontWeight: 700, textShadow: "0 0 15px rgba(227, 162, 60, 0.5)" }}> phân phối công bằng hơn?</strong>
        </p>
      </motion.div>

      <motion.button ref={buttonRef} onClick={onReset} initial={{ opacity: 0, scale: 0.8 }} animate={isQuestionInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.8 }} whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(227, 162, 60, 0.4)" }} whileTap={{ scale: 0.97 }} className="svl-press focus-amber flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 cursor-pointer" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 2vw, 14px)", letterSpacing: "0.1em", color: "var(--ink)", background: "var(--amber-signal)", border: "none", borderRadius: 6 }}>
        <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" /> 
        CHẠY LẠI THÍ NGHIỆM
      </motion.button>
    </div>
  );
}
