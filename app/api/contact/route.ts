import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  if (!body || typeof body !== "object") {
    return badRequest("Invalid request body");
  }

  const payload = body as Record<string, unknown>;
  if (
    typeof payload.name !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.message !== "string"
  ) {
    return badRequest("Missing fields");
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!name || !email || !message) {
    return badRequest("Missing fields");
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    /[\r\n]/.test(name) ||
    /[\r\n]/.test(email) ||
    !EMAIL_PATTERN.test(email)
  ) {
    return badRequest("Invalid fields");
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_TO) {
    console.error("Contact form SMTP configuration is incomplete");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Portfolio <${SMTP_USER}>`,
      replyTo: email,
      to: SMTP_TO,
      subject: `[Portfolio] Mensagem de ${name}`,
      text: `Nova mensagem via portfólio\n\nNome: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
