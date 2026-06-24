# Deployment — Frontend (Cloudflare Pages)

The frontend is deployed to [Cloudflare Pages](https://pages.cloudflare.com) via
GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).
Every push to `main` type-checks, builds, and deploys. Pull requests run
type-check + build only (no deploy).

## One-time setup

### 1. Create the Cloudflare Pages project

Either via the dashboard (**Workers & Pages → Create → Pages → Direct Upload**,
name it `dottutor`) or with the CLI:

```bash
npx wrangler pages project create dottutor --production-branch=main
```

### 2. Create a Cloudflare API token

**My Profile → API Tokens → Create Token** → permission **Account › Cloudflare Pages › Edit**.
Note your **Account ID** (Workers & Pages overview, right sidebar).

### 3. GitHub configuration (repo: `DOTWAJU/dotTutor`)

Settings → Secrets and variables → Actions:

| Type     | Name                    | Value                                            |
| -------- | ----------------------- | ------------------------------------------------ |
| Secret   | `CLOUDFLARE_API_TOKEN`  | The token from step 2                            |
| Secret   | `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID                       |
| Variable | `VITE_API_URL`          | The Railway backend URL, e.g. `https://dottutor-backend-production.up.railway.app` |

## Important notes

- **`VITE_API_URL` is baked in at build time.** Vite inlines `import.meta.env.*`
  during `npm run build`, so changing the backend URL requires a rebuild/redeploy
  (just re-run the workflow). If unset, the app falls back to `http://localhost:8080`.
- **SPA routing:** [public/_redirects](public/_redirects) routes all paths to
  `index.html` so deep links work on Cloudflare Pages.
- **CORS:** the backend's `APP_CORS_ALLOWED_ORIGINS` must include this site's origin
  (e.g. `https://dottutor.pages.dev` and any custom domain), or API calls are blocked
  by the browser.

## Deploy order

1. Deploy the **backend** first (see the backend repo's `DEPLOYMENT.md`) and copy its
   public Railway URL.
2. Set `VITE_API_URL` (this repo) to that URL and set `APP_CORS_ALLOWED_ORIGINS`
   (backend) to this site's URL.
3. Push to `main` — the frontend builds against the live backend.
