import { StationLayout } from "../StationLayout";
import { citations } from "../data/citations";

const rows = [
  {
    id: "chatgpt",
    tool: "ChatGPT",
    purpose: "Gợi ý cấu trúc web, tổng hợp nội dung lý thuyết, hỗ trợ viết PRD",
    prompt: "“Tạo đặc tả web tương tác về giá trị thặng dư dựa trên PDF số liệu”",
    edits: "Sinh viên chọn concept, chỉnh câu chữ, kiểm chứng nguồn, quyết định nội dung cuối",
  },
  {
    id: "figma",
    tool: "Figma AI",
    purpose: "Hỗ trợ dựng wireframe theo mô tả",
    prompt: "“Thiết kế web app dạng bảng điều khiển công nghiệp về giá trị thặng dư”",
    edits: "Sinh viên chỉnh layout, màu, spacing, thứ tự các phần",
  },
  {
    id: "cursor",
    tool: "Cursor / Claude Code",
    purpose: "Hỗ trợ code component FE",
    prompt: "“Xây website thuyết trình tương tác chỉ chạy phía giao diện”",
    edits: "Sinh viên kiểm tra logic công thức, sửa UI, test demo",
  },
  {
    id: "docs",
    tool: "Tài liệu Recharts / Motion",
    purpose: "Hỗ trợ biểu đồ và hoạt ảnh",
    prompt: "N/A",
    edits: "Sinh viên tự triển khai trong source code",
  },
];

export function AiUsage() {
  return (
    <StationLayout stationCode="PHỤ LỤC" title="MINH BẠCH SỬ DỤNG AI" subtitle="Minh bạch · trách nhiệm · liêm chính học thuật">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 overflow-y-auto py-2">
        <div className="col-span-1 lg:col-span-2 card-paper overflow-auto p-4 md:p-5">
          <div className="hidden md:grid md:grid-cols-4 gap-3 border-b pb-2" style={{ borderColor: "var(--grid-line)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink)" }}>
            <span>CÔNG CỤ</span>
            <span>MỤC ĐÍCH</span>
            <span>CÂU LỆNH CHÍNH</span>
            <span>SINH VIÊN CHỈNH SỬA</span>
          </div>
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 border-b py-3" style={{ borderColor: "color-mix(in srgb, var(--grid-line) 40%, transparent)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink)" }}>
              <span style={{ fontWeight: 600 }} className="md:col-span-1">
                <span className="md:hidden" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grid-line)" }}>CÔNG CỤ: </span>
                {r.tool}
              </span>
              <span className="md:col-span-1">
                <span className="md:hidden" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grid-line)" }}>MỤC ĐÍCH: </span>
                {r.purpose}
              </span>
              <span className="md:col-span-1">
                <span className="md:hidden" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grid-line)" }}>CÂU LỆNH: </span>
                {r.prompt}
              </span>
              <span className="md:col-span-1">
                <span className="md:hidden" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grid-line)" }}>CHỈNH SỬA: </span>
                {r.edits}
              </span>
            </div>
          ))}
          <div className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink)", lineHeight: 1.7 }}>
            CAM KẾT: AI chỉ là công cụ hỗ trợ · nhóm không để AI làm thay toàn bộ sản phẩm ·
            toàn bộ số liệu được đối chiếu với tài liệu nguồn · nhóm chịu trách nhiệm nội dung cuối.
          </div>
        </div>

        <div className="card-industrial overflow-auto p-4 md:p-5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--amber-signal)", marginBottom: 10 }}>
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
