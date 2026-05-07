export type Lang = "pt" | "en";

export const TRANSLATIONS = {
  pt: {
    bootMsgs: ["INITIALIZING...", "LOADING ASSETS...", "MOUNTING COMPONENTS...", "CALIBRATING PIXEL ENGINE...", "HERO CONFIRMED...", "READY!"],
    nav: { about: "SOBRE", skills: "SKILLS", projects: "PROJETOS", xp: "XP", contact: "CONTATO" },
    hero: {
      selectHero: "◄ SELECT YOUR HERO ►",
      p1Confirmed: "✦ PLAYER 1 — CONFIRMED ✦",
      nameLabel: "NOME",
      classLine: "CLASS: FULL STACK ENGINEER · LVL 5",
      pressStart: "PRESSIONE",
      pressStartTrail: "PARA JOGAR",
      greeting: "// HELLO, WORLD!",
      role: "⚡ FULL STACK ENGINEER",
      desc: "Criando soluções digitais inovadoras com React, Node.js, PHP e Docker. Foco em performance, usabilidade e experiência do usuário.",
      stat1: "Anos de XP", stat2: "Projetos", stat3: "Tecnologias",
      ctaProjects: "VER PROJETOS", ctaContact: "CONTATO",
    },
    contrib: {
      title: "GITHUB CONTRIBUTIONS · 1 ANO",
      play: "▶ PLAY SNAKE", stop: "■ STOP", retry: "↻ RETRY",
      score: "SCORE", gameOver: "GAME OVER",
      hint: "WASD ou ← ↑ ↓ → para mover · 🟡 coma os commits",
      dayHint: "minhas contribuições", less: "menos", more: "mais",
    },
    about: {
      num: "01.", title: "SOBRE", em: "MIM",
      logHeader: "QUEST LOG — HISTÓRIA DO HERÓI",
      p1: "Como Desenvolvedor Web, tenho paixão por criar soluções digitais inovadoras e impactantes. Minha jornada é marcada por vasta experiência em HTML, CSS, PHP, React e WordPress, áreas em que me comprometo em transformar ideias em realidade digital de alta qualidade.",
      p2: "Ao longo da minha carreira, colaborei em projetos diversificados — desde sites corporativos até aplicações web dinâmicas — sempre com foco em usabilidade, performance e experiência do usuário.",
      p3: "Minha expertise se estende ao desenvolvimento back-end, gerenciamento de sistemas, bancos de dados SQL/MySQL e servidores web. Estou constantemente atualizado com as mais recentes tecnologias e tendências do mercado.",
      cardTitle: "◆ FICHA DO PERSONAGEM",
      location: "Localização", locationVal: "Brasil, SP",
      available: "Disponível", availableVal: "● SIM",
      languages: "Idiomas", languagesVal: "PT / EN",
      linksTitle: "◆ LINKS",
    },
    skills: { num: "02.", title: "SKILLS", em: "& STATS" },
    projects: {
      num: "03.", title: "PROJETOS", em: "/ INVENTÁRIO",
      github: "[ GITHUB ]", demo: "[ DEMO ]",
      list: [
        { title: "E-Commerce Platform",     desc: "Sistema completo de e-commerce com painel admin, integração de pagamentos e catálogo dinâmico." },
        { title: "Corporate Dashboard",     desc: "Dashboard analítico com gráficos em tempo real, relatórios exportáveis e gestão de usuários." },
        { title: "WordPress Headless CMS",  desc: "Solução headless com WordPress como backend e frontend em React, com SSR e otimização de SEO." },
        { title: "REST API Service",        desc: "Microserviço backend escalável com autenticação JWT, rate limiting e documentação Swagger." },
        { title: "Landing Page Builder",    desc: "Ferramenta interna para criação de landing pages com editor visual e deploy automático." },
        { title: "Automation Script Suite", desc: "Conjunto de scripts de automação para deploy, backup e monitoramento de servidores." },
      ],
    },
    exp: {
      num: "04.", title: "EXPERIÊNCIA", em: "/ XP LOG",
      list: [
        { year: "2022 — PRESENTE", role: "FULL STACK DEVELOPER",  company: "Freelancer / Autônomo",      desc: "Desenvolvimento de soluções web completas para clientes de diversos segmentos. Criação de sistemas web, e-commerces, APIs e integrações diversas com foco em performance e escalabilidade." },
        { year: "2020 — 2022",     role: "FRONT-END DEVELOPER",   company: "Agência Digital",           desc: "Criação de interfaces para projetos corporativos e campanhas digitais, com forte foco em usabilidade, performance e experiência do usuário. Integração com APIs e sistemas de CMS." },
        { year: "2019 — 2020",     role: "WEB DEVELOPER JR.",     company: "Startup de Tecnologia",    desc: "Desenvolvimento e manutenção de aplicações web. Primeiro contato com arquitetura de sistemas, bancos de dados relacionais e metodologias ágeis." },
      ],
    },
    contact: {
      num: "05.", title: "CONTATO", em: "/ TERMINAL",
      formHeader: "ENVIAR MENSAGEM",
      name: "SEU NOME", namePh: "Como devo te chamar?",
      email: "SEU E-MAIL", emailPh: "seu@email.com",
      message: "MENSAGEM", messagePh: "Olá Leonardo, tenho um projeto...",
      send: "[ ENVIAR MENSAGEM ]", sending: "ENVIANDO...",
      sent: "✓ MENSAGEM ENVIADA!",
      sentNote: "✓ Seu cliente de e-mail foi aberto com a mensagem preenchida!",
      errorNote: "✗ Erro ao enviar. Tente novamente.",
      whoami: "whoami", whoamiAns: "Leonardo Tino — Full Stack Engineer",
      listCmd: "contact --list", statusCmd: "status",
      statusAns: "● DISPONÍVEL para novos projetos e oportunidades",
    },
    npc: {
      tooltip: "FALE COMIGO!", title: "⚔ NPC COMPANION",
      greeting: "Olá, aventureiro! Sou o NPC Companion de Leonardo. Pode me perguntar qualquer coisa sobre ele! ⚔️",
      placeholder: "Faça uma pergunta...", send: "SEND",
      typing: "NPC digitando...", errorMsg: "Erro ao contatar o oráculo. Tente novamente!",
    },
    footer: "MADE WITH ❤ BY LEONARDO TINO · 2025",
  },
  en: {
    bootMsgs: ["INITIALIZING...", "LOADING ASSETS...", "MOUNTING COMPONENTS...", "CALIBRATING PIXEL ENGINE...", "HERO CONFIRMED...", "READY!"],
    nav: { about: "ABOUT", skills: "SKILLS", projects: "PROJECTS", xp: "XP", contact: "CONTACT" },
    hero: {
      selectHero: "◄ SELECT YOUR HERO ►",
      p1Confirmed: "✦ PLAYER 1 — CONFIRMED ✦",
      nameLabel: "NAME",
      classLine: "CLASS: FULL STACK ENGINEER · LVL 5",
      pressStart: "PRESS",
      pressStartTrail: "TO PLAY",
      greeting: "// HELLO, WORLD!",
      role: "⚡ FULL STACK ENGINEER",
      desc: "Crafting innovative digital solutions with React, Node.js, PHP and Docker. Focused on performance, usability and user experience.",
      stat1: "Years XP", stat2: "Projects", stat3: "Technologies",
      ctaProjects: "VIEW PROJECTS", ctaContact: "CONTACT",
    },
    contrib: {
      title: "GITHUB CONTRIBUTIONS · 1 YEAR",
      play: "▶ PLAY SNAKE", stop: "■ STOP", retry: "↻ RETRY",
      score: "SCORE", gameOver: "GAME OVER",
      hint: "WASD or ← ↑ ↓ → to move · 🟡 eat the commits",
      dayHint: "my contributions", less: "less", more: "more",
    },
    about: {
      num: "01.", title: "ABOUT", em: "ME",
      logHeader: "QUEST LOG — HERO STORY",
      p1: "As a Web Developer, I have a passion for creating innovative and impactful digital solutions. My journey is marked by extensive experience in HTML, CSS, PHP, React and WordPress, areas where I am committed to transforming ideas into high-quality digital reality.",
      p2: "Throughout my career, I have collaborated on diverse projects — from corporate websites to dynamic web applications — always focused on usability, performance and user experience.",
      p3: "My expertise extends to back-end development, system management, SQL/MySQL databases and web servers. I am constantly updated with the latest technologies and market trends.",
      cardTitle: "◆ CHARACTER SHEET",
      location: "Location", locationVal: "Brazil, SP",
      available: "Available", availableVal: "● YES",
      languages: "Languages", languagesVal: "PT / EN",
      linksTitle: "◆ LINKS",
    },
    skills: { num: "02.", title: "SKILLS", em: "& STATS" },
    projects: {
      num: "03.", title: "PROJECTS", em: "/ INVENTORY",
      github: "[ GITHUB ]", demo: "[ DEMO ]",
      list: [
        { title: "E-Commerce Platform",     desc: "Complete e-commerce system with admin panel, payment integration and dynamic catalog." },
        { title: "Corporate Dashboard",     desc: "Analytics dashboard with real-time charts, exportable reports and user management." },
        { title: "WordPress Headless CMS",  desc: "Headless solution with WordPress as backend and React frontend, SSR and SEO optimization." },
        { title: "REST API Service",        desc: "Scalable backend microservice with JWT authentication, rate limiting and Swagger docs." },
        { title: "Landing Page Builder",    desc: "Internal tool for creating landing pages with visual editor and automated deployment." },
        { title: "Automation Script Suite", desc: "Set of automation scripts for deployment, backup and server monitoring." },
      ],
    },
    exp: {
      num: "04.", title: "EXPERIENCE", em: "/ XP LOG",
      list: [
        { year: "2022 — PRESENT", role: "FULL STACK DEVELOPER",  company: "Freelancer / Self-employed", desc: "Development of complete web solutions for clients across diverse segments. Creating web systems, e-commerces, APIs and various integrations with focus on performance and scalability." },
        { year: "2020 — 2022",    role: "FRONT-END DEVELOPER",   company: "Digital Agency",             desc: "Creating interfaces for corporate projects and digital campaigns, with strong focus on usability, performance and user experience. API and CMS systems integration." },
        { year: "2019 — 2020",    role: "WEB DEVELOPER JR.",     company: "Tech Startup",              desc: "Development and maintenance of web applications. First contact with system architecture, relational databases and agile methodologies." },
      ],
    },
    contact: {
      num: "05.", title: "CONTACT", em: "/ TERMINAL",
      formHeader: "SEND MESSAGE",
      name: "YOUR NAME", namePh: "How should I call you?",
      email: "YOUR EMAIL", emailPh: "your@email.com",
      message: "MESSAGE", messagePh: "Hi Leonardo, I have a project...",
      send: "[ SEND MESSAGE ]", sending: "SENDING...",
      sent: "✓ MESSAGE SENT!",
      sentNote: "✓ Your email client was opened with the message ready to send!",
      errorNote: "✗ Send failed. Please try again.",
      whoami: "whoami", whoamiAns: "Leonardo Tino — Full Stack Engineer",
      listCmd: "contact --list", statusCmd: "status",
      statusAns: "● AVAILABLE for new projects and opportunities",
    },
    npc: {
      tooltip: "TALK TO ME!", title: "⚔ NPC COMPANION",
      greeting: "Hello, adventurer! I am Leonardo's NPC Companion. Ask me anything about him! ⚔️",
      placeholder: "Ask a question...", send: "SEND",
      typing: "NPC typing...", errorMsg: "Failed to contact the oracle. Try again!",
    },
    footer: "MADE WITH ❤ BY LEONARDO TINO · 2025",
  },
} as const;

