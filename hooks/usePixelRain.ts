"use client";

import { useEffect } from "react";

export function usePixelRain() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const cols = Math.floor(W / 16);
    const drops = Array(cols).fill(0).map(() => Math.random() * (H / 16));
    const chars = "01アイウエオカキクケコサシスセソタ{}[]<>/\\|=+";
    const colors = ["#39ff14", "#00e5ff", "#ffd700", "#ff2d78", "#b44aff"];
    let raf: number;

    function draw() {
      ctx.fillStyle = "rgba(7,9,15,0.08)";
      ctx.fillRect(0, 0, W, H);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.font = '12px "Press Start 2P"';
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > H && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.3;
      });
      raf = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
