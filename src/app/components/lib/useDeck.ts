import { useCallback, useEffect, useRef, useState } from "react";

export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

interface DeckKeysOptions {
  onNext: () => void;
  onPrev: () => void;
  onReveal: () => void;
  onReset: () => void;
  onToggleHelp: () => void;
}

// Presenter keyboard control: ← → Space R F H
export function useDeckKeys(o: DeckKeysOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.getAttribute("role") === "slider") {
        // allow Space to still reveal even when focus is elsewhere? keep simple: ignore sliders
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          o.onNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          o.onPrev();
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          o.onReveal();
          break;
        case "r":
        case "R":
          o.onReset();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "h":
        case "H":
        case "?":
          o.onToggleHelp();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [o]);
}

// Touch swipe between stations.
export function useSwipe(onPrev: () => void, onNext: () => void) {
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.dataset.sx = String(e.touches[0].clientX);
      el.dataset.sy = String(e.touches[0].clientY);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const el = e.currentTarget as HTMLElement;
      const sx = Number(el.dataset.sx ?? 0);
      const sy = Number(el.dataset.sy ?? 0);
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? onNext() : onPrev();
      }
    },
  };
}

// Step-based reveal driven by the deck's reveal/reset ticks (Space / R).
// `max` is the highest step index. Returns the current step.
export function useRevealStep(max: number, revealTick: number, resetTick: number): number {
  const [step, setStep] = useState(0);
  const rev = useRef(revealTick);
  const res = useRef(resetTick);

  useEffect(() => {
    if (revealTick !== rev.current) {
      rev.current = revealTick;
      setStep((s) => Math.min(s + 1, max));
    }
  }, [revealTick, max]);

  useEffect(() => {
    if (resetTick !== res.current) {
      res.current = resetTick;
      setStep(0);
    }
  }, [resetTick]);

  return step;
}
