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
3. Confirm SMTP env vars are set for Production (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASS`).
4. Trigger redeploy.
5. Test form submission from `/contact` and `/catalogue`.

## Local Development
This project uses a Vite middleware that mounts the same handler at `/api/contact` in local dev, so the frontend can always call a relative path.

Run:

```bash
pnpm --filter @caffeine/template-frontend start
```

Then submit the form from `http://localhost:3000/contact`.

No absolute API URL is needed in frontend env vars.

## API Behavior
- Only accepts `POST`.
- Requires `name`, `email`, and `message`.
- Returns:
  - `200` on success
  - `400` for invalid input
  - `405` for invalid method
  - `500` for server/email errors

## Frontend API Pattern
- Frontend must call `fetch('/api/contact')`.
- Do not hardcode domains like `https://www.meghrajexports.com/api/contact`.
- Relative paths avoid cross-origin requests and prevent CORS issues for same-origin frontend/API traffic.

## Testing Checklist
1. Local:
   - Start app with `pnpm --filter @caffeine/template-frontend start`.
   - Open `http://localhost:3000/contact` and submit a test enquiry.
   - In DevTools Network, confirm request URL is `/api/contact` on `localhost`.
2. Production:
   - Open `https://www.meghrajexports.com/contact` and submit test enquiry.
   - In DevTools Network, confirm request URL is `/api/contact` on `www.meghrajexports.com`.
3. Network response:
   - Success should return `200` with JSON response.
   - Validation errors should return `400` with JSON error.
   - Non-POST should return `405` and `Allow: POST`.
4. CORS:
   - No manual CORS headers are required for same-origin calls.
   - If request URL is relative and host matches page host, browser should not raise CORS errors.
