/// <reference types="vitest" />
/// <reference types="vite/client" />


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    // Habilita HTTPS en el servidor de desarrollo
    // https: false,
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://localhost:5173"
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
})
