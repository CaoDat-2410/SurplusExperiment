import { X } from "lucide-react";
import { citations, Citation } from "./data/citations";

// Per-citation detail: what data is used and how
const details: Record<string, { dataPoints: string[]; usage: string }> = {
  "ilo-labour-share": {
    dataPoints: [
      "2004: 53,9% — tỷ trọng thu nhập lao động toàn cầu",
      "2019: 53,0% — mốc trước đại dịch",
      "2022: 52,3% — đáy sau đại dịch",
      "2024: 52,4% — ước tính gần đây",
      "2025: 52,6% — ước tính cập nhật",
      "Năng suất lao động/giờ 2004–2024: +58%",
      "Thu nhập lao động/giờ 2004–2024: +53%",
      "Thu nhập lao động bị hụt năm 2024: ~2,4 nghìn tỷ USD",
    ],
    usage:
      "Dùng để chứng minh phần lao động nhận được trong tổng giá trị mới tạo ra tăng chậm hơn phần thuộc về vốn — minh họa trực tiếp xu hướng giá trị thặng dư tương đối trong dài hạn.",
  },
  "world-bank-vietnam-automation": {
    dataPoints: [
      "Chi phí lao động sản xuất Việt Nam 2022: 4,9 USD/giờ (gần gấp ba 2010–2022)",
      "Năng suất sản xuất Việt Nam 2022: 6,7 USD giá trị gia tăng/giờ",
      "So sánh: Trung Quốc 14,4 · Malaysia 27,7 (cùng đơn vị)",
      "Mật độ robot Việt Nam 2022: 7 robot/1.000 lao động sản xuất",
      "Tăng trưởng thị trường robot 2024: +27%",
      "Tác động robot hóa: việc làm +10%, thu nhập +5%",
      "Lợi ích chủ yếu thuộc lao động trung và cao kỹ năng",
      "Việc làm phi chính thức 2024: 64,6%",
      "Lao động sản xuất kỹ năng thấp 2021: ~85%; kỹ năng cao: <6%",
    ],
    usage:
      "Dùng để liên hệ lý thuyết giá trị thặng dư tương đối với thực tiễn Việt Nam — tự động hóa rút ngắn t₁ nhưng lợi ích phân phối không đồng đều giữa các nhóm kỹ năng.",
  },
  "ifr-robot-density": {
    dataPoints: [
      "Mật độ robot toàn cầu ~7 năm trước 2023: 74 robot/10.000 lao động sản xuất",
      "Mật độ robot toàn cầu 2023: 162 robot/10.000 lao động sản xuất",
      "Mật độ robot toàn cầu 2024: 177 robot/10.000 lao động sản xuất",
    ],
    usage:
      "Dùng để minh họa tốc độ tăng tự động hóa toàn cầu — bối cảnh cho case Việt Nam và lập luận về giá trị thặng dư tương đối qua công nghệ.",
  },
  "oecd-labour-share": {
    dataPoints: [
      "Phân tích tỷ trọng lao động và capital deepening theo OECD",
      "Nghiên cứu phân phối thành quả năng suất giữa lao động và vốn",
    ],
    usage:
      "Bối cảnh học thuật bổ sung cho xu hướng labour share toàn cầu, kiểm chứng chéo với số liệu ILO.",
  },
  "bea-us-profits": {
    dataPoints: [
      "Lợi nhuận doanh nghiệp Mỹ 2024: 3.801,8 tỷ USD",
      "Lợi nhuận doanh nghiệp Mỹ 2025: 4.077,5 tỷ USD",
      "Lợi nhuận doanh nghiệp Mỹ Q1 2026 (mức quy năm): 4.392,5 tỷ USD",
    ],
    usage:
      "Minh họa xu hướng lợi nhuận doanh nghiệp tăng trong khi labour share giảm — bổ sung cho lập luận về phân phối giá trị thặng dư.",
  },
  "pdf-source": {
    dataPoints: [
      "Bản chất của giá trị thặng dư (mục 3.1.2)",
      "Giá trị thặng dư tuyệt đối: kéo dài ngày lao động",
      "Giá trị thặng dư tương đối: tăng năng suất, rút ngắn t₁",
      "Công thức: t = t₁ + t₂; s/v = t₂/t₁ × 100%",
    ],
    usage:
      "Nguồn lý thuyết chính của bài. Toàn bộ khái niệm, công thức và định nghĩa trong web đều xuất phát từ tài liệu này.",
  },
};

interface SourceDrawerProps {
  citationId: string;
  onClose: () => void;
}

export function SourceDrawer({ citationId, onClose }: SourceDrawerProps) {
  const cit = citations.find((c) => c.id === citationId);
  const det = details[citationId];
  if (!cit) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-start justify-end"
      onClick={onClose}
    >
      <div
        className="h-full w-[420px] overflow-auto p-6"
        style={{
          background: "var(--ink)",
          borderLeft: "1px solid var(--amber-signal)",
          boxShadow: "-4px 0 24px color-mix(in srgb, var(--ink) 80%, transparent)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--amber-signal)", marginBottom: 4 }}>
              NGUỒN {cit.marker}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--paper)", lineHeight: 1.2 }}>
              {cit.label}
            </div>
          </div>
          <button onClick={onClose} className="focus-amber mt-1 shrink-0" style={{ color: "var(--surplus-red)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* data points */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--amber-signal)", marginBottom: 8 }}>
          SỐ LIỆU SỬ DỤNG
        </div>
        <ul className="mb-5 flex flex-col gap-2">
          {det?.dataPoints.map((d, i) => (
            <li
              key={i}
              className="flex gap-2"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--paper)", lineHeight: 1.5 }}
            >
              <span style={{ color: "var(--necessary-teal)", flexShrink: 0 }}>·</span>
              {d}
            </li>
          ))}
          {!det && (
            <li style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
              Xem chi tiết trong tài liệu nguồn.
            </li>
          )}
        </ul>

        {/* usage */}
        {det?.usage && (
          <>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--amber-signal)", marginBottom: 8 }}>
              CÁCH DÙNG TRONG BÀI
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 80%, transparent)", lineHeight: 1.65 }}>
              {det.usage}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// Inline citation badge that opens the drawer
interface CiteBadgeProps {
  id: string;
  marker: string;
  onOpen: (id: string) => void;
}

export function CiteBadge({ id, marker, onOpen }: CiteBadgeProps) {
  return (
    <button
      onClick={() => onOpen(id)}
      className="focus-amber svl-press"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--amber-signal)",
        border: "1px solid var(--amber-signal)",
        borderRadius: 3,
        padding: "1px 5px",
        cursor: "pointer",
        lineHeight: 1,
      }}
      title={`Xem nguồn ${marker}`}
    >
      {marker}
    </button>
  );
}
