import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, RotateCcw, X } from "lucide-react";
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
          {essenceSection.concept}
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
            "Tỷ suất giá trị thặng dư:",
            "s/v = t₂ / t₁ × 100%",
          ].map((line, i) =>
            line === "" ? (
              <div key={i} style={{ height: 8 }} />
            ) : (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: line.startsWith("s/v") || line.startsWith("Tỷ suất") ? "var(--amber-signal)" : "var(--paper)",
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

// Card phân biệt 2 phương pháp (3.1.3)
function MethodCompareCard() {
  const rows = [
    {
      method: "Giá trị thặng dư tuyệt đối",
      mechanism: "Kéo dài ngày lao động hoặc tăng cường độ",
      web: "Slider giờ làm tăng → phần đỏ t₂ dài ra, t₁ không đổi",
      color: "var(--surplus-red)",
    },
    {
      method: "Giá trị thặng dư tương đối",
      mechanism: "Tăng năng suất → rút ngắn thời gian lao động cần thiết t₁",
      web: "Slider năng suất tăng → phần xanh t₁ ngắn lại, phần đỏ t₂ dài ra",
      color: "var(--necessary-teal)",
    },
  ];

  return (
    <div className="card-industrial p-4">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10 }}>
        PHÂN BIỆT 2 PHƯƠNG PHÁP — 3.1.3
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div
            key={r.method}
            className="p-3"
            style={{ borderLeft: `3px solid ${r.color}`, background: "color-mix(in srgb, var(--ink) 60%, transparent)", borderRadius: "0 4px 4px 0" }}
          >
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, color: r.color, marginBottom: 2 }}>
              {r.method}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--paper)", lineHeight: 1.45 }}>
              {r.mechanism}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 60%, transparent)", marginTop: 3 }}>
              → {r.web}
            </div>
          </div>
        ))}
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
            <FormulaBox lines={["t = t₁ + t₂", "s/v = t₂ / t₁ × 100%"]} />
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
          <MethodCompareCard />
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
