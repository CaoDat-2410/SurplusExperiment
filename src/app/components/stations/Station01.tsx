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
        className="card-paper w-[580px] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--ink)" }}>
            LÝ THUYẾT GỐC — 3.1.2
          </span>
          <button onClick={onClose} className="focus-amber" style={{ color: "var(--surplus-red)", cursor: "pointer" }}>
            <X size={24} />
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink)", lineHeight: 1.65, marginBottom: 16 }}>
          {essenceSection.shortConcept}
        </p>
        <div
          className="mb-4 p-5"
          style={{ background: "var(--ink)", borderRadius: 4, border: "1px solid var(--grid-line)" }}
        >
          {[
            "Ngày lao động:   t = t₁ + t₂",
            "t₁ — lao động tất yếu (phần tái tạo sức lao động)",
            "t₂ — lao động thặng dư (phần dôi ra bị chiếm đoạt)",
            "",
            "Công thức tỷ suất thặng dư (m'):",
            essenceSection.formula,
          ].map((line, i) =>
            line === "" ? (
              <div key={i} style={{ height: 8 }} />
            ) : (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 15,
                  color: line.includes("=") || line.startsWith("Công thức") ? "var(--amber-signal)" : "var(--paper)",
                  lineHeight: 1.7,
                }}
              >
                {line}
              </div>
            )
          )}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "color-mix(in srgb, var(--ink) 65%, transparent)" }}>
          Nguồn: Tài liệu PDF nhóm cung cấp [★]
        </p>
      </div>
    </div>
  );
}

// Bảng chia 2 phần: Lý thuyết cốt lõi & Thực tiễn
function EssenceSplitCard() {
  const [metric1, metric2] = essenceSection.metrics;

  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {/* SECTION A: LÝ THUYẾT CỐT LÕI */}
      <div className="card-industrial p-6" style={{ background: "color-mix(in srgb, var(--ink) 60%, transparent)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 12, fontWeight: 700 }}>
          PHẦN A: LÝ THUYẾT CỐT LÕI
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--paper)", marginBottom: 2 }}>
              Tỷ suất giá trị thặng dư (m')
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--amber-signal)", marginBottom: 4, fontWeight: 700 }}>
              m' = (m / v) × 100%
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 80%, transparent)", lineHeight: 1.5 }}>
              Phản ánh trình độ bóc lột của tư bản đối với công nhân, cho biết tỷ lệ ngày lao động được phân chia giữa thời gian tất yếu và thặng dư.
            </div>
          </div>
          <div className="border-t pt-3" style={{ borderColor: "var(--grid-line)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--paper)", marginBottom: 2 }}>
              Khối lượng giá trị thặng dư (M)
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--amber-signal)", marginBottom: 4, fontWeight: 700 }}>
              M = m' × V
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 80%, transparent)", lineHeight: 1.5 }}>
              Phản ánh quy mô bóc lột của tư bản, tính bằng tích số giữa tỷ suất thặng dư và tổng tư bản khả biến được sử dụng (tổng quỹ lương V).
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: THỰC TIỄN 2024-2026 */}
      <div className="card-industrial p-6" style={{ background: "color-mix(in srgb, var(--ink) 60%, transparent)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 12, fontWeight: 700 }}>
          PHẦN B: THỰC TIỄN 2024-2026
        </div>
        <div className="flex flex-col gap-5">
          {/* Báo cáo Oxfam 2024 */}
          <div className="p-4" style={{ borderLeft: "4px solid var(--surplus-red)", background: "color-mix(in srgb, var(--ink) 40%, transparent)", borderRadius: "0 4px 4px 0" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grid-line)", fontWeight: 700 }}>
              {metric1.label.toUpperCase()}
            </div>
            <div className="my-2 flex items-baseline" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, color: "var(--surplus-red)", lineHeight: 1 }}>
              <span>+</span>
              <Odometer value={2000} decimals={0} suffix=" Tỷ USD" />
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--paper)", lineHeight: 1.45 }}>
              {metric1.description}
            </div>
          </div>

          {/* Bloomberg Q1/2026 */}
          <div className="p-4" style={{ borderLeft: "4px solid var(--necessary-teal)", background: "color-mix(in srgb, var(--ink) 40%, transparent)", borderRadius: "0 4px 4px 0" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grid-line)", fontWeight: 700 }}>
              {metric2.label.toUpperCase()}
            </div>
            <div className="my-2 flex items-baseline" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, color: "var(--necessary-teal)", lineHeight: 1 }}>
              <Odometer value={14.5} decimals={1} suffix="%" />
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--paper)", lineHeight: 1.45 }}>
              {metric2.description}
            </div>
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
                fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em",
                color: "var(--amber-signal)", border: "1px solid var(--amber-signal)",
                borderRadius: 4, cursor: "pointer",
              }}
            >
              <BookOpen size={16} /> LÝ THUYẾT CHI TIẾT
            </button>
          </div>
          <TimeCard
            totalHours={state.totalHours}
            necessaryHours={out.necessaryHours}
            surplusHours={out.surplusHours}
            rate={out.rate}
          />
          <MechanismBadge mechanism={mechanism} />
          <EssenceSplitCard />
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
            style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--paper)", border: "1px solid var(--grid-line)", borderRadius: 4, cursor: "pointer" }}
          >
            <RotateCcw size={16} /> Đặt lại (R)
          </button>
        </div>
      </div>

      {showTheory && <TheoryPopup onClose={() => setShowTheory(false)} />}
    </StationLayout>
  );
}
