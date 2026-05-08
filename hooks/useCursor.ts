"use client";

import { useEffect } from "react";

const CLICKABLE = "a, button, input, select, textarea, label, [role='button'], .music-vol, .npc-root, .music-player";

export function useCursor() {
  useEffect(() => {
    const c = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");
    if (!c || !trail) return;

    const onMove = (e: MouseEvent) => {
      c.style.left = e.clientX - 6 + "px";
      c.style.top = e.clientY - 6 + "px";
      setTimeout(() => {
        trail.style.left = e.clientX - 3 + "px";
        trail.style.top = e.clientY - 3 + "px";
      }, 80);

      const isClickable = !!(e.target as Element)?.closest(CLICKABLE);
      c.classList.toggle("cursor--hover", isClickable);
      trail.classList.toggle("cursor--hover", isClickable);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
