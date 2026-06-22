# Plan — "Sàn Máy: Phòng Thí Nghiệm Giá Trị Thặng Dư"

## Context

The user provided a complete Vietnamese design spec (`src/imports/pasted_text/surplus-value-lab-design.md`) for an interactive
classroom presentation **control deck** about Marx's theory of surplus value (giá trị thặng dư). It is explicitly *not* a slide
deck — it's a live "control deck" the presenter operates on a projector, themed as a factory / accounting ledger / industrial gauge.

Decisions confirmed with the user:
- **Build the full deck** but **remove Station 4 (live audience voting) and the entire mobile "Audience Vote" surface.**
- Result: a **desktop-first presenter deck with 5 stations, frontend-only (no Supabase / no backend).** Classification: PureFrontend.
- Every station should feel **interactive** — clickable, touchable, swipeable, draggable, keyboard-drivable — not static.

The blank starting point: `src/app/App.tsx` is empty; shadcn UI primitives exist in `src/app/components/ui`; no `@make-kits` design
system is installed (verified — nothing under `node_modules/@make-kits`). recharts, motion, lucide-react, and Radix sliders/switch/
tooltip are already in `package.json`.

## Station map (renumbered TRẠM 01–05 after dropping the vote)

| Station | Title | Core content | Interactivity |
|---|---|---|---|
| 01 | Cỗ máy giá trị thặng dư | **Signature time-card** + 3 sliders | Drag sliders → live s/v rate, bar splits teal/red, amber needle moves |
| 02 | Bảng dữ liệu toàn cầu | 2×2 recharts grid | "Lý thuyết vs Thực tế" toggle, hover tooltips, click a chart to zoom |
| 03 | Hồ sơ Việt Nam | Factory cross-section, 2 columns (low/high skill) | Click worker squares → open data card; hover highlight |
| 04 | Phụ lục AI Usage | 4-column ledger table | Expandable rows (click to reveal full prompt / edits) |
| 05 | Bảng chỉ báo chính sách | 10-tile indicator dashboard | Click-to-expand tiles (grid → detail overlay) |

## Added items (from user feedback — more sections, interaction, visual effects)

**New sections / "mục":**
- **TRẠM 00 — Màn bìa / Khởi động máy (Cover):** title screen styled as a machine boot — punch-card holes count up, blueprint
  hairlines draw on, big Display title + a "BẮT ĐẦU / START" amber lever button that powers the deck on.
- **Ngăn kéo thuật ngữ (Glossary drawer):** a slide-in Radix `drawer`/`sheet` reachable anytime (key `G` or a corner tab) defining
  key terms (giá trị thặng dư, lao động cần thiết, tỷ suất s/v…). Hover any underlined term in a station to peek its definition.
- **TRẠM 06 — Tổng kết (Closing/summary):** recap of the core ratio + "nguồn / references" list (will be fed by the PDF later).

**Visual effects (linear/step, no bounce — keep the industrial feel):**
- Animated faint hairline **grid scan** across the `--ink` ground; subtle ledger-paper grain on `--paper` cards.
- **Odometer / number roll-up** for big mono figures (s/v, "52,4%") so values tick like a factory gauge.
- Gauge **needle ticks** in discrete steps; **conveyor-belt** motion on the bottom nav between stations.
- **Blueprint draw-on** (stroke-dashoffset) for diagram lines in Stations 02–03; punched-hole progress counter.
- All effects respect `prefers-reduced-motion` (collapse to instant/fade).

**More interactivity:**
- Station 01: a **"Lưu kịch bản / snapshot"** button to freeze a slider scenario and **compare** two scenarios side-by-side; a
  draggable timeline scrubber over the working day.
- Presenter conveniences: **fullscreen toggle** (`F`), keyboard help overlay (`?`), and click-anywhere-to-advance option.
- Hover-reveal annotations on charts; click data points to pin a callout.

**PDF data / reference source (now attached):**
- Canonical source = `src/imports/B_n_ch_t_c_a_gi__tr__th_ng_d__v__c_c_ph__ng_ph_p_s_n_xu_t_gi__tr__th_ng_d__trong_kinh_t__th__tr__ng.pdf`
  — *"Bản chất của giá trị thặng dư và các phương pháp sản xuất giá trị thặng dư trong kinh tế thị trường."*
- The PDF uses CID/subset fonts so clean text extraction failed in this environment (no poppler/pip). During implementation I'll
  transcribe its key figures/quotes by reading it page-by-page (or ask you to paste any specific tables) and seed them into
  `src/app/components/lib/data.ts` — no component changes needed since data is typed and separated.
- Its content backbone maps directly onto the deck: **bản chất giá trị thặng dư** (s/v framing → Station 01 readout) and the **two
  production methods — giá trị thặng dư tuyệt đối** (kéo dài ngày lao động → slider "Giờ làm/ngày") **và tương đối** (tăng năng
  suất → slider "Năng suất lao động"). Add a small "Tuyệt đối ↔ Tương đối" mode highlight in Station 01 reflecting which slider is
  driving the surplus.
- A typed `references[]` array (title, source, page) backs the Station 06 reference list and glossary citations, sourced from this PDF.

## Data sourcing rule (HARD REQUIREMENT from user)

**Mọi số liệu đều phải có nguồn tham khảo. Tuyệt đối không bịa số liệu, không đưa số liệu lạ tự nghĩ ra vào bài.**

- Every number, percentage, or chart series must trace to a cited source — primarily the attached PDF, or another source the user
  explicitly provides. Each data record in `lib/data.ts` includes a mandatory `source` (title, page/URL); the UI renders a small
  mono citation marker (e.g. `[1]`) next to figures, linked to the Station 06 `references[]` list.
