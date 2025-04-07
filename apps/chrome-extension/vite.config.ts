import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist/apps/chrome-extension'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        artclvb_artwork: path.resolve(__dirname, 'src/content/artclvb_artwork.ts'),
        artclvb_artist: path.resolve(__dirname, 'src/content/artclvb_artist.ts'),
        ra_events: path.resolve(__dirname, 'src/content/ra_events.ts'),
        ra_event: path.resolve(__dirname, 'src/content/ra_event.ts'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
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