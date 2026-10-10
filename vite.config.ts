import { fileURLToPath, URL, } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import unoCSS from 'unocss/vite'
import jsxScoped from '@10coding/vite-plugin-jsx-scoped'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
// import { svgoStore } from './src/plugins/svgoStore.ts'
// import mkcert from 'vite-plugin-mkcert'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  // base: '/mangosteen-fe-0-publish/',
  plugins: [
    unoCSS(),
    jsxScoped({ warnMultiScopedImport: true }),
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    vueDevTools(),
    // svgoStore(),
    createSvgIconsPlugin({
      iconDirs: ['src/assets/icons'],
      bakerOptions: {
        svgoOptions: {
          plugins: [
            'cleanupAttrs',
            'removeDoctype',
            'removeComments',
            'removeTitle',
            'removeDesc',
            'removeEmptyAttrs',
            {
              name: 'removeAttrs',
              params: {
                attrs: '(data-name|data-xxx)',
              },
            },
          ],
        },
      },
    }),
    // 自动启用 TLS + HTTP/2 自动在主机中安装证书
    // mkcert(),
    // 自动启用 TLS + HTTP/2 自动在主机中安装假证书
    /*
    basicSsl({
      /!** name of certification *!/
      name: 'test',
      /!** custom trust domains *!/
      domains: ['*.custom.com'],
      /!** optional, days before certificate expires *!/
      ttlDays: 30,
      /!** custom certification directory *!/
      certDir: '/Users/.../.devServer/cert',
    }),
    */
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
