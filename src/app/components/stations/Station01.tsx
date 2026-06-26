import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, RotateCcw, X } from "lucide-react";
import { StationLayout } from "../StationLayout";
import { TimeCard } from "../TimeCard";
import { ControlSlider } from "../ControlSlider";
import { FormulaBox } from "../FormulaBox";
import { MechanismBadge } from "../MechanismBadge";
import { Odometer } from "../effects/Odometer";
import {
  calculateSurplus,
  getActiveMechanism,
  Mechanism,
  SurplusInput,
} from "../lib/calculations";
import { theoryContent } from "../data/theoryContent";

const essenceSection = theoryContent.find((s) => s.type === "essence")!;
const DEFAULT: SurplusInput = { totalHours: 8, productivity: 100, realWage: 100 };

// Popup lý thuyết gốc (3.1.2)
function TheoryPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ background: "color-mix(in srgb, var(--ink) 90%, transparent)" }}
      onClick={onClose}
    >
      <div
        className="card-paper w-[540px] p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--ink)" }}>
            LÝ THUYẾT GỐC — 3.1.2
          </span>
          <button onClick={onClose} className="focus-amber" style={{ color: "var(--surplus-red)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink)", lineHeight: 1.65, marginBottom: 16 }}>
          {essenceSection.shortConcept}
        </p>
        <div
          className="mb-4 p-4"
          style={{ background: "var(--ink)", borderRadius: 4, border: "1px solid var(--grid-line)" }}
        >
          {[
            "Ngày lao động:   t = t₁ + t₂",
            "t₁ — lao động cần thiết (phần được trả công)",
            "t₂ — lao động thặng dư (phần bị chiếm đoạt)",
            "",
            "Công thức tỷ suất thặng dư:",
            essenceSection.formula,
          ].map((line, i) =>
            line === "" ? (
              <div key={i} style={{ height: 8 }} />
            ) : (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: line.includes("=") || line.startsWith("Công thức") ? "var(--amber-signal)" : "var(--paper)",
                  lineHeight: 1.7,
                }}
              >
                {line}
              </div>
            )
          )}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--ink) 65%, transparent)" }}>
          Nguồn: Tài liệu PDF nhóm cung cấp [★]
        </p>
      </div>
    </div>
  );
}

// Card hiển thị các chỉ số thực tế
function EssenceMetricsCard() {
  const [metric1, metric2] = essenceSection.metrics;

  return (
    <div className="card-industrial p-4">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10 }}>
        SỐ LIỆU ĐO LƯỜNG CỐT LÕI
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Metric 1: Oxfam 2024 */}
        <div className="p-3" style={{ borderLeft: "3px solid var(--surplus-red)", background: "color-mix(in srgb, var(--ink) 60%, transparent)", borderRadius: "0 4px 4px 0" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--grid-line)" }}>
            {metric1.label}
          </div>
          <div className="my-1 flex items-baseline" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--surplus-red)" }}>
            <span>+$</span>
            <Odometer value={2} decimals={0} />
            <span style={{ fontSize: 16, marginLeft: 2 }}>Trillion</span>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--paper)", lineHeight: 1.45 }}>
            {metric1.description}
          </div>
        </div>

        {/* Metric 2: Bloomberg 2026 */}
        <div className="p-3" style={{ borderLeft: "3px solid var(--necessary-teal)", background: "color-mix(in srgb, var(--ink) 60%, transparent)", borderRadius: "0 4px 4px 0" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--grid-line)" }}>
            {metric2.label}
          </div>
          <div className="my-1 flex items-baseline" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--necessary-teal)" }}>
            <Odometer value={14.5} decimals={1} />
            <span style={{ fontSize: 20, marginLeft: 2 }}>%</span>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--paper)", lineHeight: 1.45 }}>
            {metric2.description}
          </div>
        </div>
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
    <StationLayout stationCode="TRẠM 01" title={essenceSection.title} subtitle="Mô phỏng công thức — tính từ thông số bạn nhập">
      <div className="grid h-full grid-cols-12 gap-6">
        {/* left: time card + formula + badge */}
        <div className="col-span-7 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <FormulaBox lines={["t = t₁ + t₂", essenceSection.formula]} />
            <button
              onClick={() => setShowTheory(true)}
              className="svl-press focus-amber flex items-center gap-2 px-4 py-2"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em",
                color: "var(--amber-signal)", border: "1px solid var(--amber-signal)",
                borderRadius: 4, cursor: "pointer",
              }}
            >
              <BookOpen size={14} /> LÝ THUYẾT
            </button>
          </div>
          <TimeCard
            totalHours={state.totalHours}
            necessaryHours={out.necessaryHours}
            surplusHours={out.surplusHours}
            rate={out.rate}
          />
          <MechanismBadge mechanism={mechanism} />
          <EssenceMetricsCard />
        </div>

        {/* right: sliders */}
        <div className="col-span-5 flex flex-col justify-center gap-4">
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
            className="svl-press focus-amber mt-1 flex w-fit items-center gap-2 px-4 py-2"
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--paper)", border: "1px solid var(--grid-line)", borderRadius: 4, cursor: "pointer" }}
          >
            <RotateCcw size={15} /> Đặt lại (R)
          </button>
        </div>
      </div>

      {showTheory && <TheoryPopup onClose={() => setShowTheory(false)} />}
    </StationLayout>
  );
}
