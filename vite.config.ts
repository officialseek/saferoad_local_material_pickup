import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'spa',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-fallback',
      closeBundle() {
        const indexPath = join('dist', 'index.html')
        copyFileSync(indexPath, join('dist', '404.html'))
      },
    },
  ],
})
