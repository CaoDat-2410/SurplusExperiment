# SURPLUS LAB — FRONTEND-ONLY INTERACTIVE PRESENTATION WEBSITE

**Tên sản phẩm:** SURPLUS LAB  
**Loại sản phẩm:** Website thuyết trình tương tác, chạy 100% Frontend  
**Chủ đề học thuật:**  
- 3.1.2. Bản chất của giá trị thặng dư  
- 3.1.3. Các phương pháp sản xuất giá trị thặng dư trong nền kinh tế thị trường tư bản chủ nghĩa  

**Mục tiêu:** Tạo một website tương tác đóng vai trò là “sản phẩm trung tâm” của bài thuyết trình, thay thế slide truyền thống. Người thuyết trình vận hành web trực tiếp trên màn chiếu để dẫn người xem đi từ lý thuyết Marx → dữ liệu thực tế → case Việt Nam → kết luận chính sách.

---

## 0. TÓM TẮT EXECUTIVE SUMMARY

SURPLUS LAB là một **single-page interactive presentation website** mô phỏng một “phòng thí nghiệm kinh tế” về giá trị thặng dư.

Toàn bộ website xoay quanh một công thức cốt lõi:

```text
t = t₁ + t₂
```

Trong đó:

- `t`: tổng ngày lao động
- `t₁`: lao động cần thiết, tức thời gian người lao động tạo ra giá trị tương ứng với tiền lương/sức lao động của mình
- `t₂`: lao động thặng dư, tức phần thời gian còn lại tạo ra giá trị mới nhưng không quay lại người lao động dưới dạng tiền lương

Website không giải thích lý thuyết bằng đoạn văn dài, mà biến lý thuyết thành **thao tác trực quan**:

- kéo slider giờ làm → thấy `t₂` dài ra → hiểu giá trị thặng dư tuyệt đối
- kéo slider năng suất → thấy `t₁` ngắn lại, `t₂` dài ra → hiểu giá trị thặng dư tương đối
- xem dữ liệu labour share, năng suất, lương → thấy khoảng cách phân phối
- xem case robot hóa Việt Nam → hiểu vì sao năng suất tăng nhưng lợi ích có thể lệch về nhóm kỹ năng cao

Sản phẩm chạy hoàn toàn trên trình duyệt, không cần backend, không cần database, không cần tài khoản, không cần internet sau khi deploy.

---

## 1. PHẠM VI SẢN PHẨM

### 1.1. Sản phẩm sẽ làm gì?

Website sẽ:

1. Trình bày lý thuyết giá trị thặng dư bằng mô phỏng tương tác.
2. Cho phép người thuyết trình điều khiển các biến:
   - giờ làm/ngày
   - năng suất lao động
   - mức lương thực tế
   - mức tự động hóa
3. Hiển thị số liệu thực tế từ tài liệu nghiên cứu/PDF:
   - labour income share toàn cầu
   - tăng năng suất toàn cầu
   - tăng thu nhập lao động theo giờ
   - robot density toàn cầu
   - số liệu Việt Nam về chi phí lao động, năng suất, robot hóa, lao động kỹ năng thấp, phi chính thức
4. Có các màn “reveal” số liệu để tạo hiệu ứng thuyết trình.
5. Có trang AI Usage minh bạch theo yêu cầu rubric.
6. Có checklist nguồn và cam kết học thuật.

### 1.2. Sản phẩm KHÔNG làm gì?

Không làm:

- backend
- đăng nhập
- lưu dữ liệu người dùng
- vote realtime
- database
- API server
- Firebase/Supabase
- dashboard quản trị
- mobile app

### 1.3. Kiểu sản phẩm

```text
Frontend-only Single Page Interactive Presentation Website
```

Website chỉ cần mở trên máy người thuyết trình, chiếu lên màn hình lớn và điều khiển bằng bàn phím/clicker.

---

## 2. MAPPING VỚI RUBRIC CHẤM ĐIỂM

| Tiêu chí rubric | Cách SURPLUS LAB đáp ứng |
|---|---|
| Chiều sâu học thuật & liên kết lý thuyết | Toàn bộ web xoay quanh công thức `t = t₁ + t₂`, `s/v = t₂/t₁`. Mỗi trạm trực quan hóa một khái niệm Marx: bản chất giá trị thặng dư, giá trị thặng dư tuyệt đối, giá trị thặng dư tương đối, lao động không công, phân phối thành quả năng suất. |
| Sáng tạo, hình thức & trình bày | Không dùng slide. Web là “phòng thí nghiệm kinh tế” có giao diện công nghiệp, thẻ chấm công, đồng hồ đo, bản vẽ kỹ thuật, hiệu ứng reveal số liệu. |
| Tính tương tác | Người thuyết trình kéo slider, chuyển trạm, bật/tắt lý thuyết vs thực tế, reveal số liệu, mô phỏng tự động hóa. Khán giả theo dõi sự thay đổi trực tiếp trên màn chiếu. |
| Ứng dụng AI minh bạch, có trách nhiệm | Có màn AI Usage ghi rõ công cụ AI, prompt, phần AI hỗ trợ, phần sinh viên chỉnh sửa, nguồn kiểm chứng. |
| Tính cập nhật & thực tiễn | Dùng số liệu labour share 2004–2025, năng suất 2004–2024, robot density 2024, case robot hóa Việt Nam, lao động phi chính thức năm 2024. |

---

## 3. MỤC TIÊU HỌC THUẬT

### 3.1. Mục tiêu chính

Sau khi trải nghiệm website, người xem phải hiểu được:

1. Giá trị thặng dư là gì.
2. Vì sao giá trị thặng dư không sinh ra trong lưu thông thuần túy mà sinh ra trong sản xuất.
3. Ngày lao động được chia thành lao động cần thiết và lao động thặng dư.
4. Giá trị thặng dư tuyệt đối là gì.
5. Giá trị thặng dư tương đối là gì.
6. Vì sao tự động hóa, tăng năng suất, ép lương, thuê ngoài, nền tảng số có thể được hiểu như các hình thức hiện đại liên quan tới sản xuất giá trị thặng dư.
7. Vì sao vấn đề thực tiễn hiện nay không chỉ là “năng suất có tăng không”, mà là “thành quả năng suất được phân phối cho ai”.

### 3.2. Nội dung 3.1.2 — Bản chất của giá trị thặng dư

#### Viết sẵn để đưa vào web

Giá trị thặng dư là phần giá trị mới do người lao động tạo ra vượt quá giá trị sức lao động mà họ được trả dưới hình thức tiền lương.

Trong quá trình sản xuất, nhà tư bản mua sức lao động như một hàng hóa đặc biệt. Giá trị của sức lao động được biểu hiện bằng tiền lương, nhưng khi được sử dụng trong sản xuất, sức lao động có khả năng tạo ra lượng giá trị lớn hơn chính giá trị của nó.

Phần chênh lệch giữa giá trị mới do lao động tạo ra và giá trị sức lao động được trả chính là giá trị thặng dư.

Nói cách khác:

```text
Giá trị mới do lao động tạo ra
-
Tiền lương/sức lao động được trả
=
Giá trị thặng dư
```

Theo logic Marx, ngày lao động có thể chia thành hai phần:

```text
t = t₁ + t₂
```

Trong đó:

- `t₁`: lao động cần thiết
- `t₂`: lao động thặng dư

Tỷ suất giá trị thặng dư có thể biểu diễn là:

```text
s/v = t₂ / t₁
```

Ý nghĩa:

- `t₁` càng nhỏ so với `t₂`, tỷ suất giá trị thặng dư càng cao.
- `t₂` càng lớn, phần giá trị mới không quay lại người lao động càng lớn.

### 3.3. Nội dung 3.1.3 — Các phương pháp sản xuất giá trị thặng dư

#### 3.3.1. Giá trị thặng dư tuyệt đối

Giá trị thặng dư tuyệt đối là phương pháp làm tăng giá trị thặng dư bằng cách kéo dài ngày lao động hoặc tăng cường độ lao động, trong khi thời gian lao động cần thiết không đổi.

Mô hình:

