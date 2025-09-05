import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering
  adapter: vercel(), // Add Vercel adapter
  integrations: [
    react(), // Add React integration
  ],
 });
