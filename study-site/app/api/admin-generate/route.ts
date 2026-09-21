import { NextRequest, NextResponse } from "next/server";
import { findProduct } from "../../../lib/units";
import { issueToken } from "../../../lib/token";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, hoursValid, password } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  if (!productId || typeof productId !== "string") {
    return NextResponse.json({ error: "productId is required." }, { status: 400 });
  }

  const product = findProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown productId — check it matches units.ts exactly." }, { status: 400 });
  }

  const hours = typeof hoursValid === "number" && hoursValid > 0 ? hoursValid : 72;
  const token = issueToken(productId, hours);

  return NextResponse.json({
    token,
    path: `/download/${token}`,
    productTitle: product.title ?? productId,
  });
}