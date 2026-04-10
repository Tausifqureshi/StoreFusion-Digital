import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // removes all console.log in production
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.warn'],
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - very stable, long cache
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Redux
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],

          // Firebase - large, split separately
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],

          // MUI - very large
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],

          // Charts - only used in Dashboard
          'vendor-charts': ['chart.js', 'react-chartjs-2'],

          // Swiper - only used in HeroSection
          'vendor-swiper': ['swiper'],

          // Utilities
          'vendor-utils': ['react-toastify', 'uuid'],
        },
      },
    },
  },
})