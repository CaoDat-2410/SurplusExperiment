import { StationLayout } from "../StationLayout";
import { citations } from "../data/citations";

const rows = [
  {
    id: "chatgpt",
    tool: "ChatGPT",
    purpose: "Gợi ý cấu trúc web, tổng hợp nội dung lý thuyết, hỗ trợ viết PRD",
    prompt: "Tạo đặc tả web tương tác về giá trị thặng dư",
    edits: "Sinh viên chọn concept, chỉnh câu chữ, kiểm chứng nguồn",
  },
  {
    id: "figma",
    tool: "Figma AI",
    purpose: "Hỗ trợ dựng wireframe theo mô tả",
    prompt: "Thiết kế web app dạng bảng điều khiển công nghiệp",
    edits: "Sinh viên chỉnh layout, màu, spacing, thứ tự trạm",
  },
  {
    id: "cursor",
    tool: "Cursor / Claude",
    purpose: "Hỗ trợ code component FE",
    prompt: "Xây website thuyết trình tương tác",
    edits: "Sinh viên kiểm tra logic, sửa UI, test demo",
  },
  {
    id: "docs",
    tool: "Tài liệu thư viện",
    purpose: "Hỗ trợ biểu đồ và hoạt ảnh",
    prompt: "N/A",
    edits: "Sinh viên tự triển khai trong source code",
  },
];

export function AiUsage() {
  return (
    <StationLayout stationCode="PHỤ LỤC" title="MINH BẠCH SỬ DỤNG AI" subtitle="Minh bạch · trách nhiệm · liêm chính học thuật">
      <div className="grid min-h-full grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="xl:col-span-2 card-paper overflow-auto p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 border-b pb-2 hidden sm:grid" style={{ borderColor: "var(--grid-line)", fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.8vw, 11px)", color: "var(--ink)" }}>
            <span>CÔNG CỤ</span>
            <span>MỤC ĐÍCH</span>
            <span>CÂU LỆNH</span>
            <span>CHỈNH SỬA</span>
          </div>
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 border-b py-3" style={{ borderColor: "color-mix(in srgb, var(--grid-line) 40%, transparent)", fontFamily: "var(--font-body)", fontSize: "clamp(12px, 1.8vw, 13px)", color: "var(--ink)" }}>
              <span style={{ fontWeight: 600 }}>{r.tool}</span>
              <span className="sm:hidden" style={{ fontWeight: 600, color: "var(--amber-signal)", fontSize: 10 }}>MỤC ĐÍCH:</span>
              <span>{r.purpose}</span>
              <span className="sm:hidden" style={{ fontWeight: 600, color: "var(--amber-signal)", fontSize: 10 }}>CHỈNH SỬA:</span>
              <span>{r.edits}</span>
            </div>
          ))}
          <div className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.8vw, 11px)", color: "var(--ink)", lineHeight: 1.6 }}>
            <strong>CAM KẾT:</strong> AI chỉ là công cụ hỗ trợ · nhóm không để AI làm thay toàn bộ sản phẩm · toàn bộ số liệu được đối chiếu với tài liệu nguồn · nhóm chịu trách nhiệm nội dung cuối.
          </div>
        </div>

        <div className="card-industrial overflow-auto p-4 sm:p-5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.8vw, 12px)", letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10 }}>
            NGUỒN SỐ LIỆU
          </div>
          <ul className="flex flex-col gap-3">
            {citations.map((c) => (
              <li key={c.id}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--amber-signal)", marginRight: 6 }}>{c.marker}</span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--paper)" }}>{c.label}</span>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>{c.usedFor}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StationLayout>
  );
}
