"use client";

import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";
import { EXP_META } from "@/lib/data";

export default function ExperienceSection() {
  const { t } = useT();

  return (
    <section
      id="experience"
      className="section-pad"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={t.exp.num} title={t.exp.title} em={t.exp.em} />
        <div className="timeline">
          <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--cyan), transparent)" }} />

          {EXP_META.map((meta, i) => {
            const e = t.exp.list[i];
            return (
              <div
                key={i}
                className="reveal"
                style={{ position: "relative", marginBottom: 52, transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{ position: "absolute", left: -36, top: 4, width: 12, height: 12, background: "var(--cyan)", border: "2px solid var(--bg)" }} />

                <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)", marginBottom: 8 }}>◆ {e.year}</div>
                <div style={{ fontFamily: "var(--pixel)", fontSize: 11, color: "var(--text)", marginBottom: 4 }}>{e.role}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--yellow)", marginBottom: 4 }}>{e.company}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-dim)", fontStyle: "italic", marginBottom: 12 }}>{e.desc}</div>

                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  {e.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--cyan)", fontFamily: "var(--mono)", fontSize: 13, flexShrink: 0, marginTop: 2 }}>▶</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7 }}>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {meta.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "var(--pixel)", fontSize: 6, color: "var(--green)", border: "1px solid var(--green)", padding: "3px 8px", background: "rgba(57,255,20,0.06)" }}>
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
