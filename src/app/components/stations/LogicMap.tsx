import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

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
    <div className="flex min-h-screen w-full flex-col px-4 md:px-16 pb-24 pt-10">
      <header className="mb-6 flex flex-col md:flex-row md:items-baseline gap-4 border-b pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          BẢN ĐỒ LOGIC
        </span>
        <h1 className="text-[28px] md:text-[44px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1, color: "var(--paper)" }}>
          CẤU TRÚC LẬP LUẬN CỦA BÀI
        </h1>
      </header>

      <div className="flex flex-1 items-center">
        <div className="flex w-full flex-col md:flex-row items-stretch gap-2 md:gap-0">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col md:flex-row items-stretch flex-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.1, ease: "linear" }}
                className="card-industrial flex flex-1 flex-col p-4 md:p-5 m-1"
                style={{justifyContent: "space-between"}}
              >
                <div
                  className="card-number"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(s.id).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <div
                    className="card-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 16,
                      lineHeight: 1.15,
                    }}
                  >
                    {s.text}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "color-mix(in srgb, var(--paper) 60%, transparent)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              </motion.div>

              {/* connector arrow between steps */}
              <div className="flex items-center px-2" style={{ color: "var(--grid-line)" }}>
                {i < steps.length - 1 && (
                  <>
                    <div className="hidden md:flex">
                      <ArrowRight size={18} />
                    </div>
                    <div className="flex md:hidden py-2">
                      <ArrowDown size={18} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
          Mỗi trạm trong bài tương ứng với một bước trong chuỗi lập luận này.
        </p>
        <button
          onClick={onNext}
          className="svl-press focus-amber flex items-center justify-center gap-2 px-6 py-3 w-full md:w-auto"
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
