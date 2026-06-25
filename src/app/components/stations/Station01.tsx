import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, RotateCcw, X, Zap, TrendingUp, Scale } from "lucide-react";
import { StationLayout } from "../StationLayout";
import { TimeCard } from "../TimeCard";
import { ControlSlider } from "../ControlSlider";
import { FormulaBox } from "../FormulaBox";
import { MechanismBadge } from "../MechanismBadge";
import {
  calculateSurplus,
  getActiveMechanism,
  Mechanism,
  SurplusInput,
} from "../lib/calculations";

const DEFAULT: SurplusInput = { totalHours: 8, productivity: 100, realWage: 100 };

function TheoryPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "color-mix(in srgb, var(--ink) 92%, transparent)" }}
      onClick={onClose}
    >
      <motion.div
        className="card-paper w-full max-w-[480px] p-5 sm:p-6 relative overflow-hidden"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button 
          onClick={onClose} 
          className="focus-amber absolute top-2 right-2 sm:top-3 sm:right-3 z-10 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "var(--surplus-red)" }}
        >
          <X size={18} />
        </motion.button>

        <div className="mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "var(--amber-signal)" }} />
          <span style={{ 
            fontFamily: "var(--font-display)", 
            fontWeight: 800, 
            fontSize: 16, 
            sm: 18, 
            color: "var(--ink)",
          }}>
            LÝ THUYẾT GỐC — 3.1.2
          </span>
        </div>

        <p style={{ 
          fontFamily: "var(--font-body)", 
          fontSize: 12, 
          sm: 13, 
          color: "var(--ink)", 
          lineHeight: 1.6, 
          marginBottom: 12,
        }}>
          Giá trị thặng dư là phần giá trị mới do lao động tạo ra vượt quá giá trị sức lao động được trả bằng tiền lương.
        </p>

        <div
          className="p-3 sm:p-4 relative"
          style={{ 
            background: "var(--ink)", 
            borderRadius: 6, 
            border: "1px solid var(--grid-line)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.8vw, 13px)", color: "var(--paper)", lineHeight: 1.8 }}>
            <div>Ngày lao động: <span style={{ color: "var(--amber-signal)" }}>t = t₁ + t₂</span></div>
            <div style={{ fontSize: "clamp(10px, 1.8vw, 11px)", opacity: 0.7 }}>t₁ — lao động cần thiết · t₂ — lao động thặng dư</div>
            <div style={{ marginTop: 8 }}>Tỷ suất: <span style={{ color: "var(--amber-signal)" }}>s/v = t₂ / t₁ × 100%</span></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MethodCompareCard() {
  const rows = [
    { method: "Tuyệt đối", mechanism: "Kéo dài ngày lao động", color: "var(--surplus-red)", icon: Scale },
    { method: "Tương đối", mechanism: "Tăng năng suất → rút ngắn t₁", color: "var(--necessary-teal)", icon: TrendingUp },
  ];

  return (
    <div className="card-industrial p-3 sm:p-4">
      <div style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: 9, 
        sm: 10, 
        letterSpacing: "0.1em", 
        color: "var(--amber-signal)", 
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <Zap size={11} className="sm:w-3 sm:h-3" />
        2 PHƯƠNG PHÁP — 3.1.3
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.method}
              className="flex-1 p-2.5 sm:p-3"
              style={{ 
                borderLeft: `3px solid ${r.color}`, 
                background: "color-mix(in srgb, var(--ink) 60%, transparent)", 
                borderRadius: "0 4px 4px 0",
              }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <Icon size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: r.color }} />
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(11px, 1.8vw, 12px)", color: r.color }}>
                  {r.method}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(10px, 1.8vw, 11px)", color: "var(--paper)", lineHeight: 1.4 }}>
                {r.mechanism}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Station01({ resetTick }: { resetTick: number }) {
  const [state, setState] = useState<SurplusInput>(DEFAULT);
  const [mechanism, setMechanism] = useState<Mechanism>("baseline");
  const [showTheory, setShowTheory] = useState(false);
  const prevRef = useRef<SurplusInput>(DEFAULT);
  const resetSeen = useRef(resetTick);

  useEffect(() => {
    if (resetTick !== resetSeen.current) {
      resetSeen.current = resetTick;
      setState(DEFAULT);
      setMechanism("baseline");
      prevRef.current = DEFAULT;
    }
  }, [resetTick]);

  const out = useMemo(() => calculateSurplus(state), [state]);

  const update = (patch: Partial<SurplusInput>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      setMechanism(getActiveMechanism(next, prev));
      prevRef.current = prev;
      return next;
    });
  };

  return (
    <StationLayout stationCode="TRẠM 01" title="CỖ MÁY GIÁ TRỊ THẶNG DƯ" subtitle="Mô phỏng công thức — tính từ thông số bạn nhập">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: "radial-gradient(ellipse at 30% 60%, rgba(227, 162, 60, 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="grid min-h-full grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 relative z-10">
        {/* left: time card + formula + badge */}
        <div className="flex min-h-[560px] flex-col justify-center gap-3 sm:gap-4 lg:col-span-7 lg:min-h-0">
          {/* Formula and theory button row */}
          <div className="flex items-center gap-2">
            <FormulaBox lines={["t = t₁ + t₂", "s/v = t₂ / t₁ × 100%"]} />
            <button
              onClick={() => setShowTheory(true)}
              className="svl-press focus-amber flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)", 
                fontSize: "clamp(11px, 3vw, 12px)", 
                letterSpacing: "0.04em",
                color: "var(--amber-signal)", 
                border: "1px solid var(--amber-signal)",
                borderRadius: 4,
                background: "rgba(227, 162, 60, 0.1)",
              }}
            >
              <BookOpen size={12} className="sm:w-[13px] sm:h-[13px]" />
              <span className="hidden sm:inline">LÝ THUYẾT</span>
            </button>
          </div>

          <TimeCard
            totalHours={state.totalHours}
            necessaryHours={out.necessaryHours}
            surplusHours={out.surplusHours}
            rate={out.rate}
          />

          <MechanismBadge mechanism={mechanism} />

          <MethodCompareCard />
        </div>

        {/* right: sliders */}
        <div className="flex min-h-[420px] flex-col justify-center gap-3 sm:gap-4 lg:col-span-5 lg:min-h-0">
          <ControlSlider
            label="Giờ làm / ngày"
            value={state.totalHours}
            min={6}
            max={12}
            step={0.5}
            unit=" h"
            description="Kéo dài tổng ngày lao động. Nếu t₁ không đổi, t₂ tăng → thặng dư TUYỆT ĐỐI."
            onChange={(v) => update({ totalHours: v })}
          />
          <ControlSlider
            label="Năng suất lao động"
            value={state.productivity}
            min={80}
            max={180}
            step={5}
            unit="%"
            description="Năng suất tăng → thời gian tái tạo giá trị sức lao động (t₁) giảm → thặng dư TƯƠNG ĐỐI."
            onChange={(v) => update({ productivity: v })}
          />
          <ControlSlider
            label="Mức lương thực tế"
            value={state.realWage}
            min={70}
            max={150}
            step={5}
            unit="%"
            description="Lương tăng làm t₁ tăng; lương giảm làm t₂ tăng (ép lương)."
            onChange={(v) => update({ realWage: v })}
          />
          <button
            onClick={() => { setState(DEFAULT); setMechanism("baseline"); prevRef.current = DEFAULT; }}
            className="svl-press focus-amber flex w-fit items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 cursor-pointer"
            style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "clamp(11px, 3vw, 12px)", 
              color: "var(--paper)", 
              border: "1px solid var(--grid-line)", 
              borderRadius: 4 
            }}
          >
            <RotateCcw size={12} className="sm:w-[13px] sm:h-[13px]" /> 
            Đặt lại (R)
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTheory && <TheoryPopup onClose={() => setShowTheory(false)} />}
      </AnimatePresence>
    </StationLayout>
  );
}
