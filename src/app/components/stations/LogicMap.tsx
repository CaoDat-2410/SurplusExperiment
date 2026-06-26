import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Sparkles, Target, Zap, TrendingUp } from "lucide-react";

const steps = [
  { id: 1, text: "Lao động tạo ra giá trị mới", sub: "Không phải trong lưu thông", highlight: false },
  { id: 2, text: "Tiền lương chỉ trả bằng giá trị sức lao động", sub: "Không phải toàn bộ giá trị mới", highlight: false },
  { id: 3, text: "Phần vượt quá = giá trị thặng dư", sub: "s/v = t₂/t₁ × 100%", highlight: true, icon: Zap },
  { id: 4, text: "Tư bản mở rộng bằng nhiều phương pháp", sub: "Kéo dài giờ · Tăng năng suất", highlight: false },
  { id: 5, text: "Câu hỏi: ai nhận phần tăng trưởng?", sub: "Năng suất tăng ≠ lao động hưởng nhiều hơn", highlight: true, icon: Target },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = step.icon || (() => null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="relative min-h-[170px] w-full flex-none group sm:min-h-0 sm:flex-1 sm:min-w-0"
    >
      {step.highlight && (
        <motion.div
          className="absolute -inset-2 sm:-inset-3 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
          style={{ background: `radial-gradient(ellipse at center, rgba(227, 162, 60, 0.15) 0%, transparent 70%)`, filter: "blur(12px)", zIndex: -1 }}
        />
      )}

      <motion.div
        className="flex h-full min-h-[170px] flex-col overflow-hidden p-4 relative sm:min-h-0 sm:p-4 lg:p-5"
        style={{
          border: `1px solid ${step.highlight ? "var(--amber-signal)" : "var(--grid-line)"}`,
          borderRadius: 8,
          background: step.highlight ? "linear-gradient(145deg, rgba(227, 162, 60, 0.12) 0%, rgba(15, 25, 30, 0.95) 100%)" : "linear-gradient(145deg, rgba(236, 227, 211, 0.04) 0%, rgba(12, 20, 25, 0.98) 100%)",
          boxShadow: step.highlight ? "0 0 30px rgba(227, 162, 60, 0.15)" : "none",
        }}
        whileHover={{ y: -3 }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
          style={{ background: step.highlight ? "var(--amber-signal)" : "var(--grid-line)", transformOrigin: "center" }}
        />

        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-full sm:h-8 sm:w-8"
            style={{ background: step.highlight ? "rgba(227, 162, 60, 0.25)" : "rgba(236, 227, 211, 0.1)", color: step.highlight ? "var(--amber-signal)" : "var(--grid-line)", fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.8vw, 12px)", boxShadow: step.highlight ? "0 0 15px rgba(227, 162, 60, 0.3)" : "none" }}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.1, type: "spring", stiffness: 250 }}
          >
            {String(step.id).padStart(2, "0")}
          </motion.div>
          
          {step.highlight && Icon && (
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * 0.15 + 0.35 }}>
              <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
            </motion.div>
          )}
        </div>

        <div className="flex-1">
          <motion.h3
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px, 5vw, 20px)", lineHeight: 1.2, color: step.highlight ? "var(--amber-signal)" : "var(--paper)", marginBottom: 8 }}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {step.text}
          </motion.h3>

          <motion.p
            style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3.2vw, 13px)", color: step.highlight ? "rgba(227, 162, 60, 0.85)" : "color-mix(in srgb, var(--paper) 55%, transparent)", lineHeight: 1.4 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.45 }}
          >
            {step.sub}
          </motion.p>
        </div>

        {step.highlight && (
          <motion.div
            className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--amber-signal)", boxShadow: "0 0 10px var(--amber-signal)" }} />
          </motion.div>
        )}
      </motion.div>

      {index < steps.length - 1 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden sm:block">
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * 0.15 + 0.6 }}>
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: steps[index + 1].highlight ? "var(--amber-signal)" : "var(--grid-line)" }} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export function LogicMap({ onNext }: { onNext: () => void }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef, { once: true });

  return (
    <div className="flex h-full w-full flex-col px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 pt-6 sm:pt-8">
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <header ref={headerRef} className="relative mb-6 sm:mb-8 border-b pb-3 sm:pb-5" style={{ borderColor: "var(--grid-line)" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3"
        >
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Sparkles size={18} className="sm:w-5 sm:h-5" style={{ color: "var(--amber-signal)" }} />
          </motion.div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.8vw, 14px)", letterSpacing: "0.16em", color: "var(--amber-signal)" }}>
            BẢN ĐỒ LOGIC
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px, 5vw, 42px)", lineHeight: 1.1, color: "var(--paper)", textShadow: "0 0 40px rgba(227, 162, 60, 0.15)" }}
        >
          CẤU TRÚC LẬP LUẬN CỦA BÀI
        </motion.h1>
      </header>

      <div className="relative flex min-h-0 flex-1 items-start overflow-y-auto pb-2 sm:items-center sm:overflow-x-auto sm:overflow-y-hidden">
        <motion.div 
          className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {steps.map((s, i) => (
            <StepCard key={s.id} step={s} index={i} />
          ))}
        </motion.div>
      </div>

      <motion.div 
        ref={footerRef}
        className="relative mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        initial={{ opacity: 0, y: 25 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px, 1.8vw, 14px)", color: "color-mix(in srgb, var(--paper) 50%, transparent)", maxWidth: 400 }}>
          Mỗi trạm trong bài tương ứng với một bước trong chuỗi lập luận này.
        </p>
        
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(227, 162, 60, 0.4)" }}
          whileTap={{ scale: 0.97 }}
          className="svl-press focus-amber flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 cursor-pointer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.8vw, 13px)", letterSpacing: "0.1em", color: "var(--ink)", background: "var(--amber-signal)", borderRadius: 6, border: "none" }}
        >
          VÀO TRẠM 01 (CỖ MÁY)
          <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
