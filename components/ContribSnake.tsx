"use client";

import { useRef, useState, useEffect } from "react";
import { useT } from "@/lib/context";
import { generateContribData, CONTRIB_COLORS } from "@/lib/data";

const CELL = 12, GAP = 2, WEEKS = 53, DAYS = 7;
const W = WEEKS * (CELL + GAP) + 4;
const H = DAYS * (CELL + GAP) + 4;

interface Pos { x: number; y: number; }

function spawnFood(snake: Pos[]): Pos {
  while (true) {
    const x = Math.floor(Math.random() * WEEKS);
    const y = Math.floor(Math.random() * DAYS);
    if (!snake.some((s) => s.x === x && s.y === y)) return { x, y };
  }
}

export default function ContribSnake() {
  const { t } = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gridRef = useRef<number[][]>(generateContribData());
  const stateRef = useRef<{ snake: Pos[]; dir: Pos; pendingDir: Pos; food: Pos } | null>(null);

  const draw = (isPlaying = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#07090f";
    ctx.fillRect(0, 0, W, H);
    const grid = gridRef.current;
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < DAYS; d++) {
        ctx.fillStyle = CONTRIB_COLORS[grid[w][d]];
        ctx.fillRect(2 + w * (CELL + GAP), 2 + d * (CELL + GAP), CELL, CELL);
      }
    }
    if (stateRef.current && isPlaying) {
      const { snake, food } = stateRef.current;
      const fx = 2 + food.x * (CELL + GAP), fy = 2 + food.y * (CELL + GAP);
      ctx.fillStyle = "rgba(255,215,0,0.4)";
      ctx.fillRect(fx - 2, fy - 2, CELL + 4, CELL + 4);
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(fx, fy, CELL, CELL);
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#00e5ff" : "#ff2d78";
        ctx.fillRect(2 + seg.x * (CELL + GAP), 2 + seg.y * (CELL + GAP), CELL, CELL);
      });
    }
  };

  useEffect(() => { draw(false); }, []);
  useEffect(() => { draw(playing); }, [playing]);

  const start = () => {
    gridRef.current = generateContribData();
    setGameOver(false);
    setScore(0);
    stateRef.current = {
      snake: [{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }],
      dir: { x: 1, y: 0 },
      pendingDir: { x: 1, y: 0 },
      food: spawnFood([{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }]),
    };
    setPlaying(true);
  };

  const stop = () => {
    setPlaying(false);
    stateRef.current = null;
    setTimeout(() => draw(false), 0);
  };

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const s = stateRef.current;
      if (!s) return;
      s.dir = s.pendingDir;
      const head = s.snake[0];
      const nh = {
        x: (head.x + s.dir.x + WEEKS) % WEEKS,
        y: (head.y + s.dir.y + DAYS) % DAYS,
      };
      if (s.snake.some((seg) => seg.x === nh.x && seg.y === nh.y)) {
        setGameOver(true);
        setPlaying(false);
        return;
      }
      s.snake.unshift(nh);
      if (nh.x === s.food.x && nh.y === s.food.y) {
        gridRef.current[nh.x][nh.y] = 0;
        setScore((sc) => sc + 10);
        s.food = spawnFood(s.snake);
      } else {
        s.snake.pop();
      }
      draw(true);
    }, 130);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s) return;
      const map: Record<string, Pos> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
      };
      const nd = map[e.key];
      if (!nd || (nd.x === -s.dir.x && nd.y === -s.dir.y)) return;
      s.pendingDir = nd;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  useEffect(() => {
    const isTyping = (el: Element | null) => {
      if (!el) return false;
      const tag = (el.tagName || "").toLowerCase();
      return tag === "input" || tag === "textarea";
    };
    const onDown = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      if (isTyping(document.activeElement)) return;
      e.preventDefault();
      if (playing) stop(); else start();
    };
    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
  }, [playing]);

  const playingStyle: React.CSSProperties = {
    border: "1px solid var(--green)",
    boxShadow: "0 0 24px rgba(57,255,20,0.25)",
  };

  return (
    <div
      style={{
        marginTop: 8,
        border: `1px solid ${playing ? "var(--green)" : "var(--border)"}`,
        background: "var(--bg)",
        padding: 16,
        transition: "border-color 0.3s",
        ...(playing ? playingStyle : {}),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", letterSpacing: 1 }}>
          ◆ <strong style={{ color: "var(--green)" }}>@LTIN0</strong> · {t.contrib.title}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {playing && <span style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--yellow)" }}>{t.contrib.score}: {score}</span>}
          {gameOver && !playing && <span style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--magenta)" }}>{t.contrib.gameOver} · {score} PTS</span>}
          <button
            onClick={playing ? stop : start}
            style={{
              fontFamily: "var(--pixel)", fontSize: 7, padding: "6px 10px",
              border: `1px solid ${playing ? "var(--magenta)" : "var(--green)"}`,
              background: playing ? "var(--magenta)" : "rgba(57,255,20,0.08)",
              color: playing ? "var(--bg)" : "var(--green)",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {playing ? t.contrib.stop : gameOver ? t.contrib.retry : t.contrib.play}
          </button>
        </div>
      </div>
      <div style={{ position: "relative", overflowX: "auto", overflowY: "hidden" }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: "block", imageRendering: "pixelated", maxWidth: "100%" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)" }}>
        <span>{playing ? "⌨ " + t.contrib.hint : t.contrib.dayHint}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ marginRight: 4 }}>{t.contrib.less}</span>
          {CONTRIB_COLORS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, border: "1px solid var(--border)", background: c }} />
          ))}
          <span style={{ marginLeft: 4 }}>{t.contrib.more}</span>
        </div>
      </div>
    </div>
  );
}
