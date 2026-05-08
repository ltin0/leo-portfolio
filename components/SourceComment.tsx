export default function SourceComment() {
  const comment = `
<!--
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   > HELLO, FELLOW DEVELOPER.                                     ║
║                                                                  ║
║   So you checked the source code. Respect. 🤙                   ║
║                                                                  ║
║   This portfolio was hand-crafted with:                         ║
║   · Next.js 15 (App Router)                                      ║
║   · TypeScript                                                   ║
║   · Tailwind CSS                                                 ║
║   · A lot of caffeine ☕                                         ║
║                                                                  ║
║   There are more secrets hidden in the UI.                       ║
║   Open devtools and press Ctrl+U for a surprise.                 ║
║                                                                  ║
║   Built by Leonardo Tino                                         ║
║   github.com/ltin0                                               ║
║   linkedin.com/in/leonardo-tino                                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
-->
`;

  return <div dangerouslySetInnerHTML={{ __html: comment }} style={{ display: "none" }} />;
}