```text
Trước:
t = 8 giờ
t₁ = 4 giờ
t₂ = 4 giờ

Sau khi kéo dài ngày lao động:
t = 10 giờ
t₁ = 4 giờ
t₂ = 6 giờ
```

Kết quả:

```text
s/v trước = 4/4 = 100%
s/v sau = 6/4 = 150%
```

Ý nghĩa trên web:

Khi kéo slider “Giờ làm/ngày” tăng lên, phần đỏ `t₂` trên thẻ chấm công dài ra. Web sẽ hiện nhãn:

```text
Cơ chế đang kích hoạt:
GIÁ TRỊ THẶNG DƯ TUYỆT ĐỐI
```

#### 3.3.2. Giá trị thặng dư tương đối

Giá trị thặng dư tương đối là phương pháp làm tăng giá trị thặng dư bằng cách tăng năng suất lao động, từ đó rút ngắn thời gian lao động cần thiết `t₁`, trong khi tổng ngày lao động `t` có thể không đổi.

Mô hình:

```text
Trước:
t = 8 giờ
t₁ = 4 giờ
t₂ = 4 giờ

Sau khi năng suất tăng:
t = 8 giờ
t₁ = 3 giờ
t₂ = 5 giờ
```

Kết quả:

```text
s/v trước = 4/4 = 100%
s/v sau = 5/3 ≈ 166.7%
```

Ý nghĩa trên web:

Khi kéo slider “Năng suất lao động” tăng lên, phần xanh `t₁` ngắn lại, phần đỏ `t₂` dài ra. Web sẽ hiện nhãn:

```text
Cơ chế đang kích hoạt:
GIÁ TRỊ THẶNG DƯ TƯƠNG ĐỐI
```

#### 3.3.3. Các biến thể hiện đại

Trong kinh tế hiện đại, logic sản xuất giá trị thặng dư có thể biểu hiện qua:

| Hình thức | Liên hệ với lý thuyết |
|---|---|
| Kéo dài giờ làm, làm thêm, tăng cường độ | Giá trị thặng dư tuyệt đối |
| Tự động hóa, robot hóa, AI, tối ưu quy trình | Giá trị thặng dư tương đối |
| Ép lương, lương tăng chậm hơn năng suất | Làm tăng phần giá trị không quay lại lao động |
| Thuê ngoài, chuỗi giá trị toàn cầu | Dịch chuyển khai thác lao động sang nơi chi phí thấp |
| Lao động nền tảng số, gig work | Chuyển rủi ro và chi phí tái sản xuất sức lao động về phía người lao động |
| Tài chính hóa | Phân phối lại giá trị thặng dư sang lợi nhuận tài chính, cổ tức, lãi vay |

---

## 4. THÔNG ĐIỆP TRUNG TÂM

Website phải dẫn người xem đến kết luận:

```text
Năng suất tăng
≠
Lao động tự động được hưởng phần lớn hơn
```

Và:

```text
Câu hỏi thực tiễn không chỉ là:
"Năng suất có tăng không?"

mà là:
"Ai nhận phần tăng trưởng?"
```

---

## 5. STORYLINE THUYẾT TRÌNH 25 PHÚT

### Tổng thời lượng đề xuất

| Phần | Thời lượng | Nội dung |
|---|---:|---|
| Intro | 2 phút | Giới thiệu câu hỏi trung tâm |
| Trạm 01 | 5 phút | Mô phỏng ngày lao động và bản chất giá trị thặng dư |
| Trạm 02 | 6 phút | Dữ liệu toàn cầu: labour share, năng suất, lương |
| Trạm 03 | 8 phút | Case Việt Nam: robot hóa, kỹ năng, phi chính thức |
| Trạm 04 | 2 phút | Tổng kết lý thuyết |
| AI Usage | 2 phút | Minh bạch AI và nguồn |
| Tổng | 25 phút | Đúng yêu cầu thuyết trình |

### Script ngắn cho người thuyết trình

#### Intro

“Hôm nay nhóm em không dùng slide. Nhóm em sẽ dùng một website tương tác tên SURPLUS LAB. Website này mô phỏng cách giá trị thặng dư được tạo ra và phân phối trong sản xuất.”

“Mục tiêu không phải chỉ học thuộc khái niệm, mà là kiểm tra xem lý thuyết giá trị thặng dư có giúp ta hiểu vấn đề hiện nay không: năng suất tăng nhưng ai là người hưởng lợi?”

#### Trạm 01

“Ta bắt đầu từ một ngày lao động. Theo Marx, ngày lao động không phải một khối thống nhất. Nó gồm lao động cần thiết và lao động thặng dư.”

“Khi em kéo giờ làm tăng lên, phần đỏ tăng. Đó là giá trị thặng dư tuyệt đối.”

“Khi em kéo năng suất tăng, tổng giờ làm không đổi, nhưng lao động cần thiết giảm, phần đỏ tăng. Đó là giá trị thặng dư tương đối.”

#### Trạm 02

“Bây giờ chuyển từ lý thuyết sang dữ liệu. Nếu năng suất tăng, ta thường nghĩ lương cũng sẽ tăng tương ứng. Nhưng số liệu cho thấy không hoàn toàn như vậy.”

“Giai đoạn 2004–2024, năng suất lao động toàn cầu trên giờ tăng 58%, trong khi thu nhập lao động trên giờ chỉ tăng 53%.”

“Tỷ trọng thu nhập lao động toàn cầu giảm từ 53,9% năm 2004 xuống 52,4% năm 2024, và 52,6% năm 2025.”

#### Trạm 03

“Case Việt Nam cho thấy rõ hơn. Việt Nam đang tăng robot hóa trong sản xuất. Tự động hóa có thể làm việc làm và thu nhập tăng, nhưng lợi ích chủ yếu thuộc về lao động kỹ năng trung và cao. Lao động kỹ năng thấp dễ bị mất việc hoặc chuyển sang khu vực phi chính thức.”

#### Trạm 04

“Vì vậy, kết luận của nhóm không phải là phản đối công nghệ. Vấn đề là công nghệ và năng suất tăng phải đi cùng cơ chế phân phối công bằng hơn.”

---

## 6. UX FLOW

### 6.1. Cấu trúc trải nghiệm

```text
INTRO
  ↓
TRẠM 01 — Cỗ máy giá trị thặng dư
  ↓
TRẠM 02 — Phòng soi dữ liệu toàn cầu
  ↓
TRẠM 03 — Việt Nam: Nhà máy đang thay đổi
  ↓
TRẠM 04 — Kết luận & Chính sách
  ↓
AI USAGE
  ↓
END
```

### 6.2. Điều hướng

Website có một trang duy nhất:

```text
/
```

Không dùng nhiều route.

Dùng state để chuyển trạm:

```ts
const [currentStation, setCurrentStation] = useState(0)
```

Phím tắt:

| Phím | Chức năng |
|---|---|
| ArrowRight | Chuyển trạm tiếp theo |
| ArrowLeft | Quay lại trạm trước |
| Space | Reveal nội dung/animation trong trạm |
| R | Reset trạm hiện tại |
| F | Bật/tắt fullscreen |
| H | Hiện/ẩn hướng dẫn điều khiển |

### 6.3. Presentation mode

- Không cần scroll.
- Mỗi trạm full viewport `100vw × 100vh`.
- Tối ưu cho màn hình 1920×1080, dùng được ở 1366×768.
- Không ưu tiên mobile.
- Khán giả không cần thiết bị.

---

## 7. SITEMAP

```text
/
├── Intro
├── Station 01: Surplus Value Machine
├── Station 02: Global Data Lab
├── Station 03: Vietnam Factory Case
├── Station 04: Synthesis & Policy
├── AI Usage
└── End Screen
```

---

## 8. DESIGN SYSTEM

### 8.1. Ý tưởng thị giác

Phong cách thị giác:

```text
Industrial Economic Lab
```

Từ khóa:

- nhà máy
- thẻ chấm công
- sổ kế toán
- bản vẽ kỹ thuật
- đồng hồ đo công nghiệp
- dashboard phòng điều khiển

Không dùng phong cách:

- slide PowerPoint
- premium blog
- SaaS startup
- AI landing page
- nền trắng tối giản chung chung

