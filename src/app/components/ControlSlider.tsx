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
    <div className="card-industrial p-6">
      <div className="mb-3 flex items-baseline justify-between">
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 18, color: "var(--paper)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: "var(--amber-signal)" }}>
          {value}
          {unit}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} className="focus-amber my-2" />
      {description && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, marginTop: 8, color: "color-mix(in srgb, var(--paper) 65%, transparent)", lineHeight: 1.45 }}>
          {description}
        </div>
      )}
    </div>
  );
}
