import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.ts'
import type { ConfigEnv } from 'vite'

export default defineConfig((env: ConfigEnv) => ({
  ...(typeof viteConfig === 'function' ? viteConfig(env) : viteConfig),
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    setupFiles: ['src/polyfills/temporal.ts'],
    env: { TZ: 'Asia/Shanghai' },
  },
}))
