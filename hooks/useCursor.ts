"use client";

import { useEffect } from "react";

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
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
