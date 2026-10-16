import { useEventBus } from '@vueuse/core'
import type { NotifyOptions } from 'vant'

export type GlobalHintPayload = string | NotifyOptions

/**
 * @Description: 全局提示事件总线
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-16 22:02:42
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 22:04:14
 * @FilePath: src/shared/events/useGlobalHintsBus.ts
 */
export const useGlobalHintsBus = () => {
  return useEventBus<GlobalHintPayload>('global-hints')
}
