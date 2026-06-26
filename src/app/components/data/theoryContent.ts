import { TheorySection } from "./models";

export const theoryContent: TheorySection[] = [
  {
    id: "essence-section",
    type: "essence",
    title: "BẢN CHẤT CỦA GIÁ TRỊ THẶNG DƯ",
    shortConcept: "Giá trị thặng dư (m) là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động (v) do công nhân làm thuê tạo ra, bị nhà tư bản chiếm không.",
    formula: "m' = (m / v) x 100%",
    metrics: [
      {
        label: "Báo cáo Oxfam 2024",
        value: "+2.000 Tỷ USD",
        description: "Tài sản giới tỷ phú toàn cầu tăng thêm."
      },
      {
        label: "Bloomberg Q1/2026",
        value: "14,5%",
        description: "Biên lợi nhuận kỷ lục của các tập đoàn S&P 500."
      }
    ]
  },
  {
    id: "absolute-section",
    type: "absolute",
    title: "GIÁ TRỊ THẶNG DƯ TUYỆT ĐỐI",
    shortConcept: "Giá trị thặng dư tuyệt đối được tạo ra bằng cách kéo dài tuyệt đối ngày lao động hoặc tăng cường độ lao động, trong điều kiện năng suất xã hội và giá trị sức lao động không đổi.",
    formula: "t₁ không đổi → t tăng = t₁ + t₂' (t₂' > t₂)",
    metrics: [
      {
        label: "Báo cáo ISACA 2025",
        value: "73%",
        description: "Chuyên gia IT kiệt sức vì làm việc quá giờ."
      },
      {
        label: "CBS News Amazon",
        value: "41%",
        description: "Công nhân kho hàng Amazon bị chấn thương, 69% phải nghỉ không lương."
      }
    ]
  },
  {
    id: "relative-section",
    type: "relative",
    title: "GIÁ TRỊ THẶNG DƯ TƯƠNG ĐỐI",
    shortConcept: "Rút ngắn thời gian lao động tất yếu nhờ tăng năng suất lao động xã hội, từ đó kéo dài thời gian lao động thặng dư trong điều kiện độ dài ngày lao động không đổi.",
    formula: "Ngày lao động không đổi = t (giảm) + t' (tăng)",
    metrics: [
      {
        label: "Báo cáo PwC 2025",
        value: "AI Tạo sinh",
        description: "Công cụ như GitHub Copilot giúp rút ngắn đáng kể thời gian lao động tất yếu."
      }
    ]
  },
  {
    id: "extra-section",
    type: "extra",
    title: "GIÁ TRỊ THẶNG DƯ SIÊU NGẠCH",
    shortConcept: "Phần giá trị thặng dư thu được do tăng năng suất lao động cá biệt, làm cho giá trị cá biệt của hàng hóa thấp hơn giá trị thị trường. Đây là hình thái biến tướng của thặng dư tương đối.",
    formula: "Giá trị thặng dư siêu ngạch = Giá trị thị trường - Giá trị cá biệt",
    metrics: [
      {
        label: "Insilico Medicine",
        value: "18 Tháng",
        description: "AI giúp rút ngắn chu kỳ R&D Y sinh học thay vì 3-6 năm như quy trình tiêu chuẩn."
      }
    ]
  }
];
