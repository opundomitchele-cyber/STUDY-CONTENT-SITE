"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [productId, setProductId] = useState("");
  const [hoursValid, setHoursValid] = useState(72);
  const [result, setResult] = useState<{ url: string; productTitle: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setError("");
    setResult(null);
    setCopied(false);
    setLoading(true);

    try {
      const res = await fetch("/api/admin-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, productId, hoursValid }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      const fullUrl = `${window.location.origin}${data.path}`;
      setResult({ url: fullUrl, productTitle: data.productTitle });
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={{ maxWidth: 480, margin: "60px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>Generate Download Link</h1>

      <label style={{ display: "block", marginBottom: 12 }}>
        Admin password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        Product ID (must match units.ts)
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="e.g. module-1"
          style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 20 }}>
        Hours valid
        <input
          type="number"
          value={hoursValid}
          onChange={(e) => setHoursValid(Number(e.target.value))}
          style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <button
        onClick={handleGenerate}
        disabled={loading || !password || !productId}
        style={{
          padding: "10px 16px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Link"}
      </button>

      {error && <p style={{ color: "crimson", marginTop: 16 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20, padding: 12, background: "#f1f5f9", borderRadius: 6 }}>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>{result.productTitle}</p>
          <p style={{ wordBreak: "break-all", fontSize: 14 }}>{result.url}</p>
          <button onClick={handleCopy} style={{ marginTop: 8, padding: "6px 12px" }}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      )}
    </main>
  );
}