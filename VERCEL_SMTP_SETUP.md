# Vercel SMTP Contact Form Setup

## What Changed
- Frontend forms now submit to `POST /api/contact`.
- Backend is now a Vercel serverless function at `src/frontend/api/contact.js`.
- ICP/canister-based inquiry handling has been removed from the frontend app.

## Required Package
From repo root:

```bash
pnpm --filter @caffeine/template-frontend add nodemailer
```

## Folder Structure
- Frontend app: `src/frontend/src`
- Serverless API route: `src/frontend/api/contact.js`
- Vercel config (frontend root): `src/frontend/vercel.json`

## Environment Variables (Vercel)
Set these in Vercel Project Settings -> Environment Variables:

- `EMAIL_HOST`: SMTP host (from your email provider panel)
- `EMAIL_PORT`: SMTP port (usually `587` for TLS or `465` for SSL)
- `EMAIL_SECURE`: `true` for SSL (usually with port `465`), otherwise `false`
- `EMAIL_USER`: SMTP username/email
- `EMAIL_PASS`: SMTP password or app password

Notes:
- The API sends to `info@meghrajexports.com`.
- For provider mailboxes (like Spaceship), use the SMTP values shown in your mailbox/client settings.

## Redeploy Steps
1. Push changes to your Git branch.
2. In Vercel, ensure Root Directory is `src/frontend`.
3. Confirm env vars `EMAIL_USER` and `EMAIL_PASS` are set for Production.
4. Trigger redeploy.
5. Test form submission from `/contact` and `/catalogue`.

## API Behavior
- Only accepts `POST`.
- Requires `name`, `email`, and `message`.
- Returns:
  - `200` on success
  - `400` for invalid input
  - `405` for invalid method
  - `500` for server/email errors
