import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ROLES = ["shopper", "supermarket", "partner"] as const;

export async function POST(req: Request) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "The waitlist isn't wired up yet — please try again soon." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, postalCode, role } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPostal =
    typeof postalCode === "string" ? postalCode.trim() : "";
  const cleanRole = ROLES.includes(role as (typeof ROLES)[number])
    ? (role as string)
    : "shopper";

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
  if (cleanPostal.length > 12) {
    return NextResponse.json(
      { error: "That postal code doesn't look right." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.SHEETS_WEBHOOK_SECRET ?? "",
        name: cleanName,
        email: cleanEmail,
        postalCode: cleanPostal,
        role: cleanRole,
      }),
    });

    const data = (await res.json().catch(() => null)) as {
      status?: string;
      error?: string;
    } | null;

    if (data?.status === "already") {
      return NextResponse.json({ status: "already" });
    }
    if (data?.status === "joined") {
      return NextResponse.json({ status: "joined" });
    }

    console.error("waitlist append failed:", data?.error ?? res.status);
  } catch (err) {
    console.error("waitlist webhook unreachable:", err);
  }

  return NextResponse.json(
    { error: "Something went wrong on our side — please try again." },
    { status: 500 }
  );
}
