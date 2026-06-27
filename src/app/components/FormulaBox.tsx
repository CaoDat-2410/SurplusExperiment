export function FormulaBox({ lines }: { lines: string[] }) {
  return (
    <div
      className="inline-block px-6 py-4"
      style={{ border: "1px solid var(--grid-line)", borderRadius: 4, background: "color-mix(in srgb, var(--paper) 5%, var(--ink))" }}
    >
      {lines.map((l) => (
        <div key={l} style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", color: "var(--paper)", lineHeight: 1.6 }}>
          {l}
        </div>
      ))}
    </div>
  );
}
