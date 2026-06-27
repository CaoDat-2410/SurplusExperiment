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
  const [metric1] = relativeSection.metrics; // PwC 2025

  return (
    <StationLayout stationCode="PHẦN 3" title={relativeSection.title} subtitle="Kéo slider tự động hóa 0 → 100 · bấm số nguồn để xem chi tiết">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
          <div className="flex-1">
            <FactoryBlueprint automationLevel={automation} />
          </div>
          <div className="md:sticky md:bottom-0 z-10 pt-2" style={{ background: "var(--ink)" }}>
            <ControlSlider
              label="Mức tự động hóa"
              value={automation}
              min={0}
              max={100}
              step={1}
              unit="%"
              description="Tăng năng suất lao động xã hội để rút ngắn thời gian lao động cần thiết."
              onChange={setAutomation}
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
          <EvidenceCard eyebrow="PHẦN A: CƠ CHẾ LÝ THUYẾT"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="paper">
            <Stat
              value="Thặng dư"
              unit="Tương đối"
              note={relativeSection.shortConcept}
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="PHẦN A: CÔNG THỨC TOÁN HỌC"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="paper">
            <Stat value="Formula" unit={relativeSection.formula} note="Rút ngắn thời gian lao động cần thiết t, kéo dài t'." />
          </EvidenceCard>

          <EvidenceCard eyebrow="PHẦN A: LAO ĐỘNG TẤT YẾU (t)"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="paper">
            <Stat value="Giảm t" unit="Thời gian tất yếu rút ngắn" note="Giá trị sức lao động giảm do giá trị tư liệu sinh hoạt giảm." />
          </EvidenceCard>

          <EvidenceCard eyebrow="PHẦN A: LAO ĐỘNG THẶNG DƯ (t')"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="paper">
            <Stat
              value="Tăng t'"
              unit="Mở rộng thặng dư"
              note="Tăng phần giá trị thặng dư giới chủ tư bản chiếm đoạt không công."
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="PHẦN A: NGÀY LÀM VIỆC"
            sourceId="pdf-source" sourceMarker={cite("pdf-source")} onOpenSource={setOpenSource} color="paper">
            <Stat value="Cố định" unit="Ngày làm việc không đổi" note="Phương pháp thực hiện mà không cần kéo dài ngày lao động." />
          </EvidenceCard>

          <EvidenceCard eyebrow={`PHẦN B: THỰC TIỄN · ${metric1.label.toUpperCase()}`}
            sourceId="pwc-2025" sourceMarker={cite("pwc-2025")} onOpenSource={setOpenSource} color="paper">
            <Stat value={metric1.value} unit={metric1.description} note="Ứng dụng trợ lý ảo (GitHub Copilot) giúp lập trình viên viết code nhanh hơn." />
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
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, lineHeight: 1.1, color: "var(--paper)" }}>{value}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--amber-signal)", marginTop: 4, fontWeight: 700 }}>{unit}</div>
      {note && <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "color-mix(in srgb, var(--paper) 75%, transparent)", marginTop: 6, lineHeight: 1.4 }}>{note}</div>}
    </div>
  );
}
