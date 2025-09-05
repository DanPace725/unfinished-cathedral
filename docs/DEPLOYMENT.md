# Deployment Guide

This guide provides instructions for deploying the project to production.

## Recommended Host: Vercel

The project is configured to be easily deployable on [Vercel](https://vercel.com/), which has first-class support for Astro projects.

### 1. Connect Your Repository

- Create a new project on your Vercel dashboard.
- Connect it to your GitHub repository where this project is hosted.

### 2. Configure the Project

Vercel will automatically detect that this is an Astro project and configure the build settings correctly. You shouldn't need to change anything. The standard settings are:
- **Framework Preset:** Astro
- **Build Command:** `npm run build` or `astro build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Add Environment Variables

This is the most critical step. You must add the same environment variables from your `.env` file to the Vercel project settings.

- In your Vercel project, go to **Settings > Environment Variables**.
- Add the following variables with their **production** (not test) values:
  - `NOTION_TOKEN`
  - `NOTION_DATABASE_ID`
  - `PUBLIC_STRIPE_PUBLISHABLE_KEY` (this must be your **live** publishable key)
  - `STRIPE_SECRET_KEY` (this must be your **live** secret key)
  - `STRIPE_WEBHOOK_SECRET` (this must be the signing secret for your **production** webhook endpoint on Vercel)

### 4. Deploy

Once the environment variables are set, trigger a deployment from your Vercel dashboard. Vercel will automatically build and deploy the site.

## Stripe Webhook Configuration (Production)

After deploying, you need to configure your Stripe webhook for the live environment.

1.  Go to your Stripe Dashboard (in **Live mode**).
2.  Navigate to **Developers > Webhooks**.
3.  Click **Add endpoint**.
4.  For the **Endpoint URL**, enter the URL of your deployed webhook handler:
    `https://<your-vercel-domain>.vercel.app/api/webhook`
5.  For the **Events to send**, select `checkout.session.completed`.
6.  Click **Add endpoint**. Stripe will reveal the **Signing secret** for this endpoint.
7.  Copy this signing secret and add it as the `STRIPE_WEBHOOK_SECRET` environment variable in your Vercel project settings. You will need to trigger a new deployment for the updated variable to take effect.
