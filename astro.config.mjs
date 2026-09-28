// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// Todo se renderiza en el servidor: las páginas dependen del usuario conectado.
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  server: { port: 4321 },
});
