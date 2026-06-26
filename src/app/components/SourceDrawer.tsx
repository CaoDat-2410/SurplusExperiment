import { X } from "lucide-react";
import { citations, Citation } from "./data/citations";

// Per-citation detail: what data is used and how
const details: Record<string, { dataPoints: string[]; usage: string }> = {
  "oxfam-2024": {
    dataPoints: [
      "Tài sản tỷ phú toàn cầu tăng thêm 2.000 tỷ USD chỉ trong năm 2024.",
      "Tạo ra trung bình 4 tỷ phú mới mỗi tuần.",
      "60% tài sản này đến từ sức mạnh độc quyền và mối quan hệ, không tương xứng với công sức lao động.",
    ],
    usage:
      "Dùng để chứng minh quy mô của sự bóc lột và lượng giá trị thặng dư (M) tích lũy khổng lồ được dịch chuyển về phía giới chủ tư bản.",
  },
  "bloomberg-2026": {
    dataPoints: [
      "Biên lợi nhuận kỷ lục 14,5% của các tập đoàn thuộc S&P 500 ghi nhận vào Quý 1/2026.",
    ],
    usage:
      "Minh chứng thực tiễn cho thấy khối lượng thặng dư liên tục chuyển dịch từ giai cấp lao động sang giới chủ tư bản.",
  },
  "isaca-2025": {
    dataPoints: [
      "73% chuyên gia IT rơi vào trạng thái kiệt sức (burnout) tại Châu Âu.",
      "61% kiệt sức do khối lượng công việc quá tải và áp lực deadline.",
      "Lập trình viên gỡ lỗi (debug) cường độ cao để tạo ra sản phẩm mà không tăng tư bản khả biến (lương).",
    ],
    usage:
      "Minh họa phương pháp sản xuất giá trị thặng dư tuyệt đối thông qua tăng cường độ lao động gián tiếp trong thời đại số.",
  },
  "shift-tracker-2025": {
    dataPoints: [
      "58% người làm nghề giao hàng phải dùng cùng lúc nhiều ứng dụng (multi-apping).",
      "Làm việc liên tục từ 10-12 tiếng mỗi ngày.",
      "Mức chiết khấu nền tảng chiếm từ 27% đến 37% trên tổng thu nhập.",
    ],
    usage:
      "Minh chứng cho phương pháp thặng dư tuyệt đối bằng cách kéo dài ngày lao động thực tế và vắt kiệt lao động gig.",
  },
  "pwc-2025": {
    dataPoints: [
      "Doanh nghiệp ứng dụng AI tăng năng suất lao động trung bình 40%.",
      "Top 20% doanh nghiệp xuất sắc đạt mức tăng trưởng năng suất 163%.",
      "Tích hợp các trợ lý ảo (GitHub Copilot) rút ngắn đáng kể thời gian hoàn thành module (lao động tất yếu t₁).",
    ],
    usage:
      "Minh họa cho phương pháp sản xuất giá trị thặng dư tương đối bằng cách tăng năng suất lao động xã hội để rút ngắn thời gian tất yếu t₁.",
  },
  "insilico-2025": {
    dataPoints: [
      "Dùng AI đưa thuốc mới từ khâu tìm mục tiêu đến thử nghiệm tiền lâm sàng chỉ mất 18 tháng.",
      "Quy trình trung bình xã hội của ngành tốn từ 3 đến 6 năm.",
      "Rút ngắn thời gian và chi phí khổng lồ tạo ra khoản thặng dư siêu ngạch lớn.",
    ],
    usage:
      "Minh họa trực quan cho giá trị thặng dư siêu ngạch thu được khi hạ giá trị cá biệt thấp hơn giá trị xã hội.",
  },
  "pdf-source": {
    dataPoints: [
      "Bản chất của giá trị thặng dư (Mục 1.2).",
      "Sản xuất giá trị thặng dư tuyệt đối (Mục 1.3.1).",
      "Sản xuất giá trị thặng dư tương đối (Mục 1.3.2).",
      "Giá trị thặng dư siêu ngạch (Mục 1.3.3).",
    ],
    usage:
      "Nguồn lý thuyết cốt lõi của toàn bộ ứng dụng, cung cấp các định nghĩa và công thức toán học Marxian.",
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
