import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function copyCoversToDist() {
  return {
    name: 'copy-covers-to-dist',
    closeBundle() {
      const rootDir = process.cwd()
      const sourceDir = path.resolve(rootDir, 'covers')
      const targetDir = path.resolve(rootDir, 'dist', 'covers')

      if (!fs.existsSync(sourceDir)) return
      fs.mkdirSync(targetDir, { recursive: true })
      fs.cpSync(sourceDir, targetDir, { recursive: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), copyCoversToDist()],
  // Relative base makes GitHub Pages work regardless of repo name/path.
  // Keep absolute base in dev for correct dev-server behavior.
  base: mode === 'production' ? './' : '/',
}))
