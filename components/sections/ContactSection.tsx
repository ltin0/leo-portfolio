"use client";

import { useState } from "react";
import { useT } from "@/lib/context";
import SectionHeader from "@/components/ui/SectionHeader";

function ContactForm() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "sending" | "sent" | "error">(null);
  const c = t.contact;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    const mailto = `mailto:leo_tino@outlook.com.br?subject=Contato%20-%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\n— " + form.email)}`;
    window.location.href = mailto;
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)",
    fontFamily: "var(--mono)", fontSize: 13, padding: "10px 14px", outline: "none",
    transition: "border-color 0.2s", resize: "none", width: "100%",
  };

  return (
    <div className="reveal" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
      <div style={{ fontFamily: "var(--pixel)", fontSize: 8, padding: "12px 16px", background: "var(--surface2)", color: "var(--magenta)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        ◆ {c.formHeader}
      </div>
      <form style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }} onSubmit={send}>
        {[
          { label: c.name, key: "name" as const, ph: c.namePh, type: "text" },
          { label: c.email, key: "email" as const, ph: c.emailPh, type: "email" },
        ].map(({ label, key, ph, type }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)" }}>{label}</label>
            <input style={inputStyle} type={type} placeholder={ph} value={form[key]} onChange={set(key)} required />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)" }}>{c.message}</label>
          <textarea style={inputStyle} rows={5} placeholder={c.messagePh} value={form.message} onChange={set("message")} required />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            fontFamily: "var(--pixel)", fontSize: 8, padding: 14,
            background: status === "sending" ? "var(--surface2)" : "var(--magenta)",
            color: "var(--bg)", border: "none",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            transition: "all 0.2s", letterSpacing: 1,
            opacity: status === "sending" ? 0.5 : 1,
          }}
        >
          {status === "sending" ? c.sending : status === "sent" ? c.sent : c.send}
        </button>
        {status === "sent" && <div style={{ fontFamily: "var(--mono)", fontSize: 12, textAlign: "center", padding: 8, color: "var(--green)" }}>{c.sentNote}</div>}
        {status === "error" && <div style={{ fontFamily: "var(--mono)", fontSize: 12, textAlign: "center", padding: 8, color: "var(--magenta)" }}>{c.errorNote}</div>}
      </form>
    </div>
  );
}

function Terminal() {
  const { t, lang } = useT();
  const c = t.contact;

  return (
    <div className="reveal" style={{ border: "1px solid var(--cyan)", background: "var(--bg)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
        {["#ff5f56","#ffbd2e","#27c93f"].map((bg) => (
          <div key={bg} style={{ width: 10, height: 10, background: bg }} />
        ))}
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", marginLeft: 8 }}>lt@portfolio ~ $</span>
      </div>
      <div style={{ padding: 24, fontFamily: "var(--mono)", fontSize: 13 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>lt@portfolio:~$</span>
          <span style={{ color: "var(--text)" }}>{c.whoami}</span>
        </div>
        <div style={{ paddingLeft: 20, marginBottom: 16, color: "var(--text)" }}>{c.whoamiAns}</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>lt@portfolio:~$</span>
          <span style={{ color: "var(--text)" }}>{c.listCmd}</span>
        </div>
        <div style={{ paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 8, color: "var(--text)" }}>
          <div>📧 <a href="https://wa.me/5511985688911" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>WhatsApp: (11) 98568-8911</a></div>
          <div>💼 <a href="https://www.linkedin.com/in/leonardo-tino/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>LinkedIn: /in/leonardo-tino</a></div>
          <div>💻 <a href="https://github.com/ltin0" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>GitHub: /ltin0</a></div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>lt@portfolio:~$</span>
          <span style={{ color: "var(--text)" }}>{c.statusCmd}</span>
        </div>
        <div style={{ paddingLeft: 20, marginBottom: 16, color: "var(--green)" }}>{c.statusAns}</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>lt@portfolio:~$</span>
          <span style={{ color: "var(--text)" }}>{c.cvCmd}</span>
        </div>
        <div style={{ paddingLeft: 20, marginBottom: 16 }}>
          <a
            href={lang === "pt" ? "/cv-leonardo-tino-pt.pdf" : "/cv-leonardo-tino-en.pdf"}
            download
            style={{ color: "var(--yellow)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 13 }}
          >
            {c.cvLabel}
          </a>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ color: "var(--green)" }}>lt@portfolio:~$</span>
          <span style={{ display: "inline-block", width: 8, height: 14, background: "var(--cyan)", animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { t } = useT();
  const c = t.contact;

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader num={c.num} title={c.title} em={c.em} />
        <div className="grid-contact">
          <Terminal />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
