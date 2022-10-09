import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  publicDir: './public',
  envDir: '../',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    })
  ]
});
