"use client";

import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillBar from "@/components/ui/SkillBar";
import { SKILLS_DATA, Skill } from "@/lib/data";

export default function SkillsSection() {
  const { t } = useT();

  const byCategory = SKILLS_DATA.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.cat]) acc[s.cat] = [];
    acc[s.cat].push(s);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="section-pad"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={t.skills.num} title={t.skills.title} em={t.skills.em} />
        <div className="grid-skills">
          {Object.entries(byCategory).map(([cat, skills]) => (
            <div key={cat} className="reveal">
              <div style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, background: "var(--cyan)" }} />
                {cat}
              </div>
              {skills.map((s) => <SkillBar key={s.name} skill={s} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
