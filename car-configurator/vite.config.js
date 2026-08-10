import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // large .glb files being copied in can transiently lock on Windows;
      // don't let the watcher crash the dev server over it
      ignored: ['**/public/models/**'],
    },
  },
})
