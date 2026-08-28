import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Leonardo Tino — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07090f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "64px 80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#00e5ff", display: "flex" }} />
        {/* Bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#00e5ff", display: "flex" }} />

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 24, left: 24, width: 28, height: 28, borderTop: "3px solid #ffd700", borderLeft: "3px solid #ffd700", display: "flex" }} />
        <div style={{ position: "absolute", top: 24, right: 24, width: 28, height: 28, borderTop: "3px solid #ffd700", borderRight: "3px solid #ffd700", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, width: 28, height: 28, borderBottom: "3px solid #ffd700", borderLeft: "3px solid #ffd700", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 24, right: 24, width: 28, height: 28, borderBottom: "3px solid #ffd700", borderRight: "3px solid #ffd700", display: "flex" }} />

        {/* Scanlines */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 6px)",
        }} />

        {/* Prompt prefix */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ color: "#00e5ff", fontSize: 22, fontFamily: "monospace" }}>{">"}</div>
          <div style={{ color: "#5a7a9a", fontSize: 18, fontFamily: "monospace", letterSpacing: 2 }}>
            portfolio.exe
          </div>
        </div>

        {/* Name */}
        <div style={{
          color: "#c8d8e8",
          fontSize: 72,
          fontWeight: 700,
          fontFamily: "monospace",
          lineHeight: 1.1,
          marginBottom: 16,
          display: "flex",
        }}>
          Leonardo Tino
        </div>

        {/* Role */}
        <div style={{
          color: "#00e5ff",
          fontSize: 28,
          fontFamily: "monospace",
          letterSpacing: 4,
          marginBottom: 48,
          display: "flex",
        }}>
          ⚡ FULL STACK ENGINEER
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {["React", "Next.js", "Node.js", "TypeScript", "PHP", "Docker"].map((tech) => (
            <div
              key={tech}
              style={{
                color: "#5a7a9a",
                fontSize: 18,
                fontFamily: "monospace",
                border: "1px solid #1e3352",
                padding: "8px 18px",
                background: "#0d1422",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL bottom right */}
        <div style={{
          position: "absolute", bottom: 40, right: 72,
          color: "#ffd700", fontSize: 20, fontFamily: "monospace",
          letterSpacing: 1, display: "flex",
        }}>
          leotino.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
