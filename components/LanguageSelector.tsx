"use client";

import { useT } from "@/lib/context";

const FlagBR = () => (
  <svg className="lang-flag" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" style={{ width: 18, height: 12 }}>
    <rect width="18" height="12" fill="#009c3b" />
    <polygon points="9,2 15,6 9,10 3,6" fill="#ffdf00" />
    <circle cx="9" cy="6" r="2.2" fill="#002776" />
    <rect x="7.5" y="5.5" width="3" height="0.5" fill="#fff" />
  </svg>
);

const FlagUS = () => (
  <svg className="lang-flag" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" style={{ width: 18, height: 12 }}>
    <rect width="18" height="12" fill="#fff" />
    {[0, 2, 4, 6, 8, 10].map((y) => <rect key={y} y={y} width="18" height="1" fill="#b22234" />)}
    <rect width="8" height="6" fill="#3c3b6e" />
    <g fill="#fff">
      <rect x="1" y="1" width="1" height="1" /><rect x="3" y="1" width="1" height="1" /><rect x="5" y="1" width="1" height="1" />
      <rect x="2" y="3" width="1" height="1" /><rect x="4" y="3" width="1" height="1" /><rect x="6" y="3" width="1" height="1" />
      <rect x="1" y="5" width="1" height="1" /><rect x="3" y="5" width="1" height="1" /><rect x="5" y="5" width="1" height="1" />
    </g>
  </svg>
);

export default function LanguageSelector() {
  const { lang, setLang } = useT();

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "var(--surface)" : "transparent",
    border: active ? "1px solid var(--cyan)" : "1px solid transparent",
    cursor: "pointer",
    padding: "4px 6px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--pixel)",
    fontSize: 7,
    color: active ? "var(--cyan)" : "var(--text-dim)",
    boxShadow: active ? "0 0 8px rgba(0,229,255,0.3)" : "none",
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        display: "flex", alignItems: "center",
        border: "2px solid var(--border)", background: "var(--surface2)", padding: 4, gap: 4,
      }}
    >
      <button style={btnStyle(lang === "pt")} onClick={() => setLang("pt")} aria-label="Português">
        <FlagBR />
        <span>PT</span>
      </button>
      <button style={btnStyle(lang === "en")} onClick={() => setLang("en")} aria-label="English">
        <FlagUS />
        <span>EN</span>
      </button>
    </div>
  );
}
