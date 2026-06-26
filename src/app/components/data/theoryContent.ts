import { TheorySection } from "./models";

export const theoryContent: TheorySection[] = [
  {
    id: "essence-section",
    type: "essence",
    title: "BẢN CHẤT CỦA GIÁ TRỊ THẶNG DƯ",
    concept: "Giá trị thặng dư là một bộ phận của giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra và bị nhà tư bản chiếm đoạt, là lao động không công của công nhân. Sự bóc lột này được lượng hóa qua hai công thức toán học chặt chẽ: Tỷ suất giá trị thặng dư (m') và Khối lượng giá trị thặng dư (M).",
    formula: "m' = (m / v) x 100% hoặc M = m' x V",
    caseStudies: [
      {
        id: "oxfam-2024",
        title: "Báo cáo Oxfam 2024 (Takers Not Makers)",
        source: "Oxfam",
        year: 2024,
        metrics: ["2.000 tỷ USD", "4 tỷ phú mới/tuần", "60% độc quyền"],
        description: "Tài sản của các tỷ phú trên thế giới đã tăng thêm 2.000 tỷ USD chỉ trong năm 2024, tạo ra trung bình 4 tỷ phú mới mỗi tuần. Báo cáo chỉ ra 60% khối tài sản này đến từ sức mạnh độc quyền và mối quan hệ, không tỷ lệ thuận với công sức lao động."
      },
      {
        id: "bloomberg-2026",
        title: "Biên lợi nhuận kỷ lục các doanh nghiệp S&P 500",
        source: "Bloomberg",
        year: 2026,
        metrics: ["14.5%"],
        description: "Các tập đoàn thuộc S&P 500 ghi nhận biên lợi nhuận kỷ lục 14,5% vào Quý 1/2026. Số liệu này minh chứng rõ nét cho việc khối lượng giá trị thặng dư (M) vẫn đang liên tục được chuyển dịch từ giai cấp lao động sang giới chủ tư bản."
      }
    ]
  },
  {
    id: "absolute-section",
    type: "absolute",
    title: "SẢN XUẤT GIÁ TRỊ THẶNG DƯ TUYỆT ĐỐI",
    concept: "Phương pháp thực hiện bằng cách kéo dài ngày lao động hoặc tăng cường độ lao động, trong khi thời gian lao động tất yếu không đổi. Lưu ý học thuật: Tăng cường độ lao động liên quan đến tiêu hao thể lực/trí lực trong một khoảng thời gian, hoàn toàn khác với tăng năng suất lao động.",
    formula: "t tăng, t₁ không đổi → t₂ tăng",
    caseStudies: [
      {
        id: "isaca-2025",
        title: "Khủng hoảng kiệt sức (Burnout) của nhân sự IT",
        source: "ISACA",
        year: 2025,
        metrics: ["73%", "61%"],
        description: "Báo cáo tại Châu Âu ghi nhận 73% chuyên gia IT rơi vào trạng thái kiệt sức. Nguyên nhân lớn nhất (chiếm 61%) là do khối lượng công việc quá tải và áp lực deadline, ép buộc họ phải liên tục suy nghĩ, gỡ lỗi (debug) cường độ cao mà không hề được tăng thêm lương (tư bản khả biến)."
      },
      {
        id: "shift-tracker-2025",
        title: "Vắt kiệt lao động trong Nền kinh tế chia sẻ (Gig Economy)",
        source: "Shift Tracker",
        year: 2025,
        metrics: ["58%", "10-12 tiếng", "27% - 37%"],
        description: "58% người làm nghề giao hàng phải dùng cùng lúc nhiều ứng dụng (multi-apping) và cày cuốc tới 10-12 tiếng mỗi ngày để bù đắp mức chiết khấu nền tảng chiếm từ 27% đến 37% trên tổng thu nhập."
      }
    ]
  },
  {
    id: "relative-section",
    type: "relative",
    title: "SẢN XUẤT GIÁ TRỊ THẶNG DƯ TƯƠNG ĐỐI",
    concept: "Phương pháp rút ngắn thời gian lao động tất yếu nhờ tăng năng suất lao động xã hội, từ đó giảm giá trị tư liệu sinh hoạt và làm giảm giá trị sức lao động, mở rộng tỷ lệ thời gian thặng dư trong điều kiện độ dài ngày lao động không đổi.",
    formula: "năng suất tăng → t₁ giảm → t₂ tăng",
    caseStudies: [
      {
        id: "pwc-2025",
        title: "Cuộc cách mạng AI tăng năng suất lao động",
        source: "PwC",
        year: 2025,
        metrics: ["40%", "163%"],
        description: "Báo cáo AI Jobs Barometer chỉ ra sự bùng nổ của AI tạo sinh giúp doanh nghiệp ứng dụng AI tăng năng suất lao động trung bình 40% (top 20% đạt 163%). Việc tích hợp trợ lý ảo (GitHub Copilot) giúp rút ngắn đáng kể thời gian hoàn thành module (lao động tất yếu t₁), qua đó kéo dài tối đa phần thời gian thặng dư t₂ cho giới chủ."
      }
    ]
  },
  {
    id: "extra-section",
    type: "extra",
    title: "GIÁ TRỊ THẶNG DƯ SIÊU NGẠCH",
    concept: "Hình thức xảy ra khi giá trị cá biệt của hàng hóa thấp hơn giá trị xã hội của hàng hóa, đạt được thông qua việc doanh nghiệp tăng năng suất lao động trong xí nghiệp của mình. Đây là biến tướng của giá trị thặng dư tương đối, mang tính chất tạm thời đối với mỗi nhà tư bản nhưng lại mang tính phổ biến với xã hội.",
    formula: "giá trị cá biệt < giá trị xã hội",
    caseStudies: [
      {
        id: "insilico-2025",
        title: "Đột phá R&D Y sinh học bằng AI",
        source: "Insilico Medicine",
        year: 2025,
        metrics: ["18 tháng", "3 đến 6 năm"],
        description: "Công ty Insilico Medicine dùng AI để đưa một loại thuốc mới từ khâu tìm mục tiêu đến thử nghiệm tiền lâm sàng chỉ mất 18 tháng, trong khi quy trình xã hội trung bình tốn từ 3 đến 6 năm. Nhờ rút ngắn thời gian và chi phí khổng lồ, họ hưởng trọn khoản thặng dư siêu ngạch từ các đối thủ trước khi công nghệ này bị phổ cập."
      }
    ]
  }
];
