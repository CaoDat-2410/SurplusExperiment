import { useState } from "react";
import { motion } from "motion/react";
import { StationLayout } from "../StationLayout";
import { useRevealStep } from "../lib/useDeck";
import { Odometer } from "../effects/Odometer";
import { theoryContent } from "../data/theoryContent";

// Interfaces cho Mô phỏng Siêu ngạch
interface CompanyData {
  name: string;
  productivity: number;
  cost: number;
  price: number;
  profit: number;
  type: "leader" | "average" | "laggard";
}

// Slider điều chỉnh năng suất
function ProductivitySlider({
  label,
  value,
  onChange,
  min,
  max,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--paper)", opacity: 0.85 }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", color, fontWeight: 700 }}>
          {value.toFixed(0)} sp/h
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, var(--grid-line) ${((value - min) / (max - min)) * 100}%, var(--grid-line) 100%)`,
        }}
      />
    </div>
  );
}

// Thẻ hiển thị thông tin từng Doanh nghiệp
function CompanyCard({ company, societyAvg }: { company: CompanyData; societyAvg: number }) {
  const isExtra = company.productivity > societyAvg;
  const isBelow = company.productivity < societyAvg;
  const profitColor = isExtra ? "var(--necessary-teal)" : isBelow ? "var(--surplus-red)" : "var(--paper)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-3.5 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(21, 38, 43, 0.98) 0%, rgba(12, 20, 25, 0.99) 100%)",
        border: `1px solid ${isExtra ? "var(--necessary-teal)" : isBelow ? "var(--surplus-red)" : "var(--grid-line)"}`,
        borderRadius: 6,
      }}
    >
      {isExtra && (
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ background: "radial-gradient(circle at center, var(--necessary-teal) 0%, transparent 70%)" }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "var(--paper)" }}>
            {company.name}
          </span>
          {isExtra && (
            <span
              className="px-1.5 py-0.5 text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.04em",
                background: "rgba(79, 140, 122, 0.25)",
                color: "var(--necessary-teal)",
                borderRadius: 3,
                border: "1px solid var(--necessary-teal)",
              }}
            >
              SIÊU NGẠCH
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "var(--paper)", opacity: 0.8 }}>
          <div className="flex justify-between">
            <span>Năng suất:</span>
            <span style={{ color: company.type === "leader" ? "var(--necessary-teal)" : company.type === "laggard" ? "var(--surplus-red)" : "var(--paper)", fontWeight: 700 }}>
              {company.productivity.toFixed(0)} sp/h
            </span>
          </div>
          <div className="flex justify-between">
            <span>Chi phí CB:</span>
            <span>${company.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Giá xã hội:</span>
            <span>${company.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t" style={{ borderColor: "var(--grid-line)" }}>
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>
              Lợi nhuận:
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: profitColor }}>
              ${company.profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Thanh so sánh Chi phí vs Giá thị trường
function CostBar({ cost, price, label, color }: { cost: number; price: number; label: string; color: string }) {
  const maxCost = price * 2;
  const width = Math.min(100, (cost / maxCost) * 100);
  const isAbove = cost > price;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "var(--paper)" }}>
        <span>{label}</span>
        <span style={{ color, fontWeight: 700 }}>${cost.toFixed(2)}</span>
      </div>
      <div className="relative h-3 rounded" style={{ background: "var(--grid-line)" }}>
        <motion.div
          className="absolute top-0 bottom-0 rounded"
          style={{ background: isAbove ? "var(--surplus-red)" : color, left: 0, width: `${width}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.3 }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{ background: "var(--amber-signal)", left: `${(price / maxCost) * 100}%` }}
        />
      </div>
    </div>
  );
}

const classicalReveals = [
  ["Giá trị cá biệt hàng hóa", "<", "Giá trị thị trường hàng hóa"],
  ["Năng suất cá biệt tăng vượt trội", "→", "Đạt giá trị thặng dư siêu ngạch"],
  ["Hình thái mang tính chất tạm thời", "nhưng", "Cạnh tranh công nghệ là phổ biến"],
];

