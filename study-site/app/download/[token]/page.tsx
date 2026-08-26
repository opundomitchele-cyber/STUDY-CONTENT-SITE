import { verifyToken } from "../../../lib/token";
import { units, bundle } from "../../../lib/units";

export default function DownloadPage({ params }: { params: { token: string } }) {
  const result = verifyToken(params.token);

  if (!result.valid) {
    return (
      <main className="wrap">
        <h1>Link not valid</h1>
        <p>{result.reason} If you just paid, message us and we'll sort you out.</p>
      </main>
    );
  }

  const isBundle = result.productId === bundle.id;
  const items = isBundle ? units : units.filter((u) => u.id === result.productId);

  return (
    <main className="wrap">
      <h1>Your study pack{items.length > 1 ? "s" : ""}</h1>
      <p className="note">This link stays active for 72 hours from purchase.</p>
      <ul className="links">
        {items.map((u) => (
          <li key={u.id}>
            <a href={u.docLink} target="_blank" rel="noopener noreferrer">
              {u.title} — open document →
            </a>
          </li>
        ))}
      </ul>
      <style>{`
        .wrap { max-width: 560px; margin: 4rem auto; padding: 0 1.5rem; font-family: system-ui, sans-serif; color: #1C1F26; }
        h1 { font-size: 1.6rem; margin-bottom: .5rem; }
        .note { color: #6b6f76; margin-bottom: 1.5rem; }
        .links { list-style: none; padding: 0; display: flex; flex-direction: column; gap: .75rem; }
        .links a { display: block; padding: 1rem 1.25rem; background: #F7F4EC; border: 1px solid #e3ddcc; border-radius: 8px; color: #2B4C7E; font-weight: 600; text-decoration: none; }
        .links a:hover { border-color: #2B4C7E; }
      `}</style>
    </main>
  );
}
