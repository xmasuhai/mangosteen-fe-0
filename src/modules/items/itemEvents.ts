import { type GlobalHintPayload, } from '@/shared/events/useGlobalHintsBus.ts'
import { showNotify } from 'vant'

/**
 * @Description: 数字长度限制提示事件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-16 22:37:56
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 23:26:21
 * @FilePath: src/modules/items/itemEvents.ts
 */
export const numberLimitListener = (hint?: GlobalHintPayload) => {
  if (typeof hint === 'string') {
    showNotify({ type: 'warning', position: 'bottom', message: hint })
  } else if (hint && typeof hint === 'object') {
    showNotify(hint)
  } else {
    showNotify({ type: 'warning', position: 'bottom', message: '输入的数字长度不支持超过10位' })
  }
}
