import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'

/**
 * @Description: 金额数字输出
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:59:39
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 23:47:58
 * @FilePath: src/modules/items/AmountNumberOutput.tsx
 */
export const AmountNumberOutput = defineComponent({
  name: 'AmountNumberOutput',
  setup(/* _props, _ctx */) {
    const { amountRef } = storeToRefs(useNumpadAmountStore())
    return () => (
      <span class="text-24px font-mono color-[var(--amount-text-color)]">{amountRef.value}</span>
    )
  },
})
