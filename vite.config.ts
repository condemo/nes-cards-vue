import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const date = new Date();

const day: number = date.getDate();
const month: number = date.getMonth() + 1;
const year: number = date.getFullYear()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    '__CURRENT_BUILD__': JSON.stringify(`${day}${month}${year}`),
    '__DESCRIPTION__': JSON.stringify(process.env.npm_package_description),
  }
})
