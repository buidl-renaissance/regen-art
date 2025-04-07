import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: 'apps/chrome-extension/index.html',
      },
    },
  },
  resolve: {
    alias: {
      '@gods.work/ui': path.resolve(__dirname, '../../libs/ui/src'),
      '@gods.work/utils': path.resolve(__dirname, '../../libs/utils/src'),
      '@gods.work/the-word': path.resolve(__dirname, '../../libs/the-word/src'),
      '@gods.work/web3': path.resolve(__dirname, '../../libs/web3/src'),
    },
  },
});