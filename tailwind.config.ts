import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07090f",
        surface: "#0d1422",
        surface2: "#111827",
        border: "#1e3352",
        green: "#39ff14",
        cyan: "#00e5ff",
        yellow: "#ffd700",
        magenta: "#ff2d78",
        purple: "#b44aff",
        text: "#c8d8e8",
        "text-dim": "#5a7a9a",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ['"Share Tech Mono"', "monospace"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "blink-slow": "blink 2s step-end infinite",
        "slide-up": "slideUp 0.2s ease",
        "vis-bar": "visBar 0.6s ease-in-out infinite alternate",
        "fade-out": "fadeOut 0.6s forwards",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        visBar: {
          "0%": { height: "2px" },
          "100%": { height: "14px" },
        },
        fadeOut: {
          to: { opacity: "0", pointerEvents: "none" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
