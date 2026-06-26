import { TheorySection } from "./models";

export const theoryContent: TheorySection[] = [
  {
    id: "essence-section",
    type: "essence",
    title: "BẢN CHẤT CỦA GIÁ TRỊ THẶNG DƯ",
    shortConcept: "Surplus value (m) is the value created by wage labor over and above their own labor-power value (v), appropriated by the capitalist without compensation.",
    formula: "m' = (m / v) * 100%",
    metrics: [
      {
        label: "Oxfam 2024",
        value: "+$2 Trillion",
        description: "Billionaires' wealth increase."
      },
      {
        label: "Bloomberg 2026",
        value: "14.5%",
        description: "S&P 500 record profit margin."
      }
    ]
  },
  {
    id: "absolute-section",
    type: "absolute",
    title: "SẢN XUẤT GIÁ TRỊ THẶNG DƯ TUYỆT ĐỐI",
    shortConcept: "Achieved by lengthening the working day beyond the necessary labor time, while the value of labor-power remains constant.",
    formula: "t' increases as total working day increases",
    metrics: [
      {
        label: "ISACA 2025",
        value: "73%",
        description: "IT professionals experiencing burnout."
      },
      {
        label: "Shift Tracker 2025",
        value: "10-12 hrs",
        description: "Daily hours for 58% of Gig Economy drivers."
      }
    ]
  },
  {
    id: "relative-section",
    type: "relative",
    title: "SẢN XUẤT GIÁ TRỊ THẶNG DƯ TƯƠNG ĐỐI",
    shortConcept: "Achieved by reducing the necessary labor time (t) through increased labor productivity, thereby expanding surplus labor time (t') within a fixed working day.",
    formula: "Total Working Day = t (decreases) + t' (increases)",
    metrics: [
      {
        label: "PwC 2025",
        value: "AI Integration",
        description: "Generative AI like GitHub Copilot reducing necessary coding time."
      }
    ]
  },
  {
    id: "extra-section",
    type: "extra",
    title: "GIÁ TRỊ THẶNG DƯ SIÊU NGẠCH",
    shortConcept: "A temporary advantage gained when individual labor productivity exceeds the social average, lowering individual value below social value.",
    formula: "Extra m = Social Value - Individual Value",
    metrics: [
      {
        label: "Insilico Medicine",
        value: "18 Months",
        description: "AI reducing R&D time from the standard 3-6 years."
      }
    ]
  }
];
