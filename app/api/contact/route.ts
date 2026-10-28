import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Rate limit sederhana di memori.
 * Untuk produksi dengan banyak trafik, ganti dengan Upstash Redis / Vercel KV.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);

  // Bersihkan entri lama supaya Map tidak tumbuh tanpa batas.
  if (hits.size > 500) {
    hits.forEach((value, key) => {
      if (value.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    });
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Terlalu banyak percobaan. Tunggu beberapa menit sebelum mengirim lagi.",
        },
        { status: 429 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as Payload;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const honeypot =
      typeof body.company === "string" ? body.company.trim() : "";

    // Bot mengisi field tersembunyi. Balas sukses palsu agar tidak mencoba lagi.
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true, demo: true });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { ok: false, error: "Nama harus 2–80 karakter." },
        { status: 400 },
      );
    }

    if (
      email.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      return NextResponse.json(
        { ok: false, error: "Alamat email tidak valid." },
        { status: 400 },
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Pesan harus 10–2000 karakter." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    // Tanpa kredensial Resend, form tetap berjalan dalam mode demo.
    if (!apiKey || !to || !from) {
      console.info(
        "[contact] Mode demo: pesan diterima tetapi tidak dikirim. " +
          "Atur RESEND_API_KEY, CONTACT_TO_EMAIL, dan CONTACT_FROM_EMAIL.",
      );
      return NextResponse.json({ ok: true, demo: true });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portofolio] Pesan baru dari ${name}`,
        html: `
          <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#0b0d0f">
            <h2 style="margin:0 0 16px">Pesan baru dari portofolio</h2>
            <p style="margin:0 0 4px"><strong>Nama:</strong> ${safeName}</p>
            <p style="margin:0 0 16px"><strong>Email:</strong> ${safeEmail}</p>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
            <p style="margin:0;white-space:normal">${safeMessage}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[contact] Resend gagal:", response.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Layanan email sedang bermasalah. Coba lagi atau kirim email langsung.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Kesalahan tak terduga:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan di server." },
      { status: 500 },
    );
  }
}
