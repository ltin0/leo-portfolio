interface Props { num: string; title: string; em: string; }

export default function SectionHeader({ num, title, em }: Props) {
  return (
    <div className="reveal sec-hdr">
      <span style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--text-dim)", flexShrink: 0 }}>{num}</span>
      <h2 style={{ fontFamily: "var(--pixel)", color: "var(--text)", margin: 0 }}>
        {title} <span style={{ color: "var(--cyan)" }}>{em}</span>
      </h2>
      <div className="sec-line" style={{ flex: 1, height: 1, background: "var(--border)", maxWidth: 200 }} />
    </div>
  );
}
