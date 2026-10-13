import { defineComponent, type PropType } from 'vue'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 20:54:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 21:29:28
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
      <header>
        <span>{slots?.icon?.()}</span>
        <span>{slots?.default?.()}</span>
      </header>
    )
  },
})
