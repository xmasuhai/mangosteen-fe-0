import type { VNode } from 'vue'

/**
 * @Description: 生成默认插槽标签
 * @Description: 递归判断节点是否为文档片段，并返回拍平后的节点数组
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 17:48:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 17:51:08
 * @FilePath: src/views/genDefaultSlotTabs.ts
 */
export const genDefaultSlotTabs = (slots: Array<VNode>): VNode[] =>
  slots.flatMap(slot =>
    typeof slot?.type === 'symbol' ?
      Symbol.keyFor(slot?.type as symbol) === 'v-fgt'
        ? genDefaultSlotTabs(slot.children as VNode[])
        : slot
      :slot)
