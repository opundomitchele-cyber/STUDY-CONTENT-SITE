# Module 2 Q&A Packs — study content site

Sells your 6 units (and a bundle) via Paystack, delivers a link that stays
open for 72 hours. No database — the link itself carries a signed, timed
token, so there's nothing extra to host or pay for.

## 1. Before you push this anywhere

Open `lib/units.ts` and replace:
- each `docLink` with your real Google Doc (view-only) share links
- prices if KSh 50/unit and KSh 250 bundle aren't final

## 2. Push to GitHub

```
cd study-site
git init
git add .
git commit -m "Initial study pack site"
git branch -M main
git remote add origin https://github.com/opundomitchele-cyber/YOUR-NEW-REPO-NAME.git
git push -u origin main
```

(Create the empty repo on GitHub first — don't reuse the WriteNiche repo.)

## 3. Deploy to Vercel

1. On vercel.com, "Add New Project," import the new GitHub repo.
2. Before the first deploy, add these Environment Variables (from `.env.example`):
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - `PAYSTACK_SECRET_KEY`
   - `TOKEN_SECRET`
3. Deploy.

Get your Paystack keys from your Paystack dashboard → Settings → API Keys & Webhooks.
Generate `TOKEN_SECRET` with `openssl rand -hex 32` (or any long random string).

## 4. Test it

Use Paystack's test mode keys first (`pk_test_...` / `sk_test_...`) and their
test card numbers before switching to live keys. Buy a unit, confirm the
link opens the right Google Doc, and confirm it stops working after 72 hours
(you can shrink this temporarily in `lib/token.ts` — `issueToken(productId, 72)`
— to test expiry faster).

## Updating later

- New unit or price change → edit `lib/units.ts`, commit, push. Vercel
  redeploys automatically.
- Change link validity window → edit the `72` in `app/api/verify/route.ts`.
