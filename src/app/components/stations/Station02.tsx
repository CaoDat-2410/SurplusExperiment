import { useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { StationLayout } from "../StationLayout";
import { EvidenceCard } from "../EvidenceCard";
import { Odometer } from "../effects/Odometer";
import { SourceDrawer } from "../SourceDrawer";
import { useRevealStep } from "../lib/useDeck";
import { citations } from "../data/citations";
import { globalLabourShare, productivityVsIncome, lostLabourIncome } from "../data/globalLabour";

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

function m(id: string) {
  return citations.find((c) => c.id === id)?.marker ?? "";
}

export function Station02({ revealTick, resetTick }: { revealTick: number; resetTick: number }) {
  const step = useRevealStep(3, revealTick, resetTick);
  const [openSource, setOpenSource] = useState<string | null>(null);

  const barData = [
    { name: "Năng suất/giờ", value: productivityVsIncome.productivityGrowth, fill: "var(--surplus-red)" },
    { name: "Thu nhập LĐ/giờ", value: productivityVsIncome.labourIncomePerHourGrowth, fill: "var(--necessary-teal)" },
  ];

  const iloId = "ilo-labour-share";
  const iloMarker = m(iloId);

  return (
    <StationLayout stationCode="TRẠM 02" title="PHÒNG SOI DỮ LIỆU TOÀN CẦU" subtitle="Nhấn Space để reveal · bấm số nguồn để xem chi tiết">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
        <Reveal show={step >= 0}>
          <EvidenceCard
            eyebrow="TỶ TRỌNG THU NHẬP LAO ĐỘNG TOÀN CẦU"
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="red"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={globalLabourShare} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--grid-line)" />
                <XAxis dataKey="year" stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis domain={[52, 54]} stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="value" stroke="var(--surplus-red)" strokeWidth={2} dot={{ r: 3, fill: "var(--surplus-red)" }} />
              </LineChart>
            </ResponsiveContainer>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 1}>
          <EvidenceCard
            eyebrow={`NĂNG SUẤT SO VỚI THU NHẬP · ${productivityVsIncome.period}`}
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="amber"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--grid-line)" />
                <XAxis dataKey="name" stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis stroke="var(--paper)" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `+${v}%`} />
                <Bar dataKey="value">
                  {barData.map((d) => <Cell key={d.name} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", marginTop: 4 }}>
              Khoảng cách: {productivityVsIncome.gap} điểm phần trăm
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 2}>
          <EvidenceCard
            eyebrow="THU NHẬP LAO ĐỘNG BỊ HỤT (2024)"
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="red"
          >
            <div className="flex h-full flex-col justify-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1, color: "var(--surplus-red)" }}>
                {step >= 2 ? <Odometer value={lostLabourIncome.value} decimals={1} /> : "—"}
                <span style={{ fontSize: 28 }}> {lostLabourIncome.unit}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 75%, transparent)", marginTop: 8 }}>
                {lostLabourIncome.description}
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        <Reveal show={step >= 3}>
          <EvidenceCard eyebrow="DIỄN GIẢI" color="teal">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--paper)", lineHeight: 1.6 }}>
              Không phải tiền lương không tăng. Vấn đề là phần lao động nhận được trong "chiếc bánh" mới
              tạo ra <b style={{ color: "var(--surplus-red)" }}>tăng chậm hơn</b> phần thuộc về vốn.
            </p>
          </EvidenceCard>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