### 8.2. Signature element

Yếu tố ghi nhớ quan trọng nhất là:

```text
THẺ CHẤM CÔNG GIÁ TRỊ THẶNG DƯ
```

Cấu trúc:

```text
┌──────────────────────────────────────────────┐
│  SURPLUS LAB TIME CARD                       │
│  s/v = t₂/t₁ × 100% = 100%                  │
│                                              │
│  ████████████████████████████████████████    │
│  teal = t₁                 red = t₂          │
└──────────────────────────────────────────────┘
```

Ý nghĩa:

- phần xanh = lao động cần thiết `t₁`
- phần đỏ = lao động thặng dư `t₂`
- kim vàng = điểm chia giữa `t₁` và `t₂`
- số lớn = tỷ suất giá trị thặng dư `s/v`

### 8.3. Color tokens

```css
:root {
  --ink: #15262B;
  --paper: #ECE3D3;
  --amber-signal: #E3A23C;
  --surplus-red: #B23A2E;
  --necessary-teal: #4F8C7A;
  --grid-line: #2E4046;
}
```

### 8.4. Quy tắc màu

| Màu | Ý nghĩa | Dùng ở đâu |
|---|---|---|
| `#15262B` | nền máy công nghiệp | background toàn app |
| `#ECE3D3` | giấy sổ kế toán | chữ chính, card sáng |
| `#E3A23C` | tín hiệu tương tác | slider, focus, nút, điểm chia |
| `#B23A2E` | lao động thặng dư, `t₂`, `m` | phần đỏ của time card, số liệu thặng dư, khoảng cách phân phối |
| `#4F8C7A` | lao động cần thiết, `t₁`, `v` | phần xanh của time card, lương, lao động nhận lại |
| `#2E4046` | đường bản vẽ kỹ thuật | grid, border, divider |

Quy tắc bắt buộc:

```text
ĐỎ = t₂/m
XANH = t₁/v
VÀNG = tương tác
```

Không đổi màu tùy hứng giữa các trạm.

### 8.5. Typography

Dùng Google Fonts:

| Vai trò | Font | Dùng cho |
|---|---|---|
| Display | Big Shoulders Display | tiêu đề trạm, số liệu lớn |
| Body | Public Sans | mô tả, thuyết minh |
| Mono | IBM Plex Mono | công thức, biến, số liệu kỹ thuật, station code |

Import gợi ý:

```tsx
import { Big_Shoulders_Display, Public_Sans, IBM_Plex_Mono } from "next/font/google";
```

Type scale:

| Token | Size | Line height | Dùng cho |
|---|---:|---:|---|
| display-xl | 96px | 0.9 | Hero title |
| display-lg | 64px | 0.95 | Station title |
| display-md | 40px | 1 | Stat number |
| body-lg | 18px | 1.6 | mô tả chính |
| body-md | 16px | 1.55 | nội dung card |
| body-sm | 14px | 1.45 | caption |
| mono-sm | 12px | 1.4 | labels, formulas |

### 8.6. Spacing

Base unit: `8px`

Scale:

```text
4 / 8 / 16 / 24 / 32 / 48 / 64 / 96
```

Grid desktop:

```text
12 columns
max-width: 1600px
margin: 64px
gutter: 24px
```

### 8.7. Border & shadow

Không dùng shadow mềm.

Dùng:

```css
border: 1px solid var(--grid-line);
border-radius: 4px;
```

Hover:

```css
transform: translateY(-2px);
border-color: var(--amber-signal);
```

Button active:

```css
transform: translateY(1px);
```

---

## 9. MOTION / ANIMATION SPEC

### 9.1. Nguyên tắc

Animation phải giống:

- kim đồng hồ đo
- băng chuyền nhà máy
- biên lai dập vào sổ kế toán

Không dùng:

- bounce
- elastic
- animation vui nhộn
- confetti

### 9.2. Transition trạm

```ts
duration: 0.4
ease: "linear"
```

Trạm mới trượt ngang từ phải sang trái.

Reduced motion:

```ts
duration: 0.15
animation: fade
```

### 9.3. Reveal số liệu

Dùng sequence:

1. hiện label
2. count up số
3. hiện insight
4. hiện source nhỏ

### 9.4. Slider motion

Khi kéo slider:

- time card cập nhật tức thì
- số `s/v` count nhẹ 150ms
- nhãn cơ chế đổi nếu biến chính thay đổi

---

## 10. DATA SPEC — DỮ LIỆU MẪU

Toàn bộ dữ liệu lưu local trong:

```text
/src/data
```

Không fetch API.

### 10.1. `src/data/globalLabour.ts`

```ts
export const globalLabourShare = [
  { year: 2004, value: 53.9, note: "Labour income share global" },
  { year: 2019, value: 53.0, note: "Before pandemic benchmark" },
  { year: 2022, value: 52.3, note: "Post-pandemic low point" },
  { year: 2024, value: 52.4, note: "Recent estimate" },
  { year: 2025, value: 52.6, note: "Projected / updated estimate" }
];

export const productivityVsIncome = [
  {
    period: "2004–2024",
    productivityGrowth: 58,
    labourIncomePerHourGrowth: 53,
    gap: 5,
    unit: "%"
  }
];

export const lostLabourIncome = {
  year: 2024,
  value: 2.4,
  unit: "trillion USD",
  description:
    "Estimated labour income shortfall in 2024 compared with a scenario where the 2004 labour income share had been maintained."
};
```

### 10.2. `src/data/vietnamCase.ts`

```ts
export const vietnamManufacturing = {
  labourCost: {
    year: 2022,
    value: 4.9,
    unit: "USD/hour",
    note: "Manufacturing labour cost; nearly tripled from 2010 to 2022"
  },
  productivity: {
    year: 2022,
    value: 6.7,
    unit: "USD value added/hour",
    comparison: [
      { country: "Vietnam", value: 6.7 },
      { country: "China", value: 14.4 },
      { country: "Malaysia", value: 27.7 }
    ]
  },
  manufacturingJobs: {
    total2021: 11.2,
    unit: "million jobs",
    lowSkillShare: 85,
    highSkillShare: 6
  }
};

export const vietnamRobotics = {
  robotDensity2022: {
    value: 7,
    unit: "robots/1,000 manufacturing workers"
  },
  robotMarketGrowth2024: {
    value: 27,
    unit: "%"
  },
  automationEffect: {
    employmentGrowth: 10,
    incomeGrowth: 5,
    beneficiaries: "mainly medium- and high-skill workers",
    riskGroup: "low-skill repetitive manual workers"
  },
  informality2024: {
    value: 64.6,
    unit: "%"
  }
};
```

### 10.3. `src/data/robotics.ts`

```ts
export const globalRobotDensity = [
  {
    period: "around 7 years before 2023",
    value: 74,
    unit: "robots/10,000 manufacturing workers"
  },
  {
    year: 2023,
    value: 162,
    unit: "robots/10,000 manufacturing workers"
  },
  {
    year: 2024,
    value: 177,
    unit: "robots/10,000 manufacturing workers"
  }
];
```

### 10.4. `src/data/koreaWorkingHours.ts`

```ts
export const koreaWorkingHours = {
  year: 2022,
  korea: 1901,
  oecdAverage: 1752,
  unit: "hours/year",
  note: "Example of labour time pressure even in developed economies."
};
```

### 10.5. `src/data/usProfits.ts`

```ts
export const usCorporateProfits = [
  {
    year: 2024,
    value: 3801.8,
    unit: "billion USD",
    label: "Current-production corporate profits"
  },
  {
    year: 2025,
    value: 4077.5,
    unit: "billion USD",
    label: "Current-production corporate profits"
  },
  {
    year: "Q1 2026 annual rate",
    value: 4392.5,
    unit: "billion USD",
    label: "Current-production corporate profits"
  }
];
```

### 10.6. `src/data/theory.ts`

