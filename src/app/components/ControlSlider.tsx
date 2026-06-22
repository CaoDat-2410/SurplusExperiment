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
    <div className="card-industrial p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--paper)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--amber-signal)" }}>
          {value}
          {unit}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} className="focus-amber" />
      {description && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginTop: 6, color: "color-mix(in srgb, var(--paper) 55%, transparent)", lineHeight: 1.4 }}>
          {description}
        </div>
      )}
    </div>
  );
}
