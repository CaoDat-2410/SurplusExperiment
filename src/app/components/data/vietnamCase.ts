// Vietnam case data — cited (see citations.ts).
// Source: World Bank Vietnam automation case (ref: "world-bank-vietnam-automation").

export const vietnamManufacturing = {
  labourCost: {
    year: 2022,
    value: 4.9,
    unit: "USD/giờ",
    note: "Chi phí lao động sản xuất; gần như tăng gấp ba giai đoạn 2010–2022",
  },
  productivity: {
    year: 2022,
    value: 6.7,
    unit: "USD giá trị gia tăng/giờ",
    comparison: [
      { country: "Việt Nam", value: 6.7 },
      { country: "Trung Quốc", value: 14.4 },
      { country: "Malaysia", value: 27.7 },
    ],
  },
  manufacturingJobs: {
    total2021: 11.2,
    unit: "triệu việc làm",
    lowSkillShare: 85,
    highSkillShare: 6,
  },
};

export const vietnamRobotics = {
  robotDensity2022: { value: 7, unit: "robot/1.000 lao động sản xuất" },
  robotMarketGrowth2024: { value: 27, unit: "%" },
  automationEffect: {
    employmentGrowth: 10,
    incomeGrowth: 5,
    beneficiaries: "chủ yếu lao động trung và cao kỹ năng",
    riskGroup: "lao động kỹ năng thấp, công việc lặp lại",
  },
  informality2024: { value: 64.6, unit: "%" },
};
