import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: 'src',
  server: { port: 5173 },
  build: { outDir: '../dist', emptyOutDir: true },
  test: { include: ['**/*.test.ts'], environment: 'jsdom' },
});
