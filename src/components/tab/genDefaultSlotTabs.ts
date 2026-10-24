import type { VNode } from 'vue'

/**
 * @Description: 生成默认插槽标签数组
 * @Description: 递归判断：节点是否为文档片段 'v-fgt'
 * @Description: 是则递归该插槽的 children 属性，返回拍平后的节点数组；否则返回该插槽节点
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 17:48:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 14:29:20
 * @FilePath: src/components/tab/genDefaultSlotTabs.ts
 */
export const genDefaultSlotTabs = (slots: Array<VNode>): VNode[] =>
  slots.flatMap((slot) =>
    typeof slot?.type === 'symbol' && Symbol.keyFor(slot?.type as symbol) === 'v-fgt'
      ? genDefaultSlotTabs(slot.children as VNode[])
      : slot,
  )
