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
  github?: string;
  image?: string;
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
  { name: "NestJS",      pct: 80, cls: "nestjs",     cat: "BACK-END"  },
  { name: "PHP",         pct: 80, cls: "php",         cat: "BACK-END"  },
  { name: "Laravel",     pct: 72, cls: "laravel",    cat: "BACK-END"  },
  { name: "Python",      pct: 70, cls: "python",     cat: "BACK-END"  },
  { name: "REST API",    pct: 90, cls: "restapi",    cat: "BACK-END"  },
  { name: "GraphQL",     pct: 78, cls: "graphql",    cat: "BACK-END"  },
  // DATA
  { name: "MySQL",       pct: 82, cls: "mysql",      cat: "DATA"      },
  { name: "PostgreSQL",  pct: 72, cls: "postgresql", cat: "DATA"      },
  { name: "Prisma ORM",  pct: 78, cls: "prisma",     cat: "DATA"      },
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
  { name: "Jest",        pct: 75, cls: "jest",        cat: "TOOLS"     },
  { name: "Playwright",  pct: 70, cls: "playwright",  cat: "TOOLS"     },
];

export const PROJECTS_META: ProjectMeta[] = [
  // Ecossistema Ruk (3)
  { tags: ["React", "Node.js", "JWT", "API"],              rarity: "legendary", icon: "✍️",  link: "https://app.ruk.com.br",                                         image: "/projects/ruk-sign.png" },
  { tags: ["PHP", "REST API", "MySQL", "Legal"],           rarity: "legendary", icon: "⚖️",  link: "https://app.ruk.com.br",                                         image: "/projects/ruk-juri.png" },
  { tags: ["Next.js", "SEO", "Performance", "UX"],         rarity: "epic",      icon: "🌐",  link: "https://ruk.com.br",                                             image: "/projects/ruk.com.br.png" },
  // Apps & Dashboards (3)
  { tags: ["React", "Finance", "Calculator"],              rarity: "epic",      icon: "💰",  link: "https://play.google.com/store/apps/details?id=br.com.amortizei", image: "/projects/amortizei.com.br.png" },
  { tags: ["PHP", "FGTS", "Secure API"],                   rarity: "rare",      icon: "🏦",  link: "https://consultafgts.mistermoney.app",                           image: "/projects/mistermoney.png" },
  { tags: ["WordPress", "SAP", "REST API", "ERP"],         rarity: "legendary", icon: "📊",  link: "https://www.qaaps.com.br",                                      image: "/projects/qaaps.png" },
  // Portais (3)
  { tags: ["WordPress", "SEO", "High Traffic", "NGINX"],   rarity: "epic",      icon: "📰",  link: "https://abcmais.com",                                            image: "/projects/abcmais.com.br.png" },
  { tags: ["WordPress", "Core Web Vitals", "MySQL"],        rarity: "rare",      icon: "👗",  link: "https://fashionbubbles.com",                                     image: "/projects/fashionbubbles.com.br.png" },
  { tags: ["WordPress", "SEO", "Blog"],                    rarity: "rare",      icon: "🚗",  link: "https://ituran.com.br/blog/",                                    image: "/projects/blogituran.com.br.png" },
  // Institucionais / Landing Pages (6 — sem Loki Dog School)
  { tags: ["React", "HTML/CSS", "SEO"],                    rarity: "rare",      icon: "🏢",  link: "https://agencia3graus.com.br",                                   image: "/projects/agencia3graus.com.br.png" },
  { tags: ["React", "Landing Page", "Conversion"],         rarity: "rare",      icon: "📈",  link: "https://negocios.agencia3graus.com.br",                          image: "/projects/3grausnegocios.com.br.png" },
  { tags: ["HTML/CSS", "JavaScript", "SEO"],               rarity: "rare",      icon: "🔧",  link: "https://qualitysmi.com.br",                                      image: "/projects/qualitysmi.com.br.png" },
  { tags: ["React", "UI/UX", "Animations"],                rarity: "epic",      icon: "🏥",  link: "https://mudhealth.com.br",                                       image: "/projects/mudhealth.com.br.png" },
  { tags: ["React", "UI/UX", "Performance"],               rarity: "epic",      icon: "✈️",  link: "https://hyperflow.global",                                       image: "/projects/hyperflow.global.png" },
  { tags: ["HTML/CSS", "Conversion", "B2B"],               rarity: "rare",      icon: "🔩",  link: "https://darkgray-jay-165588.hostingersite.com",                  image: "/projects/avtfixadores.com.br.png" },
  // Lojas Virtuais (3)
  { tags: ["WooCommerce", "WordPress", "E-commerce"],      rarity: "epic",      icon: "🛍️", link: "https://shoplearez.com.br",                                      image: "/projects/shoplearez.com.br.png" },
  { tags: ["WooCommerce", "WordPress", "Beauty"],          rarity: "rare",      icon: "💄",  link: "https://artofbeauty.com.br",                                     image: "/projects/artofbeauty.com.br.png" },
  { tags: ["WooCommerce", "WordPress", "Premium"],         rarity: "epic",      icon: "🥃",  link: "https://divinebourbon.com",                                      image: "/projects/divineburbon.com.br.png" },
];

export const EXP_META: ExpMeta[] = [
  { tags: ["React", "Next.js", "TypeScript", "NestJS", "GraphQL", "Prisma", "TailwindCSS", "Docker", "Linux", "E2E Tests"] },
  { tags: ["PHP", "WordPress", "JavaScript", "MySQL", "Docker", "NGINX", "Git", "Bitbucket", "SEO"] },
  { tags: ["PHP", "WordPress", "WooCommerce", "Elementor", "JavaScript", "REST API", "Cloudflare", "NGINX"] },
  { tags: ["Tech Lead", "CI/CD", "Code Review", "SEO", "Analytics"] },
  { tags: ["HTML", "CSS", "JavaScript", "PHP", "SEO"] },
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
