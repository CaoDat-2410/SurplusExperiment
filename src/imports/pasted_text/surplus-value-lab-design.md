# Đặc tả thiết kế giao diện — "Sàn Máy: Phòng Thí Nghiệm Giá Trị Thặng Dư"

## 0. Ý tưởng thị giác (vì sao chọn hướng này)

Đối tượng nghiên cứu là **thời gian lao động bị phân chia** (cần thiết / thặng dư) và **giá trị bị ghi nhận hay chiếm đoạt**. Vì vậy ngôn ngữ thị giác mượn vernacular của chính đối tượng: **thẻ chấm công, sổ kế toán (ledger), đồng hồ đo nhà máy, bản vẽ kỹ thuật**. Không dùng nền cream + serif kiểu "premium blog", không dùng nền đen + accent xanh chanh kiểu "AI startup" — hai default đó không nói lên điều gì về Marx hay nhà máy cả.

**Signature element** (yếu tố ghi nhớ duy nhất): thanh "ngày lao động" ở Module 1 được vẽ như **một thẻ chấm công thật** — có hàng lỗ đục ở mép trên, kim đo màu hổ phách, và phần thanh đỏ/teal in như biên lai ledger. Motif lưới hairline + số liệu monospace lặp lại xuyên suốt để toàn app giống "một cuốn sổ sách nhà máy", không phải slide rời rạc.

---

## 1. Bảng màu (token, 6 màu)

| Token | Hex | Vai trò | Vì sao |
|---|---|---|---|
| `--ink` | `#15262B` | Nền chính (tối, kiểu sơn máy công nghiệp / bản vẽ kỹ thuật) | Nền "sàn máy" |
| `--paper` | `#ECE3D3` | Chữ trên nền tối, nền các thẻ/card sáng | Màu giấy sổ kế toán cũ |
| `--amber-signal` | `#E3A23C` | Mọi thứ **tương tác**: slider, nút, focus ring, con trỏ | Màu băng cảnh báo nhà máy — "chạm vào đây" |
| `--surplus-red` | `#B23A2E` | Mọi dữ liệu thuộc **giá trị thặng dư / phần bị chiếm đoạt** (vd. mảng đỏ trong thanh ngày lao động, đường giảm labour share) | Mực đỏ trong ledger — gắn nghĩa, không trang trí |
| `--necessary-teal` | `#4F8C7A` | Mọi dữ liệu thuộc **lao động cần thiết / phần lao động giữ lại** (vd. mảng xanh trong thanh ngày lao động, đường lương thực) | Xanh patina máy móc cũ |
| `--grid-line` | `#2E4046` | Đường kẻ lưới hairline, viền, divider | Đường kẻ bản vẽ kỹ thuật trên nền tối |

**Quy tắc bắt buộc:** đỏ và teal là màu *ngữ nghĩa cố định* — dùng đúng một nghĩa ở mọi module (biểu đồ, case study Việt Nam, kết quả bình chọn). Không dùng đỏ/teal cho mục đích trang trí khác.

---

## 2. Typography

| Vai trò | Font | Dùng cho |
|---|---|---|
| Display | **Big Shoulders Display** (Google Fonts, condensed, weight 700–900) | Tiêu đề trạm, số liệu lớn (vd. "52,4%") |
| Body | **Public Sans** (Google Fonts) | Toàn bộ văn bản, chú thích, câu hỏi bình chọn |
| Data/mono | **IBM Plex Mono** | Số trên đồng hồ đo, mã trạm (TRẠM 01), nhãn trục biểu đồ |

Type scale (desktop): Display 96/64/40px — Body 18/16/14px — Mono 14/12px, letter-spacing +0.02em.

---

## 3. Spacing & Grid

- Base unit 8px: 8 / 16 / 24 / 32 / 48 / 64 / 96
- Presenter Stage (≥1024px): grid 12 cột, max-width 1600px, margin ngoài 64px, gutter 24px
- Audience Vote (≤640px): 1 cột, margin ngoài 16px, vùng chạm tối thiểu 48×48px

---

## 4. Hai bề mặt tương tác (đây là phần "responsive" quan trọng nhất)

