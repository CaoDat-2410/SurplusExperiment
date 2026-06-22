import { useEffect, useRef, useState } from "react";
import { StationLayout } from "../StationLayout";
import { FactoryBlueprint } from "../FactoryBlueprint";
import { ControlSlider } from "../ControlSlider";
import { EvidenceCard } from "../EvidenceCard";
import { SourceDrawer } from "../SourceDrawer";
import { citations } from "../data/citations";
import { vietnamManufacturing, vietnamRobotics } from "../data/vietnamCase";

function m(id: string) {
  return citations.find((c) => c.id === id)?.marker ?? "";
}

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

  const mv = vietnamManufacturing;
  const r = vietnamRobotics;
  const wbId = "world-bank-vietnam-automation";
  const ifrId = "ifr-robot-density";

  return (
    <StationLayout stationCode="TRẠM 03" title="VIỆT NAM: NHÀ MÁY ĐANG THAY ĐỔI" subtitle="Kéo slider tự động hóa 0 → 100 · bấm số nguồn để xem chi tiết">
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
            description="Tự động hóa không đơn giản là 'mất việc' — nó tái cấu trúc việc làm theo kỹ năng."
            onChange={setAutomation}
          />
        </div>

        <div className="col-span-5 grid grid-cols-2 grid-rows-3 gap-3">
          <EvidenceCard eyebrow={`CHI PHÍ LAO ĐỘNG · ${mv.labourCost.year}`}
            sourceId={wbId} sourceMarker={m(wbId)} onOpenSource={setOpenSource} color="teal">
            <Stat value={`${mv.labourCost.value}`} unit={mv.labourCost.unit} note={mv.labourCost.note} />
          </EvidenceCard>

          <EvidenceCard eyebrow={`NĂNG SUẤT SX · ${mv.productivity.year}`}
            sourceId={wbId} sourceMarker={m(wbId)} onOpenSource={setOpenSource} color="amber">
            <Stat
              value={`${mv.productivity.value}`}
              unit={mv.productivity.unit}
              note={`VN ${mv.productivity.comparison[0].value} · TQ ${mv.productivity.comparison[1].value} · MY ${mv.productivity.comparison[2].value}`}
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="MẬT ĐỘ ROBOT · 2022"
            sourceId={ifrId} sourceMarker={m(ifrId)} onOpenSource={setOpenSource} color="paper">
            <Stat value={`${r.robotDensity2022.value}`} unit={r.robotDensity2022.unit} />
          </EvidenceCard>

          <EvidenceCard eyebrow="THỊ TRƯỜNG ROBOT · 2024"
            sourceId={wbId} sourceMarker={m(wbId)} onOpenSource={setOpenSource} color="red">
            <Stat value={`+${r.robotMarketGrowth2024.value}`} unit={r.robotMarketGrowth2024.unit} />
          </EvidenceCard>

          <EvidenceCard eyebrow="TÁC ĐỘNG ROBOT HÓA"
            sourceId={wbId} sourceMarker={m(wbId)} onOpenSource={setOpenSource} color="amber">
            <Stat
              value={`+${r.automationEffect.employmentGrowth}% / +${r.automationEffect.incomeGrowth}%`}
              unit="việc làm / thu nhập"
              note={`Lợi ích ${r.automationEffect.beneficiaries}.`}
            />
          </EvidenceCard>

          <EvidenceCard eyebrow="VIỆC LÀM PHI CHÍNH THỨC · 2024"
            sourceId={wbId} sourceMarker={m(wbId)} onOpenSource={setOpenSource} color="red">
            <Stat value={`${r.informality2024.value}`} unit={r.informality2024.unit} />
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
