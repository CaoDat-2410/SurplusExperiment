import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    text: "Lao động tạo ra giá trị mới trong sản xuất",
    sub: "Không phải trong lưu thông hay trao đổi thuần túy",
  },
  {
    id: 2,
    text: "Tiền lương chỉ trả ngang bằng giá trị sức lao động",
    sub: "Không phải toàn bộ giá trị mà lao động tạo ra",
  },
  {
    id: 3,
    text: "Phần vượt quá tiền lương = giá trị thặng dư",
    sub: "m = giá trị mới − v · Tỷ suất: s/v = t₂/t₁ × 100%",
    highlight: true,
  },
  {
    id: 4,
    text: "Tư bản mở rộng phần này bằng nhiều phương pháp",
    sub: "Kéo dài giờ làm · Tăng năng suất · Ép lương · Tự động hóa · Thuê ngoài",
  },
  {
    id: 5,
    text: "Câu hỏi thực tiễn: ai nhận phần tăng trưởng?",
    sub: "Năng suất tăng ≠ lao động tự động hưởng phần lớn hơn",
    highlight: true,
  },
];

export function LogicMap({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full w-full flex-col px-16 pb-6 pt-10">
      <header className="mb-6 flex items-baseline gap-4 border-b pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          BẢN ĐỒ LOGIC
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 44, lineHeight: 1, color: "var(--paper)" }}>
          CẤU TRÚC LẬP LUẬN CỦA BÀI
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="flex w-full items-stretch gap-0">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-stretch gap-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.1, ease: "linear" }}
                className="flex flex-1 flex-col justify-between p-5"
                style={{
                  border: `1px solid ${s.highlight ? "var(--amber-signal)" : "var(--grid-line)"}`,
                  borderRadius: 4,
                  background: s.highlight
                    ? "color-mix(in srgb, var(--amber-signal) 8%, var(--ink))"
                    : "color-mix(in srgb, var(--paper) 4%, var(--ink))",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: s.highlight ? "var(--amber-signal)" : "var(--grid-line)",
                    marginBottom: 10,
                  }}
                >
                  {String(s.id).padStart(2, "0")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 20,
                      lineHeight: 1.15,
                      color: s.highlight ? "var(--amber-signal)" : "var(--paper)",
                      marginBottom: 10,
                    }}
                  >
                    {s.text}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "color-mix(in srgb, var(--paper) 60%, transparent)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              </motion.div>

              {/* connector arrow between steps */}
              {i < steps.length - 1 && (
                <div className="flex items-center px-2" style={{ color: "var(--grid-line)" }}>
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
          Mỗi trạm trong bài tương ứng với một bước trong chuỗi lập luận này.
        </p>
        <button
          onClick={onNext}
          className="svl-press focus-amber flex items-center gap-2 px-6 py-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.08em",
            color: "var(--ink)",
            background: "var(--amber-signal)",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          VÀO TRẠM 01 <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
