import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base must match the GitHub Pages repo name
export default defineConfig({
  base: '/MUX102/',
  plugins: [react()],
})
