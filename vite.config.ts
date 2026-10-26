import { fileURLToPath, pathToFileURL, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import unoCSS from 'unocss/vite'
import jsxScoped from '@10coding/vite-plugin-jsx-scoped'
import { svgoStore } from './src/plugins/svgoStore.ts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { consoleBanner } from "vite-plugin-console-banner"
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
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
    AutoImport({
      resolvers: [
        VantResolver(),
      ],
    }),
    Components({
      resolvers: [
        VantResolver(),
      ],
    }),
    vueDevTools({
      launchEditor: 'webstorm',
    }),

    // svg精灵图标方案
    svgoStore(),
    /*
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
    */

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
    consoleBanner({
      text: "xmasuhai.xyz",
      font: "big",
      color: "#476EE3",
      badges: [
        { label: "徐帅的博客", url: "https://xmasuhai.xyz" },
        { label: "徐帅${year}简历", url: "https://xmasuhai.xyz/my-latest-resume/" },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自定义 importers 解析 @/ 别名
        importers: [
          {
            findFileUrl(url) {
              if (!url.startsWith('@/')) return null;
              return new URL(url.substring(2), pathToFileURL('./src'));
            }
          },
        ],
      },
    },
  },
})
