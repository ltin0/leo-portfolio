"use client";

import { useRef, useState, useEffect, useCallback, useMemo, MutableRefObject } from "react";
import { useT } from "@/lib/context";
import { generateContribData, CONTRIB_COLORS } from "@/lib/data";

// Desktop: 53 weeks × 12px cells  → 746 × 102 px canvas
// Mobile:  22 weeks × 16px cells  → 396 × 136 px canvas  (taller, playable)
const DAYS = 7;
const DESKTOP = { WEEKS: 53, CELL: 12, GAP: 2 } as const;
const MOBILE  = { WEEKS: 22, CELL: 16, GAP: 3 } as const;

interface Pos { x: number; y: number; }
interface Props { onReveal?: () => void; startRef?: MutableRefObject<(() => void) | null>; }

function spawnFood(snake: Pos[], weeks: number, days: number): Pos {
  while (true) {
    const x = Math.floor(Math.random() * weeks);
    const y = Math.floor(Math.random() * days);
    if (!snake.some((s) => s.x === x && s.y === y)) return { x, y };
  }
}

function DPadBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <button
      onTouchStart={(e) => { e.preventDefault(); onPress(); }}
      onMouseDown={onPress}
      style={{
        width: 44, height: 44,
        fontFamily: "var(--pixel)", fontSize: 13, color: "var(--cyan)",
        border: "2px solid var(--border)", background: "rgba(0,229,255,0.07)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        userSelect: "none", WebkitTapHighlightColor: "transparent", touchAction: "none",
      }}
    >
      {label}
    </button>
  );
}

