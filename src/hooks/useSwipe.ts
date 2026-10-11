import type { Ref } from 'vue'

// type Point = {x: number; y: number}
interface SwipeState {
  isSwiping: boolean
  direction: string
  distance: number
}

/**
 * @Description: 滑动切换
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 11:32:04
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:40:42
 * @FilePath: src/hooks/useSwipe.ts
 */
export const useSwipe = (
  elementRef: Ref<HTMLElement | null>
): SwipeState => {

  console.log('useSwipe_______________________')
  console.log("%c 2 --> elementRef: ","color:#58c4dc;", elementRef);
  console.log('_______________________useSwipe')

  return {
    isSwiping: false,
    direction: '',
    distance : 0
  }
}
