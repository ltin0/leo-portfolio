"use client";

import { useState, useEffect, useRef } from "react";
import { useT } from "@/lib/context";
import { NPC_CONTEXT } from "@/lib/data";

interface Msg { role: "bot" | "user"; text: string; }

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
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: t.npc.greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMsgs([{ role: "bot", text: t.npc.greeting }]);
  }, [lang, t.npc.greeting]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = async () => {
    if (!input.trim() || typing) return;
    const question = input.trim();
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setTyping(true);
    try {
      const res = await fetch("/api/npc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang, context: NPC_CONTEXT[lang] }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "bot", text: data.reply || t.npc.errorMsg }]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: t.npc.errorMsg }]);
    }
    setTyping(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div className="npc-chat" style={{ width: 340, border: "2px solid var(--cyan)", background: "var(--bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)" }}>{t.npc.title}</span>
            <button onClick={() => setOpen(false)} style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)", cursor: "pointer", background: "none", border: "none" }}>✕</button>
          </div>
          <div ref={msgsRef} style={{ height: 200, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--body)", fontSize: 13, lineHeight: 1.6, maxWidth: "85%", padding: "8px 12px",
                  background: m.role === "bot" ? "var(--surface2)" : "rgba(0,229,255,0.1)",
                  color: "var(--text)",
                  alignSelf: m.role === "bot" ? "flex-start" : "flex-end",
                  borderLeft: m.role === "bot" ? "2px solid var(--cyan)" : "none",
                  borderRight: m.role === "user" ? "2px solid var(--cyan)" : "none",
                }}
              >
                {m.text}
              </div>
            ))}
            {typing && <div style={{ fontFamily: "var(--body)", fontSize: 13, lineHeight: 1.6, maxWidth: "85%", padding: "8px 12px", background: "var(--surface2)", color: "var(--text)", alignSelf: "flex-start", borderLeft: "2px solid var(--cyan)" }}>▌▌▌</div>}
          </div>
          {typing && <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", padding: "6px 14px", borderTop: "1px solid var(--border)" }}>{t.npc.typing}</div>}
          <div style={{ display: "flex", borderTop: "1px solid var(--border)" }}>
            <input
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "12px 14px", fontFamily: "var(--mono)", fontSize: 12, color: "var(--text)" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t.npc.placeholder}
            />
            <button onClick={send} style={{ background: "var(--cyan)", color: "var(--bg)", border: "none", padding: "0 16px", fontFamily: "var(--pixel)", fontSize: 7, cursor: "pointer" }}>
              {t.npc.send}
            </button>
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
