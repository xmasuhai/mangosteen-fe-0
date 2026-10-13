import { defineComponent, type PropType } from 'vue'
import s from '@/components/NavBar.module.scss'
import { cn } from 'cn'

/**
 * @Description: 导航头部
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 20:54:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 23:13:40
 * @FilePath: src/components/NavBar.tsx
 */
export const NavBar = defineComponent({
  name: 'NavBar',
  props: {
    propsName: {
      type: String as PropType<string>,
      required: false,
    }
  },
  setup( _props, _ctx ) {
    const {slots} = _ctx

    return () => (
      <header class={cn(
        s.navbar,
        'text-[var(--navbar-text-color)]'
      )}>
        <span>{slots?.icon?.(s.icon)}</span>
        <span>{slots?.default?.(s.title)}</span>
      </header>
    )
  },
})
