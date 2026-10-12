/**
 * @Description: 节流
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-12 20:53:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-12 21:28:54
 * @FilePath: src/shared/throttle.ts
 */
export const throttle = <P>(fn: (...args: P[]) => void, delay: number = 500) => {
  let timer: NodeJS.Timeout | null = null
  return (...args: P[]) => {
    if (timer) {
      return
    }
    fn(...args)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
