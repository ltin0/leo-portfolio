import type { Metadata } from "next";
import { Press_Start_2P, Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/context";
import EasterEgg from "@/components/EasterEgg";
import SourceComment from "@/components/SourceComment";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--pixel",
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--mono",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leonardo Tino — Full Stack Engineer",
  description: "Portfolio de Leonardo Tino, Full Stack Developer com experiência em React, Node.js, PHP, Python, Docker e WordPress.",
  keywords: ["Full Stack Developer", "React", "Node.js", "PHP", "Docker", "Leonardo Tino"],
  openGraph: {
    title: "Leonardo Tino — Full Stack Engineer",
    description: "Full Stack Developer | React · Node.js · PHP · Docker",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${pressStart.variable} ${shareTech.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          <SourceComment />
          {children}
          <EasterEgg />
        </LanguageProvider>
      </body>
    </html>
  );
}
