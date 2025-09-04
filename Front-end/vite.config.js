import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,   // expose to local network (useful for testing)
    port: 5173,   // optional
  },
  build: {
    outDir: 'dist', // Vercel expects dist as output
  },
  base: '/', // ensures assets load correctly on Vercel
})
