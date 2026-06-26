import { useState } from "react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { StationLayout } from "../StationLayout";
import { EvidenceCard } from "../EvidenceCard";
import { Odometer } from "../effects/Odometer";
import { SourceDrawer } from "../SourceDrawer";
import { useRevealStep } from "../lib/useDeck";
import { cite } from "../data/citations";
import { theoryContent } from "../data/theoryContent";

const tooltipStyle = {
  background: "var(--ink)",
  border: "1px solid var(--grid-line)",
  borderRadius: 4,
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--paper)",
};

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
  const [isacaCase, shiftCase] = absoluteSection.caseStudies;

  const isacaChartData = [
    { name: "Kiệt sức", value: 73, fill: "var(--surplus-red)" },
    { name: "Bình thường", value: 27, fill: "var(--grid-line)" },
  ];

  const gigHoursData = [
    { name: "Tiêu chuẩn", value: 8, fill: "var(--necessary-teal)" },
    { name: "Làm Gig (TB)", value: 11, fill: "var(--surplus-red)" },
  ];

  return (
    <StationLayout stationCode="TRẠM 02" title={absoluteSection.title} subtitle="Nhấn Space để reveal · bấm số nguồn để xem chi tiết">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
        <Reveal show={step >= 0}>
          <EvidenceCard
            eyebrow={isacaCase.title.toUpperCase()}
            sourceId={isacaCase.id} sourceMarker={cite(isacaCase.id)} onOpenSource={setOpenSource}
            color="red"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={isacaChartData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--grid-line)" />
                <XAxis dataKey="name" stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis domain={[0, 100]} stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                <Bar dataKey="value">
                  {isacaChartData.map((d) => <Cell key={d.name} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", marginTop: 4 }}>
              IT Burnout: 73% chuyên gia kiệt sức (61% do quá tải)
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 1}>
          <EvidenceCard
            eyebrow="THỜI GIAN LAO ĐỘNG GIG ECONOMY"
            sourceId={shiftCase.id} sourceMarker={cite(shiftCase.id)} onOpenSource={setOpenSource}
            color="amber"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gigHoursData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--grid-line)" />
                <XAxis dataKey="name" stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis domain={[0, 14]} stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v} giờ`} />
                <Bar dataKey="value">
                  {gigHoursData.map((d) => <Cell key={d.name} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", marginTop: 4 }}>
              Cày cuốc 10-12 tiếng mỗi ngày (58% chạy đa app)
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 2}>
          <EvidenceCard
            eyebrow="CHIẾT KHẤU NỀN TẢNG TỐI ĐA"
            sourceId={shiftCase.id} sourceMarker={cite(shiftCase.id)} onOpenSource={setOpenSource}
            color="red"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1, color: "var(--surplus-red)" }}>
                {step >= 2 ? <Odometer value={37} decimals={0} /> : "—"}
                <span style={{ fontSize: 28 }}>%</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 75%, transparent)", marginTop: 8 }}>
                Mức chiết khấu tối đa trên tổng thu nhập (từ 27% đến 37%) mà các nền tảng công nghệ thu của tài xế, bòn rút giá trị thặng dư trực tiếp từ người lao động.
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 3}>
          <EvidenceCard eyebrow="DIỄN GIẢI LÝ THUYẾT" color="teal">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--paper)", lineHeight: 1.6 }}>
              Giá trị thặng dư tuyệt đối vẫn hiện diện qua việc <b style={{ color: "var(--surplus-red)" }}>kéo dài ngày lao động thực tế</b> (10-12 tiếng của tài xế) hoặc <b style={{ color: "var(--surplus-red)" }}>tăng cường độ lao động gián tiếp</b> (gây kiệt sức IT) mà lương khả biến không đổi.
            </p>
          </EvidenceCard>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
