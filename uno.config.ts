import { defineConfig, presetAttributify, transformerVariantGroup } from 'unocss'
import {presetWind4} from '@unocss/preset-wind4'

/**
 * @Description: unoCss配置
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 22:27:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 16:51:43
 * @FilePath: uno.config.ts
 */
export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
  ],
  transformers: [
    transformerVariantGroup(), // 支持 where:(a b c) 这种分组写法
  ],
  variants: [
    // where:xxx -> :where(.where\:xxx) { ... }，优先级 0,0,0
    (matcher) => {
      if (!matcher.startsWith('where:'))
        return matcher
      return {
        matcher: matcher.slice(6),
        selector: s => `:where(${s})`,
      }
    },
  ],
  theme: {
    colors: {
      // 绑定你的 CSS 变量
      welcomeCardBg: 'var(--welcome-card-bg-color)',
      primaryColor: '#6035BF',
    },
  },
  shortcuts: {
    // 将 UnoCSS 的原子类映射到你 SCSS 里定义好的 .animation-rainbow 类
    'animate-rainbow': 'animation-rainbow',
  },
})