```ts
export const theoryCards = [
  {
    id: "surplus-value",
    title: "Giá trị thặng dư",
    formula: "m = giá trị mới - v",
    body:
      "Phần giá trị mới do lao động tạo ra vượt quá giá trị sức lao động được trả bằng tiền lương."
  },
  {
    id: "necessary-labour",
    title: "Lao động cần thiết",
    symbol: "t₁",
    body:
      "Phần thời gian người lao động tạo ra giá trị tương ứng với giá trị sức lao động của mình."
  },
  {
    id: "surplus-labour",
    title: "Lao động thặng dư",
    symbol: "t₂",
    body:
      "Phần thời gian người lao động tiếp tục tạo ra giá trị mới nhưng phần giá trị đó thuộc về tư bản."
  },
  {
    id: "rate-of-surplus-value",
    title: "Tỷ suất giá trị thặng dư",
    formula: "s/v = t₂/t₁ × 100%",
    body:
      "Tỷ lệ giữa lao động thặng dư và lao động cần thiết, biểu thị mức độ tạo ra giá trị thặng dư."
  },
  {
    id: "absolute-surplus-value",
    title: "Giá trị thặng dư tuyệt đối",
    formula: "t tăng, t₁ không đổi → t₂ tăng",
    body:
      "Mở rộng lao động thặng dư bằng cách kéo dài ngày lao động hoặc tăng cường độ lao động."
  },
  {
    id: "relative-surplus-value",
    title: "Giá trị thặng dư tương đối",
    formula: "năng suất tăng → t₁ giảm → t₂ tăng",
    body:
      "Mở rộng lao động thặng dư bằng cách tăng năng suất, rút ngắn thời gian lao động cần thiết."
  }
];
```

### 10.7. `src/data/citations.ts`

```ts
export const citations = [
  {
    id: "ilo-labour-share",
    label: "ILO labour income share estimates",
    usedFor:
      "Global labour income share 2004, 2024, 2025; productivity vs labour income growth."
  },
  {
    id: "world-bank-vietnam-automation",
    label: "World Bank Vietnam automation case",
    usedFor:
      "Vietnam robotics, manufacturing labour cost, productivity, skill distribution, automation impact."
  },
  {
    id: "ifr-robot-density",
    label: "International Federation of Robotics",
    usedFor:
      "Global robot density 74, 162, 177 robots per 10,000 manufacturing workers."
  },
  {
    id: "oecd-labour-share",
    label: "OECD labour share / productivity discussion",
    usedFor:
      "Labour share, capital deepening and productivity distribution."
  },
  {
    id: "bea-us-profits",
    label: "BEA corporate profits",
    usedFor:
      "US current-production corporate profits 2024, 2025, Q1 2026 annual rate."
  }
];
```

---

## 11. CÔNG THỨC TÍNH TRONG APP

### 11.1. State chính

```ts
type SurplusState = {
  totalHours: number;       // t
  productivity: number;     // index, 100 = baseline
  realWage: number;         // index, 100 = baseline
};
```

### 11.2. Công thức mô phỏng

Giả định baseline:

```ts
const BASE_NECESSARY_HOURS = 4;
const BASE_PRODUCTIVITY = 100;
const BASE_WAGE = 100;
```

Tính `t₁`:

```ts
necessaryHours =
  BASE_NECESSARY_HOURS * (realWage / BASE_WAGE) * (BASE_PRODUCTIVITY / productivity);
```

Ràng buộc:

```ts
necessaryHours = Math.min(necessaryHours, totalHours);
necessaryHours = Math.max(necessaryHours, 0.5);
```

Tính `t₂`:

```ts
surplusHours = totalHours - necessaryHours;
```

Tính `s/v`:

```ts
rateOfSurplusValue = (surplusHours / necessaryHours) * 100;
```

Tính tỷ lệ hiển thị:

```ts
necessaryPercent = (necessaryHours / totalHours) * 100;
surplusPercent = (surplusHours / totalHours) * 100;
```

### 11.3. Xác định cơ chế đang kích hoạt

```ts
function getActiveMechanism(state, previousState) {
  if (state.totalHours > previousState.totalHours) {
    return "absolute";
  }

  if (state.productivity > previousState.productivity) {
    return "relative";
  }

  if (state.realWage < previousState.realWage) {
    return "wage-pressure";
  }

  return "baseline";
}
```

### 11.4. Label cơ chế

```ts
const mechanismLabels = {
  baseline: "Mô hình cơ sở",
  absolute: "Giá trị thặng dư tuyệt đối",
  relative: "Giá trị thặng dư tương đối",
  "wage-pressure": "Ép lương / phân phối bất lợi cho lao động"
};
```

---

## 12. SCREEN-BY-SCREEN SPEC

---

# INTRO SCREEN

## Mục tiêu

Mở bài, tạo cảm giác như đang bước vào một phòng thí nghiệm.

## Layout

Fullscreen.

```text
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                  SURPLUS LAB                              │
│                                                            │
│        Interactive Economic Experiment                     │
│                                                            │
│        Testing: WHO GETS THE EXTRA VALUE?                  │
│                                                            │
│                  [ PRESS ENTER ]                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## UI

- background: `--ink`
- overlay grid line
- title: Big Shoulders Display, 96px
- subtitle: Public Sans, 18px
- “PRESS ENTER”: IBM Plex Mono, amber

## Text hiển thị

```text
SURPLUS LAB
Interactive Economic Experiment
Testing: WHO GETS THE EXTRA VALUE?
PRESS ENTER TO START
```

## Animation

1. Grid background fade in.
2. Title reveal bằng opacity.
3. “PRESS ENTER” nhấp nháy nhẹ.

## Speaker script

“Hôm nay nhóm em sẽ không trình bày bằng slide. Nhóm em dùng một website tương tác như một phòng thí nghiệm kinh tế. Câu hỏi của phòng thí nghiệm này là: khi có giá trị tăng thêm, ai là người nhận phần đó?”

---

# STATION 01 — CỖ MÁY GIÁ TRỊ THẶNG DƯ

## Mục tiêu

Giải thích bản chất giá trị thặng dư và công thức `t = t₁ + t₂`.

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ TRẠM 01                                                    │
│ CỖ MÁY GIÁ TRỊ THẶNG DƯ                                   │
│                                                            │
│  Formula: t = t₁ + t₂                                      │
│                                                            │
│          ┌────────────────────────────────────┐            │
│          │ SURPLUS TIME CARD                  │            │
│          │ s/v = t₂/t₁ × 100% = 100%          │            │
│          │                                    │            │
│          │ ██████████████████████████████     │            │
│          │ t₁ cần thiết | t₂ thặng dư         │            │
│          └────────────────────────────────────┘            │
│                                                            │
│  Slider 1: Giờ làm/ngày                                    │
│  Slider 2: Năng suất lao động                              │
│  Slider 3: Mức lương thực tế                               │
│                                                            │
│  Mechanism: Giá trị thặng dư tuyệt đối/tương đối           │
└────────────────────────────────────────────────────────────┘
```

## Components

- `StationLayout`
- `FormulaBox`
- `TimeCard`
- `ControlSlider`
- `MechanismBadge`
- `NarrationPanel`

## Props cho `TimeCard`

```ts
type TimeCardProps = {
  totalHours: number;
  necessaryHours: number;
  surplusHours: number;
  rateOfSurplusValue: number;
};
```

## Slider defaults

```ts
const defaultState = {
  totalHours: 8,
  productivity: 100,
  realWage: 100
};
```

## Slider ranges

| Slider | Min | Max | Step | Default |
|---|---:|---:|---:|---:|
| Giờ làm/ngày | 6 | 12 | 0.5 | 8 |
| Năng suất lao động | 80 | 180 | 5 | 100 |
| Mức lương thực tế | 70 | 150 | 5 | 100 |

## Text hiển thị

### Title

```text
TRẠM 01
CỖ MÁY GIÁ TRỊ THẶNG DƯ
```

### Formula

```text
t = t₁ + t₂
s/v = t₂ / t₁ × 100%
```

### Explanation

```text
Một ngày lao động không phải một khối thống nhất.
Nó gồm lao động cần thiết và lao động thặng dư.
```

### Slider descriptions

