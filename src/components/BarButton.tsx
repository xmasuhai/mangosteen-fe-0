import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

interface BarButtonProps {
  onClick?: (e: MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
}

/**
 * @Description: 条状按钮
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:44:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 21:28:03
 * @FilePath: src/components/BarButton.tsx
 */
export const BarButton = defineComponent<BarButtonProps>({
  name: 'BarButton',
  props: {
    type: {type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button',},
  },
  setup(_props, ctx) {
    return () => (
      <button
        type={_props.type}
        class={cn(
          'bg-[var(--button-bg)] b-1 b-solid b-[var(--button-bg)] rounded-[var(--button-radius)]',
          'text-[var(--button-text-color)] font-size-[var(--button-text-size)]',
          'w-[100%] h-[var(--button-height)] p-x-1em p-y-[0.5em]',
        )}>
        {ctx.slots.default?.()}
      </button>
    )
  },
})
