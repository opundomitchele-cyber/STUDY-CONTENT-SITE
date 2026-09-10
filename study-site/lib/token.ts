import crypto from "crypto";

// Stateless signed tokens — no database needed.
// A token is: base64url(payload) + "." + signature
// The signature proves the payload wasn't tampered with; productId + exp
// live inside the payload itself.

type TokenPayload = {
  productId: string;
  exp: number; // unix ms timestamp
};

function getSecret(): string {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("Missing TOKEN_SECRET environment variable");
  }
  return secret;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return base64url(crypto.createHmac("sha256", getSecret()).update(payload).digest());
}

export function issueToken(productId: string, hoursValid: number): string {
  const payload: TokenPayload = {
    productId,
    exp: Date.now() + hoursValid * 60 * 60 * 1000,
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(
  token: string
  ): { valid: true; productId: string; reason?: undefined } | { valid: false; reason: string; productId?: undefined } {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "This link looks malformed." };
  }
  const [encodedPayload, signature] = parts;

  const expectedSignature = sign(encodedPayload);
  if (signature !== expectedSignature) {
    return { valid: false, reason: "This link isn't valid." };
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    );
  } catch {
    return { valid: false, reason: "This link looks malformed." };
  }

  if (Date.now() > payload.exp) {
    return { valid: false, reason: "This link has expired (links last 72 hours)." };
  }

  return { valid: true, productId: payload.productId };
}