- **No placeholder/illustrative numbers.** Where a real cited figure isn't available yet, the chart/tile shows an explicit empty
  state ("Chưa có số liệu — cần nguồn") instead of a fabricated value. Slider *demonstrations* in Station 01 are clearly labelled
  as a **model/mô phỏng công thức** (computed from the user's own inputs), not as real-world statistics — so they need no external
  citation, but any real economic figures shown alongside do.
- Implementation step: before populating any station with figures, transcribe the cited values from the PDF (page-by-page) or ask
  the user for the specific source; do not proceed with invented data.

## Design system (visual identity from spec §1–§5)

**Tokens** — add to `src/styles/theme.css` (the user requested a specific design style, so token edits are warranted). Define the
6 semantic colors once and reference everywhere; red = surplus/appropriated, teal = necessary labour are **fixed-meaning** across all
charts:
- `--ink #15262B` (bg), `--paper #ECE3D3` (text/cards), `--amber-signal #E3A23C` (all interactive), `--surplus-red #B23A2E`,
  `--necessary-teal #4F8C7A`, `--grid-line #2E4046`.
- Expose them via `@theme inline` as `--color-ink` etc. so Tailwind utilities (`bg-ink`, `text-paper`, `border-grid-line`) work.
- Radius ~4px (near-square), hairline 1px borders, **no soft shadows / no gradients** — high contrast, sharp edges.

**Fonts** — add `@import` lines at the *top* of `src/styles/fonts.css` only (Google Fonts):
- Display: **Big Shoulders Display** (700–900) — station titles, big figures.
- Body: **Public Sans** — all prose.
- Mono: **IBM Plex Mono** — gauge numbers, station codes (TRẠM 01), axis labels; letter-spacing +0.02em.

**Motion** — linear/step easing only (no bounce). Station transitions: 400ms horizontal conveyor slide via `motion/react`; collapse to
150ms fade under `prefers-reduced-motion`. Focus = 2px amber outline (never removed). Card hover = lift 2px + amber border. Buttons
press down 1px on `:active`.

## Files to create / modify

- `src/styles/fonts.css` — font imports (top of file).
- `src/styles/theme.css` — add the 6 color tokens + `@theme inline` mappings; set the deck background to `--ink`.
- `src/app/App.tsx` — deck shell: holds `activeStation` state, renders the active station with a `motion` slide transition, mounts the
  bottom `StationNav`, and wires **navigation input**: ArrowLeft/Right + Space/clicker keys, click on nav, and **touch swipe**
  (left/right) via pointer/touch handlers (small reusable `useSwipe` hook in the same components dir).
- `src/app/components/station-nav.tsx` — fixed bottom conveyor bar "TRẠM 01 … 05", active tile glows amber, clickable.
- `src/app/components/time-card.tsx` — the **signature element**: horizontal punch-card (row of punched holes along top edge), a
  proportional bar split teal (necessary) / red (surplus) with an amber needle at the divide, big mono readout "s/v = X".
- `src/app/components/stations/station-01.tsx` — time-card + 3 Radix sliders (Giờ làm/ngày, Năng suất %, Mức lương thực tế); pure
  helper computing necessary vs surplus time and the s/v ratio from slider values.
- `src/app/components/stations/station-02.tsx` — 2×2 recharts (line/bar) in hairline-framed ledger cells; Radix `switch`/toggle for
  "Lý thuyết vs Thực tế"; click a cell to expand it.
- `src/app/components/stations/station-03.tsx` — factory cross-section, two columns of clickable worker squares; clicking opens a data
  card (Radix dialog/popover from `components/ui`).
- `src/app/components/stations/station-04.tsx` — AI-usage ledger table with expandable rows (Radix collapsible/accordion).
- `src/app/components/stations/station-05.tsx` — 10 indicator tiles; click expands a tile into a detail overlay.
- `src/app/components/stations/station-00-cover.tsx` — boot/cover screen with START lever.
- `src/app/components/stations/station-06-closing.tsx` — summary + references list (from PDF).
- `src/app/components/glossary-drawer.tsx` — term drawer (key `G`), hover-peek definitions.
- `src/app/components/effects/` — small reusable effect helpers (odometer number roll-up, blueprint draw-on, grid scan).
- `src/app/components/lib/data.ts` — **cited datasets only** (see "Data sourcing rule" below). Every numeric record carries a
  required `source` field (title + page/URL); items without a source are not shipped as fact. Stable unique `id`s for React keys.

## Reuse

- shadcn primitives in `src/app/components/ui`: `slider`, `switch`/`toggle`, `tooltip`, `dialog`, `popover`, `accordion`/`collapsible`,
  `card`, `button` — restyle via the token classes rather than building custom controls.
- `recharts` (charts), `motion/react` (transitions), `lucide-react` (indicator/tool icons). All already installed.
- `src/app/components/figma/ImageWithFallback.tsx` if any imagery is needed (likely none — this is data/diagram heavy).

## Verification

1. The Vite dev server is already running — view in the preview surface (do **not** start it or open localhost).
2. Station 01: drag each slider → confirm the time-card bar re-splits teal/red, the amber needle tracks the divide, and the mono
   `s/v = X` readout updates live.
3. Navigate stations three ways: arrow keys, clicking the bottom nav, and swiping left/right on a touch device — confirm the 400ms
   conveyor slide and active-tile amber highlight.
4. Per-station interactions: Station 02 toggle + chart tooltips/zoom; Station 03 worker-square click opens data card; Station 04 rows
   expand; Station 05 tiles expand to detail.
5. Toggle OS `prefers-reduced-motion` → transitions become 150ms fades.
6. Visual check: dark `--ink` ground, hairline grid borders, no soft shadows/gradients, red=surplus & teal=necessary used
   consistently in every chart and bar.
