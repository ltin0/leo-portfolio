"use client";

import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
  color?: string;
}

export default function Typewriter({ text, speed = 60, color }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span style={{ color }}>
      {displayed}
      {displayed.length < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 14,
            background: "var(--cyan)",
            animation: "blink 1s step-end infinite",
            verticalAlign: "middle",
            marginLeft: 2,
          }}
        />
      )}
    </span>
  );
}
