import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

type ButtonFeatType = 'button' | 'submit' | 'reset'
type ButtonLevelType = 'primary' | 'success' | 'warning' | 'danger'

interface BarButtonProps {
  onClick?: (e: MouseEvent) => void
  type?: ButtonFeatType
  level?: ButtonLevelType
  id?: string // 无需明确声明
}

/**
 * @Description: 条状按钮
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:44:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 23:35:52
 * @FilePath: src/components/BarButton.tsx
 */
export const BarButton = defineComponent<BarButtonProps>({
  name: 'BarButton',
  props: {
    type: {type: String as PropType<ButtonFeatType>, default: 'button' as const,},
    level: {type: String as PropType<ButtonLevelType>, default: 'primary' as const,},
  },
  setup(_props, ctx) {
    const levelHashClass: Record<ButtonLevelType, string> = {
      primary: cn('bg-[var(--button-bg-primary)] b-[var(--button-bg-primary)]'),
      success: cn('bg-[var(--button-bg-success)] b-[var(--button-bg-success)]'),
      warning: cn('bg-[var(--button-bg-warning)] b-[var(--button-bg-warning)]'),
      danger: cn('bg-[var(--button-bg-danger)] b-[var(--button-bg-danger)]'),
    }

    return () => (
      <button
        type={_props.type}
        class={cn(
          `${levelHashClass[_props.level ?? 'primary']}`,
          'b-1 b-solid rounded-[var(--button-radius)]',
          'text-[var(--button-text-color)] font-size-[var(--button-text-size)]',
          'w-[100%] h-[var(--button-height)] p-x-1em p-y-[0.5em]',
        )}>
        {ctx.slots.default?.()}
      </button>
    )
  },
})
