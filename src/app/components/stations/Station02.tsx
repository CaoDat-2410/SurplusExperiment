import { useState } from "react";
import { motion } from "motion/react";
import { StationLayout } from "../StationLayout";
import { EvidenceCard } from "../EvidenceCard";
import { Odometer } from "../effects/Odometer";
import { SourceDrawer } from "../SourceDrawer";
import { useRevealStep } from "../lib/useDeck";
import { cite } from "../data/citations";
import { theoryContent } from "../data/theoryContent";

function Reveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0.12 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export function Station02({ revealTick, resetTick }: { revealTick: number; resetTick: number }) {
  const step = useRevealStep(3, revealTick, resetTick);
  const [openSource, setOpenSource] = useState<string | null>(null);

  const absoluteSection = theoryContent.find((s) => s.type === "absolute")!;
  const [metric1, metric2] = absoluteSection.metrics; // ISACA 2025, Shift Tracker 2025

  return (
    <StationLayout stationCode="TRẠM 02" title={absoluteSection.title} subtitle="Nhấn Space để reveal · bấm số nguồn để xem chi tiết">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-6">
        {/* ROW 1: LÝ THUYẾT CỐT LÕI */}
        <Reveal show={step >= 0}>
          <EvidenceCard eyebrow="PHẦN A: LÝ THUYẾT CỐT LÕI · CƠ CHẾ" color="teal">
            <div className="flex h-full flex-col justify-center p-2">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--paper)", lineHeight: 1.6 }}>
                {absoluteSection.shortConcept}
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 1}>
          <EvidenceCard eyebrow="PHẦN A: LÝ THUYẾT CỐT LÕI · CÔNG THỨC" color="paper">
            <div className="flex h-full flex-col justify-center p-2 gap-4">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--amber-signal)", background: "color-mix(in srgb, var(--ink) 80%, transparent)", border: "1px solid var(--grid-line)", borderRadius: 4, padding: "12px 16px", fontWeight: 700 }}>
                Formula: {absoluteSection.formula}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.5 }}>
                Bóc lột thặng dư tuyệt đối bằng cách kéo dài thời gian làm việc vượt quá thời gian tất yếu t₁ hoặc tăng cường độ lao động trong điều kiện lương khả biến không đổi.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        {/* ROW 2: THỰC TIỄN 2024-2026 */}
        <Reveal show={step >= 2}>
          <EvidenceCard
            eyebrow={`PHẦN B: THỰC TIỄN · ${metric1.label.toUpperCase()}`}
            sourceId="isaca-2025" sourceMarker={cite("isaca-2025")} onOpenSource={setOpenSource}
            color="red"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 950, fontSize: 72, lineHeight: 1, color: "var(--surplus-red)" }}>
                {step >= 2 ? <Odometer value={73} decimals={0} /> : "—"}
                <span style={{ fontSize: 32 }}>%</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18, color: "var(--paper)", marginTop: 8, marginBottom: 4 }}>
                {metric1.description}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
                Chuyên gia IT kiệt sức vì làm việc quá giờ, gỡ lỗi (debug) cường độ cao dưới áp lực deadline mà không được tăng thêm tiền lương (tư bản khả biến).
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 3}>
          <EvidenceCard
            eyebrow={`PHẦN B: THỰC TIỄN · ${metric2.label.toUpperCase()}`}
            sourceId="shift-tracker-2025" sourceMarker={cite("shift-tracker-2025")} onOpenSource={setOpenSource}
            color="amber"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 950, fontSize: 64, lineHeight: 1, color: "var(--amber-signal)" }}>
                {step >= 3 ? (
                  <div className="flex items-baseline gap-1">
                    <Odometer value={10} decimals={0} />
                    <span style={{ fontSize: 32, fontWeight: 700 }}>-</span>
                    <Odometer value={12} decimals={0} />
                    <span style={{ fontSize: 32, marginLeft: 2, fontWeight: 700 }}> giờ/ngày</span>
                  </div>
                ) : "—"}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18, color: "var(--paper)", marginTop: 8, marginBottom: 4 }}>
                {metric2.description}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
                Tài xế giao hàng phải chạy nhiều ứng dụng và làm việc 10-12 tiếng mỗi ngày để bù đắp mức chiết khấu nền tảng chiếm từ 27% đến 37%.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
