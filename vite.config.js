import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/* export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}) */

// vue.config.js
export default {
  devServer: {
    proxy: {
      // Redirigir solicitudes de /api a la URL de Firebase Realtime Database
      '/api': {
        target: 'https://lyriclesp.firebaseio.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false,
        logLevel: 'debug', // Opcional: útil para depurar el proxy
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};
