"use client";

import Image from "next/image";
import { useT } from "@/lib/context";
import Typewriter from "@/components/ui/Typewriter";
import ContribSnake from "@/components/ContribSnake";
import PixelBtn from "@/components/ui/PixelBtn";

function PressStartHint() {
  const { t } = useT();
  return (
    <div style={{ fontFamily: "var(--pixel)", fontSize: 9, color: "var(--text-dim)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 }}>
      <span style={{ animation: "blink 1s step-end infinite" }}>▼</span>
      <span>{t.hero.pressStart}</span>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: 110, height: 26, padding: "0 12px",
        border: "2px solid var(--cyan)", borderBottomWidth: 4, background: "var(--surface2)",
        color: "var(--cyan)", fontFamily: "var(--pixel)", fontSize: 8, letterSpacing: 1,
        boxShadow: "0 2px 0 rgba(0,0,0,0.4), inset 0 -2px 0 rgba(0,229,255,0.15)",
      }}>SPACE</span>
      <span>{t.hero.pressStartTrail}</span>
      <span style={{ animation: "blink 1s step-end infinite" }}>▼</span>
    </div>
  );
}

export default function HeroSection() {
  const { t, lang } = useT();

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px 60px", position: "relative", zIndex: 1 }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1100, width: "100%" }}>
        {/* Top row: character + content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Character frame */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", letterSpacing: 2 }}>
              {t.hero.selectHero}
            </div>
            <div style={{ position: "relative", width: 320 }}>
              <div style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--yellow)", textAlign: "center", padding: 10, border: "2px solid var(--yellow)", borderBottom: "none", background: "rgba(255,215,0,0.05)", letterSpacing: 1 }}>
                {t.hero.p1Confirmed}
              </div>
              <div style={{ position: "relative", border: "2px solid var(--cyan)", background: "var(--surface)", overflow: "hidden" }}>
                <Image
                  src="/uploads/1650893737383.jpg"
                  alt="Leonardo Tino"
                  width={320}
                  height={320}
                  style={{ width: "100%", display: "block", filter: "contrast(1.1) brightness(0.95)" }}
                  priority
                />
                <div className="scanlines" />
                <div className="portrait-glow" />
                <div style={{ position: "absolute", top: 8, left: 8, fontFamily: "var(--pixel)", fontSize: 7, color: "var(--bg)", background: "var(--green)", padding: "4px 8px" }}>P1</div>
              </div>
              <div style={{ border: "2px solid var(--cyan)", borderTop: "none", padding: 12, background: "var(--surface)" }}>
                <div style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)", marginBottom: 4 }}>{t.hero.nameLabel}</div>
                <div style={{ fontFamily: "var(--pixel)", fontSize: 9, color: "var(--yellow)" }}>LEONARDO TINO</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>{t.hero.classLine}</div>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: "var(--pixel)", lineHeight: 1.6 }}>
              <span style={{ fontSize: 10, color: "var(--text-dim)", display: "block", marginBottom: 12 }}>{t.hero.greeting}</span>
              <span style={{ fontSize: 28, color: "var(--cyan)", display: "block", textShadow: "0 0 30px rgba(0,229,255,0.5)" }}>
                <Typewriter key={lang} text="LEONARDO TINO" speed={80} color="var(--cyan)" />
              </span>
              <span style={{ fontSize: 11, color: "var(--yellow)", display: "block", marginTop: 12 }}>{t.hero.role}</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-dim)", lineHeight: 1.8, borderLeft: "2px solid var(--cyan)", paddingLeft: 16 }}>
              {t.hero.desc}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { num: "5+", label: t.hero.stat1 },
                { num: "30+", label: t.hero.stat2 },
                { num: "8", label: t.hero.stat3 },
              ].map(({ num, label }) => (
                <div key={label} style={{ border: "1px solid var(--border)", padding: 12, background: "var(--surface)", transition: "border-color 0.2s" }}>
                  <div style={{ fontFamily: "var(--pixel)", fontSize: 16, color: "var(--cyan)" }}>{num}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <PixelBtn href="#projects" variant="primary">{t.hero.ctaProjects}</PixelBtn>
              <PixelBtn href="#contact" variant="secondary">{t.hero.ctaContact}</PixelBtn>
            </div>
          </div>
        </div>

        {/* GitHub snake below */}
        <div className="reveal" style={{ marginTop: 60 }}>
          <ContribSnake />
          <PressStartHint />
        </div>
      </div>
    </section>
  );
}
