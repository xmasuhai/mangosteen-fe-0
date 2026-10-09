import path from 'node:path'
import fs from 'node:fs'
import svgstore from 'svgstore' // 用于制作 SVG Sprites
import { optimize, type Config as SvgoConfig } from 'svgo' // 用于优化 SVG 文件
import type { Plugin } from 'vite'

export interface SvgStoreOptions {
  cleanDefs?: boolean | string[]
  cleanSymbols?: boolean | string[]
  inline?: boolean
  svgAttrs?: boolean | Record<string, string | number | boolean>
  symbolAttrs?: boolean | Record<string, string | number | boolean>
  copyAttrs?: boolean | string[]
  renameDefs?: boolean
  [key: string]: unknown
}

export interface SvgoStoreOptions extends SvgStoreOptions {
  /**
   * SVG 图标源文件夹路径
   * @default 'src/assets/icons'
   */
  inputFolder?: string
  /**
   * SVGO 优化配置
   */
  svgoConfig?: SvgoConfig
}

/**
 * @Description: vite SVG 插件
 * @Description: 将所有 svg 图标文件都加载到同一个 <SVG> 中
 * @Description: 类似 vite-plugin-svg-icon
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-08 18:04:16
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-09 17:06:50
 * @FilePath: src/plugins/svgoStore.ts
 */
export const svgoStore = (options: SvgoStoreOptions = {}): Plugin => {
  const inputFolder = options.inputFolder || 'src/assets/icons'
  return {
    name: 'svgoStore',
    resolveId(id: string) {
      if (id === '@svgoStore') {
        return 'svg_bundle.js'
      }
      return null
    },
    load(id: string) {
      if (id === 'svg_bundle.js') {
        const sprites = svgstore(options)
        const iconsDir = path.resolve(inputFolder)
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file)
          const svgid = path.parse(file).name
          const code = fs.readFileSync(filepath, { encoding: 'utf-8' })
          sprites.add(svgid, code)
        }
        const svgoConfig: SvgoConfig = options.svgoConfig || {
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
        }
        const { data: code } = optimize(sprites.toString({ inline: options.inline }), svgoConfig)
        return `
          const div = document.createElement('div')
            div.innerHTML = \`${code}\`
            const svg = div.getElementsByTagName('svg')[0]
            if (svg) {
              svg.style.position = 'absolute'
              svg.style.width = 0
              svg.style.height = 0
              svg.style.overflow = 'hidden'
              svg.setAttribute("aria-hidden", "true")
            }
            // listen dom ready event
            document.addEventListener('DOMContentLoaded', () => {
              if (document.body.firstChild) {
                document.body.insertBefore(div, document.body.firstChild)
              } else {
                document.body.appendChild(div)
              }
            })
          `
      }
      return null
    },
  }
}
