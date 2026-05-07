interface Props {
  num: string;
  title: string;
  em: string;
}

export default function SectionHeader({ num, title, em }: Props) {
  return (
    <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
      <span style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--text-dim)" }}>{num}</span>
      <h2 style={{ fontFamily: "var(--pixel)", fontSize: 18, color: "var(--text)" }}>
        {title} <span style={{ color: "var(--cyan)" }}>{em}</span>
      </h2>
      <div style={{ flex: 1, height: 1, background: "var(--border)", maxWidth: 200 }} />
    </div>
  );
}
