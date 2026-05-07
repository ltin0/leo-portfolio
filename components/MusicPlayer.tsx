"use client";

import { useState, useEffect, useRef } from "react";

const NOTES: Record<string, number> = {
  C3: 130.81, Eb3: 155.56, F3: 174.61, G3: 196.00, Ab3: 207.65, Bb3: 233.08,
  C4: 261.63, Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16,
  C5: 523.25, Eb5: 622.25, F5: 698.46, G5: 783.99,
};

const MELODY: [string, number][] = [
  ["C5",2],["G4",1],["Eb5",1],["F5",2],["Eb5",1],["C5",1],
  ["Bb4",2],["G4",1],["Bb4",1],["C5",4],
  ["Eb5",2],["G4",1],["F5",1],["G5",2],["Eb5",1],["C5",1],
  ["Bb4",2],["G4",2],["C5",4],
];
const BASS: [string, number][] = [
  ["C3",4],["Ab3",4],["F3",4],["G3",4],
  ["C3",4],["Eb3",4],["F3",4],["G3",4],
];

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = volume;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;
      filter.Q.value = 0.7;
      filter.connect(master);
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
      filterRef.current = filter;
    }
    return ctxRef.current;
  };

  const playNote = (ctx: AudioContext, freq: number, time: number, dur: number, type: OscillatorType, gain: number) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(gain, time + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(env);
    if (filterRef.current) env.connect(filterRef.current);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  };

  const startLoop = () => {
    const ctx = ensureCtx();
    if (ctx.state === "suspended") ctx.resume();
    const BPM = 72;
    const beat = 60 / BPM;
    let t = ctx.currentTime + 0.1;

    const scheduleBar = () => {
      let cursor = t;
      for (const [n, b] of MELODY) {
        playNote(ctx, NOTES[n], cursor, b * beat * 0.95, "triangle", 0.18);
        cursor += b * beat;
      }
      let bc = t;
      for (const [n, b] of BASS) {
        playNote(ctx, NOTES[n], bc, b * beat * 0.9, "square", 0.06);
        bc += b * beat;
      }
      let ac = t;
      const arp = ["C5", "Eb5", "G5", "Eb5"];
      const totalBeats = MELODY.reduce((s, [, b]) => s + b, 0);
      for (let i = 0; i < totalBeats * 2; i++) {
        playNote(ctx, NOTES[arp[i % arp.length]] * 2, ac, 0.08, "sine", 0.025);
        ac += beat * 0.5;
      }
      t += totalBeats * beat;
    };

    scheduleBar();
    const loopMs = MELODY.reduce((s, [, b]) => s + b, 0) * beat * 1000;
    timerRef.current = setInterval(scheduleBar, loopMs);
  };

  const stopLoop = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (ctxRef.current && masterRef.current) {
      const m = masterRef.current;
      const ctx = ctxRef.current;
      try {
        m.gain.cancelScheduledValues(ctx.currentTime);
        m.gain.setValueAtTime(m.gain.value, ctx.currentTime);
        m.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      } catch {}
      setTimeout(() => {
        ctxRef.current?.close();
        ctxRef.current = null;
        masterRef.current = null;
        filterRef.current = null;
      }, 350);
    }
  };

  const toggle = () => {
    if (playing) { stopLoop(); setPlaying(false); }
    else { startLoop(); setPlaying(true); }
  };

  useEffect(() => {
    if (masterRef.current) masterRef.current.gain.value = volume;
  }, [volume]);

  useEffect(() => () => stopLoop(), []);

  const onVolClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setVolume(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };

  return (
    <div
      className={`music-player${playing ? " playing" : ""}`}
      style={{
        position: "fixed", bottom: 20, left: 20, zIndex: 100,
        background: "var(--surface)", border: `2px solid ${playing ? "var(--cyan)" : "var(--border)"}`,
        padding: 8, display: "flex", alignItems: "center", gap: 8,
        boxShadow: playing ? "0 4px 0 rgba(0,0,0,0.5), 0 0 12px rgba(0,229,255,0.25)" : "0 4px 0 rgba(0,0,0,0.5)",
        transition: "all 0.25s ease",
      }}
    >
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{ width: 28, height: 28, border: "2px solid var(--cyan)", background: "var(--bg)", color: "var(--cyan)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--pixel)", fontSize: 10, padding: 0 }}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16, padding: "0 4px" }} aria-hidden>
        <div className="music-bar" /><div className="music-bar" /><div className="music-bar" /><div className="music-bar" />
      </div>
      <div className="music-track-info" style={{ flexDirection: "column", gap: 2, minWidth: 100 }}>
        <div style={{ fontFamily: "var(--pixel)", fontSize: 7, color: "var(--cyan)", letterSpacing: 0.5 }}>♪ NOW PLAYING</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden" }}>PIXEL DREAMS — 8-BIT</div>
      </div>
      <div
        className="music-vol"
        onClick={onVolClick}
        style={{ width: 60, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", cursor: "pointer", position: "relative" }}
        title={`Volume: ${Math.round(volume * 100)}%`}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "var(--cyan)", width: `${volume * 100}%`, pointerEvents: "none" }} />
      </div>
    </div>
  );
}
