import { defineComponent } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 图标组件
 * @Description: 使用插件 vite-plugin-svg-icons-ng
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-10 16:17:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-10 23:33:22
 * @FilePath: src/components/icons/SvgIcon.tsx
 */
export const SvgIcon = defineComponent({
  name: 'SvgIcon',
  props: {
    name: { type: String, required: true },
  },
  setup(props, _ctx) {
    return () => (
      <svg
        class={cn(
          'where:(h-1em w-1em align-[-0.15em] fill-[currentColor] overflow-clip)',
        )}
        aria-hidden="true">
        <use xlinkHref={`#icon-${props.name}`}/>
      </svg>
    )
  },
})