export type Translations = {
  bootMsgs: readonly string[];
  nav: { about: string; skills: string; projects: string; xp: string; contact: string };
  hero: { selectHero: string; p1Confirmed: string; nameLabel: string; classLine: string; pressStart: string; pressStartTrail: string; greeting: string; role: string; desc: string; stat1: string; stat2: string; stat3: string; ctaProjects: string; ctaContact: string };
  contrib: { title: string; play: string; stop: string; retry: string; score: string; gameOver: string; hint: string; dayHint: string; less: string; more: string };
  about: { num: string; title: string; em: string; logHeader: string; p1: string; p2: string; p3: string; cardTitle: string; location: string; locationVal: string; available: string; availableVal: string; languages: string; languagesVal: string; linksTitle: string };
  skills: { num: string; title: string; em: string };
  projects: { num: string; title: string; em: string; github: string; demo: string; list: readonly { title: string; desc: string }[] };
  exp: { num: string; title: string; em: string; list: readonly { year: string; role: string; company: string; desc: string }[] };
  contact: { num: string; title: string; em: string; formHeader: string; name: string; namePh: string; email: string; emailPh: string; message: string; messagePh: string; send: string; sending: string; sent: string; sentNote: string; errorNote: string; whoami: string; whoamiAns: string; listCmd: string; statusCmd: string; statusAns: string };
  npc: { tooltip: string; title: string; greeting: string; placeholder: string; send: string; typing: string; errorMsg: string };
  footer: string;
};
