// Citation registry — every figure in the app references one of these.

export interface Citation {
  id: string;
  marker: string;
  label: string;
  usedFor: string;
}

export const citations: Citation[] = [
  {
    id: "ilo-labour-share",
    marker: "[1]",
    label: "Ước tính tỷ trọng thu nhập lao động (ILO)",
    usedFor:
      "Tỷ trọng thu nhập lao động toàn cầu 2004, 2024, 2025; tăng năng suất so với thu nhập lao động.",
  },
  {
    id: "world-bank-vietnam-automation",
    marker: "[2]",
    label: "Trường hợp tự động hóa Việt Nam (Ngân hàng Thế giới)",
    usedFor:
      "Robot hóa, chi phí lao động sản xuất, năng suất, phân bố kỹ năng, tác động tự động hóa tại Việt Nam.",
  },
  {
    id: "ifr-robot-density",
    marker: "[3]",
    label: "Liên đoàn Robot Quốc tế (IFR)",
    usedFor: "Mật độ robot toàn cầu 74, 162, 177 robot/10.000 lao động sản xuất.",
  },
  {
    id: "oecd-labour-share",
    marker: "[4]",
    label: "Thảo luận tỷ trọng lao động / năng suất (OECD)",
    usedFor: "Tỷ trọng lao động, thâm dụng vốn và phân phối thành quả năng suất.",
  },
  {
    id: "bea-us-profits",
    marker: "[5]",
    label: "Lợi nhuận doanh nghiệp (BEA)",
    usedFor: "Lợi nhuận doanh nghiệp Mỹ 2024, 2025, Q1 2026 (mức quy năm).",
  },
  {
    id: "pdf-source",
    marker: "[★]",
    label: "Tài liệu PDF nhóm cung cấp",
    usedFor: "Lý thuyết bản chất & phương pháp sản xuất giá trị thặng dư; tổng hợp nguồn.",
  },
];

export function cite(id: string): string {
  return citations.find((c) => c.id === id)?.marker ?? "";
}
