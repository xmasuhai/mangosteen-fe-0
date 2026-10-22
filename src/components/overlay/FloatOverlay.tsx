import { defineComponent } from 'vue'
import { cn } from 'cn'
import { OverlayMask } from '@/components/overlay/OverlayMask.tsx'
import { OverlayUserHeader } from '@/components/overlay/OverlayUserHeader.tsx'
import { MenuLinkList } from '@/components/overlay/MenuLinkList.tsx'

/**
 * @Description: 划出浮层
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 23:42:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 21:36:01
 * @FilePath: src/components/overlay/FloatOverlay.tsx
 */
export const FloatOverlay = defineComponent({
  name: 'FloatOverlay',
  setup(_props, _ctx) {
    return () => (
      <>
        <OverlayMask />
        <aside
          class={cn(
            'fixed z-[calc(var(--z-index-float-overlay)+1)] bg-[var(--overlay-bg)]',
            'top-[var(--top-safe-area-height)] left-0',
            'w-18em h-[calc(100%-var(--top-safe-area-height))]',
          )}>
          <OverlayUserHeader />
          <MenuLinkList />
        </aside>
      </>
    )
  },
})
