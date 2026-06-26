// Citation registry — every figure in the app references one of these.

export interface Citation {
  id: string;
  marker: string;
  label: string;
  usedFor: string;
  url?: string;
}

export const citations: Citation[] = [
  {
    id: "oxfam-2024",
    marker: "[1]",
    label: "Báo cáo Oxfam 2024 (Takers Not Makers)",
    usedFor: "Tăng trưởng tài sản của các tỷ phú, số lượng tỷ phú mới hàng tuần, và sự độc quyền kinh tế toàn cầu.",
    url: "https://www.oxfam.org/en/reports/takers-not-makers",
  },
  {
    id: "bloomberg-2026",
    marker: "[2]",
    label: "Biên lợi nhuận S&P 500 (Bloomberg Q1/2026)",
    usedFor: "Biên lợi nhuận kỷ lục 14,5% của các tập đoàn thuộc S&P 500.",
  },
  {
    id: "isaca-2025",
    marker: "[3]",
    label: "Khủng hoảng kiệt sức nhân sự IT tại Châu Âu (ISACA 2025)",
    usedFor: "Tỷ lệ kiệt sức (73%), quá tải công việc (61%) và tăng cường độ lao động gián tiếp trong ngành công nghệ.",
    url: "https://www.isaca.org/about-us/newsroom/press-releases/2025/73-percent-of-european-it-professionals-suffer-burnout-amid-rising-workloads-and-skills-shortages",
  },
  {
    id: "cbs-news-amazon",
    marker: "[4]",
    label: "CBS News 2024: Công nhân Amazon bị chấn thương nhiều ở kho hàng",
    usedFor: "Tỷ lệ chấn thương cao, không được nghỉ phép trả lương, kéo dài thời gian làm việc.",
    url: "https://www.cbsnews.com/news/amazon-workers-injuries-warehouse-survey-unpaid-time-off/",
  },
  {
    id: "pwc-2025",
    marker: "[5]",
    label: "AI Jobs Barometer (PwC 2025)",
    usedFor: "Tăng trưởng năng suất trung bình 40% (top 20% đạt 163%) nhờ ứng dụng AI tạo sinh và trợ lý ảo.",
  },
  {
    id: "insilico-2025",
    marker: "[6]",
    label: "Đột phá R&D dược phẩm bằng AI (Insilico Medicine)",
    usedFor: "Rút ngắn thời gian nghiên cứu thuốc mới xuống 18 tháng so với quy trình xã hội 3-6 năm.",
  },
  {
    id: "pdf-source",
    marker: "[★]",
    label: "Tài liệu lý thuyết kinh tế chính trị Marx-Lenin",
    usedFor: "Lý thuyết bản chất và các phương pháp sản xuất giá trị thặng dư (tuyệt đối, tương đối, siêu ngạch).",
  },
];

export function cite(id: string): string {
  return citations.find((c) => c.id === id)?.marker ?? "";
}

