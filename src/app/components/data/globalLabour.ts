// Global labour data — every figure is cited (see citations.ts).
// Source: ILO labour income share estimates (ref: "ilo-labour-share").

export const globalLabourShare = [
  { year: 2004, value: 53.9, note: "Tỷ trọng thu nhập lao động toàn cầu" },
  { year: 2019, value: 53.0, note: "Mốc trước đại dịch" },
  { year: 2022, value: 52.3, note: "Đáy sau đại dịch" },
  { year: 2024, value: 52.4, note: "Ước tính gần đây" },
  { year: 2025, value: 52.6, note: "Ước tính cập nhật / dự báo" },
];

export const productivityVsIncome = {
  period: "2004–2024",
  productivityGrowth: 58,
  labourIncomePerHourGrowth: 53,
  gap: 5,
  unit: "%",
};

export const lostLabourIncome = {
  year: 2024,
  value: 2.4,
  unit: "nghìn tỷ USD",
  description:
    "Ước tính thu nhập lao động bị hụt trong năm 2024 so với kịch bản giữ nguyên tỷ trọng lao động năm 2004.",
};
