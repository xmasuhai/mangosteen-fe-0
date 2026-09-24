/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AttributifyAttributes } from '@unocss/preset-attributify'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 22:49:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-24 22:56:35
 * @FilePath: shims-tsx.d.ts
 */
declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
