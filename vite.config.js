import { defineConfig } from 'vite'
import { copyFileSync } from 'fs'

// Updated: 2025-11-10 - Ensuring correct base path for GitHub Pages
export default defineConfig({
  base: '/VTM20A-elders/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Ensure consistent asset naming
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  plugins: [
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Copy .nojekyll to dist after build
        try {
          copyFileSync('.nojekyll', 'dist/.nojekyll')
          console.log('.nojekyll copied to dist/')
        } catch (err) {
          console.error('Failed to copy .nojekyll:', err)
        }
      }
    }
  ]
})
