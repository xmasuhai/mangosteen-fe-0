import { defineComponent, type PropType } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { cn } from 'cn'
import type { SvgIconNames } from '@/components/icons/SvgIcon.tsx'

interface FloatButtonProps {
  onClick?: (e: MouseEvent) => void
  iconName: SvgIconNames
}

/**
 * @Description: 浮动按钮：位置固定、内容仅支持图标
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 14:23:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 17:05:57
 * @FilePath: src/components/FloatButton.tsx
 */
export const FloatButton = defineComponent<FloatButtonProps>({
  name: 'FloatButton',
  props: {
    iconName: {
      type: String as PropType<SvgIconNames>,
      required: true,
    },
  },
  components: {},
  setup(props, _ctx) {
    return () => (
      <div
        class={cn(
          'w-56px h-56px flex justify-center items-center',
          'bg-[var(--float-button-bg)] rounded-[var(--float-button-radius)]',
        )}>
        <SvgIcon
          name={props.iconName}
          class={cn(
            'w-2.5em h-2.5em',
            'fill-[var(--float-button-text-color)]',
            'translate-y-[-2px]',
          )}
        />
      </div>
    )
  },
})
