"use client";

import { useState } from "react";
import { units, bundle } from "../lib/units";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

function useCheckout() {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function pay(productId: string, price: number, email: string) {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setError("Payments aren't configured yet.");
      return;
    }
    setError(null);
    setBusyId(productId);

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: price * 100, // kobo/cents
      currency: "KES",
      ref: `${productId}-${Date.now()}`,
      callback: (response: { reference: string }) => {
        fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference, productId }),
        })
          .then((r) => r.json())
          .then((data) => {
            setBusyId(null);
            if (data.downloadUrl) {
              window.location.href = data.downloadUrl;
            } else {
              setError(data.error || "Payment went through but the link failed. Contact us.");
            }
          })
          .catch(() => {
            setBusyId(null);
            setError("Payment went through but something failed. Contact us with your reference.");
          });
      },
      onClose: () => setBusyId(null),
    });
    handler.openIframe();
  }

  return { pay, busyId, error };
}

export default function Home() {
  const { pay, busyId, error } = useCheckout();
  const [email, setEmail] = useState("");

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">MODULE 2 — CAT REVISION</span>
        <h1>Six units. Real exam-style questions. Answers you can trust before the CAT.</h1>
        <p className="sub">
          Q&amp;A packs built the way your lecturer actually sets papers — conceptual review in
          Unit 1, calculation-heavy worked examples from Unit 2 onward.
        </p>
      </section>

      <section className="email-gate">
        <label htmlFor="email">Email for your receipt &amp; link</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>

      {error && <p className="error">{error}</p>}

      <section className="grid">
        {units.map((u, i) => (
          <article className="card" key={u.id}>
            <div className="card-top">
              <span className="unit-no">{String(i + 1).padStart(2, "0")}</span>
              <span className="marks-tag">{u.marks}</span>
            </div>
            <h3>{u.title}</h3>
            <p>{u.blurb}</p>
            <div className="card-bottom">
              <span className="price">KSh {u.price}</span>
              <button
                disabled={!email || busyId === u.id}
                onClick={() => pay(u.id, u.price, email)}
              >
                {busyId === u.id ? "Opening..." : "Buy"}
              </button>
            </div>
          </article>
        ))}

        <article className="card bundle">
          <div className="card-top">
            <span className="unit-no">ALL</span>
            <span className="marks-tag">Best value</span>
          </div>
          <h3>{bundle.title}</h3>
          <p>{bundle.blurb}</p>
          <div className="card-bottom">
            <span className="price">KSh {bundle.price}</span>
            <button
              disabled={!email || busyId === bundle.id}
              onClick={() => pay(bundle.id, bundle.price, email)}
            >
              {busyId === bundle.id ? "Opening..." : "Buy bundle"}
            </button>
          </div>
        </article>
      </section>

      <footer>
        <p>Paid via Paystack. Your link is sent instantly and stays open for 72 hours.</p>
      </footer>

      <style>{`
        main { max-width: 840px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }

        .hero { border-bottom: 1px solid var(--paper-line); padding-bottom: 2rem; margin-bottom: 2rem; }
        .eyebrow { display: inline-block; font-family: "Space Grotesk", sans-serif; font-size: .75rem; font-weight: 600; letter-spacing: .12em; color: var(--blueprint); margin-bottom: .75rem; }
        h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.15; margin: 0 0 1rem; color: var(--ink); }
        .sub { color: var(--muted); font-size: 1.05rem; max-width: 55ch; margin: 0; }

        .email-gate { display: flex; flex-direction: column; gap: .4rem; max-width: 360px; margin-bottom: 2rem; }
        .email-gate label { font-family: "Space Grotesk", sans-serif; font-size: .8rem; color: var(--muted); }
        .email-gate input { padding: .7rem .9rem; border: 1px solid var(--paper-line); border-radius: 6px; background: #fff; font-family: inherit; font-size: 1rem; }
        .email-gate input:focus-visible { outline: 2px solid var(--blueprint); outline-offset: 1px; }

        .error { color: #b3261e; margin-bottom: 1.5rem; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }

        .card { border: 1px solid var(--paper-line); border-radius: 10px; padding: 1.25rem; background: #fff; display: flex; flex-direction: column; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: .6rem; }
        .unit-no { font-family: "Space Grotesk", sans-serif; font-weight: 700; color: var(--blueprint); font-size: 1.1rem; }
        .marks-tag { font-family: "Space Grotesk", sans-serif; font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); background: var(--paper); border: 1px solid var(--paper-line); padding: .2rem .5rem; border-radius: 999px; }
        .card h3 { margin: 0 0 .35rem; font-size: 1.15rem; }
        .card p { margin: 0; color: var(--muted); font-size: .92rem; flex-grow: 1; }
        .card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: .9rem; border-top: 1px dashed var(--paper-line); }
        .price { font-family: "Space Grotesk", sans-serif; font-weight: 600; }
        button { background: var(--blueprint); color: #fff; border: none; padding: .55rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
        button:hover:not(:disabled) { background: var(--blueprint-deep); }
        button:disabled { background: #c7c9cd; cursor: not-allowed; }

        .card.bundle { border-color: var(--amber); background: linear-gradient(180deg, #fff 0%, #fdf6ea 100%); }
        .card.bundle .unit-no { color: #a0672a; }

        footer { margin-top: 3rem; text-align: center; color: var(--muted); font-size: .85rem; }
      `}</style>
    </main>
  );
}
