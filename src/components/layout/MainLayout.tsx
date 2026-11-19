import { defineComponent /* type PropType */ } from 'vue'
import { cn } from 'cn'
import { NavBar } from '@/components/NavBar.tsx'

/**
 * @Description: 主要布局
 * @Description: 接受 title、icon、default 三个插槽
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-04 21:03:23
 * @FilePath: src/components/layout/MainLayout.tsx
 */
export const MainLayout = defineComponent({
  name: 'MainLayout',
  setup(_props, _ctx) {
    return () => (
      <div class={cn('grow-1 w-full h-full relative flex flex-col')}>
        <NavBar
          direct-scoped
          class={cn(
            'h-[var(--navbar-min-height)] grow-0 shrink-0',
            'sticky top-0 z-[var(--z-index-navbar)]',
            'bg-gradient-to-b from-[var(--navbar-bg-start)] to-[var(--navbar-bg-end)]',
          )}>
          {{
            default: () => _ctx.slots?.title?.(),
            icon: () => _ctx.slots?.icon?.(),
          }}
        </NavBar>

        <main class={cn(
          'grow-1 shrink-1 flex flex-col children:(grow-1 shrink-1)',
          'h-[calc(var(--main-vh)-var(--navbar-min-height))]',
        )}>
          {_ctx.slots?.default?.()}
        </main>
      </div>
    )
  },
})
