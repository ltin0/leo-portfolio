"use client";

import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutSection() {
  const { t } = useT();
  const a = t.about;

  return (
    <section
      id="about"
      style={{ padding: "100px 40px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={a.num} title={a.title} em={a.em} />
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, alignItems: "start", maxWidth: 1000 }}>
          {/* Quest log */}
          <div className="reveal" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
            <div style={{ fontFamily: "var(--pixel)", fontSize: 8, padding: "12px 16px", background: "var(--surface2)", color: "var(--yellow)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              ◆ {a.logHeader}
            </div>
            <div style={{ padding: 24, fontFamily: "var(--body)", fontSize: 14, lineHeight: 1.9, color: "var(--text)" }}>
              <p>{a.p1}</p>
              <p style={{ marginTop: 16 }}>{a.p2}</p>
              <p style={{ marginTop: 16 }}>{a.p3}</p>
            </div>
          </div>

          {/* Cards */}
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Character sheet */}
            <div style={{ border: "1px solid var(--border)", padding: 20, background: "var(--bg)" }}>
              <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)", marginBottom: 12 }}>{a.cardTitle}</div>
              {[
                { k: a.location,  v: a.locationVal,  color: "var(--text)" },
                { k: a.available, v: a.availableVal, color: "var(--green)" },
                { k: a.languages, v: a.languagesVal, color: "var(--text)" },
              ].map(({ k, v, color }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div style={{ border: "1px solid var(--border)", padding: 20, background: "var(--bg)" }}>
              <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)", marginBottom: 12 }}>{a.linksTitle}</div>
              {[
                { k: "GitHub",   v: "@ltin0",         href: "https://github.com/ltin0" },
                { k: "LinkedIn", v: "leonardo-tino",  href: "https://www.linkedin.com/in/leonardo-tino/" },
                { k: "WhatsApp", v: "11985688911",     href: "https://wa.me/5511985688911" },
              ].map(({ k, v, href }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)" }}>{k}</span>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--cyan)", textDecoration: "none" }}>{v}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
