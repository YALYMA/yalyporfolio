import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Resend client (initialised lazily so build doesn't fail if key is missing) ──
// Set RESEND_API_KEY in Vercel → Project Settings → Environment Variables
const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
};

// ── Rate-limiting (simple in-memory, resets on cold start) ──
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX    = 3;              // max 3 submissions per IP per hour

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const times = (rateLimitMap.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW);
  if (times.length >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, [...times, now]);
  return false;
}

// ── Simple HTML email template ──
function buildEmailHtml(data: {
  name: string; email: string; company: string; message: string;
}): string {
  const { name, email, company, message } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New contact message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8b5cf6,#d946ef);padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:900;line-height:44px;text-align:center;margin-bottom:12px;">AD</div>
                    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New message from your portfolio</h1>
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.78);font-size:13px;">Someone reached out via alexdupont.dev</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <!-- Meta grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:8px;padding-bottom:12px;">
                    <div style="background:#f4f4f5;border-radius:10px;padding:12px 14px;">
                      <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;">Name</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${name}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:8px;padding-bottom:12px;">
                    <div style="background:#f4f4f5;border-radius:10px;padding:12px 14px;">
                      <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;">Email</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#8b5cf6;">${email}</p>
                    </div>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td colspan="2">
                    <div style="background:#f4f4f5;border-radius:10px;padding:12px 14px;">
                      <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;">Company</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${company}</p>
                    </div>
                  </td>
                </tr>` : ""}
              </table>

              <!-- Message -->
              <div style="background:#f9f8ff;border:1px solid rgba(139,92,246,0.15);border-radius:12px;padding:20px 22px;margin-bottom:28px;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#8b5cf6;">Message</p>
                <p style="margin:0;font-size:15px;color:#3f3f46;line-height:1.75;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re: Your message to Alex Dupont"
                       style="display:inline-block;padding:13px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:-0.1px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 36px 24px;border-top:1px solid #f4f4f5;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;">
                Sent from your portfolio contact form · alexdupont.dev
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── POST /api/contact ──
export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before sending another message." },
        { status: 429 }
      );
    }

    // ── Parse & validate body ──
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, company, message } = body as {
      name?: string; email?: string; company?: string; message?: string;
    };

    // Required field validation
    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 chars)." }, { status: 422 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
    }
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json({ error: "Message is required (min 10 chars)." }, { status: 422 });
    }

    // Max length guards
    if (name.length > 100 || email.length > 200 || (company?.length ?? 0) > 200 || message.length > 5000) {
      return NextResponse.json({ error: "One or more fields exceed the maximum length." }, { status: 422 });
    }

    // ── Destination email — set YOUR_EMAIL in Vercel env vars ──
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "alex.dupont@email.com";
    const fromDomain = process.env.RESEND_FROM_DOMAIN ?? "onboarding@resend.dev"; // use resend sandbox for testing

    // ── Send via Resend ──
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromDomain}>`,
      to:   [toEmail],
      replyTo: email.trim(),
      subject: `[Portfolio] New message from ${name.trim()}${company ? ` (${company.trim()})` : ""}`,
      html: buildEmailHtml({
        name:    name.trim(),
        email:   email.trim(),
        company: company?.trim() ?? "",
        message: message.trim(),
      }),
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    console.info("[contact/route] Email sent:", data?.id);
    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });

  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// ── Only allow POST ──
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
