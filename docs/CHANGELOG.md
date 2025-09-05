# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-09-05 - Jules

This is the initial version of the Cathedral of Unfinished Dreams platform, built from the ground up based on the initial design documents.

### Added

- **Project Setup:**
  - Initialized project with Astro, React, and Tailwind CSS.
  - Created a comprehensive `.gitignore` file.
  - Set up project structure with `src`, `public`, and `docs` directories.
  - Added npm scripts for `dev`, `build`, and `preview`.

- **Core UI Components:**
  - Created `ProjectCard.jsx` and `ProjectGrid.jsx` to display projects on the homepage.
  - Created `SignalButton.jsx` as the primary call-to-action component.
  - Built the homepage (`index.astro`) displaying a grid of projects.
  - Built the dynamic project detail page (`[id].astro`) using Astro's `getStaticPaths`.

- **Data Integration:**
  - Added `notion.js` utility to fetch and parse data from the Notion API.
  - Replaced all mock data on the homepage and project pages with live data from Notion.
  - Implemented a robust parser to handle the complex Notion API response.

- **Payment Integration:**
  - Integrated Stripe for payments using Stripe Checkout.
  - Added a `/api/checkout` server-side endpoint to create Stripe Checkout sessions.
  - Implemented the client-side logic in `SignalButton.jsx` to redirect to Stripe.
  - Added `success.astro` and `cancel.astro` pages for post-payment redirects.

- **Webhook for Signal Counting:**
  - Added a `/api/webhook` endpoint to securely receive events from Stripe.
  - Implemented Stripe signature verification for security.
  - Added `incrementProjectSignalCount` function to update the signal count in Notion after a successful payment.

- **Styling and UX:**
  - Implemented a dark theme as per the design document.
  - Installed and configured `@tailwindcss/typography` for clean, readable text content.
  - Created a placeholder `favicon.svg`.
  - Refined responsive design and spacing across the site.

- **Documentation:**
  - Created initial documentation files (`SETUP.md`, `DEPLOYMENT.md`, `API_NOTES.md`, `TROUBLESHOOTING.md`).
  - Populated `SETUP.md` with detailed instructions for local development.
  - Populated `DEPLOYMENT.md` with instructions for deploying to Vercel.
  - Maintained this `CHANGELOG.md`.
  - Created an `.env.example` file to document required environment variables.
