import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @Description: 命名规范 `use<Xxx>Store`
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026/10/15 22:45
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 23:01:22
 * @FilePath: src/stores/useNumpadAmountStore.ts
 */
export const useNumpadAmountStore = defineStore('numpadAmount', () => {
  const amountRef = ref('0.00')

  const appendText = (text: string | number) => {
    amountRef.value += text.toString()
  }

  return {
    amountRef,
    appendText,
  }
})
