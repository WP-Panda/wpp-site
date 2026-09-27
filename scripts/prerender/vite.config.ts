import { defineConfig } from 'vite';

// Конфиг сборки SSR-бандла генератора вёрстки (scripts/prerender/gen.tsx)
export default defineConfig({
  build: {
    ssr: true,
    outDir: '.gen-out',
    emptyOutDir: true,
  },
});
