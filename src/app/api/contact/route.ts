import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, honeypot } = body || {};

    // Honeypot (Anti-spam)
    if (honeypot) return NextResponse.json({ ok: true });

    // Validation بسيطة
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // إعداد SMTP (من المتغيرات البيئية)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.SMTP_TO || "info@smart-moving.net";
    const from = process.env.SMTP_FROM || "no-reply@smart-moving.net";
    const subject = `رسالة جديدة من نموذج الموقع - ${name}`;

    const esc = (s: string) => String(s || "").replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.7">
        <h2>تفاصيل رسالة نموذج الاتصال</h2>
        <p><strong>الاسم:</strong> ${esc(name)}</p>
        <p><strong>البريد:</strong> ${esc(email)}</p>
        <p><strong>الهاتف:</strong> ${esc(phone || "-")}</p>
        <p><strong>الرسالة:</strong></p>
        <div style="white-space:pre-wrap;border:1px solid #eee;padding:12px;border-radius:8px">${esc(message)}</div>
        <hr/>
        <small>أُرسلت تلقائيًا من smart-moving.net</small>
      </div>
    `;

    await transporter.sendMail({
      to,
      from,
      replyTo: email, // تقدر ترد مباشرة على العميل
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact route error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
