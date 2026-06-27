import { CornerDownLeft } from "lucide-react";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-16 text-center">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.24em", color: "var(--amber-signal)" }}>
        THÍ NGHIỆM KINH TẾ TƯƠNG TÁC
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 80, lineHeight: 0.92, color: "var(--paper)", margin: "12px 0" }}>
        PHÒNG THÍ NGHIỆM
        <br />
        GIÁ TRỊ THẶNG DƯ
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "color-mix(in srgb, var(--paper) 75%, transparent)" }}>
        Bản chất &amp; các phương pháp sản xuất giá trị thặng dư
      </p>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 40,
          color: "var(--surplus-red)",
          margin: "24px 0 32px",
        }}
      >
        AI NHẬN PHẦN GIÁ TRỊ TĂNG THÊM?
      </div>
      <button
        onClick={onStart}
        className="svl-press focus-amber flex items-center gap-3 px-8 py-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.08em", color: "var(--ink)", background: "var(--amber-signal)", border: "1px solid var(--ink)", borderRadius: 4, cursor: "pointer" }}
      >
        <CornerDownLeft size={18} /> NHẤN ENTER ĐỂ BẮT ĐẦU
      </button>
      <div className="mt-8" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grid-line)" }}>
        ← → chuyển phần · Space hiện nội dung · R đặt lại · F toàn màn hình · H trợ giúp
      </div>
    </div>
  );
}