export default function ContribSnake({ onReveal, startRef }: Props) {
  const { t } = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalContribs, setTotalContribs] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const baseGridRef = useRef<number[][]>(generateContribData());
  const gridRef = useRef<number[][]>(generateContribData());
  const stateRef = useRef<{ snake: Pos[]; dir: Pos; pendingDir: Pos; food: Pos } | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { setIsTouch(navigator.maxTouchPoints > 0); }, []);

  // Responsive game config — recomputed once when isTouch resolves
  const cfg = useMemo(() => {
    const { WEEKS, CELL, GAP } = isTouch ? MOBILE : DESKTOP;
    return { WEEKS, CELL, GAP, W: WEEKS * (CELL + GAP) + 4, H: DAYS * (CELL + GAP) + 4 };
  }, [isTouch]);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((data) => {
        if (data.grid) baseGridRef.current = data.grid;
        if (data.total != null) setTotalContribs(data.total);
      })
      .catch(() => {});
  }, []);

  const draw = useCallback((isPlaying = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { WEEKS, CELL, GAP, W, H } = cfg;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#07090f";
    ctx.fillRect(0, 0, W, H);
    const grid = gridRef.current;
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < DAYS; d++) {
        ctx.fillStyle = CONTRIB_COLORS[grid[w]?.[d] ?? 0];
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
  }, [cfg]);

  useEffect(() => { if (revealed) draw(playing); }, [revealed, playing, draw]);

  const beginGame = useCallback(() => {
    const { WEEKS } = cfg;
    stateRef.current = {
      snake: [{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }],
      dir: { x: 1, y: 0 },
      pendingDir: { x: 1, y: 0 },
      food: spawnFood([{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }], WEEKS, DAYS),
    };
    setPlaying(true);
    setCountdown(null);
  }, [cfg]);

  const start = useCallback(() => {
    const { WEEKS } = cfg;
    const full = baseGridRef.current;
    gridRef.current = full.length >= WEEKS
      ? full.slice(-WEEKS).map((col) => [...col])
      : full.map((col) => [...col]);
    setRevealed(true);
    setGameOver(false);
    setScore(0);
    setPlaying(false);
    stateRef.current = null;
    setCountdown(3);
    onReveal?.();
  }, [cfg, onReveal]);

  const stop = useCallback(() => {
    setPlaying(false);
    setGameOver(false);
    setCountdown(null);
    stateRef.current = null;
    setTimeout(() => draw(false), 0);
  }, [draw]);

  // Countdown: 3 → 2 → 1 → 0 ("GO!") → game starts
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      const timer = setTimeout(beginGame, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, beginGame]);


  // Expose start() so HeroSection can trigger it from the mobile hint tap
  useEffect(() => {
    if (startRef) startRef.current = start;
  }, [startRef, start]);

  // Game loop
  useEffect(() => {
    if (!playing) return;
    const { WEEKS } = cfg;
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
        stateRef.current = null;
        setGameOver(true);
        setPlaying(false);
        return;
      }
      s.snake.unshift(nh);
      if (nh.x === s.food.x && nh.y === s.food.y) {
        gridRef.current[nh.x][nh.y] = 0;
        setScore((sc) => sc + 10);
        s.food = spawnFood(s.snake, WEEKS, DAYS);
      } else {
        s.snake.pop();
      }
      draw(true);
    }, 130);
    return () => clearInterval(interval);
  }, [playing, cfg, draw]);

  // Arrow / WASD keys
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

  // Space / ESC
  useEffect(() => {
    const isTyping = (el: Element | null) => {
      if (!el) return false;
      const tag = (el.tagName || "").toLowerCase();
      return tag === "input" || tag === "textarea";
    };
    const onDown = (e: KeyboardEvent) => {
      if (isTyping(document.activeElement)) return;
      if (e.key === "Escape") {
        if (playing || gameOver || countdown !== null) { e.preventDefault(); stop(); }
        return;
      }
      if (e.code !== "Space" && e.key !== " ") return;
      e.preventDefault();
      if (!revealed) { start(); return; }
      if (countdown !== null) return;
      if (playing) stop(); else start();
    };
    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
  }, [playing, revealed, gameOver, countdown, stop, start]);

  const pressDir = useCallback((dir: Pos) => {
    const s = stateRef.current;
    if (!s || (dir.x === -s.dir.x && dir.y === -s.dir.y)) return;
    s.pendingDir = dir;
  }, []);

  if (!revealed) return null;

  const { W, H } = cfg;
  const cdColor = countdown === 1 ? "var(--magenta)" : countdown === 2 ? "var(--yellow)" : "var(--green)";
  const cdLabel = countdown === 0 ? "GO!" : String(countdown);
  const activeGame = playing || countdown !== null;

  return (
    <div style={{
      marginTop: 8,
      border: `1px solid ${playing ? "var(--green)" : "var(--border)"}`,
      background: "var(--bg)", padding: 12, transition: "border-color 0.3s",
      animation: "slideUp 0.4s ease both",
      ...(playing ? { boxShadow: "0 0 24px rgba(57,255,20,0.25)" } : {}),
    }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--text-dim)", letterSpacing: 1 }}>
          ◆ <strong style={{ color: "var(--green)" }}>@LTIN0</strong>
          {totalContribs != null && (
            <span style={{ color: "var(--cyan)", marginLeft: 6 }}>· {totalContribs.toLocaleString()} CONTRIBUTIONS</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {playing && (
            <span style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--yellow)" }}>
              {t.contrib.score}: {score}
            </span>
          )}
          {!gameOver && (
            <button
              onClick={playing ? stop : start}
              disabled={countdown !== null && !playing}
              style={{
                fontFamily: "var(--pixel)", fontSize: 7, padding: "6px 10px",
                border: `1px solid ${playing ? "var(--magenta)" : "var(--green)"}`,
                background: playing ? "var(--magenta)" : "rgba(57,255,20,0.08)",
                color: playing ? "var(--bg)" : "var(--green)",
                cursor: "pointer", transition: "all 0.2s",
                opacity: countdown !== null && !playing ? 0.4 : 1,
              }}
            >
              {playing ? t.contrib.stop : t.contrib.play}
            </button>
          )}
        </div>
      </div>

      {/* Canvas + overlays */}
      <div
        style={{ position: "relative", overflow: "hidden", touchAction: activeGame ? "none" : "auto" }}
        onTouchStart={(e) => {
          if (!playing) return;
          touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          if (!playing || !touchStartRef.current) return;
          const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
          const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
          touchStartRef.current = null;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20)
            pressDir(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
          else if (Math.abs(dy) > 20)
            pressDir(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
        }}
        onTouchMove={(e) => { if (activeGame) e.preventDefault(); }}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display: "block", imageRendering: "pixelated", width: "100%", aspectRatio: `${W} / ${H}` }}
        />

        {/* Countdown */}
        {countdown !== null && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(7,9,15,0.72)",
          }}>
            <div style={{
              fontFamily: "var(--pixel)",
              fontSize: countdown === 0 ? 28 : 52,
              color: countdown === 0 ? "var(--cyan)" : cdColor,
              textShadow: "0 0 40px currentColor",
              animation: "blink 0.5s step-end",
              lineHeight: 1,
            }}>
              {cdLabel}
            </div>
          </div>
        )}

        {/* Game over */}
        {gameOver && !playing && countdown === null && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "rgba(7,9,15,0.85)", gap: 14,
            animation: "slideUp 0.3s ease both",
          }}>
            <div style={{ fontFamily: "var(--pixel)", fontSize: 14, color: "var(--magenta)", textShadow: "0 0 24px var(--magenta)", letterSpacing: 2 }}>
              {t.contrib.gameOver}
            </div>
            <div style={{ fontFamily: "var(--pixel)", fontSize: 10, color: "var(--yellow)" }}>{score} PTS</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              <button onClick={start} style={{
                fontFamily: "var(--pixel)", fontSize: 8, padding: "10px 14px",
                border: "1px solid var(--green)", background: "rgba(57,255,20,0.12)",
                color: "var(--green)", cursor: "pointer", letterSpacing: 1,
              }}>
                ↻ {t.contrib.tryAgain}
              </button>
              <button onClick={stop} style={{
                fontFamily: "var(--pixel)", fontSize: 8, padding: "10px 14px",
                border: "1px solid var(--border)", background: "transparent",
                color: "var(--text-dim)", cursor: "pointer", letterSpacing: 1,
              }}>
                {t.contrib.escHint}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* D-pad — touch devices only, while game is active */}
      {isTouch && activeGame && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 44px)",
          gridTemplateRows: "repeat(2, 44px)",
          gap: 4, margin: "12px auto 4px", width: "fit-content",
        }}>
          <div /><DPadBtn label="▲" onPress={() => pressDir({ x: 0, y: -1 })} /><div />
          <DPadBtn label="◄" onPress={() => pressDir({ x: -1, y: 0 })} />
          <DPadBtn label="▼" onPress={() => pressDir({ x: 0, y: 1 })} />
          <DPadBtn label="►" onPress={() => pressDir({ x: 1, y: 0 })} />
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 10, fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)",
        flexWrap: "wrap", gap: 6,
      }}>
        <span>{playing && !isTouch ? "⌨ " + t.contrib.hint : t.contrib.dayHint}</span>
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
