export interface Skill {
  name: string;
  pct: number;
  cls: string;
  cat: string;
}

export interface ProjectMeta {
  tags: string[];
  rarity: "legendary" | "epic" | "rare";
  icon: string;
  link?: string;
}

export interface ExpMeta {
  tags: string[];
}

export const SKILLS_DATA: Skill[] = [
  // FRONT-END
  { name: "React",       pct: 90, cls: "react",      cat: "FRONT-END" },
  { name: "Next.js",     pct: 85, cls: "nextjs",     cat: "FRONT-END" },
  { name: "TypeScript",  pct: 80, cls: "typescript", cat: "FRONT-END" },
  { name: "HTML / CSS",  pct: 95, cls: "htmlcss",    cat: "FRONT-END" },
  { name: "Tailwind",    pct: 88, cls: "tailwind",   cat: "FRONT-END" },
  // BACK-END
  { name: "Node.js",     pct: 85, cls: "nodejs",     cat: "BACK-END"  },
  { name: "PHP",         pct: 80, cls: "php",         cat: "BACK-END"  },
  { name: "Laravel",     pct: 72, cls: "laravel",    cat: "BACK-END"  },
  { name: "Python",      pct: 70, cls: "python",     cat: "BACK-END"  },
  { name: "REST API",    pct: 90, cls: "restapi",    cat: "BACK-END"  },
  // DATA
  { name: "MySQL",       pct: 82, cls: "mysql",      cat: "DATA"      },
  { name: "PostgreSQL",  pct: 72, cls: "postgresql", cat: "DATA"      },
  // INFRA
  { name: "Docker",      pct: 78, cls: "docker",     cat: "INFRA"     },
  { name: "NGINX",       pct: 80, cls: "nginx",      cat: "INFRA"     },
  { name: "Linux",       pct: 82, cls: "linux",      cat: "INFRA"     },
  { name: "Git",         pct: 92, cls: "git",        cat: "INFRA"     },
  // CMS
  { name: "WordPress",   pct: 88, cls: "wordpress",  cat: "CMS"       },
  { name: "WooCommerce", pct: 82, cls: "woocommerce",cat: "CMS"       },
  // TOOLS
  { name: "Figma",       pct: 74, cls: "figma",      cat: "TOOLS"     },
  { name: "SEO / Perf",  pct: 86, cls: "seo",        cat: "TOOLS"     },
];

export const PROJECTS_META: ProjectMeta[] = [
  // Ecossistema Ruk
  { tags: ["React", "Node.js", "JWT", "API"],       rarity: "legendary", icon: "✍️",  link: "https://ruk.com.br" },
  { tags: ["PHP", "REST API", "MySQL", "Legal"],    rarity: "legendary", icon: "⚖️",  link: "https://ruk.com.br" },
  { tags: ["Next.js", "SEO", "Performance", "UX"],  rarity: "epic",      icon: "🌐",  link: "https://ruk.com.br" },
  // Apps & Dashboards
  { tags: ["React", "Finance", "Calculator"],       rarity: "epic",      icon: "💰",  link: "https://play.google.com/store/apps/details?id=br.com.amortizei" },
  { tags: ["PHP", "FGTS", "Secure API"],            rarity: "rare",      icon: "🏦",  link: "https://consultafgts.mistermoney.app" },
  { tags: ["WordPress", "SAP", "REST API", "ERP"],  rarity: "legendary", icon: "📊",  link: "https://www.qaaps.com.br" },
  // Portais
  { tags: ["WordPress", "SEO", "High Traffic", "NGINX"], rarity: "epic", icon: "📰", link: "https://abcmais.com" },
  { tags: ["WordPress", "Core Web Vitals", "MySQL"],     rarity: "rare", icon: "👗", link: "https://fashionbubbles.com" },
  // Institucionais / Landing Pages
  { tags: ["React", "HTML/CSS", "SEO"],             rarity: "rare",      icon: "🏢",  link: "https://agencia3graus.com.br" },
  { tags: ["React", "UI/UX", "Animations"],         rarity: "epic",      icon: "✨",  link: "https://mudhealth.com.br" },
  { tags: ["HTML/CSS", "Conversion", "Mobile"],     rarity: "rare",      icon: "🐕",  link: "https://lokidogschool.com.br" },
  { tags: ["HTML/CSS", "Conversion", "Landing"],    rarity: "rare",      icon: "🔩",  link: "https://darkgray-jay-165588.hostingersite.com" },
];

export const EXP_META: ExpMeta[] = [
  { tags: ["React", "Node.js", "PHP", "WordPress", "Docker"] },
  { tags: ["React", "HTML/CSS", "WordPress", "PHP"] },
  { tags: ["PHP", "MySQL", "HTML", "CSS", "JS"] },
];

export const NPC_CONTEXT = {
  pt: `Você é o assistente de portfólio de Leonardo Tino, chamado de "NPC Companion". Leonardo é um Desenvolvedor Full Stack com experiência em React, Node.js, PHP, Python, Docker, HTML, CSS, MySQL e WordPress. GitHub: https://github.com/ltin0 | LinkedIn: https://www.linkedin.com/in/leonardo-tino/ | WhatsApp: 11985688911. Responda em português, de forma amigável e concisa, com personalidade de NPC de RPG.`,
  en: `You are the portfolio assistant for Leonardo Tino, called "NPC Companion". Leonardo is a Full Stack Developer with experience in React, Node.js, PHP, Python, Docker, HTML, CSS, MySQL and WordPress. GitHub: https://github.com/ltin0 | LinkedIn: https://www.linkedin.com/in/leonardo-tino/ | WhatsApp: 11985688911. Reply in English, friendly and concise, with an RPG-NPC personality.`,
};

export const CONTRIB_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

export function generateContribData(): number[][] {
  const weeks = 53;
  const days = 7;
  const grid: number[][] = [];
  let seed = 42;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = rand();
      let level: number;
      if (r < 0.45) level = 0;
      else if (r < 0.65) level = 1;
      else if (r < 0.83) level = 2;
      else if (r < 0.95) level = 3;
      else level = 4;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}
