import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CommunityMission-Progress-Viewer/',
  build: {
    rollupOptions: {
      external: [
        '/',
        './',
        '/CommunityMission-Progress-Viewer/',
        './assets/css/icomoon.css',
      ],
    },
  },
  plugins: [react()]
})
