/// <reference types="vitest" />
/// <reference types="vite/client" />


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite';

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "/",
//   plugins: [react()],
//   preview: {
//     port: 5173,
//     strictPort: true,
//   },
//   server: {
//     port: 5173,
//     strictPort: true,
//     host: true,
//     origin: "http://localhost:5173",
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/tests/setup.ts',
//     // you might want to disable it, if you don't have tests that rely on CSS
//     // since parsing CSS is slow
//     css: true,
//   },
// })

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    base: "/",
    plugins: [react()],
    preview: {
      port: 5173,
      strictPort: true,
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      origin: "http://localhost:5173",
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.ts',
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: true,
    },
  });
}
