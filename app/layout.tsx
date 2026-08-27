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
  metadataBase: new URL("https://leotino.dev"),
  title: "Leonardo Tino — Full-Stack Product Engineer",
  description: "Portfólio de Leonardo Tino: produtos SaaS B2B, automações com IA, plataformas de alto tráfego e engenharia full stack com TypeScript, Next.js e NestJS.",
  keywords: ["Full-Stack Product Engineer", "TypeScript", "Next.js", "NestJS", "SaaS", "AI Automation", "WordPress", "Leonardo Tino"],
  openGraph: {
    title: "Leonardo Tino — Full-Stack Product Engineer",
    description: "B2B SaaS · AI automation · high-traffic web platforms",
    type: "website",
    url: "https://leotino.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Tino — Full-Stack Product Engineer",
    description: "B2B SaaS · AI automation · high-traffic web platforms",
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
