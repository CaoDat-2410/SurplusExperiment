// Marxian theory cards — conceptual content from the source material (PDF).

export interface TheoryCard {
  id: string;
  title: string;
  symbol?: string;
  formula?: string;
  body: string;
}

export const theoryCards: TheoryCard[] = [
  {
    id: "surplus-value",
    title: "Giá trị thặng dư",
    formula: "m = giá trị mới − v",
    body: "Phần giá trị mới do lao động tạo ra vượt quá giá trị sức lao động được trả bằng tiền lương.",
  },
  {
    id: "necessary-labour",
    title: "Lao động cần thiết",
    symbol: "t₁",
    body: "Phần thời gian người lao động tạo ra giá trị tương ứng với giá trị sức lao động của mình.",
  },
  {
    id: "surplus-labour",
    title: "Lao động thặng dư",
    symbol: "t₂",
    body: "Phần thời gian người lao động tiếp tục tạo ra giá trị mới nhưng phần giá trị đó thuộc về tư bản.",
  },
  {
    id: "rate-of-surplus-value",
    title: "Tỷ suất giá trị thặng dư",
    formula: "m' = (m/v) × 100% = s/v",
    body: "m = giá trị thặng dư · v = giá trị sức lao động. Tỷ lệ m/v biểu thị mức độ bóc lột.",
  },
  {
    id: "mass-surplus-value",
    title: "Khối lượng giá trị thặng dư",
    formula: "M = m' × V",
    body: "M — khối lượng thặng dư · m' — tỷ suất thặng dư · V — tổng vốn tư bản khả thi. M biểu thị quy mô bóc lột tổng thể.",
  },
  {
    id: "absolute-surplus-value",
    title: "Giá trị thặng dư tuyệt đối",
    formula: "t tăng, t₁ không đổi → t₂ tăng",
    body: "Mở rộng lao động thặng dư bằng cách kéo dài ngày lao động hoặc tăng cường độ lao động.",
  },
  {
    id: "relative-surplus-value",
    title: "Giá trị thặng dư tương đối",
    formula: "năng suất tăng → t₁ giảm → t₂ tăng",
    body: "Mở rộng lao động thặng dư bằng cách tăng năng suất, rút ngắn thời gian lao động cần thiết.",
  },
];

// Modern variants table (section 3.1.3)
export const modernVariants = [
  { id: "mv-1", form: "Kéo dài giờ làm, làm thêm, tăng cường độ", link: "Giá trị thặng dư tuyệt đối" },
  { id: "mv-2", form: "Tự động hóa, robot hóa, AI, tối ưu quy trình", link: "Giá trị thặng dư tương đối" },
  { id: "mv-3", form: "Ép lương, lương tăng chậm hơn năng suất", link: "Tăng phần giá trị không quay lại lao động" },
  { id: "mv-4", form: "Thuê ngoài, chuỗi giá trị toàn cầu", link: "Dịch chuyển khai thác lao động sang nơi chi phí thấp" },
  { id: "mv-5", form: "Lao động nền tảng số, gig work", link: "Chuyển rủi ro & chi phí tái sản xuất sức lao động về phía người lao động" },
  { id: "mv-6", form: "Tài chính hóa", link: "Phân phối lại giá trị thặng dư sang lợi nhuận tài chính, cổ tức, lãi vay" },
  { id: "mv-extra", form: "Giá trị thặng dư siêu ngạch", link: "Công nghệ vượt trội → lợi nhuận vượt mức tạm thời" },
];

// Policy indicators (section 12 — Station 04)
export const policyIndicators = [
  { id: "pi-1", label: "Tỷ trọng thu nhập lao động", meaning: "Đo phần thu nhập quay lại lao động" },
  { id: "pi-2", label: "Lương thực trung vị", meaning: "Kiểm tra lương có theo kịp năng suất không" },
  { id: "pi-3", label: "Năng suất lao động/giờ", meaning: "Đo hiệu quả lao động" },
  { id: "pi-4", label: "Giờ làm, làm thêm", meaning: "Theo dõi giá trị thặng dư tuyệt đối" },
  { id: "pi-5", label: "Mật độ robot", meaning: "Theo dõi tự động hóa và thâm dụng vốn" },
  { id: "pi-6", label: "Tỷ lệ phi chính thức", meaning: "Theo dõi bấp bênh hóa lao động" },
  { id: "pi-7", label: "Lương bằng/dưới tối thiểu", meaning: "Đo ép lương ở đáy phân phối" },
  { id: "pi-8", label: "Chênh lệch lương kỹ năng", meaning: "Đo phân phối lợi ích công nghệ" },
  { id: "pi-9", label: "Tỷ lệ nội địa hóa vốn FDI", meaning: "Đo vị trí trong chuỗi giá trị" },
  { id: "pi-10", label: "Lợi nhuận, chi trả cổ tức, tái đầu tư", meaning: "Theo dõi tài chính hóa" },
];
