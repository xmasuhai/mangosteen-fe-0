import { defineComponent /* type PropType */ } from 'vue'
import { NavBar } from '@/components/NavBar.tsx'
import { cn } from 'cn'

/**
 * @Description: 主布局
 * @Description: 接受 title、icon、default 三个插槽
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 15:41:46
 * @FilePath: src/components/layout/MainLayout.tsx
 */
export const MainLayout = defineComponent({
  name: 'MainLayout',
  setup(_props, _ctx) {
    return () => (
      <div class={cn('w-full h-full position-relative')}>
        <NavBar
          direct-scoped
          class="navbar bg-gradient-to-b from-[var(--navbar-bg-start)] to-[var(--navbar-bg-end)]">
          {{
            default: () => _ctx.slots?.title?.(),
            icon: () => _ctx.slots?.icon?.(),
          }}
        </NavBar>
        <main class="h-[calc(100%-var(--navbar-min-height))]">{_ctx.slots?.default?.()}</main>
      </div>
    )
  },
})
