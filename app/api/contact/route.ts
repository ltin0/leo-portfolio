import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // SSL on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.SMTP_TO,
    subject: `[Portfolio] Mensagem de ${name}`,
    html: `
      <div style="font-family:monospace;background:#07090f;color:#c8d8e8;padding:32px;border-left:3px solid #00e5ff;">
        <p style="color:#00e5ff;font-size:12px;margin-bottom:16px;">◆ NOVA MENSAGEM VIA PORTFOLIO</p>
        <p><strong style="color:#ffd700;">Nome:</strong> ${name}</p>
        <p><strong style="color:#ffd700;">Email:</strong> <a href="mailto:${email}" style="color:#00e5ff;">${email}</a></p>
        <hr style="border-color:#1e3352;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
