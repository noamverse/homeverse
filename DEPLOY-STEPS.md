# DEPLOY-STEPS.md
### Getting HOME live on Vercel — step by step

---

## Before you start

Make sure you have:
- A GitHub account (free at github.com)
- A Vercel account — you can sign up at vercel.com using your GitHub account as login (free tier is fine)
- Git installed on your computer (it's already set up in this project)

---

## Step 1 — Create a GitHub repository

1. Go to **github.com** and sign in.
2. Click the **+** icon in the top-right corner → **New repository**.
3. Name it something like `home-platform` (or anything you like).
4. Set it to **Private** (recommended) — you can make it public later.
5. **Do NOT** check "Add a README file" — the project already has everything it needs.
6. Click **Create repository**.
7. GitHub will show you a page with a URL like `https://github.com/YOUR_USERNAME/home-platform.git`. Keep this tab open — you'll need that URL in Step 2.

---

## Step 2 — Push the local project to GitHub

Open a terminal in the project folder. On Windows, right-click the folder in File Explorer and choose "Open in Terminal" (or open PowerShell and `cd` to the path).

Run these commands **one at a time**, in order:

```bash
# Tell Git where your GitHub repo lives (paste YOUR repo URL from Step 1)
git remote add origin https://github.com/YOUR_USERNAME/home-platform.git

# Push everything to GitHub
git push -u origin main
```

GitHub may ask for your username and password. If it does, use a **Personal Access Token** instead of your password:
1. On GitHub go to **Settings → Developer Settings → Personal access tokens → Tokens (classic)**.
2. Click **Generate new token**, check the `repo` scope, and copy the token.
3. Paste it as your password when prompted.

Once pushed, refresh your GitHub repo page — you should see all the project files appear.

---

## Step 3 — Connect the GitHub repo to Vercel

1. Go to **vercel.com** and sign in (use "Continue with GitHub").
2. On the Vercel dashboard, click **Add New → Project**.
3. Under "Import Git Repository", you should see your `home-platform` repo listed. Click **Import**.
4. Vercel will detect it's a Next.js project and auto-fill the correct build settings. Do not change anything.
5. Leave the **Environment Variables** section empty — this project has none.
6. Click **Deploy**.

---

## Step 4 — Wait for the deploy

Vercel will build the project. This takes about 60–90 seconds. You'll see a live build log. When it finishes, you'll see a confetti screen and a URL like:

```
https://home-platform-abc123.vercel.app
```

Click it — your site is live.

---

## Step 5 — Verify the deploy

Open the Vercel URL and walk through every page:

- [ ] `/` — Home page loads, flywheel animates
- [ ] `/philosophy` — Philosophy page loads
- [ ] `/featured` — Featured page loads
- [ ] `/stories` — Stories page loads
- [ ] `/ecosystem` — Ecosystem page loads, flywheel renders correctly
- [ ] `/welcome` — Welcome HOME loads with full threshold animation

Check each page for:
- [ ] No horizontal scroll at desktop (1280px+) and mobile (<768px)
- [ ] No layout shift on page load
- [ ] Footer links navigate correctly (ecosystem anchor links work)

Open browser DevTools (F12) → Console tab. Confirm no red errors on any page.

---

## Step 6 — Future: Connect a custom domain via Cloudflare

Once you have a domain (e.g. `home.xyz`) and it's managed through Cloudflare:

1. In Vercel, open your project → **Settings → Domains**.
2. Click **Add Domain** and type your domain (`home.xyz` and/or `www.home.xyz`).
3. Vercel will show you a DNS record to add. It will look like:

   | Type  | Name | Value                        |
   |-------|------|------------------------------|
   | CNAME | www  | cname.vercel-dns.com         |
   | A     | @    | 76.76.21.21                  |

4. Log in to **Cloudflare**, go to your domain → **DNS → Records**.
5. Add the records Vercel gives you. Delete any conflicting A or CNAME records for `@` or `www` first.
6. Set the **Proxy status** to **DNS only** (grey cloud, not orange) for Vercel domains — Vercel handles its own CDN.
7. Back in Vercel, click **Verify** — it may take up to 24 hours for DNS to propagate, but usually works within minutes.

---

## Every future update

Once the site is live, deploying changes is automatic:

```bash
git add .
git commit -m "your message here"
git push
```

Vercel detects the push and automatically redeploys. The new version is live in about 60 seconds.

---

## Environment variables

This project currently uses **no environment variables**. If you add any in the future (e.g. an email provider API key for the newsletter form), add them in Vercel under **Project → Settings → Environment Variables**, and create a `.env.local` file locally (never commit `.env.local` to Git).

---

*Generated at the end of the HOME platform redesign phase.*
