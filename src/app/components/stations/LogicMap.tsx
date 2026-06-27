import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    id: 1,
    text: "Bản chất giá trị thặng dư",
    sub: "Lao động tạo giá trị mới, tiền lương chỉ bằng giá trị sức lao động, phần giá trị thặng dư bị tư bản chiếm đoạt."
  },
  {
    id: 2,
    text: "Giá trị thặng dư tuyệt đối",
    sub: "Kéo dài ngày lao động hoặc tăng cường độ lao động (không đổi năng suất xã hội).",
  },
  {
    id: 3,
    text: "Giá trị thặng dư tương đối",
    sub: "Rút ngắn thời gian tất yếu bằng tăng năng suất xã hội, ngày làm không đổi.",
  },
  {
    id: 4,
    text: "Giá trị thặng dư siêu ngạch",
    sub: "Năng suất cá biệt vượt trội → giá trị cá biệt < giá trị thị trường → lợi nhuận đặc biệt.",
  },
  {
    id: 5,
    text: "Câu hỏi cốt lõi cuối cùng",
    sub: "AI là người thụ hưởng tăng trưởng? Năng suất tăng ≠ lao động tự động được lợi.",
  },
];

export function LogicMap({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-screen w-full flex-col px-4 md:px-16 pb-24 pt-10">
      <header className="mb-6 flex flex-col md:flex-row md:items-baseline gap-4 border-b pb-3" style={{ borderColor: "var(--grid-line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--amber-signal)" }}>
          LOGIC MAP
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
                className="card-industrial flex flex-col p-4 md:p-5 m-1"
                style={{ minHeight: 240 }}
              >
                <div
                  className="card-number"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    marginBottom: 16,
                  }}
                >
                  {String(s.id).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-3">
                  <div
                    className="card-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 18,
                      lineHeight: 1.15,
                      minHeight: 44,
                    }}
                  >
                    {s.text}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "color-mix(in srgb, var(--paper) 60%, transparent)",
                      lineHeight: 1.5,
                      minHeight: 64,
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
          Mỗi phần trong bài tương ứng với một bước trong chuỗi lập luận này.
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
          VÀO PHẦN 1 <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
