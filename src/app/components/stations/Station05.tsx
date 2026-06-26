import { useState } from "react";
import { motion } from "motion/react";
import { StationLayout } from "../StationLayout";

interface CompanyData {
  name: string;
  productivity: number;
  cost: number;
  price: number;
  profit: number;
  type: "leader" | "average" | "laggard";
}

function ProductivitySlider({ label, value, onChange, min, max, color }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--paper)", letterSpacing: "0.04em" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: color }}>
          {value.toFixed(0)} sản phẩm/giờ
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, var(--grid-line) ${((value - min) / (max - min)) * 100}%, var(--grid-line) 100%)`,
        }}
      />
    </div>
  );
}

function CompanyCard({ company, societyAvg }: { company: CompanyData; societyAvg: number }) {
  const isExtra = company.productivity > societyAvg;
  const isBelow = company.productivity < societyAvg;
  
  const profitColor = isExtra ? "var(--necessary-teal)" : isBelow ? "var(--surplus-red)" : "var(--paper)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(21, 38, 43, 0.98) 0%, rgba(12, 20, 25, 0.99) 100%)",
        border: `1px solid ${isExtra ? "var(--necessary-teal)" : isBelow ? "var(--surplus-red)" : "var(--grid-line)"}`,
        borderRadius: 8,
      }}
    >
      {isExtra && (
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: "radial-gradient(circle at center, var(--necessary-teal) 0%, transparent 70%)" }}
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--paper)" }}>
            {company.name}
          </span>
          {isExtra && (
            <span 
              className="px-2 py-0.5 text-xs"
              style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: 9, 
                letterSpacing: "0.08em",
                background: "rgba(79, 140, 122, 0.3)", 
                color: "var(--necessary-teal)",
                borderRadius: 4,
                border: "1px solid var(--necessary-teal)"
              }}
            >
              SIÊU NGẠCH
            </span>
          )}
        </div>

        <div className="space-y-2 text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--paper)", opacity: 0.8 }}>
          <div className="flex justify-between">
            <span>Năng suất:</span>
            <span style={{ color: company.type === "leader" ? "var(--necessary-teal)" : company.type === "laggard" ? "var(--surplus-red)" : "var(--paper)" }}>
              {company.productivity.toFixed(0)} sp/h
            </span>
          </div>
          <div className="flex justify-between">
            <span>Chi phí CB:</span>
            <span>${company.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Giá thị trường:</span>
            <span>${company.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--grid-line)" }}>
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--paper)" }}>
              Lợi nhuận:
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: profitColor }}>
              ${company.profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CostBar({ cost, price, label, color }: { cost: number; price: number; label: string; color: string }) {
  const maxCost = price * 2;
  const width = Math.min(100, (cost / maxCost) * 100);
  const isAbove = cost > price;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--paper)" }}>
        <span>{label}</span>
        <span style={{ color }}>${cost.toFixed(2)}</span>
      </div>
      <div className="relative h-4 rounded" style={{ background: "var(--grid-line)" }}>
        <motion.div
          className="absolute top-0 bottom-0 rounded"
          style={{ background: isAbove ? color : "var(--necessary-teal)", left: 0, width: `${width}%` }}
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

export function Station05() {
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

  const explanation = leaderProductivity > societyAvg
    ? "Doanh nghiệp dẫn đầu có năng suất cao hơn mức xã hội → chi phí cá biệt thấp hơn giá thị trường → lợi nhuận siêu ngạch!"
    : "Tăng năng suất của doanh nghiệp dẫn đầu để thấy cơ chế siêu ngạch hoạt động.";

  return (
    <StationLayout stationCode="TRẠM 05" title="THẶNG DƯ" subtitle="Tương tác để hiểu cơ chế siêu ngạch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4">
        {/* Interactive Controls */}
        <div className="space-y-6">
          <div 
            className="p-5"
            style={{ 
              background: "var(--ink)", 
              border: "1px solid var(--grid-line)", 
              borderRadius: 8 
            }}
          >
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 4 }}>
              ĐIỀU CHỈNH NĂNG SUẤT
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--paper)", opacity: 0.7, marginBottom: 20 }}>
              Kéo thanh trượt để thay đổi năng suất của từng doanh nghiệp
            </p>

            <div className="space-y-6">
              <ProductivitySlider
                label="Doanh nghiệp Dẫn đầu (công nghệ vượt trội)"
                value={leaderProductivity}
                onChange={setLeaderProductivity}
                min={50}
                max={150}
                color="var(--necessary-teal)"
              />
              <ProductivitySlider
                label="Doanh nghiệp Trung bình (mức xã hội)"
                value={avgProductivity}
                onChange={setAvgProductivity}
                min={50}
                max={150}
                color="var(--paper)"
              />
              <ProductivitySlider
                label="Doanh nghiệp Lạc hậu (công nghệ thấp)"
                value={laggardProductivity}
                onChange={setLaggardProductivity}
                min={50}
                max={150}
                color="var(--surplus-red)"
              />
            </div>
          </div>

          <div 
            className="p-4"
            style={{ 
              background: leaderProductivity > societyAvg ? "rgba(79, 140, 122, 0.1)" : "var(--ink)", 
              border: `1px solid ${leaderProductivity > societyAvg ? "var(--necessary-teal)" : "var(--grid-line)"}`, 
              borderRadius: 8 
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: leaderProductivity > societyAvg ? "var(--necessary-teal)" : "var(--amber-signal)" }}>
                GIẢI THÍCH
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--paper)", lineHeight: 1.6 }}>
              {explanation}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 4 }}>
            KẾT QUẢ KINH DOANH
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CompanyCard company={leader} societyAvg={societyAvg} />
            <CompanyCard company={average} societyAvg={societyAvg} />
            <CompanyCard company={laggard} societyAvg={societyAvg} />
          </div>

          <div className="p-4 mt-4 space-y-3" style={{ background: "var(--ink)", border: "1px solid var(--grid-line)", borderRadius: 8 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber-signal)" }}>
              SO SÁNH CHI PHÍ vs GIÁ (vạch vàng = giá thị trường)
            </div>
            <CostBar cost={leader.cost} price={basePrice} label="DN Dẫn đầu" color="var(--necessary-teal)" />
            <CostBar cost={average.cost} price={basePrice} label="DN Trung bình" color="var(--paper)" />
            <CostBar cost={laggard.cost} price={basePrice} label="DN Lạc hậu" color="var(--surplus-red)" />
            <div className="text-center text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--amber-signal)" }}>
              Giá thị trường: ${basePrice.toFixed(2)}
            </div>
          </div>

          <div 
            className="p-4 mt-4"
            style={{ 
              background: "var(--ink)", 
              border: "1px solid var(--grid-line)", 
              borderRadius: 8 
            }}
          >
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--paper)", marginBottom: 3 }}>
              Công thức Siêu ngạch
            </h4>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-signal)", lineHeight: 1.8 }}>
              <div>Chi phí CB = Giá × (NSₓₕ / NSᵢ)</div>
              <div>Lợi nhuận = Giá − Chi phí CB</div>
                <div style={{ marginTop: 4, color: "var(--necessary-teal)" }}>
                  {"Siêu ngạch = Giá − Chi phí CB (khi NSᵢ > NSₓₕ)"}
                </div>
            </div>
          </div>
        </div>
      </div>
    </StationLayout>
  );
}