```text
Giờ làm/ngày
Kéo dài tổng ngày lao động. Nếu t₁ không đổi, t₂ tăng.

Năng suất lao động
Khi năng suất tăng, thời gian cần thiết để tái tạo giá trị sức lao động giảm.

Mức lương thực tế
Lương tăng làm phần lao động cần thiết tăng; lương giảm làm phần thặng dư tăng.
```

## Interaction

### Khi tăng giờ làm

- `totalHours` tăng
- `necessaryHours` giữ tương đối ổn định
- `surplusHours` tăng
- phần đỏ dài ra
- hiện badge:

```text
GIÁ TRỊ THẶNG DƯ TUYỆT ĐỐI
```

### Khi tăng năng suất

- `productivity` tăng
- `necessaryHours` giảm
- `surplusHours` tăng
- hiện badge:

```text
GIÁ TRỊ THẶNG DƯ TƯƠNG ĐỐI
```

### Khi giảm lương

- `realWage` giảm
- `necessaryHours` giảm
- `surplusHours` tăng
- hiện badge:

```text
ÉP LƯƠNG / PHÂN PHỐI BẤT LỢI
```

## Example states

### Baseline

```json
{
  "totalHours": 8,
  "productivity": 100,
  "realWage": 100,
  "t1": 4,
  "t2": 4,
  "s/v": "100%"
}
```

### Absolute surplus value

```json
{
  "totalHours": 10,
  "productivity": 100,
  "realWage": 100,
  "t1": 4,
  "t2": 6,
  "s/v": "150%"
}
```

### Relative surplus value

```json
{
  "totalHours": 8,
  "productivity": 150,
  "realWage": 100,
  "t1": 2.67,
  "t2": 5.33,
  "s/v": "200%"
}
```

## Speaker script

“Ở đây ta có một ngày lao động 8 giờ. Theo Marx, ngày lao động được chia thành hai phần: lao động cần thiết và lao động thặng dư.”

“Phần xanh là thời gian người lao động tạo ra giá trị tương ứng với tiền lương. Phần đỏ là thời gian tạo ra giá trị mới vượt quá phần đó.”

“Khi ta kéo dài giờ làm, phần đỏ tăng. Đây là giá trị thặng dư tuyệt đối.”

“Khi năng suất tăng, người lao động cần ít thời gian hơn để tạo ra giá trị tương ứng với tiền lương. Tổng ngày lao động không đổi nhưng phần đỏ vẫn tăng. Đây là giá trị thặng dư tương đối.”

---

# STATION 02 — PHÒNG SOI DỮ LIỆU TOÀN CẦU

## Mục tiêu

Chuyển từ mô hình lý thuyết sang số liệu thực tế.

## Câu hỏi trung tâm

```text
Nếu năng suất tăng, người lao động có nhận lại phần tương ứng không?
```

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ TRẠM 02 — PHÒNG SOI DỮ LIỆU TOÀN CẦU                      │
│                                                            │
│ Left: THEORY                                               │
│ Right: REAL WORLD                                          │
│                                                            │
│ Card 1: Labour income share line chart                     │
│ Card 2: Productivity vs labour income growth               │
│ Card 3: Lost labour income                                 │
│ Card 4: Interpretation                                     │
└────────────────────────────────────────────────────────────┘
```

## Components

- `LineChartLabourShare`
- `BarGapChart`
- `BigNumberCard`
- `EvidenceCard`
- `SourceBadge`

## Data cards

### Card 1 — Labour income share

```text
Labour income share toàn cầu

2004: 53.9%
2019: 53.0%
2022: 52.3%
2024: 52.4%
2025: 52.6%
```

Insight:

```text
Phần thu nhập thuộc về lao động giảm dài hạn và phục hồi rất chậm.
```

### Card 2 — Productivity vs labour income

```text
2004–2024

Năng suất lao động toàn cầu theo giờ: +58%
Thu nhập lao động theo giờ: +53%
Khoảng cách: 5 điểm phần trăm
```

Insight:

```text
Thành quả năng suất không chuyển hết sang thu nhập lao động.
```

### Card 3 — Labour income shortfall

```text
2.4 nghìn tỷ USD
```

Caption:

```text
Ước tính thu nhập lao động bị hụt trong năm 2024 so với kịch bản giữ nguyên tỷ trọng lao động năm 2004.
```

### Card 4 — Interpretation

```text
Không phải tiền lương không tăng.
Vấn đề là phần lao động nhận được trong “chiếc bánh” mới tạo ra tăng chậm hơn phần thuộc về vốn.
```

## Interaction

- Space lần 1: hiện chart labour share
- Space lần 2: reveal cặp số +58% và +53%
- Space lần 3: reveal 2.4 nghìn tỷ USD
- Space lần 4: hiện câu kết luận

## Chart spec

### Line chart

X-axis:

```text
2004, 2019, 2022, 2024, 2025
```

Y-axis:

```text
52% → 54%
```

Line:

```text
labour income share
```

Color:

```text
#B23A2E
```

### Bar chart

Two bars:

| Label | Value | Color |
|---|---:|---|
| Productivity growth | 58 | `#B23A2E` |
| Labour income/hour growth | 53 | `#4F8C7A` |

Gap label:

```text
5 percentage points
```

## Speaker script

“Bây giờ ta kiểm tra dữ liệu. Nếu năng suất tăng, trực giác thông thường cho rằng người lao động cũng được hưởng tương ứng.”

“Nhưng dữ liệu cho thấy từ 2004 đến 2024, năng suất lao động toàn cầu theo giờ tăng 58%, trong khi thu nhập lao động theo giờ chỉ tăng 53%.”

“Đồng thời, tỷ trọng thu nhập lao động toàn cầu giảm từ 53,9% năm 2004 xuống 52,4% năm 2024 và 52,6% năm 2025.”

“Điều này không chứng minh mọi doanh nghiệp đều giống nhau, nhưng nó cho thấy vấn đề phân phối thành quả năng suất là có thật.”

---

# STATION 03 — VIỆT NAM: NHÀ MÁY ĐANG THAY ĐỔI

## Mục tiêu

Liên hệ thực tiễn với Việt Nam, đặc biệt là tự động hóa trong sản xuất điện tử/chế tạo định hướng xuất khẩu.

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ TRẠM 03 — VIỆT NAM: NHÀ MÁY ĐANG THAY ĐỔI                 │
│                                                            │
│ Factory blueprint                                          │
│                                                            │
│ [Low-skill workers]      [High-skill workers]      [Robots]│
│                                                            │
│ Automation slider: 0 → 100                                 │
│                                                            │
│ Data cards:                                                │
│ - labour cost 4.9 USD/hour                                 │
│ - productivity 6.7 USD/hour                                │
│ - robot density 7/1000                                     │
│ - robot market +27%                                        │
│ - employment +10%, income +5%                              │
│ - informality 64.6%                                        │
└────────────────────────────────────────────────────────────┘
```

## Components

- `FactoryBlueprint`
- `AutomationSlider`
- `WorkerGroup`
- `RobotDensityGauge`
- `VietnamDataCard`
- `ImpactSplitPanel`

## Text hiển thị

### Title

```text
TRẠM 03
VIỆT NAM: NHÀ MÁY ĐANG THAY ĐỔI
```

### Intro text

```text
Việt Nam đang chuyển từ lợi thế lao động giá rẻ sang cạnh tranh bằng năng suất, công nghệ và tự động hóa.
```

### Data cards

#### Card 1

```text
Chi phí lao động sản xuất
4.9 USD/giờ
Năm 2022
Gần như tăng gấp ba giai đoạn 2010–2022
```

#### Card 2

```text
Năng suất sản xuất
6.7 USD giá trị gia tăng/giờ

So sánh:
Việt Nam: 6.7
Trung Quốc: 14.4
Malaysia: 27.7
```

#### Card 3

```text
Robot tại Việt Nam
7 robot / 1.000 lao động sản xuất
Năm 2022
```

#### Card 4

```text
Tăng trưởng thị trường robot
+27%
Năm 2024
```

#### Card 5

```text
Tác động của robot hóa
Việc làm: +10%
Thu nhập: +5%

