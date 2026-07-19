import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const OUTLETS = ["1", "2-5", "6-20", "20+"] as const;

export async function POST(req: Request) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Demo booking isn't wired up yet — please try again soon." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, outlets, phone, notes } = (body ??
    {}) as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanCompany = typeof company === "string" ? company.trim() : "";
  const cleanOutlets = OUTLETS.includes(outlets as (typeof OUTLETS)[number])
    ? (outlets as string)
    : "1";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const cleanNotes = typeof notes === "string" ? notes.trim() : "";

  if (!cleanName || cleanName.length > 120) {
    return NextResponse.json(
      { error: "Please tell us your name." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 }
    );
  }
  if (!cleanCompany || cleanCompany.length > 120) {
    return NextResponse.json(
      { error: "Please tell us your supermarket or chain." },
      { status: 400 }
    );
  }
  if (cleanPhone.length > 20) {
    return NextResponse.json(
      { error: "That phone number doesn't look right." },
      { status: 400 }
    );
  }
  if (cleanNotes.length > 500) {
    return NextResponse.json(
      { error: "Please keep notes under 500 characters." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.SHEETS_WEBHOOK_SECRET ?? "",
        form: "demo",
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany,
        outlets: cleanOutlets,
        phone: cleanPhone,
        notes: cleanNotes,
      }),
    });

    const data = (await res.json().catch(() => null)) as {
      status?: string;
      error?: string;
    } | null;

    if (data?.status === "already") {
      return NextResponse.json({ status: "already" });
    }
    if (data?.status === "booked") {
      return NextResponse.json({ status: "booked" });
    }

    console.error("demo request append failed:", data?.error ?? res.status);
  } catch (err) {
    console.error("demo webhook unreachable:", err);
  }

  return NextResponse.json(
    { error: "Something went wrong on our side — please try again." },
    { status: 500 }
  );
}
