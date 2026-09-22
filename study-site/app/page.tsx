"use client";

import { useState } from "react";
import { modules } from "../lib/units";

const POCHI_NUMBER = "0759187464";
const WHATSAPP_NUMBER = "254759187464";

function buildWhatsAppLink(
  productId: string,
  title: string,
  price: number,
  buyerName: string,
  mpesaMessage: string
) {
  const message = `Hi, I'm ${buyerName}. I've paid KSh ${price} via Pochi/M-Pesa to ${POCHI_NUMBER} for "${title}" (ref: ${productId}).\n\nHere's my M-Pesa confirmation:\n${mpesaMessage}\n\nPlease send my download link.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildSupportLink() {
  const message = `Hi, I have a question about a module on the study site.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [openModule, setOpenModuleState] = useState<string | null>(modules[0]?.id ?? null);
  const [buyerName, setBuyerName] = useState("");
  const [mpesaMessage, setMpesaMessage] = useState("");

  const canBuy = buyerName.trim().length > 0 && mpesaMessage.trim().length > 0;

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">CAT REVISION</span>
        <h1>Real exam-style questions and notes. Answers you can trust before the CAT.</h1>
        <p className="sub">
          Pick a module below to see its units — Q&amp;A packs and revision notes built the way
          your lecturer actually sets papers.
        </p>
      </section>

      <section className="name-gate">
        <label htmlFor="buyerName">Your name (so we can match your payment)</label>
        <input
          id="buyerName"
          type="text"
          placeholder="e.g. John Otieno"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />

        <label htmlFor="mpesaMessage">Paste your M-Pesa confirmation message</label>
        <textarea
          id="mpesaMessage"
          placeholder="Confirmed. You have sent KSh40.00 to POCHI... on 21/9/26..."
          value={mpesaMessage}
          onChange={(e) => setMpesaMessage(e.target.value)}
          rows={3}
        />
      </section>

      <section className="payment-info">
        <p>
          <strong>Send payment to:</strong> Pochi la Biashara / M-Pesa — <strong>{POCHI_NUMBER}</strong>
        </p>
        <p className="payment-sub">
          Fill in your name and paste your M-Pesa confirmation above, then tap "Buy" on your module — it opens WhatsApp with everything pre-filled for us to verify.
        </p>
      </section>

      {modules.map((mod) => {
        const isOpen = openModule === mod.id;
        return (
          <section className="module" key={mod.id}>
            <button
              className="module-header"
              onClick={() => setOpenModuleState(isOpen ? null : mod.id)}
              aria-expanded={isOpen}
            >
              <span>{mod.title}</span>
              <span className="chevron">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="module-body">
                <div className="grid">
                  {mod.units.map((u, i) => (
                    <article className="card" key={u.id}>
                      <div className="card-top">
                        <span className="unit-no">{String(i + 1).padStart(2, "0")}</span>
                        <span className="marks-tag">{u.marks}</span>
                      </div>
                      <h3>{u.title}</h3>
                      <p>{u.blurb}</p>
                      <div className="card-bottom">
                        <span className="price">KSh {u.price}</span>
                        {canBuy ? (
                          <a
                            href={buildWhatsAppLink(u.id, u.title, u.price, buyerName.trim(), mpesaMessage.trim())}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buy
                          </a>
                        ) : (
                          <button type="button" className="disabled-buy" disabled>
                            Buy
                          </button>
                        )}
                      </div>
                    </article>
                  ))}

                  <article className="card bundle">
                    <div className="card-top">
                      <span className="unit-no">ALL</span>
                      <span className="marks-tag">Best value</span>
                    </div>
                    <h3>{mod.bundle.title}</h3>
                    <p>{mod.bundle.blurb}</p>
                    <div className="card-bottom">
                      <span className="price">KSh {mod.bundle.price}</span>
                      {canBuy ? (
                        <a
                          href={buildWhatsAppLink(mod.bundle.id, mod.bundle.title, mod.bundle.price, buyerName.trim(), mpesaMessage.trim())}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Buy bundle
                        </a>
                      ) : (
                        <button type="button" className="disabled-buy" disabled>
                          Buy bundle
                        </button>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            )}
          </section>
        );
      })}

      <footer>
        <p>Pay via M-Pesa/Pochi, confirm on WhatsApp. Your link is sent within a few hours and stays open for 72 hours.</p>
      </footer>

      <a
       href={buildSupportLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="support-fab"
        aria-label="Chat with support on WhatsApp"
      >
        💬 Support
      </a>

      <style>{`
        main { max-width: 840px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }

        .hero { border-bottom: 1px solid var(--paper-line); padding-bottom: 2rem; margin-bottom: 2rem; }
        .eyebrow { display: inline-block; font-family: "Space Grotesk", sans-serif; font-size: .75rem; font-weight: 600; letter-spacing: .12em; color: var(--blueprint); margin-bottom: .75rem; }
        h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.15; margin: 0 0 1rem; color: var(--ink); }
        .sub { color: var(--muted); font-size: 1.05rem; max-width: 55ch; margin: 0; }

        .name-gate { display: flex; flex-direction: column; gap: .4rem; max-width: 420px; margin-bottom: 1.25rem; }
        .name-gate label { font-family: "Space Grotesk", sans-serif; font-size: .8rem; color: var(--muted); margin-top: .5rem; }
        .name-gate input, .name-gate textarea { padding: .7rem .9rem; border: 1px solid var(--paper-line); border-radius: 6px; background: #fff; font-family: inherit; font-size: 1rem; resize: vertical; }
        .name-gate input:focus-visible, .name-gate textarea:focus-visible { outline: 2px solid var(--blueprint); outline-offset: 1px; }

        .payment-info { border: 1px solid var(--paper-line); background: #f0ead9; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 2rem; }
        .payment-info p { margin: 0; }
        .payment-info p + p { margin-top: .4rem; }
        .payment-sub { color: var(--muted); font-size: .9rem; }

        .module { border: 1px solid var(--paper-line); border-radius: 10px; margin-bottom: 1rem; overflow: hidden; background: #fff; }
        .module-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; background: var(--paper); border: none; cursor: pointer; font-family: "Space Grotesk", sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--ink); text-align: left; }
        .module-header:hover { background: #f0ead9; }
        .chevron { font-size: 1.4rem; color: var(--blueprint); line-height: 1; }
        .module-body { padding: 1.25rem; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }

        .card { border: 1px solid var(--paper-line); border-radius: 10px; padding: 1.25rem; background: #fff; display: flex; flex-direction: column; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: .6rem; }
        .unit-no { font-family: "Space Grotesk", sans-serif; font-weight: 700; color: var(--blueprint); font-size: 1.1rem; }
        .marks-tag { font-family: "Space Grotesk", sans-serif; font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); background: var(--paper); border: 1px solid var(--paper-line); padding: .2rem .5rem; border-radius: 999px; }
        .card h3 { margin: 0 0 .35rem; font-size: 1.15rem; }
        .card p { margin: 0; color: var(--muted); font-size: .92rem; flex-grow: 1; }
        .card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: .9rem; border-top: 1px dashed var(--paper-line); }
        .price { font-family: "Space Grotesk", sans-serif; font-weight: 600; }
        .card-bottom a { background: #16a34a; color: #fff; border: none; padding: .55rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
        .card-bottom a:hover { background: #15803d; }
        .disabled-buy { background: #c7c9cd !important; color: #fff; border: none; padding: .55rem 1rem; border-radius: 6px; font-weight: 600; cursor: not-allowed; }

        .card.bundle { border-color: var(--amber); background: linear-gradient(180deg, #fff 0%, #fdf6ea 100%); }
        .card.bundle .unit-no { color: #a0672a; }

        footer { margin-top: 3rem; text-align: center; color: var(--muted); font-size: .85rem; }

        .support-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          background: #16a34a;
          color: #fff;
          padding: .75rem 1.1rem;
          border-radius: 999px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: .9rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,.2);
          z-index: 50;
        }
        .support-fab:hover { background: #15803d; }
      `}</style>
    </main>
  );
}