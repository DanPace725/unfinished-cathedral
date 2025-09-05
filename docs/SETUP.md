# Setup Guide

This guide provides instructions for setting up the project for local development.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DanPace725/unfinished-cathedral.git
    cd unfinished-cathedral
    ```

2.  **Install dependencies:**
    This project uses npm for package management. Run the following command to install all required dependencies.
    ```bash
    npm install
    ```

## Environment Configuration

The project requires several secret keys and IDs to connect to the Notion and Stripe APIs.

1.  **Create an environment file:**
    Copy the example environment file to a new `.env` file in the root of the project.
    ```bash
    cp .env.example .env
    ```

2.  **Populate the `.env` file:**
    Open the newly created `.env` file and fill in the values for each variable.

    ```
    # .env

    # Notion API Credentials
    # Get these from your Notion integration settings
    NOTION_TOKEN="secret_..."
    NOTION_DATABASE_ID="..."

    # Stripe API Keys
    # Get these from your Stripe dashboard (use test keys for development)
    PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."
    ```

    - **`NOTION_TOKEN`**: Your internal integration token from Notion.
    - **`NOTION_DATABASE_ID`**: The ID of the Notion database that holds the project data.
    - **`PUBLIC_STRIPE_PUBLISHABLE_KEY`**: Your Stripe publishable key (make sure it's a **test** key for development).
    - **`STRIPE_SECRET_KEY`**: Your Stripe secret key (make sure it's a **test** key for development).
    - **`STRIPE_WEBHOOK_SECRET`**: The signing secret for your local Stripe webhook endpoint. You can get this by using the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events to your local server (`stripe listen --forward-to localhost:4321/api/webhook`).

## Running the Development Server

Once the dependencies are installed and the environment variables are set, you can start the local development server.

```bash
npm run dev
```

This will start the Astro development server, typically on `http://localhost:4321`. The site will automatically reload when you make changes to the source files.

## Building for Production

To create a production-ready build of the site, run:

```bash
npm run build
```

This will generate a static build of the site in the `dist/` directory. You can preview the production build locally by running `npm run preview`.