Nhưng lợi ích chủ yếu tập trung ở lao động trung và cao kỹ năng.
```

#### Card 6

```text
Việc làm phi chính thức
64.6%
Năm 2024
```

## Interaction

Slider automation từ 0 đến 100.

### Khi automation = 0

- nhiều worker low-skill
- ít robot
- label:

```text
Mô hình thâm dụng lao động
```

### Khi automation = 50

- robot xuất hiện dần
- high-skill worker sáng hơn
- low-skill worker bắt đầu mờ
- label:

```text
Chuyển đổi công nghệ
```

### Khi automation = 100

- robot nhiều
- high-skill worker nổi bật
- low-skill worker có warning
- label:

```text
Giá trị thặng dư tương đối qua tự động hóa
```

## Insight panel

```text
Tự động hóa không đơn giản là “mất việc”.
Nó tái cấu trúc việc làm.

Nhóm hưởng lợi:
lao động trung và cao kỹ năng

Nhóm rủi ro:
lao động kỹ năng thấp, công việc lặp lại
```

## Speaker script

“Ở Việt Nam, mô hình dựa vào lao động giá rẻ đang giảm dần lợi thế. Chi phí lao động sản xuất năm 2022 là khoảng 4,9 USD/giờ, gần như tăng gấp ba so với 2010.”

“Nhưng năng suất sản xuất mới khoảng 6,7 USD giá trị gia tăng/giờ, thấp hơn Trung Quốc và Malaysia.”

“Vì vậy, doanh nghiệp có xu hướng tăng tự động hóa. Việt Nam năm 2022 có khoảng 7 robot trên 1.000 lao động sản xuất, và năm 2024 thị trường robot tăng 27%.”

“Dữ liệu cho thấy robot hóa có thể đi cùng tăng việc làm và thu nhập, nhưng lợi ích chủ yếu thuộc về lao động trung và cao kỹ năng. Lao động kỹ năng thấp làm công việc lặp lại dễ bị mất việc hoặc chuyển sang khu vực phi chính thức.”

---

# STATION 04 — KẾT LUẬN & CHÍNH SÁCH

## Mục tiêu

Tổng hợp lại logic: lý thuyết → dữ liệu → case → ý nghĩa thực tiễn.

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ TRẠM 04 — KẾT LUẬN                                        │
│                                                            │
│  Năng suất tăng                                            │
│  ≠                                                         │
│  Lương tăng tương ứng                                      │
│                                                            │
│  Lương tăng                                                │
│  ≠                                                         │
│  Lao động hưởng phần lớn hơn                               │
│                                                            │
│  Câu hỏi thực tiễn:                                        │
│  AI NHẬN PHẦN TĂNG TRƯỞNG?                                 │
└────────────────────────────────────────────────────────────┘
```

## Text hiển thị theo reveal

### Reveal 1

```text
Năng suất tăng
≠
Lương tăng tương ứng
```

### Reveal 2

```text
Lương tăng
≠
Lao động hưởng phần lớn hơn
```

### Reveal 3

```text
Vấn đề không phải:
Có nên tăng năng suất hay không?
```

### Reveal 4

```text
Vấn đề là:
Ai nhận phần tăng trưởng?
```

### Reveal 5

```text
Giá trị thặng dư không biến mất.
Nó chỉ thay đổi hình thức:
từ kéo dài giờ làm
sang tự động hóa,
từ nhà máy
sang nền tảng số,
từ ép lương trực tiếp
sang phân phối công nghệ và tài chính.
```

## Policy dashboard

10 chỉ báo đề xuất:

| Chỉ báo | Ý nghĩa |
|---|---|
| Labour income share | Đo phần thu nhập quay lại lao động |
| Lương thực trung vị | Kiểm tra lương có theo kịp năng suất không |
| Năng suất lao động/giờ | Đo hiệu quả lao động |
| Giờ làm, overtime | Theo dõi giá trị thặng dư tuyệt đối |
| Robot density | Theo dõi tự động hóa và capital deepening |
| Tỷ lệ phi chính thức | Theo dõi bấp bênh hóa lao động |
| Tỷ lệ nhận lương bằng/dưới tối thiểu | Đo ép lương ở đáy phân phối |
| Chênh lệch lương kỹ năng thấp/cao | Đo phân phối lợi ích công nghệ |
| Tỷ lệ nội địa hóa FDI | Đo vị trí trong chuỗi giá trị |
| Lợi nhuận, payout, đầu tư lại | Theo dõi tài chính hóa |

## Speaker script

“Lý thuyết giá trị thặng dư có ý nghĩa thực tiễn vì nó buộc ta không chỉ nhìn vào tăng trưởng hay năng suất, mà còn nhìn vào phân phối.”

“Nếu công nghệ làm năng suất tăng nhưng lợi ích chủ yếu rơi vào nhóm vốn hoặc nhóm kỹ năng cao, còn lao động kỹ năng thấp bị đẩy ra khu vực phi chính thức, thì vấn đề chính sách vẫn còn.”

“Vì vậy, câu hỏi không phải là có nên tự động hóa hay không, mà là tự động hóa đi kèm cơ chế đào tạo lại, thương lượng lương và bảo vệ lao động như thế nào.”

---

# AI USAGE SCREEN

## Mục tiêu

Đáp ứng yêu cầu minh bạch, trách nhiệm, liêm chính học thuật.

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ AI USAGE                                                   │
│                                                            │
│ Tool        Purpose        Prompt        Student Edit       │
│ ChatGPT     Structure      ...           verified data      │
│ Figma AI    Wireframe      ...           redesigned UI      │
│ Cursor      Code support   ...           reviewed logic     │
│                                                            │
│ Academic Integrity Statement                               │
└────────────────────────────────────────────────────────────┘
```

## Bảng AI Usage

| Công cụ | Mục đích sử dụng | Prompt chính | Phần sinh viên chỉnh sửa |
|---|---|---|---|
| ChatGPT | Gợi ý cấu trúc web, tổng hợp nội dung lý thuyết, hỗ trợ viết PRD | “Tạo đặc tả web tương tác về giá trị thặng dư dựa trên PDF số liệu” | Sinh viên chọn concept, chỉnh câu chữ, kiểm chứng nguồn, quyết định nội dung cuối |
| Figma AI | Hỗ trợ dựng wireframe theo mô tả | “Design an industrial control-deck web app about surplus value” | Sinh viên chỉnh layout, màu, spacing, thứ tự trạm |
| Cursor / Claude Code | Hỗ trợ code component FE | “Build a frontend-only Next.js interactive presentation website” | Sinh viên kiểm tra logic công thức, sửa UI, test demo |
| Recharts / Framer Motion docs | Hỗ trợ chart và animation | N/A | Sinh viên tự triển khai trong source code |

## Cam kết hiển thị

```text
Nhóm cam kết:
- AI chỉ được dùng như công cụ hỗ trợ.
- Nhóm không để AI làm thay toàn bộ sản phẩm.
- Toàn bộ số liệu được đối chiếu với tài liệu nguồn.
- Nhóm chịu trách nhiệm với nội dung cuối cùng.
```

---

# END SCREEN

## Text

```text
SURPLUS LAB COMPLETE

Câu hỏi còn lại:
Nếu năng suất tăng, làm thế nào để thành quả đó được phân phối công bằng hơn?
```

Button:

```text
RESET EXPERIMENT
```

---

## 13. COMPONENT SPEC

### 13.1. `StationLayout.tsx`

```ts
type StationLayoutProps = {
  stationCode: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};
