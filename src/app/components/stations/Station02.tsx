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
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
        <Reveal show={step >= 0}>
          <EvidenceCard
            eyebrow={metric1.label.toUpperCase()}
            sourceId="isaca-2025" sourceMarker={cite("isaca-2025")} onOpenSource={setOpenSource}
            color="red"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1, color: "var(--surplus-red)" }}>
                {step >= 0 ? <Odometer value={73} decimals={0} /> : "—"}
                <span style={{ fontSize: 28 }}>%</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--paper)", marginTop: 6, marginBottom: 4 }}>
                {metric1.description}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
                Ép buộc gỡ lỗi (debug) và làm việc cường độ cao dưới áp lực deadline mà không được tăng thêm tiền lương.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 1}>
          <EvidenceCard
            eyebrow={metric2.label.toUpperCase()}
            sourceId="shift-tracker-2025" sourceMarker={cite("shift-tracker-2025")} onOpenSource={setOpenSource}
            color="amber"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 54, lineHeight: 1, color: "var(--amber-signal)" }}>
                {step >= 1 ? (
                  <div className="flex items-baseline gap-1">
                    <Odometer value={10} decimals={0} />
                    <span style={{ fontSize: 24, fontWeight: 700 }}>-</span>
                    <Odometer value={12} decimals={0} />
                    <span style={{ fontSize: 24, marginLeft: 2, fontWeight: 700 }}> giờ/ngày</span>
                  </div>
                ) : "—"}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--paper)", marginTop: 6, marginBottom: 4 }}>
                {metric2.description}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
                Thời gian làm việc kéo dài hàng ngày của tài xế công nghệ chạy nhiều app để bù đắp mức chiết khấu nền tảng cao.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 2}>
          <EvidenceCard eyebrow="CƠ CHẾ LÝ THUYẾT" color="teal">
            <div className="flex h-full flex-col justify-center">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--paper)", lineHeight: 1.6 }}>
                {absoluteSection.shortConcept}
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 3}>
          <EvidenceCard eyebrow="CÔNG THỨC & HOẠT ĐỘNG" color="paper">
            <div className="flex h-full flex-col justify-center gap-3">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", background: "color-mix(in srgb, var(--ink) 80%, transparent)", border: "1px solid var(--grid-line)", borderRadius: 4, padding: "8px 12px" }}>
                Formula: {absoluteSection.formula}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.5 }}>
                Bóc lột thặng dư tuyệt đối bằng cách kéo dài thời gian làm việc vượt quá thời gian tất yếu hoặc tăng cường độ lao động trong điều kiện lương khả biến không đổi.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
