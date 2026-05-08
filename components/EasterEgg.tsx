"use client";

import { useEffect, useState } from "react";

export default function EasterEgg() {
  const [open, setOpen] = useState(false);

  // Console message — visible when devtools is open
  useEffect(() => {
    console.log(
      "%c  > HIDDEN TERMINAL ACCESSED  ",
      "background:#00e5ff;color:#07090f;font-weight:bold;padding:6px 16px;font-family:monospace;font-size:14px;letter-spacing:2px;"
    );
    console.log(
      "%c\nHey, curious one. 👀\n\nYou opened devtools on a developer's portfolio\nwho loves hiding secrets in the code.\n\nFor the visual easter egg, press:\n",
      "color:#ffd700;font-family:monospace;font-size:12px;line-height:2;"
    );
    console.log(
      "%c  Ctrl + U  ",
      "background:#ffd700;color:#07090f;font-weight:bold;padding:4px 12px;font-family:monospace;font-size:13px;"
    );
    console.log(
      "%c\n— Leonardo Tino · github.com/ltin0\n",
      "color:#5a7a9a;font-family:monospace;font-size:11px;line-height:2;"
    );
  }, []);

  // Ctrl+U → overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(7,9,15,0.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "slideUp 0.25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          border: "2px solid var(--cyan)",
          background: "var(--bg)",
          padding: "40px 48px",
          maxWidth: 500,
          width: "90%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 0 80px rgba(0,229,255,0.15), 0 0 160px rgba(0,229,255,0.06)",
        }}
      >
        {/* Corner accents */}
        {[
          { top: -2, left:  -2, borderTop: "3px solid var(--yellow)", borderLeft:  "3px solid var(--yellow)" },
          { top: -2, right: -2, borderTop: "3px solid var(--yellow)", borderRight: "3px solid var(--yellow)" },
          { bottom: -2, left:  -2, borderBottom: "3px solid var(--yellow)", borderLeft:  "3px solid var(--yellow)" },
          { bottom: -2, right: -2, borderBottom: "3px solid var(--yellow)", borderRight: "3px solid var(--yellow)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, ...s }} />
        ))}

        {/* Achievement banner */}
        <div style={{
          fontFamily: "var(--pixel)", fontSize: 8, color: "var(--bg)",
          background: "var(--yellow)", padding: "6px 16px",
          display: "inline-block", marginBottom: 28, letterSpacing: 1,
        }}>
          ★ ACHIEVEMENT UNLOCKED ★
        </div>

        {/* ASCII art */}
        <pre style={{
          fontFamily: "var(--mono)", fontSize: 13, color: "var(--cyan)",
          lineHeight: 1.5, marginBottom: 28, display: "inline-block",
          textAlign: "left", background: "var(--surface)", padding: "16px 24px",
          border: "1px solid var(--border)",
        }}>{`
  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗
  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
  ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
  ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`}</pre>

        {/* Message */}
        <div style={{
          fontFamily: "var(--mono)", fontSize: 13, color: "var(--text)",
          lineHeight: 2, marginBottom: 32,
        }}>
          <span style={{ color: "var(--green)" }}>+1000 XP</span>
          {"  "}você encontrou o easter egg oculto.<br />
          <span style={{ color: "var(--text-dim)" }}>
            Só curiosos de verdade chegam até aqui.
          </span>
        </div>

        {/* Scanline overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
        }} />

        <button
          onClick={() => setOpen(false)}
          style={{
            fontFamily: "var(--pixel)", fontSize: 8,
            border: "1px solid var(--cyan)", color: "var(--cyan)",
            background: "rgba(0,229,255,0.07)",
            padding: "10px 24px", letterSpacing: 1, position: "relative",
          }}
        >
          [ ESC ] FECHAR
        </button>
      </div>
    </div>
  );
}