Đây **không phải** một trang co giãn theo màn hình — là **hai giao diện khác nhau** dùng cùng hệ thống token:

### A. Bàn điều khiển người thuyết trình (Presenter Stage) — ≥1024px
Chiếu lên máy chiếu/TV, tối ưu 1920×1080 và 1366×768. Mỗi module = 1 "trạm" full-viewport. Có **thanh line-sản-xuất** cố định ở đáy màn hình: `TRẠM 01 — 02 — 03 — 04 — 05 — 06`, điều hướng bằng phím mũi tên/clicker. Đánh số ở đây hợp lý vì đó *là* trình tự thật của buổi thuyết trình 25 phút.

### B. Phiếu bình chọn khán giả (Audience Vote) — ≤640px
Mở qua QR code, chỉ hiện **một câu hỏi tại một thời điểm**, không biểu đồ, không chữ nhỏ — chỉ nút to/slider to để chạm nhanh trên điện thoại trong lúc ngồi nghe.

| Module | Presenter Stage (≥1024px) | Audience Vote (≤640px) |
|---|---|---|
| 1. Cỗ máy giá trị thặng dư | 3 slider lớn cạnh thẻ chấm công, số s/v cỡ display | — (chỉ trình diễn, không cần điện thoại) |
| 2. Bảng dữ liệu toàn cầu | Lưới 2×2 biểu đồ, hairline grid, toggle "Lý thuyết vs Thực tế" | — |
| 3. Hồ sơ Việt Nam | Sơ đồ nhà máy 2 cột (kỹ năng thấp / cao) click để mở số liệu | — |
| 4. Bình chọn sống | Biểu đồ cột kết quả full-screen, cập nhật real-time | Câu hỏi + nút chọn lớn, 1 câu/màn hình |
| 5. Phụ lục AI Usage | Bảng 4 cột (Công cụ–Mục đích–Prompt–Phần chỉnh sửa) | — |
| 6. Bảng chỉ báo chính sách | Dashboard 10 ô click-to-expand | — |

---

## 5. Trạng thái & chuyển động

- Focus visible: viền `--amber-signal` 2px, không bỏ outline
- Hover thẻ: nâng 2px + viền amber, không đổ bóng mềm kiểu mặc định
- Nút bấm: nén xuống 1px khi active (cảm giác như nút máy cơ khí thật)
- Easing: **linear / step**, không dùng bounce/elastic — giống kim đồng hồ đo, không giống app tiêu dùng
- Chuyển trạm: trượt ngang 400ms kiểu băng chuyền; nếu `prefers-reduced-motion`, chỉ fade 150ms

---

## 6. Prompt cho Figma AI (copy nguyên khối dưới đây)

