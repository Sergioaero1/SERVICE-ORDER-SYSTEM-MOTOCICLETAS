import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Novo plugin para v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Adicione isso aqui
  ],
})
