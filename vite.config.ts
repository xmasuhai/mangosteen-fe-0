import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import unoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/mangosteen-fe-0-publish/',
  plugins: [
    vue(),
    unoCSS(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
