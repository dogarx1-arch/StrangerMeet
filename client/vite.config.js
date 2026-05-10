import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Added for path aliasing

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      // 2. Added aliases so you can use '@/components/...' instead of '../../../components/...'
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    // 3. Strict port prevents Vite from automatically switching to 5174 if 5173 is busy
    // This ensures your socket/api proxy doesn't break
    strictPort: true, 
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
      },
    },
  },
  build: {
    // 4. Optimization: Splits vendor code (React, Lucide, etc.) into a separate file 
    // to make your initial website load much faster.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'socket.io-client', 'zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})