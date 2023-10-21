import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        description: 'Flash Cards | houndlings.com',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'luxray-cards-logo-180x180.png',
            sizes: '180x180',
            type: 'image/svg+xml',
          },
          {
            src: 'luxray-cards-logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'luxray-cards-logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    react(),
  ],
})
