import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Esta es la magia de la v4

export default defineConfig({
  plugins: [react(), tailwindcss()],
})