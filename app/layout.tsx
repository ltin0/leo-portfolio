import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/context";

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
    <html lang="pt-BR">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
