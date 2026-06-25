import { CornerDownLeft } from "lucide-react";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 text-center">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2vw, 14px)", letterSpacing: "clamp(0.1em, 0.24em, 0.24em)", color: "var(--amber-signal)" }}>
        THÍ NGHIỆM KINH TẾ TƯƠNG TÁC
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px, 8vw, 80px)", lineHeight: 0.95, color: "var(--paper)", margin: "10px 0" }}>
        PHÒNG THÍ NGHIỆM
        <br />
        GIÁ TRỊ THẶNG DƯ
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2.5vw, 18px)", color: "color-mix(in srgb, var(--paper) 75%, transparent)", maxWidth: 600 }}>
        Bản chất & các phương pháp sản xuất giá trị thặng dư
      </p>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(18px, 5vw, 40px)",
          color: "var(--surplus-red)",
          margin: "16px 0 24px",
        }}
      >
        AI NHẬN PHẦN GIÁ TRỊ TĂNG THÊM?
      </div>
      <button
        onClick={onStart}
        className="svl-press focus-amber flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 2vw, 16px)", letterSpacing: "0.08em", color: "var(--ink)", background: "var(--amber-signal)", border: "1px solid var(--ink)", borderRadius: 4, cursor: "pointer" }}
      >
        <CornerDownLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> 
        <span className="hidden xs:inline">NHẤN </span>ENTER ĐỂ BẮT ĐẦU
      </button>
      <div className="mt-6 sm:mt-8 hidden sm:block" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 40%, transparent)" }}>
        ← → chuyển trạm · Space hiện nội dung · R đặt lại · F toàn màn hình · H trợ giúp
      </div>
    </div>
  );
}
