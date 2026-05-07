"use client";

import { useState, useEffect, useRef } from "react";
import { Skill } from "@/lib/data";

export default function SkillBar({ skill }: { skill: Skill }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(skill.pct);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.pct]);

  return (
    <div className="skill-item" ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text)" }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)" }}>
          {skill.pct}/100
        </span>
      </div>
      <div
        style={{
          height: 16,
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className={`skill-bar-fill ${skill.cls}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
