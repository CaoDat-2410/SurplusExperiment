export function FormulaBox({ lines }: { lines: string[] }) {
  return (
    <div
      className="inline-block px-4 py-3 sm:px-5"
      style={{ border: "1px solid var(--grid-line)", borderRadius: 4, background: "color-mix(in srgb, var(--paper) 5%, var(--ink))" }}
    >
      {lines.map((l) => (
        <div key={l} style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(16px, 4.5vw, 20px)", letterSpacing: "0.04em", color: "var(--paper)", lineHeight: 1.6 }}>
          {l}
        </div>
      ))}
    </div>
  );
}
