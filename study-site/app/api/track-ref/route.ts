import { NextRequest, NextResponse } from "next/server";

// POST: silently logs a click when someone visits via a ref link
export async function POST(req: NextRequest) {
  const { ref } = await req.json();
  if (!ref || typeof ref !== "string") {
    return NextResponse.json({ error: "ref required" }, { status: 400 });
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ error: "KV not configured" }, { status: 500 });
  }

  try {
    await fetch(`${url}/incr/ref-clicks:${encodeURIComponent(ref)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "tracking failed" }, { status: 500 });
  }
}

// GET: lets you check a referrer's click count from your browser
// Usage: /api/track-ref?ref=john&password=YOUR_ADMIN_PASSWORD
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");
  const password = searchParams.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!ref) {
    return NextResponse.json({ error: "ref required" }, { status: 400 });
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(`${url}/get/ref-clicks:${encodeURIComponent(ref)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return NextResponse.json({ ref, clicks: data.result ?? 0 });
}