"use client";

import { useEffect } from "react";
import { usePixelRain } from "@/hooks/usePixelRain";
import { useCursor } from "@/hooks/useCursor";
import { useReveal } from "@/hooks/useReveal";

import NavBar from "@/components/NavBar";
import BootScreen from "@/components/BootScreen";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import MusicPlayer from "@/components/MusicPlayer";
import NPCCompanion from "@/components/NPCCompanion";
import { useT } from "@/lib/context";

function Footer() {
  const { t } = useT();
  return (
    <footer
      style={{
        textAlign: "center", padding: "40px 20px",
        borderTop: "1px solid var(--border)",
        fontFamily: "var(--pixel)", fontSize: 8, color: "var(--text-dim)",
        position: "relative", zIndex: 1,
      }}
    >
      {t.footer}
    </footer>
  );
}

export default function Home() {
  usePixelRain();
  useCursor();
  useReveal();

  return (
    <>
      <BootScreen />
      <canvas id="bg-canvas" style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: "none" }} />
      <div id="cursor" className="cursor" />
      <div id="cursor-trail" className="cursor-trail" />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <MusicPlayer />
      <NPCCompanion />
    </>
  );
}
