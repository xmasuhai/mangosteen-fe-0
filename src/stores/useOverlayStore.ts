import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @Description: 浮层状态管理
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:11:37
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 15:15:38
 * @FilePath: src/stores/useOverlayStore.ts
 */
export const useOverlayStore = defineStore('overlay', () => {
  const overlayVisible = ref(false)

  const toggleOverlay = () => {
    overlayVisible.value = !overlayVisible.value
  }
  const closeOverlay = () => {
    overlayVisible.value = false
  }

  return {
    overlayVisible,
    toggleOverlay,
    closeOverlay,
  }
})
