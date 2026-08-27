<div align="center">

# Leonardo Tino — Interactive Portfolio

**A bilingual, retro-futuristic portfolio for a Full-Stack Product Engineer.**

[![Live](https://img.shields.io/badge/Live-leotino.dev-4ADE80?style=for-the-badge&logo=vercel&logoColor=0A0A0C)](https://leotino.dev)
[![CI](https://github.com/ltin0/leo-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ltin0/leo-portfolio/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

![Portfolio preview](https://leotino.dev/opengraph-image)

</div>

## Why this project exists

This repository is the source of [leotino.dev](https://leotino.dev). It turns a traditional résumé into an explorable product: visitors can browse selected work, switch between Portuguese and English, inspect professional experience, download a CV and use direct contact paths.

The visual language borrows from RPG interfaces and developer tooling, while the implementation stays focused on responsive behavior, semantic content and fast navigation.

## Highlights

- Bilingual content with a typed translation model.
- Responsive project inventory with real screenshots and external case links.
- Server-side contact form delivered through SMTP.
- Experimental server route for a future contextual assistant powered by the Anthropic API.
- GitHub contribution visualization and small interactive easter eggs.
- Dynamic Open Graph image and downloadable CVs in Portuguese and English.
- No proprietary client source code: the portfolio only publishes presentation assets and case descriptions.

## Architecture

```text
Browser
  └─ Next.js App Router
      ├─ UI and bilingual content
      ├─ /api/contact ──────────────> SMTP
      ├─ /api/npc (experimental) ──> Anthropic API
      └─ /api/github-contributions > GitHub API
```

## Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, Framer Motion, custom CSS |
| AI | Anthropic SDK |
| Communication | Nodemailer / SMTP |
| Delivery | Vercel, GitHub Actions |

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/ltin0/leo-portfolio.git
cd leo-portfolio
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The interface loads without external credentials. The contact form and AI companion require the corresponding environment variables.

## Environment variables

| Variable | Used by |
| --- | --- |
| `ANTHROPIC_API_KEY` | Experimental contextual assistant route |
| `SMTP_HOST` | Contact form transport |
| `SMTP_PORT` | Contact form transport |
| `SMTP_USER` | SMTP authentication and sender |
| `SMTP_PASS` | SMTP authentication |
| `SMTP_TO` | Contact form destination |

Never commit real credentials. Use `.env.local` locally and encrypted environment variables in the deployment platform.

## Quality checks

```bash
npm run typecheck
npm run build
```

Every push and pull request runs both checks in GitHub Actions.

## Project structure

```text
app/                 pages, metadata and server routes
components/          navigation, interactions and page sections
hooks/               reusable client-side behaviors
lib/                 content, translations and shared context
public/projects/     portfolio screenshots
public/               CVs and static assets
```

## Content and confidentiality

Most production systems shown in the portfolio belong to clients or former employers. Their source code remains private. Public case descriptions communicate the problem space, responsibilities and technology without publishing proprietary implementation details or credentials.

## Author

[Leonardo Tino](https://leotino.dev) — Full-Stack Product Engineer based in São Paulo, Brazil.

[LinkedIn](https://linkedin.com/in/leonardo-tino) · [GitHub](https://github.com/ltin0) · [Email](mailto:leo_tino@outlook.com.br)
