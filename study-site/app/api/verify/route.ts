import { NextRequest, NextResponse } from "next/server";
import { findProduct } from "../../../lib/units";
import { issueToken } from "../../../lib/token";

// Called by the browser right after Paystack's popup reports success.
// We re-verify the payment with Paystack's server (never trust the client)
// before handing out a real download link.
export async function POST(req: NextRequest) {
  const { reference, productId } = await req.json();

  if (!reference || !productId) {
    return NextResponse.json({ error: "Missing reference or productId" }, { status: 400 });
  }

  const product = findProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Server not configured (missing PAYSTACK_SECRET_KEY)" }, { status: 500 });
  }

  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  const verifyData = await verifyRes.json();

  const paidOk =
    verifyData?.status === true &&
    verifyData?.data?.status === "success" &&
    verifyData?.data?.amount === product.price * 100; // Paystack returns amount in kobo/cents

  if (!paidOk) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 402 });
  }

  const token = issueToken(productId, 72); // link valid 72 hours
  return NextResponse.json({ downloadUrl: `/download/${token}` });
}
