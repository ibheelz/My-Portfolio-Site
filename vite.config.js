import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    fs: {
      strict: false,
      allow: [
        // project root
        process.cwd(),
        // ensure symlink targets under images/ are readable
        path.resolve(process.cwd(), 'images'),
        path.resolve(process.cwd(), 'public')
      ]
    }
  },
  resolve: {
    preserveSymlinks: true
  }
})
