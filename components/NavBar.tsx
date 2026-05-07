"use client";

import { useState } from "react";
import { useT } from "@/lib/context";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  const links = (["about", "skills", "projects", "experience", "contact"] as const).map((id) => ({
    id,
    label: id === "experience" ? t.nav.xp : t.nav[id as keyof typeof t.nav],
  }));

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--mono)", fontSize: 12,
    color: "var(--text-dim)", textDecoration: "none",
    position: "relative", whiteSpace: "nowrap",
  };

  return (
    <>
      <nav
        className="nav-bar"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid var(--border)",
          background: "rgba(7,9,15,0.95)", backdropFilter: "blur(8px)",
        }}
      >
        {/* Logo */}
        <div style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--cyan)", flexShrink: 0 }}>
          LT<span style={{ color: "var(--yellow)" }}>.</span>DEV
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", gap: 32 }}>
            {links.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="nav-link" style={linkStyle}>{label}</a>
            ))}
          </div>
          <LanguageSelector />
        </div>

        {/* Mobile right side */}
        <div className="nav-mobile" style={{ alignItems: "center", gap: 12 }}>
          <LanguageSelector />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{
              background: "none", border: "1px solid var(--border)",
              color: "var(--cyan)", cursor: "pointer",
              padding: "6px 8px", fontFamily: "var(--pixel)", fontSize: 10,
              lineHeight: 1,
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="nav-mobile"
          style={{
            position: "fixed", top: 45, left: 0, right: 0, zIndex: 99,
            background: "rgba(7,9,15,0.98)", borderBottom: "1px solid var(--border)",
            display: "flex", flexDirection: "column",
          }}
        >
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{
                ...linkStyle,
                padding: "14px 24px",
                borderBottom: "1px solid var(--border)",
                display: "block", fontSize: 11,
              }}
            >
              {">"} {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
