import { Slider } from "./ui/slider";

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
}

export function ControlSlider({ label, value, min, max, step, unit, description, onChange }: ControlSliderProps) {
  return (
    <div className="card-industrial p-4 sm:p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(16px, 4vw, 18px)", color: "var(--paper)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(24px, 6vw, 28px)", color: "var(--amber-signal)" }}>
          {value}
          {unit}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} className="focus-amber" />
      {description && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 3vw, 13px)", marginTop: 10, color: "color-mix(in srgb, var(--paper) 55%, transparent)", lineHeight: 1.4 }}>
          {description}
        </div>
      )}
    </div>
  );
}
