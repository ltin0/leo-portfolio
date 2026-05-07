"use client";

import { useState } from "react";
import { useT } from "@/lib/context";

const NpcSprite = () => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect x="20" y="4"  width="16" height="4"  fill="#b44aff"/>
    <rect x="16" y="8"  width="24" height="4"  fill="#b44aff"/>
    <rect x="16" y="12" width="24" height="12" fill="#ffd700"/>
    <rect x="20" y="16" width="4"  height="4"  fill="#07090f"/>
    <rect x="32" y="16" width="4"  height="4"  fill="#07090f"/>
    <rect x="22" y="20" width="12" height="2"  fill="#07090f"/>
    <rect x="14" y="24" width="28" height="16" fill="#00e5ff"/>
    <rect x="10" y="26" width="4"  height="12" fill="#00e5ff"/>
    <rect x="42" y="26" width="4"  height="12" fill="#00e5ff"/>
    <rect x="14" y="40" width="10" height="12" fill="#1e3352"/>
    <rect x="32" y="40" width="10" height="12" fill="#1e3352"/>
    <rect x="18" y="24" width="8"  height="4"  fill="#07090f"/>
    <rect x="30" y="24" width="8"  height="4"  fill="#07090f"/>
    <rect x="20" y="24" width="4"  height="2"  fill="#39ff14"/>
    <rect x="32" y="24" width="4"  height="2"  fill="#39ff14"/>
  </svg>
);

export default function NPCCompanion() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="npc-root" style={{ position: "fixed", bottom: 24, right: 16, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div className="npc-chat npc-window">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)" }}>{t.npc.title}</span>
            <button onClick={() => setOpen(false)} style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)", cursor: "pointer", background: "none", border: "none" }}>✕</button>
          </div>
          <div style={{ padding: "18px 14px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, flexShrink: 0 }}><NpcSprite /></div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.65, color: "var(--text)",
                background: "var(--surface2)", padding: "10px 12px",
                borderLeft: "2px solid var(--cyan)",
              }}>
                {t.npc.wip}
              </div>
            </div>
            <a
              href="https://wa.me/5511985688911"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", textAlign: "center",
                fontFamily: "var(--pixel)", fontSize: 7,
                color: "var(--bg)", background: "var(--green)",
                padding: "10px 14px", textDecoration: "none",
                letterSpacing: 0.5,
                transition: "opacity 0.2s",
              }}
            >
              {t.npc.whatsappBtn}
            </a>
          </div>
        </div>
      )}
      {!open && (
        <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--bg)", background: "var(--yellow)", padding: "6px 10px", whiteSpace: "nowrap", animation: "blink 2s step-end infinite" }}>
          {t.npc.tooltip}
        </div>
      )}
      <div onClick={() => setOpen((o) => !o)} style={{ width: 56, height: 56, cursor: "pointer", imageRendering: "pixelated" }}>
        <NpcSprite />
      </div>
    </div>
  );
}
