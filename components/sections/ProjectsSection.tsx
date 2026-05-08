"use client";

import Image from "next/image";
import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS_META } from "@/lib/data";

const rarityColors = { legendary: "var(--yellow)", epic: "var(--purple)", rare: "var(--cyan)" };
const rarityBg    = { legendary: "rgba(255,215,0,0.08)", epic: "rgba(180,74,255,0.08)", rare: "rgba(0,229,255,0.08)" };

const CATEGORIES = [
  { label: "ECOSSISTEMA RUK",         count: 3 },
  { label: "APPS & DASHBOARDS",       count: 3 },
  { label: "PORTAIS DE CONTEÚDO",     count: 3 },
  { label: "INSTITUCIONAIS / LANDING PAGES", count: 6 },
  { label: "LOJAS VIRTUAIS",          count: 3 },
];

export default function ProjectsSection() {
  const { t } = useT();

  let idx = 0;
  let imgIdx = 0;

  return (
    <section
      id="projects"
      className="section-pad"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={t.projects.num} title={t.projects.title} em={t.projects.em} />

        {CATEGORIES.map(({ label, count }) => {
          const slice = PROJECTS_META.slice(idx, idx + count);
          const txtSlice = t.projects.list.slice(idx, idx + count);
          idx += count;

          return (
            <div key={label} style={{ marginBottom: 48 }}>
              <div style={{
                fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)",
                marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ color: "var(--cyan)" }}>▶</span>
                {label}
                <div style={{ flex: 1, height: 1, background: "var(--border)", maxWidth: 200 }} />
              </div>

              <div className="grid-projects">
                {slice.map((meta, i) => {
                  const txt = txtSlice[i];
                  const color = rarityColors[meta.rarity];
                  const isFirst = meta.image ? imgIdx++ === 0 : false;
                  return (
                    <div
                      key={i}
                      className="reveal"
                      style={{
                        border: "1px solid var(--border)", background: "var(--bg)",
                        position: "relative", overflow: "hidden",
                        transition: "all 0.3s",
                        display: "flex", flexDirection: "column",
                      }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />

                      <div style={{ height: 160, background: "var(--surface2)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                        {meta.image ? (
                          <>
                            <Image
                              src={meta.image}
                              alt={txt.title}
                              fill
                              style={{ objectFit: "cover", objectPosition: "top" }}
                              sizes="(max-width: 768px) 100vw, 33vw"
                              {...(isFirst ? { priority: true } : { loading: "lazy" })}
                            />
                            {/* overlay */}
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,9,15,0.15) 0%, rgba(7,9,15,0.55) 100%)" }} />
                            <div style={{ position: "absolute", inset: 0, background: `${color}12` }} />
                          </>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 8 }}>
                            <span style={{ fontSize: 26 }}>{meta.icon}</span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)" }}>{txt.title.toUpperCase()}</span>
                          </div>
                        )}
                      </div>

                      <span style={{ fontFamily: "var(--pixel)", fontSize: 7, padding: "4px 8px", display: "inline-block", margin: "12px 12px 0", color, border: `1px solid ${color}`, background: rarityBg[meta.rarity] }}>
                        {meta.rarity.toUpperCase()}
                      </span>

                      <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text)", lineHeight: 1.6 }}>{txt.title}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, flex: 1 }}>{txt.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {meta.tags.map((tag) => (
                            <span key={tag} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", border: "1px solid var(--border)", padding: "3px 8px" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
                        {meta.github && (
                          <a href={meta.github} target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", textDecoration: "none" }}>
                            {t.projects.github}
                          </a>
                        )}
                        {meta.link && (
                          <a href={meta.link} target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)", textDecoration: "none" }}>
                            {t.projects.demo}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
