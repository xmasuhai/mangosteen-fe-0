import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

export type ButtonFeatType = 'button' | 'submit' | 'reset'
export type ButtonLevelType = 'primary' | 'success' | 'warning' | 'danger' | 'default'

interface BarButtonProps {
  onClick?: (e: MouseEvent) => void
  type?: ButtonFeatType
  level?: ButtonLevelType
  forId?: string
  text?: string
}

/**
 * @Description: 条状按钮
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:44:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 17:42:55
 * @FilePath: src/components/BarButton.tsx
 */
export const BarButton = defineComponent<BarButtonProps>({
  name: 'BarButton',
  props: {
    type: { type: String as PropType<ButtonFeatType>, default: 'button' as const },
    level: { type: String as PropType<ButtonLevelType>, default: 'primary' as const },
    text: { type: String as PropType<string>, default: undefined },
    forId: { type: String as PropType<string>, default: undefined },
  },
  setup(_props, _ctx) {
    const levelHashClassHash: Record<ButtonLevelType, string> = {
      primary: cn('bg-[var(--button-bg-primary)] b-[var(--button-bg-primary)]'),
      success: cn('bg-[var(--button-bg-success)] b-[var(--button-bg-success)]'),
      warning: cn('bg-[var(--button-bg-warning)] b-[var(--button-bg-warning)]'),
      danger: cn('bg-[var(--button-bg-danger)] b-[var(--button-bg-danger)]'),
      default: cn('bg-[var(--button-bg-default)] b-[var(--button-bg-default)]'),
    }
    return () => (
      <button
        {...(_props.forId ? { id: _props.forId } : {})}
        type={_props.type}
        class={cn(
          `bar-button ${levelHashClassHash[_props.level ?? 'primary']}`,
          'b-1 b-solid rounded-[var(--button-radius)]',
          'text-[var(--button-text-color)] font-size-[var(--button-text-size)]',
          'where:(w-[100%] h-[var(--button-height)] p-x-1em p-y-[0.5em])',
        )}>
        {_props.text ?? _ctx.slots.default?.()}
      </button>
    )
  },
})