```

Responsibilities:

- render station code
- render title
- render bottom navigation
- apply full-screen layout

### 13.2. `TimeCard.tsx`

```ts
type TimeCardProps = {
  totalHours: number;
  necessaryHours: number;
  surplusHours: number;
  rate: number;
};
```

Responsibilities:

- render horizontal bar
- render teal/red proportions
- render amber divider
- render formula result

### 13.3. `ControlSlider.tsx`

```ts
type ControlSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
};
```

### 13.4. `EvidenceCard.tsx`

```ts
type EvidenceCardProps = {
  eyebrow: string;
  title: string;
  value: string;
  caption: string;
  color?: "red" | "teal" | "amber";
};
```

### 13.5. `FactoryBlueprint.tsx`

```ts
type FactoryBlueprintProps = {
  automationLevel: number;
};
```

Responsibilities:

- show workers/robots
- animate opacity based on automation level
- show warning for low-skill workers when automation high

### 13.6. `BottomNav.tsx`

```ts
type BottomNavProps = {
  currentStation: number;
  stations: string[];
  onNavigate: (index: number) => void;
};
```

---

## 14. NEXT.JS FRONTEND-ONLY ARCHITECTURE

### 14.1. Install

```bash
npx create-next-app@latest surplus-lab --typescript --tailwind --eslint --app
cd surplus-lab
npm install framer-motion recharts lucide-react clsx
```

### 14.2. Folder structure

```text
surplus-lab/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   ├── ControlSlider.tsx
│   │   ├── EvidenceCard.tsx
│   │   ├── FactoryBlueprint.tsx
│   │   ├── FormulaBox.tsx
│   │   ├── StationLayout.tsx
│   │   └── TimeCard.tsx
│   ├── data/
│   │   ├── citations.ts
│   │   ├── globalLabour.ts
│   │   ├── koreaWorkingHours.ts
│   │   ├── robotics.ts
│   │   ├── theory.ts
│   │   ├── usProfits.ts
│   │   └── vietnamCase.ts
│   ├── hooks/
│   │   ├── useKeyboardNavigation.ts
│   │   └── useSurplusCalculator.ts
│   ├── stations/
│   │   ├── AiUsage.tsx
│   │   ├── EndScreen.tsx
│   │   ├── Intro.tsx
│   │   ├── Station01.tsx
│   │   ├── Station02.tsx
│   │   ├── Station03.tsx
│   │   └── Station04.tsx
│   └── lib/
│       ├── calculations.ts
│       └── utils.ts
└── public/
```

### 14.3. `app/page.tsx` skeleton

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Intro from "@/src/stations/Intro";
import Station01 from "@/src/stations/Station01";
import Station02 from "@/src/stations/Station02";
import Station03 from "@/src/stations/Station03";
import Station04 from "@/src/stations/Station04";
import AiUsage from "@/src/stations/AiUsage";
import EndScreen from "@/src/stations/EndScreen";
import { useKeyboardNavigation } from "@/src/hooks/useKeyboardNavigation";

const stations = [
  Intro,
  Station01,
  Station02,
  Station03,
  Station04,
  AiUsage,
  EndScreen
];

export default function HomePage() {
  const [currentStation, setCurrentStation] = useState(0);
  const Current = stations[currentStation];

  useKeyboardNavigation({
    currentStation,
    totalStations: stations.length,
    setCurrentStation
  });

  return (
    <main className="h-screen w-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStation}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="h-full w-full"
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
```

### 14.4. `src/lib/calculations.ts`

```ts
export type SurplusInput = {
  totalHours: number;
  productivity: number;
  realWage: number;
};

export type SurplusOutput = {
  necessaryHours: number;
  surplusHours: number;
  rate: number;
  necessaryPercent: number;
  surplusPercent: number;
};

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
    input.totalHours
  );

  const surplusHours = input.totalHours - necessaryHours;

  const rate = (surplusHours / necessaryHours) * 100;

  return {
    necessaryHours,
    surplusHours,
    rate,
    necessaryPercent: (necessaryHours / input.totalHours) * 100,
    surplusPercent: (surplusHours / input.totalHours) * 100
  };
}
```

### 14.5. `src/hooks/useKeyboardNavigation.ts`

```ts
import { useEffect } from "react";

type Args = {
  currentStation: number;
  totalStations: number;
  setCurrentStation: (value: number) => void;
};

export function useKeyboardNavigation({
  currentStation,
  totalStations,
  setCurrentStation
}: Args) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setCurrentStation(Math.min(currentStation + 1, totalStations - 1));
      }

      if (event.key === "ArrowLeft") {
        setCurrentStation(Math.max(currentStation - 1, 0));
      }

      if (event.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStation, totalStations, setCurrentStation]);
}
```

---

## 15. GLOBAL CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #15262B;
  --paper: #ECE3D3;
  --amber-signal: #E3A23C;
  --surplus-red: #B23A2E;
  --necessary-teal: #4F8C7A;
  --grid-line: #2E4046;
}

html,
body {
  height: 100%;
  margin: 0;
  background: var(--ink);
  color: var(--paper);
}

body {
  overflow: hidden;
}

.grid-bg {
  background-image:
    linear-gradient(to right, rgba(46, 64, 70, 0.55) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(46, 64, 70, 0.55) 1px, transparent 1px);
  background-size: 32px 32px;
}

.card-industrial {
  border: 1px solid var(--grid-line);
  border-radius: 4px;
  background: rgba(236, 227, 211, 0.04);
}

.card-paper {
  border: 1px solid var(--grid-line);
  border-radius: 4px;
  background: var(--paper);
  color: var(--ink);
}

.focus-amber:focus-visible {
  outline: 2px solid var(--amber-signal);
  outline-offset: 4px;
}
```

---

## 16. FIGMA AI PROMPT

Copy nguyên prompt này vào Figma AI:

```text
Design a desktop-only interactive presentation website called "SURPLUS LAB" for a university political theory presentation about Marx's surplus value.

This is NOT a slide deck. It is a live industrial control-deck interface operated by the presenter on a projector.

Core concept:
The entire app visualizes one equation: t = t1 + t2, where t1 is necessary labour and t2 is surplus labour. Every station must visually connect back to this equation.

Visual style:
Industrial economic laboratory, factory time card, accounting ledger, machine gauges, technical blueprint grid.

Color system:
- Main background: #15262B
- Paper/card text: #ECE3D3
- Interaction/accent: #E3A23C
- Surplus labour t2 / m: #B23A2E
- Necessary labour t1 / v: #4F8C7A
- Grid/border: #2E4046

Rules:
- Red always means t2 / surplus labour / surplus value.
- Teal always means t1 / necessary labour / wage/labour share.
- Amber always means interactive control.
- Use thin blueprint grid lines.
- No soft shadows.
- No rounded SaaS cards.
- Corners should be nearly square, around 4px.

Typography:
- Display: Big Shoulders Display, condensed and bold.
- Body: Public Sans.
- Formula/data: IBM Plex Mono.
- All formulas and economic variables must use mono font.

Screens:
1. Intro screen:
   Title "SURPLUS LAB"
   Subtitle "Interactive Economic Experiment"
   Question "WHO GETS THE EXTRA VALUE?"
   Button "PRESS ENTER TO START"

2. Station 01:
   Title "CỖ MÁY GIÁ TRỊ THẶNG DƯ"
   Large time card in center.
   Time card contains a horizontal bar split into teal t1 and red t2 with amber divider.
   Show formula: s/v = t2/t1 × 100%.
   Three big mechanical sliders:
   - Giờ làm/ngày
   - Năng suất lao động
   - Mức lương thực tế
   Include mechanism badge: "Giá trị thặng dư tuyệt đối" or "Giá trị thặng dư tương đối".

3. Station 02:
   Title "PHÒNG SOI DỮ LIỆU TOÀN CẦU"
   2x2 evidence grid.
   Include:
   - Labour income share line chart: 53.9% (2004), 53.0% (2019), 52.3% (2022), 52.4% (2024), 52.6% (2025)
   - Productivity +58% vs labour income/hour +53%
   - Big number: 2.4 trillion USD
   - Interpretation card: productivity growth does not fully return to labour.

4. Station 03:
   Title "VIỆT NAM: NHÀ MÁY ĐANG THAY ĐỔI"
   Blueprint-style factory diagram with low-skill workers, high-skill workers, and robots.
   Automation slider 0–100.
   Data cards:
   - 4.9 USD/hour labour cost
   - 6.7 USD value added/hour productivity
   - 7 robots/1,000 manufacturing workers
   - robot market +27%
   - employment +10%, income +5%, mainly high-skill beneficiaries
   - informality 64.6%

5. Station 04:
   Title "KẾT LUẬN"
   Fullscreen typographic reveal:
   "Năng suất tăng ≠ Lương tăng tương ứng"
   "Lương tăng ≠ Lao động hưởng phần lớn hơn"
   "Câu hỏi thực tiễn: Ai nhận phần tăng trưởng?"
   Add a policy indicator dashboard with 10 small cards.

