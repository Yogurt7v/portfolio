import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://es-portfolio.ru',
  output: 'static',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'esbuild', // Или 'terser' для более агрессивной минификации
    },
  },
});
