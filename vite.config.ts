import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    allowedHosts: [
      'sparkks.com.br',
      'www.sparkks.com.br',
      'dev.sparkks.com.br',
    ],
  },
})
