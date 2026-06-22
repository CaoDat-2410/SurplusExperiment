// Surplus value model — pure formula computed from presenter inputs.
// Labelled in the UI as a model (mô phỏng công thức), not real-world data.

export interface SurplusInput {
  totalHours: number; // t
  productivity: number; // index, 100 = baseline
  realWage: number; // index, 100 = baseline
}

export interface SurplusOutput {
  necessaryHours: number; // t₁
  surplusHours: number; // t₂
  rate: number; // s/v %
  necessaryPercent: number;
  surplusPercent: number;
}

const BASE_NECESSARY_HOURS = 4;
const BASE_PRODUCTIVITY = 100;
const BASE_WAGE = 100;

export function calculateSurplus(input: SurplusInput): SurplusOutput {
  const rawNecessary =
    BASE_NECESSARY_HOURS *
    (input.realWage / BASE_WAGE) *
    (BASE_PRODUCTIVITY / input.productivity);

  const necessaryHours = Math.min(
    Math.max(rawNecessary, 0.5),
    input.totalHours,
  );
  const surplusHours = input.totalHours - necessaryHours;
  const rate = (surplusHours / necessaryHours) * 100;

  return {
    necessaryHours,
    surplusHours,
    rate,
    necessaryPercent: (necessaryHours / input.totalHours) * 100,
    surplusPercent: (surplusHours / input.totalHours) * 100,
  };
}

export type Mechanism = "baseline" | "absolute" | "relative" | "wage-pressure";

export function getActiveMechanism(
  state: SurplusInput,
  prev: SurplusInput,
): Mechanism {
  if (state.totalHours > prev.totalHours) return "absolute";
  if (state.productivity > prev.productivity) return "relative";
  if (state.realWage < prev.realWage) return "wage-pressure";
  return "baseline";
}

export const mechanismLabels: Record<Mechanism, string> = {
  baseline: "Mô hình cơ sở",
  absolute: "Giá trị thặng dư tuyệt đối",
  relative: "Giá trị thặng dư tương đối",
  "wage-pressure": "Ép lương / phân phối bất lợi cho lao động",
};