```
Thiết kế một web app tương tác cho bài thuyết trình lớp học về "giá trị thặng dư" (Marx), 
chủ đề: nhà máy / sổ kế toán / đồng hồ đo công nghiệp. KHÔNG phải slide thuyết trình — đây 
là một bảng điều khiển (control deck) mà người thuyết trình vận hành sống trên màn chiếu.

PHONG CÁCH:
- Nền chính tối, xanh đen ngả than: #15262B, như sơn vỏ máy công nghiệp / bản vẽ kỹ thuật
- Chữ và thẻ sáng: #ECE3D3 (màu giấy sổ kế toán cũ, không trắng tinh)
- Màu tương tác duy nhất (slider, nút, focus, con trỏ): #E3A23C (màu băng cảnh báo nhà máy)
- Màu dữ liệu "giá trị thặng dư / bị chiếm đoạt": #B23A2E (mực đỏ ledger) — dùng nhất quán 
  cho MỌI biểu đồ/thanh thể hiện phần thặng dư
- Màu dữ liệu "lao động cần thiết / phần giữ lại": #4F8C7A (xanh patina máy cũ) — dùng nhất 
  quán cho MỌI biểu đồ/thanh thể hiện phần lao động cần thiết
- Đường kẻ lưới hairline mỏng #2E4046 chạy khắp nền, như giấy bản vẽ kỹ thuật, không dùng 
  bóng đổ mềm (soft shadow), không dùng bo góc lớn — góc bo nhẹ 4px, gần như vuông
- Font tiêu đề: Big Shoulders Display, đậm, condensed, kiểu chữ dập nổi trên vỏ máy
- Font nội dung: Public Sans
- Font số liệu/đồng hồ đo: IBM Plex Mono, letter-spacing rộng nhẹ

YẾU TỐ GỢI NHỚ DUY NHẤT (signature element): một "thẻ chấm công" (time card) nằm ngang, 
mép trên có hàng lỗ đục tròn nhỏ liên tiếp như thẻ chấm công thật, bên trong là một thanh 
ngang dài chia hai phần màu theo tỉ lệ động: phần trái màu #4F8C7A (lao động cần thiết), 
phần phải màu #B23A2E (lao động thặng dư), có một kim chỉ màu #E3A23C ở điểm chia. Phía 
trên thanh in số lớn kiểu đồng hồ đo (mono font) hiển thị "Tỷ suất giá trị thặng dư s/v = X".

THIẾT KẾ MÀN HÌNH 1 — "Bàn điều khiển người thuyết trình" (desktop, 1920x1080, landscape):
- Thanh điều hướng cố định ở đáy màn hình dạng băng chuyền nhà máy, ghi "TRẠM 01" đến 
  "TRẠM 06", trạm đang active sáng màu amber
- Khu vực chính chia lưới 12 cột, margin ngoài 64px
- Trạm 01: thẻ chấm công lớn ở giữa (yếu tố gợi nhớ nói trên) kèm 3 thanh trượt to bên dưới, 
  nhãn "Giờ làm/ngày", "Năng suất lao động (%)", "Mức lương thực tế"
- Trạm 02: lưới 2x2 bốn biểu đồ đường/cột nhỏ, mỗi biểu đồ có khung viền hairline mỏng như 
  ô trong sổ kế toán, tiêu đề mono font phía trên mỗi ô
- Trạm 03: sơ đồ mặt cắt một nhà máy chia hai cột "Lao động kỹ năng thấp" và "Lao động kỹ 
  năng cao", mỗi cột có các ô vuông nhỏ đại diện công nhân, có thể click để mở thẻ số liệu
- Trạm 04: một biểu đồ cột lớn chiếm giữa màn hình, hiển thị kết quả bình chọn theo thời 
  gian thực, có mã QR nhỏ ở góc trên phải để khán giả quét
- Trạm 05: bảng 4 cột "Công cụ AI – Mục đích – Prompt chính – Phần sinh viên chỉnh sửa", 
  border hairline, nền paper sáng trên khối riêng giữa nền tối
- Trạm 06: dashboard 10 ô vuông nhỏ dạng "chỉ báo", mỗi ô có icon đơn giản, số liệu mono, 
  click để phình to hiện chi tiết

THIẾT KẾ MÀN HÌNH 2 — "Phiếu bình chọn khán giả" (mobile, 390x844, portrait):
- Nền cùng tông #15262B, một câu hỏi duy nhất ở giữa màn hình, chữ lớn dễ đọc
- 2-4 nút lựa chọn lớn, full-width, cao tối thiểu 56px, viền amber khi chạm
- Thanh tiến trình mỏng phía trên dạng "đục lỗ" như thẻ chấm công, đếm câu hỏi 1/3, 2/3...
- Không hiển thị biểu đồ hay số liệu thừa, chỉ có nút "Gửi"

Vẽ cả hai màn hình trên cùng một file, dùng đúng bộ màu và font đã nêu, ưu tiên độ tương 
phản cao và viền sắc nét hơn là gradient hoặc bóng đổ mềm.
```

---

## 7. Gợi ý dùng prompt

- Dán nguyên khối prompt trên vào Figma AI / First Draft.
- Nếu Figma AI chỉ ra được 1 màn hình/lần, tách phần "THIẾT KẾ MÀN HÌNH 1" và "MÀN HÌNH 2" thành hai lượt riêng, giữ nguyên phần PHONG CÁCH ở đầu cả hai lần để đồng bộ token màu/font.
- Sau khi có bản nháp, việc cần sửa tay nhiều nhất thường là: khoảng cách giữa các trạm trong thanh điều hướng, và độ dày viền hairline (Figma AI hay vẽ viền quá đậm).