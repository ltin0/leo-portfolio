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
}

export interface ExpMeta {
  tags: string[];
}

export const SKILLS_DATA: Skill[] = [
  { name: "React",      pct: 90, cls: "react",     cat: "FRONT-END" },
  { name: "HTML / CSS", pct: 95, cls: "htmlcss",   cat: "FRONT-END" },
  { name: "Node.js",    pct: 85, cls: "nodejs",    cat: "BACK-END"  },
  { name: "PHP",        pct: 80, cls: "php",        cat: "BACK-END"  },
  { name: "Python",     pct: 70, cls: "python",     cat: "BACK-END"  },
  { name: "MySQL",      pct: 80, cls: "mysql",      cat: "DATA"      },
  { name: "Docker",     pct: 75, cls: "docker",     cat: "INFRA"     },
  { name: "WordPress",  pct: 85, cls: "wordpress",  cat: "CMS"       },
];

export const PROJECTS_META: ProjectMeta[] = [
  { tags: ["React", "Node.js", "MySQL"],      rarity: "legendary", icon: "🛒" },
  { tags: ["React", "PHP", "Docker"],         rarity: "epic",      icon: "📊" },
  { tags: ["WordPress", "React", "REST API"], rarity: "rare",      icon: "⚡" },
  { tags: ["Node.js", "Docker", "MySQL"],     rarity: "epic",      icon: "🔗" },
  { tags: ["React", "PHP", "CSS"],            rarity: "rare",      icon: "🎨" },
  { tags: ["Python", "Docker", "Bash"],       rarity: "legendary", icon: "🤖" },
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
