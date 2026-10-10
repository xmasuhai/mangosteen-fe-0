import { defineComponent } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 图标组件
 * @Description: 使用插件 vite-plugin-svg-icons-ng
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-10 16:17:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-10 17:29:55
 * @FilePath: src/components/icons/SvgIcon.tsx
 */
export const SvgIcon = defineComponent({
  name: 'SvgIcon',
  // inheritAttrs: false,
  props: {
    name: { type: String, required: true },
  },
  setup(props, _ctx) {
    // const { class: parentClass } = _ctx.attrs
    return () => (
      <svg
        class={cn(
          'h-1em w-1em align-[-0.15em] fill-[currentColor] overflow-clip',
          // parentClass, // 默认即组件外部样式覆盖内部默认样式
        )}
        aria-hidden="true">
        <use xlinkHref={`#icon-${props.name}`}/>
      </svg>
    )
  },
})
