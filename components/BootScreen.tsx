"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/context";

export default function BootScreen() {
  const { t } = useT();
  const barRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const txt = txtRef.current;
    const wrap = wrapRef.current;
    if (!bar || !txt || !wrap) return;

    let pct = 0;
    const msgs = t.bootMsgs;
    const interval = setInterval(() => {
      pct += Math.random() * 18 + 5;
      if (pct > 100) pct = 100;
      bar.style.width = pct + "%";
      const msgIdx = Math.floor((pct / 100) * (msgs.length - 1));
      txt.textContent = msgs[msgIdx] || "READY!";
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          wrap.style.animation = "fadeOut 0.6s forwards";
          setTimeout(() => (wrap.style.display = "none"), 700);
        }, 400);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [t.bootMsgs]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed", inset: 0, background: "var(--bg)", zIndex: 10000,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--pixel)",
      }}
    >
      <div style={{ color: "var(--cyan)", fontSize: 28, textAlign: "center", lineHeight: 2, marginBottom: 32 }}>
        LT<br />
        <span style={{ color: "var(--yellow)" }}>PORTFOLIO</span>
        <br />v2.0
      </div>
      <div style={{ width: 320, height: 20, border: "2px solid var(--cyan)", padding: 3 }}>
        <div ref={barRef} style={{ height: "100%", background: "var(--cyan)", width: "0%", transition: "width 0.05s linear" }} />
      </div>
      <div ref={txtRef} style={{ marginTop: 16, color: "var(--text-dim)", fontSize: 8 }}>
        INITIALIZING...
      </div>
    </div>
  );
}
