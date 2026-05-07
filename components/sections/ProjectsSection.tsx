"use client";

import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS_META } from "@/lib/data";

const rarityColors = {
  legendary: "var(--yellow)",
  epic: "var(--purple)",
  rare: "var(--cyan)",
};
const rarityBg = {
  legendary: "rgba(255,215,0,0.08)",
  epic: "rgba(180,74,255,0.08)",
  rare: "rgba(0,229,255,0.08)",
};

export default function ProjectsSection() {
  const { t } = useT();

  return (
    <section
      id="projects"
      style={{ padding: "100px 40px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={t.projects.num} title={t.projects.title} em={t.projects.em} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1100 }}>
          {PROJECTS_META.map((meta, i) => {
            const txt = t.projects.list[i];
            const color = rarityColors[meta.rarity];
            return (
              <div
                key={i}
                className="reveal"
                style={{
                  border: "1px solid var(--border)", background: "var(--bg)",
                  transition: "all 0.3s", position: "relative", overflow: "hidden",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Rarity top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />

                {/* Placeholder image */}
                <div style={{ height: 160, background: "var(--surface2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 32 }}>{meta.icon}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)" }}>{txt.title.toUpperCase()}</span>
                </div>

                {/* Rarity badge */}
                <span style={{ fontFamily: "var(--pixel)", fontSize: 7, padding: "4px 8px", display: "inline-block", margin: "16px 16px 0", color, border: `1px solid ${color}`, background: rarityBg[meta.rarity] }}>
                  {meta.rarity.toUpperCase()}
                </span>

                <div style={{ padding: 16 }}>
                  <div style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--text)", marginBottom: 12 }}>{txt.title}</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 16 }}>{txt.desc}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {meta.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", border: "1px solid var(--border)", padding: "3px 8px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <a href="https://github.com/ltin0" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", textDecoration: "none" }}>
                    {t.projects.github}
                  </a>
                  <a href="#" style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", textDecoration: "none" }}>
                    {t.projects.demo}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
