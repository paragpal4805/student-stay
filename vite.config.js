import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    outDir: 'public/assets', emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {entryFileNames: 'app.js', assetFileNames: 'app.[ext]'}
    }
  }
});
