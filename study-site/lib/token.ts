import crypto from "crypto";

// A download link is: base64url(productId.expiryTimestamp).signature
// The signature proves it was issued by your server after a real payment,
// and the expiry is checked on redemption — no database required.

const SECRET = process.env.TOKEN_SECRET || "dev-secret-change-me";

export function issueToken(productId: string, hoursValid = 72) {
  const expiry = Date.now() + hoursValid * 60 * 60 * 1000;
  const payload = `${productId}.${expiry}`;
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyToken(token: string): { valid: boolean; productId?: string; reason?: string } {
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false, reason: "Malformed link." };
  const [encoded, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", SECRET).update(encoded).digest("base64url");
  if (sig !== expectedSig) return { valid: false, reason: "Invalid link." };

  const payload = Buffer.from(encoded, "base64url").toString();
  const [productId, expiryStr] = payload.split(".");
  const expiry = Number(expiryStr);
  if (Date.now() > expiry) return { valid: false, reason: "This link has expired." };

  return { valid: true, productId };
}
