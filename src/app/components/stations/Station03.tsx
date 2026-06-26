import { useEffect, useRef, useState } from "react";
import { StationLayout } from "../StationLayout";
import { FactoryBlueprint } from "../FactoryBlueprint";
import { ControlSlider } from "../ControlSlider";
import { EvidenceCard } from "../EvidenceCard";
import { SourceDrawer } from "../SourceDrawer";
import { cite } from "../data/citations";
import { theoryContent } from "../data/theoryContent";

export function Station03({ resetTick }: { resetTick: number }) {
  const [automation, setAutomation] = useState(0);
  const [openSource, setOpenSource] = useState<string | null>(null);
  const resetSeen = useRef(resetTick);

  useEffect(() => {
    if (resetTick !== resetSeen.current) {
      resetSeen.current = resetTick;
      setAutomation(0);
    }
  }, [resetTick]);

  const relativeSection = theoryContent.find((s) => s.type === "relative")!;
  const [pwcCase] = relativeSection.caseStudies;

  return (
    <StationLayout stationCode="TRẠM 03" title={relativeSection.title} subtitle="Kéo slider tự động hóa 0 → 100 · bấm số nguồn để xem chi tiết">
      <div className="grid h-full grid-cols-12 gap-6">
        <div className="col-span-7 flex flex-col gap-4">
          <div className="min-h-0 flex-1">
            <FactoryBlueprint automationLevel={automation} />
          </div>
          <ControlSlider
            label="Mức tự động hóa"
            value={automation}
            min={0}
            max={100}
            step={1}
            unit="%"
            description="Tự động hóa bằng AI giúp tăng năng suất vượt bậc, tái cấu trúc thời gian lao động."
            onChange={setAutomation}
          />
        </div>

        <div className="col-span-5 grid grid-cols-2 grid-rows-3 gap-3">
          <EvidenceCard eyebrow="NĂNG SUẤT AI TRUNG BÌNH"
            sourceId={pwcCase.id} sourceMarker={cite(pwcCase.id)} onOpenSource={setOpenSource} color="teal">
            <Stat value="+40%" unit="Năng suất trung bình" note="Của các doanh nghiệp ứng dụng Generative AI" />
          </EvidenceCard>

          <EvidenceCard eyebrow="NĂNG SUẤT AI XUẤT SẮC"
            sourceId={pwcCase.id} sourceMarker={cite(pwcCase.id)} onOpenSource={setOpenSource} color="amber">
            <Stat
              value="+163%"
              unit="Doanh nghiệp xuất sắc nhất"
              note="Top 20% doanh nghiệp đạt mức tăng trưởng vượt trội"
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="TÍCH HỢP TRỢ LÝ ẢO"
            sourceId={pwcCase.id} sourceMarker={cite(pwcCase.id)} onOpenSource={setOpenSource} color="paper">
            <Stat value="Copilot" unit="Hỗ trợ lập trình viên" note="Giúp viết hàng ngàn dòng code chỉ bằng các câu prompt" />
          </EvidenceCard>

          <EvidenceCard eyebrow="THỜI GIAN LÀ LAO ĐỘNG CẦN THIẾT"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="red">
            <Stat value="Giảm t₁" unit="Thời gian tất yếu rút ngắn" note="Thời gian hoàn thành các module phần mềm giảm xuống" />
          </EvidenceCard>

          <EvidenceCard eyebrow="THỜI GIAN LAO ĐỘNG THẶNG DƯ"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="amber">
            <Stat
              value="Tăng t₂"
              unit="Mở rộng thặng dư giới chủ"
              note="Phần thời gian thặng dư làm lợi cho giới chủ công nghệ kéo dài"
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="ĐỘ DÀI NGÀY LAO ĐỘNG"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="red">
            <Stat value="8 Giờ" unit="Không thay đổi độ dài ngày" note="Đặc trưng cốt lõi của sản xuất thặng dư tương đối" />
          </EvidenceCard>
        </div>
      </div>

      {openSource && <SourceDrawer citationId={openSource} onClose={() => setOpenSource(null)} />}
    </StationLayout>
  );
}

function Stat({ value, unit, note }: { value: string; unit: string; note?: string }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, lineHeight: 1, color: "var(--paper)" }}>{value}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 60%, transparent)" }}>{unit}</div>
      {note && <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "color-mix(in srgb, var(--paper) 70%, transparent)", marginTop: 4 }}>{note}</div>}
    </div>
  );
}
