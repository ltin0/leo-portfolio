"use client";

import { useT } from "@/lib/context";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
  const { t } = useT();

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 12,
    color: "var(--text-dim)",
    textDecoration: "none",
    position: "relative",
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid var(--border)", background: "rgba(7,9,15,0.92)", backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--cyan)" }}>
        LT<span style={{ color: "var(--yellow)" }}>.</span>DEV
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", gap: 32 }}>
          {(["about","skills","projects","experience","contact"] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              style={linkStyle}
            >
              {id === "experience" ? t.nav.xp : t.nav[id as keyof typeof t.nav]}
            </a>
          ))}
        </div>
        <LanguageSelector />
      </div>
    </nav>
  );
}
