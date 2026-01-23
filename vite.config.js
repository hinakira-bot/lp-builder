import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
    strictPort: true,
  },
  base: './', // Use relative paths for assets (essential for subdirectory hosting)
  build: {
    assetsDir: '', // Output assets to the root of dist (flatten structure)
    rollupOptions: {
      input: {
        main: 'index.html',
        viewer: 'viewer.html'
      },
      output: {
        entryFileNames: '[name]-[hash].js', // Remove assets/ prefix
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    }
  }
})
