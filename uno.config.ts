import {
  defineConfig,
  presetAttributify,
  transformerVariantGroup,
  transformerDirectives,
  type PresetWind4Theme,
  PresetOrFactoryAwaitable,
} from 'unocss'
import {presetWind4} from '@unocss/preset-wind4'

/**
 * @Description: unoCss配置
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 22:27:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 16:07:25
 * @FilePath: uno.config.ts
 */
export const unoConfig = defineConfig({
  presets: [
    presetWind4() as PresetOrFactoryAwaitable<object>,
    presetAttributify(),
  ],
  transformers: [
    // 支持 where:(a b c) 这种分组写法
    transformerVariantGroup(),
    transformerDirectives(),
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
  extendTheme: (theme: PresetWind4Theme) => {
    const breakpoint = {
      ...theme.breakpoint,
      ipadMini: '768px',
      iPhone16ProMax: '440px',
    }
    const verticalBreakpoint = {
      ...theme.verticalBreakpoint,
      ipadMini: '1024px',
      iPhone16ProMax: '956px',
    }

    return ({
      ...theme,
      // presetWind4
      breakpoint,
      // 虽然已改用presetWind4，但presetWind3旧配置可以提供代码提示 https://unocss.dev/presets/wind4#theme
      breakpoints: breakpoint,
      verticalBreakpoint,
      verticalBreakpoints: verticalBreakpoint,
    })
  },
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
  rules: [
    [/^scrollbar-hide$/, () => ({
      'scrollbar-width': 'none',
    })],
    [/^scrollbar-default$/, () => ({
      'scrollbar-width': 'auto',
    })],
  ],
  preflights: [
    {
      getCSS: () => `
        @property --sibling-idx {
          syntax: '<integer>'; /* 核心：限制为整数类型，迫使浏览器立即求值 */
          inherits: true;      /* 允许向下继承计算后的结果 */
          initial-value: 1;
        }
      `
    }
  ]
})

export default unoConfig
