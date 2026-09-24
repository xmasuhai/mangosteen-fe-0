import {defineConfig, presetAttributify} from 'unocss'
import {presetWind4} from '@unocss/preset-wind4'

/**
 * @Description: unoCss配置
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 22:27:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-24 22:31:48
 * @FilePath: uno.config.ts
 */
export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
  ],
})
