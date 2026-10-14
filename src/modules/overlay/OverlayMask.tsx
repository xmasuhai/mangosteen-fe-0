import { defineComponent /* type PropType */ } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 划出浮层遮罩
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 14:55:41
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 15:06:48
 * @FilePath: src/modules/overlay/OverlayMask.tsx
 */
export const OverlayMask = defineComponent({
  name: 'OverlayMask',
  setup(/* _props, _ctx */) {
    const onClose = () => {}
    return () => (
      <section
        onClick={onClose}
        class={cn(
          'fixed z-[var(--z-index-float-overlay)] bg-[var(--overlay-mask-bg)]',
          'top-[var(--top-safe-area-height)] left-0',
          'w-full h-[calc(100%-var(--top-safe-area-height))]'
        )}></section>
    )
  },
})
