import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Use relative paths so it works on GitHub Pages regardless of the repository name
  base: './',
  plugins: [react(), tailwindcss()],
})