6. AI Usage:
   Table with tools: ChatGPT, Figma AI, Cursor/Claude Code.
   Columns: Tool, Purpose, Prompt, Student Edit.
   Include academic integrity statement.

7. End screen:
   "SURPLUS LAB COMPLETE"
   Final question:
   "Nếu năng suất tăng, làm thế nào để thành quả đó được phân phối công bằng hơn?"
```

---

## 17. CURSOR / CLAUDE CODE PROMPT

Copy prompt này vào Cursor hoặc Claude Code:

```text
Build a frontend-only Next.js 15 App Router project called SURPLUS LAB.

Requirements:
- Use TypeScript.
- Use TailwindCSS.
- Use Framer Motion.
- Use Recharts.
- No backend.
- No database.
- No API routes.
- No authentication.
- All data must be stored locally in TypeScript files under src/data.
- The app is a single-page interactive presentation website, desktop-only, fullscreen, controlled by keyboard.

Design:
Use CSS variables:
--ink: #15262B
--paper: #ECE3D3
--amber-signal: #E3A23C
--surplus-red: #B23A2E
--necessary-teal: #4F8C7A
--grid-line: #2E4046

Typography:
Use Google fonts:
- Big Shoulders Display for titles
- Public Sans for body
- IBM Plex Mono for formulas and numbers

Pages:
Only app/page.tsx.

Stations:
1. Intro
2. Station01 Surplus Value Machine
3. Station02 Global Data Lab
4. Station03 Vietnam Factory Case
5. Station04 Synthesis and Policy
6. AI Usage
7. End Screen

Navigation:
Use React state currentStation.
ArrowRight goes next.
ArrowLeft goes previous.
F toggles fullscreen.
No scrolling.

Station01:
Create interactive sliders:
- totalHours 6–12 step 0.5 default 8
- productivity 80–180 step 5 default 100
- realWage 70–150 step 5 default 100

Use formula:
necessaryHours = 4 * (realWage / 100) * (100 / productivity)
clamp between 0.5 and totalHours
surplusHours = totalHours - necessaryHours
rate = surplusHours / necessaryHours * 100

Render a time card:
teal segment = necessaryHours / totalHours
red segment = surplusHours / totalHours
amber divider at boundary
show s/v = rate%

Station02:
Use Recharts.
Line chart data:
[
{ year: 2004, value: 53.9 },
{ year: 2019, value: 53.0 },
{ year: 2022, value: 52.3 },
{ year: 2024, value: 52.4 },
{ year: 2025, value: 52.6 }
]
Bar chart:
productivity growth 58
labour income/hour growth 53
Show big card: 2.4 trillion USD.

Station03:
Create a factory blueprint UI.
Automation slider 0–100.
As automation increases:
- robots become more visible
- high-skill workers become highlighted
- low-skill workers get warning outline
Show data cards:
4.9 USD/hour
6.7 USD value added/hour
7 robots/1,000 workers
+27%
employment +10%
income +5%
informality 64.6%

Station04:
Create typographic reveal with statements:
Năng suất tăng ≠ Lương tăng tương ứng
Lương tăng ≠ Lao động hưởng phần lớn hơn
Câu hỏi thực tiễn: Ai nhận phần tăng trưởng?
Add 10 policy indicator cards.

AI Usage:
Create a table with:
ChatGPT, Figma AI, Cursor/Claude Code
Columns:
Tool, Purpose, Prompt, Student Edit.
Add academic integrity commitment.

End:
Show final question and reset button.

Component structure:
src/components:
- StationLayout.tsx
- TimeCard.tsx
- ControlSlider.tsx
- EvidenceCard.tsx
- FactoryBlueprint.tsx
- BottomNav.tsx
- FormulaBox.tsx

src/data:
- globalLabour.ts
- vietnamCase.ts
- theory.ts
- robotics.ts
- citations.ts

src/lib:
- calculations.ts

src/hooks:
- useKeyboardNavigation.ts

Use industrial UI style:
thin borders, no soft shadows, grid background, amber focus.
```

---

## 18. DEMO CHECKLIST

### Trước khi demo

- [ ] Web chạy được bằng `npm run dev`
- [ ] Không lỗi console
- [ ] Fullscreen hoạt động bằng phím `F`
- [ ] ArrowRight/ArrowLeft chuyển trạm được
- [ ] Slider Trạm 01 hoạt động
- [ ] Công thức `s/v` cập nhật đúng
- [ ] Chart Trạm 02 hiển thị đúng số
- [ ] Automation slider Trạm 03 hoạt động
- [ ] AI Usage có nội dung đầy đủ
- [ ] Các nguồn số liệu được ghi trong phụ lục
- [ ] Có phương án backup: quay video demo web 2 phút

### Trước khi nộp

- [ ] README có mô tả dự án
- [ ] Có file AI_USAGE.md
- [ ] Có file DATA_SOURCES.md
- [ ] Có screenshot các trạm
- [ ] Có link Vercel
- [ ] Không có backend/database/API

---

## 19. README NGẮN CHO REPO

```md
# SURPLUS LAB

SURPLUS LAB is a frontend-only interactive presentation website for a university political theory presentation about Marx's surplus value.

The app visualizes the equation:

t = t₁ + t₂

where:
- t₁ = necessary labour
- t₂ = surplus labour

The presentation connects Marxian theory with global labour income share data and a Vietnam automation case study.

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Recharts

## Run

npm install
npm run dev

## Controls

- ArrowRight: next station
- ArrowLeft: previous station
- F: fullscreen
- R: reset station

## No Backend

This project uses local TypeScript data only. No database, no API, no authentication.
```

---

## 20. DATA SOURCES NOTE

Dữ liệu trong web được lấy từ PDF nhóm cung cấp và các nguồn được tổng hợp trong PDF, gồm:

- ILO labour income share estimates
- OECD labour share and productivity discussion
- World Bank Vietnam automation and manufacturing data
- International Federation of Robotics robot density data
- BEA corporate profits data

Các số liệu chính dùng trong web:

| Số liệu | Giá trị |
|---|---:|
| Labour income share toàn cầu 2004 | 53.9% |
| Labour income share toàn cầu 2024 | 52.4% |
| Labour income share toàn cầu 2025 | 52.6% |
| Năng suất lao động toàn cầu/giờ 2004–2024 | +58% |
| Thu nhập lao động/giờ 2004–2024 | +53% |
| Thu nhập lao động hụt 2024 | 2.4 nghìn tỷ USD |
| Robot density toàn cầu 2024 | 177 robot/10.000 lao động sản xuất |
| Chi phí lao động sản xuất Việt Nam 2022 | 4.9 USD/giờ |
| Năng suất sản xuất Việt Nam 2022 | 6.7 USD giá trị gia tăng/giờ |
| Robot Việt Nam 2022 | 7 robot/1.000 lao động sản xuất |
| Tăng trưởng thị trường robot Việt Nam 2024 | +27% |
| Robot hóa tại Việt Nam, việc làm | +10% |
| Robot hóa tại Việt Nam, thu nhập | +5% |
| Việc làm phi chính thức Việt Nam 2024 | 64.6% |
| Việc làm sản xuất kỹ năng thấp Việt Nam 2021 | gần 85% |
| Việc làm sản xuất kỹ năng cao Việt Nam 2021 | dưới 6% |

---

## 21. FINAL PRESENTATION CONCLUSION

Câu kết nên dùng khi thuyết trình:

```text
Lý thuyết giá trị thặng dư không chỉ giúp ta hiểu lợi nhuận được tạo ra từ đâu, mà còn giúp đặt lại câu hỏi về phân phối trong nền kinh tế hiện đại.

Khi năng suất, robot và công nghệ tăng lên, vấn đề không phải chỉ là xã hội tạo ra nhiều giá trị hơn hay không.

Vấn đề là:
phần giá trị tăng thêm đó quay lại người lao động bao nhiêu,
và nhóm lao động nào bị bỏ lại phía sau.
```

---

# END OF SPEC
