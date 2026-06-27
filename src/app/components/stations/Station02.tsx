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
  const [metric1, metric2] = absoluteSection.metrics;

  return (
    <StationLayout stationCode="PHẦN 2" title={absoluteSection.title} subtitle="Nhấn Space để reveal · bấm số nguồn để xem chi tiết">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-6 overflow-y-auto py-2">
        {/* ROW 1: LÝ THUYẾT CỐT LÕI */}
        <Reveal show={step >= 0}>
          <EvidenceCard eyebrow="PHẦN A: LÝ THUYẾT CỐT LÕI · CƠ CHẾ" color="teal">
            <div className="flex h-full flex-col justify-center gap-4">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--paper)", lineHeight: 1.5 }}>
                {absoluteSection.shortConcept}
              </p>
              <div className="p-3" style={{ background: "color-mix(in srgb, var(--ink) 60%, transparent)", borderRadius: 4, border: "1px solid var(--grid-line)" }}>
                {[
                  "Độ dài ngày lao động ban đầu:   t = t₁ + t₂",
                  "Độ dài ngày lao động kéo dài:   t' = t₁ + t₂' (với t₂' > t₂)",
                  "",
                  "t₁ — Thời gian lao động tất yếu (không đổi)",
                  "t₂ — Thời gian lao động thặng dư ban đầu",
                  "t₂' — Thời gian lao động thặng dư sau khi kéo dài"
                ].map((line, i) =>
                  line === "" ? (
                    <div key={i} style={{ height: 4 }} />
                  ) : (
                    <div
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        color: line.includes("=") ? "var(--amber-signal)" : "var(--paper)",
                        lineHeight: 1.5,
                      }}
                    >
                      {line}
                    </div>
                  )
                )}
              </div>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 1}>
          <EvidenceCard eyebrow="PHẦN A: LÝ THUYẾT CỐT LÕI · CÁCH THỰC HIỆN" color="paper">
            <div className="flex h-full flex-col justify-center gap-4">
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--paper)", marginBottom: 4 }}>
                  1. Kéo dài ngày lao động
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.5 }}>
                  Tăng số giờ làm việc mỗi ngày, mỗi tuần (làm thêm, tăng ca).
                </p>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--grid-line)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--paper)", marginBottom: 4 }}>
                  2. Tăng cường độ lao động
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.5 }}>
                  Ép công nhân làm nhanh hơn, nhiều việc hơn trong cùng thời gian (hệ thống theo dõi, áp lực thời hạn).
                </p>
              </div>
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
            sourceId="cbs-news-amazon" sourceMarker={cite("cbs-news-amazon")} onOpenSource={setOpenSource}
            color="paper"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 950, fontSize: 56, lineHeight: 1, color: "var(--amber-signal)" }}>
                {step >= 3 ? (
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline gap-1">
                      <Odometer value={41} decimals={0} />
                      <span style={{ fontSize: 28, fontWeight: 700 }}>% CHẤN THƯƠNG</span>
                    </div>
                    <div style={{ fontSize: 18, fontFamily: "var(--font-mono)", color: "var(--paper)", marginTop: 8 }}>
                      69% nghỉ không lương
                    </div>
                  </div>
                ) : "—"}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18, color: "var(--paper)", marginTop: 8, marginBottom: 4 }}>
                {metric2.description}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
                Tỷ lệ chấn thương 6.6/100 người (gấp đôi ngành trung bình), hệ thống theo dõi ép làm nhanh hơn.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
