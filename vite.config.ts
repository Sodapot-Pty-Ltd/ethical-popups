import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        format: 'iife',
        dir: './dist',
        entryFileNames: 'ethical-popups.js',
        assetFileNames: 'style.css',
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },

})