export function Station04({ revealTick, resetTick }: { revealTick: number; resetTick: number }) {
  const step = useRevealStep(4, revealTick, resetTick);
  const extraSection = theoryContent.find((s) => s.type === "extra")!;

  // State điều khiển mô phỏng tương tác
  const [leaderProductivity, setLeaderProductivity] = useState(120);
  const [avgProductivity, setAvgProductivity] = useState(80);
  const [laggardProductivity, setLaggardProductivity] = useState(50);

  const societyAvg = avgProductivity;
  const basePrice = 2.5;

  const calculateCompany = (productivity: number): CompanyData => {
    const cost = basePrice * (societyAvg / productivity);
    const profit = basePrice - cost;

    let type: "leader" | "average" | "laggard" = "average";
    if (productivity > societyAvg * 1.1) type = "leader";
    else if (productivity < societyAvg * 0.9) type = "laggard";

    let name = "Doanh nghiệp TB";
    if (type === "leader") name = "Doanh nghiệp Dẫn đầu";
    else if (type === "laggard") name = "Doanh nghiệp Lạc hậu";

    return {
      name,
      productivity,
      cost,
      price: basePrice,
      profit,
      type,
    };
  };

  const leader = calculateCompany(leaderProductivity);
  const average = calculateCompany(avgProductivity);
  const laggard = calculateCompany(laggardProductivity);

  const isExtraActive = leaderProductivity > societyAvg;

  return (
    <StationLayout stationCode="TRẠM 04" title={extraSection.title} subtitle="Space để reveal từng luận điểm → mô phỏng siêu ngạch tương tác">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 overflow-y-auto py-2">
        {/* Cột trái (7 cột): Reveals lý thuyết & Thực tiễn */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
          <motion.div
            initial={false}
            animate={{ opacity: step >= 0 ? 1 : 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700 }}
          >
            PHẦN A: LÝ THUYẾT CỐT LÕI
          </motion.div>

          {/* Luận điểm lý thuyết */}
          {classicalReveals.map((block, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0.1, x: step >= i ? 0 : -12 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="pl-4"
              style={{ borderLeft: "2px solid var(--grid-line)" }}
            >
              {block.map((line, j) => {
                const isConnector = line === "<" || line === "→" || line === "nhưng";
                return (
                  <span
                    key={j}
                    style={{
                      fontFamily: isConnector ? "var(--font-mono)" : "var(--font-display)",
                      fontWeight: 800,
                      fontSize: isConnector ? 18 : 16,
                      lineHeight: 1.1,
                      color: isConnector ? "var(--surplus-red)" : "var(--paper)",
                      marginRight: 10,
                      display: "inline-block",
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </motion.div>
          ))}

          <motion.div
            initial={false}
            animate={{ opacity: step >= 3 ? 1 : 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", color: "var(--amber-signal)", fontWeight: 700, marginTop: 8 }}
          >
            PHẦN B: THỰC TIỄN 2024-2026
          </motion.div>

          {/* Dẫn chứng Insilico Medicine */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 3 ? 1 : 0.1, x: step >= 3 ? 0 : -12 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="pl-4 p-5 card-industrial"
            style={{ borderLeft: "4px solid var(--surplus-red)", background: "color-mix(in srgb, var(--ink) 40%, transparent)" }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--grid-line)", fontWeight: 700, marginBottom: 6 }}>
              INSILICO MEDICINE
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color: "var(--amber-signal)", lineHeight: 1.1 }}>
              Rút ngắn <Odometer value={3} decimals={0} />-<Odometer value={6} decimals={0} /> năm còn <Odometer value={18} decimals={0} suffix=" tháng!" />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--paper)", marginTop: 6, lineHeight: 1.4 }}>
              Ứng dụng AI giúp rút ngắn chu kỳ R&D Y sinh học thay vì 3-6 năm như quy trình tiêu chuẩn, mang lại thặng dư siêu ngạch vượt trội trước khi công nghệ được phổ biến xã hội.
            </p>
          </motion.div>
        </div>

        {/* Cột phải (5 cột): Mô phỏng tương tác */}
        <motion.div
          className="col-span-1 md:col-span-5 flex flex-col gap-4"
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0.1 }}
          transition={{ duration: 0.3, ease: "linear" }}
        >
          {/* Slider điều khiển */}
          <div
            className="p-4"
            style={{
              background: "var(--ink)",
              border: "1px solid var(--grid-line)",
              borderRadius: 6,
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--amber-signal)", fontWeight: 700, marginBottom: 2 }}>
              ĐIỀU CHỈNH NĂNG SUẤT
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--paper)", opacity: 0.65, marginBottom: 12 }}>
              Kéo sliders để thay đổi năng suất lao động cá biệt của doanh nghiệp
            </div>

            <div className="space-y-4">
              <ProductivitySlider
                label="DN Dẫn đầu (Công nghệ vượt trội)"
                value={leaderProductivity}
                onChange={setLeaderProductivity}
                min={50}
                max={150}
                color="var(--necessary-teal)"
              />
              <ProductivitySlider
                label="DN Trung bình (Năng suất xã hội)"
                value={avgProductivity}
                onChange={setAvgProductivity}
                min={50}
                max={150}
                color="var(--paper)"
              />
              <ProductivitySlider
                label="DN Lạc hậu (Công nghệ lạc hậu)"
                value={laggardProductivity}
                onChange={setLaggardProductivity}
                min={50}
                max={150}
                color="var(--surplus-red)"
              />
            </div>
          </div>

          {/* So sánh Chi phí vs Giá */}
          <div className="p-4 space-y-2.5" style={{ background: "var(--ink)", border: "1px solid var(--grid-line)", borderRadius: 6 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--amber-signal)", fontWeight: 700 }}>
              SO SÁNH CHI PHÍ (vạch vàng = giá thị trường xã hội)
            </div>
            <CostBar cost={leader.cost} price={basePrice} label="DN Dẫn đầu" color="var(--necessary-teal)" />
            <CostBar cost={average.cost} price={basePrice} label="DN Trung bình" color="var(--paper)" />
            <CostBar cost={laggard.cost} price={basePrice} label="DN Lạc hậu" color="var(--surplus-red)" />
            <div className="text-center text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--amber-signal)" }}>
              Giá thị trường: ${basePrice.toFixed(2)} / sản phẩm
            </div>
          </div>

          {/* Bảng kết quả kinh doanh */}
          <div className="grid grid-cols-3 gap-2">
            <CompanyCard company={leader} societyAvg={societyAvg} />
            <CompanyCard company={average} societyAvg={societyAvg} />
            <CompanyCard company={laggard} societyAvg={societyAvg} />
          </div>

          {/* Giải thích cơ chế siêu ngạch */}
          <div
            className="p-3 text-[12px]"
            style={{
              background: isExtraActive ? "rgba(79, 140, 122, 0.08)" : "var(--ink)",
              border: `1px solid ${isExtraActive ? "var(--necessary-teal)" : "var(--grid-line)"}`,
              borderRadius: 6,
              lineHeight: 1.45,
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: isExtraActive ? "var(--necessary-teal)" : "var(--amber-signal)", fontWeight: 700 }}>
                GIẢI THÍCH CƠ CHẾ
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--paper)" }}>
              {isExtraActive
                ? "Doanh nghiệp Dẫn đầu có năng suất cá biệt vượt trội → Chi phí sản xuất cá biệt thấp hơn giá xã hội → Thu về Giá trị thặng dư siêu ngạch!"
                : "Tăng năng suất của Doanh nghiệp Dẫn đầu vượt quá mức trung bình xã hội để kích hoạt thặng dư siêu ngạch."}
            </p>
          </div>
        </motion.div>
      </div>
    </StationLayout>
  );
}
