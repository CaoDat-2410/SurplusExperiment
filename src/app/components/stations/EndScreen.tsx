import { RefreshCw } from "lucide-react";

const takeaways = [
  "Giá trị thặng dư là phần giá trị mới vượt quá tiền lương — phần bị nhà tư bản chiếm đoạt trong sản xuất.",
  "Tư bản mở rộng giá trị thặng dư bằng kéo dài giờ làm (tuyệt đối) hoặc tăng năng suất (tương đối) và các hình thức hiện đại khác.",
  "Trong kinh tế hiện đại, vấn đề lớn không phải là có năng suất tăng hay không — mà là thành quả năng suất được phân phối cho ai.",
];

export function EndScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-24 text-center">
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1, color: "var(--paper)" }}>
        HOÀN THÀNH THÍ NGHIỆM
      </div>

      {/* 3 điều cần nhớ */}
      <div className="w-full max-w-3xl text-left">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.12em", color: "var(--amber-signal)", marginBottom: 16 }}>
          3 ĐIỀU CẦN NHỚ
        </div>
        <div className="flex flex-col gap-4">
          {takeaways.map((t, i) => (
            <div key={i} className="flex items-start gap-5">
              <div
                className="shrink-0 pt-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: 40,
                  lineHeight: 1,
                  color: "var(--grid-line)",
                }}
              >
                {i + 1}
              </div>
              <div
                className="card-industrial flex-1 p-4"
                style={{ background: "color-mix(in srgb, var(--paper) 4%, var(--ink))" }}
              >
                <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--paper)", lineHeight: 1.6 }}>
                  {t}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* câu hỏi còn lại */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: 18, maxWidth: 640, color: "color-mix(in srgb, var(--paper) 70%, transparent)", lineHeight: 1.6 }}>
        Câu hỏi còn lại: nếu năng suất tăng, làm thế nào để thành quả đó được
        <b style={{ color: "var(--amber-signal)" }}> phân phối công bằng hơn?</b>
      </p>

      <button
        onClick={onReset}
        className="svl-press focus-amber flex items-center gap-3 px-8 py-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: "0.08em", color: "var(--ink)", background: "var(--amber-signal)", border: "1px solid var(--ink)", borderRadius: 4, cursor: "pointer" }}
      >
        <RefreshCw size={18} /> CHẠY LẠI THÍ NGHIỆM
      </button>
    </div>
  );
}
