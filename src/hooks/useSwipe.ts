import { computed, type ComputedRef, onMounted, onUnmounted, ref, type Ref } from 'vue'

type Point = { x: number; y: number }
interface SwipeState {
  isSwiping: Ref<boolean>
  direction: ComputedRef<'' | 'right' | 'left' | 'up' | 'down'>
  distance: ComputedRef<Point | null>
}

const calcDistance = (start: Point, end: Point) => {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  }
}

const calcDirection = (distance: Point) => {
  if (!distance) { return '' }
  const { x, y } = distance
  if (Math.abs(x) > Math.abs(y)) {
    return x > 0 ? 'right' : 'left'
  }
  return y > 0 ? 'down' : 'up'
}

/**
 * @Description: 滑动切换
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 11:32:04
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 17:39:45
 * @FilePath: src/hooks/useSwipe.ts
 */
export const useSwipe = (elementRef: Ref<HTMLElement | null>): SwipeState => {
  const start = ref<Point | null>(null)
  const end = ref<Point | null>(null)
  const isSwiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return calcDistance(start.value, end.value)
  })

  const direction = computed(() => {
    if (!distance.value || !isSwiping.value) { return '' }
    return calcDirection(distance.value)
  })

  const aborter = new AbortController()
  const opt = { signal: aborter.signal }

  const onStart = (e: TouchEvent
  ) => {
    start.value = {
      x: e.touches[0]?.screenX ?? 0,
      y: e.touches[0]?.screenY ?? 0,
    }
    end.value = null
    isSwiping.value = true
  }

  const onMove = (e: TouchEvent
  ) => {
    end.value = {
      x: e.touches[0]?.screenX ?? 0,
      y: e.touches[0]?.screenY ?? 0,
    }
  }

  const onEnd = () => {
    isSwiping.value = false
    start.value = null
    end.value = null
  }

  onMounted(() => {
    if(!elementRef.value) {return}
    elementRef.value.addEventListener('touchstart', onStart, opt)
    elementRef.value.addEventListener('touchmove', onMove, opt)
    elementRef.value.addEventListener('touchend', onEnd, opt)
  })

  onUnmounted(() => {aborter.abort()})

  return {
    isSwiping,
    direction,
    distance,
  }
}
