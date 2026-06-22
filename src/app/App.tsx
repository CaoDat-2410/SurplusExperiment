import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, HelpCircle, Maximize, X } from "lucide-react";
import { BottomNav } from "./components/BottomNav";
import { useDeckKeys, useSwipe, toggleFullscreen } from "./components/lib/useDeck";
import { Intro } from "./components/stations/Intro";
import { LogicMap } from "./components/stations/LogicMap";
import { Station01 } from "./components/stations/Station01";
import { Station02 } from "./components/stations/Station02";
import { Station03 } from "./components/stations/Station03";
import { Station04 } from "./components/stations/Station04";
import { AiUsage } from "./components/stations/AiUsage";
import { EndScreen } from "./components/stations/EndScreen";

const NAV = [
  { code: "MỞ ĐẦU", short: "Giới thiệu" },
  { code: "BẢN ĐỒ", short: "Logic bài" },
  { code: "TRẠM 01", short: "Cỗ máy" },
  { code: "TRẠM 02", short: "Dữ liệu" },
  { code: "TRẠM 03", short: "Việt Nam" },
  { code: "TRẠM 04", short: "Kết luận" },
  { code: "PHỤ LỤC", short: "Minh bạch AI" },
  { code: "KẾT THÚC", short: "Tổng kết" },
];
const TOTAL = NAV.length;

export default function App() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [revealTick, setRevealTick] = useState(0);
  const [resetTick, setResetTick] = useState(0);
  const [help, setHelp] = useState(false);
  const reduce = useReducedMotion();
  const lastRef = useRef(0);

  const goTo = useCallback((i: number) => {
    const next = Math.max(0, Math.min(TOTAL - 1, i));
    setDir(next >= lastRef.current ? 1 : -1);
    lastRef.current = next;
    setActive(next);
  }, []);

  const next = useCallback(() => goTo(lastRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(lastRef.current - 1), [goTo]);
  const reveal = useCallback(() => setRevealTick((t) => t + 1), []);
  const reset = useCallback(() => setResetTick((t) => t + 1), []);
  const restart = useCallback(() => {
    setResetTick((t) => t + 1);
    goTo(0);
  }, [goTo]);

  useDeckKeys({
    onNext: next,
    onPrev: prev,
    onReveal: reveal,
    onReset: reset,
    onToggleHelp: () => setHelp((h) => !h),
  });

  const swipe = useSwipe(prev, next);

  const render = () => {
    switch (active) {
      case 0: return <Intro onStart={() => goTo(1)} />;
      case 1: return <LogicMap onNext={() => goTo(2)} />;
      case 2: return <Station01 resetTick={resetTick} />;
      case 3: return <Station02 revealTick={revealTick} resetTick={resetTick} />;
      case 4: return <Station03 resetTick={resetTick} />;
      case 5: return <Station04 revealTick={revealTick} resetTick={resetTick} />;
      case 6: return <AiUsage />;
      case 7: return <EndScreen onReset={restart} />;
      default: return null;
    }
  };

  return (
    <div className="grid-bg relative flex h-screen w-full flex-col overflow-hidden" {...swipe}>
      <div className="absolute right-4 top-4 z-30 flex gap-2">
        {[
          { icon: BookOpen, fn: () => goTo(6), label: "Minh bạch AI & nguồn" },
          { icon: Maximize, fn: toggleFullscreen, label: "Toàn màn hình (F)" },
          { icon: HelpCircle, fn: () => setHelp(true), label: "Trợ giúp (H)" },
        ].map(({ icon: Icon, fn, label }) => (
          <button key={label} onClick={fn} title={label} className="svl-press focus-amber p-2"
            style={{ color: "var(--paper)", border: "1px solid var(--grid-line)", borderRadius: 4, background: "color-mix(in srgb, var(--ink) 80%, transparent)", cursor: "pointer" }}>
            <Icon size={18} />
          </button>
        ))}
      </div>

      <div className="svl-scan relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { x: dir * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: dir * -80, opacity: 0 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.4, ease: "linear" }}
            className="absolute inset-0"
          >
            {render()}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav stations={NAV} current={active} onNavigate={goTo} />

      {help && (
        <div className="absolute inset-0 z-40 flex items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--ink) 92%, transparent)" }}
          onClick={() => setHelp(false)}>
          <div className="card-paper w-96 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--ink)" }}>Điều khiển</span>
              <button onClick={() => setHelp(false)} className="focus-amber" style={{ color: "var(--surplus-red)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <ul style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)", lineHeight: 2 }}>
              <li>← → — chuyển trạm</li>
              <li>Space / Enter — hiện nội dung tiếp theo</li>
              <li>R — đặt lại trạm hiện tại</li>
              <li>F — toàn màn hình</li>
              <li>H / ? — bảng này</li>
              <li>Vuốt trái/phải — chuyển trạm (cảm ứng)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
