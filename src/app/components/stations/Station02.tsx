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
import { TrendingDown, AlertTriangle } from "lucide-react";

const COLORS = {
  surplusRed: "#b91c1c",
  necessaryTeal: "#0d9488",
  amberSignal: "#e3a23c",
  paper: "#ece7d3",
  gridLine: "rgba(236, 231, 211, 0.15)",
};

const tooltipStyle = {
  background: "rgba(12, 20, 25, 0.98)",
  border: `1px solid ${COLORS.amberSignal}`,
  borderRadius: 6,
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: COLORS.paper,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle} className="px-3 py-2">
        <p style={{ color: COLORS.amberSignal, marginBottom: 4 }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || COLORS.paper, fontSize: 13 }}>
            {entry.name}: <strong>+{entry.value}%</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Reveal({ show, children, className = "" }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0.12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={"h-full " + className}
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
    { name: "Năng suất", value: 58, fill: COLORS.surplusRed },
    { name: "Thu nhập LĐ", value: 53, fill: COLORS.necessaryTeal },
  ];

  const iloId = "ilo-labour-share";
  const iloMarker = m(iloId);

  return (
    <StationLayout stationCode="TRẠM 02" title="PHÒNG SOI DỮ LIỆU TOÀN CẦU" subtitle="Nhấn Space để reveal · bấm số nguồn để xem chi tiết">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${COLORS.amberSignal}10 0%, transparent 50%)`,
        }}
      />

      <div className="grid min-h-full grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        {/* Card 1: Labour Share Line Chart */}
        <Reveal show={step >= 0} className="min-h-[340px] sm:min-h-[360px] lg:min-h-0">
          <EvidenceCard
            eyebrow="TỶ TRỌNG THU NHẬP LAO ĐỘNG TOÀN CẦU"
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="red"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={globalLabourShare} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
                <XAxis dataKey="year" stroke={COLORS.paper} tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis domain={[52, 54]} stroke={COLORS.paper} tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`]} />
                <Line type="monotone" dataKey="value" stroke={COLORS.surplusRed} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.surplusRed }} />
              </LineChart>
            </ResponsiveContainer>
          </EvidenceCard>
        </Reveal>

        {/* Card 2: Productivity vs Income Bar Chart */}
        <Reveal show={step >= 1} className="min-h-[290px] sm:min-h-[320px] lg:min-h-0">
          <EvidenceCard
            eyebrow={`NĂNG SUẤT SO VỚI THU NHẬP · ${productivityVsIncome.period}`}
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="amber"
          >
            <div className="relative flex h-full min-h-[240px] flex-col sm:min-h-[270px] lg:min-h-0">
              <div className="min-h-[180px] flex-1 sm:min-h-[210px] lg:min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
                  <XAxis dataKey="name" stroke={COLORS.paper} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                  <YAxis stroke={COLORS.paper} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={96} label={{ position: 'top', fill: COLORS.paper, fontSize: 13 }}>
                    {barData.map((d, idx) => (
                      <Cell key={`cell-${idx}`} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
              
              <div 
                className="mt-3 flex items-center justify-center gap-2 py-3"
                style={{ borderTop: `1px solid ${COLORS.gridLine}` }}
              >
                <AlertTriangle size={16} style={{ color: COLORS.amberSignal }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3.2vw, 14px)", color: COLORS.amberSignal, fontWeight: 600 }}>
                  Khoảng cách: {productivityVsIncome.gap} điểm phần trăm
                </span>
              </div>
            </div>
          </EvidenceCard>
        </Reveal>

        {/* Card 3: Lost Labour Income */}
        <Reveal show={step >= 2} className="min-h-[220px] sm:min-h-[240px] lg:min-h-0">
          <EvidenceCard
            eyebrow="THU NHẬP LAO ĐỘNG BỊ HỤT (2024)"
            sourceId={iloId} sourceMarker={iloMarker} onOpenSource={setOpenSource}
            color="red"
          >
            <div className="flex h-full flex-col justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={step >= 2 ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="relative"
              >
                <div 
                  className="absolute -inset-4 rounded-lg"
                  style={{
                    background: `radial-gradient(ellipse at center, ${COLORS.surplusRed}30 0%, transparent 70%)`,
                    filter: "blur(10px)",
                  }}
                />
                
                <div style={{ 
                  fontFamily: "var(--font-display)", 
                  fontWeight: 900, 
                  fontSize: "clamp(32px, 6vw, 48px)", 
                  lineHeight: 1, 
                  color: COLORS.surplusRed,
                  textShadow: `0 0 30px ${COLORS.surplusRed}80`,
                }}>
                  {step >= 2 ? <Odometer value={lostLabourIncome.value} decimals={1} /> : "—"}
                  <span style={{ fontSize: "clamp(16px, 3vw, 20px)" }}> {lostLabourIncome.unit}</span>
                </div>
              </motion.div>
              
              <p style={{ 
                fontFamily: "var(--font-body)", 
                fontSize: 12, 
                color: COLORS.paper, 
                marginTop: 10,
                lineHeight: 1.4,
                opacity: 0.85,
              }}>
                {lostLabourIncome.description}
              </p>
            </div>
          </EvidenceCard>
        </Reveal>

        {/* Card 4: Interpretation */}
        <Reveal show={step >= 3} className="min-h-[260px] sm:min-h-[280px] lg:min-h-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={step >= 3 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <EvidenceCard eyebrow="DIỄN GIẢI" color="teal">
              <div className="relative h-full flex flex-col justify-center">
                <div 
                  className="absolute -inset-px rounded-lg pointer-events-none"
                  style={{
                    border: `2px solid ${COLORS.amberSignal}`,
                    boxShadow: `0 0 25px ${COLORS.amberSignal}40, inset 0 0 20px ${COLORS.amberSignal}10`,
                    borderRadius: 10,
                  }}
                />
                
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={step >= 3 ? { rotate: 0, scale: 1 } : {}}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <TrendingDown size={18} style={{ color: COLORS.amberSignal }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: COLORS.amberSignal }}>
                    KEY INSIGHT
                  </span>
                </motion.div>
                
                <p style={{ 
                  fontFamily: "var(--font-body)", 
                  fontSize: 14, 
                  color: COLORS.paper, 
                  lineHeight: 1.5 
                }}>
                  Không phải tiền lương không tăng. Vấn đề là phần lao động nhận được trong "chiếc bánh" mới
                  tạo ra <strong style={{ color: COLORS.surplusRed, textShadow: `0 0 10px ${COLORS.surplusRed}80` }}>tăng chậm hơn</strong> phần thuộc về vốn.
                </p>
              </div>
            </EvidenceCard>
          </motion.div>
        </Reveal>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}
