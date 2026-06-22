import { useEffect, useRef, useState } from "react";

interface OdometerProps {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number; // ms
}

// Factory-gauge number roll-up. Ticks linearly to the target value.
// Respects prefers-reduced-motion (snaps instantly).
export function Odometer({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 450,
}: OdometerProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const from = fromRef.current;
    const to = value;
    if (reduce || from === to) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(from + (to - from) * t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = to;
    };
  }, [value, duration]);

  const formatted = display.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className} style={{ fontFamily: "var(--font-mono)" }}>
      {formatted}
      {suffix}
    </span>
  );
}
